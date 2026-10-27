import { Button, Card, EmptyState, Field, Notice, PageHeader, Select } from "@/components/ui";
import { ReminderList, type Reminder } from "@/components/reminder-list";
import { createClient } from "@/lib/supabase/server";
import { todayISO } from "@/lib/dates";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { addReminder } from "./actions";

export default async function RemindersPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const [{ data: open }, { data: done }, { data: clients }] = await Promise.all([
    supabase.from("reminders").select("id, title, due_on, done, clients(name)").eq("done", false).order("due_on"),
    supabase
      .from("reminders")
      .select("id, title, due_on, done, clients(name)")
      .eq("done", true)
      .order("due_on", { ascending: false })
      .limit(10),
    supabase.from("clients").select("id, name").order("name"),
  ]);

  return (
    <>
      <PageHeader eyebrow="Kalendarz" title="Przypomnienia" />
      <Notice {...await noticeFrom(searchParams)} />

      <Card title="Nowe przypomnienie" className="mb-8">
        <form action={addReminder} className="space-y-6">
          <Field label="O czym przypomnieć?" name="title" placeholder="np. Zadzwonić do pana Kowalskiego" required />
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Kiedy?" name="due_on" type="date" defaultValue={todayISO()} required />
            <Select label="Klient (opcjonalnie)" name="client_id" defaultValue="">
              <option value="">— brak —</option>
              {clients?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </div>
          <Button>Zapisz przypomnienie</Button>
        </form>
      </Card>

      <Card title="Do zrobienia" className="mb-8">
        {open?.length ? (
          <ReminderList reminders={open as unknown as Reminder[]} returnTo="/przypomnienia" />
        ) : (
          <EmptyState>Nie masz nic do zrobienia. 🎉</EmptyState>
        )}
      </Card>

      {!!done?.length && (
        <Card title="Ostatnio zrobione">
          <ReminderList reminders={done as unknown as Reminder[]} returnTo="/przypomnienia" />
        </Card>
      )}
    </>
  );
}
