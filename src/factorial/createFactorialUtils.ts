import { FactorialCalendarDay } from "./api/createCalendarGetter.ts";
import { FactorialUtils } from "./FactorialUtils.ts";

export function createFactorialUtils(): FactorialUtils {
  const isWeekend = (day: FactorialCalendarDay) => !day.is_laborable;

  const isHoliday = (day: FactorialCalendarDay) =>
    day.is_leave && day.leave_name !== "Teletrabajo";

  const isInTheFuture = (day: FactorialCalendarDay) => {
    const today = new Date();
    const currentCalendarDate = new Date(day.date);

    return (
      currentCalendarDate.getMonth() === today.getMonth() &&
      day.day > today.getDate()
    );
  };

  const isLaborable = (day: FactorialCalendarDay) =>
    !isWeekend(day) && !isHoliday(day);

  const isInThePast = (day: FactorialCalendarDay) => !isInTheFuture(day);

  return {
    isWeekend,
    isHoliday,
    isInTheFuture,
    isLaborable,
    isInThePast,
  };
}
