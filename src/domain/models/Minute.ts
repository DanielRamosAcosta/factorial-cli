import { SingleValueObject } from "../../shared/SingleValueObject.js";

export class Minute extends SingleValueObject<number> {
  add(minute: Minute) {
    return new Minute(this.value + minute.value);
  }

  isNegative() {
    return this.value < 0;
  }

  aboveAnHour() {
    return this.value >= 60;
  }

  minusAnHour() {
    return new Minute(this.value - 60);
  }

  toPositive() {
    return new Minute(60 + this.value);
  }
}
