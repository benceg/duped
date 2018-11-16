import * as test from 'tape';
import untypedCreateArray from './untyped';

// Time permitting, there would have been more
// exhaustive unit tests in which the performance
// and memory implications of creating large datasets
// using dynamic memory allocations would have been examined.
test('createArray/untyped', t => {
  t.deepEqual(untypedCreateArray(), [], 'creates an empty array');
  t.end();
});
