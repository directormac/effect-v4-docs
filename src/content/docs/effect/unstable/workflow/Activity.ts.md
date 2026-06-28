---
title: Activity.ts
nav_order: 345
parent: "effect"
---

## Activity.ts overview

Defines named effects whose results can be stored by a workflow engine.

An `Activity` is an `Effect` with a stable name and schemas for its success
and error values. `make` wraps an effect so the `WorkflowEngine` can execute
it, store its result, or replay that result during a workflow run. This module
also includes helpers for retry attempts, idempotency keys, and durable races.

Since v4.0.0

---

## Exports Grouped by Category

- [Attempts](#attempts)
  - [CurrentAttempt](#currentattempt)
- [Idempotency](#idempotency)
  - [idempotencyKey](#idempotencykey)
- [constructors](#constructors)
  - [make](#make)
- [error handling](#error-handling)
  - [retry](#retry)
- [models](#models)
  - [Activity (interface)](#activity-interface)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (interface)](#anywithprops-interface)
- [racing](#racing)
  - [raceAll](#raceall)

---

# Attempts

## CurrentAttempt

Context reference containing the current activity retry attempt, defaulting
to `1`.

**Signature**

```ts
declare const CurrentAttempt: Context.Reference<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L233)

Since v4.0.0

# Idempotency

## idempotencyKey

Computes a deterministic activity idempotency key from the current workflow
execution ID, the supplied name, and optionally the current attempt.

**Signature**

```ts
declare const idempotencyKey: (
  name: string,
  options?: { readonly includeAttempt?: boolean | undefined } | undefined
) => Effect.Effect<string, never, WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L245)

Since v4.0.0

# constructors

## make

Creates a workflow activity from an effect, using the provided schemas to
encode successes and failures for durable execution.

**Signature**

```ts
declare const make: <
  R,
  Success extends Schema.Constraint = Schema.Void,
  Error extends Schema.Constraint = Schema.Never
>(options: {
  readonly name: string
  readonly success?: Success | undefined
  readonly error?: Error | undefined
  readonly execute: Effect.Effect<Success["Type"], Error["Type"], R>
  readonly interruptRetryPolicy?: Schedule.Schedule<any, Cause.Cause<unknown>> | undefined
  readonly annotations?: Context.Context<never> | undefined
}) => Activity<Success, Error, Exclude<R, WorkflowInstance | WorkflowEngine | Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L123)

Since v4.0.0

# error handling

## retry

Retries an effect with `Effect.retry` while updating `CurrentAttempt` for
each attempt.

**Signature**

```ts
declare const retry: {
  <E, O extends Types.NoExcessProperties<Omit<Effect.Retry.Options<E>, "schedule">, O>>(
    options: O
  ): <A, R>(self: Effect.Effect<A, E, R>) => Effect.Retry.Return<R, E, A, O>
  <A, E, R, O extends Types.NoExcessProperties<Omit<Effect.Retry.Options<E>, "schedule">, O>>(
    self: Effect.Effect<A, E, R>,
    options: O
  ): Effect.Retry.Return<R, E, A, O>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L209)

Since v4.0.0

# models

## Activity (interface)

Durable workflow activity that behaves as an `Effect` and records its name,
result schemas, annotations, and encoded execution form for the workflow
engine.

**Signature**

```ts
export interface Activity<
  Success extends Schema.Constraint = Schema.Void,
  Error extends Schema.Constraint = Schema.Never,
  R = never
> extends Effect.Effect<
  Success["Type"],
  Error["Type"],
  Success["DecodingServices"] | Error["DecodingServices"] | R | WorkflowEngine | WorkflowInstance
> {
  readonly [TypeId]: typeof TypeId
  readonly name: string
  readonly successSchema: Success
  readonly errorSchema: Error
  readonly exitSchema: Schema.Exit<Success, Error, Schema.Defect>
  readonly exitSchemaPartial: Schema.Exit<Success, Error, Schema.Unknown>
  readonly annotations: Context.Context<never>
  annotate<I, S>(key: Context.Key<I, S>, value: S): Activity<Success, Error, R>
  annotateMerge<I>(annotations: Context.Context<I>): Activity<Success, Error, R>
  readonly execute: Effect.Effect<
    Success["Type"],
    Error["Type"],
    | Success["DecodingServices"]
    | Success["EncodingServices"]
    | Error["DecodingServices"]
    | Error["EncodingServices"]
    | R
    | Scope
    | WorkflowEngine
    | WorkflowInstance
  >
  readonly executeEncoded: Effect.Effect<
    unknown,
    unknown,
    | Success["DecodingServices"]
    | Success["EncodingServices"]
    | Error["DecodingServices"]
    | Error["EncodingServices"]
    | R
    | Scope
    | WorkflowEngine
    | WorkflowInstance
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L36)

Since v4.0.0

## Any (interface)

Type-erased activity shape for APIs that only need the activity identity,
name, annotations, and encoded execution.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
  readonly name: string
  readonly executeEncoded: Effect.Effect<any, any, any>
  readonly annotations: Context.Context<never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L94)

Since v4.0.0

## AnyWithProps (interface)

Type-erased activity shape that also exposes success and error schemas for
derived workflow APIs.

**Signature**

```ts
export interface AnyWithProps {
  readonly [TypeId]: typeof TypeId
  readonly name: string
  readonly successSchema: Schema.Top
  readonly errorSchema: Schema.Top
  readonly executeEncoded: Effect.Effect<any, any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L108)

Since v4.0.0

# racing

## raceAll

Runs a non-empty collection of activities as a durable race and returns the
first completed success or failure using unioned success and error schemas.

**Signature**

```ts
declare const raceAll: <const Activities extends NonEmptyReadonlyArray<Any>>(
  name: string,
  activities: Activities
) => Effect.Effect<
  Activities[number] extends Activity<infer _A, infer _E, infer _R> ? _A["Type"] : never,
  Activities[number] extends Activity<infer _A, infer _E, infer _R> ? _E["Type"] : never,
  | (Activities[number] extends Activity<infer Success, infer Error, infer R>
      ? Success["DecodingServices"] | Error["DecodingServices"] | R
      : never)
  | WorkflowEngine
  | WorkflowInstance
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Activity.ts#L270)

Since v4.0.0
