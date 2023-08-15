// 1. Types and Values
// language of values -> code that runs in produciton
// language of types -> completely erased before the code reaches out users
/// make sure the code doesn't contain mistakes before we ship it

// all of Javascript -> value-level code
// javascript function
function sum(a,b) {
    return a + b;
};

// Typescript adds type annotations to JavaScript and make sure the sum function we wrote will never be called with anything oher than numbers
// using type annotations
function difference(a: number, b: number): number {
    return a - b;
};

// real world code sometimes needs to be generic and accept values we dont know in advance
// type parameters in angle brackets <A, B, ...>
// assign them value parameters with a: A
// can then pass type parameters to type level function -> computes output type from the types of inputs
// type level programming
function genericFunction<A, B>(a: A, b: B): DoSomething<A, B> {
    return sum(a, b);
}

// DoSomething<A, B> is a type level funcion written in a peculiar programming language Type-Level Typescript
// type-level function:
type DoSomething<A, B> = { }
// value-level function
const doSomething = (a, b) => {

}

// type-level typescript minimal purely functional language
// functional programming -> functions are the main means of abstraction in type-level typescript

// type-level, functions are called generic types
// take one || several type parameters, and return a single output type
// ex. function taking two type parameters and wrapping them in a tuple
type someFunction<A, B> = [A, B];

// not a lot of features, just to type your code
// almost Turing Complete - can solve problems of moderate complexity with it
// can:
/// code branching -> execute diff code paths depending on condition (if/else)
/// variable assignment -> declaring a variable and using it in an expression (var/let/const)
/// functions -> re-usable bits of logic
/// loops -> usually through recursion
/// equality checks -> for types (===)

// cannot:
/// no mutable state -> cant re-assign a variable too new value at type level
/// no input/lutput -> cant perform side effects - console.log(), reading a file, making HTTP req at type level
/// no higher order functions -> cant pass function to another function in type-level typescript
//// common practice at value level -> .map() .filter() .reduce() are all higher order functions
//// wont be able to implement at type level

/**
 * The `identity` function takes a value of any type
 * and returns it. Make it generic!
 */
namespace identity {
    function identity(a: any): any {
        return a;
    }
    let input1 = 10;
    let res1 = identity(input1);

    type test1 = Expect<Equal<typeof res1, any>>;

    let input2 = "Hello";
    let res2 = identity(input2);

    type test2 = Expect<Equal<typeof res2, any>>;
};

/**
 * `safeHead` takes an array, a default value
 * and returns the first element of the array
 * if it isn't empty. Make it generic!
 */
namespace safeHead {
    function safeHead<A>(array: A[], defaultValue: A): A {
        return array[0] ?? defaultValue;
    }

    let input1 = [1, 2, 3];
    let res1 = safeHead(input1, 0);

    type test1 = Expect<Equal<typeof res1, number>>;

    let input2 = ["Hello", "Hola", "Bonjour"];
    let res2 = safeHead(input2, "Hi");

    type test2 = Expect<Equal<typeof res2, string>>;
};

/**
 * `map` transforms all values in an array to a value of
 * different type. Make it generic!
 */
namespace map {
    function map<A, B>(array: A[], fn: (value: A) => B): B[] {
        return array.map(fn);
    }

    let input1 = [1, 2, 3];
    let res1 = map(input1, value => value.toString());

    type test1 = Expect<Equal<typeof res1, string[]>>;

    let input2 = ["Hello", "Hola", "Bonjour"];
    let res2 = map(input2, str => str.length);

    type test2 = Expect<Equal<typeof res2, number[]>>;
};

/**
 * `pipe2` takes a value and pipes it into 2 functions
 * sequentially. For example, `pipe2(x, f1, f2)` will
 * result in `f2(f1(x))`. Make it generic!
 */
namespace pipe2 {
    function pipe2<A, B, C>(
        x: A,
        f1: (value: A) => B,
        f2: (value: B) => C
    ): C {
        return f2(f1(x));
    }

    let res1 = pipe2(
        [1, 2, 3],
        arr => arr.length,
        length => `length: ${length}`
    );

    type test1 = Expect<Equal<typeof res1, string>>;

    let res2 = pipe2(
        { name: "Alice" },
        user => user.name,
        name => name.length > 5
    );

    type test2 = Expect<Equal<typeof res2, number>>

}

// computer science lingo - ppl talk about terms rather than values to distinguish code from types
// value-level vs. type-level code -> makes a little more sense