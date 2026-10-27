import Link from "next/link";
import { Button, Card, EmptyState, Field, Notice, PageHeader } from "@/components/ui";
import { ConfirmButton } from "@/components/confirm-button";
import { createClient } from "@/lib/supabase/server";
import { formatPLN } from "@/lib/money";
import { addDaysISO, formatDate, monthName, monthRange, todayISO } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { addTransaction, deleteTransaction } from "./actions";

export default async function MoneyPage({ searchParams }: { searchParams: SearchParams }) {
  const today = todayISO();
  const monthParam = String((await searchParams).miesiac ?? "");
  const anchor = /^\d{4}-\d{2}$/.test(monthParam) ? `${monthParam}-01` : today;
  const { from, to } = monthRange(anchor);
  const prev = addDaysISO(from, -1).slice(0, 7);
  const next = addDaysISO(to, 1).slice(0, 7);

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("transactions")
    .select("id, kind, occurred_on, amount, description")
    .gte("occurred_on", from)
    .lte("occurred_on", to)
    .order("occurred_on", { ascending: false })
    .order("created_at", { ascending: false });

  const income = (rows ?? []).filter((r) => r.kind === "income").reduce((s, r) => s + r.amount, 0);
  const expense = (rows ?? []).filter((r) => r.kind === "expense").reduce((s, r) => s + r.amount, 0);
  const balance = income - expense;

  return (
    <>
      <PageHeader eyebrow="Księgowość" title="Przychody i koszty" />
      <Notice {...await noticeFrom(searchParams)} />

      <nav aria-label="Wybór miesiąca" className="mb-6 flex flex-wrap items-center gap-4">
        <Link href={`?miesiac=${prev}`} className="min-h-12 rounded-full border-2 border-foreground px-4 py-2 text-lg font-semibold text-foreground hover:bg-foreground hover:text-white">
          ← Poprzedni
        </Link>
        <span className="text-2xl font-bold capitalize">{monthName(from)}</span>
        <Link href={`?miesiac=${next}`} className="min-h-12 rounded-full border-2 border-foreground px-4 py-2 text-lg font-semibold text-foreground hover:bg-foreground hover:text-white">
          Następny →
        </Link>
      </nav>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card><p className="text-lg text-muted">Wpłynęło</p><p className="text-3xl font-bold text-success">{formatPLN(income)}</p></Card>
        <Card><p className="text-lg text-muted">Wydano</p><p className="text-3xl font-bold text-danger">{formatPLN(expense)}</p></Card>
        <Card>
          <p className="text-lg text-muted">Zostało</p>
          <p className={`text-3xl font-bold ${balance < 0 ? "text-danger" : ""}`}>{formatPLN(balance)}</p>
        </Card>
      </div>

      <Card title="Dodaj wpis" className="mb-8">
        <form action={addTransaction} className="space-y-6">
          <fieldset>
            <legend className="mb-2 text-lg font-bold">Rodzaj</legend>
            <div className="flex flex-wrap gap-4">
              <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-2 border-field px-5 text-lg has-[:checked]:border-success has-[:checked]:bg-success-soft">
                <input type="radio" name="kind" value="income" defaultChecked className="size-6" /> Przychód (wpłynęło)
              </label>
              <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-2 border-field px-5 text-lg has-[:checked]:border-danger has-[:checked]:bg-danger-soft">
                <input type="radio" name="kind" value="expense" className="size-6" /> Koszt (wydałem)
              </label>
            </div>
          </fieldset>
          <div className="grid gap-6 md:grid-cols-3">
            <Field label="Kwota (zł)" name="amount" inputMode="decimal" placeholder="0,00" required />
            <Field label="Czego dotyczy?" name="description" placeholder="np. Paliwo, Czynsz" required />
            <Field label="Data" name="occurred_on" type="date" defaultValue={today} required />
          </div>
          <Button>Zapisz wpis</Button>
        </form>
      </Card>

      {!rows?.length ? (
        <EmptyState>Brak wpisów w tym miesiącu.</EmptyState>
      ) : (
        <ul className="divide-y-2 divide-border overflow-hidden rounded-3xl bg-surface">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <span>
                <span className="block text-lg font-bold">{r.description}</span>
                <span className="text-muted">{formatDate(r.occurred_on)}</span>
              </span>
              <span className="flex items-center gap-4">
                <span className={`text-xl font-bold ${r.kind === "income" ? "text-success" : "text-danger"}`}>
                  {r.kind === "income" ? "+" : "−"} {formatPLN(r.amount)}
                </span>
                <form action={deleteTransaction.bind(null, r.id)}>
                  <ConfirmButton variant="danger" className="min-h-12 px-4 text-base" question="Usunąć ten wpis?">
                    Usuń
                  </ConfirmButton>
                </form>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
