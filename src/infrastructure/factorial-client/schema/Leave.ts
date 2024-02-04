import { z } from "zod";

export const Leave = z.object({
  halfDay: z.null(),
  color: z.string(),
  name: z.string(),
});

export type Leave = z.infer<typeof Leave>;
