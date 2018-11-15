import { TypedArray } from "../../types/typedArray";

export type UntypedAccumulatorTuple = [number[], number[]];

const reduceUntyped = (arr: TypedArray): number[] => {
  // Create an initialiser tuple that consists of two
  // dynamic arrays, which will expand based on the values
  // of their inputs.
  const initialiser: UntypedAccumulatorTuple = [[], []];
  // Check out reduceTyped.ts for behavioural commentary.
  return (arr as number[]).reduce(
    (accumulator: UntypedAccumulatorTuple, currentValue: number) => {
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

export default reduceUntyped;
