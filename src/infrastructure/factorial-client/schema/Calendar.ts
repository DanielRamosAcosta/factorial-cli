import { z } from "zod";
import { CalendarDay } from "./CalendarDay.js";

export const Calendar = z.array(CalendarDay);
