import { Nav } from "@/components/nav";
import { signOut } from "@/app/logowanie/actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="no-print border-b-2 border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <span className="text-2xl font-bold text-primary">AX Studio</span>
          <form action={signOut}>
            <button className="min-h-12 rounded-xl px-4 text-lg font-bold text-muted underline hover:text-foreground">
              Wyloguj się
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <Nav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
