import { DomainId } from "../../shared/DomainId.js";

export class PeriodId extends DomainId {
  static fromPrimitives(id: number) {
    return new this(id);
  }
}
