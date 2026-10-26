"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { str, withNotice } from "@/lib/params";

export async function signIn(form: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: str(form, "email"),
    password: String(form.get("password") ?? ""),
  });
  if (error) redirect(withNotice("/logowanie", "blad", "Nieprawidłowy e-mail lub hasło. Spróbuj jeszcze raz."));
  redirect("/");
}

export async function signUp(form: FormData) {
  const password = String(form.get("password") ?? "");
  if (password.length < 8) {
    redirect(withNotice("/logowanie?tryb=rejestracja", "blad", "Hasło musi mieć co najmniej 8 znaków."));
  }
  const origin = (await headers()).get("origin") ?? "";
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: str(form, "email"),
    password,
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });
  if (error) redirect(withNotice("/logowanie?tryb=rejestracja", "blad", "Nie udało się założyć konta. Sprawdź adres e-mail."));
  redirect(
    withNotice("/logowanie", "ok", "Konto założone. Sprawdź skrzynkę e-mail i kliknij link, aby je potwierdzić."),
  );
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/logowanie");
}
