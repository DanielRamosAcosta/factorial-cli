import { z } from "zod";

export const Leave = z.object({
  name: z.string(),
});

export type Leave = z.infer<typeof Leave>;
