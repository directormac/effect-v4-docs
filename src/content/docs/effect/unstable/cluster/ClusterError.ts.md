---
title: ClusterError.ts
nav_order: 173
parent: "effect"
---

## ClusterError.ts overview

Defines the structured errors used by the unstable cluster runtime.

These tagged, schema-backed errors describe failures at routing, runner
membership, serialization, persistence, mailbox capacity, and duplicate
envelope boundaries. Cluster clients, runners, and storage adapters use these
shared error values to report failures through typed Effect errors.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [AlreadyProcessingMessage (class)](#alreadyprocessingmessage-class)
    - [is (static method)](#is-static-method)
    - [[TypeId] (property)](#typeid-property)
  - [EntityNotAssignedToRunner (class)](#entitynotassignedtorunner-class)
    - [is (static method)](#is-static-method-1)
    - [[TypeId] (property)](#typeid-property-1)
  - [MailboxFull (class)](#mailboxfull-class)
    - [is (static method)](#is-static-method-2)
    - [[TypeId] (property)](#typeid-property-2)
  - [MalformedMessage (class)](#malformedmessage-class)
    - [is (static method)](#is-static-method-3)
    - [[TypeId] (property)](#typeid-property-3)
  - [PersistenceError (class)](#persistenceerror-class)
    - [refail (static method)](#refail-static-method)
    - [[TypeId] (property)](#typeid-property-4)
  - [RunnerNotRegistered (class)](#runnernotregistered-class)
    - [[TypeId] (property)](#typeid-property-5)
  - [RunnerUnavailable (class)](#runnerunavailable-class)
    - [is (static method)](#is-static-method-4)
    - [[TypeId] (property)](#typeid-property-6)

---

# errors

## AlreadyProcessingMessage (class)

Represents an error that occurs when the same request envelope is already
being processed.

**Details**

Carries the `address` and `envelopeId` for the affected request envelope.

**Signature**

```ts
declare class AlreadyProcessingMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L216)

Since v4.0.0

### is (static method)

Returns `true` when the value is an `AlreadyProcessingMessage` error.

**Signature**

```ts
declare const is: (u: unknown) => u is AlreadyProcessingMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L235)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L228)

Since v4.0.0

## EntityNotAssignedToRunner (class)

Represents an error that occurs when a Runner receives a message for an entity
that is not assigned to the receiving runner.

**Signature**

```ts
declare class EntityNotAssignedToRunner
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L28)

Since v4.0.0

### is (static method)

Returns `true` when the value is an `EntityNotAssignedToRunner` error.

**Signature**

```ts
declare const is: (u: unknown) => u is EntityNotAssignedToRunner
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L46)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L39)

Since v4.0.0

## MailboxFull (class)

Represents an error that occurs when the entity mailbox is full.

**Details**

Carries the `address` whose bounded mailbox is at capacity.

**Gotchas**

Volatile requests fail immediately. Persisted or durable messages are retried
or resumed from storage when the mailbox is full.

**Signature**

```ts
declare class MailboxFull
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L184)

Since v4.0.0

### is (static method)

Returns `true` when the value is a `MailboxFull` error.

**Signature**

```ts
declare const is: (u: unknown) => u is MailboxFull
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L200)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L193)

Since v4.0.0

## MalformedMessage (class)

Represents an error that occurs when a message fails at a schema
serialization or deserialization boundary.

**Details**

`cause` carries the underlying failure. `refail` maps encode and decode
failures into `MalformedMessage` values.

**Signature**

```ts
declare class MalformedMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L63)

Since v4.0.0

### is (static method)

Returns `true` when the value is a `MalformedMessage` error.

**Signature**

```ts
declare const is: (u: unknown) => u is MalformedMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L79)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L72)

Since v4.0.0

## PersistenceError (class)

Represents an error that occurs when a message fails to be persisted into
cluster's mailbox storage.

**Signature**

```ts
declare class PersistenceError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L102)

Since v4.0.0

### refail (static method)

Maps failures from the supplied effect into `PersistenceError` values.

**Signature**

```ts
declare const refail: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, PersistenceError, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L118)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L111)

Since v4.0.0

## RunnerNotRegistered (class)

Represents an error that occurs when a Runner is not registered with the shard
manager.

**Signature**

```ts
declare class RunnerNotRegistered
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L130)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L139)

Since v4.0.0

## RunnerUnavailable (class)

Represents an error that occurs when a Runner is unresponsive.

**Signature**

```ts
declare class RunnerUnavailable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L148)

Since v4.0.0

### is (static method)

Returns `true` when the value is a `RunnerUnavailable` error.

**Signature**

```ts
declare const is: (u: unknown) => u is RunnerUnavailable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L164)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/ClusterError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterError.ts#L157)

Since v4.0.0
