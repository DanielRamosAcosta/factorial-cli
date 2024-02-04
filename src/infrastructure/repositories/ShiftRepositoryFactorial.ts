import { Shift as FactorialShift } from "../factorial-client/schema/Shift.js";
import { FactorialClient } from "../factorial-client/FactorialClient.js";
import { Shift } from "../../domain/models/Shift.js";
import { ShiftId } from "../../domain/models/ShiftId.js";
import { EmployeeId } from "../../domain/models/EmployeeId.js";
import { PeriodId } from "../../domain/models/PeriodId.js";
import { MonthOfTheYear } from "../../domain/models/MonthOfTheYear.js";
import { ShiftRepository } from "../../domain/repositories/ShiftRepository.js";

export class ShiftRepositoryFactorial implements ShiftRepository {
  constructor(private readonly factorial: FactorialClient) {}

  async save(shift: Shift) {
    const primitives = shift.toPrimitives();

    const shiftId = await this.factorial.createShift({
      periodId: primitives.currentPeriodId,
      clockInHour: primitives.dayRange.start.hour,
      clockInMinutes: primitives.dayRange.start.minute,
      clockOutHour: primitives.dayRange.end.hour,
      clockOutMinutes: primitives.dayRange.end.minute,
      day: primitives.dayNumber,
    });

    // @ts-ignore
    shift.id = new ShiftId(shiftId);

    if (primitives.projectId) {
      await this.factorial.setProjectToShift(shiftId, primitives.projectId);
    }
  }

  async findBy(
    employeeId: EmployeeId,
    periodId: PeriodId,
    monthOfTheYear: MonthOfTheYear,
  ): Promise<Shift[]> {
    const { month, year } = monthOfTheYear.toPrimitives();

    const shifts = await this.factorial.getShifts(
      employeeId.toPrimitives(),
      periodId.toPrimitives(),
      year,
      month,
    );

    return shifts.map(ShiftRepositoryFactorial.shiftToDomain);
  }

  async deleteBy(shiftId: ShiftId) {
    await this.factorial.deleteShift(shiftId.toPrimitives());
  }

  private static shiftToDomain(shift: FactorialShift): Shift {
    return Shift.fromPrimitives({
      id: shift.id,
      employeeId: 1,
      projectId: 1,
      dayNumber: shift.day,
      currentPeriodId: shift.periodId,
      dayRange: {
        start: {
          hour: 8,
          minute: 0,
        },
        end: {
          hour: 16,
          minute: 0,
        },
      },
    });
  }
}
