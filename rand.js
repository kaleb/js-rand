// Copyright (c) 2011 Kaleb Hornsby
/**
 * @fileoverview JS Random Extensions
 * @author <a href="http://kaleb.hornsby.ws">Kaleb Hornsby</a>
 * @version 2011-06-11
 */
"use strict";
/** @namespace exports */

/**
 * @return random
 * @example
 * var n = exports.uniform(2, 3);
 * 1 <= n && n <= 2;
 * //-> true
 * exports.uniform(2, 2);
 * //-> 2
 */
exports.uniform = function(a, b) /**number*/ {
    return Math.random() * (b - a) + a;
};

//////////////////////////////////////////////////////////////////////////////
// Functions for integers:
//////////////////////////////////////////////////////////////////////////////

/**
 * @return random
 * @example
 * var n = exports.int_(2, 4);
 * 2 <= n && n < 4
 * //-> true
 * exports.int_(2, 3);
 * //-> 2
 */
exports.int_ = function(j, k) /**int*/ {
    return Math.floor(exports.uniform(j, k));
};

/**
 * @return a randomly selected element from {{start, start + step, ..., stop}}.
 */
exports.range = function(start, stop, step) {
    switch (arguments.length) {
    case 1:
        return exports.int_(0, start);
    case 2:
        return exports.int_(start, stop);
    case 3:
        return exports.int_(start, stop / step) * step;
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
 * var n = exports.int(2, 3);
 * 2 <= n && n <= 3
 * //-> true
 * exports.int(2, 2);
 * //-> 2;
 */
exports['int'] = function(j, k) /**int*/ {
    return exports.int_(j, k + 1);
};

//////////////////////////////////////////////////////////////////////////////
// Functions for arrays and sequences:
//////////////////////////////////////////////////////////////////////////////

/**
 * @return random index
 * @example
 * var n = exports.index(new Array(3));
 * 0 <= n && n < 3;
 * //-> true
 * exports.index('c');
 * //-> 0
 */
exports.index = function(seq) /**int*/ {
    return exports.int_(0, seq.length);
};

/**
 * @return {*} random item
 * @example
 * var o = exports.item(['a','b']);
 * o == 'a' || o == 'b';
 * //-> true
 * exports.item('c');
 * //-> 'c'
 */
exports.item = function(ary) {
    return ary[exports.index(ary)];
};

//////////////////////////////////////////////////////////////////////////////
// Functions for objects:
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 */
exports.key_ = function(obj) /**string*/ {
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
exports.key = function(obj) /**string*/ {
    if (!Object.keys) { return exports.key_(obj); }
    return exports.item(Object.keys(obj));
};

/**
 * @return {*} random property
 */
exports.choice = function(obj) {
    return obj[exports.key(obj)];
};
