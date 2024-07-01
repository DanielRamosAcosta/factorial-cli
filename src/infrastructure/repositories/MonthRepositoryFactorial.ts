import { FactorialClient } from "../factorial-client/FactorialClient.js";
import { EmployeeId } from "../../domain/models/EmployeeId.js";
import {
  MonthOfTheYear,
  MonthOfTheYearPrimitives,
} from "../../domain/models/MonthOfTheYear.js";
import { Month } from "../../domain/models/Month.js";
import { CalendarDay } from "../factorial-client/schema/CalendarDay.js";
import { DayPrimitives } from "../../domain/models/Day.js";
import { Leave as FactorialLeave } from "../factorial-client/schema/Leave.js";
import { LeavePrimitives } from "../../domain/models/Leave.js";
import { MonthRepository } from "../../domain/repositories/MonthRepository.js";

export class MonthRepositoryFactorial implements MonthRepository {
  constructor(private readonly factorial: FactorialClient) {}

  async getMonth(
    employeeId: EmployeeId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<Month> {
    const { year, month } = monthOfTheYear.toPrimitives();
    const calendar = await this.factorial.getCalendar(
      employeeId.toPrimitives(),
      year,
      month,
    );

    return Month.fromPrimitives({
      monthOfTheYear: monthOfTheYear.toPrimitives(),
      days: calendar.map((d) =>
        MonthRepositoryFactorial.dayToDomain(d, monthOfTheYear.toPrimitives()),
      ),
    });
  }

  private static dayToDomain(
    day: CalendarDay,
    monthOfTheYear: MonthOfTheYearPrimitives,
  ): DayPrimitives {
    return {
      dayNumber: day.day,
      leaves: day.leaves.map(MonthRepositoryFactorial.leaveToDomain),
      isLaborable: day.isLaborable,
      monthOfTheYear,
    };
  }

  private static leaveToDomain(lave: FactorialLeave): LeavePrimitives {
    return {
      name: lave.name,
    };
  }
}
