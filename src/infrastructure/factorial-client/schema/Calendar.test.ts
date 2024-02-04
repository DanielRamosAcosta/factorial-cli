import * as fs from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { Calendar } from "./Calendar.js";

describe("Calendar", () => {
  let calendarJson: any;

  beforeAll(() => {
    const data = fs.readFileSync("test/fixtures/calendar.json", "utf-8");
    calendarJson = JSON.parse(data);
  });

  it("parses all the days", () => {
    const days = Calendar.parse(calendarJson);

    expect(Array.isArray(days)).toBe(true);
  });
});
