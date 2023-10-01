import { FactorialClient } from "../factorial-client/FactorialClient.js";
import { EmployeeId } from "../../domain/models/EmployeeId.js";
import { PeriodId } from "../../domain/models/PeriodId.js";
import { MonthOfTheYear } from "../../domain/models/MonthOfTheYear.js";
import { PeriodRepository } from "../../domain/repositories/PeriodRepository.js";

export class PeriodRepositoryFactorial implements PeriodRepository {
  constructor(private readonly factorial: FactorialClient) {}

  async getCurrentPeriodId(
    id: EmployeeId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<PeriodId> {
    const { year, month } = monthOfTheYear.toPrimitives();

    const periods = await this.factorial.getPeriods(
      id.toPrimitives(),
      year,
      month,
    );

    return PeriodId.fromPrimitives(periods[0].id);
  }
}
