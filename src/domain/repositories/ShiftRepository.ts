import { Shift } from "../models/Shift.js";
import { ShiftId } from "../models/ShiftId.js";
import { EmployeeId } from "../models/EmployeeId.js";
import { PeriodId } from "../models/PeriodId.js";
import { MonthOfTheYear } from "../models/MonthOfTheYear.js";

export interface ShiftRepository {
  save(shift: Shift): Promise<void>;

  findBy(
    employeeId: EmployeeId,
    periodId: PeriodId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<Shift[]>;

  deleteBy(shiftId: ShiftId): Promise<void>;
}
