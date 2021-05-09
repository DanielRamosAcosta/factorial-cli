import { HttpClient } from "./HttpClient.ts";

export type GetShiftsRequest = {
  periodId: number;
};

type FactorialShift = {
  id: number;
  period_id: number;
  day: number;
  clock_in: string;
  clock_out: string;
  minutes: number;
  history: Array<never>;
  observations: null;
};

export type GetShiftsResponse = Array<FactorialShift>;

export const createShiftGetter = (client: HttpClient) =>
  (options: GetShiftsRequest) =>
    client
      .get<GetShiftsResponse>("/attendance/shifts", {
        params: {
          period_id: options.periodId,
        },
      })
      .then((response) => response.data);
