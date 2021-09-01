import { FactorialCalendarDay } from "./api/createCalendarGetter.ts";

export interface FactorialUtils {
  isWeekend(day: FactorialCalendarDay): boolean;
  isHoliday(day: FactorialCalendarDay): boolean;
  isInTheFuture(day: FactorialCalendarDay): boolean;
  isLaborable(day: FactorialCalendarDay): boolean;
  isInThePast(day: FactorialCalendarDay): boolean;
}
