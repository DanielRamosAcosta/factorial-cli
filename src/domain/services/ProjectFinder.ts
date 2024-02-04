import { Project } from "../models/Project.js";
import { EmployeeId } from "../models/EmployeeId.js";
import { ProjectRepository } from "../repositories/ProjectRepository.js";

export class ProjectFinder {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async findByNameOrThrow(
    employeeId: EmployeeId,
    name: string,
  ): Promise<Project> {
    const projects = await this.projectRepository.allFor(employeeId);

    const project = projects.find((project) => project.hasName(name));

    if (!project) {
      throw new Error(`Project ${name} not found`);
    }

    return project;
  }
}
