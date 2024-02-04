import { MomentOfTheDay } from "./MomentOfTheDay.js";
import { Primitives } from "../../shared/Primitives.js";
import { Minute } from "./Minute.js";

export type DayRangePrimitives = Primitives<DayRange>;

export class DayRange {
  static from(start: MomentOfTheDay) {
    return {
      to: (end: MomentOfTheDay) => new DayRange(start, end),
    };
  }

  static create(start: MomentOfTheDay, end: MomentOfTheDay) {
    return new DayRange(start, end);
  }

  static fromPrimitives(primitives: DayRangePrimitives) {
    return new DayRange(
      MomentOfTheDay.fromPrimitives(primitives.start),
      MomentOfTheDay.fromPrimitives(primitives.end),
    );
  }

  constructor(
    private readonly start: MomentOfTheDay,
    private readonly end: MomentOfTheDay,
  ) {}

  toPrimitives() {
    return {
      start: this.start.toPrimitives(),
      end: this.end.toPrimitives(),
    };
  }

  expand(start: Minute, end: Minute) {
    return DayRange.create(this.start.subtract(start), this.end.add(end));
  }
}
