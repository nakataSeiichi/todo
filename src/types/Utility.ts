type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PartialPick<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// const person = {
//   age: 30,
//   name: 'john doe',
// };

// function getPerson() {
//   return person;
// }

// export type ObjectKeys = keyof typeof person;

// export type Return = ReturnType<typeof getPerson>;

// export type AwaitedReturn = Awaited<Return>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

// type Human = {
//   age: number;
//   name: string;
// };

// type MaleProps = {
//   gender: 'male';
//   salary: number;
// };

// type FemaleProps = { gender: 'female'; weight: number };

// type Person = Human & (MaleProps | FemaleProps);

// type PrettifiedPerson = Prettify<Person>;

// const newPerson: PrettifiedPerson = {
//   age: 20,
//   name: 'sally doe',
//   gender: 'female',
//   weight: 50,
// };
