// 5. LOOPS
// Type-Level Typescript being a functional language, it doesn't have a for or a while statement

// instead we use recursion
type DoRepetitiveTask<SomeInput> = Condition<SomeInput> extends true;
// --------------------------------- 👆Should we keep looping?
// 👇    recursion!
? DoRepetitiveTask<Transform<SomeInput>>
// update the input for the next iteration
: Otherwise<SomeInput>
// compute the final return type

// no new syntax - conditional type is all we need to stop recursion from looping indefinitely
namespace reverse {
    type Reverse<Tuple> = 
    Tuple extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];

    type res1 = Reverse<[1, 2, 3]>;
    type test1 = Expect<Equal<res1, [3, 2, 1]>>;

    type res2 = Reverse<[]>;
    type test2 = Expect<Equal<res2, []>>;

    type res3 = Reverse<["😃", "🙂", "😐", "😢", "😭"]>;
    type test3 = Expect<Equal<res3, ["😭", "😢", "😐", "🙂", "😃"]>>;
}

/**
 * Define a `Split`  generic that behaves just
 * like the value-level `.split(separator)` string method,
 * and splits a string into chunks using a separator.
 */
namespace split {
    type Split<Str, Separator extends string> =
    Str extends `${infer First}${Separator}${infer Rest}`
    ? [First, ...Split<Rest, Separator>]
    : [Str];

    type res1 = Split<"a.b.c", ".">;
    type test1 = Expect<Equal<res1, ["a", "b", "c"]>>;

    type res2 = Split<"frontend summit !", " ">;
    type test2 = Expect<Equal<res2, ["frontend", "summit", "!"]>>;

    type res3 = Split<"env,service", ",">;
    type test3 = Expect<Equal<res3, ["env", "service"]>>;
}