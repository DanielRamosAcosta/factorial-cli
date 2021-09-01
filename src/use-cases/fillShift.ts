import { addRandomnessToTime } from "../utils/addRandomnessToTime.ts";
import { FactorialApiClient } from "../factorial/FactorialApiClient.ts";
import { FactorialUtils } from "../factorial/FactorialUtils.ts";

export const createFillShifts =
  (factorial: FactorialApiClient, factorialUtils: FactorialUtils) =>
  async (
    email: string,
    password: string,
    year: number,
    month: number,
    randomness: number,
    entryTime: number,
    exitTime: number
  ) => {
    console.log("Logging in...");
    await factorial.login({
      email,
      password,
    });
    console.log("Loggin done...");

    console.log("Looking for your EmployeeId...");
    const employeeId = await factorial.getMyEmployeeId();
    console.log(`Is: ${employeeId}`);

    console.log("Getting period for", year, month);
    const periods = await factorial.getPeriods({
      employeeId,
      year,
      month,
    });

    const period = periods.find((p) => p.permissions.edit);

    if (!period) {
      throw new Error(`Could not find an editable period`);
    }

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
      if (factorialUtils.isLaborable(day) && factorialUtils.isInThePast(day)) {
        const clockIn = {
          hours: entryTime ?? "08",
          minutes:
            randomness == 0
              ? "00"
              : addRandomnessToTime(25, randomness).toString().padStart(1, "0"),
        };
        const clockOut = {
          hours: exitTime ?? "16",
          minutes:
            randomness == 0
              ? "00"
              : addRandomnessToTime(35, randomness).toString().padStart(1, "0"),
        };

        console.log(
          `Establishing shift for day ${day.day
            .toString()
            .padStart(2, "0")} --> [${clockIn.hours}:${clockIn.minutes} - ${
            clockOut.hours
          }:${clockOut.minutes}]`
        );

        await factorial.createShift({
          periodId: period.id,
          clockIn: `${clockIn.hours}:${clockIn.minutes}`,
          clockOut: `${clockOut.hours}:${clockOut.minutes}`,
          minutes: 0,
          day: day.day,
          observations: null,
          history: [],
        });
      }
    }
  };
