---
title: Event.ts
nav_order: 220
parent: "effect"
---

## Event.ts overview

Typed event definitions for the unstable event-log system.

An `Event` is the durable contract shared by writers, handlers, journals, and
replicas. It gives an event a stable tag, derives the aggregate or entity
primary key from the decoded payload, and records the schemas used for the
payload, handler result, and handler errors. The payload schema is also used
to derive the MessagePack encoding for journal entries and remote
replication.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [addError](#adderror)
  - [make](#make)
- [guards](#guards)
  - [isEvent](#isevent)
- [models](#models)
  - [AddError (type alias)](#adderror-type-alias)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (interface)](#anywithprops-interface)
  - [Error (type alias)](#error-type-alias)
  - [ErrorSchema (type alias)](#errorschema-type-alias)
  - [ErrorWithTag (type alias)](#errorwithtag-type-alias)
  - [Event (interface)](#event-interface)
  - [EventHandler (interface)](#eventhandler-interface)
  - [ExcludeTag (type alias)](#excludetag-type-alias)
  - [Payload (type alias)](#payload-type-alias)
  - [PayloadSchema (type alias)](#payloadschema-type-alias)
  - [PayloadSchemaWithTag (type alias)](#payloadschemawithtag-type-alias)
  - [PayloadWithTag (type alias)](#payloadwithtag-type-alias)
  - [Services (type alias)](#services-type-alias)
  - [ServicesClient (type alias)](#servicesclient-type-alias)
  - [ServicesClientWithTag (type alias)](#servicesclientwithtag-type-alias)
  - [ServicesServer (type alias)](#servicesserver-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [SuccessSchema (type alias)](#successschema-type-alias)
  - [SuccessWithTag (type alias)](#successwithtag-type-alias)
  - [Tag (type alias)](#tag-type-alias)
  - [TaggedPayload (type alias)](#taggedpayload-type-alias)
  - [ToService (type alias)](#toservice-type-alias)
  - [WithTag (type alias)](#withtag-type-alias)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## addError

Adds another error schema to an event definition.

**Details**

The returned event keeps the same tag, primary key, payload, and success schema
while replacing the error schema with a union of the existing and new errors.

**Signature**

```ts
declare const addError: <A extends Any, Error2 extends Schema.Top>(event: A, error: Error2) => AddError<A, Error2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L439)

Since v4.0.0

## make

Creates an event log event definition.

**Details**

If omitted, the payload and success schemas default to `Schema.Void`, the error
schema defaults to `Schema.Never`, and the MessagePack payload schema is derived
from the payload schema.

**Signature**

```ts
declare const make: <
  Tag extends string,
  Payload extends Schema.Top = Schema.Void,
  Success extends Schema.Top = Schema.Void,
  Error extends Schema.Top = Schema.Never
>(options: {
  readonly tag: Tag
  readonly primaryKey: (payload: Schema.Schema.Type<Payload>) => string
  readonly payload?: Payload | undefined
  readonly success?: Success | undefined
  readonly error?: Error | undefined
}) => Event<Tag, Payload, Success, Error>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L404)

Since v4.0.0

# guards

## isEvent

Returns `true` when a value is an event log event definition.

**Signature**

```ts
declare const isEvent: (u: unknown) => u is Event<any, any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L40)

Since v4.0.0

# models

## AddError (type alias)

Returns an event definition type whose error schema also includes the provided
error schema.

**Signature**

```ts
type AddError<A, Error> =
  A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error>
    ? Event<_Tag, _Payload, _Success, _Error | Error>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L171)

Since v4.0.0

## Any (interface)

Type-erased event log event definition.

**Details**

It preserves the runtime tag, primary-key function, payload schema, success
schema, and error schema without retaining the original type parameters.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: TypeId
  readonly tag: string
  readonly primaryKey: (payload: any) => string
  readonly payload: Schema.Top
  readonly payloadMsgPack: Msgpack.schema<Schema.Top>
  readonly success: Schema.Top
  readonly error: Schema.Top
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L95)

Since v4.0.0

## AnyWithProps (interface)

Type-erased event definition with its runtime properties available
structurally.

**Signature**

```ts
export interface AnyWithProps extends Any {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L112)

Since v4.0.0

## Error (type alias)

Decoded error value type for an event definition.

**Signature**

```ts
type Error<A> = Schema.Schema.Type<ErrorSchema<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L162)

Since v4.0.0

## ErrorSchema (type alias)

Extracts the error schema from an event definition.

**Signature**

```ts
type ErrorSchema<A> = A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error> ? _Error : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L148)

Since v4.0.0

## ErrorWithTag (type alias)

Decoded error value type for the event in a union with the specified tag.

**Signature**

```ts
type ErrorWithTag<Events, Tag> = Error<WithTag<Events, Tag>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L362)

Since v4.0.0

## Event (interface)

Definition of an event type that can be written to an `EventLog`.

**Details**

An event definition contains its tag, primary-key function, payload schema,
MessagePack payload schema, success schema, and error schema.

**Signature**

```ts
export interface Event<
  out Tag extends string,
  in out Payload extends Schema.Top = typeof Schema.Void,
  in out Success extends Schema.Top = typeof Schema.Void,
  in out Error extends Schema.Top = typeof Schema.Never
> {
  readonly [TypeId]: TypeId
  readonly tag: Tag
  readonly primaryKey: (payload: Schema.Schema.Type<Payload>) => string
  readonly payload: Payload
  readonly payloadMsgPack: Msgpack.schema<Payload>
  readonly success: Success
  readonly error: Error
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L53)

Since v4.0.0

## EventHandler (interface)

Marker service associated with the handler for an event tag.

**Details**

`ToService` derives this service from an `Event` so handler layers can expose
which events they implement.

**Signature**

```ts
export interface EventHandler<in out Tag extends string> {
  readonly _: unique symbol
  readonly tag: Tag
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L79)

Since v4.0.0

## ExcludeTag (type alias)

Removes event definitions with the specified tag from an event union.

**Signature**

```ts
type ExcludeTag<Events, Tag> = Exclude<Events, { readonly tag: Tag }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L338)

Since v4.0.0

## Payload (type alias)

Decoded payload value type for an event definition.

**Signature**

```ts
type Payload<A> = Schema.Schema.Type<PayloadSchema<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L213)

Since v4.0.0

## PayloadSchema (type alias)

Extracts the payload schema from an event definition.

**Signature**

```ts
type PayloadSchema<A> = A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error> ? _Payload : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L185)

Since v4.0.0

## PayloadSchemaWithTag (type alias)

Extracts the payload schema for the event in a union with the specified tag.

**Signature**

```ts
type PayloadSchemaWithTag<A, Tag> =
  A extends Event<Tag, infer _Payload, infer _Success, infer _Error> ? _Payload : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L199)

Since v4.0.0

## PayloadWithTag (type alias)

Decoded payload value type for the event in a union with the specified tag.

**Signature**

```ts
type PayloadWithTag<Events, Tag> = Payload<WithTag<Events, Tag>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L346)

Since v4.0.0

## Services (type alias)

All schema services required to encode and decode the payload, success, and
error schemas for an event definition.

**Signature**

```ts
type Services<A> =
  A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error>
    ?
        | _Payload["DecodingServices"]
        | _Success["EncodingServices"]
        | _Error["EncodingServices"]
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Error["DecodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L310)

Since v4.0.0

## ServicesClient (type alias)

Schema services required by a client for an event definition.

**Details**

This includes payload encoding services plus success and error decoding
services.

**Signature**

```ts
type ServicesClient<A> =
  A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error>
    ? _Payload["EncodingServices"] | _Success["DecodingServices"] | _Error["DecodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L270)

Since v4.0.0

## ServicesClientWithTag (type alias)

Client-side schema services required for the event in a union with the specified
tag.

**Signature**

```ts
type ServicesClientWithTag<Events, Tag> = ServicesClient<WithTag<Events, Tag>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L371)

Since v4.0.0

## ServicesServer (type alias)

Schema services required by a server for an event definition.

**Details**

This includes payload decoding services plus success and error encoding
services.

**Signature**

```ts
type ServicesServer<A> =
  A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error>
    ? _Payload["DecodingServices"] | _Success["EncodingServices"] | _Error["EncodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L292)

Since v4.0.0

## Success (type alias)

Decoded success value type for an event definition.

**Signature**

```ts
type Success<A> = Schema.Schema.Type<SuccessSchema<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L257)

Since v4.0.0

## SuccessSchema (type alias)

Extracts the success schema from an event definition.

**Signature**

```ts
type SuccessSchema<A> = A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error> ? _Success : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L243)

Since v4.0.0

## SuccessWithTag (type alias)

Decoded success value type for the event in a union with the specified tag.

**Signature**

```ts
type SuccessWithTag<Events, Tag> = Success<WithTag<Events, Tag>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L354)

Since v4.0.0

## Tag (type alias)

Extracts the tag string from an event definition.

**Signature**

```ts
type Tag<A> = A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error> ? _Tag : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L134)

Since v4.0.0

## TaggedPayload (type alias)

Tagged payload value for an event definition.

**Details**

The result contains `_tag` set to the event tag and `payload` set to the
decoded payload value.

**Signature**

```ts
type TaggedPayload<A> =
  A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error>
    ? {
        readonly _tag: _Tag
        readonly payload: Schema.Schema.Type<_Payload>
      }
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L226)

Since v4.0.0

## ToService (type alias)

Derives the handler service marker for an event definition.

**Signature**

```ts
type ToService<A> =
  A extends Event<infer _Tag, infer _Payload, infer _Success, infer _Error> ? EventHandler<_Tag> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L120)

Since v4.0.0

## WithTag (type alias)

Extracts the event definition with the specified tag from an event union.

**Signature**

```ts
type WithTag<Events, Tag> = Extract<Events, { readonly tag: Tag }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L330)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark event log event definitions.

**Signature**

```ts
declare const TypeId: "~effect/eventlog/Event"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L32)

Since v4.0.0

## TypeId (type alias)

Unique type identifier used to mark event log event definitions.

**Signature**

```ts
type TypeId = "~effect/eventlog/Event"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Event.ts#L24)

Since v4.0.0
