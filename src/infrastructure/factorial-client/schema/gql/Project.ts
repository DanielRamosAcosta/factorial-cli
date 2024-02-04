import { z } from "zod";

export const Project = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
});
