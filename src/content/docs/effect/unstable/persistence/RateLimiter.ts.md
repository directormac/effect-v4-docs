---
title: RateLimiter.ts
nav_order: 297
parent: "effect"
---

## RateLimiter.ts overview

Coordinates rate limits through shared persistent storage.

The `RateLimiter` service consumes tokens for string keys using fixed-window
counters or token-bucket state. It can protect external APIs, enforce quotas,
or throttle workers across fibers and processes that share the same store.
This module includes helpers that fail when a limit is exceeded, return the
delay needed before continuing, or wrap an effect so it waits automatically.
It also defines the store service and in-memory or Redis-backed store layers.

Since v4.0.0

---

## Exports Grouped by Category

- [RateLimiterStore](#ratelimiterstore)
  - [layerStoreMemory](#layerstorememory)
  - [makeStoreRedis](#makestoreredis)
- [accessors](#accessors)
  - [makeSleep](#makesleep)
  - [makeWithRateLimiter](#makewithratelimiter)
- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [RateLimitExceeded (class)](#ratelimitexceeded-class)
  - [RateLimitStoreError (class)](#ratelimitstoreerror-class)
  - [RateLimiterError (class)](#ratelimitererror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
  - [RateLimiterErrorReason](#ratelimitererrorreason)
  - [RateLimiterErrorReason (type alias)](#ratelimitererrorreason-type-alias)
- [layers](#layers)
  - [layer](#layer)
  - [layerStoreRedis](#layerstoreredis)
  - [layerStoreRedisConfig](#layerstoreredisconfig)
- [models](#models)
  - [AdaptiveConsumeOptions (interface)](#adaptiveconsumeoptions-interface)
  - [AdaptiveConsumeResult (interface)](#adaptiveconsumeresult-interface)
  - [AdaptiveFeedbackOptions (interface)](#adaptivefeedbackoptions-interface)
  - [AdaptivePhase (type alias)](#adaptivephase-type-alias)
  - [ConsumeResult (interface)](#consumeresult-interface)
  - [RateLimiter (interface)](#ratelimiter-interface)
- [services](#services)
  - [RateLimiter](#ratelimiter)
- [store](#store)
  - [RateLimiterStore (class)](#ratelimiterstore-class)
- [type IDs](#type-ids)
  - [ErrorTypeId](#errortypeid)
  - [ErrorTypeId (type alias)](#errortypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# RateLimiterStore

## layerStoreMemory

Provides a process-local in-memory `RateLimiterStore`.

**Signature**

```ts
declare const layerStoreMemory: Layer.Layer<RateLimiterStore, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L661)

Since v4.0.0

## makeStoreRedis

Creates a Redis-backed `RateLimiterStore` using Lua scripts and the
configured key prefix.

**Signature**

```ts
declare const makeStoreRedis: (
  options?: { readonly prefix?: string | undefined } | undefined
) => Effect.Effect<
  {
    readonly fixedWindow: (options: {
      readonly key: string
      readonly tokens: number
      readonly refillRate: Duration.Duration
      readonly limit: number | undefined
    }) => Effect.Effect<readonly [count: number, ttl: number], RateLimiterError>
    readonly tokenBucket: (options: {
      readonly key: string
      readonly tokens: number
      readonly limit: number
      readonly refillRate: Duration.Duration
      readonly allowOverflow: boolean
    }) => Effect.Effect<number, RateLimiterError>
    readonly adaptiveConsume: (
      options: AdaptiveConsumeOptions
    ) => Effect.Effect<AdaptiveConsumeResult, RateLimiterError>
    readonly adaptiveFeedback: (options: AdaptiveFeedbackOptions) => Effect.Effect<void, RateLimiterError>
  },
  never,
  Redis.Redis
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L880)

Since v4.0.0

# accessors

## makeSleep

Accesses a function that sleeps when the rate limit is exceeded.

**Example** (Sleeping until rate limit permits)

```ts
import { Effect } from "effect"
import { RateLimiter } from "effect/unstable/persistence"

Effect.gen(function* () {
  // Access the `sleep` function from the RateLimiter module
  const sleep = yield* RateLimiter.makeSleep

  // Use the `sleep` function with specific rate limiting parameters.
  // This will only sleep if the rate limit has been exceeded.
  yield* sleep({
    key: "some-key",
    limit: 10,
    window: "5 seconds",
    algorithm: "fixed-window"
  })
})
```

**Signature**

```ts
declare const makeSleep: Effect.Effect<
  (options: {
    readonly algorithm?: "fixed-window" | "token-bucket" | undefined
    readonly window: Duration.Input
    readonly limit: number
    readonly key: string
    readonly tokens?: number | undefined
  }) => Effect.Effect<ConsumeResult, RateLimiterError>,
  never,
  RateLimiter
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L308)

Since v4.0.0

## makeWithRateLimiter

Accesses a function that applies rate limiting to an effect.

**Example** (Applying rate limits to effects)

```ts
import { Effect } from "effect"
import { RateLimiter } from "effect/unstable/persistence"

Effect.gen(function* () {
  // Access the `withLimiter` function from the RateLimiter module
  const withLimiter = yield* RateLimiter.makeWithRateLimiter

  // Apply a rate limiter to an effect
  yield* Effect.log("Making a request with rate limiting").pipe(
    withLimiter({
      key: "some-key",
      limit: 10,
      onExceeded: "delay",
      window: "5 seconds",
      algorithm: "fixed-window"
    })
  )
})
```

**Signature**

```ts
declare const makeWithRateLimiter: Effect.Effect<
  (options: {
    readonly algorithm?: "fixed-window" | "token-bucket" | undefined
    readonly onExceeded?: "delay" | "fail" | undefined
    readonly window: Duration.Input
    readonly limit: number
    readonly key: string
    readonly tokens?: number | undefined
  }) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E | RateLimiterError, R>,
  never,
  RateLimiter
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L261)

Since v4.0.0

# constructors

## make

Creates a `RateLimiter` from the current `RateLimiterStore`.

**Details**

The limiter supports fixed-window and token-bucket algorithms and either
fails or returns a delay when a limit is exceeded.

**Signature**

```ts
declare const make: Effect.Effect<RateLimiter, never, RateLimiterStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L86)

Since v4.0.0

# errors

## RateLimitExceeded (class)

Error reason for a rate-limit check that exceeded the configured limit.

**Details**

Includes the affected key, limit, remaining token count, and retry delay.

**Signature**

```ts
declare class RateLimitExceeded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L359)

Since v4.0.0

## RateLimitStoreError (class)

Error reason for failures in the backing `RateLimiterStore`.

**Signature**

```ts
declare class RateLimitStoreError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L384)

Since v4.0.0

## RateLimiterError (class)

Error raised by rate limiter operations, wrapping a concrete failure
`reason`.

**Signature**

```ts
declare class RateLimiterError {
  constructor(props: { readonly reason: RateLimiterErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L418)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as a rate limiter error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/experimental/RateLimiter/RateLimiterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L441)

Since v4.0.0

## RateLimiterErrorReason

Schema for all reasons that can be carried by `RateLimiterError`.

**Signature**

```ts
declare const RateLimiterErrorReason: Schema.Union<[typeof RateLimitExceeded, typeof RateLimitStoreError]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L406)

Since v4.0.0

## RateLimiterErrorReason (type alias)

Union of reasons carried by `RateLimiterError`.

**Signature**

```ts
type RateLimiterErrorReason = RateLimitExceeded | RateLimitStoreError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L398)

Since v4.0.0

# layers

## layer

Provides `RateLimiter` using the current `RateLimiterStore`.

**Signature**

```ts
declare const layer: Layer.Layer<RateLimiter, never, RateLimiterStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L226)

Since v4.0.0

## layerStoreRedis

Provides a Redis-backed `RateLimiterStore` using `makeStoreRedis`.

**Signature**

```ts
declare const layerStoreRedis: (options?: {
  readonly prefix?: string | undefined
}) => Layer.Layer<RateLimiterStore, never, Redis.Redis>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L1321)

Since v4.0.0

## layerStoreRedisConfig

Provides a Redis-backed `RateLimiterStore` from wrapped configuration
options.

**Signature**

```ts
declare const layerStoreRedisConfig: (
  options: Config.Wrap<{ readonly prefix?: string | undefined }>
) => Layer.Layer<RateLimiterStore, Config.ConfigError, Redis.Redis>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L1336)

Since v4.0.0

# models

## AdaptiveConsumeOptions (interface)

Options for consuming tokens from the adaptive rate limiter store.

**Signature**

```ts
export interface AdaptiveConsumeOptions {
  /**
   * The rate-limit key.
   */
  readonly key: string

  /**
   * The number of tokens to consume.
   */
  readonly tokens: number

  /**
   * The fallback limit configured for the regular rate limiter.
   */
  readonly fallbackLimit: number

  /**
   * The fallback window configured for the regular rate limiter.
   */
  readonly fallbackWindow: Duration.Duration
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L492)

Since v4.0.0

## AdaptiveConsumeResult (interface)

Metadata returned after consuming tokens from the adaptive rate limiter store.

**Signature**

```ts
export interface AdaptiveConsumeResult {
  /**
   * The amount of delay to wait before making the request.
   */
  readonly delay: Duration.Duration

  /**
   * The adaptive state epoch used to correlate later response feedback.
   */
  readonly epoch: number

  /**
   * The adaptive phase observed by this consume operation.
   */
  readonly phase: AdaptivePhase
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L520)

Since v4.0.0

## AdaptiveFeedbackOptions (interface)

Options for reporting response feedback to the adaptive rate limiter store.

**Signature**

```ts
export interface AdaptiveFeedbackOptions {
  /**
   * The rate-limit key.
   */
  readonly key: string

  /**
   * The adaptive state epoch returned by `adaptiveConsume`.
   */
  readonly epoch: number

  /**
   * The number of tokens consumed by the request.
   */
  readonly tokens: number

  /**
   * The HTTP response status code.
   */
  readonly status: number

  /**
   * The parsed `Retry-After` delay, when present.
   */
  readonly retryAfter: Duration.Duration | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L543)

Since v4.0.0

## AdaptivePhase (type alias)

Phase of adaptive rate limiting driven by server feedback.

**Signature**

```ts
type AdaptivePhase = "inactive" | "cooldown" | "learning" | "learned"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L484)

Since v4.0.0

## ConsumeResult (interface)

Metadata returned after consuming tokens from a rate limiter.

**Signature**

```ts
export interface ConsumeResult {
  /**
   * The amount of delay to wait before making the next request, when the rate
   * limiter is using the "delay" `onExceeded` strategy. It will be
   * Duration.zero if the request is allowed immediately.
   */
  readonly delay: Duration.Duration

  /**
   * The maximum number of requests allowed in the current window.
   */
  readonly limit: number

  /**
   * The number of remaining requests in the current window.
   */
  readonly remaining: number

  /**
   * The time until the rate limit fully resets.
   */
  readonly resetAfter: Duration.Duration
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L454)

Since v4.0.0

## RateLimiter (interface)

Service for consuming rate-limit tokens for a key using fixed-window or
token-bucket algorithms.

**Signature**

```ts
export interface RateLimiter {
  readonly [TypeId]: TypeId

  readonly consume: (options: {
    readonly algorithm?: "fixed-window" | "token-bucket" | undefined
    readonly onExceeded?: "delay" | "fail" | undefined
    readonly window: Duration.Input
    readonly limit: number
    readonly key: string
    readonly tokens?: number | undefined
  }) => Effect.Effect<ConsumeResult, RateLimiterError>

  readonly adaptiveConsume: (options: AdaptiveConsumeOptions) => Effect.Effect<AdaptiveConsumeResult, RateLimiterError>

  readonly adaptiveFeedback: (options: AdaptiveFeedbackOptions) => Effect.Effect<void, RateLimiterError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L45)

Since v4.0.0

# services

## RateLimiter

Service tag for persistent token-consumption services.

**When to use**

Use to access or provide rate-limit checks backed by fixed-window counters or
token-bucket state.

**Signature**

```ts
declare const RateLimiter: Context.Service<RateLimiter, RateLimiter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L73)

Since v4.0.0

# store

## RateLimiterStore (class)

Defines the low-level backing store for rate-limit state.

**When to use**

Use to provide the shared counter storage and adaptive feedback state used by
persistent rate-limit checks.

**Signature**

```ts
declare class RateLimiterStore
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L581)

Since v4.0.0

# type IDs

## ErrorTypeId

Runtime type identifier for `RateLimiterError`.

**Signature**

```ts
declare const ErrorTypeId: "~@effect/experimental/RateLimiter/RateLimiterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L339)

Since v4.0.0

## ErrorTypeId (type alias)

Type-level identifier used to brand `RateLimiterError` values.

**Signature**

```ts
type ErrorTypeId = "~@effect/experimental/RateLimiter/RateLimiterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L347)

Since v4.0.0

## TypeId

Runtime type identifier for `RateLimiter` values.

**Signature**

```ts
declare const TypeId: "~effect/persistence/RateLimiter"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L28)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to brand `RateLimiter` values.

**Signature**

```ts
type TypeId = "~effect/persistence/RateLimiter"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RateLimiter.ts#L36)

Since v4.0.0
