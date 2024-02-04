import { z } from "zod";
import { Employee } from "./Employee.js";
import { MySelf } from "./MySelf.js";

export const EmployeeOrMyself = z.custom<Employee | MySelf>((value) => {
  if (!!value && typeof value === "object" && "birthdayOn" in value) {
    return MySelf.parse(value);
  }

  return Employee.parse(value);
});
