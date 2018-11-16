import { TypedArray } from '../../types/typedArray';

const sortImmutableUntyped = (arr: TypedArray): number[] => {
  // Micro-optimizations, but forgivable
  // as speed is what we're after, here.
  let iter1: number = 0;
  let iter2: number = 0;
  const tempIndices: number[] = [];
  const tempValues: number[] = [];
  // Sort and duplicate the array in order
  // not to have to mutate it in place.
  const sorted = arr.slice().sort();
  // Loops through a list of values
  for (iter1; iter1 < sorted.length; iter1++) {
    // If the current value is identical to
    // the previous value, place the index in
    // a temporary array.
    if (iter1 > 0 && sorted[iter1] === sorted[iter1 - 1]) {
      tempIndices[sorted[iter1]] = iter1;
    }
  }
  // Loops through a list of indices and pushes
  // them to a unique array.
  for (iter2; iter2 < tempIndices.length; iter2++) {
    if (tempIndices[iter2]) {
      tempValues.push(iter2);
    }
  }
  return tempValues;
};

export default sortImmutableUntyped;
