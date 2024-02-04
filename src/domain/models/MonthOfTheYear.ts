import { Year } from "./Year.js";
import { MonthNumber } from "./MonthNumber.js";
import { Primitives } from "../../shared/Primitives.js";

export type MonthOfTheYearPrimitives = Primitives<MonthOfTheYear>;

export class MonthOfTheYear {
  static at(year: number, month: number) {
    return new MonthOfTheYear(new Year(year), new MonthNumber(month));
  }

  static fromPrimitives(primitives: MonthOfTheYearPrimitives) {
    return new MonthOfTheYear(
      new Year(primitives.year),
      new MonthNumber(primitives.month),
    );
  }

  /**
   * If we are in 1-5, we return the previous month.
   * If we are in 6-31, we return the current month.
   */
  static getNearestMonthOfTheYear(now: Date): MonthOfTheYear {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nearestThreshold = 6;

    if (now.getDate() >= nearestThreshold) {
      return new MonthOfTheYear(new Year(year), new MonthNumber(month + 1));
    }

    const newDate = new Date(year, month - 1, nearestThreshold + 1);

    return MonthOfTheYear.getNearestMonthOfTheYear(newDate);
  }

  constructor(
    private readonly year: Year,
    private readonly month: MonthNumber,
  ) {}

  toPrimitives() {
    return {
      year: this.year.toPrimitives(),
      month: this.month.toPrimitives(),
    };
  }

  toString(): string {
    return `${this.year}-${this.month}`;
  }
}
