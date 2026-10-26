export const VAT_RATES = [23, 8, 5, 0] as const;
export type VatRate = (typeof VAT_RATES)[number];

export type ItemInput = {
  description: string;
  quantity: number;
  unit: string;
  unitPriceNet: number; // grosze
  vatRate: VatRate;
};

export type ItemTotals = { net: number; vat: number; gross: number };

export function calcItem(item: ItemInput): ItemTotals {
  const net = Math.round(item.quantity * item.unitPriceNet);
  const vat = Math.round((net * item.vatRate) / 100);
  return { net, vat, gross: net + vat };
}

export function calcInvoice(items: ItemInput[]): ItemTotals {
  return items.map(calcItem).reduce(
    (sum, t) => ({ net: sum.net + t.net, vat: sum.vat + t.vat, gross: sum.gross + t.gross }),
    { net: 0, vat: 0, gross: 0 },
  );
}

/** Numer faktury w formacie FV/<kolejny>/<MM>/<RRRR>, numeracja miesięczna. */
export function invoiceNumber(sequence: number, issueDate: Date): string {
  const month = String(issueDate.getMonth() + 1).padStart(2, "0");
  return `FV/${sequence}/${month}/${issueDate.getFullYear()}`;
}

export function nextSequence(existingNumbers: string[]): number {
  const used = existingNumbers
    .map((n) => Number(n.split("/")[1]))
    .filter((n) => Number.isInteger(n));
  return used.length ? Math.max(...used) + 1 : 1;
}

export function isVatRate(value: number): value is VatRate {
  return (VAT_RATES as readonly number[]).includes(value);
}
