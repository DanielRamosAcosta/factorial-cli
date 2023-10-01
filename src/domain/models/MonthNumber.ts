import { SingleValueObject } from "../../shared/SingleValueObject.js";

export class MonthNumber extends SingleValueObject<number> {
  toString(): string {
    return this.value.toString().padStart(2, "0");
  }
}
