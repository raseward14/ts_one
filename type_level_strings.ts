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

/**
 * Type the HTTPHeaders object so that it has an `Authentication`
 * property that starts with `Bearer ` and ends with a JWT token.
 *
 * Note: JWT tokens contain 3 parts, separated by dots.
 * More info on https://jwt.io
 * 
 * Hint: You shouldn't need a conditional type.
 */
namespace headers {
    type HTTPHeaders = {
        Authentication: `Bearer ${string}.${string}.${string}`
    }

    const test1: HTTPHeaders = {
        // this is the correct authentication header
        Authentication:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtIjoiWW91J3JlIGEgbmVyZCA7KSJ9.gfB7ECp1ePeIB4Mh_3Ypci4y7jFjMH9w_BB4rZcMvQM"
    }
}

/**
 * Type the `isMetricsQuery` function to only take
 * valid metric queries, which look like this:
 * `some.metric.name{filters} by {groups}`
 */
namespace isMetricsQuery {
    declare function isMetricsQuery(
        query: `${string}.${string}{${string}} by {${string}}`
    ): true;

    // ✅
  isMetricsQuery(`react.mount{component:univiz} by {viz}`);
  
  // ✅
  isMetricsQuery(`http.request{view} by {endpoint}`);

  // @ts-expect-error: ❌
  isMetricsQuery('this is definitely not a metrics query.');

  // @ts-expect-error: ❌
  isMetricsQuery('oops.no.filters by {🙀}');
}