Fork of [christiansandor/args](https://github.com/christiansandor/args)  
[![Build Status](https://travis-ci.org/Kamidere-Laboratory/args.svg?branch=master)](https://travis-ci.org/Kamidere-Laboratory/args)
[![Coverage Status](https://coveralls.io/repos/github/Kamidere-Laboratory/args/badge.svg?branch=master)](https://coveralls.io/github/Kamidere-Laboratory/args?branch=master)

# Args
The most minimalistic parameter processor for node. Really.

## Usage
Couldn't be simpler, just install it like:
```
npm install @kamidere/node-args
```

And use it as:
```
const { getArgs } = require('@kamidere/node-args');

const args = getArgs(process.argv);

const anyString = "-a --test nope";
const argsFromString = getArgs(anyString.split(' '));
```

### Call node with
- your named parameters prefixed with **--**
- your shorthand parameters prefixed with **-** (with multiple
  parameters in mind like `-ab = -a -b`)
- your parameters and assigned values separated with a
**space** or an **equals** sign

my.js
```
const { getArgs } = require('@kamidere/node-args');

console.log(getArgs(process.argv));
```

```
node my.js -t -ab=2 -c false -p no some additional data 2 --argsis awesome --another=1
```

So you will get:
```
{
    additional: ['node', 'node file path', 'some', 'additional', 'data', 2],
    t: true,
    a: 2,
    b: 2,
    c: false,
    p: 'no',
    argsis: 'awesome',
    another: 1
};
```

Yay.

*Side note: It's build upon TypeScript and tested thoroughly.*

## Build
The source files are in the *src* folder, and the available
scripts are
- `npm run build:src` to build without tests
- `npm run build:tests` to build with tests
- `npm test` to run tests

Please do contribute if you find a better, faster or easier way
to process arguments.
