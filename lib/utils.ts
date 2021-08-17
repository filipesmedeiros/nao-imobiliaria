export const randomItemFromArray = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)]
