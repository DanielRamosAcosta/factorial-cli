import { z } from "zod";
import { Period } from "./Period.js";

export const Periods = z.array(Period);
