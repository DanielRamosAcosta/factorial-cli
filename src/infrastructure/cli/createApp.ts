import { FactorialClient } from "../factorial-client/FactorialClient.js";
import { FillShifts } from "../../use-cases/FillShifts.js";
import { EmployeeRepositoryFactorial } from "../repositories/EmployeeRepositoryFactorial.js";
import { PeriodRepositoryFactorial } from "../repositories/PeriodRepositoryFactorial.js";
import { ShiftRepositoryFactorial } from "../repositories/ShiftRepositoryFactorial.js";
import { MonthRepositoryFactorial } from "../repositories/MonthRepositoryFactorial.js";
import { ProjectFinder } from "../../domain/services/ProjectFinder.js";
import { ProjectRepositoryFactorial } from "../repositories/ProjectRepositoryFactorial.js";
import { ClockDate } from "../clock/ClockDate.js";
import { RandomMath } from "../random/RandomMath.js";
import { ProjectRepositoryCached } from "../repositories/ProjectRepositoryCached.js";
import { LoggerConsole } from "../logger/LoggerConsole.js";

export async function createApp(email: string, password: string) {
  const factorial = await FactorialClient.login({
    email,
    password,
  });

  const fillShifts = new FillShifts(
    new EmployeeRepositoryFactorial(factorial),
    new PeriodRepositoryFactorial(factorial),
    new ShiftRepositoryFactorial(factorial),
    new MonthRepositoryFactorial(factorial),
    new ProjectFinder(
      new ProjectRepositoryCached(new ProjectRepositoryFactorial(factorial)),
    ),
    new ClockDate(),
    new RandomMath(),
    new LoggerConsole(),
  );

  return { fillShifts };
}

export type App = Awaited<ReturnType<typeof createApp>>;
