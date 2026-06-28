---
title: Data.ts
nav_order: 19
parent: "effect"
---

## Data.ts overview

Defines helpers for small immutable data models.

This module helps create plain classes, tagged classes, tagged unions, and
typed errors with readonly fields. Tagged values carry a `_tag` field, which
makes them easy to narrow with pattern matching or simple checks. These
helpers are commonly used for domain values and errors in Effect programs.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [Class](#class)
  - [Error](#error)
  - [TaggedClass](#taggedclass)
  - [TaggedError](#taggederror)
  - [taggedEnum](#taggedenum)
- [models](#models)
  - [TaggedEnum (type alias)](#taggedenum-type-alias)
- [utils](#utils)
  - [TaggedEnum (namespace)](#taggedenum-namespace)
    - [WithGenerics (interface)](#withgenerics-interface)
    - [GenericMatchers (interface)](#genericmatchers-interface)
    - [Kind (type alias)](#kind-type-alias)
    - [Args (type alias)](#args-type-alias)
    - [Value (type alias)](#value-type-alias)
    - [Constructor (type alias)](#constructor-type-alias)
    - [ConstructorFrom (type alias)](#constructorfrom-type-alias)

---

# constructors

## Class

Provides a base class for immutable data types.

**When to use**

Use when you need a lightweight immutable value type with `.pipe()` support.

**Details**

Extend `Class` with a type parameter to declare fields. The constructor
accepts those fields as a single object argument. When there are no fields
the argument is optional. Instances are `Readonly` and `Pipeable`.

**Example** (Defining a value class)

```ts
import { Data, Equal } from "effect"

class Person extends Data.Class<{ readonly name: string }> {}

const mike1 = new Person({ name: "Mike" })
const mike2 = new Person({ name: "Mike" })

console.log(Equal.equals(mike1, mike2))
// true
```

**See**

- `TaggedClass` — adds a `_tag` field
- `Error` — yieldable error variant

**Signature**

```ts
declare const Class: new <A extends Record<string, any> = {}>(
  args: Types.VoidIfEmpty<{ readonly [P in keyof A]: A[P] }>
) => Readonly<A> & Pipeable.Pipeable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L51)

Since v2.0.0

## Error

Provides a base class for yieldable errors.

**When to use**

Use when you need yieldable errors that do **not** need tag-based
discrimination.

**Details**

Extends `Cause.YieldableError`, so instances can be yielded inside
`Effect.gen` to fail the enclosing effect. Fields are passed as a single
object; when there are no fields the argument is optional. If a `message`
field is provided, it becomes the error's `.message`.

**Example** (Defining a yieldable error)

```ts
import { Data, Effect } from "effect"

class NetworkError extends Data.Error<{
  readonly code: number
  readonly message: string
}> {}

const program = Effect.gen(function* () {
  return yield* new NetworkError({ code: 500, message: "timeout" })
})

// The effect fails with a NetworkError
Effect.runSync(Effect.exit(program))
```

**See**

- `TaggedError` — adds a `_tag` for `Effect.catchTag`
- `Class` — non-error data class

**Signature**

```ts
declare const Error: new <A extends Record<string, any> = {}>(
  args: Types.VoidIfEmpty<{ readonly [P in keyof A]: A[P] }>
) => Cause.YieldableError & Readonly<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L723)

Since v2.0.0

## TaggedClass

Provides a base class for immutable data types with a `_tag` discriminator.

**When to use**

Use when you need a single-variant tagged type or an ad-hoc discriminator.

**Details**

Like `Class`, but the resulting instances also carry a
`readonly _tag: Tag` property. The `_tag` is excluded from the constructor
argument.

**Example** (Defining a tagged class)

```ts
import { Data } from "effect"

class Person extends Data.TaggedClass("Person")<{
  readonly name: string
}> {}

const mike = new Person({ name: "Mike" })
console.log(mike._tag)
// "Person"
```

**See**

- `Class` — without a `_tag`
- `TaggedError` — tagged error variant
- `TaggedEnum` — multi-variant unions

**Signature**

```ts
declare const TaggedClass: <Tag extends string>(
  tag: Tag
) => new <A extends Record<string, any> = {}>(
  args: Types.VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P] }>
) => Readonly<A> & { readonly _tag: Tag } & Pipeable.Pipeable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L96)

Since v2.0.0

## TaggedError

Creates a tagged error class with a `_tag` discriminator.

**When to use**

Use when you need domain errors with discriminated-union handling.

**Details**

Like `Error`, but instances also carry a `readonly _tag` property,
enabling `Effect.catchTag` and `Effect.catchTags` for tag-based recovery.
The `_tag` is excluded from the constructor argument. Yielding an instance
inside `Effect.gen` fails the effect with this error.

**Example** (Recovering by tag)

```ts
import { Data, Effect } from "effect"

class NotFound extends Data.TaggedError("NotFound")<{
  readonly resource: string
}> {}

class Forbidden extends Data.TaggedError("Forbidden")<{
  readonly reason: string
}> {}

const program = Effect.gen(function* () {
  return yield* new NotFound({ resource: "/users/42" })
})

const recovered = program.pipe(Effect.catchTag("NotFound", (e) => Effect.succeed(`missing: ${e.resource}`)))
```

**See**

- `Error` — without a `_tag`
- `TaggedClass` — tagged class that is not an error

**Signature**

```ts
declare const TaggedError: <Tag extends string>(
  tag: Tag
) => new <A extends Record<string, any> = {}>(
  args: Types.VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P] }>
) => Cause.YieldableError & { readonly _tag: Tag } & Readonly<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L770)

Since v2.0.0

## taggedEnum

Creates constructors and matchers for a `TaggedEnum` type.

**When to use**

Use when you model a closed union with plain data objects and want
construction, tag checks, and exhaustive matching from the same definition.

**Details**

Returns an object with:

- One constructor per variant (keyed by tag name)
- `$is(tag)` — returns a type-guard function that checks only the `_tag` field
- `$match` — exhaustive pattern matching (data-first or data-last)

**Gotchas**

- Constructors produce **plain objects**, not class instances.
- `$is(tag)` only checks the `_tag` field, not the full structure. It relies
  on the tag being globally unique and the value being produced by your
  constructors. For untrusted input, validate with the `Schema` module first.

**Example** (Creating and matching tagged enum values)

```ts
import { Data } from "effect"

type HttpError = Data.TaggedEnum<{
  BadRequest: { readonly message: string }
  NotFound: { readonly url: string }
}>

const { BadRequest, NotFound, $is, $match } = Data.taggedEnum<HttpError>()

const err = NotFound({ url: "/missing" })

// Type guard
console.log($is("NotFound")(err)) // true

// Pattern matching
const msg = $match(err, {
  BadRequest: (e) => e.message,
  NotFound: (e) => `${e.url} not found`
})
console.log(msg) // "/missing not found"
```

**Example** (Defining a generic tagged enum)

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDef extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDef>()

const ok = Success({ value: 42 })
// ok: { readonly _tag: "Success"; readonly value: number }
```

**See**

- `TaggedEnum` — the type-level companion
- `TaggedEnum.Constructor` — the returned object type
- `TaggedEnum.WithGenerics` — generic enum support

**Signature**

```ts
declare const taggedEnum: {
  <Z extends TaggedEnum.WithGenerics<1>>(): Types.Simplify<
    {
      readonly [Tag in Z["taggedEnum"]["_tag"]]: <A>(
        args: TaggedEnum.Args<TaggedEnum.Kind<Z, A>, Tag, Extract<TaggedEnum.Kind<Z, A>, { readonly _tag: Tag }>>
      ) => TaggedEnum.Value<TaggedEnum.Kind<Z, A>, Tag>
    } & TaggedEnum.GenericMatchers<Z>
  >
  <Z extends TaggedEnum.WithGenerics<2>>(): Types.Simplify<
    {
      readonly [Tag in Z["taggedEnum"]["_tag"]]: <A, B>(
        args: TaggedEnum.Args<TaggedEnum.Kind<Z, A, B>, Tag, Extract<TaggedEnum.Kind<Z, A, B>, { readonly _tag: Tag }>>
      ) => TaggedEnum.Value<TaggedEnum.Kind<Z, A, B>, Tag>
    } & TaggedEnum.GenericMatchers<Z>
  >
  <Z extends TaggedEnum.WithGenerics<3>>(): Types.Simplify<
    {
      readonly [Tag in Z["taggedEnum"]["_tag"]]: <A, B, C>(
        args: TaggedEnum.Args<
          TaggedEnum.Kind<Z, A, B, C>,
          Tag,
          Extract<TaggedEnum.Kind<Z, A, B, C>, { readonly _tag: Tag }>
        >
      ) => TaggedEnum.Value<TaggedEnum.Kind<Z, A, B, C>, Tag>
    } & TaggedEnum.GenericMatchers<Z>
  >
  <Z extends TaggedEnum.WithGenerics<4>>(): Types.Simplify<
    {
      readonly [Tag in Z["taggedEnum"]["_tag"]]: <A, B, C, D>(
        args: TaggedEnum.Args<
          TaggedEnum.Kind<Z, A, B, C, D>,
          Tag,
          Extract<TaggedEnum.Kind<Z, A, B, C, D>, { readonly _tag: Tag }>
        >
      ) => TaggedEnum.Value<TaggedEnum.Kind<Z, A, B, C, D>, Tag>
    } & TaggedEnum.GenericMatchers<Z>
  >
  <A extends { readonly _tag: string }>(): TaggedEnum.Constructor<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L590)

Since v2.0.0

# models

## TaggedEnum (type alias)

Transforms a record of variant definitions into a discriminated union type.

**When to use**

Use when you have two or more variants that share a common `_tag` discriminator.

**Details**

Each key in the record becomes a variant with `readonly _tag` set to that
key. Use with `taggedEnum` to get constructors and matchers.

**Gotchas**

Variant records must **not** include a `_tag` property; it is added automatically.

**Example** (Defining a tagged enum)

```ts
import { Data } from "effect"

type HttpError = Data.TaggedEnum<{
  BadRequest: { readonly status: 400; readonly message: string }
  NotFound: { readonly status: 404 }
}>

// Equivalent to:
// | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
// | { readonly _tag: "NotFound"; readonly status: 404 }

const { BadRequest, NotFound } = Data.taggedEnum<HttpError>()

const err = BadRequest({ status: 400, message: "missing id" })
console.log(err._tag)
// "BadRequest"
```

**See**

- `taggedEnum` — constructors and matchers for a `TaggedEnum`
- `TaggedEnum.WithGenerics` — generic tagged enums
- `TaggedEnum.Constructor` — the constructor object type

**Signature**

```ts
type TaggedEnum<A> = keyof A extends infer Tag
  ? Tag extends keyof A
    ? Types.Simplify<{ readonly _tag: Tag } & { readonly [K in keyof A[Tag]]: A[Tag][K] }>
    : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L149)

Since v2.0.0

# utils

## TaggedEnum (namespace)

Namespace for `TaggedEnum` utility types.

**When to use**

Use to reference utility types for constructing, extracting, and matching
`TaggedEnum` variants.

**Details**

Provides helper types for:

- Generic tagged enums (`TaggedEnum.WithGenerics`, `TaggedEnum.Kind`)
- Extracting constructor arguments (`TaggedEnum.Args`) and variant
  values (`TaggedEnum.Value`)
- Full constructor objects (`TaggedEnum.Constructor`)

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L184)

Since v2.0.0

### WithGenerics (interface)

Defines a tagged enum shape that accepts generic type parameters.

**When to use**

Use when variant payloads need to be parameterized, such as `Result<E, A>`.

**Details**

Extend this interface and set `taggedEnum` to your union type, using
`this["A"]`, `this["B"]`, etc. as placeholders for the generics. The
`Count` parameter declares how many generics are used (up to 4).

**Example** (Defining a generic tagged enum)

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>

interface MyResultDef extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}

const { Failure, Success } = Data.taggedEnum<MyResultDef>()

const ok = Success({ value: 42 })
// ok: { readonly _tag: "Success"; readonly value: number }
```

**See**

- `Kind` — apply concrete types to a `WithGenerics` definition
- `taggedEnum` — constructors and matchers

**Signature**

```ts
export interface WithGenerics<Count extends number> {
  readonly taggedEnum: { readonly _tag: string }
  readonly numberOfGenerics: Count

  readonly A: unknown
  readonly B: unknown
  readonly C: unknown
  readonly D: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L224)

Since v2.0.0

### GenericMatchers (interface)

Type-guard and pattern-matching interface for generic tagged enums.

**When to use**

Use to type the `$is` and `$match` helpers for generic tagged enums.

**Details**

This is the `$is` / `$match` portion of the object returned by
`taggedEnum` when used with a `WithGenerics` definition.

**See**

- `Constructor` — the non-generic equivalent

**Signature**

```ts
export interface GenericMatchers<Z extends WithGenerics<number>> {
  readonly $is: <Tag extends Z["taggedEnum"]["_tag"]>(
    tag: Tag
  ) => {
    <T extends TaggedEnum.Kind<Z, any, any, any, any>>(u: T): u is T & { readonly _tag: Tag }
    (u: unknown): u is Extract<TaggedEnum.Kind<Z>, { readonly _tag: Tag }>
  }
  readonly $match: {
    <
      A,
      B,
      C,
      D,
      Cases extends {
        readonly [Tag in Z["taggedEnum"]["_tag"]]: (
          args: Extract<TaggedEnum.Kind<Z, A, B, C, D>, { readonly _tag: Tag }>
        ) => any
      }
    >(
      cases: Cases
    ): (self: TaggedEnum.Kind<Z, A, B, C, D>) => Unify<ReturnType<Cases[Z["taggedEnum"]["_tag"]]>>
    <
      A,
      B,
      C,
      D,
      Cases extends {
        readonly [Tag in Z["taggedEnum"]["_tag"]]: (
          args: Extract<TaggedEnum.Kind<Z, A, B, C, D>, { readonly _tag: Tag }>
        ) => any
      }
    >(
      self: TaggedEnum.Kind<Z, A, B, C, D>,
      cases: Cases
    ): Unify<ReturnType<Cases[Z["taggedEnum"]["_tag"]]>>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L469)

Since v3.2.0

### Kind (type alias)

Applies concrete type arguments to a `WithGenerics` definition, producing
the resulting tagged union type.

**When to use**

Use to refer to a specific instantiation of a generic tagged enum in type signatures.

**Example** (Applying generics)

```ts
import type { Data } from "effect"

type Option<A> = Data.TaggedEnum<{
  None: {}
  Some: { readonly value: A }
}>
interface OptionDef extends Data.TaggedEnum.WithGenerics<1> {
  readonly taggedEnum: Option<this["A"]>
}

// Resolve to the concrete union for `string`
type StringOption = Data.TaggedEnum.Kind<OptionDef, string>
// { _tag: "None" } | { _tag: "Some"; value: string }
```

**See**

- `WithGenerics` — define the generic shape

**Signature**

```ts
type Kind<Z, A, B, C, D> = (Z & {
  readonly A: A
  readonly B: B
  readonly C: C
  readonly D: D
})["taggedEnum"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L265)

Since v2.0.0

### Args (type alias)

Extracts the constructor argument type for a specific variant of a tagged
union.

**When to use**

Use to derive the argument object expected by a constructor for one tagged
union variant.

**Details**

Returns `void` if the variant has no fields beyond `_tag`.

**Example** (Extracting variant args)

```ts
import type { Data } from "effect"

type Result = { readonly _tag: "Ok"; readonly value: number } | { readonly _tag: "Err"; readonly error: string }

type OkArgs = Data.TaggedEnum.Args<Result, "Ok">
// { readonly value: number }

type ErrArgs = Data.TaggedEnum.Args<Result, "Err">
// { readonly error: string }
```

**See**

- `Value` — extracts the full variant type (including `_tag`)

**Signature**

```ts
type Args<A, K, E> = {
  readonly [K in keyof E as K extends "_tag" ? never : K]: E[K]
} extends infer T
  ? Types.VoidIfEmpty<T>
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L312)

Since v2.0.0

### Value (type alias)

Extracts the full variant type (including `_tag`) for a specific tag.

**When to use**

Use to select one full tagged-union variant by its `_tag` value.

**Example** (Extracting a variant type)

```ts
import type { Data } from "effect"

type Result = { readonly _tag: "Ok"; readonly value: number } | { readonly _tag: "Err"; readonly error: string }

type OkVariant = Data.TaggedEnum.Value<Result, "Ok">
// { readonly _tag: "Ok"; readonly value: number }
```

**See**

- `Args` — extracts fields without `_tag`

**Signature**

```ts
type Value<A, K> = Extract<A, { readonly _tag: K }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L346)

Since v2.0.0

### Constructor (type alias)

The full constructors-and-matchers object type returned by `taggedEnum`.

**When to use**

Use when you want to annotate an exported constructor bundle so downstream
code keeps exact variant constructors and exhaustive matching.

**Details**

Includes:

- A constructor function for each variant (keyed by tag name)
- `$is(tag)` — returns a type-guard that checks only the `_tag` field;
  safe when the tag is globally unique and the value was produced by your
  constructors. For untrusted input, validate with the `Schema` module first.
- `$match` — exhaustive pattern matching (data-last or data-first)

**Example** (Using the constructor object)

```ts
import { Data } from "effect"

type Shape =
  | { readonly _tag: "Circle"; readonly radius: number }
  | { readonly _tag: "Rect"; readonly w: number; readonly h: number }

const { Circle, Rect, $is, $match } = Data.taggedEnum<Shape>()

const shape = Circle({ radius: 10 })

// Type guard
if ($is("Circle")(shape)) {
  console.log(shape.radius)
}

// Pattern matching
const label = $match(shape, {
  Circle: (s) => `circle r=${s.radius}`,
  Rect: (s) => `rect ${s.w}x${s.h}`
})
```

**See**

- `taggedEnum` — creates constructors and matchers

**Signature**

```ts
type Constructor<A> = Types.Simplify<
  {
    readonly [Tag in A["_tag"]]: ConstructorFrom<Extract<A, { readonly _tag: Tag }>, "_tag">
  } & {
    readonly $is: <Tag extends A["_tag"]>(tag: Tag) => (u: unknown) => u is Extract<A, { readonly _tag: Tag }>
    readonly $match: {
      <
        Cases extends {
          readonly [Tag in A["_tag"]]: (args: Extract<A, { readonly _tag: Tag }>) => any
        }
      >(
        cases: Cases
      ): (value: A) => Unify<ReturnType<Cases[A["_tag"]]>>
      <
        Cases extends {
          readonly [Tag in A["_tag"]]: (args: Extract<A, { readonly _tag: Tag }>) => any
        }
      >(
        value: A,
        cases: Cases
      ): Unify<ReturnType<Cases[A["_tag"]]>>
    }
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L398)

Since v3.1.0

### ConstructorFrom (type alias)

Function type that constructs a tagged-union variant from its fields,
excluding the keys listed in `Tag`.

**When to use**

Use to type an individual constructor for one tagged-union variant.

**Details**

The constructor returns the full variant type `A`. If no fields remain
after excluding `Tag` keys, the constructor argument type becomes `void`.

**Signature**

```ts
type ConstructorFrom<A, Tag> = (
  args: Types.VoidIfEmpty<{ readonly [P in keyof A as P extends Tag ? never : P]: A[P] }>
) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Data.ts#L448)

Since v4.0.0
