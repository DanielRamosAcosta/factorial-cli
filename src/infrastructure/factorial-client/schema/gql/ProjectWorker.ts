import { z } from "zod";
import { Project } from "./Project.js";

export const ProjectWorker = z.object({
  id: z.number(),
  assigned: z.boolean(),
  project: Project,
});
