import { MonthRepository } from "../../src/domain/repositories/MonthRepository.js";
import { EmployeeId } from "../../src/domain/models/EmployeeId.js";
import { MonthOfTheYear } from "../../src/domain/models/MonthOfTheYear.js";
import { Month } from "../../src/domain/models/Month.js";
import { generate31Days } from "../mothers/generate31Days.js";

export class MonthRepositoryFake implements MonthRepository {
  async getMonth(
    employeeId: EmployeeId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<Month> {
    return new Month(monthOfTheYear, generate31Days());
  }
}
