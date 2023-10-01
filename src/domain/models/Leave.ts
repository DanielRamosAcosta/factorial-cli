import { Primitives } from "../../shared/Primitives.js";

export type LeavePrimitives = Primitives<Leave>;

export class Leave {
  static fromPrimitives(primitives: LeavePrimitives) {
    return new Leave(primitives.name);
  }

  static toPrimitives(leave: Leave) {
    return leave.toPrimitives();
  }

  constructor(private readonly name: string) {}

  toPrimitives() {
    return {
      name: this.name,
    };
  }
}
