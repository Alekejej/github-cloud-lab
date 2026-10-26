import { describe, expect, it } from "vitest";
import { calcInvoice, calcItem, invoiceNumber, nextSequence } from "../invoice";

describe("calcItem", () => {
  it("liczy netto, VAT i brutto w groszach", () => {
    expect(calcItem({ description: "x", quantity: 2, unit: "szt.", unitPriceNet: 10000, vatRate: 23 })).toEqual({
      net: 20000,
      vat: 4600,
      gross: 24600,
    });
  });

  it("zaokrągla ułamkowe ilości do pełnych groszy", () => {
    expect(calcItem({ description: "x", quantity: 1.5, unit: "h", unitPriceNet: 3333, vatRate: 8 })).toEqual({
      net: 5000,
      vat: 400,
      gross: 5400,
    });
  });
});

describe("calcInvoice", () => {
  it("sumuje pozycje z różnymi stawkami", () => {
    const totals = calcInvoice([
      { description: "a", quantity: 1, unit: "szt.", unitPriceNet: 10000, vatRate: 23 },
      { description: "b", quantity: 1, unit: "szt.", unitPriceNet: 5000, vatRate: 0 },
    ]);
    expect(totals).toEqual({ net: 15000, vat: 2300, gross: 17300 });
  });
});

describe("numeracja faktur", () => {
  it("tworzy numer FV/n/MM/RRRR", () => {
    expect(invoiceNumber(3, new Date("2026-02-10T12:00:00"))).toBe("FV/3/02/2026");
  });

  it("bierze kolejny numer po najwyższym w miesiącu", () => {
    expect(nextSequence([])).toBe(1);
    expect(nextSequence(["FV/1/10/2026", "FV/7/10/2026", "FV/2/10/2026"])).toBe(8);
  });
});
