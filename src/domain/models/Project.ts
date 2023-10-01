import { ProjectId } from "./ProjectId.js";

export class Project {
  constructor(
    private readonly id: ProjectId,
    private readonly name: string,
  ) {}

  hasName(name: string) {
    return this.name === name;
  }

  getId() {
    return this.id;
  }
}
