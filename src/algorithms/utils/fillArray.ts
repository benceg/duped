import { TypedArray } from '../../types/typedArray';
import generateRandomNumber from './generateRandomNumber';

const fillArray = (arr: TypedArray, max: number): TypedArray => {
  let i = 0;
  const len = max + 1;
  for (i; i < len; i++) {
    arr[i] = generateRandomNumber(max);
  }
  return arr;
};

export default fillArray;
