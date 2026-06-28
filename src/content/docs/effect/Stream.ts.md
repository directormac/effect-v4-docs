---
title: Stream.ts
nav_order: 112
parent: "effect"
---

## Stream.ts overview

Describes effectful sources that emit values over time.

A `Stream<A, E, R>` can emit many `A` values, fail with `E`, and require
services `R` while it is being consumed. Streams are useful for data that is
pulled in steps, such as values from collections, queues, pubsubs, schedules,
callbacks, async iterables, or platform streams. The APIs here cover the full
stream lifecycle: create a stream, transform or combine it, control buffering
and timing, handle failures, and finally consume it.

Since v2.0.0

---

## Exports Grouped by Category

- [Accumulation](#accumulation)
  - [accumulate](#accumulate)
  - [collect](#collect)
  - [scan](#scan)
  - [scanEffect](#scaneffect)
- [Aggregation](#aggregation)
  - [aggregate](#aggregate)
  - [aggregateWithin](#aggregatewithin)
  - [transduce](#transduce)
- [Broadcast](#broadcast)
  - [broadcast](#broadcast-1)
  - [broadcastN](#broadcastn)
  - [share](#share)
- [Deduplication](#deduplication)
  - [changes](#changes)
  - [changesWith](#changeswith)
  - [changesWithEffect](#changeswitheffect)
- [Finalization](#finalization)
  - [ensuring](#ensuring)
  - [onExit](#onexit)
- [Pipe](#pipe)
  - [pipeThrough](#pipethrough)
  - [pipeThroughChannel](#pipethroughchannel)
  - [pipeThroughChannelOrFail](#pipethroughchannelorfail)
- [constants](#constants)
  - [DefaultChunkSize](#defaultchunksize)
- [constructors](#constructors)
  - [callback](#callback)
  - [die](#die)
  - [empty](#empty)
  - [fail](#fail)
  - [failCause](#failcause)
  - [failCauseSync](#failcausesync)
  - [failSync](#failsync)
  - [fromArray](#fromarray)
  - [fromArrayEffect](#fromarrayeffect)
  - [fromArrays](#fromarrays)
  - [fromAsyncIterable](#fromasynciterable)
  - [fromChannel](#fromchannel)
  - [fromEffect](#fromeffect)
  - [fromEffectDrain](#fromeffectdrain)
  - [fromEffectRepeat](#fromeffectrepeat)
  - [fromEffectSchedule](#fromeffectschedule)
  - [fromEventListener](#fromeventlistener)
  - [fromIterable](#fromiterable)
  - [fromIterableEffect](#fromiterableeffect)
  - [fromIterableEffectRepeat](#fromiterableeffectrepeat)
  - [fromIteratorSucceed](#fromiteratorsucceed)
  - [fromPubSub](#frompubsub)
  - [fromPubSubTake](#frompubsubtake)
  - [fromPull](#frompull)
  - [fromQueue](#fromqueue)
  - [fromReadableStream](#fromreadablestream)
  - [fromSchedule](#fromschedule)
  - [fromSubscription](#fromsubscription)
  - [iterate](#iterate)
  - [make](#make)
  - [never](#never)
  - [paginate](#paginate)
  - [range](#range)
  - [scoped](#scoped)
  - [succeed](#succeed)
  - [suspend](#suspend)
  - [sync](#sync)
  - [tick](#tick)
  - [toChannel](#tochannel)
  - [transformPull](#transformpull)
  - [transformPullBracket](#transformpullbracket)
  - [unfold](#unfold)
  - [unwrap](#unwrap)
- [context](#context)
  - [service](#service)
  - [serviceOption](#serviceoption)
- [destructors](#destructors)
  - [mkString](#mkstring)
  - [mkUint8Array](#mkuint8array)
  - [peel](#peel)
  - [run](#run)
  - [runCollect](#runcollect)
  - [runCount](#runcount)
  - [runDrain](#rundrain)
  - [runFold](#runfold)
  - [runFoldEffect](#runfoldeffect)
  - [runForEach](#runforeach)
  - [runForEachArray](#runforeacharray)
  - [runForEachWhile](#runforeachwhile)
  - [runHead](#runhead)
  - [runIntoPubSub](#runintopubsub)
  - [runIntoQueue](#runintoqueue)
  - [runLast](#runlast)
  - [runSum](#runsum)
  - [toAsyncIterable](#toasynciterable)
  - [toAsyncIterableEffect](#toasynciterableeffect)
  - [toAsyncIterableWith](#toasynciterablewith)
  - [toPubSub](#topubsub)
  - [toPubSubTake](#topubsubtake)
  - [toPull](#topull)
  - [toQueue](#toqueue)
  - [toReadableStream](#toreadablestream)
  - [toReadableStreamEffect](#toreadablestreameffect)
  - [toReadableStreamWith](#toreadablestreamwith)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindEffect](#bindeffect)
  - [bindTo](#bindto)
  - [let](#let)
- [encoding](#encoding)
  - [decodeText](#decodetext)
  - [encodeText](#encodetext)
  - [splitLines](#splitlines)
- [error handling](#error-handling)
  - [catch](#catch)
  - [catchCause](#catchcause)
  - [catchCauseFilter](#catchcausefilter)
  - [catchCauseIf](#catchcauseif)
  - [catchFilter](#catchfilter)
  - [catchIf](#catchif)
  - [catchReason](#catchreason)
  - [catchReasons](#catchreasons)
  - [catchTag](#catchtag)
  - [catchTags](#catchtags)
  - [ignore](#ignore)
  - [ignoreCause](#ignorecause)
  - [mapError](#maperror)
  - [onError](#onerror)
  - [orDie](#ordie)
  - [orElseIfEmpty](#orelseifempty)
  - [orElseSucceed](#orelsesucceed)
  - [result](#result)
  - [retry](#retry)
  - [tapCause](#tapcause)
  - [tapError](#taperror)
  - [withExecutionPlan](#withexecutionplan)
- [filtering](#filtering)
  - [drop](#drop)
  - [dropRight](#dropright)
  - [dropUntil](#dropuntil)
  - [dropUntilEffect](#dropuntileffect)
  - [dropWhile](#dropwhile)
  - [dropWhileEffect](#dropwhileeffect)
  - [dropWhileFilter](#dropwhilefilter)
  - [filter](#filter)
  - [filterEffect](#filtereffect)
  - [filterMap](#filtermap)
  - [filterMapEffect](#filtermapeffect)
  - [partition](#partition)
  - [partitionEffect](#partitioneffect)
  - [partitionQueue](#partitionqueue)
  - [take](#take)
  - [takeRight](#takeright)
  - [takeUntil](#takeuntil)
  - [takeUntilEffect](#takeuntileffect)
  - [takeWhile](#takewhile)
  - [takeWhileEffect](#takewhileeffect)
  - [takeWhileFilter](#takewhilefilter)
  - [when](#when)
- [grouping](#grouping)
  - [chunks](#chunks)
  - [groupAdjacentBy](#groupadjacentby)
  - [groupBy](#groupby)
  - [groupByKey](#groupbykey)
  - [grouped](#grouped)
  - [groupedWithin](#groupedwithin)
  - [rechunk](#rechunk)
  - [sliding](#sliding)
  - [slidingSize](#slidingsize)
  - [split](#split)
- [guards](#guards)
  - [isStream](#isstream)
- [interruption](#interruption)
  - [haltWhen](#haltwhen)
  - [interruptWhen](#interruptwhen)
- [mapping](#mapping)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
  - [flattenEffect](#flatteneffect)
  - [flattenIterable](#flatteniterable)
  - [map](#map)
  - [mapAccum](#mapaccum)
  - [mapAccumArray](#mapaccumarray)
  - [mapAccumArrayEffect](#mapaccumarrayeffect)
  - [mapAccumEffect](#mapaccumeffect)
  - [mapArray](#maparray)
  - [mapArrayEffect](#maparrayeffect)
  - [mapBoth](#mapboth)
  - [mapEffect](#mapeffect)
- [merging](#merging)
  - [combine](#combine)
  - [interleave](#interleave)
  - [interleaveWith](#interleavewith)
  - [merge](#merge)
  - [mergeAll](#mergeall)
  - [mergeEffect](#mergeeffect)
  - [mergeLeft](#mergeleft)
  - [mergeResult](#mergeresult)
  - [mergeRight](#mergeright)
- [models](#models)
  - [EventListener (interface)](#eventlistener-interface)
  - [HaltStrategy (type alias)](#haltstrategy-type-alias)
  - [Stream (interface)](#stream-interface)
  - [StreamUnify (interface)](#streamunify-interface)
  - [StreamUnifyIgnore (interface)](#streamunifyignore-interface)
  - [Variance (interface)](#variance-interface)
  - [VarianceStruct (interface)](#variancestruct-interface)
- [racing](#racing)
  - [race](#race)
  - [raceAll](#raceall)
- [rate limiting](#rate-limiting)
  - [buffer](#buffer)
  - [bufferArray](#bufferarray)
  - [debounce](#debounce)
  - [schedule](#schedule)
  - [throttle](#throttle)
  - [throttleEffect](#throttleeffect)
  - [timeout](#timeout)
  - [timeoutOrElse](#timeoutorelse)
- [sequencing](#sequencing)
  - [combineArray](#combinearray)
  - [concat](#concat)
  - [drain](#drain)
  - [drainFork](#drainfork)
  - [flattenArray](#flattenarray)
  - [flattenTake](#flattentake)
  - [forever](#forever)
  - [intersperse](#intersperse)
  - [intersperseAffixes](#intersperseaffixes)
  - [onEnd](#onend)
  - [onFirst](#onfirst)
  - [onStart](#onstart)
  - [prepend](#prepend)
  - [repeat](#repeat)
  - [repeatElements](#repeatelements)
  - [switchMap](#switchmap)
  - [tap](#tap)
  - [tapBoth](#tapboth)
  - [tapSink](#tapsink)
- [services](#services)
  - [provide](#provide)
  - [provideContext](#providecontext)
  - [provideService](#provideservice)
  - [provideServiceEffect](#provideserviceeffect)
  - [updateContext](#updatecontext)
  - [updateService](#updateservice)
- [tracing](#tracing)
  - [withSpan](#withspan)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [type lambdas](#type-lambdas)
  - [StreamTypeLambda (interface)](#streamtypelambda-interface)
- [utility types](#utility-types)
  - [Error (type alias)](#error-type-alias)
  - [Services (type alias)](#services-type-alias)
  - [Success (type alias)](#success-type-alias)
- [zipping](#zipping)
  - [cross](#cross)
  - [crossWith](#crosswith)
  - [zip](#zip)
  - [zipFlatten](#zipflatten)
  - [zipLatest](#ziplatest)
  - [zipLatestAll](#ziplatestall)
  - [zipLatestWith](#ziplatestwith)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
  - [zipWith](#zipwith)
  - [zipWithArray](#zipwitharray)
  - [zipWithIndex](#zipwithindex)
  - [zipWithNext](#zipwithnext)
  - [zipWithPrevious](#zipwithprevious)
  - [zipWithPreviousAndNext](#zipwithpreviousandnext)

---

# Accumulation

## accumulate

Accumulates elements into a growing array, emitting the cumulative array for each input chunk.

**Example** (Accumulating stream elements)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const accumulated = yield* Stream.runCollect(Stream.fromArray([1, 2, 3]).pipe(Stream.rechunk(1), Stream.accumulate))
  yield* Console.log(accumulated)
})

Effect.runPromise(program)
//=> { _id: 'Chunk', values: [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ] ] }
```

**Signature**

```ts
declare const accumulate: <A, E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyArray<A>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9200)

Since v2.0.0

## collect

Collects all elements into an array and emits it as a single element.

**Example** (Collecting values into a stream element)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const program = Effect.gen(function* () {
  const collected = yield* stream.pipe(Stream.collect, Stream.runCollect)
  yield* Console.log(collected[0])
})

Effect.runPromise(program)
// [1, 2, 3]
```

**Signature**

```ts
declare const collect: <A, E, R>(self: Stream<A, E, R>) => Stream<Array<A>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9173)

Since v4.0.0

## scan

Accumulates state across the stream, emitting the initial state and each updated state.

**Example** (Scanning stream state)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(
    Stream.scan(0, (acc, n) => acc + n),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 0, 1, 3, 6 ]
```

**Signature**

```ts
declare const scan: {
  <S, A>(initial: S, f: (s: S, a: A) => S): <E, R>(self: Stream<A, E, R>) => Stream<S, E, R>
  <A, E, R, S>(self: Stream<A, E, R>, initial: S, f: (s: S, a: A) => S): Stream<S, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7741)

Since v2.0.0

## scanEffect

Accumulates state effectfully and emits the initial state plus each accumulated state.

**Example** (Effectfully scanning stream state)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const states = yield* Stream.make(1, 2, 3).pipe(
    Stream.scanEffect(0, (sum, n) => Effect.succeed(sum + n)),
    Stream.runCollect
  )
  yield* Console.log(states)
  // Output: [ 0, 1, 3, 6 ]
})
```

**Signature**

```ts
declare const scanEffect: {
  <S, A, E2, R2>(
    initial: S,
    f: (s: S, a: A) => Effect.Effect<S, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<S, E | E2, R | R2>
  <A, E, R, S, E2, R2>(
    self: Stream<A, E, R>,
    initial: S,
    f: (s: S, a: A) => Effect.Effect<S, E2, R2>
  ): Stream<S, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7793)

Since v2.0.0

# Aggregation

## aggregate

Aggregates elements using the provided sink and emits each sink result as a stream element.

**Details**

The stream runs the upstream and downstream in separate fibers, so the sink can keep
consuming input while downstream is busy processing the previous output.

**Example** (Aggregating with a sink)

```ts
import { Console, Effect, Sink, Stream } from "effect"

Effect.runPromise(
  Effect.gen(function* () {
    const aggregated = yield* Stream.runCollect(
      Stream.make(1, 2, 3, 4, 5, 6).pipe(
        Stream.aggregate(
          Sink.foldUntil(
            () => 0,
            3,
            (sum, n) => Effect.succeed(sum + n)
          )
        )
      )
    )
    yield* Console.log(aggregated)
  })
)
// [ 6, 15 ]
```

**Signature**

```ts
declare const aggregate: {
  <B, A, A2, E2, R2>(sink: Sink.Sink<B, A | A2, A2, E2, R2>): <E, R>(self: Stream<A, E, R>) => Stream<B, E2 | E, R2 | R>
  <A, E, R, B, A2, E2, R2>(self: Stream<A, E, R>, sink: Sink.Sink<B, A | A2, A2, E2, R2>): Stream<B, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8607)

Since v2.0.0

## aggregateWithin

Aggregates elements with a sink, emitting each result when the sink completes or the schedule triggers.

**Details**

The schedule can flush the current aggregation even if the sink has not finished.

**Example** (Aggregating with a sink and schedule)

```ts
import { Console, Effect, Schedule, Sink, Stream } from "effect"

Effect.runPromise(
  Effect.gen(function* () {
    const aggregated = yield* Stream.runCollect(
      Stream.make(1, 2, 3, 4, 5, 6).pipe(
        Stream.aggregateWithin(
          Sink.foldUntil(
            () => 0,
            3,
            (sum, n) => Effect.succeed(sum + n)
          ),
          Schedule.spaced("1 minute")
        )
      )
    )
    yield* Console.log(aggregated)
  })
)
// Output: [ 6, 15 ]
```

**Signature**

```ts
declare const aggregateWithin: {
  <B, A, A2, E2, R2, C, E3, R3>(
    sink: Sink.Sink<B, A | A2, A2, E2, R2>,
    schedule: Schedule.Schedule<C, Option.Option<B>, E3, R3>
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E2 | E | E3, R2 | R3 | R>
  <A, E, R, B, A2, E2, R2, C, E3, R3>(
    self: Stream<A, E, R>,
    sink: Sink.Sink<B, A | A2, A2, E2, R2>,
    schedule: Schedule.Schedule<C, Option.Option<B>, E3, R3>
  ): Stream<B, E | E2 | E3, R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8649)

Since v2.0.0

## transduce

Applies a sink transducer to the stream and emits each sink result.

**Example** (Transducing with a sink)

```ts
import { Console, Effect, Sink, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3, 4).pipe(Stream.transduce(Sink.take(2)), Stream.runCollect)

  yield* Console.log(result)
  // Output: [ [ 1, 2 ], [ 3, 4 ] ]
})
```

**Signature**

```ts
declare const transduce: (<A2, A, E2, R2>(
  sink: Sink.Sink<A2, A, A, E2, R2>
) => <E, R>(self: Stream<A, E, R>) => Stream<A2, E2 | E, R2 | R>) &
  (<A, E, R, A2, E2, R2>(self: Stream<A, E, R>, sink: Sink.Sink<A2, A, A, E2, R2>) => Stream<A2, E2 | E, R2 | R>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8531)

Since v2.0.0

# Broadcast

## broadcast

Creates a PubSub-backed stream that multicasts the source to all subscribers.

**Details**

The returned stream is scoped and uses the provided PubSub capacity and replay settings.

**Example** (Broadcasting a stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.scoped(
  Effect.gen(function* () {
    const broadcasted = yield* Stream.broadcast(Stream.fromArray([1, 2, 3]), {
      capacity: 8,
      replay: 3
    })

    const [left, right] = yield* Effect.all([Stream.runCollect(broadcasted), Stream.runCollect(broadcasted)], {
      concurrency: "unbounded"
    })

    yield* Console.log([left, right])
  })
)

Effect.runPromise(program)
// Output: [[1, 2, 3], [1, 2, 3]]
```

**Signature**

```ts
declare const broadcast: {
  (
    options:
      | { readonly capacity: "unbounded"; readonly replay?: number | undefined }
      | {
          readonly capacity: number
          readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
          readonly replay?: number | undefined
        }
  ): <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<Stream<A, E>, never, Scope.Scope | R>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | { readonly capacity: "unbounded"; readonly replay?: number | undefined }
      | {
          readonly capacity: number
          readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
          readonly replay?: number | undefined
        }
  ): Effect.Effect<Stream<A, E>, never, Scope.Scope | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8899)

Since v2.0.0

## broadcastN

Creates a fixed-size tuple of streams that each emit
the same elements as the source stream.

**Details**

The source stream starts after all downstream streams have been subscribed.
With the default suspend strategy, the source can only advance `capacity`
chunks ahead of the slowest downstream stream. If a downstream stream is
interrupted, it unsubscribes from the broadcast so it no longer contributes
backpressure.

**Example** (Broadcasting to two consumers)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.scoped(
  Effect.gen(function* () {
    const [left, right] = yield* Stream.make(1, 2, 3).pipe(Stream.broadcastN({ n: 2, capacity: 8 }))

    const values = yield* Effect.all([Stream.runCollect(left), Stream.runCollect(right)], { concurrency: "unbounded" })

    yield* Console.log(values)
  })
)

Effect.runPromise(program)
// Output: [[1, 2, 3], [1, 2, 3]]
```

**Signature**

```ts
declare const broadcastN: {
  <const N extends number>(
    options:
      | { readonly n: N; readonly capacity: "unbounded"; readonly replay?: number | undefined }
      | {
          readonly n: N
          readonly capacity: number
          readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
          readonly replay?: number | undefined
        }
  ): <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<TupleOf<N, Stream<A, E>>, never, Scope.Scope | R>
  <A, E, R, const N extends number>(
    self: Stream<A, E, R>,
    options:
      | { readonly n: N; readonly capacity: "unbounded"; readonly replay?: number | undefined }
      | {
          readonly capacity: number
          readonly n: N
          readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
          readonly replay?: number | undefined
        }
  ): Effect.Effect<TupleOf<N, Stream<A, E>>, never, Scope.Scope | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8781)

Since v4.0.0

## share

Returns a new Stream that multicasts the original stream, subscribing when the first consumer starts.

**Details**

The upstream continues running while there is at least one consumer and is finalized after the last one exits.
If `idleTimeToLive` is set, the upstream is kept alive for that duration so a later subscriber can continue from
the next element instead of restarting.

**Example** (Sharing a stream)

```ts
import { Console, Effect, Stream } from "effect"

Effect.runPromise(
  Effect.scoped(
    Effect.gen(function* () {
      const shared = yield* Stream.make(1, 2, 3).pipe(Stream.share({ capacity: 16 }))

      const first = yield* shared.pipe(Stream.take(1), Stream.runCollect)
      const second = yield* shared.pipe(Stream.take(1), Stream.runCollect)

      yield* Console.log([first, second])
    })
  )
)
// output: [[1], [1]]
```

**Signature**

```ts
declare const share: {
  (
    options:
      | {
          readonly capacity: "unbounded"
          readonly replay?: number | undefined
          readonly idleTimeToLive?: Duration.Input | undefined
        }
      | {
          readonly capacity: number
          readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
          readonly replay?: number | undefined
          readonly idleTimeToLive?: Duration.Input | undefined
        }
  ): <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<Stream<A, E>, never, Scope.Scope | R>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | {
          readonly capacity: "unbounded"
          readonly replay?: number | undefined
          readonly idleTimeToLive?: Duration.Input | undefined
        }
      | {
          readonly capacity: number
          readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
          readonly replay?: number | undefined
          readonly idleTimeToLive?: Duration.Input | undefined
        }
  ): Effect.Effect<Stream<A, E>, never, Scope.Scope | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8967)

Since v3.8.0

# Deduplication

## changes

Emits only elements that differ from the previous one.

**Example** (Emitting changed values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.fromIterable([1, 1, 2, 2, 3]).pipe(Stream.changes, Stream.runCollect)

  yield* Console.log(values)
})

Effect.runPromise(program)
// [1, 2, 3]
```

**Signature**

```ts
declare const changes: <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9230)

Since v2.0.0

## changesWith

Returns a stream that only emits elements that are not equal to the previously emitted element, as determined by the specified predicate.

**Example** (Emitting values that changed by equivalence)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make("A", "a", "B", "b", "b").pipe(
  Stream.changesWith((left, right) => left.toLowerCase() === right.toLowerCase())
)

Effect.runPromise(
  Effect.gen(function* () {
    const values = yield* Stream.runCollect(stream)
    yield* Console.log(values)
  })
)
// ["A", "B"]
```

**Signature**

```ts
declare const changesWith: {
  <A>(f: (x: A, y: A) => boolean): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, f: (x: A, y: A) => boolean): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9256)

Since v2.0.0

## changesWithEffect

Emits only elements that differ from the previous element, using an effectful equality check.

**Details**

The predicate runs for each element after the first; returning `true` treats it as equal and skips it.

**Example** (Effectfully emitting changed values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 1, 2, 2, 3, 3).pipe(Stream.changesWithEffect((a, b) => Effect.succeed(a === b)))
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// { _id: "Chunk", values: [ 1, 2, 3 ] }
```

**Signature**

```ts
declare const changesWithEffect: {
  <A, E2, R2>(
    f: (x: A, y: A) => Effect.Effect<boolean, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R | R2>
  <A, E, R, E2, R2>(self: Stream<A, E, R>, f: (x: A, y: A) => Effect.Effect<boolean, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9313)

Since v2.0.0

# Finalization

## ensuring

Executes the provided finalizer after this stream's finalizers run.

**Example** (Ensuring finalization)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.fromArray([1, 2]).pipe(Stream.ensuring(Effect.orDie(Console.log("cleanup"))))

const program = Effect.gen(function* () {
  const collected = yield* Stream.runCollect(stream)
  yield* Console.log(collected)
})

Effect.runPromise(program)
//=> cleanup
//=> [1, 2]
```

**Signature**

```ts
declare const ensuring: {
  <R2>(finalizer: Effect.Effect<unknown, never, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R | R2>
  <A, E, R, R2>(self: Stream<A, E, R>, finalizer: Effect.Effect<unknown, never, R2>): Stream<A, E, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9987)

Since v2.0.0

## onExit

Runs the provided finalizer when the stream exits, passing the exit value.

**Example** (Running a finalizer on exit)

```ts
import { Console, Effect, Exit, Stream } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.onExit((exit) =>
    Exit.isSuccess(exit) ? Console.log("Stream completed successfully") : Console.log("Stream failed")
  )
)

Effect.runPromise(
  Effect.gen(function* () {
    yield* Stream.runCollect(stream)
  })
)
// Output:
// Stream completed successfully
```

**Signature**

```ts
declare const onExit: {
  <E, R2>(
    finalizer: (exit: Exit.Exit<unknown, E>) => Effect.Effect<unknown, never, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A, E, R | R2>
  <A, E, R, R2>(
    self: Stream<A, E, R>,
    finalizer: (exit: Exit.Exit<unknown, E>) => Effect.Effect<unknown, never, R2>
  ): Stream<A, E, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9797)

Since v4.0.0

# Pipe

## pipeThrough

Pipes the stream through `Sink.toChannel`, emitting only the sink leftovers.

**Details**

If the sink completes mid-chunk, the remaining elements become the output stream.

**Example** (Piping through a sink)

```ts
import { Console, Effect, Sink, Stream } from "effect"

const program = Effect.gen(function* () {
  const leftovers = yield* Stream.make(1, 2, 3, 4).pipe(Stream.pipeThrough(Sink.take(2)), Stream.runCollect)

  yield* Console.log(leftovers)
})

Effect.runPromise(program)
//=> [ 3, 4 ]
```

**Signature**

```ts
declare const pipeThrough: {
  <A2, A, L, E2, R2>(sink: Sink.Sink<A2, A, L, E2, R2>): <E, R>(self: Stream<A, E, R>) => Stream<L, E2 | E, R2 | R>
  <A, E, R, A2, L, E2, R2>(self: Stream<A, E, R>, sink: Sink.Sink<A2, A, L, E2, R2>): Stream<L, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9138)

Since v2.0.0

## pipeThroughChannel

Pipes this stream through a channel that consumes and emits chunked elements.

**Details**

The channel receives `NonEmptyReadonlyArray` chunks and can transform both the
output elements and error type.

**Example** (Piping through a channel)

```ts
import { Array, Channel, Console, Effect, Stream } from "effect"

type NumberChunk = readonly [number, ...Array<number>]

const doubleChunks = Channel.identity<NumberChunk, never, unknown>().pipe(
  Channel.map((chunk) => Array.map(chunk, (n) => n * 2))
)

const program = Effect.gen(function* () {
  const result = yield* Stream.fromArray([1, 2, 3]).pipe(
    Stream.rechunk(2),
    Stream.pipeThroughChannel(doubleChunks),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// => [2, 4, 6]
```

**Signature**

```ts
declare const pipeThroughChannel: {
  <R2, E, E2, A, A2>(
    channel: Channel.Channel<Arr.NonEmptyReadonlyArray<A2>, E2, unknown, Arr.NonEmptyReadonlyArray<A>, E, unknown, R2>
  ): <R>(self: Stream<A, E, R>) => Stream<A2, E2, R2 | R>
  <R, R2, E, E2, A, A2>(
    self: Stream<A, E, R>,
    channel: Channel.Channel<Arr.NonEmptyReadonlyArray<A2>, E2, unknown, Arr.NonEmptyReadonlyArray<A>, E, unknown, R2>
  ): Stream<A2, E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9049)

Since v2.0.0

## pipeThroughChannelOrFail

Pipes values through the provided channel while preserving this stream's
failures alongside any channel failures.

**Details**

Upstream failures are not passed to the channel, so the resulting stream can
fail with either the original stream error or the channel error.

**Example** (Piping through a channel with failures)

```ts
import { Array, Channel, Effect, Stream } from "effect"

type NumberChunk = readonly [number, ...Array<number>]

const stringifyChunks = Channel.identity<NumberChunk, "StreamError", unknown>().pipe(
  Channel.map((chunk) => Array.map(chunk, String))
)

Effect.runPromise(
  Effect.gen(function* () {
    const result = yield* Stream.make(1, 2, 3).pipe(
      Stream.rechunk(2),
      Stream.pipeThroughChannelOrFail(stringifyChunks),
      Stream.runCollect
    )

    yield* Effect.sync(() => console.log(result))
  })
)
// [ "1", "2", "3" ]
```

**Signature**

```ts
declare const pipeThroughChannelOrFail: {
  <R2, E, E2, A, A2>(
    channel: Channel.Channel<Arr.NonEmptyReadonlyArray<A2>, E2, unknown, Arr.NonEmptyReadonlyArray<A>, E, unknown, R2>
  ): <R>(self: Stream<A, E, R>) => Stream<A2, E | E2, R2 | R>
  <R, R2, E, E2, A, A2>(
    self: Stream<A, E, R>,
    channel: Channel.Channel<Arr.NonEmptyReadonlyArray<A2>, E2, unknown, Arr.NonEmptyReadonlyArray<A>, E, unknown, R2>
  ): Stream<A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9097)

Since v2.0.0

# constants

## DefaultChunkSize

The default chunk size used by Stream constructors and combinators.

**Example** (Reading the default chunk size)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  yield* Console.log(Stream.DefaultChunkSize)
})

Effect.runPromise(program)
// Output: 4096
```

**Signature**

```ts
declare const DefaultChunkSize: number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L308)

Since v2.0.0

# constructors

## callback

Creates a stream from a callback that can emit values into a queue.

**When to use**

Use when you need callback-based code to emit stream values by offering to a
`Queue`, or signal stream completion through the `Queue` module APIs.

By default it uses an "unbounded" buffer size.
You can customize the buffer size and strategy by passing an object as the
second argument with the `bufferSize` and `strategy` fields.

**Example** (Creating a stream from a callback that can emit values into a queue)

```ts
import { Console, Effect, Queue, Stream } from "effect"

const stream = Stream.callback<number>((queue) =>
  Effect.sync(() => {
    // Emit values to the stream
    Queue.offerUnsafe(queue, 1)
    Queue.offerUnsafe(queue, 2)
    Queue.offerUnsafe(queue, 3)
    // Signal completion
    Queue.endUnsafe(queue)
  })
)

const program = Effect.gen(function* () {
  const values = yield* stream.pipe(Stream.runCollect)
  yield* Console.log(values)
  // [ 1, 2, 3 ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const callback: <A, E = never, R = never>(
  f: (queue: Queue.Queue<A, E | Cause.Done>) => Effect.Effect<unknown, E, R | Scope.Scope>,
  options?: {
    readonly bufferSize?: number | undefined
    readonly strategy?: "sliding" | "dropping" | "suspend" | undefined
  }
) => Stream<A, E, Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L777)

Since v4.0.0

## die

The stream that dies with the specified defect.

**Example** (Dying with a defect)

```ts
import { Cause, Console, Effect, Exit, Stream } from "effect"

const defect = new Error("Boom")
const stream = Stream.die(defect)

const program = Effect.gen(function* () {
  const exit = yield* Effect.exit(Stream.runCollect(stream))
  const message = Exit.match(exit, {
    onSuccess: () => "Exit.Success",
    onFailure: (cause) => {
      const reason = cause.reasons[0]
      const defect = Cause.isDieReason(reason) ? String(reason.defect) : "Unexpected reason"
      return `Exit.Failure(${defect})`
    }
  })
  yield* Console.log(message)
})

Effect.runPromise(program)
// Output: Exit.Failure(Error: Boom)
```

**Signature**

```ts
declare const die: (defect: unknown) => Stream<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1010)

Since v2.0.0

## empty

Creates an empty stream.

**Example** (Creating an empty stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.empty.pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// []
```

**Signature**

```ts
declare const empty: Stream<never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L805)

Since v2.0.0

## fail

Terminates with the specified error.

**Example** (Failing a stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fail("Uh oh!")
  const exit = yield* Effect.exit(Stream.runCollect(stream))
  yield* Console.log(exit)
  // Output: { _id: 'Exit', _tag: 'Failure', cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' } }
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const fail: <E>(error: E) => Stream<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L926)

Since v2.0.0

## failCause

Creates a stream that fails with the specified `Cause`.

**Example** (Failing with a cause)

```ts
import { Cause, Console, Effect, Stream } from "effect"

const stream = Stream.failCause(Cause.fail("Database connection failed")).pipe(
  Stream.catchCause(() => Stream.succeed("recovered"))
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
  // Output: [ "recovered" ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const failCause: <E>(cause: Cause.Cause<E>) => Stream<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L977)

Since v2.0.0

## failCauseSync

The stream that always fails with the specified lazily evaluated `Cause`.

**Example** (Failing with a lazy cause)

```ts
import { Cause, Console, Effect, Stream } from "effect"

const stream = Stream.failCauseSync(() => Cause.fail("Connection timeout after retries"))

const program = Effect.gen(function* () {
  const exit = yield* Stream.runCollect(stream).pipe(Effect.exit)
  yield* Console.log(exit)
})

Effect.runPromise(program)
// Output:
// { _id: 'Exit', _tag: 'Failure', cause: { _id: 'Cause', _tag: 'Fail', failure: 'Connection timeout after retries' } }
```

**Signature**

```ts
declare const failCauseSync: <E>(evaluate: LazyArg<Cause.Cause<E>>) => Stream<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1037)

Since v2.0.0

## failSync

Terminates with the specified lazily evaluated error.

**Example** (Failing a stream lazily)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.failSync(() => "Uh oh!")

const program = Effect.gen(function* () {
  const exit = yield* Stream.runCollect(stream).pipe(Effect.exit)
  yield* Console.log(exit)
})

Effect.runPromise(program)
// Output:
// { _id: 'Exit', _tag: 'Failure', cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' } }
```

**Signature**

```ts
declare const failSync: <E>(evaluate: LazyArg<E>) => Stream<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L951)

Since v2.0.0

## fromArray

Creates a stream from an array of values.

**Example** (Creating a stream from an array of values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromArray([1, 2, 3])
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromArray: <A>(array: ReadonlyArray<A>) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1203)

Since v4.0.0

## fromArrayEffect

Creates a stream from an effect that produces an array of values.

**When to use**

Use when the array must be acquired from an Effect before the stream emits,
and acquisition services or failures should be part of the stream.

**Example** (Creating a stream from an effect that produces an array of values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromArrayEffect(Effect.succeed(["Ada", "Grace"]))
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ "Ada", "Grace" ]
```

**Signature**

```ts
declare const fromArrayEffect: <A, E, R>(
  effect: Effect.Effect<ReadonlyArray<A>, E, R>
) => Stream<A, Pull.ExcludeDone<E>, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1232)

Since v4.0.0

## fromArrays

Creates a stream from an arbitrary number of arrays.

**Example** (Creating a stream from an arbitrary number of arrays)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromArrays([1, 2], [3, 4])
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3, 4 ]
```

**Signature**

```ts
declare const fromArrays: <Arr extends ReadonlyArray<ReadonlyArray<any>>>(...arrays: Arr) => Stream<Arr[number][number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1257)

Since v4.0.0

## fromAsyncIterable

Creates a stream from an AsyncIterable.

**Example** (Creating a stream from an AsyncIterable)

```ts
import { Data, Effect, Stream } from "effect"

class StreamError extends Data.TaggedError("StreamError")<{ readonly cause: unknown }> {}

const iterable = (async function* () {
  yield 1
  yield 2
  yield 3
})()

Effect.runPromise(
  Effect.gen(function* () {
    const stream = Stream.fromAsyncIterable(iterable, (cause) => new StreamError({ cause }))
    const values = yield* Stream.runCollect(stream)
    yield* Effect.sync(() => console.log(values))
  })
)

// [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromAsyncIterable: <A, E>(iterable: AsyncIterable<A>, onError: (error: unknown) => E) => Stream<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1458)

Since v2.0.0

## fromChannel

Creates a stream from a array-emitting `Channel`.

**Example** (Creating a stream from an array-emitting channel)

```ts
import { Channel, Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const channel = Channel.succeed([1, 2, 3] as const)
  const stream = Stream.fromChannel(channel)
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromChannel: <Arr extends Arr.NonEmptyReadonlyArray<any>, E, R>(
  channel: Channel.Channel<Arr, E, void, unknown, unknown, unknown, R>
) => Stream<Arr extends Arr.NonEmptyReadonlyArray<infer A> ? A : never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L339)

Since v2.0.0

## fromEffect

Creates a stream from an effect.

**Example** (Creating a stream from an effect)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromEffect(Effect.succeed(42))
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 42 ]
```

**Signature**

```ts
declare const fromEffect: <A, E, R>(effect: Effect.Effect<A, E, R>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L364)

Since v2.0.0

## fromEffectDrain

Creates a stream that runs the effect and emits no elements.

**Example** (Draining an effect into a stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  yield* Stream.fromEffectDrain(Console.log("Draining side effect")).pipe(Stream.runDrain)
})

Effect.runPromise(program)
// Output: Draining side effect
```

**Signature**

```ts
declare const fromEffectDrain: <A, E, R>(effect: Effect.Effect<A, E, R>) => Stream<never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L468)

Since v4.0.0

## fromEffectRepeat

Creates a stream from an effect producing a value of type `A` which repeats forever.

**Example** (Repeating an effect forever)

```ts
import { Console, Effect, Random, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromEffectRepeat(Random.nextInt).pipe(Stream.take(5))
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 3891571149, 4239494205, 2352981603, 2339111046, 1488052210 ]
```

**Signature**

```ts
declare const fromEffectRepeat: <A, E, R>(effect: Effect.Effect<A, E, R>) => Stream<A, Pull.ExcludeDone<E>, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L494)

Since v4.0.0

## fromEffectSchedule

Creates a stream from an effect producing a value of type `A`, which is
repeated using the specified schedule.

**Example** (Repeating an effect with a schedule)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromEffectSchedule(Effect.succeed("ping"), Schedule.recurs(2))
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ "ping", "ping", "ping" ]
```

**Signature**

```ts
declare const fromEffectSchedule: <A, E, R, X, AS extends A, ES, RS>(
  effect: Effect.Effect<A, E, R>,
  schedule: Schedule.Schedule<X, AS, ES, RS>
) => Stream<A, E | ES, R | RS>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L522)

Since v4.0.0

## fromEventListener

Creates a stream from an event listener.

**Example** (Creating a stream from an event listener)

```ts
import { Effect, Stream } from "effect"

class NumberTarget implements Stream.EventListener<number> {
  addEventListener(event: string, f: (event: number) => void) {
    if (event === "data") {
      f(1)
      f(2)
      f(3)
    }
  }
  removeEventListener(_event: string, _f: (event: number) => void) {}
}

Effect.runPromise(
  Effect.gen(function* () {
    const stream = Stream.fromEventListener(new NumberTarget(), "data").pipe(Stream.take(3))
    const values = yield* Stream.runCollect(stream)
    yield* Effect.sync(() => console.log(values))
  })
)

// [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromEventListener: <A = unknown>(
  target: EventListener<A>,
  type: string,
  options?:
    | boolean
    | {
        readonly capture?: boolean
        readonly passive?: boolean
        readonly once?: boolean
        readonly bufferSize?: number | undefined
      }
    | undefined
) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1591)

Since v3.1.0

## fromIterable

Creates a new `Stream` from an iterable collection of values.

**Details**

- `chunkSize`: Maximum number of values emitted per chunk.

**Example** (Creating a stream from an iterable)

```ts
import { Console, Effect, Stream } from "effect"

const numbers = [1, 2, 3]

const program = Effect.gen(function* () {
  const stream = Stream.fromIterable(numbers)
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromIterable: <A>(
  iterable: Iterable<A>,
  options?: { readonly chunkSize?: number | undefined }
) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1102)

Since v2.0.0

## fromIterableEffect

Creates a stream from an effect producing an iterable of values.

**When to use**

Use when the iterable must be acquired from an Effect before the stream emits,
and acquisition services or failures should be part of the stream.

**Example** (Creating a stream from an iterable effect)

```ts
import { Console, Context, Effect, Stream } from "effect"

class UserRepo extends Context.Service<
  UserRepo,
  {
    readonly list: Effect.Effect<ReadonlyArray<string>>
  }
>()("UserRepo") {}

const listUsers = Effect.service(UserRepo).pipe(Effect.andThen((repo) => repo.list))

const stream = Stream.fromIterableEffect(listUsers)

const program = Effect.gen(function* () {
  const users = yield* stream.pipe(
    Stream.provideService(UserRepo, {
      list: Effect.succeed(["user1", "user2"])
    }),
    Stream.runCollect
  )
  yield* Console.log(users)
})

Effect.runPromise(program)
// Output: [ "user1", "user2" ]
```

**Signature**

```ts
declare const fromIterableEffect: <A, E, R>(iterable: Effect.Effect<Iterable<A>, E, R>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1152)

Since v2.0.0

## fromIterableEffectRepeat

Creates a stream by repeatedly running an effect that yields an iterable of values.

**Example** (Repeating an iterable effect)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromIterableEffectRepeat(Effect.succeed([1, 2])).pipe(Stream.take(5))
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 1, 2, 1 ]
```

**Signature**

```ts
declare const fromIterableEffectRepeat: <A, E, R>(
  iterable: Effect.Effect<Iterable<A>, E, R>
) => Stream<A, Pull.ExcludeDone<E>, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1178)

Since v4.0.0

## fromIteratorSucceed

Creates a stream that consumes values from an iterator.

**Details**

The `maxChunkSize` parameter controls how many values are pulled per chunk.

**Example** (Consuming values from an iterator)

```ts
import { Console, Effect, Stream } from "effect"

function* numbers() {
  yield 1
  yield 2
  yield 3
}

const stream = Stream.fromIteratorSucceed(numbers())

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromIteratorSucceed: <A>(iterator: IterableIterator<A>, maxChunkSize?: number) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1072)

Since v2.0.0

## fromPubSub

Creates a stream from a subscription to a `PubSub`.

**Example** (Creating a stream from a subscription to a PubSub)

```ts
import { Console, Effect, Fiber, PubSub, Stream } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.unbounded<number>()

  const fiber = yield* Stream.fromPubSub(pubsub).pipe(Stream.take(3), Stream.runCollect, Effect.forkChild)

  yield* PubSub.publish(pubsub, 1)
  yield* PubSub.publish(pubsub, 2)
  yield* PubSub.publish(pubsub, 3)

  const values = yield* Fiber.join(fiber)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromPubSub: <A>(pubsub: PubSub.PubSub<A>) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1328)

Since v2.0.0

## fromPubSubTake

Creates a stream from a PubSub of `Take` values.

**Details**

`Take` values include end and failure signals.

**Example** (Creating a stream from PubSub takes)

```ts
import { Console, Effect, Exit, PubSub, Stream, Take } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.unbounded<Take.Take<number, string>>({
    replay: 3
  })

  yield* PubSub.publish(pubsub, [1])
  yield* PubSub.publish(pubsub, [2])
  yield* PubSub.publish(pubsub, Exit.succeed<void>(undefined))

  const values = yield* Stream.fromPubSubTake(pubsub).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const fromPubSubTake: <A, E>(pubsub: PubSub.PubSub<Take.Take<A, E>>) => Stream<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1362)

Since v4.0.0

## fromPull

Creates a stream from a pull effect, such as one produced by `Stream.toPull`.

**Details**

A pull effect yields chunks on demand and completes when the upstream stream ends.
See `Stream.toPull` for a matching producer.

**Example** (Creating a stream from a pull effect)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.scoped(
  Effect.gen(function* () {
    const source = Stream.make(1, 2, 3)
    const pull = yield* Stream.toPull(source)
    const stream = Stream.fromPull(Effect.succeed(pull))
    const values = yield* Stream.runCollect(stream)
    yield* Console.log(values)
  })
)

Effect.runPromise(program)
// Output: [1, 2, 3]
```

**Signature**

```ts
declare const fromPull: <A, E, R, EX, RX>(
  pull: Effect.Effect<Pull.Pull<Arr.NonEmptyReadonlyArray<A>, E, void, R>, EX, RX>
) => Stream<A, Pull.ExcludeDone<E> | EX, R | RX>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L614)

Since v2.0.0

## fromQueue

Creates a stream that pulls values from a `Queue.Dequeue`.

**Details**

The stream emits non-empty batches of queued values and ends when the queue
fails with `Cause.Done`; other queue failures are propagated.

**Example** (Creating a stream from a queue of values)

```ts
import { Console, Effect, Queue, Stream } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.unbounded<number>()
  yield* Queue.offer(queue, 1)
  yield* Queue.offer(queue, 2)
  yield* Queue.offer(queue, 3)
  yield* Queue.shutdown(queue)

  const stream = Stream.fromQueue(queue)
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromQueue: <A, E>(queue: Queue.Dequeue<A, E>) => Stream<A, Exclude<E, Cause.Done>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1293)

Since v2.0.0

## fromReadableStream

Creates a stream from a lazily supplied Web `ReadableStream`.

**Details**

The stream reads from a `ReadableStreamDefaultReader`, maps read failures
with `onError`, and closes the reader when the stream finalizes. By default
the reader is canceled; set `releaseLockOnEnd` to release the lock instead.

**Example** (Creating a stream from a ReadableStream)

```ts
import { Console, Data, Effect, Stream } from "effect"

class StreamError extends Data.TaggedError("StreamError")<{ readonly cause: unknown }> {}

const readableStream = new ReadableStream({
  start(controller) {
    controller.enqueue(1)
    controller.enqueue(2)
    controller.enqueue(3)
    controller.close()
  }
})

const program = Effect.gen(function* () {
  const stream = Stream.fromReadableStream({
    evaluate: () => readableStream,
    onError: (cause) => new StreamError({ cause })
  })
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const fromReadableStream: <A, E>(options: {
  readonly evaluate: LazyArg<ReadableStream<A>>
  readonly onError: (error: unknown) => E
  readonly releaseLockOnEnd?: boolean | undefined
}) => Stream<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1406)

Since v2.0.0

## fromSchedule

Creates a stream that emits each output of a schedule that does not require input,
for as long as the schedule continues.

**Example** (Creating a stream from a schedule)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const schedule = Schedule.spaced("50 millis").pipe(Schedule.both(Schedule.recurs(2)))
  const stream = Stream.fromSchedule(schedule)
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 0, 1, 2 ]
```

**Signature**

```ts
declare const fromSchedule: <O, E, R>(schedule: Schedule.Schedule<O, unknown, E, R>) => Stream<O, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1488)

Since v2.0.0

## fromSubscription

Creates a stream from a PubSub subscription.

**When to use**

Use when you already have a `PubSub.Subscription` and want to expose its
messages as a `Stream`, with `Stream.take` or cancellation controlling how
many values are consumed.

**Example** (Creating a stream from a PubSub subscription)

```ts
import { Console, Effect, PubSub, Stream } from "effect"

const program = Effect.scoped(
  Effect.gen(function* () {
    const pubsub = yield* PubSub.unbounded<number>()
    const subscription = yield* PubSub.subscribe(pubsub)

    yield* PubSub.publish(pubsub, 1)
    yield* PubSub.publish(pubsub, 2)

    const stream = Stream.fromSubscription(subscription)
    const values = yield* stream.pipe(Stream.take(2), Stream.runCollect)
    yield* Console.log(values)
  })
)

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const fromSubscription: <A>(pubsub: PubSub.Subscription<A>) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1529)

Since v4.0.0

## iterate

Creates an infinite stream by repeatedly applying a function to a seed value.

**Example** (Iterating from a seed value)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.iterate(1, (n) => n + 1).pipe(Stream.take(3))

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const iterate: <A>(value: A, next: (value: A) => A) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1729)

Since v2.0.0

## make

Creates a stream from a sequence of values.

**Example** (Creating a stream from a sequence of values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values) // [ 1, 2, 3 ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const make: <const As extends ReadonlyArray<any>>(...values: As) => Stream<As[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L850)

Since v2.0.0

## never

The stream that never produces any value or fails with any error.

**Example** (Creating a never-ending stream)

```ts
import { Effect, Stream } from "effect"

const program = Stream.never.pipe(Stream.take(0), Stream.runCollect)

Effect.runPromise(program).then(console.log)
// []
```

**Signature**

```ts
declare const never: Stream<never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1799)

Since v2.0.0

## paginate

Creates a stream by repeatedly evaluating an effectful page function.

**When to use**

Use to consume paginated APIs where each step returns a batch of values
together with an optional next state.

**Details**

This is similar to `unfold`, but each step can emit zero or more values
and independently decide whether another state should be requested.

**Example** (Paginating stream state)

```ts
import { Console, Effect, Option, Stream } from "effect"

const stream = Stream.paginate(0, (n: number) =>
  Effect.succeed([[n], n < 3 ? Option.some(n + 1) : Option.none<number>()] as const)
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// Output: [ 0, 1, 2, 3 ]
```

**Signature**

```ts
declare const paginate: <S, A, E = never, R = never>(
  s: S,
  f: (s: S) => Effect.Effect<readonly [ReadonlyArray<A>, Option.Option<S>], E, R>
) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1684)

Since v2.0.0

## range

Constructs a stream from a range of integers, including both endpoints.

**Details**

If the provided `min` is greater than `max`, the stream will not emit any
values.

**Example** (Creating a numeric range)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.range(1, 5).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3, 4, 5 ]
```

**Signature**

```ts
declare const range: (min: number, max: number, chunkSize?: number) => Stream<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1757)

Since v2.0.0

## scoped

Runs a stream that requires `Scope` in a managed scope, ensuring its
finalizers are run when the stream completes.

**Example** (Scoping a stream)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.scoped(
  Stream.fromEffect(
    Effect.acquireRelease(Console.log("acquire").pipe(Effect.as("resource")), () => Console.log("release"))
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// acquire
// release
// [ "resource" ]
```

**Signature**

```ts
declare const scoped: <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1854)

Since v2.0.0

## succeed

Creates a single-valued pure stream.

**Example** (Creating a single-valued pure stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.succeed(3).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// [ 3 ]
```

**Signature**

```ts
declare const succeed: <A>(value: A) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L827)

Since v2.0.0

## suspend

Creates a lazily constructed stream.

**Details**

The stream factory is evaluated each time the stream is run.

**Example** (Creating a lazily constructed stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.suspend(() => Stream.make(1, 2, 3)).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const suspend: <A, E, R>(stream: LazyArg<Stream<A, E, R>>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L902)

Since v2.0.0

## sync

Creates a stream that synchronously evaluates a function and emits the result as a single value.

**Details**

The function is evaluated each time the stream is run.

**Example** (Evaluating a value synchronously)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.sync(() => 2 + 1).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 3 ]
```

**Signature**

```ts
declare const sync: <A>(evaluate: LazyArg<A>) => Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L876)

Since v2.0.0

## tick

Creates a stream that emits `void` immediately once, then emits another
`void` after each specified interval.

**Example** (Emitting ticks on an interval)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const ticks = yield* Stream.tick("200 millis").pipe(Stream.take(3), Stream.runCollect)
  yield* Console.log(ticks)
})

Effect.runPromise(program)
// Output: [ undefined, undefined, undefined ]
```

**Signature**

```ts
declare const tick: (interval: Duration.Input) => Stream<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L570)

Since v2.0.0

## toChannel

Creates a channel from a stream.

**Example** (Converting a stream to a channel)

```ts
import { Channel, Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3)
  const channel = Stream.toChannel(stream)
  const values = yield* Channel.runCollect(channel)
  yield* Console.log(values.flat())
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const toChannel: <A, E, R>(
  stream: Stream<A, E, R>
) => Channel.Channel<Arr.NonEmptyReadonlyArray<A>, E, void, unknown, unknown, unknown, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L733)

Since v2.0.0

## transformPull

Derives a stream by transforming its pull effect.

**Example** (Transforming a pull effect)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const transformed = Stream.transformPull(stream, (pull) => Effect.succeed(pull))

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(transformed)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const transformPull: <A, E, R, B, E2, R2, EX, RX>(
  self: Stream<A, E, R>,
  f: (
    pull: Pull.Pull<Arr.NonEmptyReadonlyArray<A>, E, void>,
    scope: Scope.Scope
  ) => Effect.Effect<Pull.Pull<Arr.NonEmptyReadonlyArray<B>, E2, void, R2>, EX, RX>
) => Stream<B, EX | Pull.ExcludeDone<E2>, R | R2 | RX>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L642)

Since v4.0.0

## transformPullBracket

Transforms a stream by effectfully transforming its pull effect.

**Details**

A forked scope is also provided to the transformation function, which is
closed once the resulting stream has finished processing.

**Example** (Transforming a stream by effectfully transforming its pull effect)

```ts
import { Console, Effect, Scope, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const transformed = Stream.transformPullBracket(stream, (pull, _scope, forkedScope) =>
  Effect.gen(function* () {
    yield* Scope.addFinalizer(forkedScope, Console.log("Releasing scope"))
    return pull
  })
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(transformed)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [1, 2, 3]
// Releasing scope
```

**Signature**

```ts
declare const transformPullBracket: <A, E, R, B, E2, R2, EX, RX>(
  self: Stream<A, E, R>,
  f: (
    pull: Pull.Pull<Arr.NonEmptyReadonlyArray<A>, E, void, R>,
    scope: Scope.Scope,
    forkedScope: Scope.Scope
  ) => Effect.Effect<Pull.Pull<Arr.NonEmptyReadonlyArray<B>, E2, void, R2>, EX, RX>
) => Stream<B, EX | Pull.ExcludeDone<E2>, R | R2 | RX>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L693)

Since v4.0.0

## unfold

Creates a stream by repeatedly applying an effectful step function to a
state.

**Details**

Each `readonly [value, nextState]` result emits `value` and continues with
`nextState`; returning `undefined` ends the stream.

**Example** (Unfolding stream state)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.unfold(1, (n) => Effect.succeed([n, n + 1] as const))
  const values = yield* Stream.runCollect(stream.pipe(Stream.take(5)))
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3, 4, 5 ]
```

**Signature**

```ts
declare const unfold: <S, A, E, R>(
  s: S,
  f: (s: S) => Effect.Effect<readonly [A, S] | undefined, E, R>
) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1638)

Since v2.0.0

## unwrap

Creates a stream produced from an `Effect`.

**Example** (Unwrapping a stream effect)

```ts
import { Console, Effect, Stream } from "effect"

const effect = Effect.succeed(Stream.make(1, 2, 3))

const stream = Stream.unwrap(effect)

const program = Effect.gen(function* () {
  const chunk = yield* Stream.runCollect(stream)
  yield* Console.log(chunk)
})
// [1, 2, 3]
```

**Signature**

```ts
declare const unwrap: <A, E2, R2, E, R>(
  effect: Effect.Effect<Stream<A, E2, R2>, E, R>
) => Stream<A, E | E2, R2 | Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1823)

Since v2.0.0

# context

## service

Accesses a service from the context and emits it as a single element.

**Example** (Accessing a service as a stream)

```ts
import { Context, Effect, Stream } from "effect"

class Greeter extends Context.Service<
  Greeter,
  {
    readonly greet: (name: string) => string
  }
>()("Greeter") {}

const stream = Stream.service(Greeter).pipe(Stream.map((greeter) => greeter.greet("World")))

const program = Effect.gen(function* () {
  return yield* stream.pipe(
    Stream.provideService(Greeter, {
      greet: (name) => `Hello, ${name}!`
    }),
    Stream.runCollect
  )
})

Effect.runPromise(program)
// Output: [ "Hello, World!" ]
```

**Signature**

```ts
declare const service: <I, S>(service: Context.Key<I, S>) => Stream<S, never, I>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L399)

Since v4.0.0

## serviceOption

Optionally accesses a service from the context and emits the result as a
single element.

**When to use**

Use when you need a stream that emits an optional service from the context
without requiring that service to be present.

**Example** (Accessing an optional service as a stream)

```ts
import { Context, Effect, Option, Stream } from "effect"

class Greeter extends Context.Service<
  Greeter,
  {
    readonly greet: (name: string) => string
  }
>()("Greeter") {}

const stream = Stream.serviceOption(Greeter).pipe(
  Stream.map((maybeGreeter) =>
    Option.match(maybeGreeter, {
      onNone: () => "No greeter",
      onSome: (greeter) => greeter.greet("World")
    })
  )
)

const program = Effect.gen(function* () {
  return yield* stream.pipe(
    Stream.provideService(Greeter, {
      greet: (name) => `Hello, ${name}!`
    }),
    Stream.runCollect
  )
})

Effect.runPromise(program)
// Output: [ "Hello, World!" ]
```

**Signature**

```ts
declare const serviceOption: <I, S>(service: Context.Key<I, S>) => Stream<Option.Option<S>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L444)

Since v4.0.0

# destructors

## mkString

Concatenates all emitted strings into a single string.

**Example** (Joining strings from a stream)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make("Hello", " ", "World", "!")
const program = Effect.gen(function* () {
  const text = yield* Stream.mkString(stream)
  yield* Console.log(text)
})

Effect.runPromise(program)
// Hello World!
```

**Signature**

```ts
declare const mkString: <E, R>(self: Stream<string, E, R>) => Effect.Effect<string, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11062)

Since v2.0.0

## mkUint8Array

Concatenates the stream's `Uint8Array` chunks into a single `Uint8Array`.

**Example** (Joining Uint8Array chunks)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(new Uint8Array([1, 2]), new Uint8Array([3, 4]))
const program = Effect.gen(function* () {
  const bytes = yield* Stream.mkUint8Array(stream)
  yield* Console.log([...bytes])
})

Effect.runPromise(program)
// [1, 2, 3, 4]
```

**Signature**

```ts
declare const mkUint8Array: <E, R>(self: Stream<Uint8Array, E, R>) => Effect.Effect<Uint8Array, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11090)

Since v4.0.0

## peel

Runs a sink to peel off enough elements to produce a value and returns that
value with the remaining stream in a scope.

**Details**

The returned stream is only valid within the scope.

**Example** (Peeling a stream with a sink)

```ts
import { Console, Effect, Sink, Stream } from "effect"

const stream = Stream.fromArrays([1, 2, 3], [4, 5, 6])
const sink = Sink.take<number>(3)

const program = Effect.scoped(
  Effect.gen(function* () {
    const [peeled, rest] = yield* Stream.peel(stream, sink)
    const remaining = yield* Stream.runCollect(rest)
    yield* Console.log([peeled, remaining])
  })
)

Effect.runPromise(program)
// Output: [ [1, 2, 3], [4, 5, 6] ]
```

**Signature**

```ts
declare const peel: {
  <A2, A, E2, R2>(
    sink: Sink.Sink<A2, A, A, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<[A2, Stream<A, E, never>], E2 | E, Scope.Scope | R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    sink: Sink.Sink<A2, A, A, E2, R2>
  ): Effect.Effect<[A2, Stream<A, E, never>], E | E2, Scope.Scope | R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4772)

Since v2.0.0

## run

Runs a stream with a sink and returns the sink result.

**Example** (Running a stream with a sink)

```ts
import { Console, Effect, Sink, Stream } from "effect"

const program = Stream.run(Stream.make(1, 2, 3), Sink.sum)

Effect.runPromise(Effect.flatMap(program, Console.log))
// 6
```

**Signature**

```ts
declare const run: {
  <A2, A, L, E2, R2>(
    sink: Sink.Sink<A2, A, L, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<A2, E2 | E, R | R2>
  <A, E, R, L, A2, E2, R2>(self: Stream<A, E, R>, sink: Sink.Sink<A2, A, L, E2, R2>): Effect.Effect<A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10577)

Since v2.0.0

## runCollect

Runs the stream and collects all elements into an array.

**Example** (Collecting stream values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)

const program = Effect.gen(function* () {
  const collected = yield* Stream.runCollect(stream)
  yield* Console.log(collected)
})

Effect.runPromise(program)
// [1, 2, 3, 4, 5]
```

**Signature**

```ts
declare const runCollect: <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<Array<A>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10618)

Since v2.0.0

## runCount

Runs the stream and returns the number of elements emitted.

**Example** (Counting stream values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)

const program = Effect.gen(function* () {
  const count = yield* Stream.runCount(stream)
  yield* Console.log(count)
})

Effect.runPromise(program)
// 5
```

**Signature**

```ts
declare const runCount: <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<number, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10652)

Since v2.0.0

## runDrain

Runs the stream for its effects, discarding emitted elements.

**Example** (Draining a stream run)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3).pipe(Stream.mapEffect((n) => Console.log(`Processing: ${n}`)))

  yield* Stream.runDrain(stream)
})

Effect.runPromise(program)
// Processing: 1
// Processing: 2
// Processing: 3
```

**Signature**

```ts
declare const runDrain: <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<void, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11005)

Since v2.0.0

## runFold

Runs the stream and folds elements using a pure reducer.

**Example** (Folding stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const total = yield* Stream.runFold(
    Stream.make(1, 2, 3),
    () => 0,
    (acc, n) => acc + n
  )
  yield* Console.log(total)
})

Effect.runPromise(program)
// 6
```

**Signature**

```ts
declare const runFold: {
  <Z, A>(initial: LazyArg<Z>, f: (acc: Z, a: A) => Z): <E, R>(self: Stream<A, E, R>) => Effect.Effect<Z, E, R>
  <A, E, R, Z>(self: Stream<A, E, R>, initial: LazyArg<Z>, f: (acc: Z, a: A) => Z): Effect.Effect<Z, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10707)

Since v2.0.0

## runFoldEffect

Runs the stream and folds elements using an effectful reducer.

**When to use**

Use when reducing stream elements needs Effects, services, or failures in the
reducer.

**Example** (Effectfully folding stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const total = yield* Stream.runFoldEffect(
    Stream.make(1, 2, 3),
    () => 0,
    (acc, n) => Effect.succeed(acc + n)
  )
  yield* Console.log(total)
})

Effect.runPromise(program)
// 6
```

**Signature**

```ts
declare const runFoldEffect: {
  <Z, A, EX, RX>(
    initial: LazyArg<Z>,
    f: (acc: Z, a: A) => Effect.Effect<Z, EX, RX>
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<Z, E | EX, R | RX>
  <A, E, R, Z, EX, RX>(
    self: Stream<A, E, R>,
    initial: LazyArg<Z>,
    f: (acc: Z, a: A) => Effect.Effect<Z, EX, RX>
  ): Effect.Effect<Z, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10760)

Since v2.0.0

## runForEach

Runs the provided effectful callback for each element of the stream.

**Example** (Running an effect for each value)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const program = Effect.gen(function* () {
  yield* Stream.runForEach(stream, (n) => Console.log(`Processing: ${n}`))
})

Effect.runPromise(program)
// Processing: 1
// Processing: 2
// Processing: 3
```

**Signature**

```ts
declare const runForEach: {
  <A, X, E2, R2>(
    f: (a: A) => Effect.Effect<X, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<void, E2 | E, R2 | R>
  <A, E, R, X, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: A) => Effect.Effect<X, E2, R2>
  ): Effect.Effect<void, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10866)

Since v2.0.0

## runForEachArray

Consumes the stream in chunks, passing each non-empty array to the callback.

**Example** (Consuming stream chunks)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)
const program = Effect.gen(function* () {
  yield* Stream.runForEachArray(stream, (chunk) => Console.log(`Processing chunk: ${chunk.join(", ")}`))
})

Effect.runPromise(program)
// Processing chunk: 1, 2, 3, 4, 5
```

**Signature**

```ts
declare const runForEachArray: {
  <A, X, E2, R2>(
    f: (a: Arr.NonEmptyReadonlyArray<A>) => Effect.Effect<X, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<void, E2 | E, R2 | R>
  <A, E, R, X, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: Arr.NonEmptyReadonlyArray<A>) => Effect.Effect<X, E2, R2>
  ): Effect.Effect<void, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10967)

Since v4.0.0

## runForEachWhile

Runs the stream, applying the effectful predicate to each element and
stopping when it returns `false`.

**Example** (Running effects while a predicate holds)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3, 4, 5)

  yield* Stream.runForEachWhile(stream, (n) =>
    Effect.gen(function* () {
      yield* Console.log(`Processing: ${n}`)
      return n < 3
    })
  )
})

Effect.runPromise(program)
// Processing: 1
// Processing: 2
// Processing: 3
```

**Signature**

```ts
declare const runForEachWhile: {
  <A, E2, R2>(
    f: (a: A) => Effect.Effect<boolean, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<void, E2 | E, R2 | R>
  <A, E, R, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: A) => Effect.Effect<boolean, E2, R2>
  ): Effect.Effect<void, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10916)

Since v2.0.0

## runHead

Runs the stream and returns the first element as an `Option`.

**Example** (Getting the first stream value)

```ts
import { Console, Effect, Option, Stream } from "effect"

const program = Effect.gen(function* () {
  const head = yield* Stream.runHead(Stream.make(1, 2, 3))
  yield* Console.log(Option.getOrThrow(head))
})

Effect.runPromise(program)
// 1
```

**Signature**

```ts
declare const runHead: <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<Option.Option<A>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10813)

Since v2.0.0

## runIntoPubSub

Runs the stream, publishing elements into the provided PubSub.

**Details**

`shutdownOnEnd` controls whether the PubSub is shut down when the stream ends.
It only shuts down when set to `true`.

**Example** (Running a stream into a PubSub)

```ts
import { Console, Effect, PubSub, Stream } from "effect"

const program = Effect.scoped(
  Effect.gen(function* () {
    const pubsub = yield* PubSub.unbounded<number>()
    const subscription = yield* PubSub.subscribe(pubsub)

    yield* Stream.runIntoPubSub(Stream.fromIterable([1, 2]), pubsub)

    const first = yield* PubSub.take(subscription)
    const second = yield* PubSub.take(subscription)

    yield* Console.log(first)
    yield* Console.log(second)
  })
)

Effect.runPromise(program)
//=> 1
//=> 2
```

**Signature**

```ts
declare const runIntoPubSub: {
  <A>(
    pubsub: PubSub.PubSub<A>,
    options?: { readonly shutdownOnEnd?: boolean | undefined } | undefined
  ): <E, R>(self: Stream<A, E, R>) => Effect.Effect<void, E, R>
  <A, E, R>(
    self: Stream<A, E, R>,
    pubsub: PubSub.PubSub<A>,
    options?: { readonly shutdownOnEnd?: boolean | undefined } | undefined
  ): Effect.Effect<void, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11471)

Since v2.0.0

## runIntoQueue

Runs the stream, offering each element to the provided queue and ending it
with `Cause.Done` when the stream completes.

**Example** (Running a stream into a queue)

```ts
import { Cause, Effect, Queue, Stream } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number, Cause.Done>(4)

  yield* Effect.forkChild(Stream.runIntoQueue(Stream.fromIterable([1, 2, 3]), queue))

  const values = [yield* Queue.take(queue), yield* Queue.take(queue), yield* Queue.take(queue)]
  const done = yield* Effect.flip(Queue.take(queue))

  return { values, done }
})
```

**Signature**

```ts
declare const runIntoQueue: {
  <A, E>(queue: Queue.Queue<A, E | Cause.Done>): <R>(self: Stream<A, E, R>) => Effect.Effect<void, never, R>
  <A, E, R>(self: Stream<A, E, R>, queue: Queue.Queue<A, E | Cause.Done>): Effect.Effect<void, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11716)

Since v2.0.0

## runLast

Runs the stream and returns the last element as an `Option`.

**When to use**

Use to consume a finite stream when only the final emitted element matters.

**Details**

`Option.some` contains the last emitted element. `Option.none` means the
stream completed without emitting.

**Gotchas**

The returned effect waits for the stream to complete before it can produce a
value.

**See**

- `runHead` for consuming only the first emitted element
- `runCollect` for collecting every emitted element
- `runDrain` for consuming the stream while discarding emitted elements

**Signature**

```ts
declare const runLast: <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<Option.Option<A>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10840)

Since v2.0.0

## runSum

Runs the stream and returns the numeric sum of its elements.

**Example** (Summing stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const total = yield* Stream.runSum(Stream.make(1, 2, 3))
  yield* Console.log(total)
})

Effect.runPromise(program)
// 6
```

**Signature**

```ts
declare const runSum: <E, R>(self: Stream<number, E, R>) => Effect.Effect<number, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10675)

Since v2.0.0

## toAsyncIterable

Converts a stream to an `AsyncIterable` for `for await...of` consumption.

**Example** (Converting to an async iterable)

```ts
import { Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const collect = async () => {
  const iterable = Stream.toAsyncIterable(stream)
  const values: Array<number> = []
  for await (const value of iterable) {
    values.push(value)
  }
  console.log(values)
}

collect()
// [ 1, 2, 3 ]
```

**Signature**

```ts
declare const toAsyncIterable: <A, E>(self: Stream<A, E>) => AsyncIterable<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11434)

Since v3.15.0

## toAsyncIterableEffect

Creates an effect that yields an `AsyncIterable` using the current services.

**When to use**

Use when the `AsyncIterable` should be created inside Effect with the current
context supplying the stream's services.

**Example** (Creating an AsyncIterable effect)

```ts
import { Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const program = Effect.gen(function* () {
  const iterable = yield* Stream.toAsyncIterableEffect(stream)
  const values = yield* Effect.promise(async () => {
    const collected: Array<number> = []
    for await (const value of iterable) {
      collected.push(value)
    }
    return collected
  })
  yield* Effect.sync(() => console.log(values))
})

Effect.runPromise(program)
// [ 1, 2, 3 ]
```

**Signature**

```ts
declare const toAsyncIterableEffect: <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<AsyncIterable<A>, never, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11402)

Since v3.15.0

## toAsyncIterableWith

Converts the stream to an `AsyncIterable` using the provided services.

**When to use**

Use when converting outside an Effect and you already have the `Context`
needed to run the stream.

**Example** (Converting to an AsyncIterable with services)

```ts
import { Context, Stream } from "effect"

const stream = Stream.make(1, 2, 3)
const iterable = Stream.toAsyncIterableWith(stream, Context.empty())

const collect = async () => {
  const results: Array<number> = []
  for await (const value of iterable) {
    results.push(value)
  }
  console.log(results)
}

collect()
// [ 1, 2, 3 ]
```

**Signature**

```ts
declare const toAsyncIterableWith: {
  <XR>(context: Context.Context<XR>): <A, E, R extends XR>(self: Stream<A, E, R>) => AsyncIterable<A>
  <A, E, XR, R extends XR>(self: Stream<A, E, R>, context: Context.Context<XR>): AsyncIterable<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11322)

Since v4.0.0

## toPubSub

Converts a stream to a PubSub of emitted values for concurrent consumption.

**Details**

`shutdownOnEnd` indicates whether the PubSub should be shut down when the
stream ends. By default this is `true`.

**Example** (Converting a stream to a PubSub for concurrent consumption)

```ts
import { Console, Effect, PubSub, Stream } from "effect"

const program = Effect.scoped(
  Effect.gen(function* () {
    const pubsub = yield* Stream.fromArray([1, 2]).pipe(Stream.toPubSub({ capacity: 8 }))
    const subscription = yield* PubSub.subscribe(pubsub)
    const first = yield* PubSub.take(subscription)

    yield* Console.log(first)
  })
)
```

**Signature**

```ts
declare const toPubSub: {
  (
    options:
      | {
          readonly capacity: "unbounded"
          readonly replay?: number | undefined
          readonly shutdownOnEnd?: boolean | undefined
        }
      | {
          readonly capacity: number
          readonly strategy?: "dropping" | "sliding" | "suspend" | undefined
          readonly replay?: number | undefined
          readonly shutdownOnEnd?: boolean | undefined
        }
  ): <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<PubSub.PubSub<A>, never, R | Scope.Scope>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | {
          readonly capacity: "unbounded"
          readonly replay?: number | undefined
          readonly shutdownOnEnd?: boolean | undefined
        }
      | {
          readonly capacity: number
          readonly strategy?: "dropping" | "sliding" | "suspend" | undefined
          readonly replay?: number | undefined
          readonly shutdownOnEnd?: boolean | undefined
        }
  ): Effect.Effect<PubSub.PubSub<A>, never, R | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11520)

Since v2.0.0

## toPubSubTake

Converts a stream to a PubSub of `Take` values for concurrent consumption.

**Details**

`Take` values include the stream's end and failure signals.

**Example** (Converting to a PubSub of takes)

```ts
import { Console, Effect, PubSub, Stream } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* Stream.fromArray([1, 2, 3]).pipe(Stream.toPubSubTake({ capacity: 8 }))
  const subscription = yield* PubSub.subscribe(pubsub)
  const take = yield* PubSub.take(subscription)

  if (Array.isArray(take)) {
    yield* Console.log(take)
  }
})
```

**Signature**

```ts
declare const toPubSubTake: {
  (
    options:
      | { readonly capacity: "unbounded"; readonly replay?: number | undefined }
      | {
          readonly capacity: number
          readonly strategy?: "dropping" | "sliding" | "suspend" | undefined
          readonly replay?: number | undefined
        }
  ): <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<PubSub.PubSub<Take.Take<A, E>>, never, R | Scope.Scope>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | { readonly capacity: "unbounded"; readonly replay?: number | undefined }
      | {
          readonly capacity: number
          readonly strategy?: "dropping" | "sliding" | "suspend" | undefined
          readonly replay?: number | undefined
        }
  ): Effect.Effect<PubSub.PubSub<Take.Take<A, E>>, never, R | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11591)

Since v4.0.0

## toPull

Returns a scoped pull for manually consuming the stream's output chunks.

**Details**

The pull fails with `Cause.Done` when the stream ends and with the stream
error on failure.

**Example** (Creating a scoped pull)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const program = Effect.scoped(
  Effect.gen(function* () {
    const pull = yield* Stream.toPull(stream)
    const chunk = yield* pull
    yield* Console.log(chunk)
  })
)

Effect.runPromise(program)
// [1, 2, 3]
```

**Signature**

```ts
declare const toPull: <A, E, R>(
  self: Stream<A, E, R>
) => Effect.Effect<Pull.Pull<Arr.NonEmptyReadonlyArray<A>, E>, never, R | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11037)

Since v2.0.0

## toQueue

Creates a scoped dequeue that is fed by the stream for concurrent
consumption.

**Details**

Elements are offered to the queue as the stream runs. Stream completion is
signaled with `Cause.Done`, stream failures fail the queue, and the queue is
shut down when the surrounding scope closes.

**Example** (Converting a stream to a Queue for concurrent consumption)

```ts
import { Effect, Queue, Stream } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Stream.toQueue(Stream.fromIterable([1, 2, 3]), { capacity: 8 })
  const chunk = yield* Queue.takeBetween(queue, 1, 3)
  return chunk
})
```

**Signature**

```ts
declare const toQueue: {
  (
    options:
      | { readonly capacity: "unbounded" }
      | { readonly capacity: number; readonly strategy?: "dropping" | "sliding" | "suspend" | undefined }
  ): <A, E, R>(self: Stream<A, E, R>) => Effect.Effect<Queue.Dequeue<A, E | Cause.Done>, never, R | Scope.Scope>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | { readonly capacity: "unbounded" }
      | { readonly capacity: number; readonly strategy?: "dropping" | "sliding" | "suspend" | undefined }
  ): Effect.Effect<Queue.Dequeue<A, E | Cause.Done>, never, R | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11654)

Since v2.0.0

## toReadableStream

Converts a stream to a `ReadableStream`.

**Details**

See https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream.

**Example** (Converting a stream to a ReadableStream)

```ts
import { Stream } from "effect"

const readableStream = Stream.toReadableStream(Stream.make(1, 2, 3))
const reader = readableStream.getReader()
```

**Signature**

```ts
declare const toReadableStream: {
  <A>(options?: { readonly strategy?: QueuingStrategy<A> | undefined }): <E>(self: Stream<A, E>) => ReadableStream<A>
  <A, E>(self: Stream<A, E>, options?: { readonly strategy?: QueuingStrategy<A> | undefined }): ReadableStream<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11221)

Since v2.0.0

## toReadableStreamEffect

Creates an Effect that builds a ReadableStream from the stream.

**When to use**

Use when bridging to Web Streams from inside an `Effect` so the required
services can be captured from the current context.

**Details**

See https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream.

**Example** (Creating a ReadableStream effect)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)

const effect = Effect.gen(function* () {
  const readableStream = yield* Stream.toReadableStreamEffect(stream)
  yield* Console.log(readableStream instanceof ReadableStream) // true
})

Effect.runPromise(effect)
```

**Signature**

```ts
declare const toReadableStreamEffect: {
  <A>(options?: {
    readonly strategy?: QueuingStrategy<A> | undefined
  }): <E, R>(self: Stream<A, E, R>) => Effect.Effect<ReadableStream<A>, never, R>
  <A, E, R>(
    self: Stream<A, E, R>,
    options?: { readonly strategy?: QueuingStrategy<A> | undefined }
  ): Effect.Effect<ReadableStream<A>, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11269)

Since v2.0.0

## toReadableStreamWith

Converts the stream to a `ReadableStream` using the provided services.

**When to use**

Use when bridging to Web Streams and you already have the `Context` required
to run the stream outside an `Effect`.

**Details**

See https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream.

**Example** (Converting to a ReadableStream with services)

```ts
import { Context, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)
const readableStream = Stream.toReadableStreamWith(stream, Context.empty())
```

**Signature**

```ts
declare const toReadableStreamWith: (<A, XR>(
  context: Context.Context<XR>,
  options?: { readonly strategy?: QueuingStrategy<A> | undefined }
) => <E, R extends XR>(self: Stream<A, E, R>) => ReadableStream<A>) &
  (<A, E, XR, R extends XR>(
    self: Stream<A, E, R>,
    context: Context.Context<XR>,
    options?: { readonly strategy?: QueuingStrategy<A> | undefined }
  ) => ReadableStream<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L11145)

Since v4.0.0

# do notation

## Do

Provides the entry point for do-notation style stream composition.

**Example** (Starting stream do notation)

```ts
import { Console, Effect, pipe, Stream } from "effect"

const program = pipe(
  Stream.Do,
  Stream.bind("value", () => Stream.fromArray([1, 2])),
  Stream.let("next", ({ value }) => value + 1)
)

const effect = Effect.gen(function* () {
  const collected = yield* Stream.runCollect(program)
  yield* Console.log(collected)
})

Effect.runPromise(effect)
//=> [{ value: 1, next: 2 }, { value: 2, next: 3 }]
```

**Signature**

```ts
declare const Do: Stream<{}, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10378)

Since v2.0.0

## bind

Binds the result of a stream to a field in the do-notation record.

**Example** (Binding a stream value)

```ts
import { Console, Effect, Stream } from "effect"

const program = Stream.Do.pipe(
  Stream.bind("a", () => Stream.make(1, 2)),
  Stream.bind("b", ({ a }) => Stream.succeed(a + 1))
)

const result = Stream.runCollect(program)

Effect.runPromise(Effect.flatMap(result, Console.log))
// [{ a: 1, b: 2 }, { a: 2, b: 3 }]
```

**Signature**

```ts
declare const bind: {
  <N extends string, A, B, E2, R2>(
    tag: Exclude<N, keyof A>,
    f: (_: NoInfer<A>) => Stream<B, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
      | undefined
  ): <E, R>(self: Stream<A, E, R>) => Stream<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }, E2 | E, R2 | R>
  <A, E, R, N extends string, B, E2, R2>(
    self: Stream<A, E, R>,
    tag: Exclude<N, keyof A>,
    f: (_: NoInfer<A>) => Stream<B, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
      | undefined
  ): Stream<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10447)

Since v2.0.0

## bindEffect

Binds an Effect-produced value into the do-notation record for each stream element.

**Example** (Binding an effect value)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.Do.pipe(
  Stream.bind("value", () => Stream.make(1, 2)),
  Stream.bindEffect("double", ({ value }) => Effect.succeed(value * 2))
)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// [{ value: 1, double: 2 }, { value: 2, double: 4 }]
```

**Signature**

```ts
declare const bindEffect: {
  <N extends string, A, B, E2, R2>(
    tag: Exclude<N, keyof A>,
    f: (_: NoInfer<A>) => Effect.Effect<B, E2, R2>,
    options?: {
      readonly concurrency?: number | "unbounded" | undefined
      readonly bufferSize?: number | undefined
      readonly unordered?: boolean | undefined
    }
  ): <E, R>(self: Stream<A, E, R>) => Stream<{ [K in keyof A | N]: K extends keyof A ? A[K] : B }, E | E2, R | R2>
  <A, E, R, N extends string, B, E2, R2>(
    self: Stream<A, E, R>,
    tag: Exclude<N, keyof A>,
    f: (_: NoInfer<A>) => Effect.Effect<B, E2, R2>,
    options?: {
      readonly concurrency?: number | "unbounded" | undefined
      readonly bufferSize?: number | undefined
      readonly unordered?: boolean | undefined
    }
  ): Stream<{ [K in keyof A | N]: K extends keyof A ? A[K] : B }, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10501)

Since v2.0.0

## bindTo

Maps each element into a record keyed by the provided name.

**Example** (Binding values to a record key)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3).pipe(Stream.bindTo("value"))

const program = Stream.runCollect(stream).pipe(Effect.flatMap(Console.log))

Effect.runPromise(program)
// [{ value: 1 }, { value: 2 }, { value: 3 }]
```

**Signature**

```ts
declare const bindTo: {
  <N extends string>(name: N): <A, E, R>(self: Stream<A, E, R>) => Stream<{ [K in N]: A }, E, R>
  <A, E, R, N extends string>(self: Stream<A, E, R>, name: N): Stream<{ [K in N]: A }, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10552)

Since v2.0.0

## let

Adds a computed field to the current Do-notation record.

**Example** (Adding a computed field)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.Do.pipe(
  Stream.let("x", () => 2),
  Stream.let("y", ({ x }) => x * 3)
)

const program = Effect.gen(function* () {
  const records = yield* Stream.runCollect(stream)
  yield* Console.log(records)
})

Effect.runPromise(program)
// [{ x: 2, y: 6 }]
```

**Signature**

```ts
declare const let: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => B
  ): <E, R>(self: Stream<A, E, R>) => Stream<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }, E, R>
  <A extends object, E, R, N extends string, B>(
    self: Stream<A, E, R>,
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => B
  ): Stream<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10422)

Since v2.0.0

# encoding

## decodeText

Decodes Uint8Array chunks into strings using TextDecoder with an optional encoding.

**Example** (Decoding Uint8Array chunks into strings using TextDecoder with an optional encoding)

```ts
import { Console, Effect, Stream } from "effect"

const encoder = new TextEncoder()
const stream = Stream.make(encoder.encode("Hello"), encoder.encode(" World"))

const program = Effect.gen(function* () {
  const decoded = yield* stream.pipe(Stream.decodeText, Stream.runCollect)
  yield* Console.log(decoded)
})

Effect.runPromise(program)
// ["Hello", " World"]
```

**Signature**

```ts
declare const decodeText: <
  Arg extends Stream<Uint8Array, any, any> | { readonly encoding?: string | undefined } | undefined = {
    readonly encoding?: string | undefined
  }
>(
  streamOrOptions?: Arg,
  options?: { readonly encoding?: string | undefined } | undefined
) => [Arg] extends [Stream<Uint8Array, infer _E, infer _R>]
  ? Stream<string, _E, _R>
  : <E, R>(self: Stream<Uint8Array, E, R>) => Stream<string, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9387)

Since v2.0.0

## encodeText

Encodes a stream of strings into UTF-8 `Uint8Array` chunks.

**Example** (Encoding a stream of strings into UTF-8 Uint8Array chunks)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make("Hello", " ", "World")
const program = Effect.gen(function* () {
  const encoded = Stream.encodeText(stream)
  const chunks = yield* Stream.runCollect(encoded)
  const bytes = chunks.map((chunk) => [...chunk])
  yield* Console.log(bytes)
})

Effect.runPromise(program)
// [[72, 101, 108, 108, 111], [32], [87, 111, 114, 108, 100]]
```

**Signature**

```ts
declare const encodeText: <E, R>(self: Stream<string, E, R>) => Stream<Uint8Array, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9433)

Since v2.0.0

## splitLines

Splits a stream of strings into lines, handling `\n`, `\r`, and `\r\n` delimiters across chunks.

**Example** (Splitting streamed text into lines)

```ts
import { Console, Effect, Stream } from "effect"

Effect.runPromise(
  Effect.gen(function* () {
    const lines = yield* Stream.runCollect(Stream.make("a\nb\r\n", "c\n").pipe(Stream.splitLines))
    yield* Console.log(lines)
  })
)
// ["a", "b", "c"]
```

**Signature**

```ts
declare const splitLines: <E, R>(self: Stream<string, E, R>) => Stream<string, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9459)

Since v2.0.0

# error handling

## catch

Switches over to the stream produced by the provided function if this one fails.

**Example** (Catching stream failures)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2).pipe(
  Stream.concat(Stream.fail("Oops!")),
  Stream.catch(() => Stream.make(999))
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 999 ]
```

**Signature**

```ts
declare const catch: { <E, A2, E2, R2>(f: (error: E) => Stream<A2, E2, R2>): <A, R>(self: Stream<A, E, R>) => Stream<A | A2, E2, R2 | R>; <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, f: (error: E) => Stream<A2, E2, R2>): Stream<A | A2, E2, R | R2>; }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5042)

Since v4.0.0

## catchCause

Switches over to the stream produced by the provided function in case this
one fails. Allows recovery from all causes of failure, including
interruption if the stream is uninterruptible.

**Example** (Catching stream causes)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2).pipe(Stream.concat(Stream.fail("Oops!")), Stream.concat(Stream.make(3, 4)))

const recovered = stream.pipe(Stream.catchCause(() => Stream.make(999)))

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(recovered)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 999 ]
```

**Signature**

```ts
declare const catchCause: {
  <E, A2, E2, R2>(
    f: (cause: Cause.Cause<E>) => Stream<A2, E2, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A | A2, E2, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    f: (cause: Cause.Cause<E>) => Stream<A2, E2, R2>
  ): Stream<A | A2, E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4941)

Since v2.0.0

## catchCauseFilter

Recovers from stream failures by filtering the `Cause` and switching to a
recovery stream.

**When to use**

Use when you need to recover a stream only from causes selected by a
`Filter`, while giving the recovery both the selected value and the original
`Cause`.

**Details**

The filter is applied to the full `Cause`. A successful filter result is
passed to `f` together with the original cause; a failed filter result
re-fails with the residual cause.

**See**

- `catchCauseIf` for predicate-based cause selection
- `catchFilter` for filtering typed error values instead of full causes
- `catchCause` for recovering from every cause without filtering

**Signature**

```ts
declare const catchCauseFilter: {
  <E, EB, A2, E2, R2, X extends Cause.Cause<any>>(
    filter: Filter.Filter<Cause.Cause<E>, EB, X>,
    f: (failure: EB, cause: Cause.Cause<E>) => Stream<A2, E2, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A | A2, Cause.Cause.Error<X> | E2, R2 | R>
  <A, E, R, EB, A2, E2, R2, X extends Cause.Cause<any>>(
    self: Stream<A, E, R>,
    filter: Filter.Filter<Cause.Cause<E>, EB, X>,
    f: (failure: EB, cause: Cause.Cause<E>) => Stream<A2, E2, R2>
  ): Stream<A | A2, Cause.Cause.Error<X> | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5863)

Since v4.0.0

## catchCauseIf

Recovers from stream failures by filtering the `Cause` and switching to a recovery stream.
Non-matching causes are re-emitted as failures.

**Example** (Catching matching causes)

```ts
import { Cause, Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const failingStream = Stream.fail("NetworkError")
  const recovered = Stream.catchCauseIf(
    failingStream,
    (cause) => Cause.hasFails(cause),
    (cause) => Stream.make(`Recovered: ${Cause.squash(cause)}`)
  )

  const output = yield* Stream.runCollect(recovered)
  yield* Console.log(output)
})

Effect.runPromise(program)
// Output: [ "Recovered: NetworkError" ]
```

**Signature**

```ts
declare const catchCauseIf: {
  <E, A2, E2, R2>(
    predicate: Predicate<Cause.Cause<E>>,
    f: (cause: Cause.Cause<E>) => Stream<A2, E2, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A | A2, E | E2, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    predicate: Predicate<Cause.Cause<E>>,
    f: (cause: Cause.Cause<E>) => Stream<A2, E2, R2>
  ): Stream<A | A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5815)

Since v4.0.0

## catchFilter

Recovers from errors that match a `Filter` by switching to a recovery
stream.

**When to use**

Use to recover from stream errors with a reusable `Filter` when matching can
also narrow or transform the error before choosing the recovery stream.

**Details**

Successful filter results are passed to `f`. Failed filter results go to
`orElse` when provided; otherwise the filter failure is re-failed.

**See**

- `catchIf` for predicate or refinement based recovery
- `catchTag` for `_tag` based recovery from one tagged error
- `catchTags` for `_tag` based recovery from multiple tagged errors
- `catchCauseFilter` for filtering full causes

**Signature**

```ts
declare const catchFilter: {
  <E, EB, A2, E2, R2, X, A3 = unassigned, E3 = never, R3 = never>(
    filter: Filter.Filter<NoInfer<E>, EB, X>,
    f: (failure: EB) => Stream<A2, E2, R2>,
    orElse?: ((failure: X) => Stream<A3, E3, R3>) | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<A | A2 | Exclude<A3, unassigned>, E2 | E3 | (A3 extends unassigned ? X : never), R | R2 | R3>
  <A, E, R, EB, A2, E2, R2, X, A3 = unassigned, E3 = never, R3 = never>(
    self: Stream<A, E, R>,
    filter: Filter.Filter<NoInfer<E>, EB, X>,
    f: (failure: EB) => Stream<A2, E2, R2>,
    orElse?: ((failure: X) => Stream<A3, E3, R3>) | undefined
  ): Stream<A | A2 | Exclude<A3, unassigned>, E2 | E3 | (A3 extends unassigned ? X : never), R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5198)

Since v4.0.0

## catchIf

Recovers from errors that match a predicate by switching to a recovery stream.

**Details**

When a failure matches the filter, the stream switches to the recovery
stream. Non-matching failures propagate downstream, so the error type is
preserved unless the filter narrows it.

**Example** (Catching matching failures)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2).pipe(
  Stream.concat(Stream.fail(42)),
  Stream.catchIf(
    (error): error is 42 => error === 42,
    () => Stream.make(999)
  )
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
  // Output: [ 1, 2, 999 ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const catchIf: {
  <E, EB extends E, A2, E2, R2, A3 = unassigned, E3 = never, R3 = never>(
    refinement: Refinement<NoInfer<E>, EB>,
    f: (e: EB) => Stream<A2, E2, R2>,
    orElse?: ((e: Exclude<E, EB>) => Stream<A3, E3, R3>) | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<A | A2 | Exclude<A3, unassigned>, E2 | E3 | (A3 extends unassigned ? Exclude<E, EB> : never), R | R2 | R3>
  <E, A2, E2, R2, A3 = unassigned, E3 = never, R3 = never>(
    predicate: Predicate<NoInfer<E>>,
    f: (e: NoInfer<E>) => Stream<A2, E2, R2>,
    orElse?: ((e: NoInfer<E>) => Stream<A3, E3, R3>) | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<A | A2 | Exclude<A3, unassigned>, E2 | E3 | (A3 extends unassigned ? E : never), R | R2 | R3>
  <A, E, R, EB extends E, A2, E2, R2, A3 = unassigned, E3 = never, R3 = never>(
    self: Stream<A, E, R>,
    refinement: Refinement<E, EB>,
    f: (e: EB) => Stream<A2, E2, R2>,
    orElse?: ((e: Exclude<E, EB>) => Stream<A3, E3, R3>) | undefined
  ): Stream<A | A2 | Exclude<A3, unassigned>, E2 | E3 | (A3 extends unassigned ? Exclude<E, EB> : never), R | R2 | R3>
  <A, E, R, A2, E2, R2, A3 = unassigned, E3 = never, R3 = never>(
    self: Stream<A, E, R>,
    predicate: Predicate<E>,
    f: (e: E) => Stream<A2, E2, R2>,
    orElse?: ((e: E) => Stream<A3, E3, R3>) | undefined
  ): Stream<A | A2 | Exclude<A3, unassigned>, E2 | E3 | (A3 extends unassigned ? E : never), R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5124)

Since v4.0.0

## catchReason

Catches a specific reason within a tagged error.

**When to use**

Use to handle nested error causes without removing the parent error
from the error channel.

**Details**

The handler receives the unwrapped reason.

**Example** (Catching a tagged error reason)

```ts
import { Console, Data, Effect, Stream } from "effect"

class RateLimitError extends Data.TaggedError("RateLimitError")<{
  retryAfter: number
}> {}

class QuotaExceededError extends Data.TaggedError("QuotaExceededError")<{
  limit: number
}> {}

class AiError extends Data.TaggedError("AiError")<{
  reason: RateLimitError | QuotaExceededError
}> {}

const stream = Stream.fail(new AiError({ reason: new RateLimitError({ retryAfter: 60 }) }))

const program = Effect.gen(function* () {
  const values = yield* stream.pipe(
    Stream.catchReason("AiError", "RateLimitError", (reason) => Stream.succeed(`retry: ${reason.retryAfter}`)),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ "retry: 60" ]
```

**Signature**

```ts
declare const catchReason: {
  <
    K extends Tags<E>,
    E,
    RK extends ReasonTags<ExtractTag<NoInfer<E>, K>>,
    A2,
    E2,
    R2,
    A3 = unassigned,
    E3 = never,
    R3 = never
  >(
    errorTag: K,
    reasonTag: RK,
    f: (
      reason: ExtractReason<ExtractTag<NoInfer<E>, K>, RK>,
      error: NarrowReason<ExtractTag<NoInfer<E>, K>, RK>
    ) => Stream<A2, E2, R2>,
    orElse?:
      | ((
          reason: ExcludeReason<ExtractTag<NoInfer<E>, K>, RK>,
          error: OmitReason<ExtractTag<NoInfer<E>, K>, RK>
        ) => Stream<A3, E3, R3>)
      | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<
    A | A2 | Exclude<A3, unassigned>,
    ExcludeTag<E, K> | E2 | E3 | (A3 extends unassigned ? ExtractTag<E, K> : never),
    R | R2 | R3
  >
  <
    A,
    E,
    R,
    K extends Tags<E>,
    RK extends ReasonTags<ExtractTag<E, K>>,
    A2,
    E2,
    R2,
    A3 = unassigned,
    E3 = never,
    R3 = never
  >(
    self: Stream<A, E, R>,
    errorTag: K,
    reasonTag: RK,
    f: (reason: ExtractReason<ExtractTag<E, K>, RK>, error: NarrowReason<ExtractTag<E, K>, RK>) => Stream<A2, E2, R2>,
    orElse?:
      | ((reason: ExcludeReason<ExtractTag<E, K>, RK>, error: OmitReason<ExtractTag<E, K>, RK>) => Stream<A3, E3, R3>)
      | undefined
  ): Stream<
    A | A2 | Exclude<A3, unassigned>,
    ExcludeTag<E, K> | E2 | E3 | (A3 extends unassigned ? ExtractTag<E, K> : never),
    R | R2 | R3
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5517)

Since v4.0.0

## catchReasons

Catches multiple reasons within a tagged error using an object of handlers.

**Example** (Catching tagged error reasons)

```ts
import { Console, Data, Effect, Stream } from "effect"

class RateLimitError extends Data.TaggedError("RateLimitError")<{
  retryAfter: number
}> {}

class QuotaExceededError extends Data.TaggedError("QuotaExceededError")<{
  limit: number
}> {}

class AiError extends Data.TaggedError("AiError")<{
  reason: RateLimitError | QuotaExceededError
}> {}

const stream = Stream.fail(new AiError({ reason: new RateLimitError({ retryAfter: 60 }) }))

const program = Effect.gen(function* () {
  const values = yield* stream.pipe(
    Stream.catchReasons("AiError", {
      RateLimitError: (reason) => Stream.succeed(`retry: ${reason.retryAfter}`),
      QuotaExceededError: (reason) => Stream.succeed(`quota: ${reason.limit}`)
    }),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ "retry: 60" ]
```

**Signature**

```ts
declare const catchReasons: {
  <
    K extends Tags<E>,
    E,
    Cases extends {
      [RK in ReasonTags<ExtractTag<NoInfer<E>, K>>]+?: (
        reason: ExtractReason<ExtractTag<NoInfer<E>, K>, RK>,
        error: NarrowReason<ExtractTag<NoInfer<E>, K>, RK>
      ) => Stream<any, any, any>
    },
    A2 = unassigned,
    E2 = never,
    R2 = never
  >(
    errorTag: K,
    cases: Cases,
    orElse?:
      | ((
          reason: ExcludeReason<ExtractTag<NoInfer<E>, K>, Extract<keyof Cases, string>>,
          error: OmitReason<ExtractTag<NoInfer<E>, K>, Extract<keyof Cases, string>>
        ) => Stream<A2, E2, R2>)
      | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<
    | A
    | Exclude<A2, unassigned>
    | {
        [RK in keyof Cases]: Cases[RK] extends (...args: Array<any>) => Stream<infer A, any, any> ? A : never
      }[keyof Cases],
    | ExcludeTag<E, K>
    | E2
    | (A2 extends unassigned ? ExtractTag<E, K> : never)
    | {
        [RK in keyof Cases]: Cases[RK] extends (...args: Array<any>) => Stream<any, infer E, any> ? E : never
      }[keyof Cases],
    | R
    | R2
    | {
        [RK in keyof Cases]: Cases[RK] extends (...args: Array<any>) => Stream<any, any, infer R> ? R : never
      }[keyof Cases]
  >
  <
    A,
    E,
    R,
    K extends Tags<E>,
    Cases extends {
      [RK in ReasonTags<ExtractTag<E, K>>]+?: (
        reason: ExtractReason<ExtractTag<E, K>, RK>,
        error: NarrowReason<ExtractTag<E, K>, RK>
      ) => Stream<any, any, any>
    },
    A2 = unassigned,
    E2 = never,
    R2 = never
  >(
    self: Stream<A, E, R>,
    errorTag: K,
    cases: Cases,
    orElse?:
      | ((
          reason: ExcludeReason<ExtractTag<NoInfer<E>, K>, Extract<keyof Cases, string>>,
          error: OmitReason<ExtractTag<NoInfer<E>, K>, Extract<keyof Cases, string>>
        ) => Stream<A2, E2, R2>)
      | undefined
  ): Stream<
    | A
    | Exclude<A2, unassigned>
    | {
        [RK in keyof Cases]: Cases[RK] extends (...args: Array<any>) => Stream<infer A, any, any> ? A : never
      }[keyof Cases],
    | ExcludeTag<E, K>
    | E2
    | (A2 extends unassigned ? ExtractTag<E, K> : never)
    | {
        [RK in keyof Cases]: Cases[RK] extends (...args: Array<any>) => Stream<any, infer E, any> ? E : never
      }[keyof Cases],
    | R
    | R2
    | {
        [RK in keyof Cases]: Cases[RK] extends (...args: Array<any>) => Stream<any, any, infer R> ? R : never
      }[keyof Cases]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5653)

Since v4.0.0

## catchTag

Recovers from failures whose `_tag` matches the provided value by switching to
the stream returned by `f`.

**When to use**

Use when you need to handle a specific error case from a stream whose error
type is a tagged union with a readonly `_tag` field.

**Example** (Catching tagged failures)

```ts
import { Console, Data, Effect, Stream } from "effect"

class HttpError extends Data.TaggedError("HttpError")<{ message: string }> {}

const stream = Stream.fail(new HttpError({ message: "timeout" }))

const recovered = Stream.catchTag(stream, "HttpError", (error) => Stream.make(`Recovered: ${error.message}`))

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(recovered)
  yield* Console.log(values)
  // Output: [ "Recovered: timeout" ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const catchTag: {
  <
    const K extends Tags<E> | Arr.NonEmptyReadonlyArray<Tags<E>>,
    E,
    A1,
    E1,
    R1,
    A2 = unassigned,
    E2 = never,
    R2 = never
  >(
    k: K,
    f: (e: ExtractTag<NoInfer<E>, K extends Arr.NonEmptyReadonlyArray<string> ? K[number] : K>) => Stream<A1, E1, R1>,
    orElse?:
      | ((e: ExcludeTag<E, K extends Arr.NonEmptyReadonlyArray<string> ? K[number] : K>) => Stream<A2, E2, R2>)
      | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<
    A | A1 | Exclude<A2, unassigned>,
    | E1
    | E2
    | (A2 extends unassigned ? ExcludeTag<E, K extends Arr.NonEmptyReadonlyArray<string> ? K[number] : K> : never),
    R | R1 | R2
  >
  <
    A,
    E,
    R,
    const K extends Tags<E> | Arr.NonEmptyReadonlyArray<Tags<E>>,
    R1,
    E1,
    A1,
    A2 = unassigned,
    E2 = never,
    R2 = never
  >(
    self: Stream<A, E, R>,
    k: K,
    f: (e: ExtractTag<E, K extends Arr.NonEmptyReadonlyArray<string> ? K[number] : K>) => Stream<A1, E1, R1>,
    orElse?:
      | ((e: ExcludeTag<E, K extends Arr.NonEmptyReadonlyArray<string> ? K[number] : K>) => Stream<A2, E2, R2>)
      | undefined
  ): Stream<
    A | A1 | Exclude<A2, unassigned>,
    | E1
    | E2
    | (A2 extends unassigned ? ExcludeTag<E, K extends Arr.NonEmptyReadonlyArray<string> ? K[number] : K> : never),
    R | R1 | R2
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5273)

Since v2.0.0

## catchTags

Switches to a recovery stream based on matching `_tag` handlers.

**Example** (Catching tagged failures with handlers)

```ts
import { Console, Effect, Stream } from "effect"

class NotFound {
  readonly _tag = "NotFound"
  constructor(readonly resource: string) {}
}

class Unauthorized {
  readonly _tag = "Unauthorized"
  constructor(readonly user: string) {}
}

const stream = Stream.fail(new NotFound("profile"))

const program = Effect.gen(function* () {
  const result = yield* stream.pipe(
    Stream.catchTags({
      NotFound: () => Stream.succeed("fallback"),
      Unauthorized: () => Stream.succeed("login")
    }),
    Stream.runCollect
  )
  yield* Console.log(result)
})

// Output: [ "fallback" ]
```

**Signature**

```ts
declare const catchTags: {
  <
    E,
    Cases extends E extends { _tag: string }
      ? { [K in E["_tag"]]+?: (error: Extract<E, { _tag: K }>) => Stream<any, any, any> }
      : {},
    A2 = unassigned,
    E2 = never,
    R2 = never
  >(
    cases: Cases,
    orElse?: ((e: Exclude<E, { _tag: keyof Cases }>) => Stream<A2, E2, R2>) | undefined
  ): <A, R>(
    self: Stream<A, E, R>
  ) => Stream<
    | A
    | Exclude<A2, unassigned>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Stream<infer A, any, any> ? A : never
      }[keyof Cases],
    | E2
    | (A2 extends unassigned ? Exclude<E, { _tag: keyof Cases }> : never)
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Stream<any, infer E, any> ? E : never
      }[keyof Cases],
    | R
    | R2
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Stream<any, any, infer R> ? R : never
      }[keyof Cases]
  >
  <
    R,
    E,
    A,
    Cases extends E extends { _tag: string }
      ? { [K in E["_tag"]]+?: (error: Extract<E, { _tag: K }>) => Stream<any, any, any> }
      : {},
    A2 = unassigned,
    E2 = never,
    R2 = never
  >(
    self: Stream<A, E, R>,
    cases: Cases,
    orElse?: ((e: Exclude<E, { _tag: keyof Cases }>) => Stream<A2, E2, R2>) | undefined
  ): Stream<
    | A
    | Exclude<A2, unassigned>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Stream<infer A, any, any> ? A : never
      }[keyof Cases],
    | E2
    | (A2 extends unassigned ? Exclude<E, { _tag: keyof Cases }> : never)
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Stream<any, infer E, any> ? E : never
      }[keyof Cases],
    | R
    | R2
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Stream<any, any, infer R> ? R : never
      }[keyof Cases]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5390)

Since v2.0.0

## ignore

Ignores failures and ends the stream on error.

**When to use**

Use when you want a failing stream to end gracefully rather than propagate
the error.

**Details**

The `log` option controls whether the failure is logged before the stream
terminates.

**Example** (Ignoring stream failures)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.concat(Stream.fail("boom")), Stream.ignore, Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Example** (Configuring ignore logging)

```ts
import { Effect, Stream } from "effect"

Effect.runPromise(
  Effect.gen(function* () {
    const values = yield* Stream.fail("boom").pipe(Stream.ignore({ log: false }), Stream.runCollect)
    yield* Effect.sync(() => console.log(values))
  })
)

// []
```

**See**

- `ignoreCause` for a variant that also ignores defects, not just typed failures

**Signature**

```ts
declare const ignore: <
  Arg extends Stream<any, any, any> | { readonly log?: boolean | Severity | undefined } | undefined
>(
  selfOrOptions: Arg,
  options?: { readonly log?: boolean | Severity | undefined } | undefined
) => [Arg] extends [Stream<infer A, infer _E, infer R>]
  ? Stream<A, never, R>
  : <A, E, R>(self: Stream<A, E, R>) => Stream<A, never, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6043)

Since v4.0.0

## ignoreCause

Ignores the stream's failure cause, including defects, and ends the stream.

**When to use**

Use when you need to silently suppress a stream's entire failure cause,
including both typed errors and defects, rather than propagate it downstream.

**Example** (Ignoring stream failure causes)

```ts
import { Effect, Stream } from "effect"

Effect.runPromise(
  Effect.gen(function* () {
    const values = yield* Stream.make(1, 2).pipe(
      Stream.concat(Stream.die("boom")),
      Stream.ignoreCause({ log: false }),
      Stream.runCollect
    )
    yield* Effect.sync(() => console.log(values))
  })
)

// [ 1, 2 ]
```

**See**

- `ignore` to ignore only typed failures without suppressing defects

**Signature**

```ts
declare const ignoreCause: <
  Arg extends Stream<any, any, any> | { readonly log?: boolean | Severity | undefined } | undefined
>(
  streamOrOptions: Arg,
  options?: { readonly log?: boolean | Severity | undefined } | undefined
) => [Arg] extends [Stream<infer A, infer _E, infer R>]
  ? Stream<A, never, R>
  : <A, E, R>(self: Stream<A, E, R>) => Stream<A, never, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6093)

Since v4.0.0

## mapError

Transforms the errors emitted by this stream using `f`.

**Example** (Mapping stream errors)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.fail("bad").pipe(
    Stream.mapError((error) => `mapped: ${error}`),
    Stream.catch((error) => Stream.make(`recovered from ${error}`)),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ "recovered from mapped: bad" ]
```

**Signature**

```ts
declare const mapError: {
  <E, E2>(f: (error: E) => E2): <A, R>(self: Stream<A, E, R>) => Stream<A, E2, R>
  <A, E, R, E2>(self: Stream<A, E, R>, f: (error: E) => E2): Stream<A, E2, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5779)

Since v2.0.0

## onError

Runs the provided effect when the stream fails, passing the failure cause.

**Gotchas**

Note: Unlike `Effect.onError` there is no guarantee that the provided
effect will not be interrupted.

**Example** (Running an effect on errors)

```ts
import { Cause, Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3).pipe(
    Stream.concat(Stream.fail("boom")),
    Stream.onError((cause) => Console.log(`Stream failed: ${Cause.squash(cause)}`))
  )

  yield* Stream.runCollect(stream)
})

Effect.runPromiseExit(program)
// Output:
// Stream failed: boom
```

**Signature**

```ts
declare const onError: {
  <E, X, R2>(
    cleanup: (cause: Cause.Cause<E>) => Effect.Effect<X, never, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A, E, R2 | R>
  <A, E, R, X, R2>(
    self: Stream<A, E, R>,
    cleanup: (cause: Cause.Cause<E>) => Effect.Effect<X, never, R2>
  ): Stream<A, E, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9840)

Since v2.0.0

## orDie

Turns typed failures into defects, making the stream infallible.

**Example** (Turning failures into defects)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.orDie, Stream.runCollect)

  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const orDie: <A, E, R>(self: Stream<A, E, R>) => Stream<A, never, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5989)

Since v2.0.0

## orElseIfEmpty

Switches to a fallback stream if this stream is empty.

**Example** (Switching on empty streams)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.empty.pipe(
    Stream.orElseIfEmpty(() => Stream.make(1, 2)),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const orElseIfEmpty: {
  <E, A2, E2, R2>(orElse: LazyArg<Stream<A2, E2, R2>>): <A, R>(self: Stream<A, E, R>) => Stream<A | A2, E | E2, R | R2>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, orElse: LazyArg<Stream<A2, E2, R2>>): Stream<A | A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5911)

Since v2.0.0

## orElseSucceed

Returns a stream that emits a fallback value when this stream fails.

**Example** (Recovering with a fallback value)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fail("NetworkError").pipe(Stream.orElseSucceed((error) => `Recovered: ${error}`))

  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ "Recovered: NetworkError" ]
```

**Signature**

```ts
declare const orElseSucceed: {
  <E, A2>(f: (error: E) => A2): <A, R>(self: Stream<A, E, R>) => Stream<A | A2, never, R>
  <A, E, R, A2>(self: Stream<A, E, R>, f: (error: E) => A2): Stream<A | A2, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5952)

Since v2.0.0

## result

Lifts failures and successes into a `Result`, yielding a stream that cannot fail.

**Details**

The stream ends after the first failure, emitting a `Result.fail` value.

**Example** (Converting failures to results)

```ts
import { Console, Effect, Result, Stream } from "effect"

const program = Effect.gen(function* () {
  const results = yield* Stream.make(1, 2).pipe(
    Stream.concat(Stream.fail("boom")),
    Stream.result,
    Stream.map(
      Result.match({
        onFailure: (error) => `failure: ${error}`,
        onSuccess: (value) => `success: ${value}`
      })
    ),
    Stream.runCollect
  )
  yield* Console.log(results)
})

Effect.runPromise(program)
// Output: [ "success: 1", "success: 2", "failure: boom" ]
```

**Signature**

```ts
declare const result: <A, E, R>(self: Stream<A, E, R>) => Stream<Result.Result<A, E>, never, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2181)

Since v4.0.0

## retry

Retries the stream according to the given schedule when it fails.

**Details**

This retries the entire stream, so will re-execute all of the stream's
acquire operations.

The schedule is reset as soon as the first element passes through the
stream again.

**Example** (Retrying stream failures)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1).pipe(
    Stream.concat(Stream.fail("boom")),
    Stream.retry(Schedule.recurs(1)),
    Stream.take(2),
    Stream.runCollect
  )

  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 1 ]
```

**Signature**

```ts
declare const retry: {
  <E, X, E2, R2>(
    policy:
      | Schedule.Schedule<X, NoInfer<E>, E2, R2>
      | ((
          $: <SO, SE, SR>(_: Schedule.Schedule<SO, NoInfer<E>, SE, SR>) => Schedule.Schedule<SO, E, SE, SR>
        ) => Schedule.Schedule<X, NoInfer<E>, E2, R2>)
  ): <A, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R2 | R>
  <A, E, R, X, E2, R2>(
    self: Stream<A, E, R>,
    policy:
      | Schedule.Schedule<X, NoInfer<E>, E2, R2>
      | ((
          $: <SO, SE, SR>(_: Schedule.Schedule<SO, NoInfer<E>, SE, SR>) => Schedule.Schedule<SO, E, SE, SR>
        ) => Schedule.Schedule<X, NoInfer<E>, E2, R2>)
  ): Stream<A, E | E2, R2 | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6145)

Since v2.0.0

## tapCause

Runs an effect when the stream fails without changing its values or error,
unless the tap effect itself fails.

**Example** (Tapping stream causes)

```ts
import { Cause, Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2).pipe(
  Stream.concat(Stream.fail("boom")),
  Stream.tapCause((cause) => Console.log(Cause.isReason(cause))),
  Stream.catch(() => Stream.succeed(0))
)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: true
// Output: [ 1, 2, 0 ]
```

**Signature**

```ts
declare const tapCause: {
  <E, A2, E2, R2>(
    f: (cause: Cause.Cause<E>) => Effect.Effect<A2, E2, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    f: (cause: Cause.Cause<E>) => Effect.Effect<A2, E2, R2>
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4986)

Since v2.0.0

## tapError

Peeks at errors effectfully without changing the stream unless the tap fails.

**Example** (Effectfully peeking at errors)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2).pipe(
  Stream.concat(Stream.fail("boom")),
  Stream.tapError((error) => Console.log(`tapError: ${error}`)),
  Stream.catch(() => Stream.make(999))
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output:
// tapError: boom
// [ 1, 2, 999 ]
```

**Signature**

```ts
declare const tapError: {
  <E, A2, E2, R2>(
    f: (error: E) => Effect.Effect<A2, E2, R2>
  ): <A, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R2 | R>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, f: (error: E) => Effect.Effect<A2, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L5073)

Since v2.0.0

## withExecutionPlan

Applies an `ExecutionPlan` to a stream, retrying with step-provided resources
until it succeeds or the plan is exhausted.

**Details**

By default, a failing step can fallback even after emitting elements; set
`preventFallbackOnPartialStream` to fail instead of mixing partial output with
a later fallback.

**Example** (Applying an execution plan)

```ts
import { Console, Context, Effect, ExecutionPlan, Layer, Stream } from "effect"

class Service extends Context.Service<Service>()("Service", {
  make: Effect.succeed({
    stream: Stream.fail("A") as Stream.Stream<number, string>
  })
}) {
  static Bad = Layer.succeed(Service, Service.of({ stream: Stream.fail("A") }))
  static Good = Layer.succeed(Service, Service.of({ stream: Stream.make(1, 2, 3) }))
}

const plan = ExecutionPlan.make({ provide: Service.Bad }, { provide: Service.Good })

const stream = Stream.unwrap(Effect.map(Service, (_) => _.stream))

const program = Effect.gen(function* () {
  const items = yield* stream.pipe(Stream.withExecutionPlan(plan), Stream.runCollect)
  yield* Console.log(items)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const withExecutionPlan: {
  <Input, R2, Provides, PolicyE>(
    policy: ExecutionPlan.ExecutionPlan<{ provides: Provides; input: Input; error: PolicyE; requirements: R2 }>,
    options?: { readonly preventFallbackOnPartialStream?: boolean | undefined }
  ): <A, E extends Input, R>(self: Stream<A, E, R>) => Stream<A, E | PolicyE, R2 | Exclude<R, Provides>>
  <A, E extends Input, R, R2, Input, Provides, PolicyE>(
    self: Stream<A, E, R>,
    policy: ExecutionPlan.ExecutionPlan<{ provides: Provides; input: Input; error: PolicyE; requirements: R2 }>,
    options?: { readonly preventFallbackOnPartialStream?: boolean | undefined }
  ): Stream<A, E | PolicyE, R2 | Exclude<R, Provides>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6216)

Since v3.16.0

# filtering

## drop

Drops the first `n` elements from this stream.

**Example** (Dropping values from the left)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)
const result = Stream.drop(stream, 2)

const program = Effect.gen(function* () {
  const items = yield* Stream.runCollect(result)
  yield* Console.log(items)
})

Effect.runPromise(program)
// Output: [ 3, 4, 5 ]
```

**Signature**

```ts
declare const drop: {
  (n: number): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, n: number): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6689)

Since v2.0.0

## dropRight

Drops the last specified number of elements from this stream.

**Details**

Keeps the last `n` elements in memory to drop them on completion.

**Example** (Dropping values from the right)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3, 4, 5).pipe(Stream.dropRight(2), Stream.runCollect)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const dropRight: {
  (n: number): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, n: number): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6953)

Since v2.0.0

## dropUntil

Drops elements until the specified predicate evaluates to `true`, then drops
that matching element.

**Example** (Dropping until a predicate matches)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)
const result = Stream.dropUntil(stream, (n) => n >= 3)

Effect.gen(function* () {
  const output = yield* Stream.runCollect(result)
  yield* Console.log(output) // Output: [ 4, 5 ]
})
```

**Signature**

```ts
declare const dropUntil: {
  <A>(predicate: (a: NoInfer<A>, index: number) => boolean): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, predicate: (a: NoInfer<A>, index: number) => boolean): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6731)

Since v2.0.0

## dropUntilEffect

Drops all elements of the stream until the specified effectful predicate
evaluates to `true`.

**When to use**

Use when dropping the leading prefix requires an Effect or service and the
first matching element should also be dropped.

**Example** (Dropping until an effectful predicate matches)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.range(1, 5).pipe(
    Stream.dropUntilEffect((n) => Effect.succeed(n % 3 === 0)),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 4, 5 ]
```

**Signature**

```ts
declare const dropUntilEffect: {
  <A, E2, R2>(
    predicate: (a: NoInfer<A>, index: number) => Effect.Effect<boolean, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, E2, R2>(
    self: Stream<A, E, R>,
    predicate: (a: NoInfer<A>, index: number) => Effect.Effect<boolean, E2, R2>
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6768)

Since v2.0.0

## dropWhile

Drops elements from the stream while the specified predicate evaluates to `true`.

**Example** (Dropping while a predicate holds)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3, 4, 5).pipe(
    Stream.dropWhile((n) => n < 3),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 3, 4, 5 ]
```

**Signature**

```ts
declare const dropWhile: {
  <A>(predicate: (a: NoInfer<A>, index: number) => boolean): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, predicate: (a: NoInfer<A>, index: number) => boolean): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6811)

Since v2.0.0

## dropWhileEffect

Drops elements while the specified effectful predicate evaluates to `true`.

**Example** (Effectfully dropping while a predicate holds)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3, 4, 5).pipe(
    Stream.dropWhileEffect((n) => Effect.succeed(n < 3)),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 3, 4, 5 ]
```

**Signature**

```ts
declare const dropWhileEffect: {
  <A, E2, R2>(
    predicate: (a: NoInfer<A>, index: number) => Effect.Effect<boolean, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, E2, R2>(
    self: Stream<A, E, R>,
    predicate: (a: A, index: number) => Effect.Effect<boolean, E2, R2>
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6894)

Since v2.0.0

## dropWhileFilter

Drops elements while the filter succeeds.

**When to use**

Use when you need to remove a leading stream prefix based on a synchronous
`Filter` result while preserving the remaining original stream elements.

**Details**

`Result.succeed` drops the current element. The first `Result.fail` stops
dropping, emits that original element, and the rest of the source stream is
emitted without further filtering.

**See**

- `dropWhile` for boolean predicate prefix dropping
- `takeWhileFilter` for keeping the accepted prefix as filter success values
- `dropWhileEffect` for effectful predicate prefix dropping

**Signature**

```ts
declare const dropWhileFilter: {
  <A, B, X>(filter: Filter.Filter<NoInfer<A>, B, X>): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R, B, X>(self: Stream<A, E, R>, filter: Filter.Filter<NoInfer<A>, B, X>): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6852)

Since v4.0.0

## filter

Filters a stream to the elements that satisfy a predicate.

**Example** (Filtering stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3, 4).pipe(Stream.filter((n) => n % 2 === 0))
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 2, 4 ]
```

**Signature**

```ts
declare const filter: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A>(predicate: Predicate<NoInfer<A>>): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R, B extends A>(self: Stream<A, E, R>, refinement: Refinement<A, B>): Stream<B, E, R>
  <A, E, R>(self: Stream<A, E, R>, predicate: Predicate<A>): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4306)

Since v2.0.0

## filterEffect

Filters elements in a single pass effectfully.

**Example** (Effectfully filtering stream values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3, 4).pipe(Stream.filterEffect((n) => Effect.succeed(n > 2)))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 3, 4 ]
```

**Signature**

```ts
declare const filterEffect: {
  <A, EX, RX>(
    predicate: (a: NoInfer<A>, i: number) => Effect.Effect<boolean, EX, RX>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E | EX, R | RX>
  <A, E, R, EX, RX>(
    self: Stream<A, E, R>,
    predicate: (a: NoInfer<A>, i: number) => Effect.Effect<boolean, EX, RX>
  ): Stream<A, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4379)

Since v2.0.0

## filterMap

Filters and maps stream elements in one pass using a `Filter`.

**When to use**

Use to keep only stream elements accepted by a `Filter` and emit each filter
success value.

**Details**

`Result.succeed` values are emitted and `Result.fail` values are skipped.

**See**

- `filter` for keeping original elements with a boolean predicate or refinement
- `filterMapEffect` for an effectful `Filter`
- `partition` for consuming both filter success and failure values

**Signature**

```ts
declare const filterMap: {
  <A, B, X>(filter: Filter.Filter<NoInfer<A>, B, X>): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A, E, R, B, X>(self: Stream<A, E, R>, filter: Filter.Filter<A, B, X>): Stream<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4341)

Since v2.0.0

## filterMapEffect

Filters and maps elements in one pass effectfully using a `FilterEffect`.

**When to use**

Use to apply effectful logic that can reject stream elements or emit
transformed values before they continue downstream.

**Details**

`Result.succeed` values are emitted, `Result.fail` values are skipped, and
effect failures fail the stream.

**See**

- `filterMap` for the synchronous `Filter` variant
- `filterEffect` for effectfully keeping original elements
- `mapEffect` for effectfully transforming every element

**Signature**

```ts
declare const filterMapEffect: {
  <A, B, X, EX, RX>(
    filter: Filter.FilterEffect<NoInfer<A>, B, X, EX, RX>
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E | EX, R | RX>
  <A, E, R, B, X, EX, RX>(
    self: Stream<A, E, R>,
    filter: Filter.FilterEffect<A, B, X, EX, RX>
  ): Stream<B, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4415)

Since v2.0.0

## partition

Splits a stream into scoped excluded and satisfying substreams using a
`Filter`.

**Details**

The returned streams are backed by queues in the current scope and should be
consumed while that scope remains open. The faster stream may advance up to
`bufferSize` elements ahead of the slower one.

**Example** (Partitioning a stream)

```ts
import { Console, Effect, Result, Stream } from "effect"

const program = Effect.gen(function* () {
  const [excluded, satisfying] = yield* Stream.partition(Stream.make(1, 2, 3, 4), (n) =>
    n % 2 === 0 ? Result.succeed(n) : Result.fail(n)
  )
  const left = yield* Stream.runCollect(excluded)
  const right = yield* Stream.runCollect(satisfying)
  yield* Console.log(left)
  // Output: [ 1, 3 ]
  yield* Console.log(right)
  // Output: [ 2, 4 ]
})
```

**Signature**

```ts
declare const partition: {
  <A, Pass, Fail>(
    filter: Filter.Filter<NoInfer<A>, Pass, Fail>,
    options?: { readonly bufferSize?: number | undefined }
  ): <E, R>(
    self: Stream<A, E, R>
  ) => Effect.Effect<[excluded: Stream<Fail, E>, satisfying: Stream<Pass, E>], never, R | Scope.Scope>
  <A, E, R, Pass, Fail>(
    self: Stream<A, E, R>,
    filter: Filter.Filter<NoInfer<A>, Pass, Fail>,
    options?: { readonly bufferSize?: number | undefined }
  ): Effect.Effect<[excluded: Stream<Fail, E>, satisfying: Stream<Pass, E>], never, R | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4664)

Since v2.0.0

## partitionEffect

Splits a stream with an effectful `Filter`, returning scoped streams for
filter successes and failures.

**When to use**

Use when you need to classify each stream element with an effectful `Filter`
and consume both passing and failing mapped values as streams.

**Details**

The returned streams are backed by queues in the current scope and should be
consumed while that scope remains open. The first stream emits success values
from the filter, and the second emits failure values.

**See**

- `partition` for the pure `Filter` variant, which returns the failing stream before the passing stream
- `partitionQueue` for the lower-level queue result
- `filterMapEffect` for effectful filtering that discards failed filter results

**Signature**

```ts
declare const partitionEffect: {
  <A, Pass, Fail, EX, RX>(
    filter: Filter.FilterEffect<NoInfer<A>, Pass, Fail, EX, RX>,
    options?: {
      readonly capacity?: number | "unbounded" | undefined
      readonly concurrency?: number | "unbounded" | undefined
    }
  ): <E, R>(
    self: Stream<A, E, R>
  ) => Effect.Effect<[passes: Stream<Pass, E | EX>, fails: Stream<Fail, E | EX>], never, R | RX | Scope.Scope>
  <A, E, R, Pass, Fail, EX, RX>(
    self: Stream<A, E, R>,
    filter: Filter.FilterEffect<NoInfer<A>, Pass, Fail, EX, RX>,
    options?: {
      readonly capacity?: number | "unbounded" | undefined
      readonly concurrency?: number | "unbounded" | undefined
    }
  ): Effect.Effect<[passes: Stream<Pass, E | EX>, fails: Stream<Fail, E | EX>], never, R | RX | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4578)

Since v4.0.0

## partitionQueue

Partitions a stream using a `Filter` and exposes passing and failing values
as scoped queues.

**Details**

The queues are backed by a fiber in the current scope and should be consumed
while that scope remains open. Each queue fails with the stream error or
`Cause.Done` when the source ends.

**Example** (Partitioning a stream into queues)

```ts
import { Console, Effect, Result, Stream } from "effect"

const program = Effect.gen(function* () {
  const [passes, fails] = yield* Stream.make(1, 2, 3, 4).pipe(
    Stream.partitionQueue((n) => (n % 2 === 0 ? Result.succeed(n) : Result.fail(n)))
  )

  const passValues = yield* Stream.fromQueue(passes).pipe(Stream.runCollect)
  const failValues = yield* Stream.fromQueue(fails).pipe(Stream.runCollect)

  yield* Console.log(passValues)
  // Output: [ 2, 4 ]
  yield* Console.log(failValues)
  // Output: [ 1, 3 ]
})

Effect.runPromise(Effect.scoped(program))
```

**Signature**

```ts
declare const partitionQueue: {
  <A, Pass, Fail>(
    filter: Filter.Filter<NoInfer<A>, Pass, Fail>,
    options?: { readonly capacity?: number | "unbounded" | undefined }
  ): <E, R>(
    self: Stream<A, E, R>
  ) => Effect.Effect<
    [passes: Queue.Dequeue<Pass, E | Cause.Done>, fails: Queue.Dequeue<Fail, E | Cause.Done>],
    never,
    R | Scope.Scope
  >
  <A, E, R, Pass, Fail>(
    self: Stream<A, E, R>,
    filter: Filter.Filter<NoInfer<A>, Pass, Fail>,
    options?: { readonly capacity?: number | "unbounded" | undefined }
  ): Effect.Effect<
    [passes: Queue.Dequeue<Pass, E | Cause.Done>, fails: Queue.Dequeue<Fail, E | Cause.Done>],
    never,
    R | Scope.Scope
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4466)

Since v4.0.0

## take

Takes the first `n` elements from this stream, returning `Stream.empty` when `n < 1`.

**Example** (Taking values from the left)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3, 4, 5).pipe(Stream.take(3), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const take: {
  (n: number): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, n: number): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6328)

Since v2.0.0

## takeRight

Keeps the last `n` elements from this stream.

**Example** (Taking elements from the right)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.range(1, 6).pipe(Stream.takeRight(3), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 4, 5, 6 ]
```

**Signature**

```ts
declare const takeRight: {
  (n: number): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, n: number): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6360)

Since v2.0.0

## takeUntil

Takes elements until the predicate matches.

**Details**

When `excludeLast` is `true`, the matching element is dropped.

**Example** (Taking until a predicate matches)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.range(1, 5)

const program = Effect.gen(function* () {
  const inclusive = yield* stream.pipe(
    Stream.takeUntil((n) => n % 3 === 0),
    Stream.runCollect
  )
  yield* Console.log(inclusive)
  // Output: [ 1, 2, 3 ]

  const exclusive = yield* stream.pipe(
    Stream.takeUntil((n) => n % 3 === 0, { excludeLast: true }),
    Stream.runCollect
  )
  yield* Console.log(exclusive)
  // Output: [ 1, 2 ]
})
```

**Signature**

```ts
declare const takeUntil: {
  <A>(
    predicate: (a: NoInfer<A>, n: number) => boolean,
    options?: { readonly excludeLast?: boolean | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(
    self: Stream<A, E, R>,
    predicate: (a: A, n: number) => boolean,
    options?: { readonly excludeLast?: boolean | undefined }
  ): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6413)

Since v2.0.0

## takeUntilEffect

Takes stream elements until an effectful predicate returns `true`.

**When to use**

Use when the stopping condition needs an Effect or service and predicate
failure should fail the stream.

**Example** (Taking until an effectful predicate matches)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.range(1, 5).pipe(
    Stream.takeUntilEffect((n) => Effect.succeed(n % 3 === 0)),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const takeUntilEffect: {
  <A, E2, R2>(
    predicate: (a: NoInfer<A>, n: number) => Effect.Effect<boolean, E2, R2>,
    options?: { readonly excludeLast?: boolean | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, E2, R2>(
    self: Stream<A, E, R>,
    predicate: (a: A, n: number) => Effect.Effect<boolean, E2, R2>,
    options?: { readonly excludeLast?: boolean | undefined }
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6473)

Since v2.0.0

## takeWhile

Takes the longest initial prefix of elements that satisfy the predicate.

**Example** (Taking while a predicate holds)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.range(1, 5).pipe(Stream.takeWhile((n) => n % 3 !== 0))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const takeWhile: {
  <A, B extends A>(refinement: (a: NoInfer<A>, n: number) => a is B): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A>(predicate: (a: NoInfer<A>, n: number) => boolean): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R, B extends A>(self: Stream<A, E, R>, refinement: (a: NoInfer<A>, n: number) => a is B): Stream<B, E, R>
  <A, E, R>(self: Stream<A, E, R>, predicate: (a: NoInfer<A>, n: number) => boolean): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6536)

Since v2.0.0

## takeWhileEffect

Takes elements from the stream while the effectful predicate is `true`.

**When to use**

Use when the leading-prefix predicate needs an Effect or service and the
stream should stop before the first false result.

**Example** (Effectfully taking while a predicate holds)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.range(1, 5).pipe(
    Stream.takeWhileEffect((n) => Effect.succeed(n % 3 !== 0)),
    Stream.runCollect
  )
  Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const takeWhileEffect: {
  <A, E2, R2>(
    predicate: (a: NoInfer<A>, n: number) => Effect.Effect<boolean, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R | R2>
  <A, E, R, E2, R2>(
    self: Stream<A, E, R>,
    predicate: (a: NoInfer<A>, n: number) => Effect.Effect<boolean, E2, R2>
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6648)

Since v4.0.0

## takeWhileFilter

Takes the longest initial prefix accepted by a `Filter` and emits the
filter's success values.

**When to use**

Use to keep the leading stream elements that a `Filter` accepts, emit the
filter's success values, and stop at the first filter failure.

**Details**

The stream stops at the first `Result.fail` returned by the filter.

**See**

- `takeWhile` for keeping original elements with a boolean predicate or refinement
- `filterMap` for filtering across the whole stream instead of only the leading prefix
- `dropWhileFilter` for dropping the accepted prefix and keeping the remaining original elements

**Signature**

```ts
declare const takeWhileFilter: {
  <A, B, X>(f: Filter.Filter<NoInfer<A>, B, X>): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A, E, R, B, X>(self: Stream<A, E, R>, f: Filter.Filter<NoInfer<A>, B, X>): Stream<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6589)

Since v4.0.0

## when

Returns the specified stream if the given condition is satisfied, otherwise
returns an empty stream.

**Example** (Conditionally keeping a stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(Stream.when(Stream.make(1, 2, 3), Effect.succeed(false)))
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: []
```

**Signature**

```ts
declare const when: {
  <EX = never, RX = never>(
    test: Effect.Effect<boolean, EX, RX>
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | EX, R | RX>
  <A, E, R, EX = never, RX = never>(
    self: Stream<A, E, R>,
    test: Effect.Effect<boolean, EX, RX>
  ): Stream<A, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4724)

Since v2.0.0

# grouping

## chunks

Exposes the underlying chunks as a stream of non-empty arrays.

**Example** (Exposing stream chunks)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const chunks = yield* Stream.make(1, 2, 3, 4).pipe(Stream.rechunk(2), Stream.chunks, Stream.runCollect)
  yield* Console.log(chunks)
})

Effect.runPromise(program)
// Output: [ [ 1, 2 ], [ 3, 4 ] ]
```

**Signature**

```ts
declare const chunks: <A, E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L6998)

Since v2.0.0

## groupAdjacentBy

Groups consecutive elements that have equal keys into non-empty arrays.

**When to use**

Use when you already have a stream ordered by the grouping key and want to
emit each consecutive run as a non-empty array while keeping later
non-adjacent runs separate.

**Details**

The key is computed with `f`; adjacent elements whose keys are equal by
`Equal.equals` are emitted as one `[key, group]`. Later non-adjacent runs
with the same key are emitted separately.

**See**

- `groupByKey` for grouping all elements with the same key across the stream
- `groupBy` for custom grouped stream construction

**Signature**

```ts
declare const groupAdjacentBy: {
  <A, K>(f: (a: NoInfer<A>) => K): <E, R>(self: Stream<A, E, R>) => Stream<readonly [K, Arr.NonEmptyArray<A>], E, R>
  <A, E, R, K>(self: Stream<A, E, R>, f: (a: NoInfer<A>) => K): Stream<readonly [K, Arr.NonEmptyArray<A>], E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8455)

Since v2.0.0

## groupBy

Groups elements into keyed substreams using an effectful classifier.

**Example** (Grouping elements into keyed substreams using an effectful classifier)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const grouped = yield* Stream.make(1, 2, 3, 4, 5).pipe(
    Stream.groupBy((n) => Effect.succeed([n % 2 === 0 ? "even" : "odd", n] as const)),
    Stream.mapEffect(
      Effect.fnUntraced(function* ([key, stream]) {
        return [key, yield* Stream.runCollect(stream)] as const
      }),
      { concurrency: "unbounded" }
    ),
    Stream.runCollect
  )

  yield* Console.log(grouped)
})

Effect.runPromise(program)
// Output: [ [ "odd", [ 1, 3, 5 ] ], [ "even", [ 2, 4 ] ] ]
```

**Signature**

```ts
declare const groupBy: {
  <A, K, V, E2, R2>(
    f: (a: NoInfer<A>) => Effect.Effect<readonly [K, V], E2, R2>,
    options?: { readonly bufferSize?: number | undefined; readonly idleTimeToLive?: Duration.Input | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<readonly [K, Stream<V>], E | E2, R | R2>
  <A, E, R, K, V, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: NoInfer<A>) => Effect.Effect<readonly [K, V], E2, R2>,
    options?: { readonly bufferSize?: number | undefined; readonly idleTimeToLive?: Duration.Input | undefined }
  ): Stream<readonly [K, Stream<V>], E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8263)

Since v2.0.0

## groupByKey

Groups elements by a key and emits a stream per key.

**Example** (Grouping elements by key)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const grouped = yield* Stream.make(1, 2, 3, 4, 5).pipe(
    Stream.groupByKey((n) => (n % 2 === 0 ? "even" : "odd")),
    Stream.mapEffect(
      ([key, stream]) => Stream.runCollect(stream).pipe(Effect.map((values) => [key, values] as const)),
      { concurrency: "unbounded" }
    ),
    Stream.runCollect
  )
  yield* Console.log(grouped)
})

Effect.runPromise(program)
// Output: [ [ "odd", [ 1, 3, 5 ] ], [ "even", [ 2, 4 ] ] ]
```

**Signature**

```ts
declare const groupByKey: {
  <A, K>(
    f: (a: NoInfer<A>) => K,
    options?: { readonly bufferSize?: number | undefined; readonly idleTimeToLive?: Duration.Input | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<readonly [K, Stream<A>], E, R>
  <A, E, R, K>(
    self: Stream<A, E, R>,
    f: (a: NoInfer<A>) => K,
    options?: { readonly bufferSize?: number | undefined; readonly idleTimeToLive?: Duration.Input | undefined }
  ): Stream<readonly [K, Stream<A>], E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8333)

Since v2.0.0

## grouped

Partitions the stream into non-empty arrays of the specified size.

**Details**

The final array may be smaller if there are not enough elements to fill it.

**Example** (Grouping elements by size)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const grouped = yield* Stream.range(1, 8).pipe(Stream.grouped(3), Stream.runCollect)
  yield* Console.log(grouped)
})

Effect.runPromise(program)
// Output: [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ]
```

**Signature**

```ts
declare const grouped: {
  (n: number): <A, E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
  <A, E, R>(self: Stream<A, E, R>, n: number): Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8182)

Since v2.0.0

## groupedWithin

Partitions the stream into arrays, emitting when the chunk size is reached
or the duration passes.

**Example** (Grouping elements by size or time)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.groupedWithin(2, "5 seconds"), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ [ 1, 2 ], [ 3 ] ]
```

**Signature**

```ts
declare const groupedWithin: {
  (chunkSize: number, duration: Duration.Input): <A, E, R>(self: Stream<A, E, R>) => Stream<Array<A>, E, R>
  <A, E, R>(self: Stream<A, E, R>, chunkSize: number, duration: Duration.Input): Stream<Array<A>, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8214)

Since v2.0.0

## rechunk

Groups the stream into arrays of the specified size, preserving element order.

**Details**

The size is clamped to at least 1.

**Example** (Rechunking stream elements)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3, 4, 5).pipe(Stream.rechunk(2), Stream.chunks, Stream.runCollect)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
```

**Signature**

```ts
declare const rechunk: {
  (size: number): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, size: number): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7032)

Since v2.0.0

## sliding

Emits a sliding window of `n` elements.

**Example** (Emitting sliding windows)

```ts
import { Console, Effect, pipe, Stream } from "effect"

Effect.gen(function* () {
  const result = yield* pipe(Stream.make(1, 2, 3, 4, 5), Stream.sliding(2), Stream.runCollect)
  yield* Console.log(result)
})
// Output: [ [1, 2], [2, 3], [3, 4], [4, 5] ]
```

**Signature**

```ts
declare const sliding: {
  (chunkSize: number): <A, E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
  <A, E, R>(self: Stream<A, E, R>, chunkSize: number): Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7103)

Since v2.0.0

## slidingSize

Emits sliding windows of `chunkSize` elements, advancing by `stepSize`.

**Example** (Emitting sliding windows with a step size)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const chunks = yield* Stream.make(1, 2, 3, 4, 5).pipe(Stream.slidingSize(3, 2), Stream.runCollect)
  yield* Console.log(chunks)
})

Effect.runPromise(program)
// Output: [ [ 1, 2, 3 ], [ 3, 4, 5 ] ]
```

**Signature**

```ts
declare const slidingSize: {
  (chunkSize: number, stepSize: number): <A, E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
  <A, E, R>(self: Stream<A, E, R>, chunkSize: number, stepSize: number): Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7135)

Since v2.0.0

## split

Splits the stream into non-empty groups whenever the predicate matches.

**Details**

Matching elements act as delimiters and are not included in the output.

**Example** (Splitting on matching values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.range(0, 9).pipe(
    Stream.split((n) => n % 4 === 0),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ [1, 2, 3], [5, 6, 7], [9] ]
```

**Signature**

```ts
declare const split: {
  <A, B extends A>(
    refinement: Refinement<NoInfer<A>, B>
  ): <E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyReadonlyArray<Exclude<A, B>>, E, R>
  <A>(predicate: Predicate<NoInfer<A>>): <E, R>(self: Stream<A, E, R>) => Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
  <A, E, R, B extends A>(
    self: Stream<A, E, R>,
    refinement: Refinement<A, B>
  ): Stream<Arr.NonEmptyReadonlyArray<Exclude<A, B>>, E, R>
  <A, E, R>(self: Stream<A, E, R>, predicate: Predicate<A>): Stream<Arr.NonEmptyReadonlyArray<A>, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7208)

Since v2.0.0

# guards

## isStream

Checks whether a value is a Stream.

**Example** (Checking whether a value is a Stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3)
  const notStream = { data: [1, 2, 3] }

  yield* Console.log(Stream.isStream(stream))
  // true
  yield* Console.log(Stream.isStream(notStream))
  // false
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const isStream: (u: unknown) => u is Stream<unknown, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L287)

Since v4.0.0

# interruption

## haltWhen

Stops a stream after the current element when an effect completes.

**When to use**

Use to stop before the next pull after an external signal completes.

**Details**

The effect is forked, its success value is discarded, and its failure fails
the stream.

**Gotchas**

This does not interrupt an in-progress pull. Use `interruptWhen` when
the stream should be interrupted immediately.

**Example** (Halting a stream after an effect completes)

```ts
import { Console, Deferred, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const halt = yield* Deferred.make<void>()
  const values = yield* Stream.fromArray([1, 2, 3]).pipe(
    Stream.tap((value) => (value === 2 ? Deferred.succeed(halt, void 0) : Effect.void)),
    Stream.haltWhen(Deferred.await(halt)),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output:
// [1, 2]
```

**Signature**

```ts
declare const haltWhen: {
  <X, E2, R2>(effect: Effect.Effect<X, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, X, E2, R2>(self: Stream<A, E, R>, effect: Effect.Effect<X, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9762)

Since v2.0.0

## interruptWhen

Interrupts the evaluation of this stream when the provided effect
completes. The given effect will be forked as part of this stream, and its
success will be discarded. This combinator will also interrupt any
in-progress element being pulled from upstream.

**Details**

If the effect completes with a failure before the stream completes, the
returned stream will emit that failure.

**Example** (Interrupting when an effect completes)

```ts
import { Console, Deferred, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const interrupt = yield* Deferred.make<void>()
  const stream = Stream.make(1, 2, 3).pipe(
    Stream.tap((value) => (value === 2 ? Deferred.succeed(interrupt, void 0) : Effect.void)),
    Stream.interruptWhen(Deferred.await(interrupt))
  )

  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// => [1, 2]
```

**Signature**

```ts
declare const interruptWhen: {
  <X, E2, R2>(effect: Effect.Effect<X, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, X, E2, R2>(self: Stream<A, E, R>, effect: Effect.Effect<X, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9713)

Since v2.0.0

# mapping

## flatMap

Maps each element to a stream and flattens the resulting streams.

**Details**

With the default sequential concurrency, inner streams are concatenated in
input order. When `concurrency` is greater than `1` or `"unbounded"`,
multiple inner streams may run at the same time and their outputs are merged
as they arrive.

**Example** (Flat mapping stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(
    Stream.flatMap((n) => Stream.make(n, n * 2)),
    Stream.runCollect
  )
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 2, 4, 3, 6 ]
```

**Signature**

```ts
declare const flatMap: {
  <A, A2, E2, R2>(
    f: (a: A) => Stream<A2, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
      | undefined
  ): <E, R>(self: Stream<A, E, R>) => Stream<A2, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: A) => Stream<A2, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
      | undefined
  ): Stream<A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2436)

Since v2.0.0

## flatten

Flattens a stream of streams into a single stream.

**Details**

With the default sequential concurrency, inner streams are concatenated in
strict order. When `concurrency` is greater than `1` or `"unbounded"`,
multiple inner streams may run at the same time and their outputs are merged
as they arrive.

**Example** (Flattening nested streams)

```ts
import { Console, Effect, Stream } from "effect"

const streamOfStreams = Stream.make(Stream.make(1, 2), Stream.make(3, 4), Stream.make(5, 6))

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(Stream.flatten(streamOfStreams))
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3, 4, 5, 6 ]
```

**Signature**

```ts
declare const flatten: <
  Arg extends
    | Stream<Stream<any, any, any>, any, any>
    | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
    | undefined = { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
>(
  selfOrOptions?: Arg,
  options?:
    | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
    | undefined
) => [Arg] extends [Stream<Stream<infer _A, infer _E, infer _R>, infer _E2, infer _R2>]
  ? Stream<_A, _E | _E2, _R | _R2>
  : <A, E, R, E2, R2>(self: Stream<Stream<A, E, R>, E2, R2>) => Stream<A, E | E2, R | R2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2553)

Since v2.0.0

## flattenEffect

Flattens a stream of `Effect` values into a stream of their results.

**When to use**

Use when stream elements already are effects and their successes should become
stream elements while their failures enter the stream error channel.

**Example** (Flattening a stream of Effect values into a stream of their results)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(Effect.succeed(1), Effect.succeed(2), Effect.succeed(3))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream.pipe(Stream.flattenEffect()))
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [1, 2, 3]
```

**Signature**

```ts
declare const flattenEffect: <
  Arg extends
    | Stream<Effect.Effect<any, any, any>, any, any>
    | { readonly concurrency?: number | "unbounded" | undefined; readonly unordered?: boolean | undefined }
    | undefined = { readonly concurrency?: number | "unbounded" | undefined; readonly unordered?: boolean | undefined }
>(
  selfOrOptions?: Arg,
  options?:
    | { readonly concurrency?: number | "unbounded" | undefined; readonly unordered?: boolean | undefined }
    | undefined
) => [Arg] extends [Stream<Effect.Effect<infer _A, infer _EX, infer _RX>, infer _E, infer _R>]
  ? Stream<_A, _EX | _E, _RX | _R>
  : <A, EX, RX, E, R>(self: Stream<Effect.Effect<A, EX, RX>, E, R>) => Stream<A, EX | E, RX | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2078)

Since v2.0.0

## flattenIterable

Flattens the iterables emitted by this stream into the stream's structure.

**Example** (Flattening iterable values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make([1, 2], [3, 4]).pipe(Stream.flattenIterable)
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3, 4 ]
```

**Signature**

```ts
declare const flattenIterable: <A, E, R>(self: Stream<Iterable<A>, E, R>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3001)

Since v4.0.0

## map

Transforms the elements of this stream using the supplied function.

**Example** (Mapping stream values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.fromArray([1, 2, 3]).pipe(Stream.map((n, i) => n + i))
const program = Stream.runCollect(stream).pipe(Effect.tap((values) => Console.log(values)))

Effect.runPromise(program)
// [ 1, 3, 5 ]
```

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A, i: number) => B): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A, E, R, B>(self: Stream<A, E, R>, f: (a: A, i: number) => B): Stream<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1878)

Since v2.0.0

## mapAccum

Maps elements statefully, emitting zero or more outputs per input.

**Example** (Statefully mapping stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const totals = yield* Stream.make(0, 1, 2, 3, 4, 5, 6).pipe(
    Stream.mapAccum(
      () => 0,
      (total, n) => {
        const next = total + n
        return [next, [next]] as const
      }
    ),
    Stream.runCollect
  )

  yield* Console.log(totals)
})

Effect.runPromise(program)
// Output: [ 0, 1, 3, 6, 10, 15, 21 ]
```

**Signature**

```ts
declare const mapAccum: {
  <S, A, B>(
    initial: LazyArg<S>,
    f: (s: S, a: A) => readonly [state: S, values: ReadonlyArray<B>],
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A, E, R, S, B>(
    self: Stream<A, E, R>,
    initial: LazyArg<S>,
    f: (s: S, a: A) => readonly [state: S, values: ReadonlyArray<B>],
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): Stream<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7424)

Since v2.0.0

## mapAccumArray

Maps over non-empty chunk arrays statefully, emitting zero or more values per chunk.

**Details**

The mapping function runs once per chunk and the state is threaded across chunks.

**Example** (Statefully mapping stream chunks)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const output = yield* Stream.make(1, 2, 3, 4, 5, 6).pipe(
    Stream.rechunk(2),
    Stream.mapAccumArray(
      () => 0,
      (sum: number, chunk) => {
        const next = chunk.reduce((acc, n) => acc + n, sum)
        return [next, [next]]
      }
    ),
    Stream.runCollect
  )
  yield* Console.log(output)
})

Effect.runPromise(program)
// Output: [ 3, 10, 21 ]
```

**Signature**

```ts
declare const mapAccumArray: {
  <S, A, B>(
    initial: LazyArg<S>,
    f: (s: S, a: Arr.NonEmptyReadonlyArray<A>) => readonly [state: S, values: ReadonlyArray<B>],
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A, E, R, S, B>(
    self: Stream<A, E, R>,
    initial: LazyArg<S>,
    f: (s: S, a: Arr.NonEmptyReadonlyArray<A>) => readonly [state: S, values: ReadonlyArray<B>],
    options?: { readonly onHalt?: ((state: S) => Array<B>) | undefined }
  ): Stream<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7501)

Since v4.0.0

## mapAccumArrayEffect

Maps each non-empty input chunk statefully and effectfully, emitting zero or
more output values per chunk.

**When to use**

Use when stateful mapping should process each emitted non-empty chunk with an
Effect instead of each element separately.

**Details**

The mapping effect receives the current state and chunk, then returns the
next state plus the values to emit. The state is threaded across chunks.

**Example** (Effectfully mapping stream chunks with state)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const totals = yield* Stream.make(1, 2, 3, 4).pipe(
    Stream.rechunk(2),
    Stream.mapAccumArrayEffect(
      () => 0,
      (total, chunk) =>
        Effect.gen(function* () {
          const next = chunk.reduce((sum, value) => sum + value, total)
          return [next, [next]] as const
        })
    ),
    Stream.runCollect
  )
  yield* Console.log(totals)
})

Effect.runPromise(program)
// Output: [ 3, 10 ]
```

**Signature**

```ts
declare const mapAccumArrayEffect: {
  <S, A, B, E2, R2>(
    initial: LazyArg<S>,
    f: (s: S, a: Arr.NonEmptyReadonlyArray<A>) => Effect.Effect<readonly [state: S, values: ReadonlyArray<B>], E2, R2>,
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E | E2, R | R2>
  <A, E, R, S, B, E2, R2>(
    self: Stream<A, E, R>,
    initial: LazyArg<S>,
    f: (s: S, a: Arr.NonEmptyReadonlyArray<A>) => Effect.Effect<readonly [state: S, values: ReadonlyArray<B>], E2, R2>,
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): Stream<B, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7671)

Since v4.0.0

## mapAccumEffect

Maps each element statefully and effectfully, emitting zero or more output
values per input.

**When to use**

Use when stateful element mapping needs Effects or can fail while emitting
zero or more values per input element.

**Details**

The mapping effect receives the current state and element, then returns the
next state plus the values to emit. The state is threaded through the
stream.

**Example** (Effectfully mapping stream values with state)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 1, 1).pipe(
    Stream.mapAccumEffect(
      () => 0,
      (total, n) => Effect.succeed([total + n, [total + n]])
    ),
    Stream.runCollect
  )

  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const mapAccumEffect: {
  <S, A, B, E2, R2>(
    initial: LazyArg<S>,
    f: (s: S, a: A) => Effect.Effect<readonly [state: S, values: ReadonlyArray<B>], E2, R2>,
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E | E2, R | R2>
  <A, E, R, S, B, E2, R2>(
    self: Stream<A, E, R>,
    initial: LazyArg<S>,
    f: (s: S, a: A) => Effect.Effect<readonly [state: S, values: ReadonlyArray<B>], E2, R2>,
    options?: { readonly onHalt?: ((state: S) => ReadonlyArray<B>) | undefined }
  ): Stream<B, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7583)

Since v2.0.0

## mapArray

Transforms each emitted chunk using the provided function, which receives the chunk and its index.

**Example** (Mapping stream chunks)

```ts
import { Array, Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3, 4).pipe(
    Stream.rechunk(2),
    Stream.mapArray((chunk, index) => Array.map(chunk, (n) => n + index)),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 4, 5 ]
```

**Signature**

```ts
declare const mapArray: {
  <A, B>(
    f: (a: Arr.NonEmptyReadonlyArray<A>, i: number) => Arr.NonEmptyReadonlyArray<B>
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E, R>
  <A, E, R, B>(
    self: Stream<A, E, R>,
    f: (a: Arr.NonEmptyReadonlyArray<A>, i: number) => Arr.NonEmptyReadonlyArray<B>
  ): Stream<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1967)

Since v4.0.0

## mapArrayEffect

Maps over non-empty array chunks emitted by the stream effectfully.

**When to use**

Use when transformation needs to see and replace each non-empty emitted chunk
effectfully instead of mapping individual stream elements.

**Example** (Effectfully mapping stream chunks)

```ts
import { Array, Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.fromArray([1, 2, 3, 4]).pipe(
    Stream.rechunk(2),
    Stream.mapArrayEffect((chunk, index) => Effect.succeed(Array.map(chunk, (n) => n + index * 10))),
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [1, 2, 13, 14]
```

**Signature**

```ts
declare const mapArrayEffect: {
  <A, B, E2, R2>(
    f: (a: Arr.NonEmptyReadonlyArray<A>, i: number) => Effect.Effect<Arr.NonEmptyReadonlyArray<B>, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<B, E | E2, R | R2>
  <A, E, R, B, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: Arr.NonEmptyReadonlyArray<A>, i: number) => Effect.Effect<Arr.NonEmptyReadonlyArray<B>, E2, R2>
  ): Stream<B, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2136)

Since v4.0.0

## mapBoth

Maps both the failure and success channels of a stream.

**Example** (Mapping both the failure and success channels of a stream)

```ts
import { Console, Effect, Stream } from "effect"

const mapper = {
  onFailure: (error: string) => `error: ${error}`,
  onSuccess: (value: number) => value * 2
}

const program = Effect.gen(function* () {
  const success = yield* Stream.make(1, 2).pipe(Stream.mapBoth(mapper), Stream.runCollect)
  yield* Console.log(success)

  const failure = yield* Stream.fail("boom").pipe(
    Stream.mapBoth(mapper),
    Stream.catch((error: string) => Stream.succeed(error)),
    Stream.runCollect
  )
  yield* Console.log(failure)
})

Effect.runPromise(program)
// Output: [ 2, 4 ]
// Output: [ "error: boom" ]
```

**Signature**

```ts
declare const mapBoth: {
  <E, E2, A, A2>(options: {
    readonly onFailure: (e: E) => E2
    readonly onSuccess: (a: A) => A2
  }): <R>(self: Stream<A, E, R>) => Stream<A2, E2, R>
  <A, E, R, E2, A2>(
    self: Stream<A, E, R>,
    options: { readonly onFailure: (e: E) => E2; readonly onSuccess: (a: A) => A2 }
  ): Stream<A2, E2, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1926)

Since v2.0.0

## mapEffect

Maps over elements of the stream with the specified effectful function.

**When to use**

Use when each stream element transformation needs an Effect, service
dependency, failure channel, or configured concurrency.

**Example** (Effectfully mapping stream values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3)

const mappedStream = stream.pipe(
  Stream.mapEffect((n) =>
    Effect.gen(function* () {
      yield* Console.log(`Processing: ${n}`)
      return n * 2
    })
  )
)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(mappedStream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output:
// Processing: 1
// Processing: 2
// Processing: 3
// [2, 4, 6]
```

**Signature**

```ts
declare const mapEffect: {
  <A, A2, E2, R2>(
    f: (a: A, i: number) => Effect.Effect<A2, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly unordered?: boolean | undefined }
      | undefined
  ): <E, R>(self: Stream<A, E, R>) => Stream<A2, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: A, i: number) => Effect.Effect<A2, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly unordered?: boolean | undefined }
      | undefined
  ): Stream<A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2020)

Since v2.0.0

# merging

## combine

Combines elements from this stream and the specified stream by repeatedly
applying a stateful function that can pull from either side.

**Details**

Where possible, prefer `Stream.combineArray` for a more efficient
implementation.

**Example** (Combining streams with state)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.combine(
  Stream.make("A", "B", "C"),
  Stream.make(1, 2, 3),
  () => true,
  (takeLeft, pullLeft, pullRight) =>
    takeLeft
      ? Effect.map(pullLeft, (value) => [`L:${value}`, false] as const)
      : Effect.map(pullRight, (value) => [`R:${value}`, true] as const)
)

const program = Effect.gen(function* () {
  const output = yield* Stream.runCollect(stream)
  yield* Console.log(output)
})

Effect.runPromise(program)
// Output: [ "L:A", "R:1", "L:B", "R:2", "L:C", "R:3" ]
```

**Signature**

```ts
declare const combine: {
  <A2, E2, R2, S, E, A, A3, E3, R3>(
    that: Stream<A2, E2, R2>,
    s: LazyArg<S>,
    f: (
      s: S,
      pullLeft: Pull.Pull<A, E, void>,
      pullRight: Pull.Pull<A2, E2, void>
    ) => Effect.Effect<readonly [A3, S], E3, R3>
  ): <R>(self: Stream<A, E, R>) => Stream<A3, E3, R2 | R3 | R>
  <A, E, R, A2, E2, R2, S, A3, E3, R3>(
    self: Stream<A, E, R>,
    that: Stream<A2, E2, R2>,
    s: LazyArg<S>,
    f: (
      s: S,
      pullLeft: Pull.Pull<A, E, void>,
      pullRight: Pull.Pull<A2, E2, void>
    ) => Effect.Effect<readonly [A3, S], E3, R3>
  ): Stream<A3, E3, R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7277)

Since v2.0.0

## interleave

Interleaves this stream with the specified stream by alternating pulls from
each stream; when one ends, the remaining values from the other stream are
emitted.

**Example** (Interleaving streams)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.interleave(Stream.make(2, 3), Stream.make(5, 6, 7))

const program = Effect.gen(function* () {
  const collected = yield* Stream.runCollect(stream)
  yield* Console.log(collected)
})

Effect.runPromise(program)
// [2, 5, 3, 6, 7]
```

**Signature**

```ts
declare const interleave: {
  <A2, E2, R2>(that: Stream<A2, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A2 | A, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, that: Stream<A2, E2, R2>): Stream<A | A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9575)

Since v2.0.0

## interleaveWith

Interleaves two streams deterministically by following a boolean decider stream.

**Details**

The decider controls how many elements are pulled; if one side ends, pulls for
that side are ignored.

**Example** (Interleaving two streams deterministically by following a boolean decider stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const left = Stream.make(1, 3, 5)
  const right = Stream.make(2, 4, 6)
  const decider = Stream.make(true, false, false, true, true)

  const values = yield* Stream.runCollect(Stream.interleaveWith(left, right, decider))

  yield* Console.log(values)
})

Effect.runPromise(program)
// [ 1, 2, 4, 3, 5 ]
```

**Signature**

```ts
declare const interleaveWith: {
  <A2, E2, R2, E3, R3>(
    that: Stream<A2, E2, R2>,
    decider: Stream<boolean, E3, R3>
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A2 | A, E2 | E3 | E, R2 | R3 | R>
  <A, E, R, A2, E2, R2, E3, R3>(
    self: Stream<A, E, R>,
    that: Stream<A2, E2, R2>,
    decider: Stream<boolean, E3, R3>
  ): Stream<A | A2, E | E2 | E3, R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9620)

Since v2.0.0

## merge

Merges two streams, emitting elements from both as they arrive.

**Details**

By default, the merged stream ends when both streams end. Use
`haltStrategy` to change the termination behavior.

**Example** (Merging stream values)

```ts
import { Console, Effect, Stream } from "effect"

const fast = Stream.make(1, 2, 3)
const slow = Stream.fromEffect(Effect.delay(Effect.succeed(4), "50 millis"))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(Stream.merge(fast, slow))
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3, 4 ]
```

**Signature**

```ts
declare const merge: {
  <A2, E2, R2>(
    that: Stream<A2, E2, R2>,
    options?: { readonly haltStrategy?: HaltStrategy | undefined } | undefined
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A | A2, E | E2, R | R2>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    that: Stream<A2, E2, R2>,
    options?: { readonly haltStrategy?: HaltStrategy | undefined } | undefined
  ): Stream<A | A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3128)

Since v2.0.0

## mergeAll

Merges a collection of streams, running up to the specified number concurrently.

**When to use**

Use to merge an iterable of already-created streams while bounding how many
inner streams may run at the same time.

**Details**

The `concurrency` option is required and may be a number or `"unbounded"`.
`bufferSize` controls buffering between inner streams, and outputs are
emitted as they arrive under concurrent merging.

**Example** (Merging streams with bounded concurrency)

```ts
import { Console, Effect, Stream } from "effect"

const streams = [
  Stream.fromEffect(Effect.delay(Effect.succeed("A"), "20 millis")),
  Stream.fromEffect(Effect.delay(Effect.succeed("B"), "10 millis"))
]

const program = Effect.gen(function* () {
  const values = yield* Stream.mergeAll(streams, { concurrency: 2 }).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ "B", "A" ]
```

**See**

- `merge` for merging exactly two streams and choosing a halt strategy
- `flatten` for flattening a stream that already emits streams

**Signature**

```ts
declare const mergeAll: {
  (options: {
    readonly concurrency: number | "unbounded"
    readonly bufferSize?: number | undefined
  }): <A, E, R>(streams: Iterable<Stream<A, E, R>>) => Stream<A, E, R>
  <A, E, R>(
    streams: Iterable<Stream<A, E, R>>,
    options: { readonly concurrency: number | "unbounded"; readonly bufferSize?: number | undefined }
  ): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3387)

Since v2.0.0

## mergeEffect

Merges this stream with a background effect, keeping the stream's elements.

**When to use**

Use when an effect should run concurrently for the lifetime of a stream while
only the stream's elements remain in the output.

**Details**

The effect runs concurrently, fails the stream if it fails, and is interrupted
when the stream completes.

**Example** (Merging with a background effect)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.mergeEffect(Console.log("side task")), Stream.runCollect)

  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: side task
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const mergeEffect: {
  <A2, E2, R2>(effect: Effect.Effect<A2, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, effect: Effect.Effect<A2, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3188)

Since v4.0.0

## mergeLeft

Merges two streams while emitting only the values from the left stream.

**When to use**

Use when the right stream is needed for its effects or failures, but downstream
consumers should only receive values from the left stream.

**Details**

The right stream still runs for its effects, and any failures from the right
stream are propagated. The merged stream completes when the left stream
completes, interrupting the right stream.

**Example** (Merging streams while keeping left values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const left = Stream.make(1, 2)
  const right = Stream.make("a", "b")
  const values = yield* left.pipe(Stream.mergeLeft(right), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const mergeLeft: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<AL, ER | EL, RR | RL>
  <AL, EL, RL, AR, ER, RR>(left: Stream<AL, EL, RL>, right: Stream<AR, ER, RR>): Stream<AL, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3290)

Since v2.0.0

## mergeResult

Merges this stream and the specified stream together, tagging values from the
left stream as `Result.succeed` and values from the right stream as `Result.fail`.

**When to use**

Use when values from both streams should be emitted and downstream code needs
left values wrapped as successful `Result` values and right values wrapped as
failed `Result` values.

**Example** (Merging streams into results)

```ts
import { Console, Effect, Result, Stream } from "effect"

const left = Stream.fromEffect(Effect.succeed("left"))
const right = Stream.fromEffect(Effect.delay(Effect.succeed("right"), "10 millis"))

const merged = left.pipe(
  Stream.mergeResult(right),
  Stream.map(
    Result.match({
      onFailure: (value) => `right:${value}`,
      onSuccess: (value) => `left:${value}`
    })
  )
)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(merged)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ "left:left", "right:right" ]
```

**Signature**

```ts
declare const mergeResult: {
  <A2, E2, R2>(
    that: Stream<A2, E2, R2>
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<Result.Result<A, A2>, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, that: Stream<A2, E2, R2>): Stream<Result.Result<A, A2>, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3240)

Since v4.0.0

## mergeRight

Merges this stream and the specified stream together, emitting only the
values from the right stream while the left stream runs for its effects.

**When to use**

Use when the left stream is needed for its effects or failures, but downstream
consumers should only receive values from the right stream.

**Details**

The merged stream ends when the right stream completes, interrupting the
left stream. Failures from the left stream still fail the merged stream.

**Example** (Merging streams while keeping right values)

```ts
import { Console, Effect, Stream } from "effect"

const left = Stream.make("left-1", "left-2").pipe(Stream.tap(() => Effect.sync(() => undefined)))
const right = Stream.make(1, 2)

const merged = Stream.mergeRight(left, right)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(merged)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const mergeRight: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<AR, ER | EL, RR | RL>
  <AL, EL, RL, AR, ER, RR>(left: Stream<AL, EL, RL>, right: Stream<AR, ER, RR>): Stream<AR, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3337)

Since v2.0.0

# models

## EventListener (interface)

Interface representing an event listener target.

**Signature**

```ts
export interface EventListener<A> {
  addEventListener(
    event: string,
    f: (event: A) => void,
    options?:
      | {
          readonly capture?: boolean
          readonly passive?: boolean
          readonly once?: boolean
          readonly signal?: AbortSignal
        }
      | boolean
  ): void
  removeEventListener(
    event: string,
    f: (event: A) => void,
    options?:
      | {
          readonly capture?: boolean
        }
      | boolean
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L1538)

Since v3.4.0

## HaltStrategy (type alias)

Describes how merged streams decide when to halt.

**Signature**

```ts
type HaltStrategy = Channel.HaltStrategy
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L316)

Since v4.0.0

## Stream (interface)

A `Stream<A, E, R>` describes a program that can emit many `A` values, fail
with `E`, and require `R`.

**Details**

Streams are pull-based with backpressure and emit chunks to amortize effect
evaluation. They support monadic composition and error handling similar to
`Effect`, adapted for multiple values.

**Example** (Creating and consuming streams)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  yield* Stream.make(1, 2, 3).pipe(
    Stream.map((n) => n * 2),
    Stream.runForEach((n) => Console.log(n))
  )
})

Effect.runPromise(program)
// Output:
// 2
// 4
// 6
```

**Signature**

```ts
export interface Stream<out A, out E = never, out R = never> extends Variance<A, E, R>, Pipeable {
  readonly channel: Channel.Channel<Arr.NonEmptyReadonlyArray<A>, E, void, unknown, unknown, unknown, R>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: StreamUnify<this>
  [Unify.ignoreSymbol]?: StreamUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L126)

Since v2.0.0

## StreamUnify (interface)

Type-level unification hook for Stream within the Effect type system.

**Signature**

```ts
export interface StreamUnify<A extends { [Unify.typeSymbol]?: any }> extends Effect.EffectUnify<A> {
  Stream?: () => A[Unify.typeSymbol] extends Stream<infer A0, infer E0, infer R0> | infer _ ? Stream<A0, E0, R0> : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L139)

Since v2.0.0

## StreamUnifyIgnore (interface)

Type-level marker that excludes Stream from unification.

**Signature**

```ts
export interface StreamUnifyIgnore {
  Effect?: true
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L149)

Since v2.0.0

## Variance (interface)

Type-level variance marker for `Stream`.

**Details**

The emitted value `A`, error `E`, and service requirement `R` type
parameters are covariant.

**Signature**

```ts
export interface Variance<out A, out E, out R> {
  readonly [TypeId]: VarianceStruct<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L184)

Since v2.0.0

## VarianceStruct (interface)

Structural encoding used by `Variance` to record each `Stream` type
parameter's variance.

**Details**

`_A`, `_E`, and `_R` are covariant markers.

**Signature**

```ts
export interface VarianceStruct<out A, out E, out R> {
  readonly _A: Covariant<A>
  readonly _E: Covariant<E>
  readonly _R: Covariant<R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L199)

Since v3.4.0

# racing

## race

Runs both streams concurrently until one stream emits its first value, then
mirrors that winning stream and interrupts the other.

**Details**

A failure or completion from one side before the other side emits does not
win the race unless both sides fail or complete before emitting. After a
winner is chosen, that stream's later failures are propagated.

**Example** (Racing two streams)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const stream = Stream.race(Stream.make(0, 1, 2), Stream.fromSchedule(Schedule.spaced("1 second")))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 0, 1, 2 ]
```

**Signature**

```ts
declare const race: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<AL | AR, EL | ER, RL | RR>
  <AL, EL, RL, AR, ER, RR>(left: Stream<AL, EL, RL>, right: Stream<AR, ER, RR>): Stream<AL | AR, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4270)

Since v3.7.0

## raceAll

Runs all streams concurrently until one stream emits its first value, then
mirrors that winning stream and interrupts the rest.

**Details**

Failures or completion from losing streams before a winner is chosen are
ignored unless every stream fails or completes before emitting. After a
winner is chosen, that stream's later failures are propagated.

**Example** (Racing multiple streams)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.raceAll(Stream.fromSchedule(Schedule.spaced("1 second")), Stream.make(0, 1, 2)).pipe(
    Stream.runCollect
  )
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 0, 1, 2 ]
```

**Signature**

```ts
declare const raceAll: <S extends ReadonlyArray<Stream<any, any, any>>>(
  ...streams: S
) => Stream<Success<S[number]>, Error<S[number]>, Services<S[number]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4209)

Since v3.5.0

# rate limiting

## buffer

Buffers up to `capacity` elements so a faster producer can progress
independently of a slower consumer.

**Details**

Finite buffers use the configured queue strategy: `"suspend"` applies
backpressure, while `"dropping"` and `"sliding"` may discard elements when
the buffer is full. This combinator destroys chunking; use `Stream.rechunk`
afterward if you need fixed chunk sizes.

**Example** (Buffering stream elements)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.buffer({ capacity: 1 }), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const buffer: {
  (
    options:
      | { readonly capacity: "unbounded" }
      | { readonly capacity: number; readonly strategy?: "dropping" | "sliding" | "suspend" | undefined }
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | { readonly capacity: "unbounded" }
      | { readonly capacity: number; readonly strategy?: "dropping" | "sliding" | "suspend" | undefined }
  ): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4836)

Since v2.0.0

## bufferArray

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` chunks in a queue.

**Details**

Finite buffers use the configured queue strategy: `"suspend"` applies
backpressure, while `"dropping"` and `"sliding"` may discard chunks when the
buffer is full. This combinator preserves chunking and is best with
power-of-2 capacities.

**Example** (Buffering stream chunks)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.fromArrays([1, 2], [3, 4]).pipe(Stream.bufferArray({ capacity: 2 }), Stream.runCollect)
  yield* Console.log(result)
})

// Output: [ 1, 2, 3, 4 ]
```

**Signature**

```ts
declare const bufferArray: {
  (
    options:
      | { readonly capacity: "unbounded" }
      | { readonly capacity: number; readonly strategy?: "dropping" | "sliding" | "suspend" | undefined }
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(
    self: Stream<A, E, R>,
    options:
      | { readonly capacity: "unbounded" }
      | { readonly capacity: number; readonly strategy?: "dropping" | "sliding" | "suspend" | undefined }
  ): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4888)

Since v4.0.0

## debounce

Drops earlier elements within the debounce window and emits only the latest element after the pause.

**Example** (Debouncing stream elements)

```ts
import { Console, Duration, Effect, Stream } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fromEffect(Effect.sleep(Duration.millis(50)).pipe(Effect.as(4)))),
  Stream.concat(Stream.make(5)),
  Stream.debounce(Duration.millis(30))
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
  // Output: [ 3, 5 ]
})
```

**Signature**

```ts
declare const debounce: {
  (duration: Duration.Input): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, duration: Duration.Input): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7839)

Since v2.0.0

## schedule

Schedules the stream's elements according to the provided schedule.

**Example** (Scheduling stream elements)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3).pipe(Stream.schedule(Schedule.spaced("10 millis")), Stream.runCollect)

  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const schedule: {
  <X, E2, R2, A>(
    schedule: Schedule.Schedule<X, NoInfer<A>, E2, R2>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R2 | R>
  <A, E, R, X, E2, R2>(
    self: Stream<A, E, R>,
    schedule: Schedule.Schedule<X, NoInfer<A>, E2, R2>
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2736)

Since v2.0.0

## throttle

Rate-limits stream chunks with a synchronous cost function.

**When to use**

Use to throttle chunks when each chunk's cost can be computed synchronously.

**Details**

Uses a token bucket. The bucket can accumulate up to `units + burst` tokens,
and each chunk consumes the cost returned by `cost`.

If using the "enforce" strategy, arrays that do not meet the bandwidth
constraints are dropped. If using the "shape" strategy, arrays are delayed
until they can be emitted without exceeding the bandwidth constraints.

Defaults to the "shape" strategy.

**Example** (Throttling stream chunks)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const stream = Stream.fromSchedule(Schedule.spaced("50 millis")).pipe(
  Stream.take(6),
  Stream.throttle({
    cost: (arr) => arr.length,
    units: 1,
    duration: "100 millis",
    strategy: "shape"
  })
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
  // Output: [ 0, 1, 2, 3, 4, 5 ]
})
```

**Signature**

```ts
declare const throttle: {
  <A>(options: {
    readonly cost: (arr: Arr.NonEmptyReadonlyArray<A>) => number
    readonly units: number
    readonly duration: Duration.Input
    readonly burst?: number | undefined
    readonly strategy?: "enforce" | "shape" | undefined
  }): <E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(
    self: Stream<A, E, R>,
    options: {
      readonly cost: (arr: Arr.NonEmptyReadonlyArray<A>) => number
      readonly units: number
      readonly duration: Duration.Input
      readonly burst?: number | undefined
      readonly strategy?: "enforce" | "shape" | undefined
    }
  ): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L8119)

Since v2.0.0

## throttleEffect

Rate-limits stream chunks with an effectful cost function.

**When to use**

Use to throttle chunks when computing each chunk's cost requires an effect.

**Details**

Uses a token bucket. The bucket can accumulate up to `units + burst` tokens,
and each chunk consumes the cost returned by the effectful `cost` function.

If using the "enforce" strategy, arrays that do not meet the bandwidth
constraints are dropped. If using the "shape" strategy, arrays are delayed
until they can be emitted without exceeding the bandwidth constraints.

Defaults to the "shape" strategy.

**Example** (Throttling stream chunks effectfully)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const stream = Stream.fromSchedule(Schedule.spaced("50 millis")).pipe(
  Stream.take(6),
  Stream.throttleEffect({
    cost: (arr) => Effect.succeed(arr.length),
    units: 1,
    duration: "100 millis",
    strategy: "shape"
  })
)

Effect.runPromise(
  Effect.gen(function* () {
    const result = yield* Stream.runCollect(stream)
    yield* Console.log(result)
  })
)
// Output: [0, 1, 2, 3, 4, 5]
```

**Signature**

```ts
declare const throttleEffect: {
  <A, E2, R2>(options: {
    readonly cost: (arr: Arr.NonEmptyReadonlyArray<A>) => Effect.Effect<number, E2, R2>
    readonly units: number
    readonly duration: Duration.Input
    readonly burst?: number | undefined
    readonly strategy?: "enforce" | "shape" | undefined
  }): <E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, E2, R2>(
    self: Stream<A, E, R>,
    options: {
      readonly cost: (arr: Arr.NonEmptyReadonlyArray<A>) => Effect.Effect<number, E2, R2>
      readonly units: number
      readonly duration: Duration.Input
      readonly burst?: number | undefined
      readonly strategy?: "enforce" | "shape" | undefined
    }
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7955)

Since v2.0.0

## timeout

Ends the stream if it does not produce a value within the specified duration.

**Example** (Timing out a stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1).pipe(Stream.concat(Stream.never), Stream.timeout("1 second"), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1 ]
```

**Signature**

```ts
declare const timeout: {
  (duration: Duration.Input): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
  <A, E, R>(self: Stream<A, E, R>, duration: Duration.Input): Stream<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2779)

Since v2.0.0

## timeoutOrElse

Switches to a fallback stream if this stream does not emit a value within
the specified duration.

**When to use**

Use when a stream should continue with another stream if an upstream pull
waits longer than the allowed duration.

**Details**

The timeout is checked for each pull. A zero duration uses `orElse`
immediately, while an infinite duration leaves the original stream
unchanged.

**Gotchas**

The fallback stream is not timed after the switch.

**See**

- `timeout` for ending the stream instead of switching to a fallback stream

**Signature**

```ts
declare const timeoutOrElse: {
  <B, E2, R2>(options: {
    readonly duration: Duration.Input
    readonly orElse: () => Stream<B, E2, R2>
  }): <A, E, R>(self: Stream<A, E, R>) => Stream<A | B, E | E2, R | R2>
  <A, E, R, B, E2, R2>(
    self: Stream<A, E, R>,
    options: { readonly duration: Duration.Input; readonly orElse: () => Stream<B, E2, R2> }
  ): Stream<A | B, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2815)

Since v4.0.0

# sequencing

## combineArray

Combines two streams chunk-by-chunk with a stateful pull function.

**When to use**

Use to coordinate pulling chunks from two streams when each emitted chunk
depends on both sides and local state.

**Details**

The combining function receives the current state and pull functions for the
left and right streams. It returns the next non-empty chunk together with the
next state.

**Example** (Combining stream chunks with state)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make(1, 2).pipe(
  Stream.combineArray(
    Stream.make(10, 20),
    () => true,
    (useLeft, pullLeft, pullRight) =>
      Effect.gen(function* () {
        const array = useLeft ? yield* pullLeft : yield* pullRight
        return [array, !useLeft] as const
      })
  )
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 10, 20 ]
```

**Signature**

```ts
declare const combineArray: {
  <A2, E2, R2, S, E, A, A3, E3, R3>(
    that: Stream<A2, E2, R2>,
    s: LazyArg<S>,
    f: (
      s: S,
      pullLeft: Pull.Pull<Arr.NonEmptyReadonlyArray<A>, E, void>,
      pullRight: Pull.Pull<Arr.NonEmptyReadonlyArray<A2>, E2, void>
    ) => Effect.Effect<readonly [Arr.NonEmptyReadonlyArray<A3>, S], E3, R3>
  ): <R>(self: Stream<A, E, R>) => Stream<A3, Pull.ExcludeDone<E3>, R2 | R3 | R>
  <R, A2, E2, R2, S, E, A, A3, E3, R3>(
    self: Stream<A, E, R>,
    that: Stream<A2, E2, R2>,
    s: LazyArg<S>,
    f: (
      s: S,
      pullLeft: Pull.Pull<Arr.NonEmptyReadonlyArray<A>, E, void>,
      pullRight: Pull.Pull<Arr.NonEmptyReadonlyArray<A2>, E2, void>
    ) => Effect.Effect<readonly [Arr.NonEmptyReadonlyArray<A3>, S], E3, R3>
  ): Stream<A3, Pull.ExcludeDone<E3>, R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L7360)

Since v4.0.0

## concat

Concatenates two streams, emitting all elements from the first stream
followed by all elements from the second stream.

**Example** (Concatenating streams)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.concat(Stream.make(1, 2, 3), Stream.make(4, 5, 6))

Effect.gen(function* () {
  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})
// Output: [ 1, 2, 3, 4, 5, 6 ]
```

**Signature**

```ts
declare const concat: {
  <A2, E2, R2>(that: Stream<A2, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A | A2, E | E2, R | R2>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, that: Stream<A2, E2, R2>): Stream<A | A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3059)

Since v2.0.0

## drain

Converts this stream to one that runs its effects but emits no elements.

**Example** (Draining stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.range(1, 6).pipe(Stream.drain, Stream.runCollect)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: []
```

**Signature**

```ts
declare const drain: <A, E, R>(self: Stream<A, E, R>) => Stream<never, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2624)

Since v2.0.0

## drainFork

Runs the provided stream in the background while this stream runs, interrupting it
when this stream completes and failing if the background stream fails or defects.

**Example** (Draining a stream in the background)

```ts
import { Console, Effect, Stream } from "effect"

const foreground = Stream.make(1, 2)
const background = Stream.fromEffect(Console.log("background task"))

const program = Effect.gen(function* () {
  const values = yield* foreground.pipe(Stream.drainFork(background), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: background task
// Output: [ 1, 2 ]
```

**Signature**

```ts
declare const drainFork: {
  <A2, E2, R2>(that: Stream<A2, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, that: Stream<A2, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2654)

Since v2.0.0

## flattenArray

Flattens a stream of non-empty arrays into a stream of elements.

**Example** (Flattening a stream of non-empty arrays into a stream of elements)

```ts
import { Array, Console, Effect, Stream } from "effect"

const stream = Stream.make(Array.make(1, 2), Array.make(3))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(Stream.flattenArray(stream))
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const flattenArray: <A, E, R>(self: Stream<Arr.NonEmptyReadonlyArray<A>, E, R>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2601)

Since v4.0.0

## flattenTake

Unwraps `Take` values, emitting elements from non-empty arrays and ending or
failing when the `Exit` signals completion.

**Example** (Flattening Take values)

```ts
import { Array, Console, Effect, Exit, Stream } from "effect"

const program = Effect.gen(function* () {
  const takes = Stream.make(Array.make(1, 2), Array.make(3), Exit.succeed<void>(undefined))

  const values = yield* Stream.flattenTake(takes).pipe(Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ 1, 2, 3 ]
```

**Signature**

```ts
declare const flattenTake: <A, E, E2, R>(self: Stream<Take.Take<A, E>, E2, R>) => Stream<A, E | E2, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3031)

Since v2.0.0

## forever

Repeats this stream forever.

**Example** (Repeating a stream forever)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make("A", "B").pipe(Stream.forever, Stream.take(5))

const program = Effect.gen(function* () {
  const output = yield* Stream.runCollect(stream)
  yield* Console.log(output)
})

Effect.runPromise(program)
// Output: [ "A", "B", "A", "B", "A" ]
```

**Signature**

```ts
declare const forever: <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2978)

Since v2.0.0

## intersperse

Inserts the provided element between emitted elements.

**Example** (Interspersing stream elements)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2, 3, 4).pipe(Stream.intersperse(0))
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// [1, 0, 2, 0, 3, 0, 4]
```

**Signature**

```ts
declare const intersperse: {
  <A2>(element: A2): <A, E, R>(self: Stream<A, E, R>) => Stream<A2 | A, E, R>
  <A, E, R, A2>(self: Stream<A, E, R>, element: A2): Stream<A | A2, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9486)

Since v2.0.0

## intersperseAffixes

Adds a start value, middle value, and end value around stream elements.

**Details**

The start and end values are always emitted, even when the stream is empty.

**Example** (Interspersing stream affixes)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.make("a", "b", "c").pipe(Stream.intersperseAffixes({ start: "[", middle: ",", end: "]" }))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// [ "[", "a", ",", "b", ",", "c", "]" ]
```

**Signature**

```ts
declare const intersperseAffixes: {
  <A2, A3, A4>(options: {
    readonly start: A2
    readonly middle: A3
    readonly end: A4
  }): <A, E, R>(self: Stream<A, E, R>) => Stream<A2 | A3 | A4 | A, E, R>
  <A, E, R, A2, A3, A4>(
    self: Stream<A, E, R>,
    options: { readonly start: A2; readonly middle: A3; readonly end: A4 }
  ): Stream<A | A2 | A3 | A4, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9531)

Since v2.0.0

## onEnd

Runs the provided effect when the stream ends successfully.

**Example** (Running an effect on end)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.onEnd(Console.log("Stream ended")), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Stream ended
// [1, 2, 3]
```

**Signature**

```ts
declare const onEnd: {
  <X, EX, RX>(onEnd: Effect.Effect<X, EX, RX>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | EX, R | RX>
  <A, E, R, X, EX, RX>(self: Stream<A, E, R>, onEnd: Effect.Effect<X, EX, RX>): Stream<A, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9949)

Since v3.6.0

## onFirst

Runs the provided effect with the first element emitted by the stream.

**Example** (Running an effect on the first value)

```ts
import { Console, Effect, Stream } from "effect"

Effect.runPromise(
  Effect.gen(function* () {
    yield* Stream.fromArray([1, 2, 3]).pipe(
      Stream.onFirst((value) => Console.log(`first=${value}`)),
      Stream.runDrain
    )
  })
)
// Output: first=1
```

**Signature**

```ts
declare const onFirst: {
  <A, X, EX, RX>(
    onFirst: (element: NoInfer<A>) => Effect.Effect<X, EX, RX>
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E | EX, R | RX>
  <A, E, R, X, EX, RX>(
    self: Stream<A, E, R>,
    onFirst: (element: NoInfer<A>) => Effect.Effect<X, EX, RX>
  ): Stream<A, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9912)

Since v4.0.0

## onStart

Runs the provided effect before this stream starts.

**Example** (Running an effect on start)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.fromArray([1, 2, 3]).pipe(Stream.onStart(Console.log("Stream started")))

  const values = yield* Stream.runCollect(stream)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output:
// Stream started
// [1, 2, 3]
```

**Signature**

```ts
declare const onStart: {
  <X, EX, RX>(onStart: Effect.Effect<X, EX, RX>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | EX, R | RX>
  <A, E, R, X, EX, RX>(self: Stream<A, E, R>, onStart: Effect.Effect<X, EX, RX>): Stream<A, E | EX, R | RX>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L9879)

Since v3.6.0

## prepend

Prepends the values from the provided iterable before the stream's elements.

**Example** (Prepending values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(3, 4).pipe(Stream.prepend([1, 2]), Stream.runCollect)

  yield* Console.log(values)
  // Output: [ 1, 2, 3, 4 ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const prepend: {
  <B>(values: Iterable<B>): <A, E, R>(self: Stream<A, E, R>) => Stream<B | A, E, R>
  <A, E, R, B>(self: Stream<A, E, R>, values: Iterable<B>): Stream<A | B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3092)

Since v2.0.0

## repeat

Repeats the entire stream according to the provided schedule.

**Example** (Repeating a stream on a schedule)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.make(1).pipe(Stream.repeat(Schedule.recurs(4)), Stream.runCollect)

  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ 1, 1, 1, 1, 1 ]
```

**Signature**

```ts
declare const repeat: {
  <B, E2, R2>(
    schedule:
      | Schedule.Schedule<B, void, E2, R2>
      | ((
          $: <SO, SE, SR>(_: Schedule.Schedule<SO, void, SE, SR>) => Schedule.Schedule<SO, void, SE, SR>
        ) => Schedule.Schedule<B, void, E2, R2>)
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R2 | R>
  <A, E, R, B, E2, R2>(
    self: Stream<A, E, R>,
    schedule:
      | Schedule.Schedule<B, void, E2, R2>
      | ((
          $: <SO, SE, SR>(_: Schedule.Schedule<SO, void, SE, SR>) => Schedule.Schedule<SO, void, SE, SR>
        ) => Schedule.Schedule<B, void, E2, R2>)
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2687)

Since v2.0.0

## repeatElements

Repeats each element of the stream according to the provided schedule,
including the original emission.

**Example** (Repeating stream elements)

```ts
import { Console, Effect, Schedule, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make("A", "B", "C").pipe(Stream.repeatElements(Schedule.recurs(1)), Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ "A", "A", "B", "B", "C", "C" ]
```

**Signature**

```ts
declare const repeatElements: {
  <B, E2, R2>(
    schedule: Schedule.Schedule<B, unknown, E2, R2>
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | E2, R2 | R>
  <A, E, R, B, E2, R2>(
    self: Stream<A, E, R>,
    schedule: Schedule.Schedule<B, unknown, E2, R2>
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2908)

Since v2.0.0

## switchMap

Switches to the latest stream produced by the mapping function, interrupting
the previous stream when a new element arrives.

**Example** (Switching to the latest stream)

```ts
import { Console, Effect, Stream } from "effect"

const program = Stream.make(1, 2, 3).pipe(
  Stream.switchMap((n) => (n === 3 ? Stream.make(n) : Stream.never)),
  Stream.runCollect
)

Effect.gen(function* () {
  const result = yield* program
  yield* Console.log(result)
  // Output: [ 3 ]
})
```

**Signature**

```ts
declare const switchMap: {
  <A, A2, E2, R2>(
    f: (a: A) => Stream<A2, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
      | undefined
  ): <E, R>(self: Stream<A, E, R>) => Stream<A2, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: A) => Stream<A2, E2, R2>,
    options?:
      | { readonly concurrency?: number | "unbounded" | undefined; readonly bufferSize?: number | undefined }
      | undefined
  ): Stream<A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2490)

Since v4.0.0

## tap

Runs the provided effect for each element while preserving the elements.

**Example** (Tapping stream values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.fromArray([1, 2, 3]).pipe(
    Stream.tap((n) => Console.log(`before mapping: ${n}`)),
    Stream.map((n) => n * 2),
    Stream.tap((n) => Console.log(`after mapping: ${n}`)),
    Stream.runCollect
  )

  yield* Console.log(result)
})

Effect.runPromise(program)
// Output:
// before mapping: 1
// after mapping: 2
// before mapping: 2
// after mapping: 4
// before mapping: 3
// after mapping: 6
// [ 2, 4, 6 ]
```

**Signature**

```ts
declare const tap: {
  <A, X, E2, R2>(
    f: (a: NoInfer<A>) => Effect.Effect<X, E2, R2>,
    options?: { readonly concurrency?: number | "unbounded" | undefined } | undefined
  ): <E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, X, E2, R2>(
    self: Stream<A, E, R>,
    f: (a: NoInfer<A>) => Effect.Effect<X, E2, R2>,
    options?: { readonly concurrency?: number | "unbounded" | undefined } | undefined
  ): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2220)

Since v2.0.0

## tapBoth

Returns a stream that effectfully "peeks" at elements and failures.

**Example** (Tapping values and errors)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream = Stream.make(1, 2).pipe(
    Stream.concat(Stream.fail("boom")),
    Stream.tapBoth({
      onElement: (value) => Console.log(`seen: ${value}`),
      onError: (error) => Console.log(`error: ${error}`)
    }),
    Stream.catch(() => Stream.make(3))
  )
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output:
// seen: 1
// seen: 2
// error: boom
// [ 1, 2, 3 ]
```

**Signature**

```ts
declare const tapBoth: {
  <A, E, X, E2, R2, Y, E3, R3>(options: {
    readonly onElement: (a: NoInfer<A>) => Effect.Effect<X, E2, R2>
    readonly onError: (a: NoInfer<E>) => Effect.Effect<Y, E3, R3>
    readonly concurrency?: number | "unbounded" | undefined
  }): <R>(self: Stream<A, E, R>) => Stream<A, E | E2 | E3, R | R2 | R3>
  <A, E, R, X, E2, R2, Y, E3, R3>(
    self: Stream<A, E, R>,
    options: {
      readonly onElement: (a: NoInfer<A>) => Effect.Effect<X, E2, R2>
      readonly onError: (a: NoInfer<E>) => Effect.Effect<Y, E3, R3>
      readonly concurrency?: number | "unbounded" | undefined
    }
  ): Stream<A, E | E2 | E3, R | R2 | R3>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2279)

Since v2.0.0

## tapSink

Runs a sink for all stream elements while still emitting them downstream.

**Example** (Tapping values with a sink)

```ts
import { Console, Effect, Ref, Sink, Stream } from "effect"

const program = Effect.gen(function* () {
  const seen = yield* Ref.make<Array<number>>([])
  const sink = Sink.forEach((value: number) => Ref.update(seen, (items) => [...items, value]))
  const result = yield* Stream.make(1, 2, 3).pipe(Stream.tapSink(sink), Stream.runCollect)
  const tapped = yield* Ref.get(seen)
  yield* Console.log(tapped)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [1, 2, 3]
// Output: [1, 2, 3]
```

**Signature**

```ts
declare const tapSink: {
  <A, E2, R2>(sink: Sink.Sink<unknown, A, unknown, E2, R2>): <E, R>(self: Stream<A, E, R>) => Stream<A, E2 | E, R2 | R>
  <A, E, R, E2, R2>(self: Stream<A, E, R>, sink: Sink.Sink<unknown, A, unknown, E2, R2>): Stream<A, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L2338)

Since v2.0.0

# services

## provide

Provides a layer or context to the stream, removing the corresponding
service requirements. Use `options.local` to build the layer every time; by
default, layers are shared between provide calls.

**Example** (Providing stream requirements)

```ts
import { Console, Context, Effect, Layer, Stream } from "effect"

class Env extends Context.Service<Env, { readonly name: string }>()("Env") {}

const layer = Layer.succeed(Env)({ name: "Ada" })

const stream = Stream.fromEffect(
  Effect.gen(function* () {
    const env = yield* Effect.service(Env)
    return `Hello, ${env.name}`
  })
)

const withEnv = stream.pipe(Stream.provide(layer))

const program = Stream.runCollect(withEnv).pipe(Effect.flatMap((values) => Console.log(values)))

Effect.runPromise(program)
// Output:
// ["Hello, Ada"]
```

**Signature**

```ts
declare const provide: {
  <AL, EL = never, RL = never>(
    layer: Layer.Layer<AL, EL, RL> | Context.Context<AL>,
    options?: { readonly local?: boolean | undefined } | undefined
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | EL, Exclude<R, AL> | RL>
  <A, E, R, AL, EL = never, RL = never>(
    self: Stream<A, E, R>,
    layer: Layer.Layer<AL, EL, RL> | Context.Context<AL>,
    options?: { readonly local?: boolean | undefined } | undefined
  ): Stream<A, E | EL, Exclude<R, AL> | RL>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10031)

Since v4.0.0

## provideContext

Provides multiple services to the stream using a context.

**Example** (Providing multiple services to the stream using a context)

```ts
import { Console, Context, Effect, Stream } from "effect"

class Config extends Context.Service<Config, { readonly prefix: string }>()("Config") {}
class Greeter extends Context.Service<Greeter, { greet: (name: string) => string }>()("Greeter") {}

const context = Context.make(Config, { prefix: "Hello" }).pipe(
  Context.add(Greeter, { greet: (name: string) => `${name}!` })
)

const stream = Stream.fromEffect(
  Effect.gen(function* () {
    const config = yield* Effect.service(Config)
    const greeter = yield* Effect.service(Greeter)
    return greeter.greet(config.prefix)
  })
)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(Stream.provideContext(stream, context))
  yield* Console.log(result)
})

Effect.runPromise(program)
// ["Hello!"]
```

**Signature**

```ts
declare const provideContext: {
  <R2>(context: Context.Context<R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, Exclude<R, R2>>
  <A, E, R, R2>(self: Stream<A, E, R>, context: Context.Context<R2>): Stream<A, E, Exclude<R, R2>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10090)

Since v2.0.0

## provideService

Provides the stream with a single required service, eliminating that
requirement from its environment.

**Example** (Providing a stream service)

```ts
import { Console, Context, Effect, Stream } from "effect"

class Greeter extends Context.Service<
  Greeter,
  {
    greet: (name: string) => string
  }
>()("Greeter") {}

const stream = Stream.fromEffect(Effect.service(Greeter).pipe(Effect.map((greeter) => greeter.greet("Ada"))))

const program = Effect.gen(function* () {
  const collected = yield* Stream.runCollect(
    stream.pipe(
      Stream.provideService(Greeter, {
        greet: (name) => `Hello, ${name}`
      })
    )
  )
  yield* Console.log(collected)
})

Effect.runPromise(program)
//=> ["Hello, Ada"]
```

**Signature**

```ts
declare const provideService: {
  <I, S>(key: Context.Key<I, S>, service: NoInfer<S>): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, Exclude<R, I>>
  <A, E, R, I, S>(self: Stream<A, E, R>, key: Context.Key<I, S>, service: NoInfer<S>): Stream<A, E, Exclude<R, I>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10136)

Since v2.0.0

## provideServiceEffect

Provides a service to the stream using an effect, removing the requirement and adding the effect's error and environment.

**Example** (Providing a stream service effectfully)

```ts
import { Console, Context, Effect, Stream } from "effect"

class ApiConfig extends Context.Service<ApiConfig, { readonly baseUrl: string }>()("ApiConfig") {}

const stream = Stream.fromEffect(
  Effect.gen(function* () {
    const config = yield* Effect.service(ApiConfig)
    return config.baseUrl
  })
)

const withConfig = stream.pipe(
  Stream.provideServiceEffect(
    ApiConfig,
    Effect.succeed({ baseUrl: "https://example.com" }).pipe(Effect.tap(() => Console.log("Loading config...")))
  )
)

const program = Stream.runCollect(withConfig).pipe(Effect.flatMap((values) => Console.log(values)))

Effect.runPromise(program)
// Output:
// Loading config...
// ["https://example.com"]
```

**Signature**

```ts
declare const provideServiceEffect: {
  <I, S, ES, RS>(
    key: Context.Key<I, S>,
    service: Effect.Effect<NoInfer<S>, ES, RS>
  ): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E | ES, Exclude<R, I> | RS>
  <A, E, R, I, S, ES, RS>(
    self: Stream<A, E, R>,
    key: Context.Key<I, S>,
    service: Effect.Effect<NoInfer<S>, ES, RS>
  ): Stream<A, E | ES, Exclude<R, I> | RS>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10193)

Since v2.0.0

## updateContext

Transforms the stream's required services by mapping the current context
to a new one.

**Example** (Updating the stream context)

```ts
import { Console, Context, Effect, Stream } from "effect"

class Logger extends Context.Service<Logger, { prefix: string }>()("Logger") {}
class Config extends Context.Service<Config, { name: string }>()("Config") {}

const stream = Stream.fromEffect(
  Effect.gen(function* () {
    const logger = yield* Effect.service(Logger)
    const config = yield* Effect.service(Config)
    return `${logger.prefix}${config.name}`
  })
)

const updated = stream.pipe(
  Stream.updateContext((context: Context.Context<Logger>) => Context.add(context, Config, { name: "World" }))
)

const program = Effect.gen(function* () {
  const values = yield* Stream.runCollect(updated)
  yield* Console.log(values)
})

Effect.runPromise(Effect.provideService(program, Logger, { prefix: "Hello " }))
//=> [ "Hello World" ]
```

**Signature**

```ts
declare const updateContext: {
  <R, R2>(f: (context: Context.Context<R2>) => Context.Context<R>): <A, E>(self: Stream<A, E, R>) => Stream<A, E, R2>
  <A, E, R, R2>(self: Stream<A, E, R>, f: (context: Context.Context<R2>) => Context.Context<R>): Stream<A, E, R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10251)

Since v4.0.0

## updateService

Updates a single service in the stream environment by applying a function.

**Example** (Updating a stream service)

```ts
import { Console, Context, Effect, Stream } from "effect"

class Counter extends Context.Service<Counter, { count: number }>()("Counter") {}

const stream = Stream.fromEffect(Effect.service(Counter)).pipe(
  Stream.updateService(Counter, (counter) => ({ count: counter.count + 1 }))
)

const program = Effect.gen(function* () {
  const counters = yield* Stream.runCollect(stream)
  yield* Console.log(`Updated count: ${counters[0].count}`)
})

Effect.runPromise(Effect.provideService(program, Counter, { count: 0 }))
// Output: Updated count: 1
```

**Signature**

```ts
declare const updateService: {
  <I, S>(key: Context.Key<I, S>, f: (service: NoInfer<S>) => S): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, R | I>
  <A, E, R, I, S>(self: Stream<A, E, R>, key: Context.Key<I, S>, f: (service: NoInfer<S>) => S): Stream<A, E, R | I>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10292)

Since v2.0.0

# tracing

## withSpan

Wraps the stream with a new span for tracing.

**Example** (Wrapping a stream in a span)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.fromArray([1, 2, 3]).pipe(Stream.withSpan("numbers"))

Effect.runPromise(
  Effect.gen(function* () {
    const values = yield* Stream.runCollect(stream)
    yield* Console.log(values)
  })
)
// [1, 2, 3]
```

**Signature**

```ts
declare const withSpan: {
  (name: string, options?: SpanOptions): <A, E, R>(self: Stream<A, E, R>) => Stream<A, E, Exclude<R, ParentSpan>>
  <A, E, R>(self: Stream<A, E, R>, name: string, options?: SpanOptions): Stream<A, E, Exclude<R, ParentSpan>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L10338)

Since v2.0.0

# type IDs

## TypeId

Runtime identifier stored on `Stream` values and used by `isStream` to
recognize them.

**Details**

This marker is part of the runtime representation of `Stream` values. Prefer
`isStream` when narrowing unknown values.

**See**

- `isStream` for the public guard that checks this identifier

**Signature**

```ts
declare const TypeId: "~effect/Stream"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L92)

Since v4.0.0

## TypeId (type alias)

String literal type used as the unique brand for `Stream` values.

**Signature**

```ts
type TypeId = "~effect/Stream"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L76)

Since v4.0.0

# type lambdas

## StreamTypeLambda (interface)

Type lambda for Stream used in higher-kinded type operations.

**Example** (Using the stream type lambda)

```ts
import type { HKT, Stream } from "effect"

// Create a Stream type using the type lambda
type NumberStream = HKT.Kind<Stream.StreamTypeLambda, never, string, never, number>
// Equivalent to: Stream<number, string, never>
```

**Signature**

```ts
export interface StreamTypeLambda extends TypeLambda {
  readonly type: Stream<this["Target"], this["Out1"], this["Out2"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L169)

Since v2.0.0

# utility types

## Error (type alias)

Extract the error type from a Stream type.

**Example** (Extracting the error type from a Stream type)

```ts
import type { Stream } from "effect"

type NumberStream = Stream.Stream<number, string, never>
type ErrorType = Stream.Error<NumberStream>
// ErrorType is string
```

**Signature**

```ts
type Error<T> = [T] extends [Stream<infer _A, infer _E, infer _R>] ? _E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L239)

Since v3.4.0

## Services (type alias)

Extract the services type from a Stream type.

**Example** (Extracting the services type from a Stream type)

```ts
import type { Stream } from "effect"

interface Database {
  query: (sql: string) => unknown
}
type NumberStream = Stream.Stream<number, string, { db: Database }>
type RequiredServices = Stream.Services<NumberStream>
// RequiredServices is { db: Database }
```

**Signature**

```ts
type Services<T> = [T] extends [Stream<infer _A, infer _E, infer _R>] ? _R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L260)

Since v4.0.0

## Success (type alias)

Extract the success type from a Stream type.

**Example** (Extracting the success type from a Stream type)

```ts
import type { Stream } from "effect"

type NumberStream = Stream.Stream<number, string, never>
type SuccessType = Stream.Success<NumberStream>
// SuccessType is number
```

**Signature**

```ts
type Success<T> = [T] extends [Stream<infer _A, infer _E, infer _R>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L221)

Since v3.4.0

# zipping

## cross

Creates the cartesian product of two streams, running the `right` stream for
each element in the `left` stream.

**Details**

See also `Stream.zip` for the more common point-wise variant.

**Example** (Computing cartesian products)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const left = Stream.make(1, 2)
  const right = Stream.make("a", "b")
  const values = yield* Stream.runCollect(Stream.cross(left, right))
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ [ 1, "a" ], [ 1, "b" ], [ 2, "a" ], [ 2, "b" ] ]
```

**Signature**

```ts
declare const cross: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<[AL, AR], EL | ER, RL | RR>
  <AL, ER, RR, AR, EL, RL>(left: Stream<AL, ER, RR>, right: Stream<AR, EL, RL>): Stream<[AL, AR], EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3436)

Since v2.0.0

## crossWith

Creates a cartesian product of elements from two streams using a function.

**Details**

The `right` stream is rerun for every element in the `left` stream.

See also `Stream.zipWith` for the more common point-wise variant.

**Example** (Combining cartesian products)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const left = Stream.make(1, 2)
  const right = Stream.make("a", "b")
  const combined = Stream.crossWith(left, right, (n, s) => `${n}-${s}`)
  const result = yield* Stream.runCollect(combined)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ "1-a", "1-b", "2-a", "2-b" ]
```

**Signature**

```ts
declare const crossWith: {
  <AR, ER, RR, AL, A>(
    right: Stream<AR, ER, RR>,
    f: (left: AL, right: AR) => A
  ): <EL, RL>(left: Stream<AL, EL, RL>) => Stream<A, EL | ER, RL | RR>
  <AL, EL, RL, AR, ER, RR, A>(
    left: Stream<AL, EL, RL>,
    right: Stream<AR, ER, RR>,
    f: (left: AL, right: AR) => A
  ): Stream<A, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3473)

Since v2.0.0

## zip

Zips this stream with another point-wise and emits tuples of elements from
both streams. The new stream ends when either stream ends.

**Example** (Zipping streams)

```ts
import { Console, Effect, Stream } from "effect"

const stream1 = Stream.make(1, 2, 3)
const stream2 = Stream.make("a", "b", "c")

const zipped = Stream.zip(stream1, stream2)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(zipped)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [[1, "a"], [2, "b"], [3, "c"]]
```

**Signature**

```ts
declare const zip: {
  <A2, E2, R2>(that: Stream<A2, E2, R2>): <A, E, R>(self: Stream<A, E, R>) => Stream<[A, A2], E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(self: Stream<A, E, R>, that: Stream<A2, E2, R2>): Stream<[A, A2], E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3685)

Since v2.0.0

## zipFlatten

Zips this stream with another point-wise and emits tuples of elements from
both streams, flattening the left tuple.

**Details**

The new stream will end when one of the sides ends.

**Example** (Zipping and flattening tuples)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const stream1 = Stream.make([1, "a"] as const, [2, "b"] as const, [3, "c"] as const)
  const stream2 = Stream.make("x", "y", "z")
  const result = yield* Stream.zipFlatten(stream1, stream2).pipe(Stream.runCollect)

  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [[1, "a", "x"], [2, "b", "y"], [3, "c", "z"]]
```

**Signature**

```ts
declare const zipFlatten: {
  <A2, E2, R2>(
    that: Stream<A2, E2, R2>
  ): <A extends ReadonlyArray<any>, E, R>(self: Stream<A, E, R>) => Stream<[...A, A2], E2 | E, R2 | R>
  <A extends ReadonlyArray<any>, E, R, A2, E2, R2>(
    self: Stream<A, E, R>,
    that: Stream<A2, E2, R2>
  ): Stream<[...A, A2], E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3817)

Since v2.0.0

## zipLatest

Combines two streams by emitting each new element with the latest value from the other stream.

**When to use**

Use when two streams should start emitting combined pairs after both have
produced at least one value.

**Gotchas**

Note: tracking the latest value is done on a per-array basis. That means
that emitted elements that are not the last value in arrays will never be
used for zipping.

**Example** (Zipping latest values)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Stream.zipLatest(Stream.make(1), Stream.make("a")).pipe(Stream.runCollect)

  yield* Console.log(result)
})
// Output: [ [1, "a"] ]
```

**Signature**

```ts
declare const zipLatest: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<[AL, AR], EL | ER, RL | RR>
  <AL, EL, RL, AR, ER, RR>(left: Stream<AL, EL, RL>, right: Stream<AR, ER, RR>): Stream<[AL, AR], EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4106)

Since v2.0.0

## zipLatestAll

Zips multiple streams so that when a value is emitted by any stream, it is
combined with the latest values from the other streams to produce a result.

**When to use**

Use when each stream should contribute its latest value after all streams have
emitted at least once.

**Gotchas**

Note: tracking the latest value is done on a per-array basis. That means
that emitted elements that are not the last value in arrays will never be
used for zipping.

**Example** (Zipping latest values from many streams)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.zipLatestAll(
  Stream.make(1, 2, 3).pipe(Stream.rechunk(1)),
  Stream.make("a", "b", "c").pipe(Stream.rechunk(1)),
  Stream.make(true, false, true).pipe(Stream.rechunk(1))
)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ [ 1, "a", true ], [ 2, "a", true ], [ 3, "a", true ], [ 3, "b", true ], [ 3, "c", true ], [ 3, "c", false ], [ 3, "c", true ] ]
```

**Signature**

```ts
declare const zipLatestAll: <T extends ReadonlyArray<Stream<any, any, any>>>(
  ...streams: T
) => Stream<
  [T[number]] extends [never]
    ? never
    : { [K in keyof T]: T[K] extends Stream<infer A, infer _E, infer _R> ? A : never },
  [T[number]] extends [never] ? never : T[number] extends Stream<infer _A, infer _E, infer _R> ? _E : never,
  [T[number]] extends [never] ? never : T[number] extends Stream<infer _A, infer _E, infer _R> ? _R : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4034)

Since v3.3.0

## zipLatestWith

Combines the latest values from both streams whenever either emits, using
the provided function.

**When to use**

Use when two streams should start emitting custom combined values after both
have produced at least one value.

**Gotchas**

Note: tracking the latest value is done on a per-array basis. That means
that emitted elements that are not the last value in arrays will never be
used for zipping.

**Example** (Zipping latest values with a function)

```ts
import { Console, Effect, Stream } from "effect"

Effect.gen(function* () {
  const result = yield* Stream.make(1, 2, 3).pipe(
    Stream.rechunk(1),
    Stream.zipLatestWith(Stream.make(10, 20).pipe(Stream.rechunk(1)), (n, m) => n + m),
    Stream.runCollect
  )

  yield* Console.log(result)
  // Output: [ 11, 12, 22, 23 ]
})
```

**Signature**

```ts
declare const zipLatestWith: {
  <AR, ER, RR, AL, A>(
    right: Stream<AR, ER, RR>,
    f: (left: AL, right: AR) => A
  ): <EL, RL>(left: Stream<AL, EL, RL>) => Stream<A, EL | ER, RL | RR>
  <AL, EL, RL, AR, ER, RR, A>(
    left: Stream<AL, EL, RL>,
    right: Stream<AR, ER, RR>,
    f: (left: AL, right: AR) => A
  ): Stream<A, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L4160)

Since v2.0.0

## zipLeft

Zips this stream with another point-wise and keeps only the values from
the left stream.

**Details**

The resulting stream ends when either side ends.

**Example** (Zipping streams while keeping left values)

```ts
import { Console, Effect, Stream } from "effect"

const stream1 = Stream.make(1, 2, 3, 4)
const stream2 = Stream.make("a", "b")

const program = Effect.gen(function* () {
  const result = yield* Stream.zipLeft(stream1, stream2).pipe(Stream.runCollect)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [1, 2]
```

**Signature**

```ts
declare const zipLeft: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<AL, ER | EL, RR | RL>
  <AL, EL, RL, AR, ER, RR>(left: Stream<AL, EL, RL>, right: Stream<AR, ER, RR>): Stream<AL, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3724)

Since v2.0.0

## zipRight

Zips this stream with another point-wise, keeping only right values and ending when either stream ends.

**Example** (Zipping streams while keeping right values)

```ts
import { Console, Effect, Stream } from "effect"

const stream1 = Stream.make(1, 2)
const stream2 = Stream.make("a", "b", "c", "d")

const program = Effect.gen(function* () {
  const result = yield* Stream.zipRight(stream1, stream2).pipe(Stream.runCollect)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: ["a", "b"]
```

**Signature**

```ts
declare const zipRight: {
  <AR, ER, RR>(right: Stream<AR, ER, RR>): <AL, EL, RL>(left: Stream<AL, EL, RL>) => Stream<AR, ER | EL, RR | RL>
  <AL, EL, RL, AR, ER, RR>(left: Stream<AL, EL, RL>, right: Stream<AR, ER, RR>): Stream<AR, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3766)

Since v2.0.0

## zipWith

Zips two streams point-wise with a combining function, ending when either stream ends.

**Example** (Zipping streams with a function)

```ts
import { Console, Effect, Stream } from "effect"

const stream1 = Stream.make(1, 2, 3, 4, 5, 6)
const stream2 = Stream.make("a", "b", "c")

const zipped = Stream.zipWith(stream1, stream2, (n, s) => `${n}-${s}`)

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(zipped)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [ "1-a", "2-b", "3-c" ]
```

**Signature**

```ts
declare const zipWith: {
  <AR, ER, RR, AL, A>(
    right: Stream<AR, ER, RR>,
    f: (left: AL, right: AR) => A
  ): <EL, RL>(left: Stream<AL, EL, RL>) => Stream<A, EL | ER, RL | RR>
  <AL, EL, RL, AR, ER, RR, A>(
    left: Stream<AL, EL, RL>,
    right: Stream<AR, ER, RR>,
    f: (left: AL, right: AR) => A
  ): Stream<A, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3514)

Since v2.0.0

## zipWithArray

Zips two streams by applying a function to non-empty arrays of elements.

**Details**

The function returns output plus leftover arrays that carry into the next pull.

**Example** (Zipping stream chunks)

```ts
import { Array, Console, Effect, Stream } from "effect"

const left = Stream.fromArrays([1, 2, 3], [4, 5])
const right = Stream.fromArrays(["a", "b"], ["c", "d", "e"])

const zipped = Stream.zipWithArray(left, right, (leftChunk, rightChunk) => {
  const minLength = Math.min(leftChunk.length, rightChunk.length)
  const output = Array.makeBy(minLength, (i) => [leftChunk[i], rightChunk[i]] as const)

  return [output, leftChunk.slice(minLength), rightChunk.slice(minLength)]
})

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(zipped)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [[1, "a"], [2, "b"], [3, "c"], [4, "d"], [5, "e"]]
```

**Signature**

```ts
declare const zipWithArray: {
  <AR, ER, RR, AL, A>(
    right: Stream<AR, ER, RR>,
    f: (
      left: Arr.NonEmptyReadonlyArray<AL>,
      right: Arr.NonEmptyReadonlyArray<AR>
    ) => readonly [
      output: Arr.NonEmptyReadonlyArray<A>,
      leftoverLeft: ReadonlyArray<AL>,
      leftoverRight: ReadonlyArray<AR>
    ]
  ): <EL, RL>(left: Stream<AL, EL, RL>) => Stream<A, EL | ER, RL | RR>
  <AL, EL, RL, AR, ER, RR, A>(
    left: Stream<AL, EL, RL>,
    right: Stream<AR, ER, RR>,
    f: (
      left: Arr.NonEmptyReadonlyArray<AL>,
      right: Arr.NonEmptyReadonlyArray<AR>
    ) => readonly [
      output: Arr.NonEmptyReadonlyArray<A>,
      leftoverLeft: ReadonlyArray<AL>,
      leftoverRight: ReadonlyArray<AR>
    ]
  ): Stream<A, EL | ER, RL | RR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3581)

Since v4.0.0

## zipWithIndex

Zips this stream together with the index of elements.

**Example** (Zipping elements with indices)

```ts
import { Console, Effect, Stream } from "effect"

const program = Effect.gen(function* () {
  const indexed = yield* Stream.make("a", "b", "c", "d").pipe(Stream.zipWithIndex, Stream.runCollect)
  yield* Console.log(indexed)
})

Effect.runPromise(program)
// Output: [["a", 0], ["b", 1], ["c", 2], ["d", 3]]
```

**Signature**

```ts
declare const zipWithIndex: <A, E, R>(self: Stream<A, E, R>) => Stream<[A, number], E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3856)

Since v2.0.0

## zipWithNext

Zips each element with the next element, pairing the final element with
`Option.none()`.

**Example** (Zipping elements with next values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.zipWithNext(Stream.make(1, 2, 3, 4))

Effect.runPromise(
  Effect.gen(function* () {
    const values = yield* Stream.runCollect(stream)
    yield* Console.log(values)
  })
)
// Output: [
//   [ 1, { _id: 'Option', _tag: 'Some', value: 2 } ],
//   [ 2, { _id: 'Option', _tag: 'Some', value: 3 } ],
//   [ 3, { _id: 'Option', _tag: 'Some', value: 4 } ],
//   [ 4, { _id: 'Option', _tag: 'None' } ]
// ]
```

**Signature**

```ts
declare const zipWithNext: <A, E, R>(self: Stream<A, E, R>) => Stream<[A, Option.Option<A>], E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3884)

Since v2.0.0

## zipWithPrevious

Zips each element with its previous element, starting with `None`.

**Example** (Zipping elements with previous values)

```ts
import { Console, Effect, Stream } from "effect"

const stream = Stream.zipWithPrevious(Stream.make(1, 2, 3, 4))

const program = Effect.gen(function* () {
  const result = yield* Stream.runCollect(stream)
  yield* Console.log(result)
})

Effect.runPromise(program)
// Output: [
//   [ { _id: 'Option', _tag: 'None' }, 1 ],
//   [ { _id: 'Option', _tag: 'Some', value: 1 }, 2 ],
//   [ { _id: 'Option', _tag: 'Some', value: 2 }, 3 ],
//   [ { _id: 'Option', _tag: 'Some', value: 3 }, 4 ]
// ]
```

**Signature**

```ts
declare const zipWithPrevious: <A, E, R>(self: Stream<A, E, R>) => Stream<[Option.Option<A>, A], E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3931)

Since v2.0.0

## zipWithPreviousAndNext

Zips each element with its previous and next values.

**Example** (Zipping elements with neighbors)

```ts
import { Console, Effect, Option, Stream } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Stream.make(1, 2, 3).pipe(Stream.zipWithPreviousAndNext, Stream.runCollect)
  yield* Console.log(values)
})

Effect.runPromise(program)
// Output: [ [Option.none(), 1, Option.some(2)], [Option.some(1), 2, Option.some(3)], [Option.some(2), 3, Option.none()] ]
```

**Signature**

```ts
declare const zipWithPreviousAndNext: <A, E, R>(
  self: Stream<A, E, R>
) => Stream<[Option.Option<A>, A, Option.Option<A>], E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stream.ts#L3965)

Since v2.0.0
