import { Button, Card, EmptyState, Field, LinkButton, Notice, PageHeader, Select, TextArea } from "@/components/ui";
import { InvoiceItems } from "@/components/invoice-items";
import { createClient } from "@/lib/supabase/server";
import { addDaysISO, todayISO } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { createInvoice } from "../actions";

export default async function NewInvoicePage({ searchParams }: { searchParams: SearchParams }) {
  const preselected = String((await searchParams).klient ?? "");
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, name").order("name");
  const today = todayISO();

  return (
    <>
      <PageHeader eyebrow="Faktury" title="Nowa faktura" />
      <Notice {...await noticeFrom(searchParams)} />
      {!clients?.length ? (
        <Card>
          <EmptyState>Aby wystawić fakturę, najpierw dodaj klienta.</EmptyState>
          <LinkButton href="/klienci/nowy" className="mt-6">+ Dodaj klienta</LinkButton>
        </Card>
      ) : (
        <form action={createInvoice} className="space-y-6">
          <Card title="1. Dla kogo?">
            <Select label="Klient" name="client_id" defaultValue={preselected} required>
              <option value="">— wybierz klienta —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </Card>
          <Card title="2. Daty">
            <div className="grid gap-6 md:grid-cols-3">
              <Field label="Data wystawienia" name="issue_date" type="date" defaultValue={today} required />
              <Field label="Data sprzedaży" name="sale_date" type="date" defaultValue={today} />
              <Field label="Termin płatności" name="due_date" type="date" defaultValue={addDaysISO(today, 14)} required
                hint="Domyślnie 14 dni." />
            </div>
          </Card>
          <Card title="3. Co sprzedajesz?">
            <InvoiceItems />
          </Card>
          <Card title="4. Uwagi (opcjonalnie)">
            <TextArea label="Uwagi na fakturze" name="notes" />
          </Card>
          <Button className="w-full md:w-auto">Wystaw fakturę</Button>
        </form>
      )}
    </>
  );
}
