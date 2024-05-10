import { FactorialClient } from "../factorial-client/FactorialClient.js";
import { EmployeeId } from "../../domain/models/EmployeeId.js";
import { Project } from "../../domain/models/Project.js";
import { ProjectId } from "../../domain/models/ProjectId.js";
import { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";

export class ProjectRepositoryFactorial implements ProjectRepository {
  constructor(private readonly factorial: FactorialClient) {}

  async allFor(employeeId: EmployeeId): Promise<Project[]> {
    const projects = await this.factorial.getProjects(
      employeeId.toPrimitives(),
    );

    return projects.map(
      (project) =>
        new Project(new ProjectId(project.id), project.imputableProject.name),
    );
  }
}
