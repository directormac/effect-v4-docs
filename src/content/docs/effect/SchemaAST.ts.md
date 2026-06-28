---
title: SchemaAST.ts
nav_order: 99
parent: "effect"
---

## SchemaAST.ts overview

Represents Effect schemas as runtime trees.

Every `Schema` has an AST made from nodes for declarations, primitives,
literals, arrays, objects, unions, suspended schemas, checks, annotations,
encoding links, and parsing context. Most users work with the higher-level
`Schema` module. Use `SchemaAST` when you need to inspect schema nodes, build
ASTs programmatically, change encoded or decoded views, collect issues, or
run low-level schema checks.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [resolve](#resolve)
  - [resolveAt](#resolveat)
  - [resolveDescription](#resolvedescription)
  - [resolveIdentifier](#resolveidentifier)
  - [resolveTitle](#resolvetitle)
- [constants](#constants)
  - [null](#null)
  - [undefined](#undefined)
- [constructors](#constructors)
  - [any](#any)
  - [bigInt](#bigint)
  - [boolean](#boolean)
  - [isPattern](#ispattern)
  - [never](#never)
  - [number](#number)
  - [objectKeyword](#objectkeyword)
  - [string](#string)
  - [symbol](#symbol)
  - [unknown](#unknown)
  - [void](#void)
- [guards](#guards)
  - [isAST](#isast)
  - [isAny](#isany)
  - [isArrays](#isarrays)
  - [isBigInt](#isbigint)
  - [isBoolean](#isboolean)
  - [isDeclaration](#isdeclaration)
  - [isEnum](#isenum)
  - [isLiteral](#isliteral)
  - [isNever](#isnever)
  - [isNull](#isnull)
  - [isNumber](#isnumber)
  - [isObjectKeyword](#isobjectkeyword)
  - [isObjects](#isobjects)
  - [isString](#isstring)
  - [isSuspend](#issuspend)
  - [isSymbol](#issymbol)
  - [isTemplateLiteral](#istemplateliteral)
  - [isUndefined](#isundefined)
  - [isUnion](#isunion)
  - [isUniqueSymbol](#isuniquesymbol)
  - [isUnknown](#isunknown)
  - [isVoid](#isvoid)
- [models](#models)
  - [AST (type alias)](#ast-type-alias)
  - [Any (class)](#any-class)
    - [\_tag (property)](#_tag-property)
  - [Arrays (class)](#arrays-class)
    - [\_rebuild (method)](#_rebuild-method)
    - [\_tag (property)](#_tag-property-1)
    - [isMutable (property)](#ismutable-property)
    - [elements (property)](#elements-property)
    - [rest (property)](#rest-property)
    - [encodingChecks (property)](#encodingchecks-property)
  - [Base (class)](#base-class)
    - [toString (method)](#tostring-method)
    - [[TypeId] (property)](#typeid-property)
    - [\_tag (property)](#_tag-property-2)
    - [annotations (property)](#annotations-property)
    - [checks (property)](#checks-property)
    - [encoding (property)](#encoding-property)
    - [context (property)](#context-property)
  - [BigInt (class)](#bigint-class)
    - [\_tag (property)](#_tag-property-3)
  - [Boolean (class)](#boolean-class)
    - [\_tag (property)](#_tag-property-4)
  - [Check (type alias)](#check-type-alias)
  - [Checks (type alias)](#checks-type-alias)
  - [Context (class)](#context-class)
    - [isOptional (property)](#isoptional-property)
    - [isMutable (property)](#ismutable-property-1)
    - [defaultValue (property)](#defaultvalue-property)
    - [annotations (property)](#annotations-property-1)
  - [Declaration (class)](#declaration-class)
    - [\_rebuild (method)](#_rebuild-method-1)
    - [\_tag (property)](#_tag-property-5)
    - [typeParameters (property)](#typeparameters-property)
    - [run (property)](#run-property)
    - [encodingChecks (property)](#encodingchecks-property-1)
  - [Encoding (type alias)](#encoding-type-alias)
  - [Enum (class)](#enum-class)
    - [\_tag (property)](#_tag-property-6)
    - [enums (property)](#enums-property)
  - [Filter (class)](#filter-class)
    - [annotate (method)](#annotate-method)
    - [abort (method)](#abort-method)
    - [and (method)](#and-method)
    - [\_tag (property)](#_tag-property-7)
    - [run (property)](#run-property-1)
    - [annotations (property)](#annotations-property-2)
    - [aborted (property)](#aborted-property)
  - [FilterGroup (class)](#filtergroup-class)
    - [annotate (method)](#annotate-method-1)
    - [and (method)](#and-method-1)
    - [\_tag (property)](#_tag-property-8)
    - [checks (property)](#checks-property-1)
    - [annotations (property)](#annotations-property-3)
  - [IndexSignature (class)](#indexsignature-class)
    - [parameter (property)](#parameter-property)
    - [type (property)](#type-property)
    - [merge (property)](#merge-property)
  - [KeyValueCombiner (class)](#keyvaluecombiner-class)
    - [decode (property)](#decode-property)
    - [encode (property)](#encode-property)
  - [Link (class)](#link-class)
    - [to (property)](#to-property)
    - [transformation (property)](#transformation-property)
  - [Literal (class)](#literal-class)
    - [\_tag (property)](#_tag-property-9)
    - [literal (property)](#literal-property)
  - [LiteralValue (type alias)](#literalvalue-type-alias)
  - [Never (class)](#never-class)
    - [\_tag (property)](#_tag-property-10)
  - [Null (class)](#null-class)
    - [\_tag (property)](#_tag-property-11)
  - [Number (class)](#number-class)
    - [\_match (method)](#_match-method)
    - [\_tag (property)](#_tag-property-12)
  - [ObjectKeyword (class)](#objectkeyword-class)
    - [\_tag (property)](#_tag-property-13)
  - [Objects (class)](#objects-class)
    - [\_rebuild (method)](#_rebuild-method-2)
    - [\_tag (property)](#_tag-property-14)
    - [propertySignatures (property)](#propertysignatures-property)
    - [indexSignatures (property)](#indexsignatures-property)
    - [encodingChecks (property)](#encodingchecks-property-2)
  - [PropertySignature (class)](#propertysignature-class)
    - [name (property)](#name-property)
    - [type (property)](#type-property-1)
  - [String (class)](#string-class)
    - [\_tag (property)](#_tag-property-15)
  - [Suspend (class)](#suspend-class)
    - [\_tag (property)](#_tag-property-16)
    - [thunk (property)](#thunk-property)
  - [Symbol (class)](#symbol-class)
    - [\_tag (property)](#_tag-property-17)
  - [TemplateLiteral (class)](#templateliteral-class)
    - [\_tag (property)](#_tag-property-18)
    - [parts (property)](#parts-property)
  - [Undefined (class)](#undefined-class)
    - [\_tag (property)](#_tag-property-19)
  - [Union (class)](#union-class)
    - [\_rebuild (method)](#_rebuild-method-3)
    - [\_tag (property)](#_tag-property-20)
    - [types (property)](#types-property)
    - [mode (property)](#mode-property)
    - [encodingChecks (property)](#encodingchecks-property-3)
  - [UniqueSymbol (class)](#uniquesymbol-class)
    - [\_tag (property)](#_tag-property-21)
    - [symbol (property)](#symbol-property)
  - [Unknown (class)](#unknown-class)
    - [\_tag (property)](#_tag-property-22)
  - [Void (class)](#void-class)
    - [\_tag (property)](#_tag-property-23)
- [options](#options)
  - [ParseOptions (interface)](#parseoptions-interface)
- [predicates](#predicates)
  - [isOptional](#isoptional)
- [transforming](#transforming)
  - [decodeTo](#decodeto)
  - [flip](#flip)
  - [optionalKey](#optionalkey)
  - [toEncoded](#toencoded)
  - [toType](#totype)

---

# annotations

## resolve

Returns all annotations from the AST node.

**Details**

If the node has `Checks`, returns annotations from the last check
(which is where user-supplied annotations end up after `.pipe(Schema.annotations(...))`).
Otherwise returns `Base.annotations` directly.

**Example** (Reading annotations)

```ts
import { Schema, SchemaAST } from "effect"

const schema = Schema.String.annotate({ title: "Name" })
const annotations = SchemaAST.resolve(schema.ast)
console.log(annotations?.title) // "Name"
```

**See**

- `resolveAt`
- `resolveIdentifier`
- `resolveTitle`
- `resolveDescription`

**Signature**

```ts
declare const resolve: (ast: AST) => Schema.Annotations.Annotations | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3797)

Since v4.0.0

## resolveAt

Returns a single annotation value by key from the AST node.

**Details**

Like `resolve`, reads from the last check's annotations when checks
are present. Returns `undefined` if the key is not found.

**See**

- `resolve`

**Signature**

```ts
declare const resolveAt: <A>(key: string) => (ast: AST) => A | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3811)

Since v4.0.0

## resolveDescription

Returns the `description` annotation from the AST node, if set.

**See**

- `resolve`
- `resolveTitle`
- `resolveIdentifier`

**Signature**

```ts
declare const resolveDescription: (ast: AST) => string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3850)

Since v4.0.0

## resolveIdentifier

Returns the `identifier` annotation from the AST node, if set.

**Details**

The identifier is typically set by `Schema.annotations({ identifier: "..." })`
and is used for error messages and schema identification.

**See**

- `resolve`
- `resolveTitle`

**Signature**

```ts
declare const resolveIdentifier: (ast: AST) => string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3826)

Since v4.0.0

## resolveTitle

Returns the `title` annotation from the AST node, if set.

**See**

- `resolve`
- `resolveIdentifier`
- `resolveDescription`

**Signature**

```ts
declare const resolveTitle: (ast: AST) => string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3838)

Since v4.0.0

# constants

## null

Provides the singleton `Null` AST instance.

**When to use**

Use when you need the shared AST node for exact null values while inspecting
or constructing schema ASTs.

**Signature**

```ts
declare const null: Null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L740)

Since v4.0.0

## undefined

Provides the singleton `Undefined` AST instance.

**When to use**

Use when you need the shared AST node for exact undefined values while
inspecting or constructing schema ASTs.

**Signature**

```ts
declare const undefined: Undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L792)

Since v4.0.0

# constructors

## any

Provides the singleton `Any` AST instance.

**When to use**

Use when you need the singleton AST node for the TypeScript `any` type and
intentionally want parsing to accept every input value.

**See**

- `unknown` for the sibling AST singleton that also accepts every value while preserving the safer `unknown` type

**Signature**

```ts
declare const any: Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L931)

Since v4.0.0

## bigInt

Provides the singleton `BigInt` AST instance.

**When to use**

Use to reuse the canonical `BigInt` AST node when constructing, inspecting,
or transforming schemas at the AST level.

**See**

- `BigInt` for the AST node class and string-codec behavior
- `isBigInt` for narrowing an AST to a `BigInt` node

**Signature**

```ts
declare const bigInt: BigInt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1565)

Since v4.0.0

## boolean

Provides the singleton `Boolean` AST instance.

**When to use**

Use to reuse the standard AST node that accepts either `true` or `false` when
constructing schema ASTs directly.

**See**

- `Boolean` for the AST node class
- `Literal` for exact boolean literal AST nodes

**Signature**

```ts
declare const boolean: Boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1456)

Since v4.0.0

## isPattern

Creates a `Filter` that validates strings by running `RegExp.test`.

**When to use**

Use when string validation should be represented as a schema `Filter` backed
by a regular expression.

**Details**

The filter can be used with `Schema.filter` or attached directly to a
`String` AST node through checks. The regular expression source is stored in
annotations for serialization and arbitrary generation.

**Gotchas**

Use a non-global, non-sticky regular expression, or reset `lastIndex`
yourself, because `RegExp.test` is stateful for expressions with the `g` or
`y` flag.

**Example** (Validating an email pattern)

```ts
import { SchemaAST } from "effect"

const emailFilter = SchemaAST.isPattern(/^[^@]+@[^@]+$/)
```

**See**

- `Filter`

**Signature**

```ts
declare const isPattern: (regExp: globalThis.RegExp, annotations?: Schema.Annotations.Filter) => Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3043)

Since v4.0.0

## never

Provides the singleton `Never` AST instance.

**When to use**

Use to reuse the canonical bottom-type AST node when constructing,
comparing, or returning ASTs.

**See**

- `Never` for the AST node class
- `isNever` for narrowing an AST to a `Never` node

**Signature**

```ts
declare const never: Never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L895)

Since v4.0.0

## number

Provides the singleton `Number` AST instance.

**When to use**

Use when you need the canonical `SchemaAST` node for schemas that accept any
JavaScript number value.

**See**

- `Number` for the AST node class and serialization behavior
- `Literal` for exact finite numeric literal AST nodes

**Signature**

```ts
declare const number: Number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1419)

Since v4.0.0

## objectKeyword

Provides the singleton `ObjectKeyword` AST instance.

**When to use**

Use to reuse the canonical AST node for the TypeScript `object` keyword when
building or comparing `SchemaAST` values directly.

**See**

- `ObjectKeyword` for the AST node class
- `isObjectKeyword` for narrowing an AST to an `ObjectKeyword` node

**Signature**

```ts
declare const objectKeyword: ObjectKeyword
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1009)

Since v3.10.0

## string

Provides the singleton `String` AST instance.

**When to use**

Use as the shared `SchemaAST` node for unconstrained JavaScript strings.

**See**

- `String` for the AST node class
- `isString` for narrowing an AST to a string node

**Signature**

```ts
declare const string: String
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1333)

Since v4.0.0

## symbol

Provides the singleton `Symbol` AST instance.

**When to use**

Use to reuse the singleton AST node for schemas that match any JavaScript
symbol value.

**Gotchas**

String-based codecs can encode only symbols registered with `Symbol.for`,
because the implementation uses `Symbol.keyFor`.

**See**

- `UniqueSymbol` for an AST node that matches one specific symbol

**Signature**

```ts
declare const symbol: Symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1514)

Since v4.0.0

## unknown

Provides the singleton `Unknown` AST instance.

**When to use**

Use when you need the reusable AST singleton for a schema node that accepts
every value while keeping parsed values opaque.

**See**

- `any` for the singleton that accepts every value as `any`

**Signature**

```ts
declare const unknown: Unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L971)

Since v4.0.0

## void

Provides the singleton `Void` AST instance.

**When to use**

Use when constructing or comparing AST nodes for TypeScript `void` return
values whose result is intentionally ignored.

**Details**

The node parses any present runtime value as `undefined`; schemas may still
expose `void` on their typed decoded and encoded sides.

**See**

- `Void` for the AST node class
- `undefined` for the sibling AST singleton that matches exactly `undefined`
- `isVoid` for narrowing an AST to a `Void` node

**Signature**

```ts
declare const void: Void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L853)

Since v4.0.0

# guards

## isAST

Returns `true` if the value is an `AST` node (any variant).

**Details**

Uses the internal `TypeId` brand to distinguish AST nodes from arbitrary
objects.

**See**

- `AST`

**Signature**

```ts
declare const isAST: (u: unknown) => u is AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L93)

Since v4.0.0

## isAny

Narrows an `AST` to `Any`.

**When to use**

Use when you need to inspect a schema AST and handle the `Any` node
variant specifically.

**See**

- `isUnknown` for the guard for the `Unknown` node, whose parsed result is typed as `unknown` rather than `any`

**Signature**

```ts
declare const isAny: (ast: AST) => ast is Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L203)

Since v4.0.0

## isArrays

Narrows an `AST` to `Arrays`.

**When to use**

Use to recognize array-like AST nodes before reading their element, rest, or
mutability metadata.

**See**

- `Arrays` for the AST node type narrowed by this guard

**Signature**

```ts
declare const isArrays: (ast: AST) => ast is Arrays
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L357)

Since v4.0.0

## isBigInt

Narrows an `AST` to `BigInt`.

**When to use**

Use to identify bigint AST nodes while inspecting or transforming schema ASTs.

**See**

- `BigInt` for the AST node matched by this guard
- `bigInt` for the singleton instance; use `isBigInt` when narrowing an existing `AST` value

**Signature**

```ts
declare const isBigInt: (ast: AST) => ast is BigInt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L264)

Since v4.0.0

## isBoolean

Narrows an `AST` to `Boolean`.

**When to use**

Use to identify the `Boolean` AST variant while inspecting, traversing, or
transforming schema definitions.

**See**

- `Boolean` for the AST node type matched by this guard
- `boolean` for the singleton instance to use when constructing a boolean AST directly

**Signature**

```ts
declare const isBoolean: (ast: AST) => ast is Boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L249)

Since v4.0.0

## isDeclaration

Narrows an `AST` to `Declaration`.

**When to use**

Use to recognize declaration AST nodes before running declaration-specific
handling.

**See**

- `Declaration` for the AST node type narrowed by this guard

**Signature**

```ts
declare const isDeclaration: (ast: AST) => ast is Declaration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L110)

Since v3.10.0

## isEnum

Narrows an `AST` to `Enum`.

**When to use**

Use to recognize enum AST nodes before reading enum cases or running
enum-specific handling.

**See**

- `Enum` for the AST node type narrowed by this guard

**Signature**

```ts
declare const isEnum: (ast: AST) => ast is Enum
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L334)

Since v4.0.0

## isLiteral

Narrows an `AST` to `Literal`.

**When to use**

Use to recognize exact string, number, boolean, or bigint literal AST nodes.

**See**

- `Literal` for the AST node type narrowed by this guard
- `LiteralValue` for the values stored by literal nodes

**Signature**

```ts
declare const isLiteral: (ast: AST) => ast is Literal
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L294)

Since v3.10.0

## isNever

Narrows an `AST` to `Never`.

**When to use**

Use to detect the AST node for a schema that can never match before handling
other schema variants.

**See**

- `Never` for the AST node type narrowed by this guard
- `never` for the singleton `Never` AST instance

**Signature**

```ts
declare const isNever: (ast: AST) => ast is Never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L173)

Since v4.0.0

## isNull

Narrows an `AST` to `Null`.

**When to use**

Use to recognize an AST node that represents exactly the `null` literal when
inspecting, traversing, or transforming schema ASTs.

**See**

- `Null` for the AST node type narrowed by this guard
- `null` for the singleton `Null` AST instance
- `isLiteral` for exact primitive literal AST nodes

**Signature**

```ts
declare const isNull: (ast: AST) => ast is Null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L127)

Since v4.0.0

## isNumber

Narrows an `AST` to `Number`.

**When to use**

Use to detect `Number` AST nodes while inspecting, traversing, or transforming
schema ASTs.

**Signature**

```ts
declare const isNumber: (ast: AST) => ast is Number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L233)

Since v4.0.0

## isObjectKeyword

Narrows an `AST` to `ObjectKeyword`.

**When to use**

Use to identify the AST node for the TypeScript `object` keyword when
inspecting or transforming a Schema AST.

**See**

- `ObjectKeyword` for the AST node matched by this guard
- `objectKeyword` for the singleton `ObjectKeyword` AST instance
- `isObjects` for struct and record AST nodes

**Signature**

```ts
declare const isObjectKeyword: (ast: AST) => ast is ObjectKeyword
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L319)

Since v3.10.0

## isObjects

Narrows an `AST` to `Objects`.

**Signature**

```ts
declare const isObjects: (ast: AST) => ast is Objects
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L365)

Since v4.0.0

## isString

Narrows an `AST` to `String`.

**When to use**

Use to detect schema AST nodes that match any string value while inspecting
or transforming a Schema AST.

**See**

- `String` for the AST node class narrowed by this guard
- `string` for the singleton `String` AST instance
- `isLiteral` for exact primitive literal AST nodes, including exact string literals

**Signature**

```ts
declare const isString: (ast: AST) => ast is String
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L220)

Since v4.0.0

## isSuspend

Narrows an `AST` to `Suspend`.

**Signature**

```ts
declare const isSuspend: (ast: AST) => ast is Suspend
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L381)

Since v3.10.0

## isSymbol

Narrows an `AST` to `Symbol`.

**When to use**

Use to narrow an `AST` node before handling the `Symbol` variant for schemas
that accept any JavaScript symbol value.

**See**

- `isUniqueSymbol` for the sibling guard that narrows the `UniqueSymbol` variant for one exact symbol value

**Signature**

```ts
declare const isSymbol: (ast: AST) => ast is Symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L279)

Since v4.0.0

## isTemplateLiteral

Narrows an `AST` to `TemplateLiteral`.

**Signature**

```ts
declare const isTemplateLiteral: (ast: AST) => ast is TemplateLiteral
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L342)

Since v3.10.0

## isUndefined

Narrows an `AST` to `Undefined`.

**When to use**

Use to identify AST nodes that represent exactly the JavaScript `undefined`
value.

**See**

- `isVoid` for narrowing AST nodes that represent TypeScript `void` instead of exact `undefined`

**Signature**

```ts
declare const isUndefined: (ast: AST) => ast is Undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L142)

Since v4.0.0

## isUnion

Narrows an `AST` to `Union`.

**Signature**

```ts
declare const isUnion: (ast: AST) => ast is Union<AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L373)

Since v3.10.0

## isUniqueSymbol

Narrows an `AST` to `UniqueSymbol`.

**Signature**

```ts
declare const isUniqueSymbol: (ast: AST) => ast is UniqueSymbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L302)

Since v3.10.0

## isUnknown

Narrows an `AST` to `Unknown`.

**When to use**

Use when you need to inspect a schema AST and handle the `Unknown` node
variant specifically.

**See**

- `isAny` for the guard for the `Any` node, whose parsed result is typed as `any` rather than `unknown`

**Signature**

```ts
declare const isUnknown: (ast: AST) => ast is Unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L188)

Since v4.0.0

## isVoid

Narrows an `AST` to `Void`.

**When to use**

Use to identify AST nodes that represent the TypeScript `void` type before
handling `Void`-specific schema behavior.

**See**

- `isUndefined` for narrowing AST nodes that represent the literal `undefined` value instead of TypeScript `void`

**Signature**

```ts
declare const isVoid: (ast: AST) => ast is Void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L157)

Since v4.0.0

# models

## AST (type alias)

Discriminated union of all AST node types.

**Details**

Every `Schema` has an `.ast` property of this type. Use the guard functions
(`isString`, `isObjects`, etc.) to narrow to a specific variant,
then access variant-specific fields.

- All variants share the `Base` fields: `annotations`, `checks`,
  `encoding`, `context`.
- Discriminate on the `_tag` field (e.g. `"String"`, `"Objects"`, `"Union"`).

**See**

- `Base`
- `isAST`

**Signature**

```ts
type AST =
  | Declaration
  | Null
  | Undefined
  | Void
  | Never
  | Unknown
  | Any
  | String
  | Number
  | Boolean
  | BigInt
  | Symbol
  | Literal
  | UniqueSymbol
  | ObjectKeyword
  | Enum
  | TemplateLiteral
  | Arrays
  | Objects
  | Union
  | Suspend
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L54)

Since v3.10.0

## Any (class)

AST node representing the `any` type — every value matches.

**See**

- `any`
- `isAny`

**Signature**

```ts
declare class Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L906)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Any"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L907)

## Arrays (class)

AST node for array-like types — both tuples and arrays.

**When to use**

Use when constructing or inspecting AST nodes for tuple or array-like schemas,
including rest elements.

**Details**

- `elements` — positional element types (tuple elements). An element is
  optional if its `Context.isOptional` is `true`.
- `rest` — the rest/variadic element types. When non-empty, the first
  entry is the "spread" type (e.g. `...Array<string>`), and subsequent
  entries are trailing positional elements after the spread.
- `isMutable` — whether the resulting array is `readonly` (`false`) or
  mutable (`true`).

**Gotchas**

Construction enforces TypeScript ordering rules: a required element
cannot follow an optional one, and an optional element cannot follow a
rest element.

**Example** (Inspecting a tuple AST)

```ts
import { Schema, SchemaAST } from "effect"

const schema = Schema.Tuple([Schema.String, Schema.Number])
const ast = schema.ast

if (SchemaAST.isArrays(ast)) {
  console.log(ast.elements.length) // 2
  console.log(ast.rest.length) // 0
}
```

**See**

- `isArrays`
- `Objects`

**Signature**

```ts
declare class Arrays {
  constructor(
    isMutable: boolean,
    elements: ReadonlyArray<AST>,
    rest: ReadonlyArray<AST>,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context,
    encodingChecks?: Checks
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1610)

Since v4.0.0

### \_rebuild (method)

**Signature**

```ts
declare const _rebuild: (
  recur: (ast: AST) => AST,
  checks: Checks | undefined,
  encodingChecks: Checks | undefined
) => Arrays
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1716)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Arrays"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1611)

### isMutable (property)

**Signature**

```ts
readonly isMutable: boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1612)

### elements (property)

**Signature**

```ts
readonly elements: ReadonlyArray<AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1613)

### rest (property)

**Signature**

```ts
readonly rest: ReadonlyArray<AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1614)

### encodingChecks (property)

**Signature**

```ts
readonly encodingChecks: readonly [Check<any>, ...Check<any>[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1615)

## Base (class)

Represents the abstract base class for all `AST` node variants.

**Details**

Every AST node extends `Base` and inherits these fields:

- `annotations` — user-supplied metadata (identifier, title, description,
  arbitrary keys).
- `checks` — optional `Checks` for post-type-match validation.
- `encoding` — optional `Encoding` chain for type ↔ wire
  transformations.
- `context` — optional `Context` for per-property metadata.

Subclasses add a `_tag` discriminant and variant-specific data.

**See**

- `AST`

**Signature**

```ts
declare class Base {
  constructor(
    annotations: Schema.Annotations.Annotations | undefined = undefined,
    checks: Checks | undefined = undefined,
    encoding: Encoding | undefined = undefined,
    context: Context | undefined = undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L606)

Since v4.0.0

### toString (method)

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L625)

### [TypeId] (property)

**Signature**

```ts
readonly [TypeId]: "~effect/Schema"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L607)

### \_tag (property)

**Signature**

```ts
readonly _tag: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L608)

### annotations (property)

**Signature**

```ts
readonly annotations: Schema.Annotations.Annotations | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L609)

### checks (property)

**Signature**

```ts
readonly checks: readonly [Check<any>, ...Check<any>[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L610)

### encoding (property)

**Signature**

```ts
readonly encoding: readonly [Link, ...Link[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L611)

### context (property)

**Signature**

```ts
readonly context: Context | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L612)

## BigInt (class)

AST node matching any `bigint` value.

**Details**

When serialized to a string-based codec, bigints are converted to/from
their decimal string representation.

**See**

- `bigInt`
- `isBigInt`

**Signature**

```ts
declare class BigInt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1529)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "BigInt"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1530)

## Boolean (class)

AST node matching any `boolean` value (`true` or `false`).

**See**

- `boolean`
- `isBoolean`

**Signature**

```ts
declare class Boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1430)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Boolean"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1431)

## Check (type alias)

A validation check — either a single `Filter` or a composite
`FilterGroup`.

**Details**

Stored in the `Checks` array on `Base.checks`.

**See**

- `Filter`
- `FilterGroup`

**Signature**

```ts
type Check<T> = Filter<T> | FilterGroup<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2984)

Since v4.0.0

## Checks (type alias)

Non-empty array of validation `Check` values attached to an AST node
via `Base.checks`.

**Details**

Checks are run after basic type matching succeeds. They represent
refinements like `minLength`, `pattern`, `int`, etc.

**See**

- `Check`
- `Filter`
- `FilterGroup`

**Signature**

```ts
type Checks = readonly [Check<any>, ...Array<Check<any>>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L582)

Since v4.0.0

## Context (class)

Represents per-property metadata attached to AST nodes via `Base.context`.

**Details**

Tracks whether a property key is optional, mutable, has a constructor
default, or carries key-level annotations. Typically set by helpers like
`optionalKey` and `Schema.mutableKey`.

- `isOptional` — the property key may be absent from the input.
- `isMutable` — the property is `readonly` when `false`.
- `defaultValue` — an `Encoding` applied during construction to
  supply missing values.
- `annotations` — key-level annotations (e.g. description of the key
  itself).

**See**

- `optionalKey`
- `isOptional`

**Signature**

```ts
declare class Context {
  constructor(
    isOptional: boolean,
    isMutable: boolean,
    /** Used for constructor default values (e.g. `withConstructorDefault` API) */
    defaultValue: Encoding | undefined = undefined,
    annotations: Schema.Annotations.Key<unknown> | undefined = undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L546)

Since v4.0.0

### isOptional (property)

**Signature**

```ts
readonly isOptional: boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L547)

### isMutable (property)

**Signature**

```ts
readonly isMutable: boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L548)

### defaultValue (property)

Used for constructor default values (e.g. `withConstructorDefault` API)

**Signature**

```ts
readonly defaultValue: readonly [Link, ...Link[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L550)

### annotations (property)

**Signature**

```ts
readonly annotations: Schema.Annotations.Key<unknown> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L551)

## Declaration (class)

AST node for user-defined opaque types with custom parsing logic.

**When to use**

Use when you need a custom schema AST node because none of the built-in
nodes fit.

**Details**

- `typeParameters` — inner schemas this declaration is parameterized over
  (e.g. the element type for a custom collection).
- `run` — factory that receives `typeParameters` and returns a parser that
  validates or transforms raw input.

**See**

- `isDeclaration`

**Signature**

```ts
declare class Declaration {
  constructor(
    typeParameters: ReadonlyArray<AST>,
    run: (
      typeParameters: ReadonlyArray<AST>
    ) => (input: unknown, self: Declaration, options: ParseOptions) => Effect.Effect<any, SchemaIssue.Issue, any>,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context,
    encodingChecks?: Checks
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L649)

Since v3.10.0

### \_rebuild (method)

**Signature**

```ts
declare const _rebuild: (
  recur: (ast: AST) => AST,
  checks: Checks | undefined,
  encodingChecks: Checks | undefined
) => Declaration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L681)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Declaration"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L650)

### typeParameters (property)

**Signature**

```ts
readonly typeParameters: ReadonlyArray<AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L651)

### run (property)

**Signature**

```ts
readonly run: (typeParameters: ReadonlyArray<AST>) => (input: unknown, self: Declaration, options: ParseOptions) => Effect.Effect<any, SchemaIssue.Issue, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L652)

### encodingChecks (property)

**Signature**

```ts
readonly encodingChecks: readonly [Check<any>, ...Check<any>[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L655)

## Encoding (type alias)

A non-empty chain of `Link` values representing the transformation
steps between a schema's decoded (type) form and its encoded (wire) form.

**Details**

Stored on `Base.encoding`. When `undefined`, the node has no
encoding transformation (type and encoded forms are identical).

**See**

- `Link`
- `toEncoded`

**Signature**

```ts
type Encoding = readonly [Link, ...Array<Link>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L433)

Since v4.0.0

## Enum (class)

AST node representing a TypeScript `enum`.

**Details**

Holds `enums` as an array of `[name, value]` pairs where values are
`string | number`. Parsing succeeds when the input matches any enum value.

**See**

- `isEnum`

**Signature**

```ts
declare class Enum {
  constructor(
    enums: ReadonlyArray<readonly [string, string | number]>,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1023)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Enum"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1024)

### enums (property)

**Signature**

```ts
readonly enums: ReadonlyArray<readonly [string, string | number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1025)

## Filter (class)

Represents a single validation check attached to an AST node.

**Details**

- `run` — the validation function. Returns `undefined` on success, or an
  `Issue` on failure.
- `annotations` — optional filter-level metadata (expected message, meta
  tags, arbitrary constraint hints).
- `aborted` — when `true`, parsing stops immediately after this filter
  fails (no further checks run).

Use `.annotate()` to add metadata and `.abort()` to mark as aborting.
Combine with another check via `.and()` to form a `FilterGroup`.

**See**

- `FilterGroup`
- `Check`
- `isPattern`

**Signature**

```ts
declare class Filter<E> {
  constructor(
    run: (input: E, self: AST, options: ParseOptions) => SchemaIssue.Issue | undefined,
    annotations: Schema.Annotations.Filter | undefined = undefined,
    /**
     * Whether the parsing process should be aborted after this check has failed.
     */
    aborted: boolean = false
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2901)

Since v4.0.0

### annotate (method)

**Signature**

```ts
declare const annotate: (annotations: Schema.Annotations.Filter) => Filter<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2923)

### abort (method)

**Signature**

```ts
declare const abort: () => Filter<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2926)

### and (method)

**Signature**

```ts
declare const and: (other: Check<E>, annotations?: Schema.Annotations.Filter) => FilterGroup<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2930)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Filter"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2902)

### run (property)

**Signature**

```ts
readonly run: (input: E, self: AST, options: ParseOptions) => SchemaIssue.Issue | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2903)

### annotations (property)

**Signature**

```ts
readonly annotations: Schema.Annotations.Filter | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2904)

### aborted (property)

Whether the parsing process should be aborted after this check has failed.

**Signature**

```ts
readonly aborted: boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2908)

## FilterGroup (class)

Represents a composite validation check grouping multiple `Check` values.

**Details**

Created by calling `.and()` on a `Filter` or another `FilterGroup`.
All inner checks are run; failures from aborted filters still stop
evaluation.

**See**

- `Filter`
- `Check`

**Signature**

```ts
declare class FilterGroup<E> {
  constructor(
    checks: readonly [Check<E>, ...Array<Check<E>>],
    annotations: Schema.Annotations.Filter | undefined = undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2949)

Since v4.0.0

### annotate (method)

**Signature**

```ts
declare const annotate: (annotations: Schema.Annotations.Filter) => FilterGroup<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2962)

### and (method)

**Signature**

```ts
declare const and: (other: Check<E>, annotations?: Schema.Annotations.Filter) => FilterGroup<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2966)

### \_tag (property)

**Signature**

```ts
readonly _tag: "FilterGroup"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2950)

### checks (property)

**Signature**

```ts
readonly checks: readonly [Check<E>, ...Check<E>[]]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2951)

### annotations (property)

**Signature**

```ts
readonly annotations: Schema.Annotations.Filter | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2952)

## IndexSignature (class)

Represents an index signature entry within an `Objects` node.

**When to use**

Use when constructing or inspecting object AST entries for record-like keys
and values.

**Details**

- `parameter` — the key type AST (e.g. `String` for `string` keys,
  `TemplateLiteral` for patterned keys).
- `type` — the value type SchemaAST.
- `merge` — optional `KeyValueCombiner` for handling duplicate keys.

**Gotchas**

Using `Schema.optionalKey` on the value type is not allowed for index
signatures (throws at construction); use `Schema.optional` instead.

**See**

- `Objects`
- `PropertySignature`

**Signature**

```ts
declare class IndexSignature {
  constructor(parameter: AST, type: AST, merge: KeyValueCombiner | undefined)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1971)

Since v3.10.0

### parameter (property)

**Signature**

```ts
readonly parameter: IndexSignatureParameter
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1972)

### type (property)

**Signature**

```ts
readonly type: AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1973)

### merge (property)

**Signature**

```ts
readonly merge: KeyValueCombiner | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1974)

## KeyValueCombiner (class)

Represents a bidirectional merge strategy for index signature key-value pairs.

**Details**

Used by `IndexSignature` when the same key appears multiple times
(e.g. from `Schema.extend` or overlapping records). Provides separate
`decode` and `encode` combiners that determine how duplicate entries are
merged.

**See**

- `IndexSignature`

**Signature**

```ts
declare class KeyValueCombiner {
  constructor(
    decode: Combiner.Combiner<readonly [key: PropertyKey, value: any]> | undefined,
    encode: Combiner.Combiner<readonly [key: PropertyKey, value: any]> | undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1904)

Since v4.0.0

### decode (property)

**Signature**

```ts
readonly decode: Combiner.Combiner<readonly [key: PropertyKey, value: any]> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1905)

### encode (property)

**Signature**

```ts
readonly encode: Combiner.Combiner<readonly [key: PropertyKey, value: any]> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1906)

## Link (class)

Represents a single step in an `Encoding` chain.

**Details**

A link pairs a target `AST` with a `Transformation` or `Middleware`
that converts values between the current node and the target.

- `to` — the AST node on the other side of this transformation step.
- `transformation` — the bidirectional conversion logic (decode/encode).

Links are composed into a non-empty array (`Encoding`) attached to
AST nodes that have a different encoded representation.

**See**

- `Encoding`
- `decodeTo`

**Signature**

```ts
declare class Link {
  constructor(
    to: AST,
    transformation:
      | SchemaTransformation.Transformation<any, any, any, any>
      | SchemaTransformation.Middleware<any, any, any, any, any, any>
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L402)

Since v4.0.0

### to (property)

**Signature**

```ts
readonly to: AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L403)

### transformation (property)

**Signature**

```ts
readonly transformation: SchemaTransformation.Transformation<any, any, any, any> | SchemaTransformation.Middleware<any, any, any, any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L404)

## Literal (class)

AST node matching an exact primitive value (string, number, boolean, or
bigint).

**Details**

Parsing succeeds only when the input is strictly equal (`===`) to the
stored `literal`. Numeric literals must be finite — `Infinity`, `-Infinity`,
and `NaN` are rejected at construction time.

**Example** (Creating a literal AST)

```ts
import { SchemaAST } from "effect"

const ast = new SchemaAST.Literal("active")
console.log(ast.literal) // "active"
```

**See**

- `LiteralValue`
- `isLiteral`

**Signature**

```ts
declare class Literal {
  constructor(
    literal: LiteralValue,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1243)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Literal"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1244)

### literal (property)

**Signature**

```ts
readonly literal: LiteralValue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1245)

## LiteralValue (type alias)

The set of primitive types that can appear as a `Literal` value.

**See**

- `Literal`

**Signature**

```ts
type LiteralValue = string | number | boolean | bigint
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1217)

Since v3.10.0

## Never (class)

AST node representing the `never` type — no value matches.

**Details**

Parsing always fails. Useful as a placeholder in unions or as the result
of narrowing that eliminates all options.

**See**

- `never`
- `isNever`

**Signature**

```ts
declare class Never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L869)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Never"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L870)

## Null (class)

AST node matching the `null` literal value.

**Details**

Parsing succeeds only when the input is exactly `null`.

**See**

- `null`
- `isNull`

**Signature**

```ts
declare class Null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L715)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Null"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L716)

## Number (class)

AST node matching any `number` value (including `NaN`, `Infinity`,
`-Infinity`).

**Details**

Default JSON serialization:

- Finite numbers are serialized as JSON numbers.
- `Infinity`, `-Infinity`, and `NaN` are serialized as JSON strings.

If the node has an `isFinite` or `isInt` check, the string fallback is
skipped since non-finite values cannot occur.

**See**

- `number`
- `isNumber`

**Signature**

```ts
declare class Number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1354)

Since v4.0.0

### \_match (method)

**Signature**

```ts
declare const _match: (regexp: RegExp, s: string, options: ParseOptions) => number | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1368)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Number"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1355)

## ObjectKeyword (class)

AST node matching the TypeScript `object` type — accepts objects, arrays,
and functions (anything non-primitive and non-null).

**See**

- `objectKeyword`
- `isObjectKeyword`

**Signature**

```ts
declare class ObjectKeyword
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L983)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ObjectKeyword"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L984)

## Objects (class)

AST node for object-like schemas, including structs and records.

**When to use**

Use when constructing or inspecting AST nodes for structs or records rather
than array-like schemas.

**Details**

- `propertySignatures` — named properties with their types (struct fields).
- `indexSignatures` — index signature entries (record patterns), each with
  a `parameter` AST for matching keys and a `type` AST for values.

An `Objects` node with no properties and no index signatures performs only a
non-nullish check: it accepts any value except `null` and `undefined`,
including primitive values.

**Gotchas**

Duplicate property names throw at construction time.

**Example** (Inspecting a struct AST)

```ts
import { Schema, SchemaAST } from "effect"

const schema = Schema.Struct({ name: Schema.String })
const ast = schema.ast

if (SchemaAST.isObjects(ast)) {
  for (const ps of ast.propertySignatures) {
    console.log(ps.name, ps.type._tag)
  }
  // "name" "String"
}
```

**See**

- `isObjects`
- `PropertySignature`
- `IndexSignature`
- `Arrays`

**Signature**

```ts
declare class Objects {
  constructor(
    propertySignatures: ReadonlyArray<PropertySignature>,
    indexSignatures: ReadonlyArray<IndexSignature>,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context,
    encodingChecks?: Checks
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2038)

Since v4.0.0

### \_rebuild (method)

**Signature**

```ts
declare const _rebuild: (
  recur: (ast: AST) => AST,
  recurParameter: (ast: AST) => AST,
  flipMerge: boolean,
  checks: Checks | undefined,
  encodingChecks: Checks | undefined
) => Objects
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2240)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Objects"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2039)

### propertySignatures (property)

**Signature**

```ts
readonly propertySignatures: ReadonlyArray<PropertySignature>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2040)

### indexSignatures (property)

**Signature**

```ts
readonly indexSignatures: ReadonlyArray<IndexSignature>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2041)

### encodingChecks (property)

**Signature**

```ts
readonly encodingChecks: readonly [Check<any>, ...Check<any>[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2042)

## PropertySignature (class)

Represents a named property within an `Objects` node.

**Details**

Pairs a `name` (any `PropertyKey`) with a `type` (`AST`). The
property's optionality and mutability are determined by the `type`'s
`Context`.

**See**

- `Objects`

**Signature**

```ts
declare class PropertySignature {
  constructor(name: PropertyKey, type: AST)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1877)

Since v3.10.0

### name (property)

**Signature**

```ts
readonly name: PropertyKey
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1878)

### type (property)

**Signature**

```ts
readonly type: AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1879)

## String (class)

AST node matching any `string` value.

**See**

- `string`
- `isString`

**Signature**

```ts
declare class String
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1304)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "String"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1305)

## Suspend (class)

AST node for lazy/recursive schemas.

**Details**

Wraps a thunk (`() => AST`) that is memoized on first call. Use this to
define recursive or mutually recursive schemas without infinite loops at
construction time.

**Example** (Defining recursive schema ASTs)

```ts
import { Schema, SchemaAST } from "effect"

interface Category {
  readonly name: string
  readonly children: ReadonlyArray<Category>
}

const Category = Schema.Struct({
  name: Schema.String,
  children: Schema.Array(Schema.suspend((): Schema.Codec<Category> => Category))
})

// The recursive branch is a Suspend node
```

**See**

- `isSuspend`

**Signature**

```ts
declare class Suspend {
  constructor(
    thunk: () => AST,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2839)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Suspend"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2840)

### thunk (property)

**Signature**

```ts
readonly thunk: () => AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2841)

## Symbol (class)

AST node matching any `symbol` value.

**When to use**

Use when you need the AST node class for schemas that match any JavaScript
symbol value.

**Details**

When serialized to a string-based codec, symbols are converted via
`Symbol.keyFor` and must be registered with `Symbol.for`.

**See**

- `symbol`
- `isSymbol`

**Signature**

```ts
declare class Symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1476)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Symbol"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1477)

## TemplateLiteral (class)

AST node representing a TypeScript template literal type
(e.g. `` `user_${string}` ``).

**Details**

`parts` is an array of AST nodes; each part contributes to matching
strings at runtime.

**See**

- `isTemplateLiteral`

**Signature**

```ts
declare class TemplateLiteral {
  constructor(
    parts: ReadonlyArray<AST>,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1104)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "TemplateLiteral"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1105)

### parts (property)

**Signature**

```ts
readonly parts: ReadonlyArray<AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1106)

## Undefined (class)

AST node matching the `undefined` value.

**Details**

Parsing succeeds only when the input is exactly `undefined`.

**See**

- `undefined`
- `isUndefined`

**Signature**

```ts
declare class Undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L755)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Undefined"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L756)

## Union (class)

AST node representing a union of schemas.

**Details**

- `types` — the member AST nodes.
- `mode` — `"anyOf"` succeeds on the first match (like TypeScript unions);
  `"oneOf"` requires exactly one member to match (fails if multiple do).

During parsing, members are tried in order. An internal candidate index
narrows which members to try based on the runtime type of the input and
discriminant ("sentinel") fields, making large unions efficient.

**Example** (Inspecting a union AST)

```ts
import { Schema, SchemaAST } from "effect"

const schema = Schema.Union([Schema.String, Schema.Number])
const ast = schema.ast

if (SchemaAST.isUnion(ast)) {
  console.log(ast.types.length) // 2
  console.log(ast.mode) // "anyOf"
}
```

**See**

- `isUnion`

**Signature**

```ts
declare class Union<A> {
  constructor(
    types: ReadonlyArray<A>,
    mode: "anyOf" | "oneOf",
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context,
    encodingChecks?: Checks
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2619)

Since v3.10.0

### \_rebuild (method)

**Signature**

```ts
declare const _rebuild: (
  recur: (ast: AST) => AST,
  checks: Checks | undefined,
  encodingChecks: Checks | undefined
) => Union<AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2675)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Union"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2620)

### types (property)

**Signature**

```ts
readonly types: ReadonlyArray<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2621)

### mode (property)

**Signature**

```ts
readonly mode: "anyOf" | "oneOf"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2622)

### encodingChecks (property)

**Signature**

```ts
readonly encodingChecks: readonly [Check<any>, ...Check<any>[]] | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L2623)

## UniqueSymbol (class)

AST node matching a specific `unique symbol` value.

**Details**

Parsing succeeds only when the input is reference-equal to the stored
`symbol`.

**See**

- `isUniqueSymbol`

**Signature**

```ts
declare class UniqueSymbol {
  constructor(
    symbol: symbol,
    annotations?: Schema.Annotations.Annotations,
    checks?: Checks,
    encoding?: Encoding,
    context?: Context
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1181)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "UniqueSymbol"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1182)

### symbol (property)

**Signature**

```ts
readonly symbol: symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L1183)

## Unknown (class)

AST node representing the `unknown` type — every value matches.

**Details**

Unlike `Any`, this is type-safe: the parsed result is typed as
`unknown` rather than `any`.

**See**

- `unknown`
- `isUnknown`

**Signature**

```ts
declare class Unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L946)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Unknown"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L947)

## Void (class)

AST node matching TypeScript `void` return-value semantics.

**When to use**

Use when you need an AST node for a value whose result is intentionally
ignored.

**Details**

Parsers built from this node accept any present runtime input and map it to
`undefined`. Public schemas built from it may still expose `void` as their
typed decoded and encoded representation.

**See**

- `undefined` for the AST singleton that matches only exact `undefined`
- `void`
- `isVoid`

**Signature**

```ts
declare class Void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L815)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Void"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L816)

# options

## ParseOptions (interface)

Options that control schema parsing, validation, transformation, and output behavior.

**Details**

Pass to `Schema.decodeUnknown`, `Schema.encode`, and related APIs to customize
error reporting, excess property handling, output key ordering, check
execution, and asynchronous parser concurrency.

- `errors` — `"first"` (default) stops at the first error; `"all"` collects
  every error.
- `onExcessProperty` — `"ignore"` (default) strips unknown object keys;
  `"error"` fails; `"preserve"` keeps them.
- `propertyOrder` — `"none"` (default) lets the system choose key order;
  `"original"` preserves input key order.
- `disableChecks` — skips validation checks while still applying defaults and
  transformations.
- `concurrency` — maximum number of async parse effects to run concurrently;
  defaults to `1`, or use `"unbounded"`.

**Signature**

```ts
export interface ParseOptions {
  /**
   * Controls how many parsing errors are reported.
   *
   * **Details**
   *
   * The default, `"first"`, stops at the first error. Set the option to `"all"`
   * to collect every parsing error, which can help with debugging or with
   * presenting more complete error messages to a user.
   *
   * @default "first"
   */
  readonly errors?: "first" | "all" | undefined

  /**
   * Controls how object parsing handles keys that are not declared by the schema.
   *
   * **Details**
   *
   * The default, `"ignore"`, strips unspecified properties from the output. Use
   * `"error"` to fail when an excess property is present, or `"preserve"` to
   * keep excess properties in the output.
   *
   * @default "ignore"
   */
  readonly onExcessProperty?: "ignore" | "error" | "preserve" | undefined

  /**
   * The `propertyOrder` option provides control over the order of object fields
   * in the output. This feature is useful when the sequence of keys is
   * important for the consuming processes or when maintaining the input order
   * enhances readability and usability.
   *
   * **Details**
   *
   * By default, the `propertyOrder` option is set to `"none"`. This means that
   * the internal system decides the order of keys to optimize parsing speed.
   *
   * Setting `propertyOrder` to `"original"` ensures that the keys are ordered
   * as they appear in the input during the decoding/encoding process.
   *
   * **Gotchas**
   *
   * The key order for `"none"` should not be considered stable and may change
   * in future updates without notice.
   *
   * @default "none"
   */
  readonly propertyOrder?: "none" | "original" | undefined

  /**
   * Whether to disable checks while still applying defaults and
   * transformations.
   */
  readonly disableChecks?: boolean | undefined

  /**
   * The maximum number of async effects to run concurrently.
   *
   * @default 1
   */
  readonly concurrency?: number | "unbounded" | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L458)

Since v3.10.0

# predicates

## isOptional

Returns `true` if the AST node represents an optional property.

**Details**

Checks `ast.context?.isOptional`. Defaults to `false` when no
`Context` is set.

**See**

- `optionalKey`
- `Context`

**Signature**

```ts
declare const isOptional: (ast: AST) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3355)

Since v4.0.0

# transforming

## decodeTo

Attaches a `Transformation` to the `to` AST, making it decode from the
`from` AST and encode back to it.

**Details**

This is the low-level primitive behind `Schema.transform` and
`Schema.transformOrFail`. It appends a `Link` to the `to` node's
encoding chain.

- Returns a new AST with the same type as `to`.

**See**

- `Link`
- `Encoding`
- `flip`

**Signature**

```ts
declare const decodeTo: <A extends AST>(
  from: AST,
  to: A,
  transformation: SchemaTransformation.Transformation<any, any, any, any>
) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3290)

Since v4.0.0

## flip

Swaps the decode and encode directions of an AST's `Encoding` chain.

**Details**

After flipping, what was decoding becomes encoding and vice versa. This is
the core operation behind `Schema.encode` — encoding a value is decoding
with a flipped SchemaAST.

- Memoized: same input reference → same output reference.
- Recursively walks composite nodes.

**See**

- `toType`
- `toEncoded`

**Signature**

```ts
declare const flip: (ast: AST) => AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3472)

Since v4.0.0

## optionalKey

Marks an AST node's property key as optional by setting
`Context.isOptional` to `true`.

**Details**

Also propagates the optional flag through the last link of the encoding
chain if present.

**See**

- `isOptional`
- `Context`

**Signature**

```ts
declare const optionalKey: <A extends AST>(ast: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3235)

Since v4.0.0

## toEncoded

Returns the encoded (wire-format) AST by flipping and then stripping
encodings.

**Details**

Equivalent to `toType(flip(ast))`. This gives you the AST that describes
the shape of the serialized/encoded data.

- Memoized: same input reference → same output reference.

**Example** (Getting the encoded AST)

```ts
import { Schema, SchemaAST } from "effect"

const schema = Schema.NumberFromString
const encodedAst = SchemaAST.toEncoded(schema.ast)
console.log(encodedAst._tag) // "String"
```

**See**

- `toType`
- `flip`

**Signature**

```ts
declare const toEncoded: (ast: AST) => AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3433)

Since v4.0.0

## toType

Strips all encoding transformations from an AST, returning the decoded
(type-level) representation.

**Details**

- Memoized: same input reference → same output reference.
- Recursively walks into composite nodes (`Arrays`, `Objects`,
  `Union`, `Suspend`).

**Example** (Getting the type AST)

```ts
import { Schema, SchemaAST } from "effect"

const schema = Schema.NumberFromString
const typeAst = SchemaAST.toType(schema.ast)
console.log(typeAst._tag) // "Number"
```

**See**

- `toEncoded`
- `flip`

**Signature**

```ts
declare const toType: <A extends AST>(ast: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaAST.ts#L3389)

Since v4.0.0
