import { Nav } from "@/components/nav";
import { signOut } from "@/app/logowanie/actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="no-print bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <span className="font-display text-3xl font-extrabold tracking-tight">
            AX <span className="text-primary">Studio</span>
          </span>
          <form action={signOut}>
            <button className="min-h-12 rounded-full px-4 text-lg font-semibold text-muted underline underline-offset-4 hover:text-foreground">
              Wyloguj się
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-6xl border-b border-border px-4 pb-4">
          <Nav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
