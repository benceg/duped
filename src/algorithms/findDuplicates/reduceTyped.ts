import { TypedArray, TypedArrayConstructor } from "../../types/typedArray";

export type TypedAccumulatorTuple = [TypedArray, number[]];

const reduceTyped = (arr: TypedArray): number[] => {
  // Get the constructor of the input array
  // so that we can generate a temporary array
  // of the identical type & length for performance.
  const ArrConstructor = arr.constructor as TypedArrayConstructor;
  // This should correlate with the input array as
  // its length will never be exceeded.
  const tempArray = new ArrConstructor(arr.length);
  // Create an initialiser tuple that respects the
  // types of our arrays. The final result will always
  // be of flexible size as it represents an unknown quantity.
  const initialiser: TypedAccumulatorTuple = [tempArray, []];
  // Reduce over the array, using index inversion
  // to check to see whether an item has already
  // been found as a duplicate.
  return (arr as number[]).reduce<TypedAccumulatorTuple>(
    (accumulator, currentValue) => {
      // If we find a 1 in the index of the temporary
      // accumulator array that corresponds with our
      // current value, we know we've been here before.
      // We therefore push the value into our returned array
      // and zero it out in the temporary accumulator so that
      // this condition will never reoccur.
      if (accumulator[0][currentValue] === 1) {
        accumulator[1].push(currentValue);
        accumulator[0][currentValue] = 0;
        return accumulator;
      }
      // If the above turns out not to be the case,
      // we set the index of the temporary array that
      // corresponds with the current value to 1, so
      // that it can be caught by the trap we've laid
      // for it above.
      accumulator[0][currentValue] = 1;
      return accumulator;
    },
    initialiser
  )[1];
};

export default reduceTyped;
