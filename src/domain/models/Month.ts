import { Day } from "./Day.js";
import { Primitives } from "../../shared/Primitives.js";
import { MonthOfTheYear } from "./MonthOfTheYear.js";

type MonthPrimitives = Primitives<Month>;

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

  toPrimitives() {
    return {
      monthOfTheYear: this.monthOfTheYear.toPrimitives(),
      days: this.days.map(Day.toPrimitives),
    };
  }
}
