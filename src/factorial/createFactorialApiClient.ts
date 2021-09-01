import { HttpClient } from "./api/HttpClient.ts";
import { CookieParserService } from "./api/services/CookieParserService.ts";
import { QueryStringService } from "./api/services/QueryStringService.ts";
import { createShiftCreator } from "./api/createShiftCreator.ts";
import { createShiftDeleter } from "./api/createShiftDeleter.ts";
import { createCalendarGetter } from "./api/createCalendarGetter.ts";
import { createPeriodsGetter } from "./api/createPeriodsGetter.ts";
import { createShiftGetter } from "./api/createShiftGetter.ts";
import {
  createEmployeesGetter,
  isMySelf,
} from "./api/createEmployeesGetter.ts";
import { createLogin, LoginRequest } from "./api/createLogin.ts";
import { FactorialApiClient } from "./FactorialApiClient.ts";

export function createFactorialApiClient(
  axiosInstance: HttpClient,
  cookieParser: CookieParserService,
  qs: QueryStringService
): FactorialApiClient {
  const getEmployees = createEmployeesGetter(axiosInstance);
  const createShift = createShiftCreator(axiosInstance);
  const deleteShift = createShiftDeleter(axiosInstance);
  const getCalendar = createCalendarGetter(axiosInstance);
  const getPeriods = createPeriodsGetter(axiosInstance);
  const getShifts = createShiftGetter(axiosInstance);
  const login = createLogin(axiosInstance, cookieParser, qs);

  const getMyEmployeeId = async () => {
    const employees = await getEmployees();
    const myself = employees.find(isMySelf);

    if (!myself) {
      throw new Error("Could not find your employee Id");
    }

    return myself.id;
  };

  const updateSessionCookie = (cookie: string) => {
    axiosInstance.updateConfig({
      headers: {
        cookie: `_factorial_session_v2=${cookie};`,
      },
    });
  };

  return {
    login: (loginRequest: LoginRequest) =>
      login(loginRequest).then(({ cookie }) => updateSessionCookie(cookie)),
    getEmployees,
    getMyEmployeeId,
    createShift,
    deleteShift,
    getCalendar,
    getPeriods,
    getShifts,
  };
}
