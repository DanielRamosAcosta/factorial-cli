import { HttpClient } from "./HttpClient.ts";

export type GetPeriodRequest = {
  year: number;
  month: number;
  employeeId: number;
};

type FactorialPeriod = {
  id: number;
  employee_id: number;
  year: number;
  month: number;
  state: "pending";
  estimated_minutes: number;
  worked_minutes: number;
  distribution: number[];
  permissions: { approve_period: boolean; approve: boolean; edit: boolean };
};

export type GetPeriodResponse = Array<FactorialPeriod>;

export const createPeriodGetter = (client: HttpClient) =>
  (getPeriodRequest: GetPeriodRequest) =>
    client
      .get<GetPeriodResponse>("/attendance/periods", {
        params: {
          year: getPeriodRequest.year,
          month: getPeriodRequest.month,
          employee_id: getPeriodRequest.employeeId,
        },
      })
      .then((response) => response.data)
      .then((periods) =>
        periods.length !== 1
          ? Promise.reject(
            new Error(
              `Unexpected number of periods for date ${getPeriodRequest.year}/${getPeriodRequest.month}. Employee: ${getPeriodRequest.employeeId}. Periods: ${periods.length}`,
            ),
          )
          : periods
      )
      .then((periods) => periods[0]);
