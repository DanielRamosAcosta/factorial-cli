import { HttpClient } from "./api/HttpClient.ts";
import { CookieParserService } from "./api/services/CookieParserService.ts";
import { QueryStringService } from "./api/services/QueryStringService.ts";
import { createShiftCreator } from "./api/createShiftCreator.ts";
import { createShiftDeleter } from "./api/createShiftDeleter.ts";
import {
  createCalendarGetter,
  FactorialCalendarDay,
} from "./api/createCalendarGetter.ts";
import { createPeriodsGetter } from "./api/createPeriodsGetter.ts";
import { createShiftGetter } from "./api/createShiftGetter.ts";
import {
  createEmployeesGetter,
  isMySelf,
} from "./api/createEmployeesGetter.ts";
import { createLogin } from "./api/createLogin.ts";

export function createFactorialClient(
  axiosInstance: HttpClient,
  cookieParser: CookieParserService,
  qs: QueryStringService,
) {
  const getEmployees = createEmployeesGetter(axiosInstance);
  const createShift = createShiftCreator(axiosInstance);
  const deleteShift = createShiftDeleter(axiosInstance);
  const getCalendar = createCalendarGetter(axiosInstance);
  const getPeriods = createPeriodsGetter(axiosInstance);
  const getShifts = createShiftGetter(axiosInstance);
  const login = createLogin(axiosInstance, cookieParser, qs);

  const isWeekend = (day: FactorialCalendarDay) => !day.is_laborable;

  const isHoliday = (day: FactorialCalendarDay) =>
    day.is_leave && day.leave_name !== "Teletrabajo";

  const isInTheFuture = (day: FactorialCalendarDay) => {
    const today = new Date();
    const currentCalendarDate = new Date(day.date);

    return currentCalendarDate.getMonth() === today.getMonth() &&
      day.day > today.getDate();
  };

  const isLaborable = (day: FactorialCalendarDay) =>
    !isWeekend(day) && !isHoliday(day);

  const isInThePast = (day: FactorialCalendarDay) => !isInTheFuture(day);

  const getMyEmployeeId = async () => {
    const employees = await getEmployees();
    const myself = employees.find(isMySelf);

    if (!myself) {
      throw new Error("Could not find your employee Id");
    }

    return myself.id;
  };

  return {
    login,
    getEmployees,
    getMyEmployeeId,
    createShift,
    deleteShift,
    getCalendar,
    getPeriods,
    getShifts,
    isWeekend,
    isHoliday,
    isInTheFuture,
    isLaborable,
    isInThePast,
  };
}
