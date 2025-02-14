export const randomNumber = (seed: number) => {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}

export const shuffleArray = <T>(array: T[], seed: number): T[] => {
  let i = array.length, j, temp;

  while (--i > 0) {
    j = Math.floor(randomNumber(seed) * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
    seed++;
  }

  return array;
}