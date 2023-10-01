import { z } from "zod";

import { Shift } from "./Shift.js";

export const Shifts = z.array(Shift);
