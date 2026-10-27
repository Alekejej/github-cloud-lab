import { formatDate, todayISO } from "@/lib/dates";
import { setReminderDone } from "@/app/(app)/przypomnienia/actions";

export type Reminder = { id: string; title: string; due_on: string; done: boolean; clients: { name: string } | null };

export function ReminderList({ reminders, returnTo }: { reminders: Reminder[]; returnTo: string }) {
  const today = todayISO();
  return (
    <ul className="divide-y-2 divide-border">
      {reminders.map((r) => {
        const late = !r.done && r.due_on < today;
        return (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <span className={r.done ? "text-muted line-through" : ""}>
              <span className="block text-lg font-bold">{r.title}</span>
              <span className={late ? "font-bold text-danger" : "text-muted"}>
                {late ? "Zaległe – " : r.due_on === today ? "Dzisiaj – " : ""}
                {formatDate(r.due_on)}
                {r.clients && ` · ${r.clients.name}`}
              </span>
            </span>
            <form action={setReminderDone.bind(null, r.id, !r.done, returnTo)}>
              <button className={`min-h-12 rounded-full border-2 px-5 text-lg font-semibold ${
                r.done ? "border-border text-muted" : "border-success text-success hover:bg-success-soft"
              }`}>
                {r.done ? "Przywróć" : "✓ Zrobione"}
              </button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}
