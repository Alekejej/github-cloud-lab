import { notFound } from "next/navigation";
import { Button, Notice, StatusBadge } from "@/components/ui";
import { ConfirmButton } from "@/components/confirm-button";
import { PrintButton } from "@/components/print-button";
import { createClient } from "@/lib/supabase/server";
import { formatPLN } from "@/lib/money";
import { formatDate } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { deleteInvoice, markInvoicePaid } from "../actions";

export default async function InvoicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: invoice }, { data: items }, { data: seller }] = await Promise.all([
    supabase.from("invoices").select("*, clients(*)").eq("id", id).maybeSingle(),
    supabase.from("invoice_items").select("*").eq("invoice_id", id).order("position"),
    supabase.from("company_profiles").select("*").maybeSingle(),
  ]);
  if (!invoice) notFound();
  const buyer = invoice.clients;
  const paid = invoice.status === "paid";

  return (
    <>
      <div className="no-print mb-6 flex flex-wrap gap-3">
        <PrintButton />
        {!paid && (
          <form action={markInvoicePaid.bind(null, id)}>
            <Button variant="secondary">✓ Klient zapłacił</Button>
          </form>
        )}
      </div>
      <div className="no-print">
        <Notice {...await noticeFrom(searchParams)} />
        {!seller?.name && (
          <Notice error="Uzupełnij dane swojej firmy w zakładce „Moja firma” – pojawią się na fakturze." />
        )}
      </div>

      <article className="rounded-2xl border-2 border-border bg-surface p-8 print:border-0 print:p-0">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Faktura VAT {invoice.number}</h1>
            <p className="no-print mt-2"><StatusBadge paid={paid} /></p>
          </div>
          <dl className="grid grid-cols-[auto_auto] gap-x-4 text-right">
            <dt className="text-muted">Data wystawienia:</dt><dd>{formatDate(invoice.issue_date)}</dd>
            <dt className="text-muted">Data sprzedaży:</dt><dd>{formatDate(invoice.sale_date)}</dd>
            <dt className="text-muted">Termin płatności:</dt><dd className="font-bold">{formatDate(invoice.due_date)}</dd>
          </dl>
        </header>

        <div className="mb-8 grid gap-6 md:grid-cols-2 print:grid-cols-2">
          <div>
            <h2 className="mb-1 font-bold text-muted">Sprzedawca</h2>
            <p className="font-bold">{seller?.name}</p>
            <p className="whitespace-pre-line">{seller?.address}</p>
            {seller?.nip && <p>NIP: {seller.nip}</p>}
          </div>
          <div>
            <h2 className="mb-1 font-bold text-muted">Nabywca</h2>
            <p className="font-bold">{buyer?.name}</p>
            <p className="whitespace-pre-line">{buyer?.address}</p>
            {buyer?.nip && <p>NIP: {buyer.nip}</p>}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="py-2 pr-2">Lp.</th>
                <th className="py-2 pr-2">Nazwa</th>
                <th className="py-2 pr-2 text-right">Ilość</th>
                <th className="py-2 pr-2 text-right">Cena netto</th>
                <th className="py-2 pr-2 text-right">VAT</th>
                <th className="py-2 pr-2 text-right">Netto</th>
                <th className="py-2 text-right">Brutto</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((it, i) => (
                <tr key={it.id} className="border-b border-border">
                  <td className="py-2 pr-2">{i + 1}</td>
                  <td className="py-2 pr-2">{it.description}</td>
                  <td className="py-2 pr-2 text-right">{Number(it.quantity).toLocaleString("pl-PL")} {it.unit}</td>
                  <td className="py-2 pr-2 text-right">{formatPLN(it.unit_price_net)}</td>
                  <td className="py-2 pr-2 text-right">{it.vat_rate}%</td>
                  <td className="py-2 pr-2 text-right">{formatPLN(it.net)}</td>
                  <td className="py-2 text-right">{formatPLN(it.gross)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="ml-auto mt-6 grid max-w-sm grid-cols-2 gap-1">
          <dt>Razem netto:</dt><dd className="text-right">{formatPLN(invoice.net_total)}</dd>
          <dt>Razem VAT:</dt><dd className="text-right">{formatPLN(invoice.vat_total)}</dd>
          <dt className="text-xl font-bold">Do zapłaty:</dt>
          <dd className="text-right text-xl font-bold">{formatPLN(invoice.gross_total)}</dd>
        </dl>

        {seller?.bank_account && (
          <p className="mt-6">Numer konta: <strong>{seller.bank_account}</strong></p>
        )}
        {invoice.notes && <p className="mt-4 whitespace-pre-line">Uwagi: {invoice.notes}</p>}
      </article>

      <form action={deleteInvoice.bind(null, id)} className="no-print mt-10">
        <ConfirmButton variant="danger" question={`Czy na pewno usunąć fakturę ${invoice.number}?`}>
          Usuń fakturę
        </ConfirmButton>
      </form>
    </>
  );
}
