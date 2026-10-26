import Link from "next/link";
import { Button, Card, Field, Notice } from "@/components/ui";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { signIn, signUp } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const notice = await noticeFrom(searchParams);
  const register = (await searchParams).tryb === "rejestracja";

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-2 text-center text-5xl font-bold text-primary">AX Studio</h1>
      <p className="mb-10 text-center text-xl text-muted">Klienci, faktury i pieniądze w jednym miejscu.</p>
      <Notice {...notice} />
      <Card title={register ? "Załóż konto" : "Zaloguj się"}>
        <form action={register ? signUp : signIn} className="space-y-6">
          <Field label="Adres e-mail" name="email" type="email" autoComplete="email" required />
          <Field
            label="Hasło"
            name="password"
            type="password"
            autoComplete={register ? "new-password" : "current-password"}
            hint={register ? "Co najmniej 8 znaków." : undefined}
            minLength={register ? 8 : undefined}
            required
          />
          <Button className="w-full">{register ? "Załóż konto" : "Zaloguj się"}</Button>
        </form>
      </Card>
      <p className="mt-6 text-center text-lg">
        {register ? (
          <Link href="/logowanie" className="font-bold text-primary underline">
            Mam już konto – chcę się zalogować
          </Link>
        ) : (
          <Link href="/logowanie?tryb=rejestracja" className="font-bold text-primary underline">
            Nie mam konta – chcę je założyć
          </Link>
        )}
      </p>
    </main>
  );
}
