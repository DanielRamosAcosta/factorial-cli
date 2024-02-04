import { Minute } from "./Minute.js";
import { Hour } from "./Hour.js";
import { Primitives } from "../../shared/Primitives.js";

export type MomentOfTheDayPrimitives = Primitives<MomentOfTheDay>;

export class MomentOfTheDay {
  static oClock(hour: number) {
    return MomentOfTheDay.at(hour, 0);
  }

  static at(hour: number, minute: number) {
    return new MomentOfTheDay(new Hour(hour), new Minute(minute));
  }

  static fromPrimitives(primitives: MomentOfTheDayPrimitives) {
    return new MomentOfTheDay(
      new Hour(primitives.hour),
      new Minute(primitives.minute),
    );
  }

  constructor(
    private readonly hour: Hour,
    private readonly minute: Minute,
  ) {}

  toPrimitives() {
    return {
      hour: this.hour.toPrimitives(),
      minute: this.minute.toPrimitives(),
    };
  }

  add(minute: Minute) {
    const newMinutes = this.minute.add(minute);

    if (newMinutes.aboveAnHour()) {
      const hour = this.hour.add(Hour.one());

      return new MomentOfTheDay(hour, newMinutes.minusAnHour());
    }

    if (newMinutes.isNegative()) {
      const hour = this.hour.subtract(Hour.one());

      return new MomentOfTheDay(hour, newMinutes.toPositive());
    }

    return new MomentOfTheDay(this.hour, newMinutes);
  }

  subtract(minute: Minute) {
    return this.add(new Minute(-minute.value));
  }
}
