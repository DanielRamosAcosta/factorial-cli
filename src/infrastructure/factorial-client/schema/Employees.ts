import { z } from "zod";
import { EmployeeOrMyself } from "./EmployeeOrMyself.js";

export const Employees = z.array(EmployeeOrMyself);
