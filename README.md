[![Stories in Ready](https://badge.waffle.io/kaleb/js-rand.png?label=ready)](http://waffle.io/kaleb/js-rand)



# rand

Random utilities for Node.js.

## Usage

```js
var rand = require('rand');

var n = rand.int(1, 10);
// n is an integer in range [1, 9]

var foo = [1, 2, 3];
var shuffled = rand.shuffled(foo);
// or in place:
rand.shuffle(foo);
```

## Documentation

Check the source code. It's well documented.
