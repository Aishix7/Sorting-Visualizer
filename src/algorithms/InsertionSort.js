export function InsertionSort(array) {
  const n = array.length;
  const animations = [];
  const sortedArray = [...array];

  for (let i = 1; i < n; i++) {
    let j = i;
    animations.push(["select-element", j]);

    while (j > 0 && sortedArray[j - 1] > sortedArray[j]) {
      animations.push(["compare", j, j - 1]);
      [sortedArray[j - 1], sortedArray[j]] = [
        sortedArray[j],
        sortedArray[j - 1],
      ];
      animations.push(["swap", j, j - 1]);
      j--;
    }
  }
  return { sortedArray, animations };
}
