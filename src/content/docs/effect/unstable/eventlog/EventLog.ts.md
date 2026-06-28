---
title: EventLog.ts
nav_order: 223
parent: "effect"
---

## EventLog.ts overview

Runtime for writing typed events to an event journal.

`EventLog` combines event groups, handlers, a journal, local identity,
optional remote replicas, and reactivity hooks. Writers send typed payloads
through a client; the matching handler runs first, and the journal entry is
committed only after the handler succeeds. This module also contains the
layers and helpers needed to assemble that runtime.

Since v4.0.0

---

## Exports Grouped by Category

- [client](#client)
  - [makeClient](#makeclient)
- [compaction](#compaction)
  - [groupCompaction](#groupcompaction)
- [constructors](#constructors)
  - [decodeIdentityString](#decodeidentitystring)
  - [encodeIdentityString](#encodeidentitystring)
  - [makeIdentity](#makeidentity)
- [handlers](#handlers)
  - [Handlers (interface)](#handlers-interface)
  - [group](#group)
  - [makeReplayFromRemote](#makereplayfromremote)
- [layers](#layers)
  - [layer](#layer)
  - [layerEventLog](#layereventlog)
  - [layerRegistry](#layerregistry)
- [models](#models)
  - [CurrentStoreId (class)](#currentstoreid-class)
- [reactivity](#reactivity)
  - [groupReactivity](#groupreactivity)
- [schemas](#schemas)
  - [EventLogSchema (interface)](#eventlogschema-interface)
  - [IdentitySchema](#identityschema)
  - [isEventLogSchema](#iseventlogschema)
  - [schema](#schema)
- [services](#services)
  - [EventLog (class)](#eventlog-class)
  - [Identity (class)](#identity-class)
  - [Registry (class)](#registry-class)
- [type IDs](#type-ids)
  - [HandlersTypeId](#handlerstypeid)
  - [HandlersTypeId (type alias)](#handlerstypeid-type-alias)
  - [SchemaTypeId](#schematypeid)
  - [SchemaTypeId (type alias)](#schematypeid-type-alias)
- [utils](#utils)
  - [Handlers (namespace)](#handlers-namespace)
    - [Any (interface)](#any-interface)
    - [Item (type alias)](#item-type-alias)
    - [ValidateReturn (type alias)](#validatereturn-type-alias)
    - [Error (type alias)](#error-type-alias)
    - [Services (type alias)](#services-type-alias)

---

# client

## makeClient

Creates a typed client function for writing events defined by an
`EventLogSchema`.

**Details**

The returned function delegates to the `EventLog` service and preserves each
event's success and error types.

**Signature**

```ts
declare const makeClient: <Groups extends EventGroup.Any>(
  schema: EventLogSchema<Groups>
) => Effect.Effect<
  <Tag extends Event.Tag<EventGroup.Events<Groups>>>(
    event: Tag,
    payload: Event.PayloadWithTag<EventGroup.Events<Groups>, Tag>
  ) => Effect.Effect<
    Event.SuccessWithTag<EventGroup.Events<Groups>, Tag>,
    Event.ErrorWithTag<EventGroup.Events<Groups>, Tag> | EventJournalError
  >,
  never,
  EventLog
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L1007)

Since v4.0.0

# compaction

## groupCompaction

Registers a compaction handler for an event group.

**Details**

During remote replay, matching entries are decoded, grouped by primary key, and
passed to the compaction effect, which may write replacement entries.

**Signature**

```ts
declare const groupCompaction: <Events extends Event.Any, R>(
  group: EventGroup.EventGroup<Events>,
  effect: (options: {
    readonly primaryKey: string
    readonly entries: ReadonlyArray<Entry>
    readonly events: ReadonlyArray<Event.TaggedPayload<Events>>
    readonly write: <Tag extends Event.Tag<Events>>(
      tag: Tag,
      payload: Event.PayloadWithTag<Events, Tag>
    ) => Effect.Effect<void, never, Event.PayloadSchemaWithTag<Events, Tag>["EncodingServices"]>
  }) => Effect.Effect<void, never, R>
) => Layer.Layer<never, never, R | Event.PayloadSchema<Events>["DecodingServices"] | Registry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L567)

Since v4.0.0

# constructors

## decodeIdentityString

Decodes a base64url identity string produced by `encodeIdentityString`.

**Gotchas**

Invalid input throws a schema decoding error.

**Signature**

```ts
declare const decodeIdentityString: (value: string) => Identity["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L455)

Since v4.0.0

## encodeIdentityString

Encodes an event-log identity as a base64url string containing the public key
and private key bytes.

**Signature**

```ts
declare const encodeIdentityString: (identity: Identity["Service"]) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L470)

Since v4.0.0

## makeIdentity

Generates a new event-log identity using the configured
`EventLogEncryption` service.

**Signature**

```ts
declare const makeIdentity: Effect.Effect<
  { readonly publicKey: string; readonly privateKey: Redacted.Redacted<Uint8Array<ArrayBuffer>> },
  never,
  EventLogEncryption.EventLogEncryption
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L483)

Since v4.0.0

# handlers

## Handlers (interface)

Builder for the handlers associated with an `EventGroup`.

**Details**

The `Events` type parameter tracks the event tags that still need handlers, and
each call to `handle` records a handler while accumulating any required
services.

**Signature**

```ts
export interface Handlers<R, Events extends Event.Any = never> extends Pipeable {
  readonly [HandlersTypeId]: {
    _Events: Covariant<Events>
  }
  readonly group: EventGroup.AnyWithProps
  readonly handlers: Record.ReadonlyRecord<string, Handlers.Item<R>>
  readonly context: Context.Context<R>

  /**
   * Add the implementation for an `Event` to a `Handlers` group.
   */
  handle<Tag extends Event.Tag<Events>, R1>(
    name: Tag,
    handler: (options: {
      readonly storeId: StoreId
      readonly payload: Event.PayloadWithTag<Events, Tag>
      readonly entry: Entry
      readonly conflicts: ReadonlyArray<{
        readonly entry: Entry
        readonly payload: Event.PayloadWithTag<Events, Tag>
      }>
    }) => Effect.Effect<Event.SuccessWithTag<Events, Tag>, Event.ErrorWithTag<Events, Tag>, R1>
  ): Handlers<R | R1, Event.ExcludeTag<Events, Tag>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L266)

Since v4.0.0

## group

Creates a layer that registers handlers for every event in an event group.

**Details**

The callback receives a `Handlers` builder; its return type is checked so every
event in the group is handled.

**Signature**

```ts
declare const group: <Events extends Event.Any, Return>(
  group: EventGroup.EventGroup<Events>,
  f: (handlers: Handlers<never, Events>) => Handlers.ValidateReturn<Return>
) => Layer.Layer<
  Event.ToService<Events>,
  Handlers.Error<Return>,
  Exclude<Handlers.Services<Return>, Scope.Scope | Identity> | Registry
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L530)

Since v4.0.0

## makeReplayFromRemote

Builds the effect used to replay entries received from a remote event log.

**Details**

The returned handler decodes the entry and conflicts with the registered event
schema, runs the matching handler with the supplied identity and store id, logs
failures, and invalidates configured reactivity keys.

**Signature**

```ts
declare const makeReplayFromRemote: (options: {
  readonly handlers: ReadonlyMap<string, Handlers.Item<any>>
  readonly storeId: StoreId
  readonly identity: Identity["Service"]
  readonly reactivity: Reactivity["Service"]
  readonly reactivityKeys: Record<string, ReadonlyArray<string>>
  readonly logAnnotations: { readonly service: string; readonly effect: string }
}) => (args_0: { readonly entry: Entry; readonly conflicts: ReadonlyArray<Entry> }) => Effect.Effect<void, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L698)

Since v4.0.0

# layers

## layer

Combines event-group handler layers with the `EventLog` runtime for a schema.

**When to use**

Use when you need one layer that installs the shared `EventLog` runtime for
an `EventLogSchema` and registers an event-group handler layer for typed
writes.

**Details**

The supplied handler layer is provided with `layerEventLog`. The returned
layer provides `EventLog | Registry`, preserves the handler layer's error
type, and still requires its remaining services plus `EventJournal` and
`Identity`.

**Gotchas**

The schema argument does not register handlers by itself. Handler registration
comes from the supplied layer, and writing an event without a registered
handler dies with `Event handler not found for: "<tag>"`.

**See**

- `schema` for creating the schema argument from event groups
- `group` for building the handler layer consumed by this layer
- `layerEventLog` for installing the runtime and registry without combining a handler layer

**Signature**

```ts
declare const layer: <Groups extends EventGroup.Any, E, R>(
  _schema: EventLogSchema<Groups>,
  layer: Layer.Layer<EventGroup.ToService<Groups>, E, R>
) => Layer.Layer<EventLog | Registry, E, Exclude<R, EventLog | Registry> | EventJournal | Identity>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L983)

Since v4.0.0

## layerEventLog

Provides `EventLog` and `Registry` using the configured `EventJournal` and
`Identity`.

**Signature**

```ts
declare const layerEventLog: Layer.Layer<Registry | EventLog, never, EventJournal | Identity>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L946)

Since v4.0.0

## layerRegistry

Provides an in-memory `Registry` for event handlers, compactors, remote
replicas, and reactivity keys.

**Signature**

```ts
declare const layerRegistry: Layer.Layer<Registry, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L109)

Since v4.0.0

# models

## CurrentStoreId (class)

Context reference for the store id used by event-log writes and remote
replication.

**Details**

Defaults to the branded store id `"default"`.

**Signature**

```ts
declare class CurrentStoreId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L413)

Since v4.0.0

# reactivity

## groupReactivity

Registers reactivity keys to invalidate when events from a group are written or
replayed.

**Details**

Pass a single key list for all events or a mapping from event tag to key list.

**Signature**

```ts
declare const groupReactivity: <Events extends Event.Any>(
  group: EventGroup.EventGroup<Events>,
  keys: { readonly [Tag in Event.Tag<Events>]?: ReadonlyArray<string> } | ReadonlyArray<string>
) => Layer.Layer<never, never, Registry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L665)

Since v4.0.0

# schemas

## EventLogSchema (interface)

Schema describing the event groups that can be written through an `EventLog`.

**Signature**

```ts
export interface EventLogSchema<Groups extends EventGroup.Any> {
  readonly [SchemaTypeId]: SchemaTypeId
  readonly groups: ReadonlyArray<Groups>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L217)

Since v4.0.0

## IdentitySchema

Schema for an event-log identity with a string public key and redacted
base64-encoded private key bytes.

**Signature**

```ts
declare const IdentitySchema: Schema.Struct<{
  readonly publicKey: Schema.String
  readonly privateKey: Schema.decodeTo<Schema.Redacted<Schema.Uint8Array>, Schema.Uint8ArrayFromBase64, never, never>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L431)

Since v4.0.0

## isEventLogSchema

Returns `true` when a value carries the `EventLogSchema` marker.

**Signature**

```ts
declare const isEventLogSchema: (u: unknown) => u is EventLogSchema<EventGroup.Any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L208)

Since v4.0.0

## schema

Creates an `EventLogSchema` from one or more event groups.

**Signature**

```ts
declare const schema: <Groups extends ReadonlyArray<EventGroup.Any>>(
  ...groups: Groups
) => EventLogSchema<Groups[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L228)

Since v4.0.0

# services

## EventLog (class)

Service for writing typed event-log events through registered handlers.

**Details**

`write` encodes the event payload, runs the matching handler, commits the entry
only when the handler succeeds, and exposes access to the underlying journal
entries and destroy operation.

**Signature**

```ts
declare class EventLog
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L50)

Since v4.0.0

## Identity (class)

Context service for an event-log identity containing a public key and redacted
private key material.

**Details**

The identity is used by remote replication for authentication and by the
encryption service to derive signing and encryption keys.

**Signature**

```ts
declare class Identity
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L181)

Since v4.0.0

## Registry (class)

Service that collects event handlers, compaction handlers, remote replicas,
and reactivity invalidation keys.

**Signature**

```ts
declare class Registry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L70)

Since v4.0.0

# type IDs

## HandlersTypeId

Runtime property key used to identify `Handlers` values.

**Signature**

```ts
declare const HandlersTypeId: "~effect/eventlog/EventLog/Handlers"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L252)

Since v4.0.0

## HandlersTypeId (type alias)

Type-level identifier used to brand `Handlers` values.

**Signature**

```ts
type HandlersTypeId = "~effect/eventlog/EventLog/Handlers"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L244)

Since v4.0.0

## SchemaTypeId

Runtime property key used to identify `EventLogSchema` values.

**Signature**

```ts
declare const SchemaTypeId: "~effect/eventlog/EventLog/Schema"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L200)

Since v4.0.0

## SchemaTypeId (type alias)

Type-level identifier used to brand `EventLogSchema` values.

**Signature**

```ts
type SchemaTypeId = "~effect/eventlog/EventLog/Schema"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L192)

Since v4.0.0

# utils

## Handlers (namespace)

Namespace containing helper types for `Handlers` values and handler-producing
layers.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L303)

Since v4.0.0

### Any (interface)

Type that matches any `Handlers` value regardless of its services or remaining
events.

**Signature**

```ts
export interface Any {
  readonly [HandlersTypeId]: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L311)

Since v4.0.0

### Item (type alias)

Runtime representation of one registered event handler, including its event
metadata, captured context, and handler function.

**Signature**

```ts
type Item<R> = {
  readonly event: Event.AnyWithProps
  readonly context: Context.Context<R>
  readonly handler: (options: {
    readonly storeId: StoreId
    readonly payload: unknown
    readonly entry: Entry
    readonly conflicts: ReadonlyArray<{
      readonly entry: Entry
      readonly payload: unknown
    }>
  }) => Effect.Effect<unknown, unknown, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L322)

Since v4.0.0

### ValidateReturn (type alias)

Validates that a handler builder returned all required handlers.

**Details**

If any event tag remains unhandled, the type evaluates to an explanatory
compile-time error string.

**Signature**

```ts
type ValidateReturn<A> = A extends
  | Handlers<infer _R, infer _Events>
  | Effect.Effect<Handlers<infer _R, infer _Events>, infer _EX, infer _RX>
  ? [_Events] extends [never]
    ? A
    : `Event not handled: ${Event.Tag<_Events>}`
  : `Must return the implemented handlers`
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L347)

Since v4.0.0

### Error (type alias)

Extracts the error type from an effect that produces `Handlers`.

**Signature**

```ts
type Error<A> = A extends Effect.Effect<Handlers<infer _R, infer _Events>, infer _EX, infer _RX> ? _EX : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L370)

Since v4.0.0

### Services (type alias)

Computes the services required by a `Handlers` value or by an effect that
produces one, including event schema services.

**Signature**

```ts
type Services<A> =
  A extends Handlers<infer _R, infer _Events>
    ? _R | Event.Services<_Events>
    : A extends Effect.Effect<Handlers<infer _R, infer _Events>, infer _EX, infer _RX>
      ? _R | _RX | Event.Services<_Events>
      : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLog.ts#L387)

Since v4.0.0
