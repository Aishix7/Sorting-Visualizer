export function BubbleSort(array) {
  const n = array.length;
  const animations = [];
  const sortedArray = [...array];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push(["compare", j, j + 1]);
      if (sortedArray[j] > sortedArray[j + 1]) {
        [sortedArray[j], sortedArray[j + 1]] = [
          sortedArray[j + 1],
          sortedArray[j],
        ];
        animations.push(["swap", j, j + 1]);
      }
    }
  }
  return { sortedArray, animations };
}
