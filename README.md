# Duped.

<sup><sup>duped again.</sup></sup>&nbsp;&nbsp; ¯\\_(ツ)_/¯ &nbsp;&nbsp;<sup><sup>oh well!</sup></sup>

A showcase of a few different ways to pick a **unique** list of **duplicates** from an array.

> NB: These will run on an ES2015 compatible version of Node.js. However, they'll run on ES5 - just specify it in `compilerOptions.target` in **tsconfig.json**. You'll also want to swap out some types for their older, less swish equivalents in **index.ts**.

## These algorithms are my own and wholly devised by me. Please feel free to use them. They embody the following principles:

1. They are immutable. This isn't often the case with algorithms that demand raw power. The tradeoff here is that they can be composed with other functions and will always maintain referential transparency. You shouldn't have to touch your existing data for reasons ranging from reasonability to garbage collection.

2. They're stable, and fully backed by unit tests.

3. They're fast. Run the unit tests to see just how fast. Naturally, some are faster than others. A couple hit the Big O holy grail, sacrificing a bit of auxiliary space for time savings. It turns out binary is a very workable medium in JavaScript.

4. They're fully static typed. Using them in a TypeScript codebase should be a no-brainer.

5. They're inexhaustive, mostly because I made them up. There are many solutions to this problem out there, many of which I've already seen or used. There's no point in rehashing something someone's already done. These provide creative solutions to a problem which (hopefully).

6. They don't have any external dependencies. If these were NPM modules, they could be installed & leveraged rather trivially, without bloating a codebase.

7. They are written as literate code. I see literate code as a form of generosity to be paid forward. It's helped me, and perhaps the comments in this repo will help you, too.

## Findings

To my surprise, I learned a fair few things while building these out.

1. Not all implementations of v8 are equal. I came up against different upper limits for a Uint32Array between Node.js, Chrome on Windows, and Chrome on Mac. I also managed to crash Chrome a few times.

2. Typed arrays don't show much performance difference for smaller numbers, but the more massive the data set becomes, the more significant their saving becomes. This is evidenced by two areas of the unit tests: the static reducer approach achieves lower-to-parity performance with the dynamic reducer. However, after a certain number of entries (counting into the millions), the dynamic reducer begins to grind in relation to the static reducer. Similarly, both sorting algorithms perform decently - even outpacing the reducers - when dealing with 32 bit arrays below a certain size. When sorting dynamic arrays, however, they produce the worst fioures of the group.

3. v8's underlying implementation of a dynamic array appears to resolve on a best-guess effort to a JavaScript typed array - or something very much akin to it (perhaps its own underlying implementation?) - if it can. I have not examined v8's internals deeply enough to determine whether this is a fact, but the numbers don't lie.

4. I chose to experiment with a few things I hadn't tried before. Tape is one of them, and I really like it. Its speed and simple, no-nonsense approach to TDD are refreshing.

5. My original approach involved some ill-conceived maths which in hindsight didn't make sense. It's best to keep algorithms as simple and verbose as possible and pare them back while relying on your test harness to prove your hypotheses, rather than to consider yourself a mathematical wizard and attempt gung-ho to conceive of them from scratch using complex and esoteric means.

## Practical Application

1. In the real world, I'd probably run algorithms like these in a worker, given the opportunity. It blocks. There's no real way around that, as introducing asynchrony would make it horribly slow.

2. While the supplied directive was to generate and use random numbers, I would very happily rely on this algorithm - or perhaps a mixed approach, involving a choice of algorithm apropos to the performance metrics for that algorithm when given an argument of a certain array type - in the real world, for non-random datasets.

3. Had I the time, I'm sure I'd have come up with more solutions that eke JavaScript's performance out on a pico-optimisation scale. Alas, I have food to put on the table.

4. For massive workloads, it's possible to split the arrays up and perform comparisons on progressively halved data sets, concurrently. Workers could be used, but it's a pity that SharedArrayBuffer was shut down, as it would have potentially proven an excellent answer to JavaScript's rather inelegant interprocess messaging.

## Do It Yourself

1. Clone the repo.

2. Install [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/en/docs/install) if you haven't already.

3. Navigate to the repo, and run `yarn` to install its dependencies and build it.

4. Run `yarn test` to check whether it works and see some performance metrics.

5. Run `yarn start` to use the CLI to choose your own algorithm and supply your own maximum number. You can gauge the performance of the algoritm you've chosen on a random dataset of an arbitrary magnitude.
