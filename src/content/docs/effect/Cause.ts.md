---
title: Cause.ts
nav_order: 7
parent: "effect"
---

## Cause.ts overview

Records the full reason an `Effect` failed.

A `Cause<E>` can contain typed failures, unexpected defects, interruptions,
and annotations. Keeping those details together lets code inspect or format
failures without first collapsing them to a single error value. This module
includes the `Cause` and `Reason` data types, helpers for building and
checking causes, and small error types used by several Effect APIs.

Since v2.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [interruptors](#interruptors)
- [annotations](#annotations)
  - [InterruptorStackTrace (class)](#interruptorstacktrace-class)
  - [StackTrace (class)](#stacktrace-class)
  - [annotate](#annotate)
  - [annotations](#annotations-1)
  - [reasonAnnotations](#reasonannotations)
- [combining](#combining)
  - [combine](#combine)
- [constructors](#constructors)
  - [AsyncFiberError](#asyncfibererror)
  - [Done](#done)
  - [ExceededCapacityError](#exceededcapacityerror)
  - [IllegalArgumentError](#illegalargumenterror)
  - [NoSuchElementError](#nosuchelementerror)
  - [TimeoutError](#timeouterror)
  - [UnknownError](#unknownerror)
  - [die](#die)
  - [done](#done-1)
  - [empty](#empty)
  - [fail](#fail)
  - [fromReasons](#fromreasons)
  - [interrupt](#interrupt)
  - [makeDieReason](#makediereason)
  - [makeFailReason](#makefailreason)
  - [makeInterruptReason](#makeinterruptreason)
- [destructors](#destructors)
  - [squash](#squash)
- [errors](#errors)
  - [AsyncFiberError (interface)](#asyncfibererror-interface)
  - [Done (interface)](#done-interface)
  - [ExceededCapacityError (interface)](#exceededcapacityerror-interface)
  - [IllegalArgumentError (interface)](#illegalargumenterror-interface)
  - [NoSuchElementError (interface)](#nosuchelementerror-interface)
  - [TimeoutError (interface)](#timeouterror-interface)
  - [UnknownError (interface)](#unknownerror-interface)
  - [YieldableError (interface)](#yieldableerror-interface)
- [filtering](#filtering)
  - [filterInterruptors](#filterinterruptors)
  - [findDefect](#finddefect)
  - [findDie](#finddie)
  - [findError](#finderror)
  - [findErrorOption](#finderroroption)
  - [findFail](#findfail)
  - [findInterrupt](#findinterrupt)
- [guards](#guards)
  - [isAsyncFiberError](#isasyncfibererror)
  - [isCause](#iscause)
  - [isDieReason](#isdiereason)
  - [isDone](#isdone)
  - [isExceededCapacityError](#isexceededcapacityerror)
  - [isFailReason](#isfailreason)
  - [isIllegalArgumentError](#isillegalargumenterror)
  - [isInterruptReason](#isinterruptreason)
  - [isNoSuchElementError](#isnosuchelementerror)
  - [isReason](#isreason)
  - [isTimeoutError](#istimeouterror)
  - [isUnknownError](#isunknownerror)
- [mapping](#mapping)
  - [map](#map)
- [models](#models)
  - [Cause (interface)](#cause-interface)
  - [Die (interface)](#die-interface)
  - [Fail (interface)](#fail-interface)
  - [Interrupt (interface)](#interrupt-interface)
  - [Reason (type alias)](#reason-type-alias)
- [predicates](#predicates)
  - [hasDies](#hasdies)
  - [hasFails](#hasfails)
  - [hasInterrupts](#hasinterrupts)
  - [hasInterruptsOnly](#hasinterruptsonly)
- [rendering](#rendering)
  - [pretty](#pretty)
  - [prettyErrors](#prettyerrors)
- [type IDs](#type-ids)
  - [AsyncFiberErrorTypeId](#asyncfibererrortypeid)
  - [DoneTypeId](#donetypeid)
  - [ExceededCapacityErrorTypeId](#exceededcapacityerrortypeid)
  - [IllegalArgumentErrorTypeId](#illegalargumenterrortypeid)
  - [NoSuchElementErrorTypeId](#nosuchelementerrortypeid)
  - [ReasonTypeId](#reasontypeid)
  - [TimeoutErrorTypeId](#timeouterrortypeid)
  - [TypeId](#typeid)
  - [UnknownErrorTypeId](#unknownerrortypeid)
- [utils](#utils)
  - [Cause (namespace)](#cause-namespace)
    - [ReasonProto (interface)](#reasonproto-interface)
    - [Error (type alias)](#error-type-alias)
  - [Done (namespace)](#done-namespace)
    - [Extract (type alias)](#extract-type-alias)
    - [Only (type alias)](#only-type-alias)
  - [Reason (namespace)](#reason-namespace)
    - [Error (type alias)](#error-type-alias-1)

---

# accessors

## interruptors

Collects the defined fiber IDs from all `Interrupt` reasons in the
cause into a `ReadonlySet`. Interrupt reasons without a `fiberId` are
ignored. Returns an empty set when the cause has no interrupting fiber IDs.

**When to use**

Use when you need interrupting fiber IDs as a set, with absence represented
as an empty set.

**Example** (Collecting interruptors)

```ts
import { Cause } from "effect"

const cause = Cause.combine(Cause.interrupt(1), Cause.interrupt(2))

console.log(Cause.interruptors(cause)) // Set(2) { 1, 2 }
```

**See**

- `filterInterruptors` — `Result`-based variant

**Signature**

```ts
declare const interruptors: <E>(self: Cause<E>) => ReadonlySet<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1031)

Since v2.0.0

# annotations

## InterruptorStackTrace (class)

Context annotation used to store the stack frame captured at the point of
interruption.

**When to use**

Use when you need the stack-frame annotation used by interrupt-only cause
rendering.

**Details**

Similar to `StackTrace` but specific to `Interrupt` reasons.

**See**

- `StackTrace` for stack frames attached to failures
- `reasonAnnotations` for reading annotations from a single reason
- `annotate` for attaching annotations to a cause

**Signature**

```ts
declare class InterruptorStackTrace
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1937)

Since v4.0.0

## StackTrace (class)

Context annotation used to store the stack frame captured at the point of failure.

**When to use**

Use to read the failure stack-frame annotation from a `Reason` when building
diagnostics, logging, or custom cause renderers.

**Details**

The runtime annotates every reason with this when a stack frame is
available. Retrieve it via
`Context.get(Cause.reasonAnnotations(reason), Cause.StackTrace)`.

**See**

- `reasonAnnotations` for reading annotations from a single reason
- `annotations` for reading merged annotations from a cause
- `InterruptorStackTrace` for the interrupt-specific stack-frame annotation

**Signature**

```ts
declare class StackTrace
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1915)

Since v4.0.0

## annotate

Attaches metadata to every reason in a `Cause`.

**When to use**

Use to attach diagnostic metadata to every reason in a cause.

**Details**

Annotations are stored as a `Context` on each reason and can be
retrieved later via `reasonAnnotations` or `annotations`.
The runtime uses this to attach stack traces and spans.

- Returns a new `Cause`.
- By default, existing keys are preserved. Pass `{ overwrite: true }` to
  replace them.

**Example** (Annotating a cause)

```ts
import { Cause, Context } from "effect"

class RequestId extends Context.Service<RequestId, string>()("RequestId") {}

const cause = Cause.fail("error")
const annotated = Cause.annotate(cause, Context.make(RequestId, "req-1"))

console.log(Context.getOrUndefined(Cause.annotations(annotated), RequestId)) // "req-1"
```

**See**

- `annotations` for reading merged annotations from a cause
- `reasonAnnotations` for reading annotations from a single reason

**Signature**

```ts
declare const annotate: {
  (
    annotations: Context.Context<never>,
    options?: { readonly overwrite?: boolean | undefined }
  ): <E>(self: Cause<E>) => Cause<E>
  <E>(
    self: Cause<E>,
    annotations: Context.Context<never>,
    options?: { readonly overwrite?: boolean | undefined }
  ): Cause<E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1820)

Since v4.0.0

## annotations

Reads the merged annotations from all reasons in a `Cause`.

**When to use**

Use to read diagnostic metadata merged from the whole cause.

**Gotchas**

When multiple reasons contain the same annotation key, the value from the
later reason wins.

**Example** (Reading merged annotations)

```ts
import { Cause, Context } from "effect"

class RequestId extends Context.Service<RequestId, string>()("RequestId") {}

const cause = Cause.annotate(Cause.fail("error"), Context.make(RequestId, "req-1"))

console.log(Context.getOrUndefined(Cause.annotations(cause), RequestId)) // "req-1"
```

**See**

- `reasonAnnotations` — annotations from a single reason

**Signature**

```ts
declare const annotations: <E>(self: Cause<E>) => Context.Context<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1892)

Since v4.0.0

## reasonAnnotations

Reads the annotations from a single `Reason` as a `Context`.

**When to use**

Use when you need tracing metadata (e.g. `StackTrace`) from
a specific reason rather than the whole cause.

**Example** (Reading reason annotations)

```ts
import { Cause, Context } from "effect"

class RequestId extends Context.Service<RequestId, string>()("RequestId") {}

const reason = Cause.makeFailReason("error")
const annotated = reason.annotate(Context.make(RequestId, "req-1"))

console.log(Context.getOrUndefined(Cause.reasonAnnotations(annotated), RequestId)) // "req-1"
```

**See**

- `annotations` — merged annotations from all reasons in a cause

**Signature**

```ts
declare const reasonAnnotations: <E>(self: Reason<E>) => Context.Context<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1858)

Since v4.0.0

# combining

## combine

Merges two causes into a single cause whose `reasons` array is the union
of both inputs (de-duplicated by value equality).

**When to use**

Use to merge independent causes into one structured failure value.

**Details**

- Combining with `empty` returns the other cause unchanged.
- If the result is structurally equal to `self`, `self` is returned
  (referential shortcut).

**Example** (Combining two causes)

```ts
import { Cause } from "effect"

const cause1 = Cause.fail("error1")
const cause2 = Cause.fail("error2")
const combined = Cause.combine(cause1, cause2)
console.log(combined.reasons.length) // 2
```

**See**

- `fromReasons` — build a cause from an array of reasons
- `empty` for the identity cause used when combining

**Signature**

```ts
declare const combine: {
  <E2>(that: Cause<E2>): <E>(self: Cause<E>) => Cause<E | E2>
  <E, E2>(self: Cause<E>, that: Cause<E2>): Cause<E | E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L712)

Since v4.0.0

# constructors

## AsyncFiberError

Constructs an `AsyncFiberError` for a fiber that could not be resolved
synchronously.

**When to use**

Use to create the error value for a fiber that could not be completed by a
synchronous runner.

**Example** (Creating an AsyncFiberError)

```ts
import { Cause } from "effect"
import type { Fiber } from "effect"

declare const fiber: Fiber.Fiber<unknown, unknown>

const error = new Cause.AsyncFiberError(fiber)
console.log(error.message) // "An asynchronous Effect was executed with Effect.runSync"
```

**See**

- `isAsyncFiberError` for checking unknown values

**Signature**

```ts
declare const AsyncFiberError: new (fiber: Fiber<unknown, unknown>) => AsyncFiberError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1711)

Since v4.0.0

## Done

Creates a `Done` signal with an optional value.

**When to use**

Use when you need to construct a low-level pull completion signal directly.

**See**

- `done` — create a failing `Effect` with `Done`

**Signature**

```ts
declare const Done: <A = void>(value?: A) => Done<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1376)

Since v4.0.0

## ExceededCapacityError

Constructs an `ExceededCapacityError` with an optional message.

**When to use**

Use to create the error value for bounded-resource capacity failures.

**Example** (Creating an ExceededCapacityError)

```ts
import { Cause } from "effect"

const error = new Cause.ExceededCapacityError("Queue full")
console.log(error.message) // "Queue full"
```

**See**

- `isExceededCapacityError` for checking unknown values

**Signature**

```ts
declare const ExceededCapacityError: new (message?: string) => ExceededCapacityError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1618)

Since v4.0.0

## IllegalArgumentError

Constructs an `IllegalArgumentError` with an optional message.

**Example** (Creating an IllegalArgumentError)

```ts
import { Cause } from "effect"

const error = new Cause.IllegalArgumentError("Invalid argument")
console.log(error.message) // "Invalid argument"
```

**Signature**

```ts
declare const IllegalArgumentError: new (message?: string) => IllegalArgumentError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1539)

Since v4.0.0

## NoSuchElementError

Constructs a `NoSuchElementError` with an optional message.

**When to use**

Use to create the error value for APIs that intentionally fail when an
expected element is absent.

**Example** (Creating a NoSuchElementError)

```ts
import { Cause } from "effect"

const error = new Cause.NoSuchElementError("Element not found")
console.log(error.message) // "Element not found"
```

**See**

- `isNoSuchElementError` for checking unknown values

**Signature**

```ts
declare const NoSuchElementError: new (message?: string) => NoSuchElementError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1274)

Since v4.0.0

## TimeoutError

Constructs a `TimeoutError` with an optional message.

**Example** (Creating a TimeoutError)

```ts
import { Cause } from "effect"

const error = new Cause.TimeoutError("Operation timed out")
console.log(error.message) // "Operation timed out"
```

**Signature**

```ts
declare const TimeoutError: new (message?: string) => TimeoutError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1471)

Since v4.0.0

## UnknownError

Constructs an `UnknownError`. The first argument is the original
cause (stored in `Error.cause`); the second is an optional human-readable
message.

**Example** (Creating an UnknownError)

```ts
import { Cause } from "effect"

const error = new Cause.UnknownError({ raw: true }, "Unexpected value")
console.log(error.message) // "Unexpected value"
```

**Signature**

```ts
declare const UnknownError: new (cause: unknown, message?: string) => UnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1782)

Since v4.0.0

## die

Creates a `Cause` containing a single `Die` reason with the
given defect.

**When to use**

Use to construct a cause from an untyped defect or unexpected thrown value.

**Example** (Creating a die cause)

```ts
import { Cause } from "effect"

const cause = Cause.die("Unexpected")
console.log(cause.reasons.length) // 1
console.log(Cause.isDieReason(cause.reasons[0])) // true
```

**See**

- `fail` — for typed errors
- `interrupt` — for fiber interruptions

**Signature**

```ts
declare const die: (defect: unknown) => Cause<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L516)

Since v2.0.0

## done

Creates an Effect that fails with a `Done` error. Shorthand for
`Effect.fail(Cause.Done(value))`.

**When to use**

Use when you model stream or queue completion through the error channel.

**Example** (Failing with Done)

```ts
import { Cause, Effect } from "effect"

const program = Cause.done("finished")

Effect.runPromiseExit(program).then((exit) => {
  console.log(exit._tag) // "Failure"
})
```

**See**

- `Done` — create the signal value without an Effect

**Signature**

```ts
declare const done: <A = void>(value?: A) => Effect.Effect<never, Done<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1403)

Since v4.0.0

## empty

Represents a `Cause` with an empty `reasons` array.

**When to use**

Use to represent the absence of failure when constructing or combining
causes.

**Details**

Represents the absence of failure. Combining any cause with `empty` via
`combine` returns the original cause unchanged.

**Example** (Combining with the empty cause)

```ts
import { Cause } from "effect"

const cause = Cause.combine(Cause.empty, Cause.fail("boom"))

console.log(cause.reasons.length) // 1
console.log(Cause.hasFails(cause)) // true
```

**See**

- `combine` for merging causes where `empty` acts as the identity

**Signature**

```ts
declare const empty: Cause<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L464)

Since v2.0.0

## fail

Creates a `Cause` containing a single `Fail` reason with the
given typed error.

**When to use**

Use to construct a cause from an expected typed error.

**Example** (Creating a fail cause)

```ts
import { Cause } from "effect"

const cause = Cause.fail("Something went wrong")
console.log(cause.reasons.length) // 1
console.log(Cause.isFailReason(cause.reasons[0])) // true
```

**See**

- `die` — for untyped defects
- `interrupt` — for fiber interruptions

**Signature**

```ts
declare const fail: <E>(error: E) => Cause<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L490)

Since v2.0.0

## fromReasons

Creates a `Cause` from an array of `Reason` values.

**When to use**

Use when you already have individual reasons (e.g. from filtering or
transforming another cause's `reasons` array) and need to wrap them back
into a `Cause`.

**Details**

- Returns a new `Cause`.
- An empty array produces a cause equivalent to `empty`.

**Gotchas**

The `reasons` array is stored as provided. Treat the array as immutable
after passing it to this function.

**Example** (Building a cause from reasons)

```ts
import { Cause } from "effect"

const reasons = [Cause.makeFailReason("err1"), Cause.makeFailReason("err2")]
const cause = Cause.fromReasons(reasons)
console.log(cause.reasons.length) // 2
```

**See**

- `combine` — merge two existing causes

**Signature**

```ts
declare const fromReasons: <E>(reasons: ReadonlyArray<Reason<E>>) => Cause<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L431)

Since v4.0.0

## interrupt

Creates a `Cause` containing a single `Interrupt` reason,
optionally carrying the interrupting fiber's ID.

**Example** (Creating an interrupt cause)

```ts
import { Cause } from "effect"

const cause = Cause.interrupt(123)
console.log(cause.reasons.length) // 1
console.log(Cause.isInterruptReason(cause.reasons[0])) // true
```

**See**

- `fail` — for typed errors
- `die` — for untyped defects

**Signature**

```ts
declare const interrupt: (fiberId?: number | undefined) => Cause<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L538)

Since v2.0.0

## makeDieReason

Creates a standalone `Die` reason (not wrapped in a `Cause`).

**When to use**

Use when constructing a standalone defect reason for `fromReasons` or
direct comparison.

**Example** (Creating a Die reason)

```ts
import { Cause } from "effect"

const reason = Cause.makeDieReason("bug")
console.log(reason._tag) // "Die"
console.log(reason.defect) // "bug"
```

**See**

- `makeFailReason` — create a `Fail` reason
- `makeInterruptReason` — create an `Interrupt` reason

**Signature**

```ts
declare const makeDieReason: (defect: unknown) => Die
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L590)

Since v4.0.0

## makeFailReason

Creates a standalone `Fail` reason (not wrapped in a `Cause`).

**When to use**

Use when constructing a standalone typed failure reason for
`fromReasons` or direct comparison.

**Example** (Creating a Fail reason)

```ts
import { Cause } from "effect"

const reason = Cause.makeFailReason("error")
console.log(reason._tag) // "Fail"
console.log(reason.error) // "error"
```

**See**

- `makeDieReason` — create a `Die` reason
- `makeInterruptReason` — create an `Interrupt` reason

**Signature**

```ts
declare const makeFailReason: <E>(error: E) => Fail<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L564)

Since v4.0.0

## makeInterruptReason

Creates a standalone `Interrupt` reason (not wrapped in a `Cause`),
optionally carrying the interrupting fiber's ID.

**When to use**

Use when constructing a standalone interrupt reason for `fromReasons`
or direct comparison.

**Example** (Creating an Interrupt reason)

```ts
import { Cause } from "effect"

const reason = Cause.makeInterruptReason(42)
console.log(reason._tag) // "Interrupt"
console.log(reason.fiberId) // 42
```

**See**

- `makeFailReason` — create a `Fail` reason
- `makeDieReason` — create a `Die` reason

**Signature**

```ts
declare const makeInterruptReason: (fiberId?: number | undefined) => Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L617)

Since v4.0.0

# destructors

## squash

Collapses a `Cause` into a single `unknown` value, picking the "most
important" failure in this order:

**When to use**

Use to collapse a structured cause to the single value that synchronous and
promise runners would throw.

**Details**

1. First `Fail` error (the `E` value)
2. First `Die` defect
3. A generic `Error("All fibers interrupted without error")` for interrupt-only causes
4. A generic `Error("Empty cause")` for `empty`

This is the function used by `Effect.runPromise` and `Effect.runSync` to
decide what to throw.

**Gotchas**

This function is lossy. Use `prettyErrors` or iterate `cause.reasons`
when you need all failures.

**Example** (Squashing a cause)

```ts
import { Cause } from "effect"

console.log(Cause.squash(Cause.fail("error"))) // "error"
console.log(Cause.squash(Cause.die("defect"))) // "defect"
```

**See**

- `prettyErrors` — non-lossy conversion to `Array<Error>`
- `pretty` — human-readable string rendering

**Signature**

```ts
declare const squash: <E>(self: Cause<E>) => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L756)

Since v2.0.0

# errors

## AsyncFiberError (interface)

An error that occurs when trying to run an async fiber with Effect.runSync.

**When to use**

Use to inspect failures produced when synchronous runners encounter an effect
that cannot complete synchronously.

**Details**

The `fiber` property stores the fiber that could not be synchronously
resolved. This error implements `YieldableError`.

**Example** (Accessing the fiber)

```ts
import { Cause } from "effect"
import type { Fiber } from "effect"

declare const fiber: Fiber.Fiber<unknown, unknown>

const error = new Cause.AsyncFiberError(fiber)
console.log(error._tag) // "AsyncFiberError"
console.log(error.fiber === fiber) // true
```

**Signature**

```ts
export interface AsyncFiberError extends YieldableError {
  readonly [AsyncFiberErrorTypeId]: typeof AsyncFiberErrorTypeId
  readonly _tag: "AsyncFiberError"
  readonly fiber: Fiber<unknown, unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1679)

Since v4.0.0

## Done (interface)

A graceful completion signal for queues and streams.

**When to use**

Use to model normal producer completion through a stream or queue error
channel.

**Details**

`Done` indicates that a producer has finished normally — no more elements
will arrive. It is distinct from an error or interruption; it represents
successful completion. The optional `value` field can carry a final
leftover payload.

**Example** (Signaling queue completion)

```ts
import { Cause, Effect, Queue } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number, Cause.Done>(10)
  yield* Queue.offer(queue, 1)
  yield* Queue.end(queue)

  const result = yield* Effect.flip(Queue.take(queue))
  console.log(Cause.isDone(result)) // true
})
```

**Signature**

```ts
export interface Done<A = void> {
  readonly [DoneTypeId]: typeof DoneTypeId
  readonly _tag: "Done"
  readonly value: A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1334)

Since v4.0.0

## ExceededCapacityError (interface)

An error indicating that a bounded resource (queue, pool, semaphore, etc.)
has exceeded its capacity.

**When to use**

Use to model bounded-resource failures where an operation cannot proceed
because capacity has been exhausted.

**Details**

Implements `YieldableError`.

**Example** (Creating and checking an ExceededCapacityError)

```ts
import { Cause } from "effect"

const error = new Cause.ExceededCapacityError("Queue full")
console.log(error._tag) // "ExceededCapacityError"
console.log(error.message) // "Queue full"
```

**Signature**

```ts
export interface ExceededCapacityError extends YieldableError {
  readonly [ExceededCapacityErrorTypeId]: typeof ExceededCapacityErrorTypeId
  readonly _tag: "ExceededCapacityError"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1592)

Since v4.0.0

## IllegalArgumentError (interface)

An error indicating that a function received an argument that violates
its contract (e.g. negative where positive was expected).

**Details**

Implements `YieldableError`.

**Example** (Creating and checking an IllegalArgumentError)

```ts
import { Cause } from "effect"

const error = new Cause.IllegalArgumentError("Expected positive number")
console.log(error._tag) // "IllegalArgumentError"
console.log(error.message) // "Expected positive number"
```

**Signature**

```ts
export interface IllegalArgumentError extends YieldableError {
  readonly [IllegalArgumentErrorTypeId]: typeof IllegalArgumentErrorTypeId
  readonly _tag: "IllegalArgumentError"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1519)

Since v4.0.0

## NoSuchElementError (interface)

An error indicating that an expected value was absent.

**When to use**

Use to model APIs that intentionally turn absence into an error.

**Details**

Used by APIs that convert absence into an exception or effect failure, such
as `Option.getOrThrow`. Implements `YieldableError` so it can be
yielded directly in `Effect.gen`.

**Gotchas**

Prefer APIs that return `Option` or a typed failure when absence is an
expected case. This error is mainly for APIs that intentionally turn absence
into a thrown value or failed effect.

**Example** (Creating and checking a NoSuchElementError)

```ts
import { Cause } from "effect"

const error = new Cause.NoSuchElementError("Element not found")
console.log(error._tag) // "NoSuchElementError"
console.log(error.message) // "Element not found"
```

**Signature**

```ts
export interface NoSuchElementError extends YieldableError {
  readonly [NoSuchElementErrorTypeId]: typeof NoSuchElementErrorTypeId
  readonly _tag: "NoSuchElementError"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1247)

Since v4.0.0

## TimeoutError (interface)

An error indicating that an operation exceeded its time limit.

**Details**

Produced by `Effect.timeout` and related APIs. Implements
`YieldableError`.

**Example** (Creating and checking a TimeoutError)

```ts
import { Cause } from "effect"

const error = new Cause.TimeoutError("Operation timed out")
console.log(error._tag) // "TimeoutError"
console.log(error.message) // "Operation timed out"
```

**Signature**

```ts
export interface TimeoutError extends YieldableError {
  readonly [TimeoutErrorTypeId]: typeof TimeoutErrorTypeId
  readonly _tag: "TimeoutError"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1451)

Since v4.0.0

## UnknownError (interface)

A wrapper for errors whose type is not statically known.

**Details**

Used when a thrown or rejected value is not represented by a more specific
typed error. The original value is stored in the `cause` property inherited
from `Error`. Implements `YieldableError`.

**Example** (Creating and checking an UnknownError)

```ts
import { Cause } from "effect"

const error = new Cause.UnknownError("original", "Something unknown")
console.log(error._tag) // "UnknownError"
console.log(error.message) // "Something unknown"
```

**Signature**

```ts
export interface UnknownError extends YieldableError {
  readonly [UnknownErrorTypeId]: typeof UnknownErrorTypeId
  readonly _tag: "UnknownError"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1760)

Since v4.0.0

## YieldableError (interface)

Base interface for error classes that can be yielded directly inside
`Effect.gen`. Yielding one of these errors fails the generator with that
error as the typed failure value.

**Details**

All built-in error classes in this module (`NoSuchElementError`,
`TimeoutError`, `IllegalArgumentError`, `ExceededCapacityError`,
`AsyncFiberError`, and `UnknownError`) implement this interface.

**Example** (Yielding an error in Effect.gen)

```ts
import { Cause, Effect } from "effect"

const error = new Cause.NoSuchElementError("not found")

const program = Effect.gen(function* () {
  return yield* error // fails the effect with NoSuchElementError
})
```

**Signature**

```ts
export interface YieldableError extends Error, Pipeable, Inspectable {
  readonly [Effect.TypeId]: Effect.Variance<never, this, never>
  [Symbol.iterator](): Effect.EffectIterator<Effect.Effect<never, this, never>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1185)

Since v2.0.0

# filtering

## filterInterruptors

Returns a `Result` whose success value is the set of defined fiber IDs from
the cause's `Interrupt` reasons. If the cause has no `Interrupt`
reason, the failure value is the original cause.

**When to use**

Use when you need absence of interrupt reasons to fail with the original
cause.

**Gotchas**

Interrupt reasons without a `fiberId` still count as interrupts, so the
function succeeds with an empty `Set` when every interrupt reason has an
undefined fiber ID.

**Example** (Extracting interruptors with Result)

```ts
import { Cause, Result } from "effect"

const result = Cause.filterInterruptors(Cause.interrupt(1))
if (!Result.isFailure(result)) {
  console.log(result.success) // Set(1) { 1 }
}
```

**See**

- `interruptors` — always-succeeding variant

**Signature**

```ts
declare const filterInterruptors: <E>(self: Cause<E>) => Result.Result<Set<number>, Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1065)

Since v4.0.0

## findDefect

Returns a `Result` whose success value is the first defect value from a
`Die` reason in the cause. If the cause has no `Die` reason, the
failure value is the original cause.

**When to use**

Use when you need the first defect value from a `Cause` as a `Result`,
without the full `Die` reason.

**Example** (Extracting the first defect)

```ts
import { Cause, Result } from "effect"

const result = Cause.findDefect(Cause.die("defect"))
if (!Result.isFailure(result)) {
  console.log(result.success) // "defect"
}
```

**See**

- `findDie` — extract the full `Die` reason
- `findError` — extract the first typed error

**Signature**

```ts
declare const findDefect: <E>(self: Cause<E>) => Result.Result<unknown, Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L952)

Since v4.0.0

## findDie

Returns a `Result` whose success value is the first `Die` reason in
the cause, including its annotations. If the cause has no `Die` reason, the
failure value is the original cause.

**When to use**

Use when you need the full `Die` reason from a `Cause`, including
annotations.

**Example** (Extracting the first Die reason)

```ts
import { Cause, Result } from "effect"

const result = Cause.findDie(Cause.die("defect"))
if (!Result.isFailure(result)) {
  console.log(result.success.defect) // "defect"
}
```

**See**

- `findDefect` — extract the unwrapped defect value
- `findFail` — extract the first `Fail` reason

**Signature**

```ts
declare const findDie: <E>(self: Cause<E>) => Result.Result<Die, Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L923)

Since v4.0.0

## findError

Returns a `Result` whose success value is the first typed error value `E`
from a `Fail` reason in the cause. If the cause has no `Fail` reason,
the failure value is the original cause narrowed to `Cause<never>`, because
it contains no typed error reasons.

**When to use**

Use when you need the first typed error value from a `Cause` as a `Result`
that preserves the original cause when no match is found.

**Example** (Extracting the first error value)

```ts
import { Cause, Result } from "effect"

const result = Cause.findError(Cause.fail("error"))
if (!Result.isFailure(result)) {
  console.log(result.success) // "error"
}
```

**See**

- `findFail` — extract the full `Fail` reason
- `findErrorOption` — `Option`-based variant

**Signature**

```ts
declare const findError: <E>(self: Cause<E>) => Result.Result<E, Cause<never>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L841)

Since v4.0.0

## findErrorOption

Returns the first typed error value `E` from a cause wrapped in
`Option.some`, or `Option.none` if no `Fail` reason exists.

**When to use**

Use when you need the first typed error value from a `Cause` as an `Option`,
discarding the original cause.

**Example** (Extracting an error as Option)

```ts
import { Cause, Option } from "effect"

const some = Cause.findErrorOption(Cause.fail("error"))
console.log(Option.isSome(some)) // true

const none = Cause.findErrorOption(Cause.die("defect"))
console.log(Option.isNone(none)) // true
```

**See**

- `findError` — `Result`-based variant

**Signature**

```ts
declare const findErrorOption: <E>(input: Cause<E>) => Option<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L869)

Since v4.0.0

## findFail

Returns a `Result` whose success value is the first `Fail` reason in
the cause, including its annotations. If the cause has no `Fail` reason, the
failure value is the original cause narrowed to `Cause<never>`, because it
contains no typed error reasons.

**When to use**

Use when you need the full `Fail` reason from a `Cause`, including
annotations.

**Example** (Extracting the first Fail reason)

```ts
import { Cause, Result } from "effect"

const result = Cause.findFail(Cause.fail("error"))
if (!Result.isFailure(result)) {
  console.log(result.success.error) // "error"
}
```

**See**

- `findError` — extract the unwrapped `E` value
- `findDie` — extract the first `Die` reason

**Signature**

```ts
declare const findFail: <E>(self: Cause<E>) => Result.Result<Fail<E>, Cause<never>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L811)

Since v4.0.0

## findInterrupt

Returns a `Result` whose success value is the first `Interrupt` reason
in the cause, including its annotations. If the cause has no `Interrupt`
reason, the failure value is the original cause.

**When to use**

Use when you need the first `Interrupt` reason from a `Cause`, including the
fiber ID and annotations.

**Example** (Extracting the first interrupt)

```ts
import { Cause, Result } from "effect"

const result = Cause.findInterrupt(Cause.interrupt(42))
if (!Result.isFailure(result)) {
  console.log(result.success.fiberId) // 42
}
```

**See**

- `interruptors` — collect all interrupting fiber IDs as a `Set`

**Signature**

```ts
declare const findInterrupt: <E>(self: Cause<E>) => Result.Result<Interrupt, Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1001)

Since v4.0.0

# guards

## isAsyncFiberError

Checks whether an arbitrary value is an `AsyncFiberError`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"
import type { Fiber } from "effect"

declare const fiber: Fiber.Fiber<unknown, unknown>

const error = new Cause.AsyncFiberError(fiber)
console.log(Cause.isAsyncFiberError(error)) // true
console.log(Cause.isAsyncFiberError("nope")) // false
```

**Signature**

```ts
declare const isAsyncFiberError: (u: unknown) => u is AsyncFiberError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1648)

Since v4.0.0

## isCause

Checks whether an arbitrary value is a `Cause`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isCause(Cause.fail("error"))) // true
console.log(Cause.isCause("not a cause")) // false
```

**Signature**

```ts
declare const isCause: (self: unknown) => self is Cause<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L97)

Since v2.0.0

## isDieReason

Narrows a `Reason` to `Die`.

**When to use**

Use as a predicate for `Array.filter` to pick out `Die` (defect) reasons when
iterating over `cause.reasons`.

**Example** (Filtering die reasons)

```ts
import { Cause } from "effect"

const cause = Cause.die("defect")
const dies = cause.reasons.filter(Cause.isDieReason)
console.log(dies[0].defect) // "defect"
```

**See**

- `isFailReason` — narrow to `Fail`
- `isInterruptReason` — narrow to `Interrupt`

**Signature**

```ts
declare const isDieReason: <E>(self: Reason<E>) => self is Die
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L198)

Since v4.0.0

## isDone

Checks whether an arbitrary value is a `Done` signal.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isDone(Cause.Done())) // true
console.log(Cause.isDone("not done")) // false
```

**Signature**

```ts
declare const isDone: (u: unknown) => u is Done<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1291)

Since v4.0.0

## isExceededCapacityError

Checks whether an arbitrary value is an `ExceededCapacityError`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isExceededCapacityError(new Cause.ExceededCapacityError())) // true
console.log(Cause.isExceededCapacityError("nope")) // false
```

**Signature**

```ts
declare const isExceededCapacityError: (u: unknown) => u is ExceededCapacityError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1556)

Since v4.0.0

## isFailReason

Narrows a `Reason` to `Fail`.

**When to use**

Use as a predicate for `Array.filter` to pick out typed `Fail` reasons when
iterating over `cause.reasons`.

**Example** (Filtering fail reasons)

```ts
import { Cause } from "effect"

const cause = Cause.fail("error")
const fails = cause.reasons.filter(Cause.isFailReason)
console.log(fails[0].error) // "error"
```

**See**

- `isDieReason` — narrow to `Die`
- `isInterruptReason` — narrow to `Interrupt`

**Signature**

```ts
declare const isFailReason: <E>(self: Reason<E>) => self is Fail<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L172)

Since v4.0.0

## isIllegalArgumentError

Checks whether an arbitrary value is an `IllegalArgumentError`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isIllegalArgumentError(new Cause.IllegalArgumentError())) // true
console.log(Cause.isIllegalArgumentError("nope")) // false
```

**Signature**

```ts
declare const isIllegalArgumentError: (u: unknown) => u is IllegalArgumentError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1496)

Since v4.0.0

## isInterruptReason

Narrows a `Reason` to `Interrupt`.

**When to use**

Use as a predicate for `Array.filter` to pick out `Interrupt` reasons when
iterating over `cause.reasons`.

**Example** (Filtering interrupt reasons)

```ts
import { Cause } from "effect"

const cause = Cause.interrupt(123)
const interrupts = cause.reasons.filter(Cause.isInterruptReason)
console.log(interrupts[0].fiberId) // 123
```

**See**

- `isFailReason` — narrow to `Fail`
- `isDieReason` — narrow to `Die`

**Signature**

```ts
declare const isInterruptReason: <E>(self: Reason<E>) => self is Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L224)

Since v4.0.0

## isNoSuchElementError

Checks whether an arbitrary value is a `NoSuchElementError`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isNoSuchElementError(new Cause.NoSuchElementError())) // true
console.log(Cause.isNoSuchElementError("nope")) // false
```

**Signature**

```ts
declare const isNoSuchElementError: (u: unknown) => u is NoSuchElementError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1205)

Since v4.0.0

## isReason

Checks whether an arbitrary value is a `Reason` (`Fail`, `Die`, or `Interrupt`).

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

const reason = Cause.fail("error").reasons[0]
console.log(Cause.isReason(reason)) // true
console.log(Cause.isReason("not a reason")) // false
```

**Signature**

```ts
declare const isReason: (self: unknown) => self is Reason<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L115)

Since v4.0.0

## isTimeoutError

Checks whether an arbitrary value is a `TimeoutError`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isTimeoutError(new Cause.TimeoutError())) // true
console.log(Cause.isTimeoutError("nope")) // false
```

**Signature**

```ts
declare const isTimeoutError: (u: unknown) => u is TimeoutError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1428)

Since v4.0.0

## isUnknownError

Checks whether an arbitrary value is an `UnknownError`.

**Example** (Checking the runtime type)

```ts
import { Cause } from "effect"

console.log(Cause.isUnknownError(new Cause.UnknownError("x"))) // true
console.log(Cause.isUnknownError("nope")) // false
```

**Signature**

```ts
declare const isUnknownError: (u: unknown) => u is UnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1736)

Since v4.0.0

# mapping

## map

Transforms the typed error values inside a `Cause` using the
provided function. Only `Fail` reasons are affected; `Die` and `Interrupt`
reasons pass through unchanged.

**When to use**

Use to transform expected typed failures while preserving defects and
interruptions unchanged.

**Details**

If at least one `Fail` reason exists, this returns a new `Cause`
containing the mapped failures. If the cause has no `Fail` reasons, the
original cause is returned unchanged.

**Example** (Mapping errors to uppercase)

```ts
import { Cause } from "effect"

const cause = Cause.fail("error")
const mapped = Cause.map(cause, (e) => e.toUpperCase())
const reason = mapped.reasons[0]
if (Cause.isFailReason(reason)) {
  console.log(reason.error) // "ERROR"
}
```

**Signature**

```ts
declare const map: {
  <E, E2>(f: (error: Types.NoInfer<E>) => E2): (self: Cause<E>) => Cause<E2>
  <E, E2>(self: Cause<E>, f: (error: Types.NoInfer<E>) => E2): Cause<E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L676)

Since v2.0.0

# models

## Cause (interface)

A structured representation of how an Effect failed.

**When to use**

Use to preserve the full structured failure information for an effect instead
of collapsing it to a single error value.

**Details**

Access the individual failure entries through the `reasons` array, then
narrow each entry with `isFailReason`, `isDieReason`, or
`isInterruptReason`.

- Use `hasFails` / `hasDies` / `hasInterrupts` to test
  for the presence of specific reason kinds without iterating.
- Use `findError` / `findDefect` to extract the first value
  of a given kind.
- Use `combine` to merge two causes.

`Cause` implements `Equal` — two causes with the same reasons (by value)
compare as equal.

**Example** (Creating and inspecting a cause)

```ts
import { Cause } from "effect"

const cause = Cause.fail("Something went wrong")
console.log(cause.reasons.length) // 1
console.log(Cause.isFailReason(cause.reasons[0])) // true
```

**Signature**

```ts
export interface Cause<out E> extends Pipeable, Inspectable, Equal {
  readonly [TypeId]: typeof TypeId
  readonly reasons: ReadonlyArray<Reason<E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L77)

Since v2.0.0

## Die (interface)

An untyped defect — typically a programming error or an uncaught exception.

**When to use**

Use when inspecting `Cause` reasons that represent defects instead of typed
failures or interruptions.

**Details**

The `defect` property is `unknown` because defects are not part of the
typed error channel. Use `isDieReason` to narrow a `Reason`
to this type.

**Example** (Accessing the defect)

```ts
import { Cause } from "effect"

const cause = Cause.die("Unexpected")
const reason = cause.reasons[0]
if (Cause.isDieReason(reason)) {
  console.log(reason.defect) // "Unexpected"
}
```

**See**

- `die` for constructing a cause with a single `Die` reason
- `isDieReason` for narrowing a `Reason` to `Die`

**Signature**

```ts
export interface Die extends Cause.ReasonProto<"Die"> {
  readonly defect: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L328)

Since v2.0.0

## Fail (interface)

A typed, expected error produced by `Effect.fail`.

**When to use**

Use when inspecting `Cause` reasons that represent expected failures from the
typed error channel.

**Details**

The `error` property carries the typed value `E`. Use `isFailReason`
to narrow a `Reason` to this type.

**Example** (Accessing the error)

```ts
import { Cause } from "effect"

const cause = Cause.fail("Something went wrong")
const reason = cause.reasons[0]
if (Cause.isFailReason(reason)) {
  console.log(reason.error) // "Something went wrong"
}
```

**See**

- `fail` for constructing a cause with a single `Fail` reason
- `isFailReason` for narrowing a `Reason` to `Fail`

**Signature**

```ts
export interface Fail<out E> extends Cause.ReasonProto<"Fail"> {
  readonly error: E
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L363)

Since v2.0.0

## Interrupt (interface)

A fiber interruption signal, optionally carrying the ID of the fiber that
initiated the interruption.

**Details**

Use `isInterruptReason` to narrow a `Reason` to this type.

**Example** (Accessing the fiber ID)

```ts
import { Cause } from "effect"

const cause = Cause.interrupt(123)
const reason = cause.reasons[0]
if (Cause.isInterruptReason(reason)) {
  console.log(reason.fiberId) // 123
}
```

**Signature**

```ts
export interface Interrupt extends Cause.ReasonProto<"Interrupt"> {
  readonly fiberId: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L390)

Since v2.0.0

## Reason (type alias)

A single entry inside a `Cause`'s `reasons` array.

**Details**

Narrow to a concrete type with `isFailReason`, `isDieReason`,
or `isInterruptReason`.

- `Fail<E>` — typed error, access via `.error`
- `Die` — untyped defect, access via `.defect`
- `Interrupt` — fiber interruption, access via `.fiberId`

Every reason carries an `annotations` map and an `annotate` method for
attaching tracing metadata.

**Example** (Narrowing a reason)

```ts
import { Cause } from "effect"

const reason = Cause.fail("error").reasons[0]
if (Cause.isFailReason(reason)) {
  console.log(reason.error) // "error"
}
```

**Signature**

```ts
type Reason<E> = Fail<E> | Die | Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L146)

Since v4.0.0

# predicates

## hasDies

Returns `true` if the cause contains at least one `Die` reason.

**When to use**

Use to check whether a cause includes defects before extracting or rendering
them.

**Example** (Checking for defects)

```ts
import { Cause } from "effect"

console.log(Cause.hasDies(Cause.die("defect"))) // true
console.log(Cause.hasDies(Cause.fail("error"))) // false
```

**See**

- `hasFails` — check for typed errors
- `hasInterrupts` — check for interruptions

**Signature**

```ts
declare const hasDies: <E>(self: Cause<E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L894)

Since v4.0.0

## hasFails

Returns `true` if the cause contains at least one `Fail` reason.

**When to use**

Use to check whether a cause includes typed failures before extracting,
mapping, or rendering them.

**Example** (Checking for typed errors)

```ts
import { Cause } from "effect"

console.log(Cause.hasFails(Cause.fail("error"))) // true
console.log(Cause.hasFails(Cause.die("defect"))) // false
```

**See**

- `hasDies` — check for defects
- `hasInterrupts` — check for interruptions

**Signature**

```ts
declare const hasFails: <E>(self: Cause<E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L781)

Since v4.0.0

## hasInterrupts

Returns `true` if the cause contains at least one `Interrupt` reason.

**Example** (Checking for interruptions)

```ts
import { Cause } from "effect"

console.log(Cause.hasInterrupts(Cause.interrupt(123))) // true
console.log(Cause.hasInterrupts(Cause.fail("error"))) // false
```

**See**

- `hasInterruptsOnly` — `true` only when _all_ reasons are interrupts
- `hasFails` — check for typed errors
- `hasDies` — check for defects

**Signature**

```ts
declare const hasInterrupts: <E>(self: Cause<E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L973)

Since v4.0.0

## hasInterruptsOnly

Returns `true` if every reason in the cause is an `Interrupt` (and
there is at least one reason).

**When to use**

Use when you need to detect failures caused only by interruption.

**Example** (Checking interrupt-only causes)

```ts
import { Cause } from "effect"

console.log(Cause.hasInterruptsOnly(Cause.interrupt(123))) // true
console.log(Cause.hasInterruptsOnly(Cause.fail("error"))) // false
console.log(Cause.hasInterruptsOnly(Cause.empty)) // false
```

**See**

- `hasInterrupts` — `true` if the cause contains _any_ interrupts

**Signature**

```ts
declare const hasInterruptsOnly: <E>(self: Cause<E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L642)

Since v4.0.0

# rendering

## pretty

Formats a `Cause` as a human-readable string for logging or debugging.

**When to use**

Use to render a whole cause as one human-readable string for logs or
diagnostics.

**Details**

Delegates to `prettyErrors` to convert each reason to an `Error`,
then joins their stack traces with newlines. Nested `Error.cause` chains
are rendered inline with indentation:

```text
ErrorName: message
    at ...
    at ... {
  [cause]: NestedError: message
      at ...
}
```

Span annotations are appended to the relevant stack frames when available.

**Gotchas**

Rendering an empty cause produces an empty string because there are no
errors to render.

**Example** (Rendering a cause)

```ts
import { Cause } from "effect"

const rendered = Cause.pretty(Cause.fail("something went wrong"))
console.log(rendered.includes("something went wrong")) // true
```

**See**

- `prettyErrors` — get the individual `Error` instances

**Signature**

```ts
declare const pretty: <E>(cause: Cause<E>) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1157)

Since v2.0.0

## prettyErrors

Converts a `Cause` into an `Array<Error>` suitable for logging or
rethrowing.

**When to use**

Use to convert every renderable failure in a cause into individual `Error`
values before logging or rethrowing.

**Details**

Each `Fail` and `Die` reason is converted into a standard
`Error`:

- **Objects / Error instances** — `message`, `name`, `stack`, and `cause`
  are preserved. Extra enumerable properties are copied. Stack traces are
  cleaned up and enriched with span annotations when available.
- **Strings** — used directly as the `Error` message.
- **Other primitives** (`null`, `undefined`, numbers, …) — wrapped in an
  `Error` with message `"Unknown error: <value>"`.

`Interrupt` reasons are collected separately. If the cause contains
**only** interrupts (no `Fail` or `Die`), a single `InterruptError` is
returned whose `cause` lists the interrupting fiber IDs.

An empty cause returns an empty array.

**Example** (Converting a cause to errors)

```ts
import { Cause } from "effect"

const cause = Cause.fail(new Error("boom"))
const errors = Cause.prettyErrors(cause)
console.log(errors[0].message) // "boom"
```

**See**

- `pretty` — renders the cause as a single string
- `squash` — lossy collapse to a single thrown value

**Signature**

```ts
declare const prettyErrors: <E>(self: Cause<E>) => Array<Error>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1111)

Since v3.2.0

# type IDs

## AsyncFiberErrorTypeId

Unique brand present on `AsyncFiberError` values and used by
`isAsyncFiberError` for runtime checks.

**Signature**

```ts
declare const AsyncFiberErrorTypeId: "~effect/Cause/AsyncFiberError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1627)

Since v4.0.0

## DoneTypeId

Unique brand for `Done` values.

**Signature**

```ts
declare const DoneTypeId: "~effect/Cause/Done"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1299)

Since v4.0.0

## ExceededCapacityErrorTypeId

Unique brand for `ExceededCapacityError`.

**Signature**

```ts
declare const ExceededCapacityErrorTypeId: "~effect/Cause/ExceededCapacityError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1564)

Since v4.0.0

## IllegalArgumentErrorTypeId

Unique brand for `IllegalArgumentError`.

**Signature**

```ts
declare const IllegalArgumentErrorTypeId: "~effect/Cause/IllegalArgumentError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1479)

Since v4.0.0

## NoSuchElementErrorTypeId

Unique brand for `NoSuchElementError`.

**Signature**

```ts
declare const NoSuchElementErrorTypeId: "~effect/Cause/NoSuchElementError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1213)

Since v4.0.0

## ReasonTypeId

Unique brand for `Reason` values, used for runtime type checks via `isReason`.

**Signature**

```ts
declare const ReasonTypeId: "~effect/Cause/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L39)

Since v4.0.0

## TimeoutErrorTypeId

Unique brand for `TimeoutError`.

**Signature**

```ts
declare const TimeoutErrorTypeId: "~effect/Cause/TimeoutError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1411)

Since v4.0.0

## TypeId

Unique brand for `Cause` values, used for runtime type checks via `isCause`.

**Signature**

```ts
declare const TypeId: "~effect/Cause"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L31)

Since v4.0.0

## UnknownErrorTypeId

Unique brand for `UnknownError`.

**Signature**

```ts
declare const UnknownErrorTypeId: "~effect/Cause/UnknownError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1719)

Since v4.0.0

# utils

## Cause (namespace)

Companion namespace for the `Cause` interface.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L231)

Since v2.0.0

### ReasonProto (interface)

Base interface shared by all reason types (`Fail`, `Die`, `Interrupt`).

**Details**

Every reason carries:

- `_tag` — discriminant string (`"Fail"`, `"Die"`, or `"Interrupt"`)
- `annotations` — tracing metadata attached by the runtime
- `annotate()` — returns a copy with additional annotations

**Signature**

```ts
export interface ReasonProto<Tag extends string> extends Inspectable, Equal {
  readonly [ReasonTypeId]: typeof ReasonTypeId
  readonly _tag: Tag
  readonly annotations: ReadonlyMap<string, unknown>
  annotate(
    annotations: Context.Context<never> | ReadonlyMap<string, unknown>,
    options?: {
      readonly overwrite?: boolean | undefined
    }
  ): this
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L262)

Since v4.0.0

### Error (type alias)

Extracts the error type `E` from a `Cause<E>`.

**Example** (Extracting the error type)

```ts
import type { Cause } from "effect"

// string
type E = Cause.Cause.Error<Cause.Cause<string>>
```

**Signature**

```ts
type Error<T> = T extends Cause<infer E> ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L247)

Since v4.0.0

## Done (namespace)

Companion namespace for the `Done` interface.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1345)

Since v4.0.0

### Extract (type alias)

Extracts the value type `A` from a `Done<A>` that may be nested in an
error union.

**Signature**

```ts
type Extract<E> = E extends Done<infer L> ? L : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1353)

Since v4.0.0

### Only (type alias)

Filters a type union to only keep `Done` members.

**Signature**

```ts
type Only<E> = E extends Done<infer L> ? Done<L> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L1361)

Since v4.0.0

## Reason (namespace)

Companion namespace for the `Reason` type.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L277)

Since v4.0.0

### Error (type alias)

Extracts the error type `E` from a `Reason<E>`.

**Example** (Extracting the error type)

```ts
import type { Cause } from "effect"

// string
type E = Cause.Reason.Error<Cause.Reason<string>>
```

**Signature**

```ts
type Error<T> = T extends Reason<infer E> ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cause.ts#L293)

Since v4.0.0
