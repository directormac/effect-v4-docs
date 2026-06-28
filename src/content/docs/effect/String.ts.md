---
title: String.ts
nav_order: 113
parent: "effect"
---

## String.ts overview

Works with TypeScript `string` values.

This module exposes common string operations in a pipe-friendly style. The
helpers cover checks, comparison, concatenation, trimming, casing, slicing,
padding, replacement, normalization, safe character access, search helpers
that return `Option`, and joining strings through a reducer.

Since v2.0.0

---

## Exports Grouped by Category

- [combining](#combining)
  - [ReducerConcat](#reducerconcat)
  - [concat](#concat)
- [comparing](#comparing)
  - [localeCompare](#localecompare)
- [constants](#constants)
  - [empty](#empty)
- [constructors](#constructors)
  - [String](#string)
- [elements](#elements)
  - [at](#at)
  - [charAt](#charat)
  - [charCodeAt](#charcodeat)
  - [codePointAt](#codepointat)
- [getters](#getters)
  - [length](#length)
- [guards](#guards)
  - [isNonEmpty](#isnonempty)
  - [isString](#isstring)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [Order](#order)
- [models](#models)
  - [Concat (type alias)](#concat-type-alias)
  - [Trim (type alias)](#trim-type-alias)
  - [TrimEnd (type alias)](#trimend-type-alias)
  - [TrimStart (type alias)](#trimstart-type-alias)
- [predicates](#predicates)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [isEmpty](#isempty)
  - [startsWith](#startswith)
- [searching](#searching)
  - [indexOf](#indexof)
  - [lastIndexOf](#lastindexof)
  - [match](#match)
  - [matchAll](#matchall)
  - [search](#search)
- [splitting](#splitting)
  - [linesIterator](#linesiterator)
  - [linesWithSeparators](#lineswithseparators)
- [transforming](#transforming)
  - [camelCase](#camelcase)
  - [camelToSnake](#cameltosnake)
  - [capitalize](#capitalize)
  - [configCase](#configcase)
  - [constantCase](#constantcase)
  - [kebabCase](#kebabcase)
  - [kebabToSnake](#kebabtosnake)
  - [noCase](#nocase)
  - [normalize](#normalize)
  - [padEnd](#padend)
  - [padStart](#padstart)
  - [pascalCase](#pascalcase)
  - [pascalToSnake](#pascaltosnake)
  - [repeat](#repeat)
  - [replace](#replace)
  - [replaceAll](#replaceall)
  - [slice](#slice)
  - [snakeCase](#snakecase)
  - [snakeToCamel](#snaketocamel)
  - [snakeToKebab](#snaketokebab)
  - [snakeToPascal](#snaketopascal)
  - [split](#split)
  - [stripMargin](#stripmargin)
  - [stripMarginWith](#stripmarginwith)
  - [substring](#substring)
  - [takeLeft](#takeleft)
  - [takeRight](#takeright)
  - [toLocaleLowerCase](#tolocalelowercase)
  - [toLocaleUpperCase](#tolocaleuppercase)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [trimEnd](#trimend)
  - [trimStart](#trimstart)
  - [uncapitalize](#uncapitalize)

---

# combining

## ReducerConcat

Reducer for concatenating `string`s.

**When to use**

Use to concatenate many strings through APIs that consume a `Reducer`.

**Details**

The reducer starts from `""`, so combining an empty collection returns `""`.

**See**

- `concat` for concatenating two strings directly

**Signature**

```ts
declare const ReducerConcat: Reducer.Reducer<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1461)

Since v4.0.0

## concat

Concatenates two strings at runtime.

**Example** (Concatenating strings)

```ts
import { pipe, String } from "effect"

const result1 = String.concat("hello", "world")
console.log(result1) // "helloworld"

const result2 = pipe("hello", String.concat("world"))
console.log(result2) // "helloworld"
```

**Signature**

```ts
declare const concat: {
  <B extends string>(that: B): <A extends string>(self: A) => Concat<A, B>
  <A extends string, B extends string>(self: A, that: B): Concat<A, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L154)

Since v2.0.0

# comparing

## localeCompare

Computes locale-aware ordering for two strings, with optional locales and
collator options, and returns the result as an `Ordering` (`-1`, `0`, or
`1`).

**Example** (Comparing strings by locale)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("a", String.localeCompare("b")), -1)
assert.deepStrictEqual(pipe("b", String.localeCompare("a")), 1)
assert.deepStrictEqual(pipe("a", String.localeCompare("a")), 0)
```

**Signature**

```ts
declare const localeCompare: (
  that: string,
  locales?: Array<string>,
  options?: Intl.CollatorOptions
) => (self: string) => Ordering.Ordering
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L681)

Since v2.0.0

# constants

## empty

Provides the empty string `""`.

**When to use**

Use when you need the canonical empty string value from the `String` module.

**Example** (Referencing the empty string)

```ts
import { String } from "effect"

console.log(String.empty) // ""
console.log(String.isEmpty(String.empty)) // true
```

**Signature**

```ts
declare const empty: ""
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L117)

Since v2.0.0

# constructors

## String

Exposes the global string constructor.

**When to use**

Use to access native JavaScript string coercion or constructor behavior from
the Effect module namespace.

**Gotchas**

Calling `String(value)` returns a primitive string. Calling
`new String(value)` creates a boxed `String` object.

**See**

- `isString` for checking whether a value is a primitive string

**Signature**

```ts
declare const String: StringConstructor
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L42)

Since v4.0.0

# elements

## at

Returns the character at the specified relative index safely, or `None` if the index is out of bounds.

**Example** (Accessing characters safely)

```ts
import { pipe, String } from "effect"

pipe("abc", String.at(1)) // Option.some("b")
pipe("abc", String.at(4)) // Option.none()
```

**Signature**

```ts
declare const at: {
  (index: number): (self: string) => Option.Option<string>
  (self: string, index: number): Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L578)

Since v2.0.0

## charAt

Returns the character at the specified non-negative index safely, or `None` if the index is out of bounds.

**Example** (Reading characters safely)

```ts
import { pipe, String } from "effect"

pipe("abc", String.charAt(1)) // Option.some("b")
pipe("abc", String.charAt(4)) // Option.none()
```

**Signature**

```ts
declare const charAt: {
  (index: number): (self: string) => Option.Option<string>
  (self: string, index: number): Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L598)

Since v2.0.0

## charCodeAt

Returns the character code at the specified index safely, or `None` if the index is out of bounds.

**Example** (Reading character codes)

```ts
import { String } from "effect"

String.charCodeAt("abc", 1) // Option.some(98)
String.charCodeAt("abc", 4) // Option.none()
```

**Signature**

```ts
declare const charCodeAt: {
  (index: number): (self: string) => Option.Option<number>
  (self: string, index: number): Option.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L537)

Since v2.0.0

## codePointAt

Returns the Unicode code point at the specified index safely, or `None` if the index is out of bounds.

**Example** (Reading code points)

```ts
import { pipe, String } from "effect"

pipe("abc", String.codePointAt(1)) // Option.some(98)
pipe("abc", String.codePointAt(10)) // Option.none()
```

**Signature**

```ts
declare const codePointAt: {
  (index: number): (self: string) => Option.Option<number>
  (self: string, index: number): Option.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L621)

Since v2.0.0

# getters

## length

Returns the JavaScript string length, measured in UTF-16 code units.

**Example** (Getting string length)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.length("abc"), 3)
```

**Signature**

```ts
declare const length: (self: string) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L437)

Since v2.0.0

# guards

## isNonEmpty

Checks whether a `string` is non-empty.

**Example** (Checking for non-empty strings)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.isNonEmpty(""), false)
assert.deepStrictEqual(String.isNonEmpty("a"), true)
```

**Signature**

```ts
declare const isNonEmpty: (self: string) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L420)

Since v2.0.0

## isString

Checks whether a value is a `string`.

**Example** (Checking for strings)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.isString("a"), true)
assert.deepStrictEqual(String.isString(1), false)
```

**Signature**

```ts
declare const isString: Refinement<unknown, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L60)

Since v2.0.0

# instances

## Equivalence

Provides an `Equivalence` instance for strings using strict equality (`===`).

**Example** (Comparing strings for equality)

```ts
import { String } from "effect"

console.log(String.Equivalence("hello", "hello")) // true
console.log(String.Equivalence("hello", "world")) // false
```

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L96)

Since v2.0.0

## Order

Provides an `Order` instance for comparing strings using lexicographic
ordering.

**Example** (Comparing strings lexicographically)

```ts
import { String } from "effect"

console.log(String.Order("apple", "banana")) // -1
console.log(String.Order("banana", "apple")) // 1
console.log(String.Order("apple", "apple")) // 0
```

**Signature**

```ts
declare const Order: order.Order<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L79)

Since v2.0.0

# models

## Concat (type alias)

Concatenates two strings at the type level.

**Example** (Concatenating string literal types)

```ts
import type { String } from "effect"

// Type-level concatenation
type Result = String.Concat<"hello", "world"> // "helloworld"
```

**Signature**

```ts
type`${A}${B}` = `${A}${B}`
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L134)

Since v2.0.0

## Trim (type alias)

Type-level representation of trimming whitespace from both ends of a string.

**Example** (Trimming whitespace at the type level)

```ts
import type { String } from "effect"

type Result = String.Trim<"  hello  "> // "hello"
```

**Signature**

```ts
type Trim<A> = TrimEnd<TrimStart<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L280)

Since v2.0.0

## TrimEnd (type alias)

Type-level representation of trimming whitespace from the end of a string.

**Example** (Trimming trailing whitespace at the type level)

```ts
import type { String } from "effect"

type Result = String.TrimEnd<"hello  "> // "hello"
```

**Signature**

```ts
type TrimEnd<A> = A extends `${infer B}${" " | "\n" | "\t" | "\r"}` ? TrimEnd<B> : A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L348)

Since v2.0.0

## TrimStart (type alias)

Type-level representation of trimming whitespace from the start of a string.

**Example** (Trimming leading whitespace at the type level)

```ts
import type { String } from "effect"

type Result = String.TrimStart<"  hello"> // "hello"
```

**Signature**

```ts
type TrimStart<A> = A extends `${" " | "\n" | "\t" | "\r"}${infer B}` ? TrimStart<B> : A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L314)

Since v2.0.0

# predicates

## endsWith

Returns `true` if the string ends with the specified search string.

**Example** (Checking string suffixes)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("hello world", String.endsWith("world")), true)
assert.deepStrictEqual(pipe("hello world", String.endsWith("hello")), false)
```

**Signature**

```ts
declare const endsWith: (searchString: string, position?: number) => (self: string) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L519)

Since v2.0.0

## includes

Returns `true` if `searchString` appears as a substring of `self`, at one or more positions that are
greater than or equal to `position`; otherwise, returns `false`.

**Example** (Checking for substrings)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("hello world", String.includes("world")), true)
assert.deepStrictEqual(pipe("hello world", String.includes("foo")), false)
```

**Signature**

```ts
declare const includes: (searchString: string, position?: number) => (self: string) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L481)

Since v2.0.0

## isEmpty

Checks whether a `string` is empty.

**Example** (Checking for empty strings)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.isEmpty(""), true)
assert.deepStrictEqual(String.isEmpty("a"), false)
```

**Signature**

```ts
declare const isEmpty: (self: string) => self is ""
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L402)

Since v2.0.0

## startsWith

Returns `true` if the string starts with the specified search string.

**Example** (Checking string prefixes)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("hello world", String.startsWith("hello")), true)
assert.deepStrictEqual(pipe("hello world", String.startsWith("world")), false)
```

**Signature**

```ts
declare const startsWith: (searchString: string, position?: number) => (self: string) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L500)

Since v2.0.0

# searching

## indexOf

Returns the index of the first occurrence of a substring safely, or `None` if not found.

**Example** (Finding the first substring index)

```ts
import { pipe, String } from "effect"

pipe("abbbc", String.indexOf("b")) // Option.some(1)
pipe("abbbc", String.indexOf("z")) // Option.none()
```

**Signature**

```ts
declare const indexOf: (searchString: string) => (self: string) => Option.Option<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L641)

Since v2.0.0

## lastIndexOf

Returns the index of the last occurrence of a substring safely, or `None` if not found.

**Example** (Finding the last substring index)

```ts
import { pipe, String } from "effect"

pipe("abbbc", String.lastIndexOf("b")) // Option.some(3)
pipe("abbbc", String.lastIndexOf("d")) // Option.none()
```

**Signature**

```ts
declare const lastIndexOf: (searchString: string) => (self: string) => Option.Option<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L659)

Since v2.0.0

## match

Matches a string against a pattern safely and returns `Option.some` with the match
array, or `Option.none` when the pattern does not match.

**Example** (Matching regular expressions)

```ts
import { Option, pipe, String } from "effect"

const match = pipe("hello", String.match(/l+/))

if (Option.isSome(match)) {
  console.log(`${match.value[0]}@${match.value.index}`) // "ll@2"
}

console.log(Option.isNone(pipe("hello", String.match(/x/)))) // true
```

**Signature**

```ts
declare const match: (regExp: RegExp | string) => (self: string) => Option.Option<RegExpMatchArray>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L706)

Since v2.0.0

## matchAll

Returns an iterator over all regular expression matches in the string using
native `String.prototype.matchAll` semantics.

**Example** (Iterating regular expression matches)

```ts
import { pipe, String } from "effect"

const matches = pipe("hello world", String.matchAll(/l/g))
console.log(Array.from(matches, (match) => `${match[0]}@${match.index}`).join(", ")) // "l@2, l@3, l@9"
```

**Signature**

```ts
declare const matchAll: (regExp: RegExp) => (self: string) => IterableIterator<RegExpMatchArray>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L727)

Since v2.0.0

## search

Returns the index of the first match for a string or regular expression safely, or
`Option.none` when no match is found.

**Example** (Searching strings)

```ts
import { String } from "effect"

String.search("ababb", "b") // Option.some(1)
String.search("ababb", /abb/) // Option.some(2)
String.search("ababb", "d") // Option.none()
```

**Signature**

```ts
declare const search: {
  (regExp: RegExp | string): (self: string) => Option.Option<number>
  (self: string, regExp: RegExp | string): Option.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L846)

Since v2.0.0

# splitting

## linesIterator

Returns an `IterableIterator` which yields each line contained within the
string, trimming off the trailing newline character.

**Example** (Iterating lines without separators)

```ts
import { String } from "effect"

const lines = String.linesIterator("hello\nworld\n")
console.log(Array.from(lines)) // ["hello", "world"]
```

**Signature**

```ts
declare const linesIterator: (self: string) => LinesIterator
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L973)

Since v2.0.0

## linesWithSeparators

Returns an `IterableIterator` which yields each line contained within the
string as well as the trailing newline character.

**Example** (Iterating lines with separators)

```ts
import { String } from "effect"

const lines = String.linesWithSeparators("hello\nworld\n")
console.log(Array.from(lines)) // ["hello\n", "world\n"]
```

**Signature**

```ts
declare const linesWithSeparators: (s: string) => LinesIterator
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L991)

Since v2.0.0

# transforming

## camelCase

Converts a string to camelCase.

**When to use**

Use to normalize mixed word separators or existing PascalCase/camelCase text
into lower-initial camelCase identifiers.

**See**

- `noCase` for configurable delimiters and part transforms
- `pascalCase` for upper-initial PascalCase output
- `snakeCase` for lowercase underscore-separated output
- `kebabCase` for lowercase hyphen-separated output
- `constantCase` for uppercase underscore-separated output

**Signature**

```ts
declare const camelCase: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1356)

Since v4.0.0

## camelToSnake

Converts a camelCase string to snake_case.

**Example** (Converting camelCase to snake_case)

```ts
import { String } from "effect"

console.log(String.camelToSnake("helloWorld")) // "hello_world"
console.log(String.camelToSnake("fooBarBaz")) // "foo_bar_baz"
```

**Signature**

```ts
declare const camelToSnake: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1129)

Since v2.0.0

## capitalize

Capitalizes the first character of a string.

**Example** (Capitalizing a string)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("abc", String.capitalize), "Abc")
assert.deepStrictEqual(String.capitalize("hello"), "Hello")
```

**Signature**

```ts
declare const capitalize: <T extends string>(self: T) => Capitalize<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L211)

Since v2.0.0

## configCase

Converts a string to CONFIG_CASE (uppercase with underscores) for
configuration keys.

**When to use**

Use to normalize configuration path segments into environment-variable-like
keys while preserving numeric word groups such as `v2`.

**Details**

Unlike `constantCase`, digit-letter boundaries are not split. For
example, `"api-v2 xml"` becomes `"API_V2_XML"`.

**See**

- `constantCase` for standard uppercase underscore-separated output

**Signature**

```ts
declare const configCase: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1402)

Since v4.0.0

## constantCase

Converts a string to CONSTANT_CASE (uppercase with underscores).

**When to use**

Use to normalize words from mixed input formats into uppercase,
underscore-separated identifiers.

**See**

- `snakeCase` for lowercase underscore-separated output
- `kebabCase` for lowercase hyphen-separated output
- `camelCase` for lower-initial camelCase output
- `pascalCase` for upper-initial PascalCase output
- `configCase` for configuration key casing that preserves numeric word groups
- `noCase` for configurable delimiters and part transforms

**Signature**

```ts
declare const constantCase: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1379)

Since v4.0.0

## kebabCase

Converts a string to kebab-case (lowercase with hyphens).

**When to use**

Use to normalize free-form labels, identifiers, or keys into lowercase
hyphen-separated text.

**See**

- `noCase` for configurable delimiters and part transforms
- `snakeCase` for lowercase underscore-separated output
- `constantCase` for uppercase underscore-separated output
- `camelCase` for lower-initial camelCase output
- `pascalCase` for upper-initial PascalCase output

**Signature**

```ts
declare const kebabCase: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1422)

Since v4.0.0

## kebabToSnake

Converts a kebab-case string to snake_case.

**Example** (Converting kebab-case to snake_case)

```ts
import { String } from "effect"

console.log(String.kebabToSnake("hello-world")) // "hello_world"
console.log(String.kebabToSnake("foo-bar-baz")) // "foo_bar_baz"
```

**Signature**

```ts
declare const kebabToSnake: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1164)

Since v2.0.0

## noCase

Normalizes a string by splitting it into word parts, transforming each part,
and joining the parts with a configurable delimiter.

**When to use**

Use when you need custom word-case output with a delimiter or part transform
that the fixed case helpers do not provide.

**See**

- `pascalCase` for fixed PascalCase output
- `camelCase` for fixed lower-initial camelCase output
- `constantCase` for fixed uppercase underscore-separated output
- `kebabCase` for fixed lowercase hyphen-separated output
- `snakeCase` for fixed lowercase underscore-separated output

**Signature**

```ts
declare const noCase: {
  (options?: {
    readonly splitRegExp?: RegExp | ReadonlyArray<RegExp> | undefined
    readonly stripRegExp?: RegExp | ReadonlyArray<RegExp> | undefined
    readonly delimiter?: string | undefined
    readonly transform?: (part: string, index: number, parts: ReadonlyArray<string>) => string
  }): (self: string) => string
  (
    self: string,
    options?: {
      readonly splitRegExp?: RegExp | ReadonlyArray<RegExp> | undefined
      readonly stripRegExp?: RegExp | ReadonlyArray<RegExp> | undefined
      readonly delimiter?: string | undefined
      readonly transform?: (part: string, index: number, parts: ReadonlyArray<string>) => string
    }
  ): string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1248)

Since v4.0.0

## normalize

Normalizes a string according to the specified Unicode normalization form.

**Example** (Normalizing Unicode strings)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

const str = "\u1E9B\u0323"
assert.deepStrictEqual(pipe(str, String.normalize()), "\u1E9B\u0323")
assert.deepStrictEqual(pipe(str, String.normalize("NFC")), "\u1E9B\u0323")
assert.deepStrictEqual(pipe(str, String.normalize("NFD")), "\u017F\u0323\u0307")
assert.deepStrictEqual(pipe(str, String.normalize("NFKC")), "\u1E69")
assert.deepStrictEqual(pipe(str, String.normalize("NFKD")), "\u0073\u0323\u0307")
```

**Signature**

```ts
declare const normalize: (form?: "NFC" | "NFD" | "NFKC" | "NFKD") => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L752)

Since v2.0.0

## padEnd

Pads the string from the end with a given fill string to a specified length.

**Example** (Padding strings at the end)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("a", String.padEnd(5)), "a    ")
assert.deepStrictEqual(pipe("a", String.padEnd(5, "_")), "a____")
```

**Signature**

```ts
declare const padEnd: (maxLength: number, fillString?: string) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L770)

Since v2.0.0

## padStart

Pads the string from the start with a given fill string to a specified length.

**Example** (Padding strings at the start)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("a", String.padStart(5)), "    a")
assert.deepStrictEqual(pipe("a", String.padStart(5, "_")), "____a")
```

**Signature**

```ts
declare const padStart: (maxLength: number, fillString?: string) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L789)

Since v2.0.0

## pascalCase

Converts a string to PascalCase.

**When to use**

Use to normalize strings from spaces, separators, or camel/Pascal word
boundaries into PascalCase.

**See**

- `camelCase` for lower-initial camelCase output
- `noCase` for configurable delimiters and part transforms
- `snakeToPascal` for converting known snake_case input only

**Signature**

```ts
declare const pascalCase: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1329)

Since v4.0.0

## pascalToSnake

Converts a PascalCase string to snake_case.

**Example** (Converting PascalCase to snake_case)

```ts
import { String } from "effect"

console.log(String.pascalToSnake("HelloWorld")) // "hello_world"
console.log(String.pascalToSnake("FooBarBaz")) // "foo_bar_baz"
```

**Signature**

```ts
declare const pascalToSnake: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1146)

Since v2.0.0

## repeat

Repeats the string the specified number of times.

**Example** (Repeating strings)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("a", String.repeat(5)), "aaaaa")
assert.deepStrictEqual(pipe("hello", String.repeat(3)), "hellohellohello")
```

**Signature**

```ts
declare const repeat: (count: number) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L808)

Since v2.0.0

## replace

Replaces matches in a string using `String.prototype.replace`.

**Details**

String search values and non-global regular expressions replace the first
match; global regular expressions replace every match.

**Example** (Replacing a substring)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("abc", String.replace("b", "d")), "adc")
assert.deepStrictEqual(pipe("hello world", String.replace("world", "Effect")), "hello Effect")
```

**Signature**

```ts
declare const replace: (searchValue: string | RegExp, replaceValue: string) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L263)

Since v2.0.0

## replaceAll

Replaces all occurrences of a substring or pattern in a string.

**Example** (Replacing all matches)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("ababb", String.replaceAll("b", "c")), "acacc")
assert.deepStrictEqual(pipe("ababb", String.replaceAll(/ba/g, "cc")), "accbb")
```

**Signature**

```ts
declare const replaceAll: (searchValue: string | RegExp, replaceValue: string) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L826)

Since v2.0.0

## slice

Extracts a section of a string and returns it as a new string.

**Example** (Slicing strings)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("abcd", String.slice(1, 3)), "bc")
assert.deepStrictEqual(pipe("hello world", String.slice(0, 5)), "hello")
```

**Signature**

```ts
declare const slice: (start?: number, end?: number) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L384)

Since v2.0.0

## snakeCase

Converts a string to snake_case (lowercase with underscores).

**When to use**

Use to normalize mixed-case or separator-delimited text into lowercase words
joined with underscores.

**See**

- `noCase` for configurable lower-level normalization
- `kebabCase` for lowercase hyphen-separated output
- `constantCase` for uppercase underscore-separated output

**Signature**

```ts
declare const snakeCase: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1441)

Since v4.0.0

## snakeToCamel

Converts a snake_case string to camelCase.

**Example** (Converting snake_case to camelCase)

```ts
import { String } from "effect"

console.log(String.snakeToCamel("hello_world")) // "helloWorld"
console.log(String.snakeToCamel("foo_bar_baz")) // "fooBarBaz"
```

**Signature**

```ts
declare const snakeToCamel: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1066)

Since v2.0.0

## snakeToKebab

Converts a snake_case string to kebab-case.

**Example** (Converting snake_case to kebab-case)

```ts
import { String } from "effect"

console.log(String.snakeToKebab("hello_world")) // "hello-world"
console.log(String.snakeToKebab("foo_bar_baz")) // "foo-bar-baz"
```

**Signature**

```ts
declare const snakeToKebab: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1112)

Since v2.0.0

## snakeToPascal

Converts a snake_case string to PascalCase.

**Example** (Converting snake_case to PascalCase)

```ts
import { String } from "effect"

console.log(String.snakeToPascal("hello_world")) // "HelloWorld"
console.log(String.snakeToPascal("foo_bar_baz")) // "FooBarBaz"
```

**Signature**

```ts
declare const snakeToPascal: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1089)

Since v2.0.0

## split

Splits a string into an array of substrings using a separator.

**Example** (Splitting strings)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("abc", String.split("")), ["a", "b", "c"])
assert.deepStrictEqual(pipe("", String.split("")), [""])
assert.deepStrictEqual(String.split("hello,world", ","), ["hello", "world"])
```

**Signature**

```ts
declare const split: {
  (separator: string | RegExp): (self: string) => NonEmptyArray<string>
  (self: string, separator: string | RegExp): NonEmptyArray<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L456)

Since v2.0.0

## stripMargin

Strips a leading `|` margin prefix from every line.

**Example** (Stripping pipe margins)

```ts
import { String } from "effect"

const text = "  |hello\n  |world"
const result = String.stripMargin(text)
console.log(result) // "hello\nworld"
```

**Signature**

```ts
declare const stripMargin: (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1049)

Since v2.0.0

## stripMarginWith

Strips a leading margin prefix from every line using the supplied margin
character.

**Example** (Stripping custom margins)

```ts
import { String } from "effect"

const text = "  |hello\n  |world"
const result = String.stripMarginWith(text, "|")
console.log(result) // "hello\nworld"
```

**Signature**

```ts
declare const stripMarginWith: {
  (marginChar: string): (self: string) => string
  (self: string, marginChar: string): string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L1010)

Since v2.0.0

## substring

Extracts characters from a string between two specified indices.

**Example** (Extracting substrings)

```ts
import { pipe, String } from "effect"

pipe("abcd", String.substring(1)) // "bcd"
pipe("abcd", String.substring(1, 3)) // "bc"
```

**Signature**

```ts
declare const substring: (start: number, end?: number) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L561)

Since v2.0.0

## takeLeft

Keeps the specified number of characters from the start of a string.

**Details**

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

**Example** (Taking characters from the start)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.takeLeft("Hello World", 5), "Hello")
```

**Signature**

```ts
declare const takeLeft: { (n: number): (self: string) => string; (self: string, n: number): string }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L917)

Since v2.0.0

## takeRight

Keeps the specified number of characters from the end of a string.

**Details**

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

**Example** (Taking characters from the end)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.takeRight("Hello World", 5), "World")
```

**Signature**

```ts
declare const takeRight: { (n: number): (self: string) => string; (self: string, n: number): string }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L946)

Since v2.0.0

## toLocaleLowerCase

Converts the string to lowercase according to the specified locale.

**Example** (Lowercasing strings by locale)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

const str = "\u0130"
assert.deepStrictEqual(pipe(str, String.toLocaleLowerCase("tr")), "i")
```

**Signature**

```ts
declare const toLocaleLowerCase: (locale?: string | Array<string>) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L871)

Since v2.0.0

## toLocaleUpperCase

Converts the string to uppercase according to the specified locale.

**Example** (Uppercasing strings by locale)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

const str = "i\u0307"
assert.deepStrictEqual(pipe(str, String.toLocaleUpperCase("lt-LT")), "I")
```

**Signature**

```ts
declare const toLocaleUpperCase: (locale?: string | Array<string>) => (self: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L890)

Since v2.0.0

## toLowerCase

Converts a string to lowercase.

**Example** (Converting strings to lowercase)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("A", String.toLowerCase), "a")
assert.deepStrictEqual(String.toLowerCase("HELLO"), "hello")
```

**Signature**

```ts
declare const toLowerCase: <T extends string>(self: T) => Lowercase<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L193)

Since v2.0.0

## toUpperCase

Converts a string to uppercase.

**Example** (Converting strings to uppercase)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("a", String.toUpperCase), "A")
assert.deepStrictEqual(String.toUpperCase("hello"), "HELLO")
```

**Signature**

```ts
declare const toUpperCase: <S extends string>(self: S) => Uppercase<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L175)

Since v2.0.0

## trim

Removes whitespace from both ends of a string.

**Example** (Trimming whitespace)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.trim(" a "), "a")
assert.deepStrictEqual(String.trim("  hello world  "), "hello world")
```

**Signature**

```ts
declare const trim: <A extends string>(self: A) => Trim<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L298)

Since v2.0.0

## trimEnd

Removes whitespace from the end of a string.

**Example** (Trimming trailing whitespace)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.trimEnd(" a "), " a")
assert.deepStrictEqual(String.trimEnd("hello world  "), "hello world")
```

**Signature**

```ts
declare const trimEnd: <A extends string>(self: A) => TrimEnd<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L366)

Since v2.0.0

## trimStart

Removes whitespace from the start of a string.

**Example** (Trimming leading whitespace)

```ts
import { String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(String.trimStart(" a "), "a ")
assert.deepStrictEqual(String.trimStart("  hello world"), "hello world")
```

**Signature**

```ts
declare const trimStart: <A extends string>(self: A) => TrimStart<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L332)

Since v2.0.0

## uncapitalize

Uncapitalizes the first character of a string.

**Example** (Uncapitalizing a string)

```ts
import { pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe("ABC", String.uncapitalize), "aBC")
assert.deepStrictEqual(String.uncapitalize("Hello"), "hello")
```

**Signature**

```ts
declare const uncapitalize: <T extends string>(self: T) => Uncapitalize<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/String.ts#L233)

Since v2.0.0
