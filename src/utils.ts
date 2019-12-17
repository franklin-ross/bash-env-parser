/** Checks whether two arrays are the same length and contain the same elements, using ===. */
export const areEqual = <T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>) => {
  if (a !== b) {
    if (a.length !== b.length) return false;
    for (let i = 0, len = a.length; i < len; ++i) {
      if (a[i] !== b[i]) return false;
    }
  }
  return true;
};
