import { EmployeeId } from "./EmployeeId.js";
import { Primitives } from "../../shared/Primitives.js";

export type EmployeePrimitives = Primitives<Employee>;

export class Employee {
  static fromPrimitives(primitives: EmployeePrimitives) {
    return new Employee(
      EmployeeId.fromPrimitives(primitives.id),
      primitives.isCurrentUser,
    );
  }

  constructor(
    private readonly id: EmployeeId,
    private readonly isCurrentUser: boolean,
  ) {}

  getId() {
    return this.id;
  }

  isCurrent() {
    return this.isCurrentUser;
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      isCurrentUser: this.isCurrentUser,
    };
  }
}
