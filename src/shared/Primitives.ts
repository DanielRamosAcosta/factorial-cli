export type Primitives<T extends { toPrimitives: () => unknown }> = ReturnType<
  T["toPrimitives"]
>;
