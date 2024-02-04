import { describe, expect, it } from "vitest";
import { ClockDate } from "../../infrastructure/clock/ClockDate.js";
import { MonthOfTheYear } from "./MonthOfTheYear.js";

describe("MonthOfTheYear", () => {
  describe("getNearestMonthOfTheYear", () => {
    it("returns the previous month if we are in 1-5", () => {
      const now = new Date("2021-01-05");

      const monthOfTheYear = MonthOfTheYear.getNearestMonthOfTheYear(now);

      expect(monthOfTheYear).toEqual(MonthOfTheYear.at(2020, 12));
    });

    it("returns the current month if we are in 6-31", () => {
      const clock = new ClockDate();
      const now = new Date("2021-01-06");

      const monthOfTheYear = MonthOfTheYear.getNearestMonthOfTheYear(now);

      expect(monthOfTheYear).toEqual(MonthOfTheYear.at(2021, 1));
    });
  });
});
