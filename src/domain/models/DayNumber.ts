import { SingleValueObject } from "../../shared/SingleValueObject.js";

export class DayNumber extends SingleValueObject<number> {
  toString(): string {
    return this.value.toString().padStart(2, "0");
  }
}
