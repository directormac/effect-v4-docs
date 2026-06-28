---
title: Brand.ts
nav_order: 5
parent: "effect"
---

## Brand.ts overview

The `Brand` module adds compile-time names to ordinary TypeScript values so
structurally identical values cannot be mixed accidentally. A branded value
has the same runtime representation as its unbranded value; the extra
information lives in the type system unless you choose a validating
constructor.

Since v2.0.0

---

## Exports Grouped by Category

- [combining](#combining)
  - [all](#all)
- [constructors](#constructors)
  - [check](#check)
  - [make](#make)
  - [nominal](#nominal)
- [errors](#errors)
  - [BrandError (class)](#branderror-class)
    - [toString (method)](#tostring-method)
    - [\_tag (property)](#_tag-property)
    - [name (property)](#name-property)
    - [issue (property)](#issue-property)
- [models](#models)
  - [Brand (interface)](#brand-interface)
  - [Constructor (interface)](#constructor-interface)
- [utility types](#utility-types)
  - [Branded (type alias)](#branded-type-alias)
- [utils](#utils)
  - [Brand (namespace)](#brand-namespace)
    - [FromConstructor (type alias)](#fromconstructor-type-alias)
    - [Unbranded (type alias)](#unbranded-type-alias)
    - [Keys (type alias)](#keys-type-alias)
    - [Brands (type alias)](#brands-type-alias)
    - [EnsureCommonBase (type alias)](#ensurecommonbase-type-alias)

---

# combining

## all

Combines one or more brand constructors to form a single branded type.

**When to use**

Use to require an input to satisfy every runtime check collected by the
provided brand constructors.

**Details**

If the provided constructors contain runtime checks, the combined
constructor succeeds only when all checks pass. If no runtime checks are
present, it behaves as a nominal constructor.

**Signature**

```ts
declare const all: <Brands extends readonly [Constructor<any>, ...Array<Constructor<any>>]>(
  ...brands: Brand.EnsureCommonBase<Brands>
) => Constructor<
  Types.UnionToIntersection<{ [B in keyof Brands]: Brand.FromConstructor<Brands[B]> }[number]> extends infer X extends
    Brand<any>
    ? X
    : Brand<any>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L308)

Since v2.0.0

# constructors

## check

Creates a branded type `Constructor` from one or more schema checks.

**When to use**

Use when you need a branded type constructor that performs runtime validation
via schema checks.

**Details**

Calling the returned constructor validates the unbranded value and throws on
failure. Use the returned `option`, `result`, or `is` methods for
non-throwing validation.

**See**

- `nominal` for a brand constructor without runtime validation
- `all` for combining multiple brand constructors

**Signature**

```ts
declare const check: <A extends Brand<any>>(
  checks_0: SchemaAST.Check<Brand.Unbranded<A>>,
  ...checks: Array<SchemaAST.Check<Brand.Unbranded<A>>>
) => Constructor<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L274)

Since v4.0.0

## make

Returns a `Constructor` that can construct a branded type from an unbranded
value using the provided `filter` predicate as validation of the input data.

**When to use**

Use when you want validation while constructing the branded type.

**See**

- `nominal` for a brand constructor that performs no validation.

**Signature**

```ts
declare const make: <A extends Brand<any>>(
  filter: (unbranded: Brand.Unbranded<A>) => Schema.FilterOutput
) => Constructor<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L249)

Since v4.0.0

## nominal

Returns a `Constructor` that **does not apply any runtime checks** and just
returns the provided value.

**When to use**

Use to create nominal types that allow distinguishing between two values
of the same type but with different meanings.

**See**

- `make` for constructing branded values with validation.
- `check` for constructing branded values from schema checks.

**Signature**

```ts
declare const nominal: <A extends Brand<any>>() => Constructor<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L228)

Since v2.0.0

# errors

## BrandError (class)

Error returned when a branded type is constructed from an invalid value.

**Details**

The error wraps a `SchemaIssue.Issue`, exposes `message` through
`issue.toString()`, and formats as `BrandError(<message>)`.

**Gotchas**

`BrandError` is an error-like model with `_tag`, `name`, `message`, and
`toString`; it does not extend JavaScript `Error`.

**Signature**

```ts
declare class BrandError {
  constructor(issue: SchemaIssue.Issue)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L106)

Since v4.0.0

### toString (method)

Formats the brand error together with its validation message.

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L141)

Since v4.0.0

### \_tag (property)

Discriminant used to identify brand construction failures.

**Signature**

```ts
readonly _tag: "BrandError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L115)

Since v4.0.0

### name (property)

Error name used by tools that inspect JavaScript error-like objects.

**Signature**

```ts
readonly name: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L121)

Since v4.0.0

### issue (property)

Schema issue describing why brand validation failed.

**Signature**

```ts
readonly issue: SchemaIssue.Issue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L127)

Since v4.0.0

# models

## Brand (interface)

A generic interface that defines a branded type.

**When to use**

Use to define a branded type such as `number & Brand<"Positive">` when
TypeScript should keep structurally identical values separate without
changing their runtime value.

**See**

- `Branded` for applying a brand key to a base type
- `Constructor` for validating or constructing branded values

**Signature**

```ts
export interface Brand<in out Keys extends string> {
  readonly [TypeId]: {
    readonly [K in Keys]: Keys
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L35)

Since v2.0.0

## Constructor (interface)

A constructor for a branded type that provides validation and safe
construction methods.

**When to use**

Use as the shared callable interface for branded values when an API accepts
or returns a brand constructor and callers need throwing, `Option`, `Result`,
or type-guard validation forms.

**See**

- `nominal` for a constructor without runtime validation
- `make` for creating a constructor from a validation predicate
- `check` for creating a constructor from schema checks
- `all` for combining brand constructors

**Signature**

```ts
export interface Constructor<in out B extends Brand<any>> {
  /**
   * Constructs a branded type from a value of type `Unbranded<B>`, throwing an
   * error if the provided value is not valid.
   */
  (unbranded: Brand.Unbranded<B>): B
  /**
   * Constructs a branded type from a value of type `Unbranded<B>`, returning
   * `Some<B>` if the provided value is valid, `None` otherwise.
   */
  option(unbranded: Brand.Unbranded<B>): Option.Option<B>
  /**
   * Constructs a branded type from a value of type `Unbranded<B>`, returning
   * `Success<B>` if the provided value is valid, `Failure<BrandError>`
   * otherwise.
   */
  result(unbranded: Brand.Unbranded<B>): Result.Result<B, BrandError>
  /**
   * Attempts to refine the provided value of type `Unbranded<B>`, returning
   * `true` if the provided value is a valid branded type, `false` otherwise.
   */
  is(unbranded: Brand.Unbranded<B>): unbranded is Brand.Unbranded<B> & B

  /**
   * The checks that are applied to the branded type.
   *
   * @internal
   */
  checks?: readonly [SchemaAST.Check<Brand.Unbranded<B>>, ...Array<SchemaAST.Check<Brand.Unbranded<B>>>] | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L59)

Since v2.0.0

# utility types

## Branded (type alias)

A type alias for creating branded types more concisely.

**Signature**

```ts
type Branded<A, Key> = A & Brand<Key>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L211)

Since v2.0.0

# utils

## Brand (namespace)

Namespace containing type-level helpers for working with branded types and
brand constructors.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L152)

Since v2.0.0

### FromConstructor (type alias)

A utility type to extract a branded type from a `Constructor`.

**Signature**

```ts
type FromConstructor<C> = C extends Constructor<infer B> ? B : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L159)

Since v2.0.0

### Unbranded (type alias)

A utility type to extract the unbranded value type from a brand.

**Signature**

```ts
type Unbranded<B> = B extends infer U & Brands<B> ? U : B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L167)

Since v2.0.0

### Keys (type alias)

A utility type to extract the keys of a branded type.

**Signature**

```ts
type keyof B["~effect/Brand"] = keyof B[typeof TypeId]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L175)

Since v4.0.0

### Brands (type alias)

A utility type to extract the brands from a branded type.

**Signature**

```ts
type Brands<B> = Types.UnionToIntersection<{ [K in Keys<B>]: K extends string ? Brand<K> : never }[Keys<B>]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L183)

Since v2.0.0

### EnsureCommonBase (type alias)

A utility type that checks that all brands have the same base type.

**Signature**

```ts
type EnsureCommonBase<Brands> = {
  [B in keyof Brands]: Brand.Unbranded<Brand.FromConstructor<Brands[0]>> extends Brand.Unbranded<
    Brand.FromConstructor<Brands[B]>
  >
    ? Brand.Unbranded<Brand.FromConstructor<Brands[B]>> extends Brand.Unbranded<Brand.FromConstructor<Brands[0]>>
      ? Brands[B]
      : Brands[B]
    : "ERROR: All brands should have the same base type"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Brand.ts#L193)

Since v2.0.0
