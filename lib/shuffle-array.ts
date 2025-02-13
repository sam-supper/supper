export const shuffleArray = <T>(array: T[]): T[] => {
  let i = array.length, j, temp;

  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}
