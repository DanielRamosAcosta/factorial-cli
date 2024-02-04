import { beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs";
import { Periods } from "./Periods.js";

describe("Periods", () => {
  let periodsJson: any;

  beforeAll(() => {
    const data = fs.readFileSync("test/fixtures/periods.json", "utf-8");
    periodsJson = JSON.parse(data);
  });

  it("parses a list of periods", () => {
    const periods = Periods.parse(periodsJson);

    expect(Array.isArray(periods)).toBe(true);
  });
});
