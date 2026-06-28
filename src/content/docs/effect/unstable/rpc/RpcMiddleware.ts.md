---
title: RpcMiddleware.ts
nav_order: 317
parent: "effect"
---

## RpcMiddleware.ts overview

Middleware services for the unstable RPC runtime.

A middleware service wraps server handler execution and can also install a
client-side wrapper for generated clients. Its metadata records the services
provided to downstream handlers, the services required by the middleware
implementation, the schema for server-visible failures, the client-only error
type, and whether generated clients must require the matching client layer.

Since v4.0.0

---

## Exports Grouped by Category

- [client](#client)
  - [layerClient](#layerclient)
- [constructors](#constructors)
  - [Service](#service)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnyId (interface)](#anyid-interface)
  - [AnyService (interface)](#anyservice-interface)
  - [AnyServiceWithProps (interface)](#anyservicewithprops-interface)
  - [ApplyServices (type alias)](#applyservices-type-alias)
  - [Error (type alias)](#error-type-alias)
  - [ErrorSchema (type alias)](#errorschema-type-alias)
  - [ErrorServicesDecode (type alias)](#errorservicesdecode-type-alias)
  - [ErrorServicesEncode (type alias)](#errorservicesencode-type-alias)
  - [ForClient (interface)](#forclient-interface)
  - [Provides (type alias)](#provides-type-alias)
  - [Requires (type alias)](#requires-type-alias)
  - [RpcMiddleware (interface)](#rpcmiddleware-interface)
  - [RpcMiddlewareClient (interface)](#rpcmiddlewareclient-interface)
  - [ServiceClass (interface)](#serviceclass-interface)
  - [SuccessValue (interface)](#successvalue-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# client

## layerClient

Provides the client-side implementation for an RPC middleware service,
capturing the layer's environment and merging it into each middleware
invocation.

**Signature**

```ts
declare const layerClient: <Id extends AnyId, S, R, EX = never, RX = never>(
  tag: Context.Key<Id, S>,
  service:
    | RpcMiddlewareClient<Id[TypeId]["error"]["Type"], Id[TypeId]["clientError"], R>
    | Effect.Effect<RpcMiddlewareClient<Id[TypeId]["error"]["Type"], Id[TypeId]["clientError"], R>, EX, RX>
) => Layer.Layer<ForClient<Id>, EX, R | Exclude<RX, Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L324)

Since v4.0.0

# constructors

## Service

Creates a typed RPC middleware service class, with optional service
requirements, provided services, error schema, and client-side requirement
metadata.

**Signature**

```ts
declare const Service: <
  Self,
  Config extends { requires?: any; provides?: any; clientError?: any } = {
    requires: never
    provides: never
    clientError: never
  }
>() => <
  const Name extends string,
  Error extends Schema.Top = Schema.Never,
  const RequiredForClient extends boolean = false
>(
  id: Name,
  options?:
    | { readonly error?: Error | undefined; readonly requiredForClient?: RequiredForClient | undefined }
    | undefined
) => ServiceClass<
  Self,
  Name,
  "provides" extends keyof Config ? Config["provides"] : never,
  Error,
  "clientError" extends keyof Config ? Config["clientError"] : never,
  "requires" extends keyof Config ? Config["requires"] : never,
  RequiredForClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L258)

Since v4.0.0

# models

## Any (interface)

An erased server-side RPC middleware function, useful when the concrete
provided services, errors, and requirements are not needed.

**Signature**

```ts
export interface Any {
  (
    effect: Effect.Effect<SuccessValue, any, any>,
    options: {
      readonly client: Rpc.ServerClient
      readonly requestId: RequestId
      readonly rpc: Rpc.AnyWithProps
      readonly payload: unknown
      readonly headers: Headers
    }
  ): Effect.Effect<SuccessValue, any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L105)

Since v4.0.0

## AnyId (interface)

A type-level carrier for RPC middleware metadata, including provided
services, required services, error schema, and client error type.

**Signature**

```ts
export interface AnyId {
  readonly [TypeId]: {
    readonly provides: any
    readonly requires: any
    readonly error: Schema.Top
    readonly clientError: any
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L125)

Since v4.0.0

## AnyService (interface)

An erased RPC middleware context key carrying middleware metadata.

**Signature**

```ts
export interface AnyService extends Context.Key<any, any> {
  readonly [TypeId]: typeof TypeId
  readonly error: Schema.Top
  readonly requiredForClient: boolean
  readonly "~ClientError": any
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L229)

Since v4.0.0

## AnyServiceWithProps (interface)

An erased RPC middleware context key whose service value is a server-side
middleware function.

**Signature**

```ts
export interface AnyServiceWithProps extends Context.Key<any, RpcMiddleware<any, any, any>> {
  readonly [TypeId]: typeof TypeId
  readonly error: Schema.Top
  readonly requiredForClient: boolean
  readonly "~ClientError": any
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L243)

Since v4.0.0

## ApplyServices (type alias)

Applies a middleware's service transformation to an RPC environment by
removing services the middleware provides and adding services it requires.

**Signature**

```ts
type ApplyServices<A, R> = Exclude<R, Provides<A>> | Requires<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L187)

Since v4.0.0

## Error (type alias)

Extracts the decoded error type produced by an RPC middleware.

**Signature**

```ts
type Error<A> = ErrorSchema<A>["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L205)

Since v4.0.0

## ErrorSchema (type alias)

Extracts the error schema associated with an RPC middleware.

**Signature**

```ts
type ErrorSchema<A> = A extends { readonly [TypeId]: { readonly error: infer E } }
  ? E extends Schema.Constraint
    ? E
    : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L195)

Since v4.0.0

## ErrorServicesDecode (type alias)

Extracts the decoding services required by a middleware's error schema.

**Signature**

```ts
type ErrorServicesDecode<A> = ErrorSchema<A>["DecodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L221)

Since v4.0.0

## ErrorServicesEncode (type alias)

Extracts the encoding services required by a middleware's error schema.

**Signature**

```ts
type ErrorServicesEncode<A> = ErrorSchema<A>["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L213)

Since v4.0.0

## ForClient (interface)

Marker service requirement indicating that a middleware has a client-side
implementation available for an RPC client.

**Signature**

```ts
export interface ForClient<Id> {
  readonly _: unique symbol
  readonly id: Id
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L93)

Since v4.0.0

## Provides (type alias)

Extracts the services provided by an RPC middleware.

**Signature**

```ts
type Provides<A> = A extends { readonly [TypeId]: { readonly provides: infer P } } ? P : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L170)

Since v4.0.0

## Requires (type alias)

Extracts the services required by an RPC middleware.

**Signature**

```ts
type Requires<A> = A extends { readonly [TypeId]: { readonly requires: infer R } } ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L178)

Since v4.0.0

## RpcMiddleware (interface)

The server-side RPC middleware function shape, wrapping a handler effect with
access to request metadata and translating provided services into required
services.

**Signature**

```ts
export interface RpcMiddleware<Provides, E, Requires> {
  (
    effect: Effect.Effect<SuccessValue, E | unhandled, Provides>,
    options: {
      readonly client: Rpc.ServerClient
      readonly requestId: RequestId
      readonly rpc: Rpc.AnyWithProps
      readonly payload: unknown
      readonly headers: Headers
    }
  ): Effect.Effect<SuccessValue, unhandled | E, Requires | Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L47)

Since v4.0.0

## RpcMiddlewareClient (interface)

The client-side RPC middleware function shape, allowing outgoing requests to
be inspected or modified before calling `next`.

**Signature**

```ts
export interface RpcMiddlewareClient<E, CE, R> {
  (options: {
    readonly rpc: Rpc.AnyWithProps
    readonly request: Request<Rpc.Any>
    readonly next: (request: Request<Rpc.Any>) => Effect.Effect<SuccessValue, unhandled | E>
  }): Effect.Effect<SuccessValue, unhandled | E | CE, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L78)

Since v4.0.0

## ServiceClass (interface)

The `Context.Service` class shape created for an RPC middleware, including
its error schema, service metadata, and client-side requirement marker.

**Signature**

```ts
export interface ServiceClass<
  Self,
  Name extends string,
  Provides,
  E extends Schema.Constraint,
  ClientError,
  Requires,
  RequiredForClient extends boolean
> extends Context.Service<Self, RpcMiddleware<Provides, E["Type"], Requires>> {
  new (_: never): Context.ServiceClass.Shape<Name, RpcMiddleware<Provides, E["Type"], Requires>> & {
    readonly [TypeId]: {
      readonly error: E
      readonly provides: Provides
      readonly requires: Requires
      readonly clientError: ClientError
    }
  }
  readonly [TypeId]: typeof TypeId
  readonly error: E
  readonly requiredForClient: RequiredForClient
  readonly "~ClientError": ClientError
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L141)

Since v4.0.0

## SuccessValue (interface)

Marker success type used by RPC middleware to represent successful completion
without exposing the handler's concrete success value.

**Signature**

```ts
export interface SuccessValue {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L67)

Since v4.0.0

# type IDs

## TypeId

The runtime type id used to attach and inspect RPC middleware metadata.

**Signature**

```ts
declare const TypeId: "~effect/rpc/RpcMiddleware"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L37)

Since v4.0.0

## TypeId (type alias)

The literal type id used to identify RPC middleware service classes.

**Signature**

```ts
type TypeId = "~effect/rpc/RpcMiddleware"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMiddleware.ts#L29)

Since v4.0.0
