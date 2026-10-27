"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parsePLN } from "@/lib/money";
import { todayISO } from "@/lib/dates";
import { str, withNotice } from "@/lib/params";

const PAGE = "/pieniadze";

export async function addTransaction(form: FormData) {
  const kind = str(form, "kind");
  const amount = parsePLN(str(form, "amount"));
  const description = str(form, "description");
  if (kind !== "income" && kind !== "expense") redirect(withNotice(PAGE, "blad", "Wybierz: przychód czy koszt."));
  if (!amount) redirect(withNotice(PAGE, "blad", "Wpisz poprawną kwotę, np. 120,50."));
  if (!description) redirect(withNotice(PAGE, "blad", "Wpisz, czego dotyczy wpis."));

  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert({
    kind,
    amount,
    description,
    occurred_on: str(form, "occurred_on") || todayISO(),
  });
  if (error) redirect(withNotice(PAGE, "blad", "Nie udało się zapisać wpisu."));

  revalidatePath(PAGE);
  redirect(withNotice(PAGE, "ok", kind === "income" ? "Przychód zapisany." : "Koszt zapisany."));
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  await supabase.from("transactions").delete().eq("id", id);
  revalidatePath(PAGE);
  redirect(withNotice(PAGE, "ok", "Wpis usunięty."));
}
