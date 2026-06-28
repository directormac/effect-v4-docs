---
title: Template.ts
nav_order: 265
parent: "effect"
---

## Template.ts overview

Builds HTTP response text from template literals.

Template interpolations can be plain values, optional values, effects, or
streams. The resulting effect or stream keeps the errors and service
requirements from any effectful interpolations, which lets response helpers
assemble dynamic text without losing type information.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
  - [stream](#stream)
- [models](#models)
  - [Interpolated (type alias)](#interpolated-type-alias)
  - [InterpolatedWithStream (type alias)](#interpolatedwithstream-type-alias)
  - [Primitive (type alias)](#primitive-type-alias)
  - [PrimitiveValue (type alias)](#primitivevalue-type-alias)
- [utils](#utils)
  - [Interpolated (namespace)](#interpolated-namespace)
    - [Context (type alias)](#context-type-alias)
    - [Error (type alias)](#error-type-alias)

---

# constructors

## make

Creates an effectful string from a template literal.

**Details**

Primitive and `Option` interpolations are rendered immediately. Effect
interpolations are evaluated and rendered before the final string is produced.

**Signature**

```ts
declare const make: <A extends ReadonlyArray<Interpolated>>(
  strings: TemplateStringsArray,
  ...args: A
) => Effect.Effect<string, Interpolated.Error<A[number]>, Interpolated.Context<A[number]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L116)

Since v4.0.0

## stream

Creates a stream of strings from a template literal.

**Details**

Static text is emitted with interpolated values. Effect interpolations are
evaluated as stream chunks, and stream interpolations are flattened into the
output.

**Signature**

```ts
declare const stream: <A extends ReadonlyArray<InterpolatedWithStream>>(
  strings: TemplateStringsArray,
  ...args: A
) => Stream.Stream<string, Interpolated.Error<A[number]>, Interpolated.Context<A[number]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L177)

Since v4.0.0

# models

## Interpolated (type alias)

Value accepted by the string template constructor.

**Details**

Interpolations can be primitive values, optional primitive values, or effects
that produce primitive values.

**Signature**

```ts
type Interpolated = Primitive | Option.Option<Primitive> | Effect.Effect<Primitive, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L48)

Since v4.0.0

## InterpolatedWithStream (type alias)

Value accepted by the streaming template constructor.

**Details**

In addition to normal interpolations, stream interpolations can emit primitive
values over time.

**Signature**

```ts
type InterpolatedWithStream = Interpolated | Stream.Stream<Primitive, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L64)

Since v4.0.0

## Primitive (type alias)

Primitive template interpolation value.

**Details**

Arrays are rendered by converting each element to a string and concatenating the
results.

**Signature**

```ts
type Primitive = PrimitiveValue | ReadonlyArray<PrimitiveValue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L35)

Since v4.0.0

## PrimitiveValue (type alias)

Primitive value that can be interpolated into an HTTP template.

**Signature**

```ts
type PrimitiveValue = string | number | bigint | boolean | null | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L22)

Since v4.0.0

# utils

## Interpolated (namespace)

Namespace containing type-level helpers for template interpolations.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L71)

Since v4.0.0

### Context (type alias)

Extracts the required context from an effect or stream interpolation.

**Details**

Plain values and `Option` interpolations contribute no context.

**Signature**

```ts
type Context<A> = A extends infer T
  ? T extends Option.Option<infer _>
    ? never
    : T extends Effect.Effect<infer _A, infer _E, infer R>
      ? R
      : T extends Stream.Stream<infer _A, infer _E, infer R>
        ? R
        : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L82)

Since v4.0.0

### Error (type alias)

Extracts the error type from an effect or stream interpolation.

**Details**

Plain values and `Option` interpolations contribute no error type.

**Signature**

```ts
type Error<A> = A extends infer T
  ? T extends Option.Option<infer _>
    ? never
    : T extends Stream.Stream<infer _A, infer E, infer _R>
      ? E
      : T extends Effect.Effect<infer _A, infer E, infer _R>
        ? E
        : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Template.ts#L98)

Since v4.0.0
