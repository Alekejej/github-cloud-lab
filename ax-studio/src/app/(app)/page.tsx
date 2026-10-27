import Link from "next/link";
import { Card, EmptyState, Eyebrow, LinkButton, Notice } from "@/components/ui";
import { ReminderList, type Reminder } from "@/components/reminder-list";
import { createClient } from "@/lib/supabase/server";
import { formatPLN } from "@/lib/money";
import { formatDate, monthName, monthRange, todayISO } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";

export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const today = todayISO();
  const { from, to } = monthRange(today);
  const supabase = await createClient();

  const [{ data: reminders }, { data: unpaid }, { data: month }, { data: profile }] = await Promise.all([
    supabase.from("reminders").select("id, title, due_on, done, clients(name)").eq("done", false).lte("due_on", today).order("due_on"),
    supabase.from("invoices").select("id, number, due_date, gross_total, clients(name)").eq("status", "unpaid").order("due_date"),
    supabase.from("transactions").select("kind, amount").gte("occurred_on", from).lte("occurred_on", to),
    supabase.from("company_profiles").select("name").maybeSingle(),
  ]);

  const income = (month ?? []).filter((t) => t.kind === "income").reduce((s, t) => s + t.amount, 0);
  const expense = (month ?? []).filter((t) => t.kind === "expense").reduce((s, t) => s + t.amount, 0);
  const unpaidSum = (unpaid ?? []).reduce((s, i) => s + i.gross_total, 0);

  return (
    <>
      <Eyebrow>Dzisiaj jest {formatDate(today)}</Eyebrow>
      <h1 className="mb-8 text-5xl font-bold md:text-6xl">
        Dzień dobry{profile?.name ? <>, <span className="text-primary">{profile.name}</span></> : ""}!
      </h1>
      <Notice {...await noticeFrom(searchParams)} />

      <div className="mb-8 flex flex-wrap gap-3">
        <LinkButton href="/faktury/nowa">+ Wystaw fakturę</LinkButton>
        <LinkButton href="/klienci/nowy" variant="secondary">+ Dodaj klienta</LinkButton>
        <LinkButton href="/pieniadze" variant="secondary">+ Wpisz wydatek</LinkButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Na dzisiaj">
          {reminders?.length ? (
            <ReminderList reminders={reminders as unknown as Reminder[]} returnTo="/" />
          ) : (
            <EmptyState>Na dziś nie ma żadnych zadań.</EmptyState>
          )}
        </Card>

        <Card title={`Pieniądze – ${monthName(today)}`}>
          <dl className="grid grid-cols-2 gap-3 text-xl">
            <dt>Wpłynęło:</dt><dd className="text-right font-bold text-success">{formatPLN(income)}</dd>
            <dt>Wydano:</dt><dd className="text-right font-bold text-danger">{formatPLN(expense)}</dd>
            <dt className="border-t-2 border-border pt-3">Zostało:</dt>
            <dd className="border-t-2 border-border pt-3 text-right text-2xl font-bold">{formatPLN(income - expense)}</dd>
          </dl>
        </Card>

        <Card title="Klienci, którzy jeszcze nie zapłacili" className="lg:col-span-2">
          {!unpaid?.length ? (
            <EmptyState>Wszystkie faktury są opłacone. 👍</EmptyState>
          ) : (
            <>
              <p className="mb-4 text-xl">
                Razem do odebrania: <strong>{formatPLN(unpaidSum)}</strong>
              </p>
              <ul className="divide-y-2 divide-border">
                {unpaid.map((inv) => {
                  const late = inv.due_date < today;
                  const client = inv.clients as unknown as { name: string } | null;
                  return (
                    <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                      <Link href={`/faktury/${inv.id}`} className="text-lg font-bold text-primary underline">
                        {client?.name} – {inv.number}
                      </Link>
                      <span className={late ? "font-bold text-danger" : "text-muted"}>
                        {late ? "Po terminie od " : "Termin: "}{formatDate(inv.due_date)}
                      </span>
                      <span className="text-lg font-bold">{formatPLN(inv.gross_total)}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
