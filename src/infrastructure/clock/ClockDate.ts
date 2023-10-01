import { Clock } from "../../domain/services/Clock.js";

export class ClockDate implements Clock {
  now() {
    return new Date();
  }
}
