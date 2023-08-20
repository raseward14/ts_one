// 3. TYPE-LEVEL STRINGS
// in javascript, we use template literals all the time to concatenate strings
const firstName = "Albert";
const lastName = "Einstein";

const name = `${firstName} ${lastName}`; // <- template literal
// => Albert Einstein

// this is unique to typescripts type system
// Template Literal Types!
// string interpolation
type firstName = "Albert";
type lastName = "Einstein";

type name = `${firstName} ${lastName}`;

// allow us to build fully-typed, string-based Domain-Specific-Languages (DSLs)
// for example: inferring the type of a DOM element based on CSS selector
const p = smartQuerySelector('p:First-Child')
//    ^? `HTMLParagraphElement | null` instead of `HTMLElement | null` 🎊

// example2: safely accessing a deeply nested object property using an "object path" string:
declare const obj: { some: { nested?: { property: number }[] } };

const n = get(obj, "some.nested[0].property");
//    ^? `number | undefined` instead of `unknown` 🎉

/**
 * Type the `getFullName` function to take
 * a first name and a last name as string literal
 * and concatenate them.
 */
namespace GetFullName {
    declare function getFullName<
        FirstName extends string,
        LastName extends string
    >(firstName: FirstName, lastName: LastName): `${FirstName} ${LastName}`

    const res1 = getFullName('Ada', 'Lovelace');
    type test1 = Expect<Equal<typeof res1, "Ada Lovelace">>;

    const res2 = getFullName('Haskell', 'Curry');
    type test2 = Expect<Equal<typeof res2, "Haskell Curry">>;
}

/**
 * Type the `getFullName` function to take
 * a first name and a last name as string literal
 * and concatenate them.
 */
namespace getFullName {
    declare function getFullName<
        A extends string, 
        B extends string
        >(firstName: A, lastName: B): `${A} ${B}`

    const res1 = getFullName('Richard', 'Seward');
    type test1 = Expect<Equal<res1, 'Richard Seard'>>;

    const res2 = getFullName('Sreytouch', 'Keang');
    type test2 = <Expect<Equal<re2, 'Sreytouch Keang'>>
};