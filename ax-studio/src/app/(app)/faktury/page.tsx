import Link from "next/link";
import { EmptyState, LinkButton, Notice, PageHeader, StatusBadge } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { formatPLN } from "@/lib/money";
import { formatDate, todayISO } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";

export default async function InvoicesPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, number, issue_date, due_date, gross_total, status, clients(name)")
    .order("issue_date", { ascending: false })
    .order("created_at", { ascending: false });
  const today = todayISO();

  return (
    <>
      <PageHeader title="Faktury">
        <LinkButton href="/faktury/nowa">+ Wystaw fakturę</LinkButton>
      </PageHeader>
      <Notice {...await noticeFrom(searchParams)} />
      {!invoices?.length ? (
        <EmptyState>Nie masz jeszcze faktur. Kliknij „Wystaw fakturę”.</EmptyState>
      ) : (
        <ul className="divide-y-2 divide-border rounded-2xl border-2 border-border bg-surface">
          {invoices.map((inv) => {
            const overdue = inv.status === "unpaid" && inv.due_date < today;
            const client = inv.clients as unknown as { name: string } | null;
            return (
              <li key={inv.id}>
                <Link href={`/faktury/${inv.id}`} className="grid gap-2 p-5 hover:bg-blue-50 md:grid-cols-[1fr_1fr_auto_auto] md:items-center md:gap-6">
                  <span>
                    <span className="block text-xl font-bold text-primary underline">{inv.number}</span>
                    <span className="text-muted">{client?.name}</span>
                  </span>
                  <span className={overdue ? "font-bold text-danger" : "text-muted"}>
                    {overdue ? "Po terminie! " : "Termin: "}
                    {formatDate(inv.due_date)}
                  </span>
                  <span className="text-xl font-bold">{formatPLN(inv.gross_total)}</span>
                  <StatusBadge paid={inv.status === "paid"} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
