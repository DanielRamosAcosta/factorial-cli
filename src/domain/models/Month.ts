import { Day, DayPrimitives } from "./Day.js";
import { MonthOfTheYear, MonthOfTheYearPrimitives } from "./MonthOfTheYear.js";

type MonthPrimitives = {
  monthOfTheYear: MonthOfTheYearPrimitives;
  days: Array<DayPrimitives>;
};

export class Month {
  static fromPrimitives(primitives: MonthPrimitives) {
    return new Month(
      MonthOfTheYear.fromPrimitives(primitives.monthOfTheYear),
      primitives.days.map(Day.fromPrimitives),
    );
  }

  constructor(
    private readonly monthOfTheYear: MonthOfTheYear,
    private readonly days: Day[],
  ) {}

  daysBefore(date: Date) {
    return this.days.filter((day) => day.toDate(this.monthOfTheYear) < date);
  }
}
