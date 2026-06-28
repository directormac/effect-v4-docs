---
title: DurableClock.ts
nav_order: 346
parent: "effect"
---

## DurableClock.ts overview

Durable timers for workflow sleeps.

`make` creates a `DurableClock` with a name, duration, and deferred wake-up
signal. `sleep` ignores zero durations, runs short sleeps through an
in-memory activity, and schedules longer sleeps through the `WorkflowEngine`
before awaiting the durable deferred tied to the clock.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [DurableClock (interface)](#durableclock-interface)
- [sleeping](#sleeping)
  - [sleep](#sleep)

---

# constructors

## make

Creates a durable clock definition and its associated deferred wake-up
signal.

**Signature**

```ts
declare const make: (options: { readonly name: string; readonly duration: Duration.Input }) => DurableClock
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableClock.ts#L42)

Since v4.0.0

# models

## DurableClock (interface)

Represents a durable workflow timer with a name, duration, and deferred
completed when the timer wakes.

**Signature**

```ts
export interface DurableClock {
  readonly [TypeId]: typeof TypeId
  readonly name: string
  readonly duration: Duration.Duration
  readonly deferred: DurableDeferred.DurableDeferred<typeof Schema.Void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableClock.ts#L28)

Since v4.0.0

# sleeping

## sleep

Waits inside a workflow, using an in-memory activity for durations at or
below the threshold and scheduling a durable clock for longer durations.

**Signature**

```ts
declare const sleep: (options: {
  readonly name: string
  readonly duration: Duration.Input
  readonly inMemoryThreshold?: Duration.Input | undefined
}) => Effect.Effect<void, never, WorkflowEngine | WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableClock.ts#L70)

Since v4.0.0
