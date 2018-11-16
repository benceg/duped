// These test cases pertain to all duplicate finding functions.
import { performance } from 'perf_hooks';
import * as test from 'tape';
import { TypedArray } from '../../types/typedArray';
import reduceTyped from './reduceTyped';
import reduceUntyped from './reduceUntyped';
import sortImmutableTyped from './sortImmutableTyped';
import sortImmutableUntyped from './sortImmutableUntyped';

// An ugly mutating function, but hey, it's a test.
const fillArrayContiguous = (array: TypedArray, providedLength?: number) => {
  let i = 0;
  if (array.length) {
    for (i; i < array.length; i++) {
      array[i] = Math.min(i + 1, array.length);
    }
  } else if (providedLength) {
    for (i; i < providedLength; i++) {
      (array as number[]).push(Math.min(i + 1, providedLength));
    }
  }
  return array;
};

// A whole bunch of setup here.
const Uint8Data = fillArrayContiguous(new Uint8Array(8));
Uint8Data[1] = Uint8Data[5];
Uint8Data[6] = Uint8Data[4];
Uint8Data[7] = Uint8Data[4];

const Uint16Data = fillArrayContiguous(new Uint16Array(20000));
Uint16Data[100] = Uint16Data[3];
Uint16Data[121] = Uint16Data[244];
Uint16Data[333] = Uint16Data[777];
Uint16Data[444] = Uint16Data[777];
Uint16Data[555] = Uint16Data[777];

const Uint32Data = fillArrayContiguous(new Uint32Array(1000000));
Uint32Data[100] = Uint32Data[3];
Uint32Data[121] = Uint32Data[244];
Uint32Data[333] = Uint32Data[777];
Uint32Data[444] = Uint32Data[777];
Uint32Data[50000] = Uint32Data[40000];

const DynamicArrayData = fillArrayContiguous([], 1000000);
DynamicArrayData[100] = DynamicArrayData[3];
DynamicArrayData[121] = DynamicArrayData[244];
DynamicArrayData[333] = DynamicArrayData[777];
DynamicArrayData[444] = DynamicArrayData[777];
DynamicArrayData[50000] = DynamicArrayData[40000];

const runTest = (name: string, fn: (arr: TypedArray) => number[]) => {
  test(name, t => {
    // We sort returned arrays as different
    // algorithms yield different orders.
    const p1 = performance.now();
    const Uint8Test = fn(Uint8Data);
    const p2 = performance.now();
    t.deepEqual(
      Uint8Test.sort(),
      [Uint8Data[5], Uint8Data[4]].sort(),
      'generates a unique list of Uint8 duplicates'
    );
    const p3 = performance.now();
    const Uint16Test = fn(Uint16Data);
    const p4 = performance.now();
    t.deepEqual(
      Uint16Test.sort(),
      [Uint16Data[3], Uint16Data[244], Uint16Data[777]].sort(),
      'generates a unique list of Uint16 duplicates'
    );
    const p5 = performance.now();
    const Uint32Test = fn(Uint32Data);
    const p6 = performance.now();
    t.deepEqual(
      Uint32Test.sort(),
      [
        Uint32Data[3],
        Uint32Data[244],
        Uint32Data[777],
        Uint32Data[40000],
      ].sort(),
      'generates a unique list of Uint32 duplicates'
    );
    const p7 = performance.now();
    const DynamicArrayTest = fn(DynamicArrayData);
    const p8 = performance.now();
    t.deepEqual(
      DynamicArrayTest.sort(),
      [
        DynamicArrayData[3],
        DynamicArrayData[244],
        DynamicArrayData[777],
        DynamicArrayData[40000],
      ].sort(),
      'generates a unique list of dynamic array duplicates'
    );

    // tslint:disable-next-line no-console
    console.log(
      `Benchmarks for ${name}`,
      JSON.stringify(
        {
          Uint8Array: (p2 - p1).toFixed(3) + 'ms',
          UInt16Array: (p4 - p3).toFixed(3) + 'ms',
          UInt32Array: (p6 - p5).toFixed(3) + 'ms',
          DynamicArray: (p8 - p7).toFixed(3) + 'ms',
        },
        undefined,
        2
      )
    );
    t.end();
  });
};

runTest('reduceTyped', reduceTyped);
runTest('reduceUntyped', reduceUntyped);
runTest('sortImmutableTyped', sortImmutableTyped);
runTest('sortImmutableUntyped', sortImmutableUntyped);
