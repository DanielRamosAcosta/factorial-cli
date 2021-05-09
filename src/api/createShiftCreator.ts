import { HttpClient } from "./HttpClient.ts";

type CreateShiftRequest = {
  periodId: number;
  clockIn: string;
  clockOut: string;
  minutes: number;
  day: number;
  observations: null;
  history: never[];
};

type CreateShiftResponse = {
  id: number;
  period_id: number;
  day: number;
  clock_in: string;
  clock_out: string;
  minutes: number;
  history: Array<never>;
  observations: null;
};

export const createShiftCreator = (client: HttpClient) =>
  (
    createShiftRequest: CreateShiftRequest,
  ) =>
    client
      .post<CreateShiftResponse>("/attendance/shifts", {
        period_id: createShiftRequest.periodId,
        clock_in: createShiftRequest.clockIn,
        clock_out: createShiftRequest.clockOut,
        minutes: createShiftRequest.minutes,
        day: createShiftRequest.day,
        observations: createShiftRequest.observations,
        history: createShiftRequest.history,
      })
      .then((response) => response.data);
