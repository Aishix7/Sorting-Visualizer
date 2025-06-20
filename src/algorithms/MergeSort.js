export function MergeSort(array) {
  const n = array.length;
  const animations = [];
  const sortedArray = [...array];
  const auxiliaryArray = [...array];

  function merge(sortedArray, auxiliaryArray, low, mid, high, animations) {
    let k = low;
    let i = low;
    let j = mid + 1;

    while (i <= mid && j <= high) {
      animations.push(["compare", i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push(["overwrite", k, auxiliaryArray[i]]);
        sortedArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push(["overwrite", k, auxiliaryArray[j]]);
        sortedArray[k++] = auxiliaryArray[j++];
      }
    }

    while (i <= mid) {
      animations.push(["overwrite", k, auxiliaryArray[i]]);
      sortedArray[k++] = auxiliaryArray[i++];
    }

    while (j <= high) {
      animations.push(["overwrite", k, auxiliaryArray[j]]);
      sortedArray[k++] = auxiliaryArray[j++];
    }

    for (let i = low; i <= high; i++) {
      auxiliaryArray[i] = sortedArray[i];
    }
  }

  function mergeSort(sortedArray, auxiliaryArray, low, high, animations) {
    if (low === high) return;
    const mid = Math.floor((low + high) / 2);
    mergeSort(auxiliaryArray, sortedArray, low, mid, animations);
    mergeSort(auxiliaryArray, sortedArray, mid + 1, high, animations);
    merge(sortedArray, auxiliaryArray, low, mid, high, animations);
  }

  mergeSort(sortedArray, auxiliaryArray, 0, n - 1, animations);
  return { sortedArray, animations };
}
