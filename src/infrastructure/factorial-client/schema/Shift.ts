import { z } from "zod";

export const Shift = z.object({
  id: z.number(),
  periodId: z.number(),
  day: z.number(),
});

export type Shift = z.infer<typeof Shift>;
