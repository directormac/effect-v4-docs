---
title: EventGroup.ts
nav_order: 221
parent: "effect"
---

## EventGroup.ts overview

Defines groups of typed events for the unstable event-log system.

An `EventGroup` collects event definitions that belong together. Start with
`empty`, add events with their payload, success, and error schemas, then use
the group to build clients with `EventLog.schema` and server handlers with
`EventLog.group`. The group only describes events; it does not write or run
them.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [empty](#empty)
- [guards](#guards)
  - [isEventGroup](#iseventgroup)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (type alias)](#anywithprops-type-alias)
  - [EventGroup (interface)](#eventgroup-interface)
  - [Events (type alias)](#events-type-alias)
  - [ServicesClient (type alias)](#servicesclient-type-alias)
  - [ServicesServer (type alias)](#servicesserver-type-alias)
  - [ToService (type alias)](#toservice-type-alias)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## empty

Creates an empty event group used as the starting point for defining a group.

**When to use**

Use when you need the starting `EventGroup` value before adding event
definitions with `.add(...)`.

**Signature**

```ts
declare const empty: EventGroup<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L193)

Since v4.0.0

# guards

## isEventGroup

Returns `true` when a value is an event log event group.

**Signature**

```ts
declare const isEventGroup: (u: unknown) => u is Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L40)

Since v4.0.0

# models

## Any (interface)

Type-erased marker for an event log event group.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: TypeId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L88)

Since v4.0.0

## AnyWithProps (type alias)

Type-erased event group with its events record available structurally.

**Signature**

```ts
type AnyWithProps = EventGroup<Event.Any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L98)

Since v4.0.0

## EventGroup (interface)

Typed collection of event definitions that represents a portion of an event log
domain.

**When to use**

Use when build groups from `empty.add(...)`, then provide implementations for the events
with `EventLog.group`.

**Signature**

```ts
export interface EventGroup<out Events extends Event.Any = Event.Any> extends Pipeable {
  readonly [TypeId]: TypeId
  readonly events: Record.ReadonlyRecord<string, Events>

  /**
   * Add an `Event` to the `EventGroup`.
   */
  add<
    Tag extends string,
    Payload extends Schema.Top = typeof Schema.Void,
    Success extends Schema.Top = typeof Schema.Void,
    Error extends Schema.Top = typeof Schema.Never
  >(options: {
    readonly tag: Tag
    readonly primaryKey: (payload: Schema.Schema.Type<Payload>) => string
    readonly payload?: Payload
    readonly success?: Success
    readonly error?: Error
  }): EventGroup<Events | Event.Event<Tag, Payload, Success, Error>>

  /**
   * Add an error schema to all the events in the `EventGroup`.
   */
  addError<Error extends Schema.Top>(error: Error): EventGroup<Event.AddError<Events, Error>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L54)

Since v4.0.0

## Events (type alias)

Extracts the union of event definitions contained in an event group.

**Signature**

```ts
type Events<Group> = Group extends EventGroup<infer _Events> ? _Events : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L115)

Since v4.0.0

## ServicesClient (type alias)

Client-side schema services required by all events in an event group.

**Signature**

```ts
type ServicesClient<Group> = Event.ServicesClient<Events<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L124)

Since v4.0.0

## ServicesServer (type alias)

Server-side schema services required by all events in an event group.

**Signature**

```ts
type ServicesServer<Group> = Event.ServicesServer<Events<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L132)

Since v4.0.0

## ToService (type alias)

Derives the handler service markers required for all events in an event group.

**Signature**

```ts
type ToService<A> = A extends EventGroup<infer _Events> ? Event.ToService<_Events> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L106)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark event log event groups.

**Signature**

```ts
declare const TypeId: "~effect/eventlog/EventGroup"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L32)

Since v4.0.0

## TypeId (type alias)

Unique type identifier used to mark event log event groups.

**Signature**

```ts
type TypeId = "~effect/eventlog/EventGroup"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventGroup.ts#L24)

Since v4.0.0
