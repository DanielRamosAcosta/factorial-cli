import { EmployeeId } from "../../domain/models/EmployeeId.js";
import { Project } from "../../domain/models/Project.js";
import { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";

export class ProjectRepositoryCached implements ProjectRepository {
  private readonly cache: Map<EmployeeId, Project[]> = new Map();

  constructor(private readonly projectRepository: ProjectRepository) {}
  async allFor(employeeId: EmployeeId): Promise<Project[]> {
    if (!this.cache.has(employeeId)) {
      const projects = await this.projectRepository.allFor(employeeId);
      this.cache.set(employeeId, projects);
    }

    return this.cache.get(employeeId)!;
  }
}
