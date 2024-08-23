import { City, Person, Product, Employee } from "./type";

export let products = [new Product("Running Shoes", 100), new Product("Hat", 25)];

export type shapeType = { name: string };

export class Collection<T extends shapeType, K extends keyof T> implements Iterable<T> {
  protected items: Map<T[K], T>;
  protected keyName: K;

  constructor(initialItems: T[] = [], initKeyName: K) {
    this.keyName = initKeyName;
    this.items = new Map<T[K], T>();
    initialItems.forEach(initialItem => this.add(initialItem));
  }

  add(...newItems: T[]): void {
    newItems.forEach(newItem => this.items.set(newItem[this.keyName], newItem));
  }

  get(name: T[K]): T {
    return this.items.get(name)!;
  }

  get count(): number {
    return this.items.size
  }

  [Symbol.iterator](): Iterator<T> {
    return this.items.values();
  }
}

export let productCollection = new Collection(products, "name");
console.log(`There are ${productCollection.count} products`);

export let p = productCollection.get("Hat");
console.log(`Product: ${p.name}, ${p.price}`);

console.table([...productCollection]);

export type MappedProduct = {
  [P in keyof Product]: Product[P] extends null ? Product[P] : (Product[P] | undefined)
};

//let ne: never = undefined;
let mappedProduct: MappedProduct = { name: "Coka", price: 10 };
console.table(mappedProduct);

export type AllowString<T> = {
  [P in keyof T]?: T[P] | string
};
export let mapperCity: AllowString<City> = { name: "Chengdu", population: "10000000" };
console.table(mapperCity);

export type MakeReadonly<T> = {
  readonly [P in keyof T]: T[P]
};
export let mapperPerson: MakeReadonly<Person> = { name: "Mian Wang", city: "Zhuji" };
console.table(mapperPerson);

export let p3: Pick<City, "name"> = { name: "Chongqing" };
console.table(p3);

export let p1: Omit<City, "population"> = { name: "x" };
console.table(p1);

export type CustomMapped<K extends keyof any, T> = {
  [P in K]: T
};
export let p2: Record<"name" | "age", string> = { name: "AM", age: "10" };
console.table(p2);

export type resultType<T extends boolean> = T extends true ? string : number;
export let p4: resultType<true> = "string value";
let p6: string = p4;
export let p5: resultType<false> = 1001;
let p7: number = p5;
console.table([p4, p5, p6, p7]);

type references = "London" | "Bob" | "Kayak";
type nestedType<T extends references> = T extends "London" ? City : T extends "Bob" ? Person : Product;
let p8: nestedType<"London"> = new City("London", 100);
console.table(p8);

// ---
type Filter<T, U> = T extends U ? never : T;
function filterArray<T, U>(data: T[], predicate: (item: any) => item is U): Filter<T, U>[] {
  return data.filter(e => !predicate(e)) as any;
}
const p9 = filterArray(products, (item): item is Person => item instanceof Person);
console.table(p9);

// ---
type unionOfPropNames<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
type A = unionOfPropNames<{ a: number, b: string, c: boolean, d: number }, number>;
function total<T, P extends unionOfPropNames<T, number>, U extends boolean>(items: T[], propName: P, format: U): resultType<U> {
  const sum = items.reduce((t, item) => t += Number(item[propName]), 0);
  return format ? `$${sum.toFixed(2)}` : sum as any;
}
const sum: string = total(products, "price", true);
console.log(`Sum: ${sum}`);

// ---



