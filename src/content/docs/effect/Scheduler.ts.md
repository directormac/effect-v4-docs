---
title: Scheduler.ts
nav_order: 97
parent: "effect"
---

## Scheduler.ts overview

Controls how runnable Effect fiber tasks are dispatched.

A scheduler decides how tasks are queued, when queued tasks run, and when a
fiber should pause so other work can continue. This module includes the
scheduler service reference, the default `MixedScheduler`, dispatcher types
for queued tasks, and references for tuning or disabling automatic scheduler
yields.

Since v2.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [Scheduler (interface)](#scheduler-interface)
  - [SchedulerDispatcher (interface)](#schedulerdispatcher-interface)
- [references](#references)
  - [MaxOpsBeforeYield](#maxopsbeforeyield)
  - [PreventSchedulerYield](#preventscheduleryield)
  - [Scheduler](#scheduler)
- [schedulers](#schedulers)
  - [MixedScheduler (class)](#mixedscheduler-class)
    - [shouldYield (method)](#shouldyield-method)
    - [makeDispatcher (method)](#makedispatcher-method)
    - [executionMode (property)](#executionmode-property)
    - [setImmediate (property)](#setimmediate-property)

---

# models

## Scheduler (interface)

A scheduler manages the execution of Effect fibers by controlling when queued
tasks run.

**When to use**

Use to define or provide custom runtime scheduling behavior for Effect fibers.

**Details**

A scheduler determines the execution mode, schedules tasks with different
priorities, and decides when fibers should yield control after consuming
their operation budget.

**Signature**

```ts
export interface Scheduler {
  readonly executionMode: "sync" | "async"
  shouldYield(fiber: Fiber.Fiber<unknown, unknown>): boolean
  makeDispatcher(): SchedulerDispatcher
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L32)

Since v2.0.0

## SchedulerDispatcher (interface)

A dispatcher created by a `Scheduler` for enqueuing tasks and forcing queued
tasks to run.

**When to use**

Use when implementing or testing scheduler-created dispatchers that enqueue
prioritized runtime tasks and flush queued work deterministically.

**Details**

`scheduleTask` queues a task with a priority. `flush` drains pending work
synchronously, which is useful when callers need deterministic completion of
already scheduled tasks. Lower priority numbers run first, and equal
priorities run in FIFO order.

**Signature**

```ts
export interface SchedulerDispatcher {
  scheduleTask(task: () => void, priority: number): void
  flush(): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L57)

Since v4.0.0

# references

## MaxOpsBeforeYield

Context reference that controls the maximum number of operations a fiber
can perform before yielding control back to the scheduler.

**When to use**

Use to tune scheduler fairness for CPU-bound fibers by changing the scheduler
operation budget that triggers a yield.

**Details**

The default value is `2048` operations, which balances performance and
fairness by helping prevent long-running fibers from monopolizing the
execution thread.

**See**

- `PreventSchedulerYield` for bypassing scheduler yield checks entirely rather than tuning the operation budget

**Signature**

```ts
declare const MaxOpsBeforeYield: Context.Reference<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L258)

Since v4.0.0

## PreventSchedulerYield

Context reference that controls whether the runtime should bypass scheduler
yield checks. When set to `true`, the fiber run loop won't call
`Scheduler.shouldYield`.

**When to use**

Use to bypass scheduler yield checks for controlled runtime workloads where
cooperative yielding should be disabled.

**Gotchas**

Setting this reference to `true` can let long-running fibers monopolize the
JavaScript thread.

**See**

- `MaxOpsBeforeYield` for tuning yield frequency without disabling yield checks
- `Scheduler` for providing custom scheduler yield behavior

**Signature**

```ts
declare const PreventSchedulerYield: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L283)

Since v4.0.0

## Scheduler

Context reference for the scheduler used by the Effect runtime.

**When to use**

Use when you need to replace scheduling behavior globally in tests or runtime
setup, such as forcing deterministic task dispatch.

**Details**

The default value creates a `MixedScheduler`. Provide this service to
customize execution mode, task dispatching, or yield behavior.

**Signature**

```ts
declare const Scheduler: Context.Reference<Scheduler>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L78)

Since v2.0.0

# schedulers

## MixedScheduler (class)

Provides a scheduler implementation that batches queued tasks and dispatches them by
priority.

**When to use**

Use when you need the default runtime scheduler directly, including a
scheduler that batches queued work by priority and preserves FIFO order within
each priority.

**Details**

`MixedScheduler` supports synchronous and asynchronous execution modes, uses
operation counts to decide when fibers should yield, and is the default
scheduler implementation.

**Signature**

```ts
declare class MixedScheduler {
  constructor(executionMode: "sync" | "async" = "async", setImmediateFn: (f: () => void) => () => void = setImmediate)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L141)

Since v2.0.0

### shouldYield (method)

Returns whether the fiber has reached its operation budget and should yield.

**When to use**

Use to decide whether a fiber should yield after consuming its current
operation budget.

**Signature**

```ts
declare const shouldYield: (fiber: Fiber.Fiber<unknown, unknown>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L163)

Since v2.0.0

### makeDispatcher (method)

Creates a dispatcher that schedules work through this scheduler.

**When to use**

Use when you need a standalone dispatcher from a scheduler instance, for
example in tests that enqueue tasks and then flush them deterministically.

**Signature**

```ts
declare const makeDispatcher: () => MixedSchedulerDispatcher
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L177)

Since v4.0.0

### executionMode (property)

**Signature**

```ts
readonly executionMode: "sync" | "async"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L142)

### setImmediate (property)

**Signature**

```ts
readonly setImmediate: (f: () => void) => () => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scheduler.ts#L143)
