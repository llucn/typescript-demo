// Various helper Typescript types

// TypeScript-safe way to check for props, see https://fettblog.eu/typescript-hasownproperty
export function hasOwnProperty<X extends object, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// Extracts the nullable keys from `T` (as a union)
export type NullableProps<T> = {
  [P in keyof T]-?: null extends T[P] ? P : never;
}[keyof T];

// Marks the nullable properties of `T` as optional
export type OptionalIfNull<T> = Partial<Pick<T, NullableProps<T>>> & Omit<T, NullableProps<T>>;

type A = NullableProps<{ a: number | string, b: string | null }>;

// ---
export type PropsOfType<T, U> = {
  [P in keyof T]: U extends T[P] ? P : never;
}[keyof T];
type B = PropsOfType<{ a: number | string, b: string | null | undefined }, null>;
let m: B = "b";
