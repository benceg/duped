// tslint:disable no-console
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import { performance } from 'perf_hooks';
import typedCreateArray from './algorithms/createArray/typed';
import reduceTyped from './algorithms/findDuplicates/reduceTyped';
import reduceUntyped from './algorithms/findDuplicates/reduceUntyped';
import sortImmutableTyped from './algorithms/findDuplicates/sortImmutableTyped';
import sortImmutableUntyped from './algorithms/findDuplicates/sortImmutableUntyped';
import fillArray from './algorithms/utils/fillArray';
import { TypedArray } from './types/typedArray';

const VISIBLE_ORIGINAL_ARRAY = 50;
const VISIBLE_DUPLICATES = 100;

interface Algorithms {
  [key: string]: (arr: TypedArray) => number[];
}

interface DuplicatesVerdict {
  duplicates: number[];
  time: number;
}

const algorithms: Algorithms = {
  'Static Reducer': reduceTyped,
  'Dynamic Reducer': reduceUntyped,
  'Static Sort': sortImmutableTyped,
  'Dynamic Sort': sortImmutableUntyped,
};

const userPrompts = () =>
  inquirer.prompt<{ max: number; algorithm: string }>([
    {
      name: 'max',
      type: 'input',
      message:
        "Please enter a number. I'll generate a random array and find any duplicates.",
      validate: val => Number.isInteger(val) && val > 1,
      filter: val => parseInt(val, 10),
      default: 1000000,
    },
    {
      name: 'algorithm',
      type: 'list',
      message: 'Which algorithm would you like me to use?',
      choices: Object.keys(algorithms),
    },
  ]);

const getConstructorName = (fn: TypedArray) =>
  fn.constructor
    .toString()
    .replace('function ', '')
    .replace('() { [native code] }', '');

const findDuplicates = (
  array: TypedArray,
  algorithm: (arr: TypedArray) => number[]
): DuplicatesVerdict => {
  const arrayType = getConstructorName(array);
  console.log(
    chalk.blue(
      `Your ${arrayType} is ${
        array.length
      } entries long. I'm finding duplicates with my super duper powers now.`
    )
  );
  const then = performance.now();
  const duplicates = algorithm(array);
  const now = performance.now();
  return {
    duplicates,
    time: now - then,
  };
};

const declareVictory = (
  { duplicates, time }: DuplicatesVerdict,
  array: TypedArray,
  algorithm: string
) => {
  const visibleDuplicates = duplicates.slice(0, VISIBLE_DUPLICATES);
  const appendString =
    visibleDuplicates.length !== duplicates.length
      ? '... I could go on for ages.'
      : '';

  if (array.length < VISIBLE_ORIGINAL_ARRAY) {
    console.log(chalk.green("Here's the original array:"));
    console.log(chalk.gray(JSON.stringify(Array.from(array))));
    console.log(chalk.green('And I found the following duplicates:'));
    console.log(chalk.gray(JSON.stringify(visibleDuplicates)));
  } else {
    console.log(chalk.green('I found the following duplicates:'));
    console.log(
      chalk.gray(JSON.stringify(visibleDuplicates)) + chalk.white(appendString)
    );
  }
  console.log(
    chalk.green(
      `It took me ${time.toFixed(2)}ms using my ${algorithm} algorithm.`
    )
  );
};

const main = async () => {
  const { max, algorithm } = await userPrompts();
  const array = fillArray(typedCreateArray(max), max);
  const duplicatesVerdict = findDuplicates(array, algorithms[algorithm]);
  declareVictory(duplicatesVerdict, array, algorithm);
};

main();
