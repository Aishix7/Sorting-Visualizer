export function QuickSort(array) {
  const n = array.length;
  const animations = [];
  const sortedArray = [...array];

  function partition(arr, low, high, animations) {
    const pivot = arr[low]; // First element as pivot
    animations.push(["select-pivot", low]);

    let i = low + 1;
    let j = high;

    while (true) {
      // Find element greater than pivot from left
      while (i <= j && arr[i] <= pivot) {
        animations.push(["compare", i, low]);
        i++;
      }

      // Find element smaller than pivot from right
      while (i <= j && arr[j] > pivot) {
        animations.push(["compare", j, low]);
        j--;
      }

      if (i > j) break;

      // Swap elements
      animations.push(["compare", i, j]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      animations.push(["swap", i, j]);
    }

    // Place pivot in correct position
    animations.push(["pivot-final", low, j]);
    [arr[low], arr[j]] = [arr[j], arr[low]];
    animations.push(["swap", low, j]);

    return j;
  }

  function quickSort(arr, low, high, animations) {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, animations);
      quickSort(arr, low, pivotIndex - 1, animations);
      quickSort(arr, pivotIndex + 1, high, animations);
    }
  }

  quickSort(sortedArray, 0, n - 1, animations);
  return { sortedArray, animations };
}
