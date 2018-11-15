export type TypedArray = Uint8Array | Uint16Array | Uint32Array | number[];

export type TypedArrayConstructor = new (len: number) => TypedArray;
