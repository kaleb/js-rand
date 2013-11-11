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
	has = Object.prototype.hasOwnProperty,
	slice = Array.prototype.slice;
	exports.prototype = {
		constructor: exports,

		// Functions for Numbers:
		// ======================

		/**
		 * @return {RandNumber} in the range [a, b)
		 * @param {Number} a - lower inclusive bound
		 * @param {Number} b - upper exclusive bound
		 * @example
		 * var n = rand.uniform(2, 3);
		 * console.assert(2 <= n && n < 3);
		 * console.assert(rand.uniform(2, 2) == 2);
		 */
		uniform: function(a, b) {
			return this.rand() * (b - a) + a;
		},

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
			return Math.floor(this.uniform(j, k));
		},

		/**
		 * @return {RandInteger} below k
		 * @param {Number} k - upper exclusive bound
		 * @example
		 * var n = rand.below(2);
		 * console.assert(n == 0 || n == 1);
		 */
		below: function(k) {
			return Math.floor(this.rand()) * k;
		},

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
			return this.int_(j, k + 1);
		},

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
				return this.below(start);
			case 2:
				return this.int_(start, stop);
			case 3:
				var below = this.below((stop - start) / step);
				return start + below * step;
			default:
				return 0;
			}
		},

		// Functions for sequences:
		// ===================================
		
		/**
		 * @return {RandInteger} index from sequence
		 * @param {Sequence} sequence
		 * @example
		 * var n = rand.index(Array(3));
		 * console.assert(0 <= n && n < 3);
		 * console.assert(rand.index('c') == 0);
		 */
		index: function(sequence) {
			return this.below(sequence.length);
		},
		
		/**
		 * @return {*} random element from sequence
		 * @param {Sequence} sequence
		 * @example
		 * var o = rand.item(['a','b']);
		 * console.assert(o == 'a' || o == 'b');
		 * console.assert(rand.item('c') == 'c');
		 */
		item: function(sequence) {
			return sequence[this.index(sequence)];
		},

		/**
		 * @return the original array, shuffled in place
		 * @param {Array} array
		 * @example
		 * var foo = [1, 2, 3];
		 * rand.shuffle(foo);
		 * console.assert(foo[0] == 1 || foo[0] == 2 || foo[0] == 3);
		 */
		shuffle: function(array) {
			var current, swap, top = array.length;
			while (top) {
				swap = array[current = this.range(top--)];
				array[current] = array[top];
				array[top] = swap;
			}
			return array;
		},
		
		/**
		 * @return {Array} a new shuffled array
		 * @param {Sequence} sequence
		 * @example
		 * var foo = rand.shuffled([1, 2, 3]);
		 */
		shuffled: function(sequence) {
			return this.shuffle(sequence.slice ?
				sequence.slice(0) : slice.call(sequence, 0));
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
			if (!Object.keys) { return this._key(obj); }
			return this.item(Object.keys(obj));
		},
		
		/**
		 * @return {*} random property value from obj
		 * @param {*} obj
		 */
		choice: function(obj) {
			return obj[this.key(obj)];
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
/**
 * Object that should have a numeric length property and that can be iterable
 * @typedef {(String|Array|Object)} Sequence
 * @property {Number} length
 */
/**
 * @callback RandFunction
 * @return {RandNumber} in the range [0, 1)
 */
