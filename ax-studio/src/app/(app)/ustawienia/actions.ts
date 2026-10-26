"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, withNotice } from "@/lib/params";

export async function saveCompanyProfile(form: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const { error } = await supabase.from("company_profiles").upsert({
    owner_id: data?.claims.sub,
    name: str(form, "name"),
    nip: str(form, "nip").replace(/[\s-]/g, ""),
    address: str(form, "address"),
    bank_account: str(form, "bank_account"),
    email: str(form, "email"),
    phone: str(form, "phone"),
    updated_at: new Date().toISOString(),
  });
  if (error) redirect(withNotice("/ustawienia", "blad", "Nie udało się zapisać danych firmy."));
  revalidatePath("/", "layout");
  redirect(withNotice("/ustawienia", "ok", "Dane firmy zapisane."));
}
