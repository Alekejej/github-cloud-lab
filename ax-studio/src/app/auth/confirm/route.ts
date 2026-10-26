import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withNotice } from "@/lib/params";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const tokenHash = params.get("token_hash");
  const type = params.get("type") as EmailOtpType | null;
  const code = params.get("code");
  const supabase = await createClient();

  // Obsługujemy oba formaty linku z Supabase: token_hash (własny szablon) oraz code (PKCE).
  const { error } = tokenHash && type
    ? await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    : code
      ? await supabase.auth.exchangeCodeForSession(code)
      : { error: new Error("missing token") };

  if (!error) redirect(withNotice("/ustawienia", "ok", "Konto potwierdzone. Uzupełnij dane swojej firmy."));
  redirect(withNotice("/logowanie", "blad", "Link jest nieprawidłowy lub wygasł."));
}
