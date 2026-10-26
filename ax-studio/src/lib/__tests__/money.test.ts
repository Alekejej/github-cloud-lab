import { describe, expect, it } from "vitest";
import { parsePLN, toInputPLN } from "../money";

describe("parsePLN", () => {
  it.each([
    ["100", 10000],
    ["99,9", 9990],
    ["1 234,50", 123450],
    ["12.05 zł", 1205],
    ["0,01", 1],
  ])("%s -> %i groszy", (input, expected) => {
    expect(parsePLN(input)).toBe(expected);
  });

  it.each(["", "abc", "1,234", "-5", "1,2,3"])("odrzuca %j", (input) => {
    expect(parsePLN(input)).toBeNull();
  });
});

describe("toInputPLN", () => {
  it("formatuje grosze do pola formularza", () => {
    expect(toInputPLN(123450)).toBe("1234,50");
  });
});
