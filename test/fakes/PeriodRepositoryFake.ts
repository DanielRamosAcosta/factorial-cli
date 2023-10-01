import { PeriodRepository } from "../../src/domain/repositories/PeriodRepository.js";
import { EmployeeId } from "../../src/domain/models/EmployeeId.js";
import { MonthOfTheYear } from "../../src/domain/models/MonthOfTheYear.js";
import { PeriodId } from "../../src/domain/models/PeriodId.js";

export class PeriodRepositoryFake implements PeriodRepository {
  async getCurrentPeriodId(
    id: EmployeeId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<PeriodId> {
    return new PeriodId(2);
  }
}
