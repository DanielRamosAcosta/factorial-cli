import camelcaseKeys from "camelcase-keys";
import { HttpClientFetch } from "../http-client/HttpClientFetch.js";
import { FactorialLogger } from "../factorial-logger/FactorialLogger.js";
import { Employees } from "./schema/Employees.js";
import { Periods } from "./schema/Periods.js";
import { Calendar } from "./schema/Calendar.js";
import { GetProjectsAssignedToProjectWorkersQuery } from "./schema/gql/GetProjectsAssignedToProjectWorkersQuery.js";
import { Shift } from "./schema/Shift.js";
import { Shifts } from "./schema/Shifts.js";
import { config } from "../config.js";

export class FactorialClient {
  constructor(private readonly client: HttpClientFetch) {}

  static async login({
    email = config.email,
    password = config.password,
  } = {}) {
    const client = HttpClientFetch.create();
    const logger = new FactorialLogger(client);

    const cookie = await logger.login({ email, password });

    const authenticatedClient = HttpClientFetch.create({
      baseURL: "https://api.factorialhr.com",
      headers: FactorialLogger.authenticatedHeadersWith(cookie),
    });

    return new FactorialClient(authenticatedClient);
  }

  async getEmployees() {
    const response = await this.client.get("/employees");

    const data = camelcaseKeys(response.data, { deep: true });

    return Employees.parse(data);
  }

  async getPeriods(employeeId: number, year: number, month: number) {
    const response = await this.client.get("/attendance/periods", {
      params: {
        year,
        month,
        employee_id: employeeId,
      },
    });

    const data = camelcaseKeys(response.data, { deep: true });

    return Periods.parse(data);
  }

  async getShifts(
    employeeId: number,
    periodId: number,
    year: number,
    month: number,
  ) {
    const response = await this.client.get("/attendance/shifts", {
      params: {
        employee_id: employeeId,
        period_id: periodId,
        year,
        month,
      },
    });

    const data = camelcaseKeys(response.data, { deep: true });

    return Shifts.parse(data);
  }

  async getCalendar(employeeId: number, year: number, month: number) {
    const response = await this.client.get("/attendance/calendar", {
      params: {
        id: employeeId,
        year,
        month,
      },
    });

    const data = camelcaseKeys(response.data, { deep: true });

    return Calendar.parse(data);
  }

  async getProjects(employeeId: number) {
    const query = `query GetProjectsAssignedToProjectWorkers($assigned: Boolean!, $employeeIds: [Int!]!, $includeSubprojects: Boolean = false, $onlyActiveProjects: Boolean!) {
      projectManagement {
        projectWorkers(
          assigned: $assigned
          employeeIds: $employeeIds
          projectActive: $onlyActiveProjects
        ) {
          id
          assigned
          employee {
            id
          }
          imputableProject {
            id
            name
            status
            subprojects @include(if: $includeSubprojects) {
              id
              name
            }
          }
        }
      }
    }`;

    const response = await this.client.post("/graphql", {
      operationName: "GetProjectsAssignedToProjectWorkersQuery",
      variables: {
        assigned: true,
        employeeIds: [employeeId],
        includeSubprojects: true,
        onlyActiveProjects: true,
      },
      query,
    });

    const data = camelcaseKeys(response.data, { deep: true });

    const graphqlResponse =
      GetProjectsAssignedToProjectWorkersQuery.parse(data);

    return graphqlResponse.data.projectManagement.projectWorkers;
  }

  async createShift({
    periodId,
    clockInHour,
    clockInMinutes,
    clockOutHour,
    clockOutMinutes,
    day,
  }: {
    periodId: number;
    clockInHour: number;
    clockInMinutes: number;
    clockOutHour: number;
    clockOutMinutes: number;
    day: number;
  }) {
    const response = await this.client.post("/attendance/shifts", {
      period_id: periodId,
      clock_in: `${clockInHour}:${clockInMinutes}`,
      clock_out: `${clockOutHour}:${clockOutMinutes}`,
      minutes: 0,
      day,
      observations: null,
      history: [],
    });

    const data = camelcaseKeys(response.data, { deep: true });

    return Shift.parse(data).id;
  }

  async setProjectToShift(shiftId: number, projectWorkerId: number) {
    const query = `mutation BulkProcessProjectTimeRecord($items: [BulkProcessProjectmanagementTimeRecordItemsInput!]!) {
      projectManagementMutations {
        bulkProcessProjectmanagementTimeRecord(items: $items) {
          timeRecords {
            id
          }
        }
      }
    }`;

    await this.client.post("/graphql", {
      operationName: "BulkProcessProjectTimeRecord",
      variables: {
        items: [{ attendanceShiftId: shiftId, projectWorkerId }],
      },
      query,
    });
  }

  async deleteShift(shiftId: number) {
    await this.client.delete(`/attendance/shifts/${shiftId}`);
  }
}
