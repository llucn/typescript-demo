import { City, Person, Product, Employee } from "./type";

console.log("App start");
let people = [new Person("Bob Smith", "London"), new Person("Dora Peters", "New York")];
let products = [new Product("Running Shoes", 100), new Product("Hat", 25)];
let cities = [new City("London", 8136000), new City("Paris", 2141000)];
let employees = [new Employee("Bob Smith", "Sales"), new Employee("Alice Jones", "Sales")];
// [...people, ...products].forEach(item => console.log(`Item: ${item.name}`));

export type dataType = { name: string }; // Restrict type

export class DataCollection<T extends dataType> { // Generic type parameter
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  filter<V extends T>(predicate: (target: T) => target is V): V[] {
    return this.items.filter(item => predicate(item)) as V[];
  }
  collate<U>(targetData: U[], itemProp: keyof T, targetProp: keyof U): (T & U)[] {
    let results: (T & U)[] = [];
    this.items.forEach(item => {
      let match = targetData.find(d => d[targetProp] + '' === item[itemProp] + '');
      if (match !== undefined) {
        results.push({ ...match, ...item });
      }
    });
    return results;
  }
  add(newItem: T) {
    this.items.push(newItem);
  }
  getNames(): string[] {
    return this.items.map(item => item.name);
  }
  getItem(index: number): T {
    return this.items[index];
  }
  static reverse<A>(items: A[]): A[] {
    return items.reverse();
  }
}

export class SearchableCollection<T extends dataType> extends DataCollection<T> {
  constructor(initialItems: T[]) {
    super(initialItems);
  }
  find(name: string): T | undefined {
    return this.items.find(item => item.name === name);
  }
}

export let peopleData = new SearchableCollection<Person>(people); // Generic type argument
export let foundPerson = peopleData.find("Bob Smith");
if (foundPerson) {
  console.log(`Found person: ${foundPerson.name}, ${foundPerson.city}`);
}
console.log(`Person Names: ${peopleData.getNames().join(", ")}`);
export let firstPerson = peopleData.getItem(0);
console.log(`First Person: ${firstPerson.name}, ${firstPerson.city}`);
export let collatedData = peopleData.collate<City>(cities, 'city', 'name');
// collatedData.forEach(c => console.log(`${c.name}, ${c.city}, ${c.population}`));
console.table(collatedData);
export let empData = peopleData.collate<Employee>(employees, "name", "name");
console.table(empData);

export let productData = new DataCollection<Product>(products);
console.log(`Product Names: ${productData.getNames().join(", ")}`);
export let firstProduct = productData.getItem(0);
console.log(`First Product: ${firstProduct.name}, ${firstProduct.price}`);

export let cityData = new DataCollection<City>(cities);
console.log(`City Names: ${cityData.getNames().join(", ")}`);


function isProduct(target: dataType): target is Product {
  return target instanceof Product;
}
export let mixedData = new DataCollection<Person | Product >([...people, ...products]);
export let filteredProducts = mixedData.filter<Product>(isProduct);
console.table(filteredProducts);
// filteredProducts.forEach(p => console.log(`Product: ${p.name}, ${p.price}`));

let reversedCities: City[] = DataCollection.reverse(cities);
console.table(reversedCities);
