import { HttpClient } from "./HttpClient.ts";

export type GetCalendarRequest = {
  employeeId: number;
  year: number;
  month: number;
};

export type FactorialCalendarDay = {
  id: string;
  day: number;
  date: string;
  is_laborable: boolean;
  is_leave: boolean;
  leave_color: string;
  leave_name: string;
};

export type GetCalendarResponse = Array<FactorialCalendarDay>;

export const createCalendarGetter = (client: HttpClient) =>
  (
    getCalendarRequest: GetCalendarRequest,
  ) =>
    client
      .get<GetCalendarResponse>("/attendance/calendar", {
        params: {
          id: getCalendarRequest.employeeId,
          year: getCalendarRequest.year,
          month: getCalendarRequest.month,
        },
      })
      .then((response) => response.data);
