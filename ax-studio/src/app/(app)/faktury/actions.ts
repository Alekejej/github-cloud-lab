"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parsePLN } from "@/lib/money";
import { calcInvoice, calcItem, invoiceNumber, isVatRate, nextSequence, type ItemInput } from "@/lib/invoice";
import { monthRange, todayISO } from "@/lib/dates";
import { str, withNotice } from "@/lib/params";

const NEW = "/faktury/nowa";

function readItems(form: FormData): ItemInput[] | string {
  const descriptions = form.getAll("item_description").map(String);
  const quantities = form.getAll("item_quantity").map(String);
  const units = form.getAll("item_unit").map(String);
  const prices = form.getAll("item_price").map(String);
  const rates = form.getAll("item_vat").map(Number);

  const items: ItemInput[] = [];
  for (let i = 0; i < descriptions.length; i++) {
    const description = descriptions[i].trim();
    if (!description) continue;
    const quantity = Number(quantities[i].replace(",", "."));
    const unitPriceNet = parsePLN(prices[i]);
    if (!(quantity > 0)) return `Pozycja ${i + 1}: wpisz poprawną ilość.`;
    if (unitPriceNet === null) return `Pozycja ${i + 1}: wpisz poprawną cenę, np. 150,00.`;
    const vatRate = rates[i];
    if (!isVatRate(vatRate)) return `Pozycja ${i + 1}: wybierz stawkę VAT.`;
    items.push({ description, quantity, unit: units[i].trim() || "szt.", unitPriceNet, vatRate });
  }
  return items.length ? items : "Dodaj co najmniej jedną pozycję na fakturze.";
}

export async function createInvoice(form: FormData) {
  const clientId = str(form, "client_id");
  const issueDate = str(form, "issue_date") || todayISO();
  const dueDate = str(form, "due_date");
  if (!clientId) redirect(withNotice(NEW, "blad", "Wybierz klienta."));
  if (!dueDate) redirect(withNotice(NEW, "blad", "Wybierz termin płatności."));

  const items = readItems(form);
  if (typeof items === "string") redirect(withNotice(`${NEW}?klient=${clientId}`, "blad", items));

  const supabase = await createClient();
  const { from, to } = monthRange(issueDate);
  const { data: sameMonth } = await supabase
    .from("invoices")
    .select("number")
    .gte("issue_date", from)
    .lte("issue_date", to);
  const number = invoiceNumber(nextSequence((sameMonth ?? []).map((r) => r.number)), new Date(`${issueDate}T12:00:00`));
  const totals = calcInvoice(items);

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      client_id: clientId,
      number,
      issue_date: issueDate,
      sale_date: str(form, "sale_date") || issueDate,
      due_date: dueDate,
      notes: str(form, "notes"),
      net_total: totals.net,
      vat_total: totals.vat,
      gross_total: totals.gross,
    })
    .select("id")
    .single();
  if (error || !invoice) redirect(withNotice(NEW, "blad", "Nie udało się zapisać faktury. Spróbuj ponownie."));

  const { error: itemsError } = await supabase.from("invoice_items").insert(
    items.map((item, position) => {
      const t = calcItem(item);
      return {
        invoice_id: invoice.id,
        position,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price_net: item.unitPriceNet,
        vat_rate: item.vatRate,
        ...t,
      };
    }),
  );
  if (itemsError) {
    await supabase.from("invoices").delete().eq("id", invoice.id);
    redirect(withNotice(NEW, "blad", "Nie udało się zapisać pozycji faktury. Spróbuj ponownie."));
  }

  revalidatePath("/faktury");
  redirect(withNotice(`/faktury/${invoice.id}`, "ok", `Faktura ${number} została wystawiona.`));
}

/** Oznacza fakturę jako opłaconą i od razu zapisuje wpływ w przychodach. */
export async function markInvoicePaid(id: string) {
  const supabase = await createClient();
  const today = todayISO();
  const { data: invoice } = await supabase
    .from("invoices")
    .update({ status: "paid", paid_at: today })
    .eq("id", id)
    .eq("status", "unpaid")
    .select("number, gross_total, client_id")
    .maybeSingle();

  if (invoice) {
    await supabase.from("transactions").insert({
      kind: "income",
      occurred_on: today,
      amount: invoice.gross_total,
      description: `Zapłata za fakturę ${invoice.number}`,
      client_id: invoice.client_id,
      invoice_id: id,
    });
  }

  revalidatePath("/faktury");
  revalidatePath("/pieniadze");
  redirect(withNotice(`/faktury/${id}`, "ok", "Faktura oznaczona jako opłacona. Wpłata trafiła do przychodów."));
}

export async function deleteInvoice(id: string) {
  const supabase = await createClient();
  await supabase.from("invoices").delete().eq("id", id);
  revalidatePath("/faktury");
  redirect(withNotice("/faktury", "ok", "Faktura została usunięta."));
}
