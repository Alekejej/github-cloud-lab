// Kwoty w aplikacji to zawsze liczby całkowite w groszach.

const formatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

export function formatPLN(grosze: number): string {
  return formatter.format(grosze / 100);
}

/**
 * Zamienia tekst wpisany przez użytkownika ("1 234,50", "99.9", "100 zł") na grosze.
 * Zwraca null, gdy tekstu nie da się odczytać jako kwoty.
 */
export function parsePLN(input: string): number | null {
  const cleaned = input
    .replace(/zł|pln/gi, "")
    .replace(/[\s ]/g, "")
    .replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const [whole, fraction = ""] = cleaned.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

/** Wartość dla pola formularza, np. 123450 -> "1234,50". */
export function toInputPLN(grosze: number): string {
  return (grosze / 100).toFixed(2).replace(".", ",");
}
