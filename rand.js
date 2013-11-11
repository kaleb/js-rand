/**
 * @fileoverview JS Random Extensions
 * @copyright 2011 Kaleb Hornsby
 * @author <a href="http://kaleb.hornsby.ws">Kaleb Hornsby</a>
 * @version 2011-06-11
 */
!function (name, context, definition) {
	"use strict";
	if (typeof define == 'function' && define.amd) define(definition);
	else if (typeof module != 'undefined') module.exports = definition();
	else context[name] = definition();
}('rand', this, function() {
	var
	/**
	 * @constructor
	 * @param {RandFunction} rand
	 */
	exports = function Rand(rand) {
		/** @type {RandFunction} */
		this.rand = rand;
	},
	has = Object.prototype.hasOwnProperty;
	exports.prototype = {
		constructor: exports,

		// Functions for Numbers:
		// ======================

<<<<<<< HEAD
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
=======
		/**
		 * @return {RandNumber} in the range [a, b]
		 * @param {Number} a - lower inclusive bound
		 * @param {Number} b - upper inclusive bound
		 * @example
		 * var n = rand.uniform(2, 3);
		 * console.assert(2 <= n && n <= 3);
		 * console.assert(rand.uniform(2, 2) == 2);
		 */
		uniform: function(a, b) {
			return this.rand() * (b - a) + a;
		},
>>>>>>> c2eea56... Made rand a constructor

		// Functions for integers:
		// =======================

		/**
		 * @private
		 * @return {RandInteger} in the range [j, k)
		 * @param {Number} j - lower inclusive bound
		 * @param {Number} k - upper exclusive bound
		 * @example
		 * var n = rand.int_(2, 4);
		 * console.assert(2 <= n && n < 4);
		 * console.assert(rand.int_(2, 3) == 2);
		 */
		int_: function(j, k) {
			return Math.floor(rand.uniform(j, k));
		},

<<<<<<< HEAD
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
=======
		/**
		 * @return {RandInteger} in the range [j, k]
		 * @param {Number} j - lower inclusive bound
		 * @param {Number} k - upper inclusive bound
		 * @example
		 * var n = rand.int(2, 3);
		 * console.assert(2 <= n && n <= 3);
		 * console.assert(rand.int(2, 2) == 2);
		 */
		'int': function(j, k) {
			return rand.int_(j, k + 1);
		},
>>>>>>> c2eea56... Made rand a constructor

		/**
		 * @return {RandInteger} element from the set of
		 * {start, start + step, ..., stop}
		 * @param {Number} [start=0]
		 * @param {Number} stop
		 * @param {Number} [step=1]
		 */
		range: function(start, stop, step) {
			switch (arguments.length) {
			case 1:
				return rand.int_(0, start);
			case 2:
				return rand.int_(start, stop);
			case 3:
				return rand.int_(start, stop / step) * step;
			default:
				return 0;
			}
		},

		// Functions for sequences:
		// ===================================
		
		/**
		 * @return {RandInteger} index from a sequence
		 * @param {Sequence} seq
		 * @example
		 * var n = rand.index(Array(3));
		 * console.assert(0 <= n && n < 3);
		 * console.assert(rand.index('c') == 0);
		 */
		index: function(seq) {
			return rand.int_(0, seq.length);
		},
		
		/**
		 * @return {RandProp} from a sequence
		 * @example
		 * var o = rand.item(['a','b']);
		 * console.assert(o == 'a' || o == 'b');
		 * console.assert(rand.item('c') == 'c');
		 */
		item: function(seq) {
			return seq[rand.index(seq)];
		},

		// Functions for objects:
		// ======================
		
		/** @private */
		_key: function(o) {
			var k, r, i = 0;
			for (k in o) {
				if (has.call(o, k) && this.rand() < 1 / ++i) {
					r = k;
				}
			}
			return r;
		},
		
		/**
		 * @return {String} random property key from obj
		 * @param {*} obj
		 */
		key: function(obj) {
			if (!Object.keys) { return rand._key(obj); }
			return rand.item(Object.keys(obj));
		},
		
		/**
		 * @return {*} random property value from obj
		 * @param {*} obj
		 */
		choice: function(obj) {
			return obj[rand.key(obj)];
		},
	};

	var rand = new exports(Math.random);
	rand.Rand = exports;
	return rand;
});

/**
 * Pseudorandomly generated number
 * @typedef {Number} RandNumber
 */
/**
 * Pseudorandomly generated integer
 * @typedef {Number} RandInteger
 */
<<<<<<< HEAD
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
    while (top) {
        var current = rand.range(top--);
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
    return rand.shuffle([].slice.call(array, 0));
};

//////////////////////////////////////////////////////////////////////////////
// Functions for objects:
//////////////////////////////////////////////////////////////////////////////

=======
>>>>>>> c2eea56... Made rand a constructor
/**
 * Pseudorandomly obtained property key from an object
 * @typedef {String} RandKey
 */
/**
 * Pseudorandomly obtained property value from an object
 * @typedef {*} RandProp
 */
/**
 * Object that should have a numeric length property and that can be iterable
 * @typedef {(String|Array|Object)} Sequence
 * @property {Number} length
 */
/**
 * @callback RandFunction
 * @return {RandNumber} in the range [0, 1)
 */
<<<<<<< HEAD
rand.choice = function(obj) {
    return obj[rand.key(obj)];
};
=======
>>>>>>> c2eea56... Made rand a constructor
