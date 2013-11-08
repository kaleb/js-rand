var rand = require('./');
var assert = require('assert');
var n, o, array, newArray;

// uniform
n = rand.uniform(2, 3);
assert.ok(1 <= n);
assert.ok(n < 3, "n should be <= 3. n = " + n);
assert.ok(rand.uniform(2, 2) === 2);


// range
n = rand.range(10);
assert.ok(n < 10);
assert.ok(n >= 0);

n = rand.range(5, 10);
assert.ok(n < 10);
assert.ok(n >= 5);

n = rand.range(5, 10, 2);
assert.ok(n < 10, "n should be < 10. n = " + n);
assert.ok(n >= 5);
assert.ok(n % 2 === 1);

// int
n = rand.int(2, 3);
assert.ok(2 <= n);
assert.ok(n <= 3);
assert.ok(Math.floor(n) === n);
assert.ok(rand.int(2, 2) === 2);

// index
n = rand.index(new Array(3));
assert.ok(0 <= n);
assert.ok(n < 3);
assert.ok(rand.index('c') === 0);

// item
o = rand.item(['a', 'b']);
assert.ok(o === 'a' || o === 'b');
assert.ok(rand.item('c') === 'c');

// shuffle
array = [1, 2, 3];
newArray = rand.shuffle(array);
assert.ok(array === newArray);
assert.ok(newArray.indexOf(1) >= 0);
assert.ok(newArray.indexOf(2) >= 0);
assert.ok(newArray.indexOf(3) >= 0);

// shuffled
array = [1, 2, 3];
newArray = rand.shuffled(array);
assert.ok(array !== newArray);
assert.ok(newArray.indexOf(1) >= 0);
assert.ok(newArray.indexOf(2) >= 0);
assert.ok(newArray.indexOf(3) >= 0);

// key
o = rand.key({'a': 1, 'b': 2});
assert.ok(o === 'a' || o === 'b');
assert.ok(rand.key({'foo': true}) === 'foo');

// choice
o = rand.choice({'a': 1, 'b': 2});
assert.ok(o === 1 || o === 2);
assert.ok(rand.choice({'foo': true}) === true);
