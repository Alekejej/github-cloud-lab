import { describe, expect, it } from "vitest";
import { addDaysISO, monthRange } from "../dates";

describe("daty", () => {
  it("wyznacza zakres miesiąca, także w roku przestępnym", () => {
    expect(monthRange("2028-02-15")).toEqual({ from: "2028-02-01", to: "2028-02-29" });
    expect(monthRange("2026-12-31")).toEqual({ from: "2026-12-01", to: "2026-12-31" });
  });

  it("dodaje dni przez granicę roku", () => {
    expect(addDaysISO("2026-12-25", 14)).toBe("2027-01-08");
  });
});
