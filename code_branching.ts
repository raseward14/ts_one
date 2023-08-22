// 4. CODE-BRANCHING
// type level we write branching logic using Conditional Types, look a lot like JavaScripts ternaries
type Maybe = A extends B ? "yes" : "no";
// is A assignable to B ? branch if true : branch if false

// 'infer' keyword makes conditional types much more powerful than they seem -> type level descructuring
type GetName<User> = User extends { name: infer Name } ? Name : "Anonymous";
// 'infer' declares a variable called 'Name'.
type N = GetName<{ name: "Gabriel" }>; // "Gabriel"

// we use 'infer' to extract the name property of User, and we return its content. equivalent js piece of code
const getName = ({ name }) => name;
getName({ name: "Gabriel" }); // "Gabriel"

/**
 * Let's implement a type-level version of the `safeHead`
 * function!
 * 
 * It should take a tuple, a default type, and return the
 * default if the tuple is empty, otherwise return the first 
 * type in this tuple.
 */
namespace tupleHead {
    type SafeHead<Tuple extends any[], Default> =
        Tuple extends [infer First, ...any[]]
        ? First
        : Default;

    type res1 = SafeHead<[1, 2] 0 >;
    type test1 = Expect<Equal<res1, 1>>;

    type res2 = SafeHead<[], false>;
    type test2 = Expect<Equal<res2, false>>;
}
// solution 2
namespace tupleHead2 {
    type SafeHead<Tuple extends any[], Default> =
        Tuple extends []
        ? Default
        : Tuple[0]

    type res1 = SafeHead<[1, 2], 0>;
    type test1 = Expect<Equal<res1, 1>>;

    type res2 = SafeHead<[], false>;
    type test2 = Expect<Equal<res2, false>>;
}
// solution 3
namespace tupleHead3 {
    type SafeHead<Tuple extends any[], Default> =
        Tuple[0] extends undefined
        ? Default
        : Tuple[0]

    type res1 = SafeHead<[1, 2], 0>;
    type test1 = Expect<Equal<res1, 1>>;

    type res2 = SafeHead<[], false>;
    type test2 = Expect<Equal<res2, false>>;
}

/**
 * Implement a generic that drops the first
 * element of a tuple and returns all other
 * elements.
 */
namespace dropFirst {
    type DropFirst<Tuple extends any[]> = Tuple extends [any, ...Rest]
    ? Rest
    : []

    type res1 = DropFirst<[1, 2, 3]>;
    type test1 = Expect<Equal<res1, [2, 3]>>;

    type res2 = DropFirst<[1]>;
    type test2 = Expect<Equal<res2, []>>;

    type res3 = DropFirst<[]>;
    type test3 =  Expect<Equal<res3, []>>;
};