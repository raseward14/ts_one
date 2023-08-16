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