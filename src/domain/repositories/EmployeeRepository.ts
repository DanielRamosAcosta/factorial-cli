import { Employee } from "../models/Employee.js";

export interface EmployeeRepository {
  getEmployees(): Promise<Employee[]>;
}
