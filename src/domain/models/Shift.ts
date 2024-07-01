import { PeriodId } from "./PeriodId.js";
import { ShiftId } from "./ShiftId.js";
import { DayRange } from "./DayRange.js";
import { Primitives } from "../../shared/Primitives.js";
import { DayNumber } from "./DayNumber.js";
import { EmployeeId } from "./EmployeeId.js";
import { ProjectId } from "./ProjectId.js";
import { MonthOfTheYear } from "./MonthOfTheYear.js";

export type ShiftPrimitives = Primitives<Shift>;

export class Shift {
  static fromPrimitives(primitives: ShiftPrimitives) {
    return new Shift(
      primitives.id ? new ShiftId(primitives.id) : null,
      new EmployeeId(primitives.employeeId),
      new DayNumber(primitives.dayNumber),
      PeriodId.fromPrimitives(primitives.currentPeriodId),
      DayRange.fromPrimitives(primitives.dayRange),
      MonthOfTheYear.fromPrimitives(primitives.monthOfTheYear),
      primitives.projectId ? new ProjectId(primitives.projectId) : undefined,
    );
  }

  static create(
    employeeId: EmployeeId,
    value: DayNumber,
    currentPeriodId: PeriodId,
    dayRange: DayRange,
    monthOfTheYear: MonthOfTheYear,
  ) {
    return new Shift(
      null as any,
      employeeId,
      value,
      currentPeriodId,
      dayRange,
      monthOfTheYear,
    );
  }

  constructor(
    private readonly id: ShiftId | null,
    private readonly employeeId: EmployeeId,
    private readonly dayNumber: DayNumber,
    private readonly currentPeriodId: PeriodId,
    private readonly dayRange: DayRange,
    private readonly monthOfTheYear: MonthOfTheYear,
    private projectId?: ProjectId,
  ) {}

  getId() {
    return this.id as ShiftId;
  }

  assignTo(projectId: ProjectId) {
    this.projectId = projectId;
  }

  toPrimitives() {
    return {
      id: this.id?.toPrimitives(),
      employeeId: this.employeeId.toPrimitives(),
      dayNumber: this.dayNumber.toPrimitives(),
      currentPeriodId: this.currentPeriodId.toPrimitives(),
      dayRange: this.dayRange.toPrimitives(),
      monthOfTheYear: this.monthOfTheYear.toPrimitives(),
      projectId: this.projectId?.toPrimitives(),
    };
  }
}
