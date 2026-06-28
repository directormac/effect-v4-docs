---
title: Sink.ts
nav_order: 110
parent: "effect"
---

## Sink.ts overview

Consumes values from a `Stream` and produces one final result.

A `Sink` may read no input, a fixed amount of input, or keep reading until a
condition is met. If it reads more than it needs, it can return leftovers so
the stream can continue from those values. Sinks are used to collect, fold,
search, count, or otherwise reduce streamed input, and they can be composed
when a stream needs more than one consuming step.

Since v2.0.0

---

## Exports Grouped by Category

- [Finalization](#finalization)
  - [ensuring](#ensuring)
  - [onExit](#onexit)
- [collecting](#collecting)
  - [take](#take)
- [constructors](#constructors)
  - [collect](#collect)
  - [count](#count)
  - [die](#die)
  - [drain](#drain)
  - [every](#every)
  - [fail](#fail)
  - [failCause](#failcause)
  - [failCauseSync](#failcausesync)
  - [failSync](#failsync)
  - [find](#find)
  - [findEffect](#findeffect)
  - [forEach](#foreach)
  - [forEachArray](#foreacharray)
  - [forEachWhile](#foreachwhile)
  - [forEachWhileArray](#foreachwhilearray)
  - [fromChannel](#fromchannel)
  - [fromEffect](#fromeffect)
  - [fromEffectEnd](#fromeffectend)
  - [fromPubSub](#frompubsub)
  - [fromQueue](#fromqueue)
  - [fromTransform](#fromtransform)
  - [head](#head)
  - [last](#last)
  - [make](#make)
  - [never](#never)
  - [some](#some)
  - [succeed](#succeed)
  - [sum](#sum)
  - [suspend](#suspend)
  - [sync](#sync)
  - [takeUntil](#takeuntil)
  - [takeUntilEffect](#takeuntileffect)
  - [takeWhile](#takewhile)
  - [takeWhileEffect](#takewhileeffect)
  - [takeWhileFilter](#takewhilefilter)
  - [takeWhileFilterEffect](#takewhilefiltereffect)
  - [timed](#timed)
  - [toChannel](#tochannel)
  - [unwrap](#unwrap)
- [error handling](#error-handling)
  - [catch](#catch)
  - [catchCause](#catchcause)
  - [orElse](#orelse)
- [filtering](#filtering)
  - [ignoreLeftover](#ignoreleftover)
- [folding](#folding)
  - [fold](#fold)
  - [foldArray](#foldarray)
  - [foldUntil](#folduntil)
- [guards](#guards)
  - [isSink](#issink)
- [mapping](#mapping)
  - [as](#as)
  - [map](#map)
  - [mapEffect](#mapeffect)
  - [mapEffectEnd](#mapeffectend)
  - [mapEnd](#mapend)
  - [mapError](#maperror)
  - [mapInput](#mapinput)
  - [mapInputArray](#mapinputarray)
  - [mapInputArrayEffect](#mapinputarrayeffect)
  - [mapInputEffect](#mapinputeffect)
  - [mapLeftover](#mapleftover)
  - [summarized](#summarized)
  - [withDuration](#withduration)
- [models](#models)
  - [End (type alias)](#end-type-alias)
  - [Sink (interface)](#sink-interface)
  - [SinkUnify (interface)](#sinkunify-interface)
  - [SinkUnifyIgnore (interface)](#sinkunifyignore-interface)
- [reducing](#reducing)
  - [reduce](#reduce)
  - [reduceArray](#reducearray)
  - [reduceEffect](#reduceeffect)
  - [reduceWhile](#reducewhile)
  - [reduceWhileArray](#reducewhilearray)
  - [reduceWhileArrayEffect](#reducewhilearrayeffect)
  - [reduceWhileEffect](#reducewhileeffect)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
- [services](#services)
  - [provideContext](#providecontext)
  - [provideService](#provideservice)
- [utils](#utils)
  - [Sink (namespace)](#sink-namespace)
    - [Variance (interface)](#variance-interface)
    - [VarianceStruct (interface)](#variancestruct-interface)
  - [make (namespace)](#make-namespace)
    - [Constructor (interface)](#constructor-interface)

---

# Finalization

## ensuring

Runs a finalizer effect after this sink completes, fails, or is interrupted.

**Details**

The original sink result and leftovers are preserved unless the finalizer
itself fails.

**Signature**

```ts
declare const ensuring: {
  <X, E2, R2>(
    effect: Effect.Effect<X, E2, R2>
  ): <A, E, In, L, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, L, E | E2, R2 | R>
  <A, In, L, E, R, X, E2, R2>(
    self: Sink<A, In, L, E, R>,
    effect: Effect.Effect<X, E2, R2>
  ): Sink<A, In, L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L2163)

Since v2.0.0

## onExit

Runs an effect after this sink completes, fails, or is interrupted.

**Details**

The effect receives the sink's `Exit` for the result value. The original
sink result and leftovers are preserved unless the finalizer itself fails.

**Signature**

```ts
declare const onExit: {
  <A, E, X, E2, R2>(
    f: (exit: Exit.Exit<A, E>) => Effect.Effect<X, E2, R2>
  ): <In, L, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, L, E | E2, R2 | R>
  <A, In, L, E, R, X, E2, R2>(
    self: Sink<A, In, L, E, R>,
    f: (exit: Exit.Exit<A, E>) => Effect.Effect<X, E2, R2>
  ): Sink<A, In, L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L2135)

Since v4.0.0

# collecting

## take

Collects up to `n` input elements into an array.

**Details**

If `n` is less than or equal to zero, the sink completes with an empty array.
If more elements are pulled than needed, the remaining elements from the same
array are returned as leftovers.

**Signature**

```ts
declare const take: <In>(n: number) => Sink<Array<In>, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1121)

Since v2.0.0

# constructors

## collect

Accumulates incoming elements into an array.

**When to use**

Use when you need a sink result containing all upstream input elements.

**See**

- `take` for collecting only a fixed number of input elements

**Signature**

```ts
declare const collect: <In>() => Sink<Array<In>, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1539)

Since v4.0.0

## count

A sink that counts the number of elements fed to it.

**When to use**

Use to consume input and return only the number of elements received.

**Signature**

```ts
declare const count: Sink<number, unknown, never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1525)

Since v2.0.0

## die

Creates a sink halting with a specified defect.

**Example** (Dying with a defect)

```ts
import { Effect, Sink, Stream } from "effect"

// Create a sink that dies with a defect
const sink = Sink.die(new Error("Defect error"))

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).catch(console.log)
// Output: Error: Defect error
```

**Signature**

```ts
declare const die: (defect: unknown) => Sink<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L655)

Since v2.0.0

## drain

Consumes and ignores all stream inputs.

**When to use**

Use to consume all upstream input and complete with void when the input
values and any aggregate result are not needed.

**See**

- `count` for consuming all input while returning the number of elements
- `forEach` for consuming all input while running an effect for each element

**Signature**

```ts
declare const drain: Sink<void, unknown, never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L694)

Since v2.0.0

## every

A sink that returns whether all elements satisfy the specified predicate.

**When to use**

Use to reduce a stream to a boolean that is true only when every input
satisfies a pure predicate.

**See**

- `some` for the dual any-match check

**Signature**

```ts
declare const every: <In>(predicate: Predicate<In>) => Sink<boolean, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L824)

Since v2.0.0

## fail

A sink that always fails with the specified error.

**Example** (Failing with an error)

```ts
import { Effect, Sink, Stream } from "effect"

// Create a sink that always fails
const sink = Sink.fail(new Error("Sink failed"))

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).catch(console.log)
// Output: Error: Sink failed
```

**Signature**

```ts
declare const fail: <E>(e: E) => Sink<never, unknown, never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L556)

Since v2.0.0

## failCause

Creates a sink halting with a specified `Cause`.

**Example** (Failing with a cause)

```ts
import { Cause, Effect, Sink, Stream } from "effect"

// Create a sink that fails with a specific cause
const sink = Sink.failCause(Cause.fail(new Error("Custom cause")))

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).catch(console.log)
// Output: Error: Custom cause
```

**Signature**

```ts
declare const failCause: <E>(cause: Cause.Cause<E>) => Sink<never, unknown, never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L605)

Since v2.0.0

## failCauseSync

Creates a sink halting with a specified lazily evaluated `Cause`.

**Example** (Failing with a lazy cause)

```ts
import { Cause, Effect, Sink, Stream } from "effect"

// Create a sink that fails with a lazy cause
const sink = Sink.failCauseSync(() => Cause.fail(new Error("Lazy cause")))

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).catch(console.log)
// Output: Error: Lazy cause
```

**Signature**

```ts
declare const failCauseSync: <E>(evaluate: LazyArg<Cause.Cause<E>>) => Sink<never, unknown, never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L630)

Since v2.0.0

## failSync

A sink that always fails with the specified lazily evaluated error.

**Example** (Failing with a lazy error)

```ts
import { Effect, Sink, Stream } from "effect"

// Create a sink that fails with a lazy error
const sink = Sink.failSync(() => new Error("Lazy error"))

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).catch(console.log)
// Output: Error: Lazy error
```

**Signature**

```ts
declare const failSync: <E>(evaluate: LazyArg<E>) => Sink<never, unknown, never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L580)

Since v2.0.0

## find

Creates a sink containing the first value matched by a synchronous predicate.

**When to use**

Use to scan stream input until the first matching element is found and return
that element as an `Option`.

**Details**

Returns `Option.none` if the upstream stream ends before a match is found.
Refinement predicates narrow the returned value type. The matching input is
consumed; any later elements from the same pulled array are returned as
leftovers.

**See**

- `findEffect` for an effectful predicate that can fail or require services

**Signature**

```ts
declare const find: {
  <In, Out extends In>(refinement: Refinement<In, Out>): Sink<Option.Option<Out>, In, In>
  <In>(predicate: Predicate<In>): Sink<Option.Option<In>, In, In>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1464)

Since v4.0.0

## findEffect

Creates a sink containing the first value matched by an effectful predicate.

**When to use**

Use when you need to run effects, fail, or use services while searching for
the first matching input.

**Details**

Returns `Option.some` with the first input whose predicate result is `true`,
or `Option.none` if the upstream stream ends first. If the predicate effect
fails, the sink fails with the same error.

**See**

- `find` for the synchronous predicate variant

**Signature**

```ts
declare const findEffect: <In, E, R>(
  predicate: (input: In) => Effect.Effect<boolean, E, R>
) => Sink<Option.Option<In>, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1493)

Since v2.0.0

## forEach

A sink that executes the provided effectful function for every item fed
to it.

**Example** (Running effects for each item)

```ts
import { Console, Effect, Sink, Stream } from "effect"

// Create a sink that logs each item
const sink = Sink.forEach((item: number) => Console.log(`Processing: ${item}`))

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program)
// Output:
// Processing: 1
// Processing: 2
// Processing: 3
```

**Signature**

```ts
declare const forEach: <In, X, E, R>(f: (input: In) => Effect.Effect<X, E, R>) => Sink<void, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1779)

Since v2.0.0

## forEachArray

A sink that executes the provided effectful function for every Chunk fed
to it.

**Example** (Running effects for each chunk)

```ts
import { Console, Effect, Sink, Stream } from "effect"

// Create a sink that processes chunks
const sink = Sink.forEachArray((chunk: ReadonlyArray<number>) =>
  Console.log(`Processing chunk of ${chunk.length} items: [${chunk.join(", ")}]`)
)

// Use it with a stream
const stream = Stream.make(1, 2, 3, 4, 5)
const program = Stream.run(stream, sink)

Effect.runPromise(program)
// Output: Processing chunk of 5 items: [1, 2, 3, 4, 5]
```

**Signature**

```ts
declare const forEachArray: <In, X, E, R>(
  f: (input: NonEmptyReadonlyArray<In>) => Effect.Effect<X, E, R>
) => Sink<void, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1810)

Since v4.0.0

## forEachWhile

Runs an effectful function for each input element while it returns `true`.

**Details**

The sink stops consuming input when the function returns `false` or when the
upstream stream ends, and completes with `void`.

**Signature**

```ts
declare const forEachWhile: <In, E, R>(f: (input: In) => Effect.Effect<boolean, E, R>) => Sink<void, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1832)

Since v2.0.0

## forEachWhileArray

Runs an effectful function for each non-empty input array while it returns
`true`.

**Details**

The sink stops consuming input when the function returns `false` or when the
upstream stream ends, and completes with `void`.

**Signature**

```ts
declare const forEachWhileArray: <In, E, R>(
  f: (input: NonEmptyReadonlyArray<In>) => Effect.Effect<boolean, E, R>
) => Sink<void, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1855)

Since v4.0.0

## fromChannel

Creates a sink from a `Channel`.

**When to use**

Use to create a `Sink` from a `Channel` that processes non-empty arrays of
input values.

**See**

- `toChannel` for converting a `Sink` back to a `Channel`

**Signature**

```ts
declare const fromChannel: <L, In, E, A, R>(
  channel: Channel.Channel<never, E, End<A, L>, NonEmptyReadonlyArray<In>, never, void, R>
) => Sink<A, In, L, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L224)

Since v2.0.0

## fromEffect

Creates a sink that ignores upstream input and completes with the success
value of the provided effect.

**Details**

If the effect fails, the sink fails with the same error.

**Signature**

```ts
declare const fromEffect: <A, E, R>(effect: Effect.Effect<A, E, R>) => Sink<A, unknown, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L449)

Since v2.0.0

## fromEffectEnd

Creates a sink that ignores upstream input and completes from an effect that
already returns an `End`.

**When to use**

Use when you need to create a sink from an effect that returns both the sink
result value and optional leftovers.

**Signature**

```ts
declare const fromEffectEnd: <A, E, R, L = never>(effect: Effect.Effect<End<A, L>, E, R>) => Sink<A, unknown, L, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L434)

Since v4.0.0

## fromPubSub

Creates a sink that publishes every consumed input element to a `PubSub`.

**Details**

The sink completes with `void` when the upstream stream ends.

**Signature**

```ts
declare const fromPubSub: <A>(pubsub: PubSub.PubSub<A>) => Sink<void, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L488)

Since v2.0.0

## fromQueue

Creates a sink that offers every consumed input element to a queue.

**Details**

When the upstream stream ends, the sink ends the queue and completes with
`void`.

**Signature**

```ts
declare const fromQueue: <A>(queue: Queue.Queue<A, Cause.Done>) => Sink<void, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L464)

Since v2.0.0

## fromTransform

Creates a `Sink` from a low-level transform function.

**Details**

The transform receives the upstream pull of non-empty input arrays and the
active scope, and returns an effect that completes with the sink's `End`
value.

**Signature**

```ts
declare const fromTransform: <In, A, E, R, L = never>(
  transform: (
    upstream: Pull.Pull<NonEmptyReadonlyArray<In>, never, void>,
    scope: Scope.Scope
  ) => Effect.Effect<End<A, L>, E, R>
) => Sink<A, In, L, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L254)

Since v4.0.0

## head

Creates a sink containing the first value.

**Details**

Returns `Option.some(first)` for non-empty input, or `Option.none` when the
upstream ends without input. The first element is consumed; later elements
from the same pulled array are emitted as leftovers.

**Signature**

```ts
declare const head: <In>() => Sink<Option.Option<In>, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1415)

Since v2.0.0

## last

Creates a sink containing the last value.

**When to use**

Use when you need to consume all upstream input and keep only the final
element.

**Details**

Returns `Option.some(last)` with the final input value, or `Option.none` when
the upstream ends without input.

**Gotchas**

This sink produces a result only when the upstream ends, so it does not
complete for a stream that does not end.

**See**

- `head` for taking the first input value instead

**Signature**

```ts
declare const last: <In>() => Sink<Option.Option<In>, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1442)

Since v2.0.0

## make

Creates a pipe-style constructor for sinks over input type `In`.

**Details**

The returned function exposes the sink input as a `Stream<In>`, applies the
provided pipeline, and uses the final effect's success value as the sink
result.

**Signature**

```ts
declare const make: <In>() => make.Constructor<In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L303)

Since v4.0.0

## never

A sink that never completes.

**Signature**

```ts
declare const never: Sink<unknown, unknown, never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L663)

Since v2.0.0

## some

A sink that returns whether an element satisfies the specified predicate.

**When to use**

Use to reduce a stream to a boolean that is true when any input satisfies a
pure predicate.

**See**

- `every` for the all-match check

**Signature**

```ts
declare const some: <In>(predicate: Predicate<In>) => Sink<boolean, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L844)

Since v2.0.0

## succeed

A sink that immediately ends with the specified value.

**Example** (Succeeding with a value)

```ts
import { Effect, Sink, Stream } from "effect"

// Create a sink that always yields the same value
const sink = Sink.succeed(42)

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).then(console.log)
// Output: 42
```

**Signature**

```ts
declare const succeed: <A, L = never>(a: A, leftovers?: NonEmptyReadonlyArray<L> | undefined) => Sink<A, unknown, L>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L514)

Since v2.0.0

## sum

Creates a sink which sums up its inputs.

**Signature**

```ts
declare const sum: Sink<number, number, never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1508)

Since v2.0.0

## suspend

A sink that is created from a lazily evaluated sink.

**Signature**

```ts
declare const suspend: <A, In, L, E, R>(evaluate: LazyArg<Sink<A, In, L, E, R>>) => Sink<A, In, L, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L531)

Since v2.0.0

## sync

A sink that immediately ends with the specified lazily evaluated value.

**Signature**

```ts
declare const sync: <A>(a: LazyArg<A>) => Sink<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L523)

Since v2.0.0

## takeUntil

Collects input elements until the predicate returns `true`, including the
matching element in the result.

**Signature**

```ts
declare const takeUntil: <In>(predicate: Predicate<In>) => Sink<Array<In>, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1716)

Since v4.0.0

## takeUntilEffect

Collects input elements effectfully until the predicate returns `true`,
including the matching element in the result.

**Details**

If the predicate effect fails, the sink fails with the same error.

**Signature**

```ts
declare const takeUntilEffect: <In, E, R>(
  predicate: (input: In) => Effect.Effect<boolean, E, R>
) => Sink<Array<In>, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1737)

Since v4.0.0

## takeWhile

Collects the longest input prefix whose elements satisfy the predicate or
refinement.

**Details**

The first failing input is consumed and excluded from the result. Any later
elements from the same pulled array are returned as leftovers.

**Signature**

```ts
declare const takeWhile: {
  <In, Out extends In>(refinement: Refinement<In, Out>): Sink<Array<Out>, In, In>
  <In>(predicate: Predicate<In>): Sink<Array<In>, In, In>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1557)

Since v4.0.0

## takeWhileEffect

Collects input elements effectfully while the predicate succeeds.

**Details**

The first input for which the predicate returns `false` is consumed and
excluded from the result. Any later elements from the same pulled array are
returned as leftovers.

**Signature**

```ts
declare const takeWhileEffect: <In, E, R>(
  predicate: (input: In) => Effect.Effect<boolean, E, R>
) => Sink<Array<In>, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1630)

Since v4.0.0

## takeWhileFilter

Applies a `Filter` to input elements while it succeeds, collecting each
successful output.

**Details**

The first input for which the filter fails is consumed and excluded from the
result. Any later elements from the same pulled array are returned as
leftovers.

**Signature**

```ts
declare const takeWhileFilter: <In, Out, X>(filter: Filter.Filter<In, Out, X>) => Sink<Array<Out>, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1594)

Since v4.0.0

## takeWhileFilterEffect

Applies a `FilterEffect` to input elements effectfully while it succeeds,
collecting each successful output.

**Details**

The first input for which the filter fails is consumed and excluded from the
result. Any later elements from the same pulled array are returned as
leftovers.

**Signature**

```ts
declare const takeWhileFilterEffect: <In, Out, X, E, R>(
  filter: Filter.FilterEffect<In, Out, X, E, R>
) => Sink<Array<Out>, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1680)

Since v4.0.0

## timed

A sink that drains all input and returns the elapsed duration.

**Signature**

```ts
declare const timed: Sink<Duration.Duration, unknown, never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1944)

Since v2.0.0

## toChannel

Creates a `Channel` from a Sink.

**Example** (Converting a sink to a channel)

```ts
import { Sink } from "effect"

// Create a sink and extract its channel
const sink = Sink.succeed(42)
const channel = Sink.toChannel(sink)
```

**Signature**

```ts
declare const toChannel: <A, In, L, E, R>(
  self: Sink<A, In, L, E, R>
) => Channel.Channel<never, E, End<A, L>, NonEmptyReadonlyArray<In>, never, void, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L281)

Since v2.0.0

## unwrap

Creates a sink produced from a scoped effect.

**Example** (Unwrapping a sink effect)

```ts
import { Console, Effect, Sink, Stream } from "effect"

// Create a sink from an effect that produces a sink
const sinkEffect = Effect.succeed(Sink.forEach((item: number) => Console.log(`Item: ${item}`)))
const sink = Sink.unwrap(sinkEffect)

// Use it with a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program)
// Output:
// Item: 1
// Item: 2
// Item: 3
```

**Signature**

```ts
declare const unwrap: <A, In, L, E, R, R2>(
  effect: Effect.Effect<Sink<A, In, L, E, R2>, E, R>
) => Sink<A, In, L, E, Exclude<R, Scope.Scope> | R2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1895)

Since v2.0.0

# error handling

## catch

Handles typed errors from this sink with an effectful fallback value.

**When to use**

Use to recover from a typed sink failure by producing the replacement
result with an `Effect`.

**See**

- `catchCause` for recovering from the full failure cause
- `orElse` for recovering by switching to another sink

**Signature**

```ts
declare const catch: { <E, A2, E2, R2>(f: (error: Types.NoInfer<E>) => Effect.Effect<A2, E2, R2>): <A, In, L, R>(self: Sink<A, In, L, E, R>) => Sink<A2 | A, In, L, E, R2 | R>; <A, In, L, E, R, A2, E2, R2>(self: Sink<A, In, L, E, R>, f: (error: E) => Effect.Effect<A2, E2, R2>): Sink<A | A2, In, L, E2, R | R2>; }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L2121)

Since v4.0.0

## catchCause

Handles failures from this sink by inspecting the full `Cause`.

**When to use**

Use to recover from a sink failure based on the full `Cause` instead of only
the typed error value.

**Details**

When this sink fails, the handler effect is run and its success value
becomes the sink result. If the handler fails, the returned sink fails with
that error.

**See**

- `catch` for recovering from typed errors only
- `orElse` for recovering by switching to another sink

**Signature**

```ts
declare const catchCause: {
  <E, A2, E2, R2>(
    f: (error: Cause.Cause<Types.NoInfer<E>>) => Effect.Effect<A2, E2, R2>
  ): <A, In, L, R>(self: Sink<A, In, L, E, R>) => Sink<A2 | A, In, L, E, R2 | R>
  <A, In, L, E, R, A2, E2, R2>(
    self: Sink<A, In, L, E, R>,
    f: (error: Cause.Cause<E>) => Effect.Effect<A2, E2, R2>
  ): Sink<A | A2, In, L, E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L2072)

Since v4.0.0

## orElse

Runs a fallback sink if this sink fails with a typed error.

**Details**

The fallback is built from the error and continues consuming from the same
upstream stream. If the upstream stream had already ended, the fallback sees
the upstream end instead.

**Signature**

```ts
declare const orElse: {
  <E, A2, In2, L2, E2, R2>(
    f: (error: Types.NoInfer<E>) => Sink<A2, In2, L2, E2, R2>
  ): <A, In, L, R>(self: Sink<A, In, L, E, R>) => Sink<A2 | A, In & In2, L2 | L, E2 | E, R2 | R>
  <A, In, L, E, R, A2, In2, L2, E2, R2>(
    self: Sink<A, In, L, E, R>,
    f: (error: E) => Sink<A2, In2, L2, E2, R2>
  ): Sink<A | A2, In & In2, L | L2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L2019)

Since v2.0.0

# filtering

## ignoreLeftover

Drops leftovers produced by a sink.

**Details**

The sink result is preserved, but any leftover elements are discarded
instead of being returned to downstream sink composition. This does not
continue pulling additional elements from the upstream stream.

**Signature**

```ts
declare const ignoreLeftover: <A, In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L677)

Since v2.0.0

# folding

## fold

A sink that folds its inputs with the provided function, termination
predicate and initial state.

**When to use**

Use to accumulate stream input element by element with an effectful step and
stop based on the accumulated state.

**Details**

The initial state is evaluated lazily. Each input element is folded with the
effectful function, and the sink continues while `contFn` returns `true`. If
the sink stops in the middle of a pulled array, the remaining elements from
that array are returned as leftovers.

**See**

- `foldArray` for folding each pulled non-empty input array at once
- `foldUntil` for folding until a fixed maximum number of elements is consumed

**Signature**

```ts
declare const fold: <S, In, E = never, R = never>(
  s: LazyArg<S>,
  contFn: Predicate<S>,
  f: (s: S, input: In) => Effect.Effect<S, E, R>
) => Sink<S, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L723)

Since v2.0.0

## foldArray

Folds non-empty input arrays into state with an effectful function.

**When to use**

Use to update state with an effectful function once per pulled non-empty
input array when batch-level processing is the natural unit.

**Details**

The initial state is evaluated lazily. After each pulled array is folded,
the sink continues while `contFn` returns `true`; otherwise it completes
with the current state.

**See**

- `fold` for folding element by element and returning leftovers when stopping mid-array
- `reduceWhileArrayEffect` for array-level effectful reducing that checks the predicate before consuming input

**Signature**

```ts
declare const foldArray: <S, In, E = never, R = never>(
  s: LazyArg<S>,
  contFn: Predicate<S>,
  f: (s: S, input: Arr.NonEmptyReadonlyArray<In>) => Effect.Effect<S, E, R>
) => Sink<S, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L767)

Since v4.0.0

## foldUntil

Folds input elements into state until the specified maximum number of
elements has been consumed or the upstream stream ends.

**Details**

If the sink stops in the middle of a pulled array, the remaining elements
from that array are returned as leftovers.

**Signature**

```ts
declare const foldUntil: <S, In, E = never, R = never>(
  s: LazyArg<S>,
  max: number,
  f: (s: S, input: In) => Effect.Effect<S, E, R>
) => Sink<S, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L798)

Since v2.0.0

# guards

## isSink

Checks whether a value is a Sink.

**Example** (Checking for a sink)

```ts
import { Sink } from "effect"

const sink = Sink.never
const notStream = { data: [1, 2, 3] }

console.log(Sink.isSink(sink)) // true
console.log(Sink.isSink(notStream)) // false
```

**Signature**

```ts
declare const isSink: (u: unknown) => u is Sink<unknown, never, unknown, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L210)

Since v4.0.0

# mapping

## as

Sets the sink's result to a constant value.

**When to use**

Use to keep a sink's input consumption, errors, requirements, and leftovers
while replacing only its result with a known value.

**See**

- `map` for computing the replacement from the original result

**Signature**

```ts
declare const as: {
  <A2>(a2: A2): <A, In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A2, In, L, E, R>
  <A, In, L, E, R, A2>(self: Sink<A, In, L, E, R>, a2: A2): Sink<A2, In, L, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L893)

Since v2.0.0

## map

Transforms this sink's result.

**When to use**

Use to compute a new result from the original sink result while preserving
the sink's input consumption behavior.

**Details**

The transformed sink preserves the original sink's input type, leftovers,
errors, and requirements.

**See**

- `mapEffect` for effectful result transformations
- `as` for replacing the result with a constant value
- `mapEnd` for transforming both the result and leftovers

**Signature**

```ts
declare const map: {
  <A, A2>(f: (a: A) => A2): <In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A2, In, L, E, R>
  <A, In, L, E, R, A2>(self: Sink<A, In, L, E, R>, f: (a: A) => A2): Sink<A2, In, L, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L871)

Since v2.0.0

## mapEffect

Transforms this sink's result effectfully.

**When to use**

Use when you need a sink result transformation that is effectful, can fail,
or requires services.

**Details**

The transformed sink preserves the original sink's input consumption and
leftovers while adding the errors and requirements of the transformation.

**See**

- `map` for pure result transformations
- `mapEffectEnd` for effectfully transforming both the result and leftovers
- `flatMap` for continuing with another sink based on the result

**Signature**

```ts
declare const mapEffect: {
  <A, A2, E2, R2>(
    f: (a: A) => Effect.Effect<A2, E2, R2>
  ): <In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A2, In, L, E2 | E, R2 | R>
  <A, In, L, E, R, A2, E2, R2>(
    self: Sink<A, In, L, E, R>,
    f: (a: A) => Effect.Effect<A2, E2, R2>
  ): Sink<A2, In, L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1068)

Since v2.0.0

## mapEffectEnd

Transforms the full `End` produced by this sink effectfully.

**Details**

This can change both the result value and the optional leftovers, and the
transformation can fail or require services.

**Signature**

```ts
declare const mapEffectEnd: {
  <A, L, A2, E2, R2, L2 = never>(
    f: (end: End<A, L>) => Effect.Effect<End<A2, L2>, E2, R2>
  ): <In, E, R>(self: Sink<A, In, L, E, R>) => Sink<A2, In, L2, E2 | E, R2 | R>
  <A, In, L, E, R, A2, E2, R2, L2 = never>(
    self: Sink<A, In, L, E, R>,
    f: (end: End<A, L>) => Effect.Effect<End<A2, L2>, E2, R2>
  ): Sink<A2, In, L2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1035)

Since v4.0.0

## mapEnd

Transforms the full `End` produced by this sink.

**Details**

This can change both the result value and the optional leftovers.

**Signature**

```ts
declare const mapEnd: {
  <A, L, A2, L2 = never>(
    f: (a: End<A, L>) => End<A2, L2>
  ): <In, E, R>(self: Sink<A, In, L, E, R>) => Sink<A2, In, L2, E, R>
  <A, In, L, E, R, A2, L2 = never>(self: Sink<A, In, L, E, R>, f: (a: End<A, L>) => End<A2, L2>): Sink<A2, In, L2, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1000)

Since v4.0.0

## mapError

Transforms the errors emitted by this sink using `f`.

**Signature**

```ts
declare const mapError: {
  <E, E2>(f: (error: E) => E2): <A, In, L, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, L, E2, R>
  <A, In, L, E, R, E2>(self: Sink<A, In, L, E, R>, f: (error: E) => E2): Sink<A, In, L, E2, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1087)

Since v2.0.0

## mapInput

Transforms this sink's input elements.

**Signature**

```ts
declare const mapInput: {
  <In0, In>(f: (input: In0) => In): <A, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In0, L, E, R>
  <A, In, L, E, R, In0>(self: Sink<A, In, L, E, R>, f: (input: In0) => In): Sink<A, In0, L, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L907)

Since v2.0.0

## mapInputArray

Transforms each non-empty array of upstream input before it is fed to this
sink.

**Signature**

```ts
declare const mapInputArray: {
  <In0, In>(
    f: (input: Arr.NonEmptyReadonlyArray<In0>) => Arr.NonEmptyReadonlyArray<In>
  ): <A, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In0, L, E, R>
  <A, In, L, E, R, In0>(
    self: Sink<A, In, L, E, R>,
    f: (input: Arr.NonEmptyReadonlyArray<In0>) => Arr.NonEmptyReadonlyArray<In>
  ): Sink<A, In0, L, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L945)

Since v4.0.0

## mapInputArrayEffect

Transforms each non-empty array of upstream input effectfully before it is
fed to this sink.

**Signature**

```ts
declare const mapInputArrayEffect: {
  <In0, In, E2, R2>(
    f: (input: Arr.NonEmptyReadonlyArray<In0>) => Effect.Effect<Arr.NonEmptyReadonlyArray<In>, E2, R2>
  ): <A, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In0, L, E2 | E, R2 | R>
  <A, In, L, E, R, In0, E2, R2>(
    self: Sink<A, In, L, E, R>,
    f: (input: Arr.NonEmptyReadonlyArray<In0>) => Effect.Effect<Arr.NonEmptyReadonlyArray<In>, E2, R2>
  ): Sink<A, In0, L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L968)

Since v4.0.0

## mapInputEffect

Transforms this sink's input elements effectfully.

**Signature**

```ts
declare const mapInputEffect: {
  <In0, In, E2, R2>(
    f: (input: In0) => Effect.Effect<In, E2, R2>
  ): <A, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In0, L, E2 | E, R2 | R>
  <A, In, L, E, R, In0, E2, R2>(
    self: Sink<A, In, L, E, R>,
    f: (input: In0) => Effect.Effect<In, E2, R2>
  ): Sink<A, In0, L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L922)

Since v2.0.0

## mapLeftover

Transforms the leftovers emitted by this sink using `f`.

**Signature**

```ts
declare const mapLeftover: {
  <L, L2>(f: (leftover: L) => L2): <A, In, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, L2, E, R>
  <A, In, L, E, R, L2>(self: Sink<A, In, L, E, R>, f: (leftover: L) => L2): Sink<A, In, L2, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1101)

Since v2.0.0

## summarized

Runs a summary effect when the sink starts and again when it completes.

**Signature**

```ts
declare const summarized: {
  <A2, E2, R2, A3>(
    summary: Effect.Effect<A2, E2, R2>,
    f: (start: A2, end: A2) => A3
  ): <A, In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<[A, A3], In, L, E2 | E, R2 | R>
  <A, In, L, E, R, A2, E2, R2, A3>(
    self: Sink<A, In, L, E, R>,
    summary: Effect.Effect<A2, E2, R2>,
    f: (start: A2, end: A2) => A3
  ): Sink<[A, A3], In, L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1905)

Since v2.0.0

## withDuration

Returns the sink that executes this one and times its execution.

**Signature**

```ts
declare const withDuration: <A, In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<[A, Duration.Duration], In, L, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1933)

Since v2.0.0

# models

## End (type alias)

Tuple returned when a `Sink` finishes.

**Details**

The first element is the sink result. The optional second element contains a
non-empty array of leftover input that was pulled but not consumed.

**Signature**

```ts
type End<A, L> = readonly [value: A, leftover?: NonEmptyReadonlyArray<L> | undefined]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L89)

Since v4.0.0

## Sink (interface)

A `Sink<A, In, L, E, R>` is used to consume elements produced by a `Stream`.
You can think of a sink as a function that will consume a variable amount of
`In` elements (could be 0, 1, or many), might fail with an error of type `E`,
and will eventually yield a value of type `A` together with a remainder of
type `L` (i.e. any leftovers).

**Example** (Running a sink with a stream)

```ts
import { Effect, Sink, Stream } from "effect"

// Create a simple sink that always succeeds with a value
const sink: Sink.Sink<number> = Sink.succeed(42)

// Use the sink to consume a stream
const stream = Stream.make(1, 2, 3)
const program = Stream.run(stream, sink)

Effect.runPromise(program).then(console.log)
// Output: 42
```

**Signature**

```ts
export interface Sink<out A, in In = unknown, out L = never, out E = never, out R = never>
  extends Sink.Variance<A, In, L, E, R>, Pipeable {
  readonly transform: (
    upstream: Pull.Pull<NonEmptyReadonlyArray<In>, never, void>,
    scope: Scope.Scope
  ) => Effect.Effect<End<A, L>, E, R>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: SinkUnify<this>
  [Unify.ignoreSymbol]?: SinkUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L66)

Since v2.0.0

## SinkUnify (interface)

Type-level unification support for `Sink` values.

**Details**

This preserves the result, input, leftover, error, and service type
parameters when Effect's `Unify` machinery normalizes generic values that
include sinks. Users normally do not need to reference this interface
directly.

**Signature**

```ts
export interface SinkUnify<A extends { [Unify.typeSymbol]?: any }> extends Effect.EffectUnify<A> {
  Sink?: () => A[Unify.typeSymbol] extends Sink<infer A, infer In, infer L, infer E, infer R> | infer _
    ? Sink<A, In, L, E, R>
    : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L106)

Since v2.0.0

## SinkUnifyIgnore (interface)

Marker used by Effect's `Unify` machinery for `Sink` values.

**Details**

It prevents the inherited `Effect` unifier from being selected when
sink-specific unification should preserve the `Sink` type parameters. Users
normally do not need to reference this interface directly.

**Signature**

```ts
export interface SinkUnifyIgnore {
  Effect?: true
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L131)

Since v2.0.0

# reducing

## reduce

A sink that reduces its inputs using the provided function `f` starting from
the provided `initial` state.

**Signature**

```ts
declare const reduce: <S, In>(initial: LazyArg<S>, f: (s: S, input: In) => S) => Sink<S, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1358)

Since v4.0.0

## reduceArray

A sink that reduces its inputs using the provided function `f` starting from
the specified `initial` state.

**Signature**

```ts
declare const reduceArray: <S, In>(initial: LazyArg<S>, f: (s: S, input: NonEmptyReadonlyArray<In>) => S) => Sink<S, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1373)

Since v4.0.0

## reduceEffect

A sink that reduces its inputs using the provided effectful function `f`
starting from the specified `initial` state.

**Signature**

```ts
declare const reduceEffect: <S, In, E, R>(
  initial: LazyArg<S>,
  f: (s: S, input: In) => Effect.Effect<S, E, R>
) => Sink<S, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1396)

Since v4.0.0

## reduceWhile

A sink that reduces input elements from the provided `initial` state with
`f` while the specified `predicate` returns `true`.

**Signature**

```ts
declare const reduceWhile: <S, In>(
  initial: LazyArg<S>,
  predicate: Predicate<S>,
  f: (s: S, input: In) => S
) => Sink<S, In, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1218)

Since v4.0.0

## reduceWhileArray

A sink that reduces non-empty input arrays from the provided `initial` state
with `f` while the specified `predicate` returns `true`.

**Signature**

```ts
declare const reduceWhileArray: <S, In>(
  initial: LazyArg<S>,
  contFn: Predicate<S>,
  f: (s: S, input: NonEmptyReadonlyArray<In>) => S
) => Sink<S, In>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1295)

Since v4.0.0

## reduceWhileArrayEffect

A sink that effectfully reduces non-empty input arrays from the provided
`initial` state with `f` while the specified `predicate` returns `true`.

**Signature**

```ts
declare const reduceWhileArrayEffect: <S, In, E, R>(
  initial: LazyArg<S>,
  predicate: Predicate<S>,
  f: (s: S, input: NonEmptyReadonlyArray<In>) => Effect.Effect<S, E, R>
) => Sink<S, In, never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1327)

Since v4.0.0

## reduceWhileEffect

A sink that effectfully reduces input elements from the provided `initial`
state with `f` while the specified `predicate` returns `true`.

**Signature**

```ts
declare const reduceWhileEffect: <S, In, E, R>(
  initial: LazyArg<S>,
  predicate: Predicate<S>,
  f: (s: S, input: In) => Effect.Effect<S, E, R>
) => Sink<S, In, In, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1254)

Since v4.0.0

# sequencing

## flatMap

Runs this sink until it yields a result, then uses that result to create
another sink from the provided function which will continue to run until it
yields a result.

**When to use**

Use to compose sinks when the next sink depends on the result produced by the
previous sink.

**Details**

Leftovers from the first sink are fed to the sink returned by `f` before more
upstream input is pulled.

**See**

- `map` for transforming the result without switching sinks
- `mapEffect` for effectfully transforming the result without switching sinks

**Signature**

```ts
declare const flatMap: {
  <A, A1, L, In1 extends L, L1, E1, R1>(
    f: (a: A) => Sink<A1, In1, L1, E1, R1>
  ): <In, E, R>(self: Sink<A, In, L, E, R>) => Sink<A1, In & In1, L1 | L, E1 | E, R1 | R>
  <A, In, L, E, R, A1, In1 extends L, L1, E1, R1>(
    self: Sink<A, In, L, E, R>,
    f: (a: A) => Sink<A1, In1, L1, E1, R1>
  ): Sink<A1, In & In1, L | L1, E | E1, R | R1>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1174)

Since v2.0.0

# services

## provideContext

Provides a `Context` to this sink.

**Details**

Services contained in the provided context are removed from the sink's
service requirements.

**Signature**

```ts
declare const provideContext: {
  <Provided>(
    context: Context.Context<Provided>
  ): <A, In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, L, E, Exclude<R, Provided>>
  <A, In, L, E, R, Provided>(
    self: Sink<A, In, L, E, R>,
    context: Context.Context<Provided>
  ): Sink<A, In, L, E, Exclude<R, Provided>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1957)

Since v2.0.0

## provideService

Provides a single service implementation to this sink.

**Details**

The service identified by `key` is removed from the sink's service
requirements.

**Signature**

```ts
declare const provideService: {
  <I, S>(
    key: Context.Key<I, S>,
    value: Types.NoInfer<S>
  ): <A, In, L, E, R>(self: Sink<A, In, L, E, R>) => Sink<A, In, L, E, Exclude<R, I>>
  <A, In, L, E, R, I, S>(
    self: Sink<A, In, L, E, R>,
    key: Context.Key<I, S>,
    value: Types.NoInfer<S>
  ): Sink<A, In, L, E, Exclude<R, I>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L1986)

Since v4.0.0

# utils

## Sink (namespace)

Namespace containing types and interfaces for Sink variance and type relationships.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L140)

Since v2.0.0

### Variance (interface)

Type-level variance marker for `Sink`.

**Details**

The result `A`, leftovers `L`, errors `E`, and services `R` are
covariant. The input type `In` is contravariant because values flow into
the sink.

**Signature**

```ts
export interface Variance<out A, in In, out L, out E, out R> {
  readonly [TypeId]: VarianceStruct<A, In, L, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L153)

Since v2.0.0

### VarianceStruct (interface)

Structural encoding used by `Sink.Variance` to record each `Sink` type
parameter's variance.

**Details**

`_A`, `_L`, `_E`, and `_R` are covariant markers. `_In` is a
contravariant marker.

**Signature**

```ts
export interface VarianceStruct<out A, in In, out L, out E, out R> {
  _A: Types.Covariant<A>
  _In: Types.Contravariant<In>
  _L: Types.Covariant<L>
  _E: Types.Covariant<E>
  _R: Types.Covariant<R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L168)

Since v2.0.0

## make (namespace)

Companion namespace containing overload types for the pipe-style sink
constructor returned by `Sink.make`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L319)

Since v4.0.0

### Constructor (interface)

Overloaded function type returned by `Sink.make`.

**Details**

The first pipeline function receives the sink input as a `Stream<In>`. The
final pipeline step must return an `Effect`, whose success value becomes
the sink result.

**Signature**

```ts
export interface Constructor<In> {
  <E, R, B = never>(ab: (_: Stream<In>) => Effect.Effect<B, E, R>): Sink<B, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => Effect.Effect<C, E, R>
  ): Sink<C, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => Effect.Effect<D, E, R>
  ): Sink<D, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => Effect.Effect<F, E, R>
  ): Sink<F, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never, G = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => F,
    fg: (_: F) => Effect.Effect<G, E, R>
  ): Sink<G, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never, G = never, H = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => F,
    fg: (_: F) => G,
    gh: (_: G) => Effect.Effect<H, E, R>
  ): Sink<H, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never, G = never, H = never, I = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => Effect.Effect<I, E, R>
  ): Sink<I, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never, G = never, H = never, I = never, J = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => Effect.Effect<J, E, R>
  ): Sink<J, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never, G = never, H = never, I = never, J = never, K = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => Effect.Effect<K, E, R>
  ): Sink<K, In, never, E, Exclude<R, Scope.Scope>>
  <E, R, B = never, C = never, D = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never>(
    ab: (_: Stream<In>) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    df: (_: D) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => Effect.Effect<L, E, R>
  ): Sink<L, In, never, E, Exclude<R, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sink.ts#L332)

Since v4.0.0
