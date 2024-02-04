import { SingleValueObject } from "../../shared/SingleValueObject.js";

export class Year extends SingleValueObject<number> {
  toString(): string {
    return `${this.value}`;
  }
}
