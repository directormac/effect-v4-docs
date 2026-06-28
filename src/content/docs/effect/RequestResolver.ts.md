---
title: RequestResolver.ts
nav_order: 92
parent: "effect"
---

## RequestResolver.ts overview

Resolves data requests made with `Effect.request`.

A `Request` describes what a fiber needs, while a `RequestResolver` describes
how to collect request entries, group them into batches, run backend work,
and complete each waiting entry. This module includes constructors for common
resolver shapes and tools for controlling batching, grouping, delays,
tracing, caching, racing, hooks around resolver execution, and persistence.

Since v2.0.0

---

## Exports Grouped by Category

- [Persistence](#persistence)
  - [persisted](#persisted)
- [caching](#caching)
  - [asCache](#ascache)
  - [withCache](#withcache)
- [combinators](#combinators)
  - [around](#around)
  - [batchN](#batchn)
  - [grouped](#grouped)
  - [race](#race)
  - [withSpan](#withspan)
- [constructors](#constructors)
  - [fromEffect](#fromeffect)
  - [fromEffectTagged](#fromeffecttagged)
  - [fromFunction](#fromfunction)
  - [fromFunctionBatched](#fromfunctionbatched)
  - [make](#make)
  - [makeGrouped](#makegrouped)
  - [makeWith](#makewith)
  - [never](#never)
- [delay](#delay)
  - [setDelay](#setdelay)
  - [setDelayEffect](#setdelayeffect)
- [guards](#guards)
  - [isRequestResolver](#isrequestresolver)
- [models](#models)
  - [RequestResolver (interface)](#requestresolver-interface)
- [utils](#utils)
  - [RequestResolver (namespace)](#requestresolver-namespace)
    - [Variance (interface)](#variance-interface)

---

# Persistence

## persisted

Wraps a request resolver with persistent storage for persistable requests.

**When to use**

Use to keep a `RequestResolver` interface while reusing completed
`Persistable` request results through a `Persistence` store.

**Details**

Cached results are loaded from the configured persistence store before
running the underlying resolver. Missing entries are resolved normally and
written back to the store. Entries marked stale by `staleWhileRevalidate`
receive the stored result and are also resolved again so the refreshed result
can be written back to the store. Creating the persisted resolver requires
`Persistence.Persistence` and `Scope`.

**See**

- `withCache` for in-memory resolver caching that does not require persistable request values or a persistence store
- `asCache` for exposing resolver results through a `Cache` instead of returning another resolver

**Signature**

```ts
declare const persisted: {
  <A extends Request.Request<any, Persistence.PersistenceError | Schema.SchemaError, any> & Persistable.Any>(options: {
    readonly storeId: string
    readonly timeToLive?: ((exit: Request.Result<A>, request: A) => Duration.Input) | undefined
    readonly staleWhileRevalidate?: ((exit: Request.Result<A>, request: A) => boolean) | undefined
  }): (self: RequestResolver<A>) => Effect.Effect<RequestResolver<A>, never, Persistence.Persistence | Scope>
  <A extends Request.Request<any, Persistence.PersistenceError | Schema.SchemaError, any> & Persistable.Any>(
    self: RequestResolver<A>,
    options: {
      readonly storeId: string
      readonly timeToLive?: ((exit: Request.Result<A>, request: A) => Duration.Input) | undefined
      readonly staleWhileRevalidate?: ((exit: Request.Result<A>, request: A) => boolean) | undefined
    }
  ): Effect.Effect<RequestResolver<A>, never, Persistence.Persistence | Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L1165)

Since v4.0.0

# caching

## asCache

Wraps a request resolver in a cache, allowing it to cache results up to a
specified capacity and optional time-to-live.

**When to use**

Use to turn a request resolver into a first-class `Cache` when callers need
cache lookup, refresh, invalidation, or inspection around request results.

**Details**

The request value is the cache key. Cache misses run the resolver via
`Effect.request`, `timeToLive` receives the request `Exit` and the request,
and `requireServicesAt` controls whether services are required at lookup time
or construction time.

**Gotchas**

Cache hits depend on the request value's equality semantics.

**See**

- `withCache` for keeping caching behind a resolver used with `Effect.request`
- `persisted` for storing persistable request results outside process memory
- `Cache.Cache` for operations available on the returned cache

**Signature**

```ts
declare const asCache: {
  <A extends Request.Any, ServiceMode extends "lookup" | "construction" = never>(options: {
    readonly capacity: number
    readonly timeToLive?: ((exit: Request.Result<A>, request: A) => Duration.Input) | undefined
    readonly requireServicesAt?: ServiceMode | undefined
  }): (
    self: RequestResolver<A>
  ) => Effect.Effect<
    Cache.Cache<
      A,
      Request.Success<A>,
      Request.Error<A>,
      "construction" extends ServiceMode ? never : Request.Services<A>
    >,
    never,
    "construction" extends ServiceMode ? Request.Services<A> : never
  >
  <A extends Request.Any, ServiceMode extends "lookup" | "construction" = never>(
    self: RequestResolver<A>,
    options: {
      readonly capacity: number
      readonly timeToLive?: ((exit: Request.Result<A>, request: A) => Duration.Input) | undefined
      readonly requireServicesAt?: ServiceMode | undefined
    }
  ): Effect.Effect<
    Cache.Cache<
      A,
      Request.Success<A>,
      Request.Error<A>,
      "construction" extends ServiceMode ? never : Request.Services<A>
    >,
    never,
    "construction" extends ServiceMode ? Request.Services<A> : never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L993)

Since v4.0.0

## withCache

Adds a bounded in-memory cache to a request resolver.

**When to use**

Use to reuse completed results for repeated equal request values while still
passing a `RequestResolver` to `Effect.request`.

**Details**

Running the returned effect creates the cache and returns a wrapped resolver.
The cache stores completed success or failure results by request equality up
to `capacity`. The `strategy` option controls eviction order and defaults to
`"lru"`; `"fifo"` keeps insertion order.

**Gotchas**

Entries do not expire by time, and completed failures are cached the same as
successes. Request equality controls cache hits.

**See**

- `asCache` for exposing the resolver as a `Cache` with time-to-live and service lookup controls
- `persisted` for backing persistable requests with the configured persistence store

**Signature**

```ts
declare const withCache: {
  <A extends Request.Any>(options: {
    readonly capacity: number
    readonly strategy?: "lru" | "fifo" | undefined
  }): (self: RequestResolver<A>) => Effect.Effect<RequestResolver<A>>
  <A extends Request.Any>(
    self: RequestResolver<A>,
    options: { readonly capacity: number; readonly strategy?: "lru" | "fifo" | undefined }
  ): Effect.Effect<RequestResolver<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L1077)

Since v4.0.0

# combinators

## around

Wraps request resolver execution between `before` and `after` effects.

**Example** (Running effects around request resolution)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetDataRequest extends Request.Request<string> {
  readonly _tag: "GetDataRequest"
}
const GetDataRequest = Request.tagged<GetDataRequest>("GetDataRequest")

const resolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.sync(() => {
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed("data"))
    }
  })
)

// Add setup and cleanup around request execution
const resolverWithAround = RequestResolver.around(
  resolver,
  (entries) =>
    Effect.gen(function* () {
      yield* Effect.log(`Starting batch of ${entries.length} requests`)
      return entries.length
    }),
  (entries, initialSize) =>
    Effect.gen(function* () {
      yield* Effect.log(`Batch completed with ${entries.length} requests (started with ${initialSize})`)
    })
)
```

**Signature**

```ts
declare const around: {
  <A extends Request.Any, A2, X>(
    before: (entries: NonEmptyArray<Request.Entry<NoInfer<A>>>) => Effect.Effect<A2, Request.Error<A>>,
    after: (entries: NonEmptyArray<Request.Entry<NoInfer<A>>>, a: A2) => Effect.Effect<X, Request.Error<A>>
  ): (self: RequestResolver<A>) => RequestResolver<A>
  <A extends Request.Any, A2, X>(
    self: RequestResolver<A>,
    before: (entries: NonEmptyArray<Request.Entry<NoInfer<A>>>) => Effect.Effect<A2, Request.Error<A>>,
    after: (entries: NonEmptyArray<Request.Entry<NoInfer<A>>>, a: A2) => Effect.Effect<X, Request.Error<A>>
  ): RequestResolver<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L662)

Since v2.0.0

## batchN

Returns a request resolver that collects at most `n` requests into each
batch.

**Details**

When more than `n` requests are waiting for the same resolver and batch key,
the current batch is run and additional requests are collected into later
batches.

**Example** (Limiting parallel request batches)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetDataRequest extends Request.Request<string> {
  readonly _tag: "GetDataRequest"
  readonly id: number
}
const GetDataRequest = Request.tagged<GetDataRequest>("GetDataRequest")

const resolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.sync(() => {
    console.log(`Processing batch of ${entries.length} requests`)
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed(`data-${entry.request.id}`))
    }
  })
)

// Limit batches to maximum 5 requests
const limitedResolver = RequestResolver.batchN(resolver, 5)

// When more than 5 requests are made, they'll be split into multiple batches
const requests = Array.from({ length: 12 }, (_, i) => Effect.request(GetDataRequest({ id: i }), limitedResolver))
```

**Signature**

```ts
declare const batchN: {
  (n: number): <A extends Request.Any>(self: RequestResolver<A>) => RequestResolver<A>
  <A extends Request.Any>(self: RequestResolver<A>, n: number): RequestResolver<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L750)

Since v2.0.0

## grouped

Transforms a request resolver by grouping requests using the specified key
function.

**Example** (Grouping resolver requests)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetUserRequest extends Request.Request<string> {
  readonly _tag: "GetUserRequest"
  readonly userId: number
  readonly department: string
}
const GetUserRequest = Request.tagged<GetUserRequest>("GetUserRequest")

const resolver = RequestResolver.make<GetUserRequest>((entries) =>
  Effect.sync(() => {
    console.log(`Processing ${entries.length} users`)
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed(`User ${entry.request.userId}`))
    }
  })
)

// Group requests by department for more efficient processing
const groupedResolver = RequestResolver.grouped(resolver, ({ request }) => request.department)

// Requests for the same department will be batched together
const requests = [
  Effect.request(GetUserRequest({ userId: 1, department: "Engineering" }), groupedResolver),
  Effect.request(GetUserRequest({ userId: 2, department: "Engineering" }), groupedResolver),
  Effect.request(GetUserRequest({ userId: 3, department: "Marketing" }), groupedResolver)
]
```

**Signature**

```ts
declare const grouped: {
  <A extends Request.Any, K>(f: (entry: Request.Entry<A>) => K): (self: RequestResolver<A>) => RequestResolver<A>
  <A extends Request.Any, K>(self: RequestResolver<A>, f: (entry: Request.Entry<A>) => K): RequestResolver<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L810)

Since v4.0.0

## race

Returns a request resolver that sends each batch to both resolvers and
completes with the first resolver to finish.

**Details**

The losing resolver run is interrupted after the winning resolver completes
the batch.

**Example** (Racing request resolvers)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetDataRequest extends Request.Request<string> {
  readonly _tag: "GetDataRequest"
  readonly id: number
}
const GetDataRequest = Request.tagged<GetDataRequest>("GetDataRequest")

// Fast resolver (simulating cache)
const fastResolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.gen(function* () {
    yield* Effect.sleep("10 millis")
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed(`fast-${entry.request.id}`))
    }
  })
)

// Slow resolver (simulating database)
const slowResolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.gen(function* () {
    yield* Effect.sleep("100 millis")
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed(`slow-${entry.request.id}`))
    }
  })
)

// Race resolvers - will use whichever completes first
const racingResolver = RequestResolver.race(fastResolver, slowResolver)
```

**Signature**

```ts
declare const race: {
  <A2 extends Request.Any>(
    that: RequestResolver<A2>
  ): <A extends Request.Any>(self: RequestResolver<A>) => RequestResolver<A2 & A>
  <A extends Request.Any, A2 extends Request.Any>(
    self: RequestResolver<A>,
    that: RequestResolver<A2>
  ): RequestResolver<A & A2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L869)

Since v2.0.0

## withSpan

Adds a tracing span to the request resolver, which will also add any span
links from the request's.

**Example** (Adding a tracing span)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetDataRequest extends Request.Request<string> {
  readonly _tag: "GetDataRequest"
  readonly id: number
}
const GetDataRequest = Request.tagged<GetDataRequest>("GetDataRequest")

const resolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.sync(() => {
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed(`data-${entry.request.id}`))
    }
  })
)

// Add tracing span with custom name and attributes
const tracedResolver = RequestResolver.withSpan(resolver, "user-data-resolver", {
  attributes: {
    "resolver.type": "user-data",
    "resolver.version": "1.0"
  }
})

// Spans will automatically include batch size and request links
const effect = Effect.request(GetDataRequest({ id: 123 }), tracedResolver)
```

**Signature**

```ts
declare const withSpan: {
  <A extends Request.Any>(
    name: string,
    options?: Tracer.SpanOptions | ((entries: NonEmptyArray<Request.Entry<A>>) => Tracer.SpanOptions) | undefined
  ): (self: RequestResolver<A>) => RequestResolver<A>
  <A extends Request.Any>(
    self: RequestResolver<A>,
    name: string,
    options?: Tracer.SpanOptions | ((entries: NonEmptyArray<Request.Entry<A>>) => Tracer.SpanOptions) | undefined
  ): RequestResolver<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L927)

Since v4.0.0

# constructors

## fromEffect

Constructs a request resolver from an effectual function.

**Example** (Creating a resolver from an effectful function)

```ts
import { Effect, Request, RequestResolver } from "effect"

interface GetUserFromAPIRequest extends Request.Request<string> {
  readonly _tag: "GetUserFromAPIRequest"
  readonly id: number
}
const GetUserFromAPIRequest = Request.tagged<GetUserFromAPIRequest>("GetUserFromAPIRequest")

// Create a resolver that uses effects (like HTTP calls)
const UserAPIResolver = RequestResolver.fromEffect<GetUserFromAPIRequest>((entry) =>
  Effect.gen(function* () {
    // Simulate an API call
    yield* Effect.sleep("100 millis")
    // Just return the result without error handling for simplicity
    return `User ${entry.request.id} from API`
  })
)

// Usage
const getUserEffect = Effect.request(GetUserFromAPIRequest({ id: 123 }), UserAPIResolver)
```

**Signature**

```ts
declare const fromEffect: <A extends Request.Any>(
  f: (entry: Request.Entry<A>) => Effect.Effect<Request.Success<A>, Request.Error<A>>
) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L428)

Since v2.0.0

## fromEffectTagged

Constructs a request resolver from a list of tags paired to functions, that takes
a list of requests and returns a list of results of the same size. Each item
in the result list must correspond to the item at the same index in the
request list.

**Example** (Handling tagged request batches)

```ts
import { Effect, RequestResolver } from "effect"
import type { Request } from "effect"

interface GetUser extends Request.Request<string, Error> {
  readonly _tag: "GetUser"
  readonly id: number
}

interface GetPost extends Request.Request<string, Error> {
  readonly _tag: "GetPost"
  readonly id: number
}

type MyRequest = GetUser | GetPost

// Create a resolver that handles different request types
const MyResolver = RequestResolver.fromEffectTagged<MyRequest>()({
  GetUser: (requests) => Effect.succeed(requests.map((req) => `User ${req.request.id}`)),
  GetPost: (requests) => Effect.succeed(requests.map((req) => `Post ${req.request.id}`))
})
```

**Signature**

```ts
declare const fromEffectTagged: <A extends Request.Any & { readonly _tag: string }>() => <
  Fns extends {
    readonly [Tag in A["_tag"]]: [Extract<A, { readonly _tag: Tag }>] extends [infer Req]
      ? Req extends Request.Request<infer ReqA, infer ReqE, infer _ReqR>
        ? (requests: Array<Request.Entry<Req>>) => Effect.Effect<Iterable<ReqA>, ReqE>
        : never
      : never
  }
>(
  fns: Fns
) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L487)

Since v2.0.0

## fromFunction

Constructs a request resolver from a pure function.

**Example** (Creating a resolver from a pure function)

```ts
import { Effect, Request, RequestResolver } from "effect"

interface GetSquareRequest extends Request.Request<number> {
  readonly _tag: "GetSquareRequest"
  readonly value: number
}
const GetSquareRequest = Request.tagged<GetSquareRequest>("GetSquareRequest")

// Create a resolver from a pure function
const SquareResolver = RequestResolver.fromFunction<GetSquareRequest>(
  (entry) => entry.request.value * entry.request.value
)

// Usage
const getSquareEffect = Effect.request(GetSquareRequest({ value: 5 }), SquareResolver)
// Will resolve to 25
```

**Signature**

```ts
declare const fromFunction: <A extends Request.Any>(
  f: (entry: Request.Entry<A>) => Request.Success<A>
) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L333)

Since v2.0.0

## fromFunctionBatched

Constructs a request resolver from a pure function that takes a list of requests
and returns a list of results of the same size. Each item in the result
list must correspond to the item at the same index in the request list.

**Example** (Batching pure request handling)

```ts
import { Effect, Request, RequestResolver } from "effect"

interface GetDoubleRequest extends Request.Request<number> {
  readonly _tag: "GetDoubleRequest"
  readonly value: number
}
const GetDoubleRequest = Request.tagged<GetDoubleRequest>("GetDoubleRequest")

// Create a resolver that processes multiple requests in a batch
const DoubleResolver = RequestResolver.fromFunctionBatched<GetDoubleRequest>((entries) =>
  entries.map((entry) => entry.request.value * 2)
)

// Usage with multiple requests
const effects = [1, 2, 3].map((value) => Effect.request(GetDoubleRequest({ value }), DoubleResolver))
const batchedEffect = Effect.all(effects) // [2, 4, 6]
```

**Signature**

```ts
declare const fromFunctionBatched: <A extends Request.Any>(
  f: (entries: NonEmptyArray<Request.Entry<A>>) => Iterable<Request.Success<A>>
) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L377)

Since v2.0.0

## make

Constructs a request resolver with the specified method to run requests.

**Example** (Creating a request resolver)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

// Define a request type
interface GetUserRequest extends Request.Request<string, Error> {
  readonly _tag: "GetUserRequest"
  readonly id: number
}
const GetUserRequest = Request.tagged<GetUserRequest>("GetUserRequest")

// Create a resolver that handles the requests
const UserResolver = RequestResolver.make<GetUserRequest>((entries) =>
  Effect.sync(() => {
    for (const entry of entries) {
      // Complete each request with a result
      entry.completeUnsafe(Exit.succeed(`User ${entry.request.id}`))
    }
  })
)

// Use the resolver to handle requests
const getUserEffect = Effect.request(GetUserRequest({ id: 123 }), UserResolver)
```

**Signature**

```ts
declare const make: <A extends Request.Any>(
  runAll: (entries: NonEmptyArray<Request.Entry<A>>, key: unknown) => Effect.Effect<void, Request.Error<A>>
) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L232)

Since v2.0.0

## makeGrouped

Constructs a request resolver with the requests grouped by a calculated key.

**Details**

The key can use the Equal trait to determine if two keys are equal.

**Example** (Grouping requests by key)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetUserByRole extends Request.Request<string, Error> {
  readonly _tag: "GetUserByRole"
  readonly role: string
  readonly id: number
}
const GetUserByRole = Request.tagged<GetUserByRole>("GetUserByRole")

// Group requests by role for efficient batch processing
const UserByRoleResolver = RequestResolver.makeGrouped<GetUserByRole, string>({
  key: ({ request }) => request.role,
  resolver: (entries, role) =>
    Effect.sync(() => {
      console.log(`Processing ${entries.length} requests for role: ${role}`)
      for (const entry of entries) {
        entry.completeUnsafe(Exit.succeed(`User ${entry.request.id} with role ${role}`))
      }
    })
})
```

**Signature**

```ts
declare const makeGrouped: <A extends Request.Any, K>(options: {
  readonly key: (entry: Request.Entry<A>) => K
  readonly resolver: (entries: NonEmptyArray<Request.Entry<A>>, key: K) => Effect.Effect<void, Request.Error<A>>
}) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L279)

Since v4.0.0

## makeWith

Creates a request resolver with fine-grained
control over its behavior.

**When to use**

Use when you need to supply the resolver batching primitives directly,
including the batch key, optional pre-check, delay effect, collection cutoff,
and batch runner.

**Details**

`batchKey` groups request entries, `delay` schedules batch execution,
`collectWhile` can end collection early, and `runAll` receives a non-empty
batch for one key.

**Gotchas**

Accepted entries must be completed. If `runAll` succeeds with incomplete
entries, waiting requests fail. If `preCheck` returns `false`, the entry is
not batched, so it must be completed or linked to another completion path.

**See**

- `make` for constructing a resolver from a batch runner
- `makeGrouped` for constructing a resolver that groups requests by key

**Signature**

```ts
declare const makeWith: <A extends Request.Any>(options: {
  readonly batchKey: (request: Request.Entry<A>) => unknown
  readonly preCheck?: ((entry: Request.Entry<A>) => boolean) | undefined
  readonly delay: Effect.Effect<void>
  readonly collectWhile: (requests: ReadonlySet<Request.Entry<A>>) => boolean
  readonly runAll: (entries: NonEmptyArray<Request.Entry<A>>, key: unknown) => Effect.Effect<void, Request.Error<A>>
}) => RequestResolver<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L181)

Since v4.0.0

## never

Creates a request resolver that never executes requests.

**When to use**

Use as a resolver value for request types that are statically impossible and
should never be issued.

**Gotchas**

If this resolver is used for an actual request, the request waits forever
unless the fiber is interrupted.

**See**

- `make` for constructing a resolver that executes batches and completes request entries

**Signature**

```ts
declare const never: RequestResolver<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L705)

Since v2.0.0

# delay

## setDelay

Sets the batch delay window for this request resolver to the specified duration.

**Example** (Setting a batch delay)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetDataRequest extends Request.Request<string> {
  readonly _tag: "GetDataRequest"
}
const GetDataRequest = Request.tagged<GetDataRequest>("GetDataRequest")

const resolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.sync(() => {
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed("data"))
    }
  })
)

// Add a 100ms delay to batch requests together
const delayedResolver = RequestResolver.setDelay(resolver, "100 millis")

// Can also use number for milliseconds
const delayedResolver2 = RequestResolver.setDelay(resolver, 100)
```

**Signature**

```ts
declare const setDelay: {
  (duration: Duration.Input): <A extends Request.Any>(self: RequestResolver<A>) => RequestResolver<A>
  <A extends Request.Any>(self: RequestResolver<A>, duration: Duration.Input): RequestResolver<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L609)

Since v4.0.0

## setDelayEffect

Sets the batch delay effect for this request resolver.

**Example** (Setting an effectful batch delay)

```ts
import { Effect, Exit, Request, RequestResolver } from "effect"

interface GetDataRequest extends Request.Request<string> {
  readonly _tag: "GetDataRequest"
}
const GetDataRequest = Request.tagged<GetDataRequest>("GetDataRequest")

const resolver = RequestResolver.make<GetDataRequest>((entries) =>
  Effect.sync(() => {
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed("data"))
    }
  })
)

// Set a custom delay effect (e.g., with logging)
const resolverWithCustomDelay = RequestResolver.setDelayEffect(
  resolver,
  Effect.gen(function* () {
    yield* Effect.log("Waiting before processing batch...")
    yield* Effect.sleep("50 millis")
  })
)
```

**Signature**

```ts
declare const setDelayEffect: {
  (delay: Effect.Effect<void>): <A extends Request.Any>(self: RequestResolver<A>) => RequestResolver<A>
  <A extends Request.Any>(self: RequestResolver<A>, delay: Effect.Effect<void>): RequestResolver<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L566)

Since v4.0.0

# guards

## isRequestResolver

Returns `true` if the specified value is a `RequestResolver`, `false` otherwise.

**When to use**

Use to narrow unknown values before passing them to APIs that require a
`RequestResolver`.

**See**

- `RequestResolver` for the type narrowed by this guard

**Signature**

```ts
declare const isRequestResolver: (u: unknown) => u is RequestResolver<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L151)

Since v2.0.0

# models

## RequestResolver (interface)

A resolver that executes and completes batched `Request` entries.

**Details**

A resolver controls how requests are grouped, delayed, optionally
pre-checked, and finally run. Its `runAll` method receives a non-empty batch
of `Request.Entry` values for a single batch key and must complete every
received entry, usually by calling `completeUnsafe` or one of the `Request`
completion helpers.

**Gotchas**

If a resolver finishes without completing an entry, the waiting request fails
because the resolver did not supply a result.

**Example** (Defining a request resolver)

```ts
import { Effect, Exit, RequestResolver } from "effect"
import type { Request } from "effect"

interface GetUserRequest extends Request.Request<string, Error> {
  readonly _tag: "GetUserRequest"
  readonly id: number
}

// In practice, you would typically use RequestResolver.make() instead
const resolver = RequestResolver.make<GetUserRequest>((entries) =>
  Effect.sync(() => {
    for (const entry of entries) {
      entry.completeUnsafe(Exit.succeed(`User ${entry.request.id}`))
    }
  })
)
```

**Signature**

```ts
export interface RequestResolver<in A extends Request.Any> extends RequestResolver.Variance<A>, Pipeable {
  readonly delay: Effect.Effect<void>

  /**
   * Get a batch key for the given request.
   */
  batchKey(entry: Request.Entry<A>): unknown

  /**
   * An optional pre-check function that can be used to filter requests before
   * they are added to a batch. If the function returns `false`, the request
   * will not be processed.
   */
  readonly preCheck: ((entry: Request.Entry<A>) => boolean) | undefined

  /**
   * Should the resolver continue collecting requests? Otherwise, it will
   * immediately execute the collected requests cutting the delay short.
   */
  collectWhile(entries: ReadonlySet<Request.Entry<A>>): boolean

  /**
   * Execute a collection of requests.
   */
  runAll(entries: NonEmptyArray<Request.Entry<A>>, key: unknown): Effect.Effect<void, Request.Error<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L77)

Since v2.0.0

# utils

## RequestResolver (namespace)

Namespace containing type-level helpers associated with `RequestResolver`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L109)

Since v2.0.0

### Variance (interface)

Variance marker carried by every `RequestResolver`.

**Details**

This marker preserves the request type accepted by the resolver for
Effect's type-level machinery. Users normally do not implement it directly.

**Signature**

```ts
export interface Variance<in A> {
  readonly [TypeId]: {
    readonly _A: Types.Contravariant<A>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RequestResolver.ts#L121)

Since v2.0.0
