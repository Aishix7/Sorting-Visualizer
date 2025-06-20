export function SelectionSort(array) {
  const n = array.length;
  const animations = [];
  const sortedArray = [...array];
  for (let i = 0; i < n - 1; i++) {
    let mini = i;
    animations.push(["select-min", mini]);
    for (let j = i; j < n; j++) {
      animations.push(["compare", j, mini]);
      if (sortedArray[j] < sortedArray[mini]) {
        animations.push(["deselect-min", mini]);
        mini = j;
        animations.push(["select-min", mini]);
      }
    }
    animations.push(["pre-swap", i, mini]);

    if (mini !== i) {
      [sortedArray[i], sortedArray[mini]] = [sortedArray[mini], sortedArray[i]];
      animations.push(["swap", i, mini]);
    }
  }
  return { sortedArray, animations };
}
