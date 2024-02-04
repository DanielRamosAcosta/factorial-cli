export abstract class SingleValueObject<T> {
  constructor(public readonly value: T) {}

  toPrimitives() {
    return this.value;
  }
}
