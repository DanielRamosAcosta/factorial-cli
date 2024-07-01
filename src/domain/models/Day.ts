import { Leave, LeavePrimitives } from "./Leave.js";
import { PeriodId } from "./PeriodId.js";
import { Shift } from "./Shift.js";
import { DayRange } from "./DayRange.js";
import { DayNumber } from "./DayNumber.js";
import { MonthOfTheYear, MonthOfTheYearPrimitives } from "./MonthOfTheYear.js";
import { EmployeeId } from "./EmployeeId.js";
import { Year } from "./Year.js";
import { MonthNumber } from "./MonthNumber.js";

export type DayPrimitives = {
  monthOfTheYear: MonthOfTheYearPrimitives;
  dayNumber: number;
  leaves: Array<LeavePrimitives>;
  isLaborable: boolean;
};

export class Day {
  static fromPrimitives(primitives: DayPrimitives) {
    return new Day(
      MonthOfTheYear.fromPrimitives(primitives.monthOfTheYear),
      new DayNumber(primitives.dayNumber),
      primitives.leaves.map(Leave.fromPrimitives),
      primitives.isLaborable,
    );
  }

  static at(number: number) {
    return new Day(
      new MonthOfTheYear(new Year(2024), new MonthNumber(7)),
      new DayNumber(number),
      [],
      true,
    );
  }

  constructor(
    private readonly monthOfTheYear: MonthOfTheYear,
    private readonly dayNumber: DayNumber,
    private readonly leaves: Leave[],
    private readonly isLaborable: boolean,
  ) {}

  wasWorked() {
    return !this.hasVacationsOrHoliday() && this.isLaborable;
  }

  private hasVacationsOrHoliday() {
    return this.leaves.length > 0;
  }

  createShiftAt(
    employeeId: EmployeeId,
    currentPeriodId: PeriodId,
    dayRange: DayRange,
  ) {
    return Shift.create(
      employeeId,
      this.dayNumber,
      currentPeriodId,
      dayRange,
      this.monthOfTheYear,
    );
  }

  toDate(monthOfTheYear: MonthOfTheYear) {
    return new Date(
      monthOfTheYear.toPrimitives().year,
      monthOfTheYear.toPrimitives().month - 1,
      this.dayNumber.toPrimitives(),
    );
  }

  toString(): string {
    return this.dayNumber.toString();
  }
}
