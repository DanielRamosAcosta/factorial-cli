import { z } from "zod";

export const Leave = z.object({
  halfDay: z.union([z.null(), z.string()]),
  color: z.string(),
  name: z.string(),
});

export type Leave = z.infer<typeof Leave>;
