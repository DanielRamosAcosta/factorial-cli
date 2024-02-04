import { Day } from "../../src/domain/models/Day.js";

export function generate31Days() {
  return new Array(31).fill(0).map((_, i) => Day.at(i + 1));
}
