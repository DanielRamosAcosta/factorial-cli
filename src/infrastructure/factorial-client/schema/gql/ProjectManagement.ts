import { z } from "zod";
import { ProjectWorker } from "./ProjectWorker.js";

export const ProjectManagement = z.object({
  projectWorkers: z.array(ProjectWorker),
});
