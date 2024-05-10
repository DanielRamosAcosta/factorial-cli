export type LeavePrimitives = {
  name: string;
};

export class Leave {
  static fromPrimitives(primitives: LeavePrimitives) {
    return new Leave(primitives.name);
  }

  constructor(private readonly name: string) {}
}
