---
title: Reactivity.ts
nav_order: 310
parent: "effect"
---

## Reactivity.ts overview

Process-local invalidation for connecting writes to dependent reads.

This module does not cache values itself. It lets callers register handlers
for keys, invalidate those keys, wrap successful mutations so they invalidate
keys, and expose effects as queues or streams that rerun when matching keys
change. The service can also batch invalidations so handlers run after the
batch completes.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [invalidate](#invalidate)
  - [mutation](#mutation)
  - [query](#query)
  - [stream](#stream)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
- [services](#services)
  - [Reactivity (class)](#reactivity-class)

---

# accessors

## invalidate

Invalidates the supplied keys through the `Reactivity` service.

**Details**

Registered queries for matching keys are rerun immediately, or collected until
the enclosing reactivity batch completes.

**Signature**

```ts
declare const invalidate: (
  keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
) => Effect.Effect<void, never, Reactivity>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L307)

Since v4.0.0

## mutation

Wraps an effect so the supplied keys are invalidated after the effect succeeds.

**Gotchas**

If the effect fails, the keys are not invalidated.

**Signature**

```ts
declare const mutation: {
  (
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R | Reactivity>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ): Effect.Effect<A, E, R | Reactivity>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L228)

Since v4.0.0

## query

Runs an effect as a query tied to the supplied invalidation keys.

**Details**

The returned queue receives the initial result and each later result after the
keys are invalidated. The registration is removed when the current scope closes.

**Signature**

```ts
declare const query: {
  (
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ): <A, E, R>(
    effect: Effect.Effect<A, E, R>
  ) => Effect.Effect<Queue.Dequeue<A, E>, never, R | Scope.Scope | Reactivity>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ): Effect.Effect<Queue.Dequeue<A, E>, never, R | Scope.Scope | Reactivity>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L252)

Since v4.0.0

## stream

Runs an effect as a stream of query results tied to the supplied invalidation
keys.

**Details**

The effect runs initially and reruns whenever the keys are invalidated.

**Signature**

```ts
declare const stream: {
  (
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ): <A, E, R>(effect: Effect.Effect<A, E, R>) => Stream.Stream<A, E, Exclude<R, Scope.Scope> | Reactivity>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ): Stream.Stream<A, E, Exclude<R, Scope.Scope> | Reactivity>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L279)

Since v4.0.0

# constructors

## make

Creates an in-memory `Reactivity` service.

**Details**

The service tracks handlers by hashed keys and runs the registered handlers when
matching keys are invalidated.

**Signature**

```ts
declare const make: Effect.Effect<
  {
    readonly invalidateUnsafe: (keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>) => void
    readonly registerUnsafe: (
      keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
      handler: () => void
    ) => () => void
    readonly invalidate: (
      keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
    ) => Effect.Effect<void>
    readonly mutation: <A, E, R>(
      keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E, R>
    readonly query: <A, E, R>(
      keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<Queue.Dequeue<A, E>, never, R | Scope.Scope>
    readonly stream: <A, E, R>(
      keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
      effect: Effect.Effect<A, E, R>
    ) => Stream.Stream<A, E, Exclude<R, Scope.Scope>>
    readonly withBatch: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  },
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L79)

Since v4.0.0

# layers

## layer

The default layer that provides an in-memory `Reactivity` service.

**Signature**

```ts
declare const layer: Layer.Layer<Reactivity, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L317)

Since v4.0.0

# services

## Reactivity (class)

Service for key-based reactive invalidation.

**When to use**

Use to provide the invalidation service that refreshes queries, streams, and
atoms when application keys change.

**Details**

The service can register handlers for keys, invalidate those keys, wrap
mutations so successful effects invalidate keys, and turn query effects into
queues or streams that rerun when keys are invalidated.

**Signature**

```ts
declare class Reactivity
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reactivity.ts#L41)

Since v4.0.0
