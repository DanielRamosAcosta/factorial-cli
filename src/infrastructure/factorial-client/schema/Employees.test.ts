import * as fs from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { isMySelf, MySelf } from "./MySelf.js";
import { Employees } from "./Employees.js";

describe("Employees", () => {
  let employeesJson: any;

  beforeAll(() => {
    const data = fs.readFileSync("test/fixtures/employees.json", "utf-8");
    employeesJson = JSON.parse(data);
  });

  it("parses a list of employees", () => {
    const employees = Employees.parse(employeesJson);

    expect(Array.isArray(employees)).toBe(true);
  });

  it("parses myself", () => {
    const myselfJson = employeesJson.find((e: any) => e.id === 298221);

    const myself = MySelf.parse(myselfJson);

    expect(myself.birthdayOn).toBe("1995-06-30");
  });

  it("keeps myself data in employee list", () => {
    const employees = Employees.parse(employeesJson);

    const myself = employees.find(isMySelf);

    if (!myself) {
      throw new Error("Myself not found");
    }
    expect(myself.birthdayOn).toBe("1995-06-30");
  });
});
