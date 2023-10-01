import { EmployeeId } from "../models/EmployeeId.js";
import { MonthOfTheYear } from "../models/MonthOfTheYear.js";
import { Month } from "../models/Month.js";

export interface MonthRepository {
  getMonth(
    employeeId: EmployeeId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<Month>;
}
