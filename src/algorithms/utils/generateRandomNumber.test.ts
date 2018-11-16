import * as test from 'tape';
import generateRandomNumber from './generateRandomNumber';

test('generateRandomNumber', t => {
  t.equals(
    generateRandomNumber(300, 100) < 100,
    false,
    'will never drop below the specified minimum'
  );
  t.equals(
    generateRandomNumber(300, 100) > 300,
    false,
    'will never exceed the specified maximum'
  );
  t.end();
});
