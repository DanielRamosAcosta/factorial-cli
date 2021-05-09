import { HttpClientFetch } from "./api/HttpClientFetch.ts";
import { QueryStringServiceImpl } from "./api/services/QueryStringServiceImpl.ts";
import { CookieParserServiceImpl } from "./api/services/CookieParserServiceImpl.ts";
import { createFactorialClient } from "./createFactorialClient.ts";

export async function fillShifts(
  email: string,
  password: string,
  year: number,
  month: number,
) {
  const client = HttpClientFetch.create(
    { baseURL: "https://api.factorialhr.com" },
  );
  const queryStringService = QueryStringServiceImpl.create();
  const cookieParserService = CookieParserServiceImpl.create();

  const factorial = createFactorialClient(
    client,
    cookieParserService,
    queryStringService,
  );

  console.log("Logging in...");
  const { cookie } = await factorial.login({
    email,
    password,
  });
  console.log(`Cookie: ${cookie}`);

  client.updateConfig({
    headers: {
      cookie: `_factorial_session_v2=${cookie};`,
    },
  });

  console.log("Looking for your EmployeeId...");
  const employeeId = await factorial.getMyEmployeeId();
  console.log(`Is: ${employeeId}`);

  console.log("Getting period for", year, month);
  const period = await factorial.getPeriod({
    employeeId,
    year,
    month,
  });

  console.log("Getting saved shifts...");
  const shifts = await factorial.getShifts({ periodId: period.id });

  console.log("Cleaning all previous shifts...");
  for (const shift of shifts) {
    await factorial.deleteShift({ shiftId: shift.id });
  }

  console.log("Requesting the calendar...");
  const calendar = await factorial.getCalendar({
    employeeId,
    year,
    month,
  });

  for (const day of calendar) {
    if (factorial.isLaborable(day) && factorial.isInThePast(day)) {
      console.log(`Establishing shift for day ${day.day}`);

      await factorial.createShift({
        periodId: period.id,
        clockIn: "08:00",
        clockOut: "16:00",
        minutes: 0,
        day: day.day,
        observations: null,
        history: [],
      });
    }
  }
}
