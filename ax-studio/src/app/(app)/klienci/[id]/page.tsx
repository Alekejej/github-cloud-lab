import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, EmptyState, LinkButton, Notice, PageHeader, StatusBadge } from "@/components/ui";
import { ClientForm } from "@/components/client-form";
import { ConfirmButton } from "@/components/confirm-button";
import { createClient } from "@/lib/supabase/server";
import { formatPLN } from "@/lib/money";
import { formatDate } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { deleteClientRecord, updateClientRecord } from "../actions";

export default async function ClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: client }, { data: invoices }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("invoices")
      .select("id, number, issue_date, gross_total, status")
      .eq("client_id", id)
      .order("issue_date", { ascending: false }),
  ]);
  if (!client) notFound();

  return (
    <>
      <PageHeader title={client.name}>
        <LinkButton href={`/faktury/nowa?klient=${client.id}`}>+ Wystaw fakturę</LinkButton>
        {client.phone && (
          <LinkButton variant="secondary" href={`tel:${client.phone}`}>
            Zadzwoń: {client.phone}
          </LinkButton>
        )}
      </PageHeader>
      <Notice {...await noticeFrom(searchParams)} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Dane klienta">
          <ClientForm action={updateClientRecord.bind(null, client.id)} values={client} submitLabel="Zapisz zmiany" />
        </Card>

        <Card title="Faktury tego klienta">
          {!invoices?.length ? (
            <EmptyState>Brak faktur.</EmptyState>
          ) : (
            <ul className="divide-y-2 divide-border">
              {invoices.map((inv) => (
                <li key={inv.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <Link href={`/faktury/${inv.id}`} className="font-bold text-primary underline">
                    {inv.number}
                  </Link>
                  <span>{formatDate(inv.issue_date)}</span>
                  <span className="font-bold">{formatPLN(inv.gross_total)}</span>
                  <StatusBadge paid={inv.status === "paid"} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <form action={deleteClientRecord.bind(null, client.id)} className="mt-10">
        <ConfirmButton variant="danger" question={`Czy na pewno usunąć klienta ${client.name}?`}>
          Usuń klienta
        </ConfirmButton>
      </form>
    </>
  );
}
