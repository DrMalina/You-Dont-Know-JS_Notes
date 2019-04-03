function outer() {
	var a = 1;

	function inner() {
		var b = 2;

		// we can access both `a` and `b` here
		console.log( a + b );	// 3
	}

	inner();

	// we can only access `a` here
	console.log( a );			// 1
}

outer();
/*
----------------------------------------------------

TYPES

- There are 7 built in types available as of ES6, when the symbol type was added:
string, number, boolean, null, undefined, object, symbol/
- The return value of typeof is a string indicating the  type of the input value.
*/

var a;
typeof a;   // 'undefined'

a = 'hello world';
typeof a;    // 'string'

a = true;
typeof a;    // 'boolean'

a = null;
typeof a;   // 'object' - this is a bug

a = undefined;
typeof a;   // 'undefined'

a = {b: 'c'};
typeof a;   // 'object'

a = Symbol();
typeof a;   // 'symbol'

/* OBJECTS
*/

var obj = {
    a: 'hello world',
    b: 42,
    c: true
}

obj.a;       // 'hello world'
obj.b;       // 42
obj['c'];    // true

b = 'a';
obj[b];      // 'hello world'


/* FUNCTIONS
- Functions are a subtype of objects (like arrays)
- typeof called on a function returns function - this means functions are a main type and can have properties,
but these are rarely used
*/

function foo(){
    return 42;
}

foo.bar = 'hello world';

typeof foo;       // 'function'
typeof foo();     // 'number'
typeof foo.bar;   // 'string'

/* TRUTHY & FALSY VALUES

falsy values:
> false
> ''
> 0, -0, NaN
> null, undefined

truthy: !falsy

*/

/* EQUALITY */

var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c;		// true
b == c;		// true
a == b;		// false !!!

//Inequality

var a = 42;
var b = "foo";

a < b;		// false
a > b;		// false
a == b;		// false   

/* Because the b value is being coerced to the "invalid number value" NaN in the < and > comparisons, and the specification says that NaN is neither greater-than nor less-than any other value. */

// ********************* FUNCTIONS ************

// HOISTING

var a = 2;

foo();					// works because `foo()`
						    // declaration is "hoisted"

function foo() {
	a = 3;

	console.log( a );	// 3

	var a;				// declaration is "hoisted"
						    // to the top of `foo()`
}

console.log( a );	// 2

//Nested scopes
/* When you declare a variable, it is available anywhere in that scope, as well as any lower/inner scopes */

function foo() {
	var a = 1;

	function bar() {
		var b = 2;

		function baz() {
			var c = 3;

			console.log( a, b, c );	// 1 2 3
		}

		baz();
		console.log( a, b );		// 1 2
	}

	bar();
	console.log( a );				// 1
}

foo();

// when not in 'strict mode' :

function foo() {
	a = 1;	// `a` not formally declared
}

foo();
a;			// 1 -- oops, auto global variable :(

/* Using LET lets you declare variables to belong to individual block {...} */

function foo() {
	var a = 1;

	if (a >= 1) {
		let b = 2;

		while (b < 5) {
			let c = b * 2;
			b++;

			console.log( a + c );
		}
	}
}

foo();
// 5 7 9

/* IIFEs */

var a = 42;

(function IIFE(){
	var a = 10;
	console.log( a );	// 10
})();

console.log( a );		// 42

//

var x = (function IIFE(){
	return 42;
})();

x;	// 42


/* CLOSURES (in detail later) */
function makeAdder(x) {
	// parameter `x` is an inner variable

	// inner function `add()` uses `x`, so
	// it has a "closure" over it
	function add(y) {
		return y + x;
	};

	return add;
}

// `plusOne` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );		// 4  <-- 1 + 3
plusOne( 41 );		// 42 <-- 1 + 41

plusTen( 13 );		// 23 <-- 10 + 13


/* this */
function foo() {
	console.log( this.bar );
}

var bar = "global";

var obj1 = {
	bar: "obj1",
	foo: foo
};

var obj2 = {
	bar: "obj2"
};

// --------

foo();				// "global"
obj1.foo();			// "obj1"
foo.call( obj2 );		// "obj2"
new foo();			// undefined

/* 
   1 foo() ends up setting this to the global object in non-strict mode     -- in strict mode, this would be undefined and you'd get an error      in accessing the bar property -- so "global" is the value found     for this.bar.
  2  obj1.foo() sets this to the obj1 object.
  3  foo.call(obj2) sets this to the obj2 object.
  4  new foo() sets this to a brand new empty object.
 */

 /* PROTOTYPES (in detail later) */

 var foo = {
	a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create( foo );

bar.b = "hello world";

bar.b;		// "hello world"
bar.a;		// 42 <-- delegated to `foo`