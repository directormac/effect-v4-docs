---
title: DurableDeferred.ts
nav_order: 347
parent: "effect"
---

## DurableDeferred.ts overview

Defines named wait points for durable workflow executions.

A `DurableDeferred` has a stable name and schemas for the value that will be
recorded later. Workflows can await it, suspend when no result exists yet, and
resume after its result is recorded. Tokens identify the workflow name,
execution id, and deferred name so external code can complete the correct
wait point later.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [await](#await)
  - [done](#done)
  - [fail](#fail)
  - [failCause](#failcause)
  - [into](#into)
  - [succeed](#succeed)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (interface)](#anywithprops-interface)
  - [DurableDeferred (interface)](#durabledeferred-interface)
- [racing](#racing)
  - [raceAll](#raceall)
- [token](#token)
  - [Token](#token-1)
  - [Token (type alias)](#token-type-alias)
  - [TokenParsed (class)](#tokenparsed-class)
  - [token](#token-2)
  - [tokenFromExecutionId](#tokenfromexecutionid)
  - [tokenFromPayload](#tokenfrompayload)
- [type IDs](#type-ids)
  - [TokenTypeId](#tokentypeid)
  - [TokenTypeId (type alias)](#tokentypeid-type-alias)

---

# combinators

## await

Waits for the durable deferred, suspending the current workflow when no
persisted completion is available.

**Signature**

```ts
declare const await: <Success extends Schema.Constraint, Error extends Schema.Constraint>(
  self: DurableDeferred<Success, Error>
) => Effect.Effect<
  Success["Type"],
  Error["Type"],
  WorkflowEngine | WorkflowInstance | Success["DecodingServices"] | Error["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L165)

Since v4.0.0

## done

Completes the durable deferred identified by a token with the supplied exit,
encoding the result through the deferred schemas.

**Signature**

```ts
declare const done: {
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(options: {
    readonly token: Token
    readonly exit: Exit.Exit<Success["Type"], Error["Type"]>
  }): (
    self: DurableDeferred<Success, Error>
  ) => Effect.Effect<void, never, WorkflowEngine | Success["EncodingServices"] | Error["EncodingServices"]>
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>,
    options: { readonly token: Token; readonly exit: Exit.Exit<Success["Type"], Error["Type"]> }
  ): Effect.Effect<void, never, WorkflowEngine | Success["EncodingServices"] | Error["EncodingServices"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L504)

Since v4.0.0

## fail

Completes the durable deferred identified by a token with a typed failure.

**Signature**

```ts
declare const fail: {
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(options: {
    readonly token: Token
    readonly error: Error["Type"]
  }): (self: DurableDeferred<Success, Error>) => Effect.Effect<void, never, WorkflowEngine | Error["EncodingServices"]>
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>,
    options: { readonly token: Token; readonly error: Error["Type"] }
  ): Effect.Effect<void, never, WorkflowEngine | Error["EncodingServices"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L591)

Since v4.0.0

## failCause

Completes the durable deferred identified by a token with a failure cause.

**Signature**

```ts
declare const failCause: {
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(options: {
    readonly token: Token
    readonly cause: Cause.Cause<Error["Type"]>
  }): (self: DurableDeferred<Success, Error>) => Effect.Effect<void, never, WorkflowEngine | Error["EncodingServices"]>
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>,
    options: { readonly token: Token; readonly cause: Cause.Cause<Error["Type"]> }
  ): Effect.Effect<void, never, WorkflowEngine | Error["EncodingServices"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L626)

Since v4.0.0

## into

Runs an effect and records its exit into the durable deferred, resuming
workflows that are waiting on that deferred.

**Signature**

```ts
declare const into: {
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>
  ): <R>(
    effect: Effect.Effect<Success["Type"], Error["Type"], R>
  ) => Effect.Effect<
    Success["Type"],
    Error["Type"],
    R | WorkflowEngine | WorkflowInstance | Success["DecodingServices"] | Error["DecodingServices"]
  >
  <Success extends Schema.Constraint, Error extends Schema.Constraint, R>(
    effect: Effect.Effect<Success["Type"], Error["Type"], R>,
    self: DurableDeferred<Success, Error>
  ): Effect.Effect<
    Success["Type"],
    Error["Type"],
    R | WorkflowEngine | WorkflowInstance | Success["DecodingServices"] | Error["DecodingServices"]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L175)

Since v4.0.0

## succeed

Completes the durable deferred identified by a token with a successful
value.

**Signature**

```ts
declare const succeed: {
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(options: {
    readonly token: Token
    readonly value: Success["Type"]
  }): (
    self: DurableDeferred<Success, Error>
  ) => Effect.Effect<void, never, WorkflowEngine | Success["EncodingServices"]>
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>,
    options: { readonly token: Token; readonly value: Success["Type"] }
  ): Effect.Effect<void, never, WorkflowEngine | Success["EncodingServices"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L556)

Since v4.0.0

# constructors

## make

Creates a named durable deferred with optional success and error schemas for
persisted completion.

**Signature**

```ts
declare const make: <Success extends Schema.Constraint = Schema.Void, Error extends Schema.Constraint = Schema.Never>(
  name: string,
  options?: { readonly success?: Success | undefined; readonly error?: Error | undefined }
) => DurableDeferred<Success, Error>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L84)

Since v4.0.0

# models

## Any (interface)

Type-erased durable deferred shape for APIs that only need the deferred
identity and name.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
  readonly name: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L57)

Since v4.0.0

## AnyWithProps (interface)

Type-erased durable deferred shape that also exposes success, error, and
exit schemas.

**Signature**

```ts
export interface AnyWithProps {
  readonly [TypeId]: typeof TypeId
  readonly name: string
  readonly successSchema: Schema.Top
  readonly errorSchema: Schema.Top
  readonly exitSchema: Schema.Exit<any, any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L69)

Since v4.0.0

## DurableDeferred (interface)

Named durable deferred value whose completion is persisted by the workflow
engine and encoded with success and error schemas.

**Signature**

```ts
export interface DurableDeferred<Success extends Schema.Constraint, Error extends Schema.Constraint = Schema.Never> {
  readonly [TypeId]: typeof TypeId
  readonly name: string
  readonly successSchema: Success
  readonly errorSchema: Error
  readonly exitSchema: Schema.Exit<Schema.Top, Schema.Top, Schema.Top>
  readonly withActivityAttempt: Effect.Effect<DurableDeferred<Success, Error>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L38)

Since v4.0.0

# racing

## raceAll

Runs effects as a durable race, returning a previously persisted result when
present or completing a named deferred with the first result.

**Signature**

```ts
declare const raceAll: <
  const Effects extends NonEmptyReadonlyArray<Effect.Effect<any, any, any>>,
  Success extends Schema.Schema<Effect.Success<Effects[number]>>,
  Error extends Schema.Schema<Effect.Error<Effects[number]>>
>(options: {
  name: string
  success: Success
  error: Error
  effects: Effects
}) => Effect.Effect<
  Effect.Success<Effects[number]>,
  Effect.Error<Effects[number]>,
  | Effect.Services<Effects[number]>
  | Success["DecodingServices"]
  | Success["EncodingServices"]
  | Error["DecodingServices"]
  | Error["EncodingServices"]
  | WorkflowEngine
  | WorkflowInstance
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L255)

Since v4.0.0

# token

## Token

Schema for branded durable deferred tokens.

**Signature**

```ts
declare const Token: Schema.brand<Schema.String, "~effect/workflow/DurableDeferred/Token">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L323)

Since v4.0.0

## Token (type alias)

Branded string token identifying a durable deferred for a workflow
execution.

**Signature**

```ts
type Token = Brand.Branded<string, TokenTypeId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L315)

Since v4.0.0

## TokenParsed (class)

Schema for a decoded durable deferred token containing the workflow
name, execution ID, and deferred name.

**Signature**

```ts
declare class TokenParsed
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L332)

Since v4.0.0

## token

Creates a token for a durable deferred using the current workflow instance's
workflow name and execution ID.

**Signature**

```ts
declare const token: <Success extends Schema.Constraint, Error extends Schema.Constraint>(
  self: DurableDeferred<Success, Error>
) => Effect.Effect<Token, never, WorkflowInstance>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L407)

Since v4.0.0

## tokenFromExecutionId

Creates a durable deferred token from an explicit workflow, execution ID,
and deferred name.

**Signature**

```ts
declare const tokenFromExecutionId: {
  (options: {
    readonly workflow: Workflow.Any
    readonly executionId: string
  }): <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>
  ) => Token
  <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>,
    options: { readonly workflow: Workflow.Any; readonly executionId: string }
  ): Token
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L425)

Since v4.0.0

## tokenFromPayload

Creates a durable deferred token by deriving the workflow execution ID from
the supplied workflow payload.

**Signature**

```ts
declare const tokenFromPayload: {
  <W extends Workflow.Any>(options: {
    readonly workflow: W
    readonly payload: Workflow.PayloadSchema<W>["~type.make.in"]
  }): <Success extends Schema.Constraint, Error extends Schema.Constraint>(
    self: DurableDeferred<Success, Error>
  ) => Effect.Effect<Token>
  <Success extends Schema.Constraint, Error extends Schema.Constraint, W extends Workflow.Any>(
    self: DurableDeferred<Success, Error>,
    options: { readonly workflow: W; readonly payload: Workflow.PayloadSchema<W>["~type.make.in"] }
  ): Effect.Effect<Token>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L459)

Since v4.0.0

# type IDs

## TokenTypeId

Runtime brand identifier for durable deferred tokens.

**Signature**

```ts
declare const TokenTypeId: "~effect/workflow/DurableDeferred/Token"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L298)

Since v4.0.0

## TokenTypeId (type alias)

Type-level brand identifier for `Token` values.

**Signature**

```ts
type TokenTypeId = typeof TokenTypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableDeferred.ts#L306)

Since v4.0.0
