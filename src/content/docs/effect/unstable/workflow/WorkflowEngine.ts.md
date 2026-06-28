---
title: WorkflowEngine.ts
nav_order: 351
parent: "effect"
---

## WorkflowEngine.ts overview

Defines workflow engine services and an in-memory implementation.

`WorkflowEngine` registers workflow handlers, runs executions, polls results,
resumes suspended runs, executes activities, stores durable deferred results,
and schedules durable clocks. `WorkflowInstance` holds the runtime state for
one workflow run. The in-memory layer is useful for tests and local
development.

Since v4.0.0

---

## Exports Grouped by Category

- [Encoded](#encoded)
  - [Encoded (interface)](#encoded-interface)
- [constructors](#constructors)
  - [makeUnsafe](#makeunsafe)
- [layers](#layers)
  - [layerMemory](#layermemory)
- [services](#services)
  - [WorkflowEngine (class)](#workflowengine-class)
  - [WorkflowInstance (class)](#workflowinstance-class)
    - [initial (static method)](#initial-static-method)

---

# Encoded

## Encoded (interface)

Low-level workflow engine contract that works with encoded payloads and
results before `makeUnsafe` adds typed schema decoding and encoding.

**Signature**

```ts
export interface Encoded {
  readonly register: (
    workflow: Workflow.Any,
    execute: (
      payload: object,
      executionId: string
    ) => Effect.Effect<unknown, unknown, WorkflowInstance | WorkflowEngine>
  ) => Effect.Effect<void, never, Scope.Scope>
  readonly execute: <const Discard extends boolean>(
    workflow: Workflow.Any,
    options: {
      readonly executionId: string
      readonly payload: object
      readonly discard: Discard
      readonly parent?: WorkflowInstance["Service"] | undefined
    }
  ) => Effect.Effect<Discard extends true ? void : Workflow.Result<unknown, unknown>>
  readonly poll: (
    workflow: Workflow.Any,
    executionId: string
  ) => Effect.Effect<Option.Option<Workflow.Result<unknown, unknown>>>
  readonly interrupt: (workflow: Workflow.Any, executionId: string) => Effect.Effect<void>
  readonly interruptUnsafe: (workflow: Workflow.Any, executionId: string) => Effect.Effect<void>
  readonly resume: (workflow: Workflow.Any, executionId: string) => Effect.Effect<void>
  readonly activityExecute: (
    activity: Activity.Any,
    attempt: number
  ) => Effect.Effect<Workflow.Result<unknown, unknown>, never, WorkflowInstance>
  readonly deferredResult: (
    deferred: DurableDeferred.Any
  ) => Effect.Effect<Option.Option<Exit.Exit<unknown, unknown>>, never, WorkflowInstance>
  readonly deferredDone: (options: {
    readonly workflowName: string
    readonly executionId: string
    readonly deferredName: string
    readonly exit: Exit.Exit<unknown, unknown>
  }) => Effect.Effect<void>
  readonly scheduleClock: (
    workflow: Workflow.Any,
    options: {
      readonly executionId: string
      readonly clock: DurableClock
    }
  ) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowEngine.ts#L296)

Since v4.0.0

# constructors

## makeUnsafe

Builds a typed `WorkflowEngine` service from a low-level encoded
implementation.

**When to use**

Use when wiring a trusted low-level workflow engine implementation into the
typed `WorkflowEngine` service.

**Gotchas**

The implementation must correctly persist, resume, and encode workflow state.

**Signature**

```ts
declare const makeUnsafe: (options: Encoded) => WorkflowEngine["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowEngine.ts#L377)

Since v4.0.0

# layers

## layerMemory

Layer that provides an in-memory `WorkflowEngine`.

**When to use**

Use to run tests and local development workflows where durability is not
needed.

**Gotchas**

This layer keeps state only in memory and is not suitable for production
workflows that require durability.

**Signature**

```ts
declare const layerMemory: Layer.Layer<WorkflowEngine, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowEngine.ts#L575)

Since v4.0.0

# services

## WorkflowEngine (class)

Service that represents workflow runtimes, responsible for registering and
executing workflows and coordinating activities, durable deferreds,
interrupts, resumes, and clocks.

**Signature**

```ts
declare class WorkflowEngine
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowEngine.ts#L37)

Since v4.0.0

## WorkflowInstance (class)

Service that contains workflow runtime state for one execution.

**When to use**

Use to read or update workflow execution, suspension, interruption,
lifetime, failure, and activity coordination state inside workflow engine
internals.

**Details**

The service stores the execution ID, workflow definition, long-lived scope,
suspension and interruption flags, the stored failure cause, and activity
coordination state for a single workflow run.

**Signature**

```ts
declare class WorkflowInstance
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowEngine.ts#L228)

Since v4.0.0

### initial (static method)

**Signature**

```ts
declare const initial: (workflow: Workflow.Any, executionId: string) => WorkflowInstance["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowEngine.ts#L270)
