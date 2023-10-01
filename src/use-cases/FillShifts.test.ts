import { beforeEach, describe, expect, it, vi } from "vitest";
import { FillShifts } from "./FillShifts.js";
import { RandomMath } from "../infrastructure/random/RandomMath.js";
import { ProjectFinder } from "../domain/services/ProjectFinder.js";
import { MomentOfTheDay } from "../domain/models/MomentOfTheDay.js";
import { DayRange } from "../domain/models/DayRange.js";
import { MonthOfTheYear } from "../domain/models/MonthOfTheYear.js";
import { Minute } from "../domain/models/Minute.js";
import { LoggerDummy } from "../infrastructure/logger/LoggerDummy.js";
import { ProjectRepository } from "../domain/repositories/ProjectRepository.js";
import { EmployeeRepositoryFake } from "../../test/fakes/EmployeeRepositoryFake.js";
import { PeriodRepositoryFake } from "../../test/fakes/PeriodRepositoryFake.js";
import { ShiftRepositoryFake } from "../../test/fakes/ShiftRepositoryFake.js";
import { MonthRepositoryFake } from "../../test/fakes/MonthRepositoryFake.js";
import { ClockFake } from "../../test/fakes/ClockFake.js";

describe("FillShifts", () => {
  let fillShifts: FillShifts;
  let shiftRepository: ShiftRepositoryFake;
  const currentDate = new Date("2023-10-08T14:00:00.000Z");

  beforeEach(() => {
    const projectRepositoryFactorial = {} as ProjectRepository;
    shiftRepository = new ShiftRepositoryFake();
    fillShifts = new FillShifts(
      new EmployeeRepositoryFake(),
      new PeriodRepositoryFake(),
      shiftRepository,
      new MonthRepositoryFake(),
      new ProjectFinder(projectRepositoryFactorial),
      ClockFake.at(currentDate),
      new RandomMath(),
      new LoggerDummy(),
    );
  });

  it("saves the shifts", async () => {
    vi.spyOn(shiftRepository, "save");
    const start = MomentOfTheDay.oClock(8);
    const end = MomentOfTheDay.oClock(16);
    const dayRange = DayRange.from(start).to(end);

    await fillShifts.execute({
      monthOfTheYear: MonthOfTheYear.at(2023, 10),
      dayRange,
      maxRandomMinute: new Minute(10),
    });

    expect(shiftRepository.save).toHaveBeenCalledTimes(8);
  });
});
