import * as proxyquire from 'proxyquire';
import * as test from 'tape';

const getPredictableValue = (max: number) => max;
const fillArray = proxyquire('./fillArray', {
  './generateRandomNumber': { default: getPredictableValue },
}).default;

test('fillArray', t => {
  t.deepEqual(
    fillArray([], 3),
    [3, 3, 3, 3],
    'attempts to fill any array with n + 1 values'
  );
  t.deepEqual(
    fillArray(new Uint8Array(4), 3),
    new Uint8Array([3, 3, 3, 3]),
    'works for a Uint8Array'
  );
  t.deepEqual(
    fillArray(new Uint16Array(7), 6),
    new Uint16Array([6, 6, 6, 6, 6, 6, 6]),
    'works for a Uint16Array'
  );
  t.deepEqual(
    fillArray(new Uint32Array(8), 7),
    new Uint32Array([7, 7, 7, 7, 7, 7, 7, 7]),
    'works for a Uint32Array'
  );
  t.end();
});
