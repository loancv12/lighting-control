export function findSecondDuplicateIndex(arr) {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (seen.has(item)) {
      seen.set(item, seen.get(item) + 1);
      // If an item is seen more than once, return its index as the second duplicate
      if (seen.get(item) === 2) {
        return i;
      }
    } else {
      seen.set(item, 1);
    }
  }

  // If no second duplicate is found, return -1 to indicate not found
  return -1;
}

export function findFirstDuplicateIndex(arr) {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (seen.has(item)) {
      // If an item is seen more than once, return its index as the first duplicate
      return seen.get(item);
    } else {
      seen.set(item, i);
    }
  }

  // If no duplicate is found, return -1 to indicate not found
  return -1;
}
