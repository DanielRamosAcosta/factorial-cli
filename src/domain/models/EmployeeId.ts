import { DomainId } from "../../shared/DomainId.js";

export class EmployeeId extends DomainId {
  private token = "EmployeeId" as const;

  static fromPrimitives(id: number) {
    return new this(id);
  }

  toString() {
    return this.id.toString();
  }
}
