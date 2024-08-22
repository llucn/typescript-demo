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
export let mapperCity: AllowString<City> = { name: "Chengdu", population: 10000000 };
console.table(mapperCity);

export type MakeReadonly<T> = {
  readonly [P in keyof T]: T[P]
};
export let mapperPerson: MakeReadonly<Person> = { name: "Mian Wang", city: "Zhuji" };
console.table(mapperPerson);

export let p1: Omit<City, "name" | "population"> = { name: "x" };
console.table(p1);

export type CustomMapped<K extends keyof any, T> = {
  [P in K]: T
};
export let p2: CustomMapped<"name" | "age", string> = { name: "AM", age: "10" };
console.table(p2);
