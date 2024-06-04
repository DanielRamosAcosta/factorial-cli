import { z } from "zod";
import { Leave } from "./Leave.js";

export const CalendarDay = z.object({
  day: z.number(),
  isLaborable: z.boolean(),
  leaves: z.array(Leave),
});

export type CalendarDay = z.infer<typeof CalendarDay>;
