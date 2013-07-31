// Copyright (c) 2011 Kaleb Hornsby
/**
 * @fileoverview JS Random Extensions
 * @author <a href="http://kaleb.hornsby.ws">Kaleb Hornsby</a>
 * @version 2011-06-11
 */
"use strict";
/** @namespace rand */
var rand = Math.random;

if (typeof module !== 'undefined' && module.exports) {
    // using CommonJS
    module.exports = rand;
} else if (typeof window !== 'undefined' && window.document) {
    // using DOM
    window.rand = rand;
}
//////////////////////////////////////////////////////////////////////////////
// Functions for Numbers:
//////////////////////////////////////////////////////////////////////////////

/**
 * @return random
 * @example
 * var n = rand.uniform(2, 3);
 * 1 <= n && n < 3;
 * //-> true
 * rand.uniform(2, 2);
 * //-> 2
 */
rand.uniform = function(a, b) /**number*/ {
    return Math.random() * (b - a) + a;
};
rand.num  = rand.uniform;

//////////////////////////////////////////////////////////////////////////////
// Functions for integers:
//////////////////////////////////////////////////////////////////////////////

/**
 * @return random
 * @example
 * var n = rand.int_(2, 4);
 * 2 <= n && n < 4
 * //-> true
 * rand.int_(2, 3);
 * //-> 2
 */
rand.int_ = function(j, k) /**int*/ {
    return Math.floor(rand.uniform(j, k));
};

/**
 * @return a randomly selected element from {{start, start + step, ..., stop}}.
 */
rand.range = function(start, stop, step) {
    switch (arguments.length) {
    case 1:
        return rand.int_(0, start);
    case 2:
        return rand.int_(start, stop);
    case 3:
        return start + rand.int_(0, (stop-start) / step) * step;
    default:
        return 0;
    }
};

/**
 * @name int
 * @function
 * @memberOf rand
 * @param j
 * @param k
 * @return random
 * @example
 * var n = rand.int(2, 3);
 * 2 <= n && n <= 3
 * //-> true
 * rand.int(2, 2);
 * //-> 2;
 */
rand['int'] = function(j, k) /**int*/ {
    return rand.int_(j, k + 1);
};

//////////////////////////////////////////////////////////////////////////////
// Functions for arrays and sequences:
//////////////////////////////////////////////////////////////////////////////

/**
 * @return random index
 * @example
 * var n = rand.index(new Array(3));
 * 0 <= n && n < 3;
 * //-> true
 * rand.index('c');
 * //-> 0
 */
rand.index = function(seq) /**int*/ {
    return rand.int_(0, seq.length);
};

/**
 * @return {*} random item
 * @example
 * var o = rand.item(['a','b']);
 * o == 'a' || o == 'b';
 * //-> true
 * rand.item('c');
 * //-> 'c'
 */
rand.item = function(ary) {
    return ary[rand.index(ary)];
};

/**
 * @return the original array, shuffled in place
 * @example
 * var foo = [1, 2, 3];
 * rand.shuffle(foo);
 */
rand.shuffle = function(array) {
    var top = array.length;
    while (--top > 0) {
        var current = Math.floor(Math.random() * (top + 1));
        var tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
};

/**
 * @return a new shuffled array
 * @example
 * var foo = rand.shuffled([1, 2, 3]);
 */
rand.shuffled = function(array) {
    return rand.shuffle(array.slice(0));
};

//////////////////////////////////////////////////////////////////////////////
// Functions for objects:
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 */
rand.key_ = function(obj) /**string*/ {
    var k, r, i = 0;
    for (k in obj) {
        if (obj.hasOwnProperty(k) && rand() < 1 / ++i) {
            r = k;
        }
    }
    return r;
};

/**
 * @return random key
 */
rand.key = function(obj) /**string*/ {
    if (!Object.keys) { return rand.key_(obj); }
    return rand.item(Object.keys(obj));
};

/**
 * @return {*} random property
 */
rand.choice = function(obj) {
    return obj[rand.key(obj)];
};
