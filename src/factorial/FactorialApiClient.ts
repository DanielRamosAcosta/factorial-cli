import {
  GetCalendarRequest,
  GetCalendarResponse,
} from "./api/createCalendarGetter.ts";
import { GetEmployeesResponse } from "./api/createEmployeesGetter.ts";
import { LoginRequest } from "./api/createLogin.ts";
import {
  GetPeriodRequest,
  GetPeriodResponse,
} from "./api/createPeriodsGetter.ts";
import {
  CreateShiftRequest,
  CreateShiftResponse,
} from "./api/createShiftCreator.ts";
import {
  DeleteShiftRequest,
  DeleteShiftResponse,
} from "./api/createShiftDeleter.ts";
import {
  GetShiftsRequest,
  GetShiftsResponse,
} from "./api/createShiftGetter.ts";

export interface FactorialApiClient {
  login(loginRequest: LoginRequest): Promise<void>;
  getEmployees(): Promise<GetEmployeesResponse>;
  getMyEmployeeId(): Promise<number>;
  createShift(
    createShiftRequest: CreateShiftRequest
  ): Promise<CreateShiftResponse>;
  deleteShift(
    deleteShiftRequest: DeleteShiftRequest
  ): Promise<DeleteShiftResponse>;
  getCalendar(
    getCalendarRequest: GetCalendarRequest
  ): Promise<GetCalendarResponse>;
  getPeriods(getPeriodRequest: GetPeriodRequest): Promise<GetPeriodResponse>;
  getShifts(getShiftsRequest: GetShiftsRequest): Promise<GetShiftsResponse>;
}
