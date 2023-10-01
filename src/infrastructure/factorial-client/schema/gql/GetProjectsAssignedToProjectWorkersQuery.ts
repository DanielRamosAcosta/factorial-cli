import { z } from "zod";
import { ProjectManagement } from "./ProjectManagement.js";

export const GetProjectsAssignedToProjectWorkersQuery = z.object({
  data: z.object({
    projectManagement: ProjectManagement,
  }),
});
