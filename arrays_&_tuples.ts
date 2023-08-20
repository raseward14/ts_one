// 2. TYPE-LEVEL ARRAYS
// arrays of type-level programs are called tuples
// types representing arrays with fixed length
// each index can contain a value of a different type
type Empty = [];
type One = [1];
type Two = [1, "2"]; // types can be different
type Three = [number, string, number]; // tuples can contain duplicates

// type level version of some of the most common array utilities
// tuples are indexed by number literal types, and not just numbers

// simultaneously read several keys from an object using a union of string literals
type User = { name: String; age: number; isAdmin: true }
type NameOrAge = User["name" | "age"]; // => string | number

// same with tuples using a union of number literal types
type SomeTuple = ["Richard", 31, true];
type MyNameOrAge = SomeTuple[0 | 1]; // => "Richard" | 31

// simultaneously read all indices in a tuple T with T[number]
type MyTuple = ["Richard", 31, true];
type Values = MyTuple[number]; // => "Richard" | 31 | true
// T[number] essentially a way of turning a list into a set at the type level

// Concatenating tuples
// can spread contents of tuple into another one using the ... rest element syntax
type Tuple1 = [4, 5];
type Tuple2 = [1, 2, 3, ...Tuple1]; 
// => [1, 2, 3, 4, 5];

// merge 2 tuples together
type ThisTuple = [1, 2, 3];
type ThatTuple = [4, 5];

type TheTuple = [...ThisTuple, ...ThatTuple]
// => [1, 2, 3, 4, 5];
// tuples created with ... are called Variadic Tuples

// Named Indices
/**
 * Implement a generic that returns the first type
 * in a tuple.
 *
 * Hint: How would you do it if `Tuple` was a value?
 */
namespace first {
    type First<Tuple extends any[]> = Tuple[0];

    type res1 = First<[]>;
    type test1 = Expect<Equal<res1, undefined>>;

    type res2 = First<[string]>;
    type test2 = Expect<Equal<res2, string>>;

    type res3 = First<[2, 3, 4]>;
    type test3 = Expect<Equal<res3, 2>>;

    type res4 = First<["a", "b", "c"]>;
    type test4 = Expect<Equal<res4, "a">>;
};

/**
 * Implement a generic that adds a type to the end
 * of a tuple.
 */
namespace append {
    type Append<Tuple extends any[], Element> = [...Tuple, Element]

    type res1 = Append<[1, 2, 3], 4>;
    type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

    type res2 = Append<[], 1>;
    type test2 = Expect<Equal<res2, [1]>>;
}

/**
 * Implement a generic that concatenates two tuples.
 */
namespace concat {
    type Concat<Tuple1 extends any[], Tuple2 extends any[]> = [...Tuple1, ...Tuple2]

    type res1 = Concat<[1, 2, 3], [4, 5]>;
    type test1 = Expect<Equal<res1, [1, 2, 3, 4, 5]>>;

    type res2 = Concat<[1, 2, 3], []>;
    type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}

// https://type-level-typescript.com/arrays-and-tuples#concatenating-tuples
// We can simultaneously read all indices in a tuple T with T[number]:
type SomeTuple = ["Bob", 28, true];
type Values = SomeTuple[number]; // "Bob" | 28 | true

/**
 * Implement a generic taking a tuple and returning
 * an array containing the union of all values in this tuple.
 */
namespace tupleToArray {
    type TupleToArray<Tuple extends any[]> = (Tuple[number])[];

    type res1 = TupleToArray<[1, 2, 3]>;
    type test1 = Expect<Equal<res1, (1 | 2 | 3)[]>>;

    type res2 = TupleToArray<[number, string]>;
    type test2 = Expect<Equal<res2, (number | string)[]>>;

    type res3 = TupleToArrya<[]>;
    type test3 = Expect<Equal<res3, never[]>>;

    type res4 = TupleToArray<[1] | [2] | [3]>;
    type test4 = Expect<Equal<res4, (1 | 2 | 3)[]>>;
}

// number[] that starts with 0
type AreaCode = [0, ...number[]];

// string[] that ends with a `!`
type Exclamation = [...string[], "!"];

// non-empty list of strings
type FullName = [string, ...string[]];

// starts and ends with a zero
type Padded = [0, ...number[], 0];

/**
 * Create a generic `NonEmptyArray` type that represents 
 * Arrays that contain at least one element.
 */
namespace nonEmptyArray {
    type NonEmptyArray<T> = [T, ...T[]];

    function sendMail(addresses: NonEmptyArray<string>) {

    }

    sendMail(["75 rue Quincampoix", "75003 Paris"]);
    sendMail(["123 5th Ave"]);
    // @ts-expect-error
    sendMail([]);
    // ^^ [] ❌ isnt assignable to NonEmptyArray<string>
}

/**
 * Implement a generic that gets the length
 * of a tuple type.
 *
 * Hint: 
 * How would you get the length of an array in JavaScript?
 * The type-level version is very similar :)
 */
namespace length {
    type Length<Tuple extends any[]> = Tuple['length'];

    res1 = Length<[]>;
    test1 = Expect<Equal<res1, 0>>;

    res2 = Length<[any]>
    test2 = Expect<Equal<res2, 1>>;

    res3 = Length<[any, any]>;
    test3 = Expect<Equal<res3, 2>>;

    res4 = Length<[any, any, any]>;
    test4 = Expect<Equal<res4, 3>>;
}

/**
 * Implement a generic that gets the length
 * of a tuple type, and adds one to it.
 *
 * This challenge may seem a bit random, but
 * this is actually the basis of representing
 * numbers and doing arithmetics at the type level!
 */
namespace LengthPlusOne {
    type PlusOne<Tuple extends any[]> = [...Tuple[], any]['length'];

    type res1 = PlusOne<[]>;
    type test1 = Expect<Equal<res1, 1>>;

    type res2 = PlusOne<[any]>;
    type test2 = Expect<Equal<res2, 2>>;

    type res3 = PlusOne<[any, any]>;
    type test3 = Expect<Equal<res3, 3>>;

    type res4 = PlusOne<[any, any, any]>;
    type test4 = Expect<Equal<res4, 4>>;
}

