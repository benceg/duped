import * as test from 'tape';
import typedCreateArray from './typed';

test('createArray/typed', t => {
  const Uint8Arr = typedCreateArray(254);
  const Uint16Arr = typedCreateArray(65534);
  const Uint32Arr = typedCreateArray(16777214);
  const DynamicArr = typedCreateArray(4294967295);
  t.equal(
    Uint8Arr.constructor,
    Uint8Array,
    'creates a Uint8Array given a length lte 254'
  );
  t.equal(
    Uint16Arr.constructor,
    Uint16Array,
    'creates an empty array given a length lte 65534'
  );
  t.equal(
    Uint32Arr.constructor,
    Uint32Array,
    'creates an empty array given a length lte 16777214'
  );
  t.equal(
    DynamicArr.constructor,
    Array,
    'creates an empty dynamic array for extremely large datasets'
  );
  t.end();
});
