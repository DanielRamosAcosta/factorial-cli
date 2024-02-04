import { beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs";
import { Shifts } from "./Shifts.js";

describe("Shifts", () => {
  let shiftsJson: any;

  beforeAll(() => {
    const data = fs.readFileSync("test/fixtures/shifts.json", "utf-8");
    shiftsJson = JSON.parse(data);
  });

  it("parses a list of shifts", () => {
    const shifts = Shifts.parse(shiftsJson);

    expect(Array.isArray(shifts)).toBe(true);
  });
});
