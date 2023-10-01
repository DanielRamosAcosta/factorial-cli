import * as fs from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { GetProjectsAssignedToProjectWorkersQuery } from "./GetProjectsAssignedToProjectWorkersQuery.js";

describe("GetProjectsAssignedToProjectWorkersQuery", () => {
  let projectsJson: any;

  beforeAll(() => {
    const data = fs.readFileSync("test/fixtures/projects.json", "utf-8");
    projectsJson = JSON.parse(data);
  });

  it("parses the projects correctly", () => {
    const response =
      GetProjectsAssignedToProjectWorkersQuery.parse(projectsJson);

    expect(response.data.projectManagement.projectWorkers).toHaveLength(2);
  });
});
