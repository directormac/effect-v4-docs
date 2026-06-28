---
title: Rpc.ts
nav_order: 312
parent: "effect"
---

## Rpc.ts overview

Defines schema-backed contracts for individual RPC procedures.

An `Rpc` describes one remote procedure by recording its tag, payload schema,
success schema, error schema, defect schema, middleware, and annotations.
Clients and servers read the same declaration, so the procedure contract is
independent of the transport used to call it. This module includes
constructors, type helpers for deriving client and handler shapes, exit
schemas, and handler wrappers for special execution modes.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [Custom (interface)](#custom-interface)
  - [custom](#custom)
  - [exitSchema](#exitschema)
  - [make](#make)
- [guards](#guards)
  - [isRpc](#isrpc)
- [models](#models)
  - [AddError (type alias)](#adderror-type-alias)
  - [AddMiddleware (type alias)](#addmiddleware-type-alias)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (interface)](#anywithprops-interface)
  - [DefectSchema (interface)](#defectschema-interface)
  - [Error (type alias)](#error-type-alias)
  - [ErrorExit (type alias)](#errorexit-type-alias)
  - [ErrorExitSchema (type alias)](#errorexitschema-type-alias)
  - [ErrorSchema (type alias)](#errorschema-type-alias)
  - [ExcludeProvides (type alias)](#excludeprovides-type-alias)
  - [Exit (type alias)](#exit-type-alias)
  - [ExtractProvides (type alias)](#extractprovides-type-alias)
  - [ExtractRequires (type alias)](#extractrequires-type-alias)
  - [ExtractTag (type alias)](#extracttag-type-alias)
  - [Handler (interface)](#handler-interface)
  - [IsStream (type alias)](#isstream-type-alias)
  - [Middleware (type alias)](#middleware-type-alias)
  - [MiddlewareClient (type alias)](#middlewareclient-type-alias)
  - [Payload (type alias)](#payload-type-alias)
  - [PayloadConstructor (type alias)](#payloadconstructor-type-alias)
  - [Prefixed (type alias)](#prefixed-type-alias)
  - [ResultFrom (type alias)](#resultfrom-type-alias)
  - [Rpc (interface)](#rpc-interface)
  - [ServerClient (class)](#serverclient-class)
    - [annotate (method)](#annotate-method)
    - [id (property)](#id-property)
    - [annotations (property)](#annotations-property)
  - [Services (type alias)](#services-type-alias)
  - [ServicesClient (type alias)](#servicesclient-type-alias)
  - [ServicesServer (type alias)](#servicesserver-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [SuccessChunk (type alias)](#successchunk-type-alias)
  - [SuccessEncoded (type alias)](#successencoded-type-alias)
  - [SuccessExit (type alias)](#successexit-type-alias)
  - [SuccessExitSchema (type alias)](#successexitschema-type-alias)
  - [SuccessSchema (type alias)](#successschema-type-alias)
  - [Tag (type alias)](#tag-type-alias)
  - [ToHandler (type alias)](#tohandler-type-alias)
  - [ToHandlerFn (type alias)](#tohandlerfn-type-alias)
- [utils](#utils)
  - [Custom (namespace)](#custom-namespace)
    - [Out (interface)](#out-interface)
    - [OutDefault (type alias)](#outdefault-type-alias)
    - [Kind (type alias)](#kind-type-alias)
- [wrapping](#wrapping)
  - [Wrapper (interface)](#wrapper-interface)
  - [WrapperOr (type alias)](#wrapperor-type-alias)
  - [fork](#fork)
  - [isWrapper](#iswrapper)
  - [uninterruptible](#uninterruptible)
  - [unwrap](#unwrap)
  - [wrap](#wrap)
  - [wrapMap](#wrapmap)

---

# constructors

## Custom (interface)

Defines the type-level contract for an RPC custom constructor.

**Details**

A custom constructor receives the original success, error, and defect schemas
and returns transformed output schemas through `out`.

**Signature**

```ts
export interface Custom {
  readonly out: Custom.OutDefault
  readonly success: Schema.Top
  readonly error: Schema.Top
  readonly defect: DefectSchema
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1053)

Since v4.0.0

## custom

Creates a custom `Rpc` constructor that can transform the output schemas.

**Example** (Defining a paginated RPC constructor)

```ts
import { Schema } from "effect"
import { Rpc } from "effect/unstable/rpc"

// Create a custom Rpc wrapper definition by transforming the success and error
// schemas.
export interface RpcWithPagination extends Rpc.Custom {
  readonly out: Rpc.Custom.Out<Paginated<this["success"]>, this["error"]>
}

// The type definition for the transformed success schema.
export interface Paginated<S extends Schema.Constraint> extends Schema.Struct<{
  readonly offset: Schema.Number
  readonly total: Schema.Number
  readonly results: Schema.$Array<S>
}> {}

// You can then implement the schema transformation using `Rpc.custom`
export const makePaginated = Rpc.custom<RpcWithPagination>((schemas) => ({
  ...schemas,
  success: Schema.Struct({
    offset: Schema.Number,
    total: Schema.Number,
    results: Schema.Array(schemas.success)
  })
}))

// You can then use the custom constructor in the same way `Rpc.make` is used.
export const listAllRpc = makePaginated("listAll", {
  success: Schema.String
})
```

**Signature**

```ts
declare const custom: <Def extends Custom>(
  f: (options: Custom.OutDefault) => (Def & Custom.OutDefault)["out"]
) => <
  const Tag extends string,
  Payload extends Schema.Top | Schema.Struct.Fields = Schema.Void,
  Success extends Schema.Top = Schema.Void,
  Error extends Schema.Top = Schema.Never,
  const Stream extends boolean = false,
  Out extends Custom.OutDefault = Custom.Kind<Def, Success, Error>
>(
  tag: Tag,
  options?: {
    readonly payload?: Payload
    readonly success?: Success
    readonly error?: Error
    readonly defect?: DefectSchema
    readonly stream?: Stream
    readonly primaryKey?: [Payload] extends [Schema.Struct.Fields]
      ? (
          payload: Payload extends Schema.Struct.Fields
            ? Struct.Simplify<Schema.Struct<Payload>["Type"]>
            : Payload["Type"]
        ) => string
      : never
  }
) => Rpc<
  Tag,
  Payload extends Schema.Struct.Fields ? Schema.Struct<Payload> : Payload,
  Stream extends true ? RpcSchema.Stream<Out["success"], Out["error"]> : Out["success"],
  Stream extends true ? typeof Schema.Never : Out["error"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1000)

Since v4.0.0

## exitSchema

Builds the `Schema.Exit` used to encode and decode RPC results.

**Details**

The failure side includes the RPC error schema, middleware error schemas, and
stream error schema for streaming RPCs. Streaming RPCs use `Schema.Void` for
the exit success value. The schema is cached per RPC definition.

**Signature**

```ts
declare const exitSchema: <R extends Any>(
  self: R
) => Schema.Exit<SuccessExitSchema<R>, ErrorExitSchema<R>, DefectSchema>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1121)

Since v4.0.0

## make

Creates an RPC definition with the supplied tag and optional schemas.

**Details**

Payload options can be either a schema or struct fields. `stream: true` wraps
the success and error schemas in a stream schema and sets the normal error
schema to `Schema.Never`. `primaryKey` creates a payload class with a
primary key derived from the payload value.

**Signature**

```ts
declare const make: <
  const Tag extends string,
  Payload extends Schema.Top | Schema.Struct.Fields = Schema.Void,
  Success extends Schema.Top = Schema.Void,
  Error extends Schema.Top = Schema.Never,
  const Stream extends boolean = false
>(
  tag: Tag,
  options?: {
    readonly payload?: Payload
    readonly success?: Success
    readonly error?: Error
    readonly defect?: DefectSchema
    readonly stream?: Stream
    readonly primaryKey?: [Payload] extends [Schema.Struct.Fields]
      ? (
          payload: Payload extends Schema.Struct.Fields
            ? Struct.Simplify<Schema.Struct<Payload>["Type"]>
            : Payload["Type"]
        ) => string
      : never
  }
) => Rpc<
  Tag,
  Payload extends Schema.Struct.Fields ? Schema.Struct<Payload> : Payload,
  Stream extends true ? RpcSchema.Stream<Success, Error> : Success,
  Stream extends true ? typeof Schema.Never : Error
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L902)

Since v4.0.0

# guards

## isRpc

Returns `true` when the value is an `Rpc` definition.

**Signature**

```ts
declare const isRpc: (u: unknown) => u is Rpc<any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L40)

Since v4.0.0

# models

## AddError (type alias)

Returns an RPC type with an additional error schema unioned into its error
channel.

**Signature**

```ts
type AddError<R, Error> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? Rpc<_Tag, _Payload, _Success, _Error | Error, _Middleware, _Requires>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L562)

Since v4.0.0

## AddMiddleware (type alias)

Returns an RPC type with additional middleware and the corresponding
middleware service requirements applied.

**Signature**

```ts
type AddMiddleware<R, Middleware> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? Rpc<
        _Tag,
        _Payload,
        _Success,
        _Error,
        _Middleware | Middleware,
        RpcMiddleware.ApplyServices<Middleware["Identifier"], _Requires>
      >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L586)

Since v4.0.0

## Any (interface)

An erased RPC definition that preserves the common runtime metadata shared by
all RPCs.

**Signature**

```ts
export interface Any extends Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly _tag: string
  readonly key: string
  readonly annotations: Context.Context<never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L233)

Since v4.0.0

## AnyWithProps (interface)

An erased RPC definition with all schema, middleware, annotation, and service
metadata available.

**Signature**

```ts
export interface AnyWithProps extends Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly _tag: string
  readonly key: string
  readonly payloadSchema: Schema.Top
  readonly successSchema: Schema.Top
  readonly errorSchema: Schema.Top
  readonly defectSchema: Schema.Top
  readonly annotations: Context.Context<never>
  readonly middlewares: ReadonlySet<RpcMiddleware.AnyServiceWithProps>
  readonly "~requires": any
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L247)

Since v4.0.0

## DefectSchema (interface)

Schema for RPC defects.

**Details**

Defect schemas decode and encode without services and can be constructed from
`null`, `undefined`, or an object value.

**Signature**

```ts
export interface DefectSchema extends Schema.Top {
  make(input: null, options?: Schema.MakeOptions): unknown
  make(input: undefined, options?: Schema.MakeOptions): unknown
  make(input: {}, options?: Schema.MakeOptions): unknown
  readonly DecodingServices: never
  readonly EncodingServices: never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L53)

Since v4.0.0

## Error (type alias)

Extracts the decoded error value type from an `Rpc`, including middleware
errors.

**Signature**

```ts
type Error<R> = Schema.Schema.Type<ErrorSchema<R>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L376)

Since v4.0.0

## ErrorExit (type alias)

Extracts the decoded error type used by an RPC exit.

**Details**

For streaming RPCs, this includes both stream errors and RPC errors.

**Signature**

```ts
type ErrorExit<R> = Success<R> extends Stream<infer _A, infer _E, infer _Env> ? _E | Error<R> : Error<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L402)

Since v4.0.0

## ErrorExitSchema (type alias)

Extracts the error schema used in an RPC exit.

**Details**

For streaming RPCs, this includes both the stream error schema and the RPC
error schema; otherwise it is the RPC error schema.

**Signature**

```ts
type ErrorExitSchema<R> =
  SuccessSchema<R> extends RpcSchema.Stream<infer _A, infer _E> ? _E | ErrorSchema<R> : ErrorSchema<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L389)

Since v4.0.0

## ErrorSchema (type alias)

Extracts the RPC error schema, including error schemas contributed by
middleware.

**Signature**

```ts
type ErrorSchema<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Error | _Middleware["error"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L359)

Since v4.0.0

## ExcludeProvides (type alias)

Removes the services provided by middleware for the specified RPC tag from an
environment type.

**Signature**

```ts
type ExcludeProvides<Env, R, Tag> = Exclude<Env, ExtractProvides<R, Tag>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L713)

Since v4.0.0

## Exit (type alias)

The `Exit` type produced for an RPC, using the RPC's exit success and exit
error types.

**Signature**

```ts
type Exit<R> = Exit_<SuccessExit<R>, ErrorExit<R>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L411)

Since v4.0.0

## ExtractProvides (type alias)

Extracts the services provided by middleware on the RPC with the specified
tag.

**Signature**

```ts
type ExtractProvides<R, Tag> =
  R extends Rpc<Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? RpcMiddleware.Provides<_Middleware["Identifier"]>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L680)

Since v4.0.0

## ExtractRequires (type alias)

Extracts the service requirements of the RPC with the specified tag.

**Signature**

```ts
type ExtractRequires<R, Tag> =
  R extends Rpc<Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Requires
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L696)

Since v4.0.0

## ExtractTag (type alias)

Extracts the RPC with the specified tag from an RPC union.

**Signature**

```ts
type ExtractTag<R, Tag> =
  R extends Rpc<Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires> ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L663)

Since v4.0.0

## Handler (interface)

Represents the server-side implementation of an RPC.

**Details**

The handler receives the decoded request plus client, request id, headers,
and RPC metadata, and returns either an effectful result or a stream result.

**Signature**

```ts
export interface Handler<Tag extends string> {
  readonly _: unique symbol
  readonly tag: Tag
  readonly handler: (
    request: any,
    options: {
      readonly client: ServerClient
      readonly requestId: RequestId
      readonly headers: Headers
      readonly rpc: Any
    }
  ) => Effect<{} | Deferred<any, any>, any> | Stream<any, any>
  readonly context: Context.Context<never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L214)

Since v4.0.0

## IsStream (type alias)

Returns `true` when the RPC with the specified tag has a streaming success
schema, or `never` otherwise.

**Signature**

```ts
type IsStream<R, Tag> =
  R extends Rpc<
    Tag,
    infer _Payload,
    RpcSchema.Stream<infer _A, infer _E>,
    infer _Error,
    infer _Middleware,
    infer _Requires
  >
    ? true
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L647)

Since v4.0.0

## Middleware (type alias)

Extracts the service identifiers for middleware attached to an `Rpc`.

**Signature**

```ts
type Middleware<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? Context.Service.Identifier<_Middleware>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L527)

Since v4.0.0

## MiddlewareClient (type alias)

Extracts client-side middleware service requirements for middleware marked as
required on the client.

**Signature**

```ts
type MiddlewareClient<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Middleware extends { readonly requiredForClient: true }
      ? RpcMiddleware.ForClient<_Middleware["Identifier"]>
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L544)

Since v4.0.0

## Payload (type alias)

Extracts the decoded payload type from an `Rpc`.

**Signature**

```ts
type Payload<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Payload["Type"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L436)

Since v4.0.0

## PayloadConstructor (type alias)

Extracts the payload constructor input type accepted by the RPC payload
schema.

**Signature**

```ts
type PayloadConstructor<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Payload["~type.make.in"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L420)

Since v4.0.0

## Prefixed (type alias)

Returns an RPC type with the specified string prefix added to its tag while
preserving its payload, success, error, middleware, and requirements.

**Signature**

```ts
type Prefixed<Rpcs, Prefix> =
  Rpcs extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? Rpc<`${Prefix}${_Tag}`, _Payload, _Success, _Error, _Middleware, _Requires>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L762)

Since v4.0.0

## ResultFrom (type alias)

Computes the allowed handler result type for an RPC.

**Details**

Streaming RPCs may return a stream or an effect that produces a queue. Other
RPCs return an effect that succeeds with the success value or a deferred
success value.

**Signature**

```ts
type ResultFrom<R, Services> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? [_Success] extends [RpcSchema.Stream<infer _SA, infer _SE>]
      ?
          | Stream<_SA["Type"], _SE["Type"] | _Error["Type"], Services>
          | Effect<
              Queue.Dequeue<_SA["Type"], _SE["Type"] | _Error["Type"] | Cause.Done>,
              _SE["Type"] | Schema.Schema.Type<_Error>,
              Services
            >
      : Effect<_Success["Type"] | Deferred<_Success["Type"], _Error["Type"]>, _Error["Type"], Services>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L730)

Since v4.0.0

## Rpc (interface)

Represents a typed RPC definition.

**Details**

An RPC is identified by a tag and carries payload, success, error, defect,
middleware, and annotation metadata used by RPC clients and servers.

**Signature**

```ts
export interface Rpc<
  in out Tag extends string,
  out Payload extends Schema.Top = Schema.Void,
  out Success extends Schema.Top = Schema.Void,
  out Error extends Schema.Top = Schema.Never,
  out Middleware extends RpcMiddleware.AnyService = never,
  out Requires = never
> extends Pipeable {
  new (_: never): {}

  readonly [TypeId]: typeof TypeId
  readonly _tag: Tag
  readonly key: string
  readonly payloadSchema: Payload
  readonly successSchema: Success
  readonly errorSchema: Error
  readonly defectSchema: Schema.Top
  readonly annotations: Context.Context<never>
  readonly middlewares: ReadonlySet<Middleware>
  readonly "~requires": Requires

  /**
   * Set the schema for the success response of the rpc.
   */
  setSuccess<S extends Schema.Top>(schema: S): Rpc<Tag, Payload, S, Error, Middleware, Requires>

  /**
   * Set the schema for the error response of the rpc.
   */
  setError<E extends Schema.Top>(schema: E): Rpc<Tag, Payload, Success, E, Middleware, Requires>

  /**
   * Set the schema for the payload of the rpc.
   */
  setPayload<P extends Schema.Top | Schema.Struct.Fields>(
    schema: P
  ): Rpc<Tag, P extends Schema.Struct.Fields ? Schema.Struct<P> : P, Success, Error, Middleware, Requires>

  /**
   * Add an `RpcMiddleware` to this procedure.
   */
  middleware<M extends RpcMiddleware.AnyService>(
    middleware: M
  ): Rpc<Tag, Payload, Success, Error, Middleware | M, RpcMiddleware.ApplyServices<M["Identifier"], Requires>>

  /**
   * Set the schema for the error response of the rpc.
   */
  prefix<const Prefix extends string>(
    prefix: Prefix
  ): Rpc<`${Prefix}${Tag}`, Payload, Success, Error, Middleware, Requires>

  /**
   * Add an annotation on the rpc.
   */
  annotate<I, S>(tag: Context.Key<I, S>, value: NoInfer<S>): Rpc<Tag, Payload, Success, Error, Middleware, Requires>

  /**
   * Merge the annotations of the rpc with the provided annotations.
   */
  annotateMerge<I>(annotations: Context.Context<I>): Rpc<Tag, Payload, Success, Error, Middleware, Requires>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L72)

Since v4.0.0

## ServerClient (class)

Represents server-side metadata for the client associated with an RPC request.

**When to use**

Use to inspect or annotate the connected client while handling an RPC request
on the server.

**Details**

It stores the client id and request annotations that handlers can read or
extend.

**Signature**

```ts
declare class ServerClient {
  constructor(id: number)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L187)

Since v4.0.0

### annotate (method)

**Signature**

```ts
declare const annotate: <I, S>(tag: Context.Key<I, S>, value: NoInfer<S>) => ServerClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L194)

### id (property)

**Signature**

```ts
readonly id: number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L188)

### annotations (property)

**Signature**

```ts
annotations: Context.Context<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L189)

## Services (type alias)

Extracts all schema services required to encode or decode an RPC's payload,
success, error, and middleware error schemas.

**Signature**

```ts
type Services<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ?
        | _Payload["DecodingServices"]
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Success["EncodingServices"]
        | _Error["DecodingServices"]
        | _Error["EncodingServices"]
        | _Middleware["error"]["DecodingServices"]
        | _Middleware["error"]["EncodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L453)

Since v4.0.0

## ServicesClient (type alias)

Extracts the schema services required on the client side of an RPC.

**Details**

This includes payload encoding services and success, error, and middleware
error decoding services.

**Signature**

```ts
type ServicesClient<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ?
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Error["DecodingServices"]
        | _Middleware["error"]["DecodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L482)

Since v4.0.0

## ServicesServer (type alias)

Extracts the schema services required on the server side of an RPC.

**Details**

This includes payload decoding services and success, error, and middleware
error encoding services.

**Signature**

```ts
type ServicesServer<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ?
        | _Payload["DecodingServices"]
        | _Success["EncodingServices"]
        | _Error["EncodingServices"]
        | _Middleware["error"]["EncodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L507)

Since v4.0.0

## Success (type alias)

Extracts the decoded success value type from an `Rpc`.

**Signature**

```ts
type Success<R> = SuccessSchema<R>["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L298)

Since v4.0.0

## SuccessChunk (type alias)

Extracts the decoded stream element type from a streaming RPC, or `never` for
non-streaming RPCs.

**Signature**

```ts
type SuccessChunk<R> = Success<R> extends Stream<infer _A, infer _E, infer _Env> ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L350)

Since v4.0.0

## SuccessEncoded (type alias)

Extracts the encoded success value type from an `Rpc`.

**Signature**

```ts
type SuccessEncoded<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Success["Encoded"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L306)

Since v4.0.0

## SuccessExit (type alias)

Extracts the decoded success value carried by an RPC exit.

**Details**

For streaming RPCs, the immediate exit success is `void` because stream
elements are delivered separately.

**Signature**

```ts
type SuccessExit<R> = Success<R> extends infer T ? (T extends Stream<infer _A, infer _E, infer _Env> ? void : T) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L340)

Since v4.0.0

## SuccessExitSchema (type alias)

Extracts the success schema used in an RPC exit.

**Details**

For streaming RPCs, this is the stream element schema; otherwise it is the
RPC success schema.

**Signature**

```ts
type SuccessExitSchema<R> = SuccessSchema<R> extends RpcSchema.Stream<infer _A, infer _E> ? _A : SuccessSchema<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L327)

Since v4.0.0

## SuccessSchema (type alias)

Extracts the success schema from an `Rpc`.

**Signature**

```ts
type SuccessSchema<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Success
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L282)

Since v4.0.0

## Tag (type alias)

Extracts the tag string from an `Rpc`.

**Signature**

```ts
type Tag<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? _Tag
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L266)

Since v4.0.0

## ToHandler (type alias)

Converts an RPC definition into the corresponding `Handler` type.

**Signature**

```ts
type ToHandler<R> =
  R extends Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? Handler<_Tag>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L609)

Since v4.0.0

## ToHandlerFn (type alias)

The function signature for implementing an RPC handler.

**Details**

The function receives the decoded payload and request metadata, and returns
the RPC result shape, optionally wrapped with `Wrapper` options.

**Signature**

```ts
type ToHandlerFn<Current, R> = (
  payload: Payload<Current>,
  options: {
    readonly client: ServerClient
    readonly requestId: RequestId
    readonly headers: Headers
    readonly rpc: Current
  }
) => WrapperOr<ResultFrom<Current, R>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L630)

Since v4.0.0

# utils

## Custom (namespace)

Helper types for defining RPC custom constructors.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1065)

Since v4.0.0

### Out (interface)

The transformed schemas produced by a custom RPC constructor.

**Signature**

```ts
export interface Out<Success extends Schema.Constraint, Error extends Schema.Constraint> {
  readonly success: Success
  readonly error: Error
  readonly defect: DefectSchema
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1072)

Since v4.0.0

### OutDefault (type alias)

The default custom-constructor output shape for arbitrary success and error
schemas.

**Signature**

```ts
type OutDefault = Out<Schema.Top, Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1088)

Since v4.0.0

### Kind (type alias)

Applies a custom constructor definition to concrete success and error
schemas and returns its transformed output schema type.

**Signature**

```ts
type Kind<Def, Success, Error> = (Def & {
  readonly success: Success
  readonly error: Error
})["out"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1097)

Since v4.0.0

# wrapping

## Wrapper (interface)

Wraps a handler result with execution options for the RPC server.

**Details**

`fork` requests concurrent execution, and `uninterruptible` requests
uninterruptible execution.

**Signature**

```ts
export interface Wrapper<A> {
  readonly [WrapperTypeId]: typeof WrapperTypeId
  readonly value: A
  readonly fork: boolean
  readonly uninterruptible: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1162)

Since v4.0.0

## WrapperOr (type alias)

A value that may be returned directly or wrapped with RPC server execution
options.

**Signature**

```ts
type WrapperOr<A> = A | Wrapper<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1176)

Since v4.0.0

## fork

Wraps a response Effect or Stream so the RPC server executes it concurrently
regardless of the server concurrency setting.

**Signature**

```ts
declare const fork: <A extends object>(value: A) => Wrapper<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1246)

Since v4.0.0

## isWrapper

Returns `true` when the value is an RPC `Wrapper`.

**Signature**

```ts
declare const isWrapper: (u: object) => u is Wrapper<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1184)

Since v4.0.0

## uninterruptible

Wraps a response Effect or Stream so the RPC server runs it in an uninterruptible region.

**Signature**

```ts
declare const uninterruptible: <A extends object>(value: A) => Wrapper<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1254)

Since v4.0.0

## unwrap

Returns the wrapped response value when the input is an RPC `Wrapper`, or the
input itself when it is already unwrapped.

**Signature**

```ts
declare const unwrap: <A extends object>(value: WrapperOr<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1223)

Since v4.0.0

## wrap

Wraps a handler result with RPC server execution options.

**Details**

When the value is already wrapped, unspecified options are inherited from the
existing wrapper.

**Signature**

```ts
declare const wrap: (options: {
  readonly fork?: boolean | undefined
  readonly uninterruptible?: boolean | undefined
}) => <A extends object>(value: A) => Wrapper<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1197)

Since v4.0.0

## wrapMap

Maps the value inside an RPC wrapper, preserving wrapper options such as
`fork` and `uninterruptible`; unwrapped values are mapped directly.

**Signature**

```ts
declare const wrapMap: <A extends object, B extends object>(self: WrapperOr<A>, f: (value: A) => B) => WrapperOr<B>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Rpc.ts#L1232)

Since v4.0.0
