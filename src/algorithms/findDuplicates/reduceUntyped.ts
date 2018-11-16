import { TypedArray } from '../../types/typedArray';

export type UntypedAccumulatorTuple = [number[], number[]];

const reduceUntyped = (arr: TypedArray): number[] => {
  // Create an initialiser tuple that consists of two
  // dynamic arrays, which will expand based on the values
  // of their inputs.
  const initialiser: UntypedAccumulatorTuple = [[], []];
  // The number equivalent to the length of the array
  // is illegal, so let's use it.
  const illegal = arr.length;
  // Check out reduceTyped.ts for behavioural commentary.
  return (arr as number[]).reduce(
    (accumulator: UntypedAccumulatorTuple, currentValue: number) => {
      if (accumulator[0][currentValue] === 1) {
        accumulator[1].push(currentValue);
        accumulator[0][currentValue] = illegal;
        return accumulator;
      }
      if (accumulator[0][currentValue] !== illegal) {
        accumulator[0][currentValue] = 1;
      }
      return accumulator;
    },
    initialiser
  )[1];
};

export default reduceUntyped;
