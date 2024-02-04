export class DomainId {
  constructor(public readonly id: number) {}

  toPrimitives() {
    return this.id;
  }
}
