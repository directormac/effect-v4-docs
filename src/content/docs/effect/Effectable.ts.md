---
title: Effectable.ts
nav_order: 25
parent: "effect"
---

## Effectable.ts overview

Low-level helpers for making custom values behave like Effects. The module
exposes a prototype builder and an abstract base class that let
domain-specific values, such as service keys or configuration descriptions,
be evaluated by Effect and yielded inside `Effect.gen`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [Class (class)](#class-class)
    - [override (property)](#override-property)
- [prototypes](#prototypes)
  - [Prototype](#prototype)

---

# constructors

## Class (class)

Provides an abstract class that can be extended to create an `Effect`.

**When to use**

Use as an abstract base class to define custom classes whose instances behave
as `Effect` values.

**See**

- `Prototype` for a lower-level primitive approach to creating custom Effect-like values without a class

**Signature**

```ts
declare class Class<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Effectable.ts#L66)

Since v2.0.0

### override (property)

**Signature**

```ts
override: Effect.Effect<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Effectable.ts#L67)

# prototypes

## Prototype

Create a low-level `Effect` prototype.

**When to use**

Use when you need to create a custom Effect-like value without extending a
class, by providing a label and an evaluate function that receives the
current fiber.

**Details**

When the effect is evaluated, it calls `evaluate` with the current fiber.

**See**

- `Class` for a class-based approach to defining custom Effect values

**Signature**

```ts
declare const Prototype: <A extends Effect.Effect<any, any, any>>(options: {
  readonly label: string
  readonly evaluate: (
    this: A,
    fiber: Fiber.Fiber<any, any>
  ) => Effect.Effect<Effect.Success<A>, Effect.Error<A>, Effect.Services<A>>
}) => Effect.Effect<Effect.Success<A>, Effect.Error<A>, Effect.Services<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Effectable.ts#L31)

Since v4.0.0
