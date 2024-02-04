import { Clock } from "../../src/domain/services/Clock.js";

export class ClockFake implements Clock {
  static at(date: Date): ClockFake {
    return new ClockFake(date);
  }

  constructor(private readonly date: Date) {}

  now(): Date {
    return this.date;
  }
}
