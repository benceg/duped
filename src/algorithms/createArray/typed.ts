const typedCreateArray = (
  max: number
): Uint8Array | Uint16Array | Uint32Array | number[] => {
  const len = max + 1;
  if (len < 2 ** 8) {
    return new Uint8Array(len);
  }
  if (len < 2 ** 16) {
    return new Uint16Array(len);
  }
  if (len < 2 ** 32) {
    return new Uint32Array(len);
  }
  return [] as number[];
};

export default typedCreateArray;
