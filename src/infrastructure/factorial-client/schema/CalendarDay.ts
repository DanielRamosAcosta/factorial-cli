import { z } from "zod";
import { Leave } from "./Leave.js";

export const CalendarDay = z.object({
  id: z.string(),
  day: z.number(),
  date: z.string(),
  isLaborable: z.boolean(),
  isLeave: z.boolean(),
  leaves: z.array(Leave),
});

export type CalendarDay = z.infer<typeof CalendarDay>;
