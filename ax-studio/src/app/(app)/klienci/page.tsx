import Link from "next/link";
import { EmptyState, LinkButton, Notice, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { noticeFrom, type SearchParams } from "@/lib/params";

export default async function ClientsPage({ searchParams }: { searchParams: SearchParams }) {
  const notice = await noticeFrom(searchParams);
  const query = String((await searchParams).szukaj ?? "").trim();

  const supabase = await createClient();
  let request = supabase.from("clients").select("id, name, phone, email").order("name");
  if (query) request = request.ilike("name", `%${query.replace(/[%_]/g, "")}%`);
  const { data: clients } = await request;

  return (
    <>
      <PageHeader title="Klienci">
        <LinkButton href="/klienci/nowy">+ Dodaj klienta</LinkButton>
      </PageHeader>
      <Notice {...notice} />

      <form className="mb-6 flex flex-wrap gap-3" role="search">
        <label className="flex-1">
          <span className="sr-only">Szukaj klienta</span>
          <input
            name="szukaj"
            defaultValue={query}
            placeholder="Wpisz nazwę klienta…"
            className="w-full rounded-lg border-2 border-border px-4 py-3 text-lg"
          />
        </label>
        <button className="min-h-14 rounded-xl border-2 border-primary px-6 text-lg font-bold text-primary">Szukaj</button>
      </form>

      {!clients?.length ? (
        <EmptyState>
          {query ? "Nie znaleziono klienta o tej nazwie." : "Nie masz jeszcze żadnych klientów. Kliknij „Dodaj klienta”."}
        </EmptyState>
      ) : (
        <ul className="divide-y-2 divide-border rounded-2xl border-2 border-border bg-surface">
          {clients.map((c) => (
            <li key={c.id}>
              <Link href={`/klienci/${c.id}`} className="flex flex-wrap items-center justify-between gap-2 p-5 hover:bg-blue-50">
                <span className="text-xl font-bold text-primary underline">{c.name}</span>
                <span className="text-muted">{[c.phone, c.email].filter(Boolean).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
