import { z } from "zod";

export const Shift = z.object({
  id: z.number(),
  periodId: z.number(),
  day: z.number(),
  clockIn: z.string(),
  clockOut: z.string(),
  minutes: z.number(),
  history: z.array(z.unknown()),
  observations: z.null(),
  date: z.string(),
  halfDay: z.null(),
  workable: z.boolean(),
  automaticClockIn: z.boolean(),
  automaticClockOut: z.boolean(),
  clockInWithSeconds: z.string(),
  employeeId: z.number(),
  permissions: z.object({ history: z.boolean() }),
  locationType: z.null(),
  timeSettingsBreakConfigurationId: z.null(),
});

export type Shift = z.infer<typeof Shift>;
