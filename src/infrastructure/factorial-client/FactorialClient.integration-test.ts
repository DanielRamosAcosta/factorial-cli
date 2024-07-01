import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { FactorialClient } from "./FactorialClient.js";

describe("FactorialClient", () => {
  let client: FactorialClient;
  const employeeId = 292281;

  beforeAll(async () => {
    client = await FactorialClient.login();
  });

  it("throws an error if email is empty", async () => {
    const result = FactorialClient.login({
      email: "",
    });

    await expect(result).rejects.toThrowError("Email must be provided");
  });

  it("throws an error if password is empty", async () => {
    const result = FactorialClient.login({
      password: "",
    });

    await expect(result).rejects.toThrowError("Password must be provided");
  });

  it("gets the employees", async () => {
    const employees = await client.getEmployees();

    expect(Array.isArray(employees)).toBe(true);
  });

  it("gets the periods", async () => {
    const periods = await client.getPeriods(employeeId, 2023, 9);

    expect(Array.isArray(periods)).toBe(true);
  });

  it("gets the calendar", async () => {
    const calendar = await client.getCalendar(employeeId, 2023, 9);

    expect(Array.isArray(calendar)).toBe(true);
  });

  it("gets the projects assigned to an employee", async () => {
    const projects = await client.getProjects(employeeId);

    expect(Array.isArray(projects)).toBe(true);
  });

  describe("with cleaned shifts", () => {
    let periodId: number;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = `${year}-${month.toString().padStart(2, "0")}-18`;

    beforeEach(async () => {
      const periods = await client.getPeriods(employeeId, year, month);
      periodId = periods[0].id;
      const shifts = await client.getShifts(employeeId, periodId, year, month);

      for (const shift of shifts) {
        await client.deleteShift(shift.id);
      }
    });

    it("creates a shift", async () => {
      await client.createShift({
        periodId,
        clockInHour: 8,
        clockInMinutes: 0,
        clockOutHour: 16,
        clockOutMinutes: 0,
        day: 18,
        date,
      });

      const shifts = await client.getShifts(employeeId, periodId, year, month);
      expect(shifts).toHaveLength(1);
    });

    it("updates the project of a shift", async () => {
      const shiftId = await client.createShift({
        periodId,
        clockInHour: 8,
        clockInMinutes: 0,
        clockOutHour: 16,
        clockOutMinutes: 0,
        day: 18,
        date,
      });
      const secretProjectId = 116990;

      await client.setProjectToShift(shiftId, secretProjectId);
    });

    it("deletes a shift", async () => {
      const shiftId = await client.createShift({
        periodId: periodId,
        clockInHour: 8,
        clockInMinutes: 0,
        clockOutHour: 16,
        clockOutMinutes: 0,
        day: 18,
        date,
      });

      await client.deleteShift(shiftId);

      const shifts = await client.getShifts(employeeId, periodId, year, month);

      expect(shifts.length).toBe(0);
    });
  });
});
