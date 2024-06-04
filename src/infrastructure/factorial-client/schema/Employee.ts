import { z } from "zod";

export const Employee = z.object({
  id: z.number(),
});

export type Employee = z.infer<typeof Employee>;
