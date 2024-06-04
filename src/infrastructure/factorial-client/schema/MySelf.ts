import { Employee } from "./Employee.js";
import { z } from "zod";

export const MySelf = Employee.extend({
  birthdayOn: z.string(),
});

export type MySelf = z.infer<typeof MySelf>;

export function isMySelf(employee: Employee | MySelf): employee is MySelf {
  return (
    Boolean(employee) &&
    typeof employee === "object" &&
    "birthdayOn" in employee
  );
}
