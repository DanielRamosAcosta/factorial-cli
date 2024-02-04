import { describe, expect, it } from "vitest";
import { Month } from "./Month.js";
import { MonthOfTheYear } from "./MonthOfTheYear.js";
import { Day } from "./Day.js";
import { generate31Days } from "../../../test/mothers/generate31Days.js";

describe("Month", () => {
  describe("daysBefore", () => {
    it("filters all the days now is before the month", () => {
      const month = new Month(MonthOfTheYear.at(2021, 10), generate31Days());
      const now = new Date("2021-09-01T14:00:00.000Z");

      const daysBefore = month.daysBefore(now);

      expect(daysBefore).toHaveLength(0);
    });

    it("returns all days if now is after the month", () => {
      const month = new Month(MonthOfTheYear.at(2021, 9), generate31Days());
      const now = new Date("2021-10-01T14:00:00.000Z");

      const daysBefore = month.daysBefore(now);

      expect(daysBefore).toHaveLength(31);
    });

    it("returns all days that are after now", () => {
      const month = new Month(MonthOfTheYear.at(2021, 9), generate31Days());
      const now = new Date("2021-09-05T14:00:00.000Z");

      const daysBefore = month.daysBefore(now);

      expect(daysBefore).toEqual([
        Day.at(1),
        Day.at(2),
        Day.at(3),
        Day.at(4),
        Day.at(5),
      ]);
    });
  });
});
