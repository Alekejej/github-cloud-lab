"use client";

import { useState } from "react";
import { calcInvoice, VAT_RATES, type VatRate } from "@/lib/invoice";
import { formatPLN, parsePLN } from "@/lib/money";

type Row = { key: number; description: string; quantity: string; unit: string; price: string; vat: VatRate };

const emptyRow = (key: number): Row => ({ key, description: "", quantity: "1", unit: "szt.", price: "", vat: 23 });
const inputClass = "w-full rounded-xl border-2 border-field px-3 py-3 text-lg";

/** Pozycje faktury z podsumowaniem liczonym na bieżąco. */
export function InvoiceItems() {
  const [rows, setRows] = useState<Row[]>([emptyRow(0)]);

  const update = (key: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const totals = calcInvoice(
    rows.map((r) => ({
      description: r.description,
      quantity: Number(r.quantity.replace(",", ".")) || 0,
      unit: r.unit,
      unitPriceNet: parsePLN(r.price) ?? 0,
      vatRate: r.vat,
    })),
  );

  return (
    <div className="space-y-4">
      {rows.map((row, i) => (
        <fieldset key={row.key} className="rounded-2xl border-2 border-border p-4">
          <legend className="px-2 text-lg font-bold">Pozycja {i + 1}</legend>
          <div className="grid gap-4 md:grid-cols-12">
            <label className="md:col-span-12">
              <span className="mb-1 block font-bold">Co sprzedajesz?</span>
              <input
                name="item_description"
                className={inputClass}
                value={row.description}
                onChange={(e) => update(row.key, { description: e.target.value })}
                placeholder="np. Usługa księgowa za październik"
                required={i === 0}
              />
            </label>
            <label className="md:col-span-3">
              <span className="mb-1 block font-bold">Ilość</span>
              <input name="item_quantity" inputMode="decimal" className={inputClass} value={row.quantity}
                onChange={(e) => update(row.key, { quantity: e.target.value })} />
            </label>
            <label className="md:col-span-2">
              <span className="mb-1 block font-bold">Jednostka</span>
              <input name="item_unit" className={inputClass} value={row.unit}
                onChange={(e) => update(row.key, { unit: e.target.value })} />
            </label>
            <label className="md:col-span-4">
              <span className="mb-1 block font-bold">Cena netto za sztukę (zł)</span>
              <input name="item_price" inputMode="decimal" placeholder="0,00" className={inputClass} value={row.price}
                onChange={(e) => update(row.key, { price: e.target.value })} />
            </label>
            <label className="md:col-span-3">
              <span className="mb-1 block font-bold">VAT</span>
              <select name="item_vat" className={inputClass} value={row.vat}
                onChange={(e) => update(row.key, { vat: Number(e.target.value) as VatRate })}>
                {VAT_RATES.map((r) => (
                  <option key={r} value={r}>{r}%</option>
                ))}
              </select>
            </label>
          </div>
          {rows.length > 1 && (
            <button type="button" onClick={() => setRows((rs) => rs.filter((r) => r.key !== row.key))}
              className="mt-3 min-h-12 font-bold text-danger underline">
              Usuń tę pozycję
            </button>
          )}
        </fieldset>
      ))}

      <button type="button" onClick={() => setRows((rs) => [...rs, emptyRow(Math.max(...rs.map((r) => r.key)) + 1)])}
        className="min-h-14 rounded-full border-2 border-dashed border-primary px-7 text-lg font-semibold text-primary hover:bg-primary-soft">
        + Dodaj kolejną pozycję
      </button>

      <dl className="grid grid-cols-2 gap-2 rounded-2xl bg-primary-soft p-5 text-lg md:max-w-md">
        <dt>Netto:</dt><dd className="text-right">{formatPLN(totals.net)}</dd>
        <dt>VAT:</dt><dd className="text-right">{formatPLN(totals.vat)}</dd>
        <dt className="text-2xl font-bold">Do zapłaty:</dt>
        <dd className="text-right text-2xl font-bold">{formatPLN(totals.gross)}</dd>
      </dl>
    </div>
  );
}
