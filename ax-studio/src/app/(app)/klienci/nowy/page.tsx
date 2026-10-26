import { Card, Notice, PageHeader } from "@/components/ui";
import { ClientForm } from "@/components/client-form";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { createClientRecord } from "../actions";

export default async function NewClientPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <PageHeader title="Nowy klient" />
      <Notice {...await noticeFrom(searchParams)} />
      <Card>
        <ClientForm action={createClientRecord} submitLabel="Zapisz klienta" />
      </Card>
    </>
  );
}
