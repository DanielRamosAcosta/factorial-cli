import { Minute } from "../models/Minute.js";

export interface Random {
  generateWithin(maxRandomMinute: Minute): Minute;
}
