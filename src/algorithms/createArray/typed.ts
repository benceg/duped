const typedCreateArray = (
  max: number
): Uint8Array | Uint16Array | Uint32Array | number[] => {
  const len = max + 1;
  // max <= 254. 8 bits.
  if (len < 2 ** 8) {
    return new Uint8Array(len);
  }
  // max <= 65534. 16 bits.
  if (len < 2 ** 16) {
    return new Uint16Array(len);
  }
  // max <= 16777214.
  // We'll limit this thing
  // to 24 bit numbers given
  // the fact that different
  // OS tend to complain of
  // overrun at different values.
  if (len < 2 ** 24) {
    return new Uint32Array(len);
  }
  // If all else fails, just
  // return a dynamic array
  // to save the poor memory.
  return [] as number[];
};

export default typedCreateArray;
