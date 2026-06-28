---
title: Workflow.ts
nav_order: 350
parent: "effect"
---

## Workflow.ts overview

Defines typed durable workflows.

A `Workflow` has a stable tag, schemas for payload, success, and failure, and
an idempotency key used to derive execution ids. Workflow definitions can be
executed, discarded, polled, interrupted, resumed, and registered with a
handler layer. This module also includes workflow result types, compensation
and cleanup helpers, suspension support, and settings for defect capture or
failure suspension.

Since v4.0.0

---

## Exports Grouped by Category

- [Compensation](#compensation)
  - [withCompensation](#withcompensation)
- [annotations](#annotations)
  - [CaptureDefects](#capturedefects)
  - [SuspendOnFailure](#suspendonfailure)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (interface)](#anywithprops-interface)
  - [Execution (interface)](#execution-interface)
  - [PayloadSchema (type alias)](#payloadschema-type-alias)
  - [RequirementsClient (type alias)](#requirementsclient-type-alias)
  - [RequirementsHandler (type alias)](#requirementshandler-type-alias)
  - [Workflow (interface)](#workflow-interface)
- [resource management](#resource-management)
  - [addFinalizer](#addfinalizer)
  - [provideScope](#providescope)
  - [scope](#scope)
- [results](#results)
  - [Complete (class)](#complete-class)
    - [Schema (static method)](#schema-static-method)
    - [[ResultTypeId] (property)](#resulttypeid-property)
  - [CompleteEncoded (interface)](#completeencoded-interface)
  - [Result](#result)
  - [Result (type alias)](#result-type-alias)
  - [ResultEncoded](#resultencoded)
  - [ResultEncoded (type alias)](#resultencoded-type-alias)
  - [Suspended (class)](#suspended-class)
    - [[ResultTypeId] (property)](#resulttypeid-property-1)
  - [intoResult](#intoresult)
  - [isResult](#isresult)
  - [suspend](#suspend)
  - [wrapActivityResult](#wrapactivityresult)
- [schemas](#schemas)
  - [AnyStructSchema (interface)](#anystructschema-interface)
  - [CompleteSchema (interface)](#completeschema-interface)

---

# Compensation

## withCompensation

Adds compensation logic to an effect inside a Workflow.

**When to use**

Use when a top-level workflow step needs compensating cleanup if the overall
workflow later fails after the step succeeds.

**Details**

The compensation finalizer is called if the entire workflow fails, allowing you to perform cleanup or other actions based on the success value and the cause of the workflow failure.

**Gotchas**

Compensation finalizers are only registered for top-level effects in the workflow and do not work for nested activities.

**Signature**

```ts
declare const withCompensation: {
  <A, R2>(
    compensation: (value: A, cause: Cause.Cause<unknown>) => Effect.Effect<void, never, R2>
  ): <E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R | R2 | WorkflowInstance | Scope.Scope>
  <A, E, R, R2>(
    effect: Effect.Effect<A, E, R>,
    compensation: (value: A, cause: Cause.Cause<unknown>) => Effect.Effect<void, never, R2>
  ): Effect.Effect<A, E, R | R2 | WorkflowInstance | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L831)

Since v4.0.0

# annotations

## CaptureDefects

Captures defects for a workflow and includes them in the result of the workflow or its activities.

**Details**

By default, this annotation is set to `true`, meaning defects are captured.

**Signature**

```ts
declare const CaptureDefects: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L876)

Since v4.0.0

## SuspendOnFailure

Marks a workflow to suspend when it encounters any error.

**Details**

The suspended execution can later be resumed with the workflow's `resume` method, for example `MyWorkflow.resume(executionId)`.

**Signature**

```ts
declare const SuspendOnFailure: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L893)

Since v4.0.0

# constructors

## make

Creates a durable workflow definition with schemas, annotations, and
deterministic execution IDs derived from the workflow tag and idempotency
key.

**Signature**

```ts
declare const make: <
  const Tag extends string,
  Payload extends Schema.Struct.Fields | AnyStructSchema,
  Success extends Schema.Top = Schema.Void,
  Error extends Schema.Top = Schema.Never
>(
  tag: Tag,
  options: {
    readonly payload: Payload
    readonly idempotencyKey: (
      payload: Payload extends Schema.Struct.Fields ? Schema.Struct.Type<Payload> : Payload["Type"]
    ) => string
    readonly success?: Success
    readonly error?: Error
    readonly suspendedRetrySchedule?: Schedule.Schedule<any, unknown> | undefined
    readonly annotations?: Context.Context<never>
  }
) => Workflow<Tag, Payload extends Schema.Struct.Fields ? Schema.Struct<Payload> : Payload, Success, Error>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L429)

Since v4.0.0

# models

## Any (interface)

Type-erased workflow shape for APIs that operate on workflows without
preserving their specific payload, success, or error types.

**Signature**

```ts
export interface Any {
  new (_: never): {}

  readonly [TypeId]: typeof TypeId
  readonly _tag: string
  readonly executionId: (payload: any) => Effect.Effect<string>
  readonly payloadSchema: AnyStructSchema
  readonly successSchema: Schema.Top
  readonly errorSchema: Schema.Top
  readonly annotations: Context.Context<never>
  readonly idempotencyKey: (payload: any) => string
  readonly suspendedRetrySchedule?: Schedule.Schedule<any, unknown> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L218)

Since v4.0.0

## AnyWithProps (interface)

Type-erased workflow shape that also exposes executable operations needed by
workflow proxy and engine helpers.

**Signature**

```ts
export interface AnyWithProps extends Any {
  readonly payloadSchema: AnyStructSchema
  readonly successSchema: Schema.Top
  readonly errorSchema: Schema.Top
  readonly execute: (payload: any, options?: { readonly discard?: boolean }) => Effect.Effect<any, any, any>
  readonly resume: (executionId: string) => Effect.Effect<void, never, WorkflowEngine>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L239)

Since v4.0.0

## Execution (interface)

Type-level marker for services associated with a specific workflow
execution tag.

**Signature**

```ts
export interface Execution<Tag extends string> {
  readonly _: unique symbol
  readonly _tag: Tag
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L206)

Since v4.0.0

## PayloadSchema (type alias)

Extracts the payload schema from a `Workflow`.

**Signature**

```ts
type PayloadSchema<W> = W extends Workflow<infer _Name, infer _Payload, infer _Success, infer _Error> ? _Payload : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L258)

Since v4.0.0

## RequirementsClient (type alias)

Computes the schema services required by clients that execute or poll
workflows.

**Signature**

```ts
type RequirementsClient<Workflows> =
  Workflows extends Workflow<infer _Name, infer _Payload, infer _Success, infer _Error>
    ? _Payload["EncodingServices"] | _Success["DecodingServices"] | _Error["DecodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L273)

Since v4.0.0

## RequirementsHandler (type alias)

Computes the schema services required by handlers that decode workflow
payloads and encode workflow results.

**Signature**

```ts
type RequirementsHandler<Workflows> =
  Workflows extends Workflow<infer _Name, infer _Payload, infer _Success, infer _Error>
    ?
        | _Payload["DecodingServices"]
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Success["EncodingServices"]
        | _Error["DecodingServices"]
        | _Error["EncodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L291)

Since v4.0.0

## Workflow (interface)

Durable workflow definition with typed payload, success, and error schemas
plus operations for execution, polling, interruption, resumption, and
registration.

**Signature**

```ts
export interface Workflow<
  Tag extends string,
  Payload extends AnyStructSchema,
  Success extends Schema.Top,
  Error extends Schema.Top
> {
  new (_: never): {}

  readonly [TypeId]: typeof TypeId
  readonly _tag: Tag
  readonly payloadSchema: Payload
  readonly successSchema: Success
  readonly errorSchema: Error
  readonly annotations: Context.Context<never>
  readonly idempotencyKey: (payload: Payload["Type"]) => string
  readonly suspendedRetrySchedule?: Schedule.Schedule<any, unknown> | undefined

  /**
   * Add an annotation to the workflow.
   */
  annotate<I, S>(key: Context.Key<I, S>, value: S): Workflow<Tag, Payload, Success, Error>

  /**
   * Merge multiple annotations into the workflow.
   */
  annotateMerge<I>(annotations: Context.Context<I>): Workflow<Tag, Payload, Success, Error>

  /**
   * Execute the workflow with the given payload.
   */
  readonly execute: <const Discard extends boolean = false>(
    payload: Payload["~type.make.in"],
    options?: {
      readonly discard?: Discard
    }
  ) => Effect.Effect<
    Discard extends true ? string : Success["Type"],
    Discard extends true ? never : Error["Type"],
    WorkflowEngine | Payload["EncodingServices"] | Success["DecodingServices"] | Error["DecodingServices"]
  >

  /**
   * Poll the current status of a workflow execution.
   */
  readonly poll: (
    executionId: string
  ) => Effect.Effect<
    Option.Option<Result<Success["Type"], Error["Type"]>>,
    never,
    WorkflowEngine | Success["DecodingServices"] | Error["DecodingServices"]
  >

  /**
   * Interrupt a workflow execution for the given execution ID.
   */
  readonly interrupt: (executionId: string) => Effect.Effect<void, never, WorkflowEngine>

  /**
   * Manually resume a workflow execution for the given execution ID.
   */
  readonly resume: (executionId: string) => Effect.Effect<void, never, WorkflowEngine>

  /**
   * Create a layer that registers the workflow and provides an effect to
   * execute it.
   */
  readonly toLayer: <R>(
    execute: (payload: Payload["Type"], executionId: string) => Effect.Effect<Success["Type"], Error["Type"], R>
  ) => Layer.Layer<
    never,
    never,
    | WorkflowEngine
    | Exclude<R, WorkflowEngine | WorkflowInstance | Execution<Tag> | Scope.Scope>
    | Payload["DecodingServices"]
    | Payload["EncodingServices"]
    | Success["DecodingServices"]
    | Success["EncodingServices"]
    | Error["DecodingServices"]
    | Error["EncodingServices"]
  >

  /**
   * For the given payload, compute the deterministic execution ID.
   */
  readonly executionId: (payload: Payload["~type.make.in"]) => Effect.Effect<string>

  /**
   * Add compensation logic to an effect inside a Workflow.
   *
   * **Details**
   *
   * The compensation finalizer is called if the entire workflow fails, allowing you to perform cleanup or other actions based on the success value and the cause of the workflow failure.
   *
   * **Gotchas**
   *
   * Compensation finalizers are only registered for top-level effects in the workflow and do not work for nested activities.
   */
  readonly withCompensation: {
    <A, R2>(
      compensation: (value: A, cause: Cause.Cause<Error["Type"]>) => Effect.Effect<void, never, R2>
    ): <E, R>(
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E, R | R2 | WorkflowInstance | Execution<Tag> | Scope.Scope>
    <A, E, R, R2>(
      effect: Effect.Effect<A, E, R>,
      compensation: (value: A, cause: Cause.Cause<Error["Type"]>) => Effect.Effect<void, never, R2>
    ): Effect.Effect<A, E, R | R2 | WorkflowInstance | Execution<Tag> | Scope.Scope>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L45)

Since v4.0.0

# resource management

## addFinalizer

Adds an exit finalizer to the current workflow scope, preserving the
services available when the finalizer is registered.

**Signature**

```ts
declare const addFinalizer: <R>(
  f: (exit: Exit.Exit<unknown, unknown>) => Effect.Effect<void, never, R>
) => Effect.Effect<void, never, WorkflowInstance | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L798)

Since v4.0.0

## provideScope

Provides the workflow scope to the given effect, and closes the scope only when the workflow execution fully completes.

**Signature**

```ts
declare const provideScope: <A, E, R>(
  effect: Effect.Effect<A, E, R>
) => Effect.Effect<A, E, Exclude<R, Scope.Scope> | WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L786)

Since v4.0.0

## scope

Accesses the workflow scope, which is only closed when the workflow execution fully completes.

**Signature**

```ts
declare const scope: Effect.Effect<Scope.Scope, never, WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L771)

Since v4.0.0

# results

## Complete (class)

Represents a completed workflow execution with its success or failure `Exit`.

**Signature**

```ts
declare class Complete<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L533)

Since v4.0.0

### Schema (static method)

Builds the schema for completed workflow results from success and error schemas.

**Signature**

```ts
declare const Schema: <Success extends Schema.Constraint, Error extends Schema.Constraint>(options: {
  readonly success: Success
  readonly error: Error
}) => CompleteSchema<Success, Error>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L548)

Since v4.0.0

### [ResultTypeId] (property)

Marks this value as a workflow result for runtime guards.

**Signature**

```ts
readonly [ResultTypeId]: "~effect/workflow/Workflow/Result"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L541)

Since v4.0.0

## CompleteEncoded (interface)

Encoded representation of a completed workflow result containing an encoded
`Exit`.

**Signature**

```ts
export interface CompleteEncoded<A, E> {
  readonly _tag: "Complete"
  readonly exit: ExitEncoded<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L501)

Since v4.0.0

## Result

Creates a schema for workflow results using the supplied success and error
schemas.

**Signature**

```ts
declare const Result: <Success extends Schema.Constraint, Error extends Schema.Constraint>(options: {
  readonly success: Success
  readonly error: Error
}) => Schema.Union<readonly [CompleteSchema<Success, Error>, typeof Suspended]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L626)

Since v4.0.0

## Result (type alias)

Result of a workflow execution, either a completed exit or a suspended
workflow state.

**Signature**

```ts
type Result<A, E> = Complete<A, E> | Suspended
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L482)

Since v4.0.0

## ResultEncoded

Schema for encoded workflow results with generic success and error payloads.

**Signature**

```ts
declare const ResultEncoded: Schema.Codec<ResultEncoded<any, any>, ResultEncoded<any, any>, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L642)

Since v4.0.0

## ResultEncoded (type alias)

Encoded representation of a workflow `Result`.

**Signature**

```ts
type ResultEncoded<A, E> = CompleteEncoded<A, E> | typeof Suspended.Encoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L490)

Since v4.0.0

## Suspended (class)

Represents a suspended workflow execution, optionally carrying the cause that
triggered suspension.

**Signature**

```ts
declare class Suspended
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L605)

Since v4.0.0

### [ResultTypeId] (property)

Marks this value as a workflow result for runtime guards.

**Signature**

```ts
readonly [ResultTypeId]: "~effect/workflow/Workflow/Result"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L616)

Since v4.0.0

## intoResult

Runs an effect as a workflow execution and converts its outcome into a
`Result`, handling suspension, defect capture, interruption, and workflow
scope finalization.

**Signature**

```ts
declare const intoResult: <A, E, R>(
  effect: Effect.Effect<A, E, R>
) => Effect.Effect<Result<A, E>, never, Exclude<R, Scope.Scope> | WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L659)

Since v4.0.0

## isResult

Returns `true` when a value is a workflow `Result`.

**Signature**

```ts
declare const isResult: <A = unknown, E = unknown>(u: unknown) => u is Result<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L471)

Since v4.0.0

## suspend

Marks a workflow instance as suspended and interrupts the current fiber to
stop execution until it is resumed.

**Signature**

```ts
declare const suspend: (instance: WorkflowInstance["Service"]) => Effect.Effect<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L859)

Since v4.0.0

## wrapActivityResult

Wraps an activity-like effect so workflow suspension waits for currently
running activities to finish or suspend.

**Signature**

```ts
declare const wrapActivityResult: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  isSuspend: (value: A) => boolean
) => Effect.Effect<A, E, R | WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L722)

Since v4.0.0

# schemas

## AnyStructSchema (interface)

Schema constraint for workflow payload schemas that expose struct fields.

**Signature**

```ts
export interface AnyStructSchema extends Schema.Top {
  readonly fields: Schema.Struct.Fields
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L195)

Since v4.0.0

## CompleteSchema (interface)

Schema constructor for `Complete` workflow results using the supplied
success and error schemas.

**Signature**

```ts
export interface CompleteSchema<
  Success extends Schema.Constraint,
  Error extends Schema.Constraint
> extends Schema.declareConstructor<
  Complete<Success["Type"], Error["Type"]>,
  Complete<Success["Encoded"], Error["Encoded"]>,
  readonly [Schema.Exit<Success, Error, Schema.Defect>]
> {
  readonly success: Success
  readonly error: Error
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Workflow.ts#L513)

Since v4.0.0
