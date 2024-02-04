import { SingleValueObject } from "../../shared/SingleValueObject.js";

export class Hour extends SingleValueObject<number> {
  static one() {
    return new Hour(1);
  }

  add(other: Hour) {
    return new Hour(this.value + other.value);
  }

  subtract(other: Hour) {
    return new Hour(this.value - other.value);
  }
}
