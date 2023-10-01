import { EmployeeId } from "../models/EmployeeId.js";
import { Project } from "../models/Project.js";

export interface ProjectRepository {
  allFor(employeeId: EmployeeId): Promise<Project[]>;
}
