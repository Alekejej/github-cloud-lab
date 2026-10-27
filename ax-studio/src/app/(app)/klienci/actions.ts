"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, withNotice } from "@/lib/params";

function clientFields(form: FormData) {
  return {
    name: str(form, "name"),
    nip: str(form, "nip").replace(/[\s-]/g, ""),
    phone: str(form, "phone"),
    email: str(form, "email"),
    address: str(form, "address"),
    notes: str(form, "notes"),
  };
}

export async function createClientRecord(form: FormData) {
  const fields = clientFields(form);
  if (!fields.name) redirect(withNotice("/klienci/nowy", "blad", "Wpisz nazwę klienta."));

  const supabase = await createClient();
  const { data, error } = await supabase.from("clients").insert(fields).select("id").single();
  if (error) redirect(withNotice("/klienci/nowy", "blad", "Nie udało się zapisać klienta. Spróbuj ponownie."));

  revalidatePath("/klienci");
  redirect(withNotice(`/klienci/${data.id}`, "ok", "Klient został zapisany."));
}

export async function updateClientRecord(id: string, form: FormData) {
  const fields = clientFields(form);
  const back = `/klienci/${id}`;
  if (!fields.name) redirect(withNotice(back, "blad", "Wpisz nazwę klienta."));

  const supabase = await createClient();
  const { error } = await supabase.from("clients").update(fields).eq("id", id);
  if (error) redirect(withNotice(back, "blad", "Nie udało się zapisać zmian."));

  revalidatePath("/klienci");
  redirect(withNotice(back, "ok", "Zmiany zostały zapisane."));
}

export async function deleteClientRecord(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) {
    redirect(
      withNotice(`/klienci/${id}`, "blad", "Nie można usunąć klienta, który ma wystawione faktury."),
    );
  }
  revalidatePath("/klienci");
  redirect(withNotice("/klienci", "ok", "Klient został usunięty."));
}
