"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, withNotice } from "@/lib/params";

const PAGE = "/przypomnienia";

export async function addReminder(form: FormData) {
  const title = str(form, "title");
  const dueOn = str(form, "due_on");
  if (!title || !dueOn) redirect(withNotice(PAGE, "blad", "Wpisz, o czym przypomnieć, i wybierz dzień."));

  const supabase = await createClient();
  const { error } = await supabase
    .from("reminders")
    .insert({ title, due_on: dueOn, client_id: str(form, "client_id") || null });
  if (error) redirect(withNotice(PAGE, "blad", "Nie udało się zapisać przypomnienia."));

  revalidatePath(PAGE);
  revalidatePath("/");
  redirect(withNotice(PAGE, "ok", "Przypomnienie zapisane."));
}

export async function setReminderDone(id: string, done: boolean, returnTo: string) {
  const supabase = await createClient();
  await supabase.from("reminders").update({ done }).eq("id", id);
  revalidatePath(PAGE);
  revalidatePath("/");
  redirect(withNotice(returnTo, "ok", done ? "Zrobione!" : "Przywrócono przypomnienie."));
}
