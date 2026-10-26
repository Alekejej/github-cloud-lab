const longDate = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });

/** "2026-10-26" -> "26 października 2026" */
export function formatDate(iso: string): string {
  return longDate.format(new Date(`${iso}T12:00:00`));
}

/** Dzisiejsza data jako "RRRR-MM-DD" w strefie czasowej Polski. */
export function todayISO(): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date());
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Pierwszy i ostatni dzień miesiąca dla daty "RRRR-MM-DD". */
export function monthRange(iso: string): { from: string; to: string } {
  const [y, m] = iso.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const mm = String(m).padStart(2, "0");
  return { from: `${y}-${mm}-01`, to: `${y}-${mm}-${String(last).padStart(2, "0")}` };
}

export function monthName(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", { month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00`),
  );
}
