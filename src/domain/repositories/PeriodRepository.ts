import { EmployeeId } from "../models/EmployeeId.js";
import { MonthOfTheYear } from "../models/MonthOfTheYear.js";
import { PeriodId } from "../models/PeriodId.js";

export interface PeriodRepository {
  getCurrentPeriodId(
    id: EmployeeId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<PeriodId>;
}
