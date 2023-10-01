import { Employee } from "../domain/models/Employee.js";
import { MonthOfTheYear } from "../domain/models/MonthOfTheYear.js";
import { DayRange } from "../domain/models/DayRange.js";
import { PeriodId } from "../domain/models/PeriodId.js";
import { ClockDate } from "../infrastructure/clock/ClockDate.js";
import { RandomMath } from "../infrastructure/random/RandomMath.js";
import { ProjectFinder } from "../domain/services/ProjectFinder.js";
import { EmployeeRepository } from "../domain/repositories/EmployeeRepository.js";
import { Minute } from "../domain/models/Minute.js";
import { Logger } from "../domain/services/Logger.js";
import { MonthRepository } from "../domain/repositories/MonthRepository.js";
import { PeriodRepository } from "../domain/repositories/PeriodRepository.js";
import { ShiftRepository } from "../domain/repositories/ShiftRepository.js";
import { EmployeeId } from "../domain/models/EmployeeId.js";

export class FillShifts {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly periodRepository: PeriodRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly monthRepository: MonthRepository,
    private readonly projectFinder: ProjectFinder,
    private readonly clock: ClockDate,
    private readonly random: RandomMath,
    private readonly logger: Logger,
  ) {}

  async execute({
    monthOfTheYear,
    projectName,
    dayRange,
    maxRandomMinute,
  }: {
    monthOfTheYear: MonthOfTheYear;
    projectName?: string;
    dayRange: DayRange;
    maxRandomMinute: Minute;
  }) {
    this.logger.log(`Filling shifts for ${monthOfTheYear}`);
    const employees = await this.employeeRepository.getEmployees();
    const me = this.getCurrent(employees);
    const myId = me.getId();
    const now = this.clock.now();
    const projectId = await this.getProjectId(myId, projectName);
    const currentPeriodId = await this.periodRepository.getCurrentPeriodId(
      myId,
      monthOfTheYear,
    );
    this.logger.log(`Employee id: ${myId}`);

    await this.clearPreviousShifts(me, currentPeriodId, monthOfTheYear);

    const month = await this.monthRepository.getMonth(myId, monthOfTheYear);

    for (const day of month.daysBefore(now)) {
      if (day.wasWorked()) {
        this.logger.log(`Filling shifts for ${day}`);
        const randomMinutesStart = this.random.generateWithin(maxRandomMinute);
        const randomMinutesEnd = this.random.generateWithin(maxRandomMinute);
        const randomRange = dayRange.expand(
          randomMinutesStart,
          randomMinutesEnd,
        );
        const shift = day.createShiftAt(myId, currentPeriodId, randomRange);

        if (projectId) {
          shift.assignTo(projectId);
        }

        await this.shiftRepository.save(shift);
      }
    }
  }

  private async getProjectId(employeeId: EmployeeId, projectName?: string) {
    if (!projectName) {
      return;
    }

    const project = await this.projectFinder.findByNameOrThrow(
      employeeId,
      projectName,
    );

    return project.getId();
  }

  private async clearPreviousShifts(
    me: Employee,
    currentPeriodId: PeriodId,
    monthOfTheYear: MonthOfTheYear,
  ) {
    this.logger.log("Clearing previous shifts");
    const shifts = await this.shiftRepository.findBy(
      me.getId(),
      currentPeriodId,
      monthOfTheYear,
    );

    for (const shift of shifts) {
      await this.shiftRepository.deleteBy(shift.getId());
    }
  }

  private getCurrent(employees: Employee[]) {
    const currentEmployees = employees.filter((employee) =>
      employee.isCurrent(),
    );

    if (currentEmployees.length !== 1) {
      throw new Error("There should only be one current employee");
    }

    return currentEmployees[0];
  }
}
