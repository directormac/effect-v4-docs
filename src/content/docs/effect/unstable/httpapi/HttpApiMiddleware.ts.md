---
title: HttpApiMiddleware.ts
nav_order: 274
parent: "effect"
---

## HttpApiMiddleware.ts overview

---

## Exports Grouped by Category

- [SchemaError transform](#schemaerror-transform)
  - [layerSchemaErrorTransform](#layerschemaerrortransform)
- [client](#client)
  - [layerClient](#layerclient)
- [guards](#guards)
  - [isSecurity](#issecurity)
- [models](#models)
  - [AnyId (interface)](#anyid-interface)
  - [AnyService (interface)](#anyservice-interface)
  - [AnyServiceSecurity (interface)](#anyservicesecurity-interface)
  - [ApplyServices (type alias)](#applyservices-type-alias)
  - [ClientError (type alias)](#clienterror-type-alias)
  - [Error (type alias)](#error-type-alias)
  - [ErrorSchema (type alias)](#errorschema-type-alias)
  - [ErrorServicesDecode (type alias)](#errorservicesdecode-type-alias)
  - [ErrorServicesEncode (type alias)](#errorservicesencode-type-alias)
  - [ForClient (interface)](#forclient-interface)
  - [HttpApiMiddleware (type alias)](#httpapimiddleware-type-alias)
  - [HttpApiMiddlewareClient (interface)](#httpapimiddlewareclient-interface)
  - [HttpApiMiddlewareSecurity (type alias)](#httpapimiddlewaresecurity-type-alias)
  - [MiddlewareClient (type alias)](#middlewareclient-type-alias)
  - [Provides (type alias)](#provides-type-alias)
  - [Requires (type alias)](#requires-type-alias)
- [schemas](#schemas)
  - [Service](#service)
  - [ServiceClass (type alias)](#serviceclass-type-alias)

---

# SchemaError transform

## layerSchemaErrorTransform

Creates a middleware layer that transforms `HttpApiSchemaError` failures.

**Details**

The middleware catches schema errors produced while running an endpoint and uses
the supplied `transform` function to convert them into the middleware's declared
error schema.

**Example** (Mapping schema errors to custom errors)

```ts
import { Effect, Schema } from "effect"
import { HttpApiMiddleware } from "effect/unstable/httpapi"

export class CustomError extends Schema.TaggedErrorClass<CustomError>()("CustomError", {}) {}

export class ErrorHandler extends HttpApiMiddleware.Service<ErrorHandler>()("api/ErrorHandler", {
  error: CustomError
}) {}

export const ErrorHandlerLayer = HttpApiMiddleware.layerSchemaErrorTransform(ErrorHandler, (schemaError) =>
  Effect.log("Got SchemaError", schemaError).pipe(Effect.andThen(Effect.fail(new CustomError())))
)
```

**Signature**

```ts
declare const layerSchemaErrorTransform: <Id, E extends ErrorConstraint, Requires>(
  service: Context.Service<Id, HttpApiMiddleware<never, E, Requires>>,
  transform: (
    error: HttpApiSchemaError,
    context: { readonly endpoint: HttpApiEndpoint.AnyWithProps; readonly group: HttpApiGroup.AnyWithProps }
  ) => Effect.Effect<
    HttpServerResponse,
    ErrorSchemaFromConstraint<E>["Type"] | HttpApiSchemaError,
    Requires | HttpRouter.Provided
  >
) => Layer.Layer<Id>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L419)

Since v4.0.0

# client

## layerClient

Provides a client-side middleware implementation for a middleware that is required by generated clients.

**Details**

The layer captures the surrounding services and makes the middleware available
through the `ForClient` service marker used by HTTP API clients.

**Signature**

```ts
declare const layerClient: <Id extends AnyId, S, R, EX = never, RX = never>(
  tag: Context.Key<Id, S>,
  service:
    | HttpApiMiddlewareClient<Error<Id>, Id[typeof TypeId]["clientError"], R>
    | Effect.Effect<HttpApiMiddlewareClient<Error<Id>, Id[typeof TypeId]["clientError"], R>, EX, RX>
) => Layer.Layer<ForClient<Id>, EX, R | Exclude<RX, Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L454)

Since v4.0.0

# guards

## isSecurity

Returns `true` when an HTTP API middleware service is security middleware.

**Signature**

```ts
declare const isSecurity: (u: AnyService) => u is AnyServiceSecurity
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L44)

Since v4.0.0

# models

## AnyId (interface)

Type-level identifier carried by middleware services to track provided services, required services, errors, client errors, and client requirements.

**Signature**

```ts
export interface AnyId {
  readonly [TypeId]: {
    readonly provides: any
    readonly requires: any
    readonly error: ErrorConstraint
    readonly clientError: any
    readonly requiredForClient: boolean
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L167)

Since v4.0.0

## AnyService (interface)

Base service key shape for HTTP API middleware services, including provided services, declared error schemas, and client requirements.

**Signature**

```ts
export interface AnyService extends Context.Key<any, any> {
  readonly [TypeId]: typeof TypeId
  readonly provides: any
  readonly error: ReadonlySet<Schema.Top>
  readonly requiredForClient: boolean
  readonly "~ClientError": any
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L142)

Since v4.0.0

## AnyServiceSecurity (interface)

Middleware service key shape for security middleware, including the security schemes handled by the service.

**Signature**

```ts
export interface AnyServiceSecurity extends AnyService {
  readonly [SecurityTypeId]: typeof SecurityTypeId
  readonly security: Record<string, HttpApiSecurity.HttpApiSecurity>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L156)

Since v4.0.0

## ApplyServices (type alias)

Applies a middleware's service changes to an existing requirement type by removing services it provides and adding services it requires.

**Signature**

```ts
type ApplyServices<A, R> = Exclude<R, Provides<A>> | Requires<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L199)

Since v4.0.0

## ClientError (type alias)

Extracts the client-side error type for middleware that is required on generated clients.

**Signature**

```ts
type ClientError<A> = A extends {
  readonly [TypeId]: {
    readonly clientError: infer CE
    readonly requiredForClient: true
  }
}
  ? CE
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L224)

Since v4.0.0

## Error (type alias)

Extracts the decoded error type declared by a middleware identifier.

**Signature**

```ts
type Error<A> = ErrorSchema<A>["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L216)

Since v4.0.0

## ErrorSchema (type alias)

Extracts the schema or schema union used for errors declared by a middleware identifier.

**Signature**

```ts
type ErrorSchema<A> = A extends { readonly [TypeId]: { readonly error: infer E } }
  ? ErrorSchemaFromConstraint<E>
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L207)

Since v4.0.0

## ErrorServicesDecode (type alias)

Extracts the schema services required to decode errors declared by a middleware identifier.

**Signature**

```ts
type ErrorServicesDecode<A> = ErrorSchema<A>["DecodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L259)

Since v4.0.0

## ErrorServicesEncode (type alias)

Extracts the schema services required to encode errors declared by a middleware identifier.

**Signature**

```ts
type ErrorServicesEncode<A> = ErrorSchema<A>["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L251)

Since v4.0.0

## ForClient (interface)

Client-side service marker required when a middleware declares `requiredForClient`.

**Signature**

```ts
export interface ForClient<Id> {
  readonly _: unique symbol
  readonly id: Id
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L131)

Since v4.0.0

## HttpApiMiddleware (type alias)

Server-side middleware function for an HTTP API endpoint.

**Details**

It receives the endpoint response effect and endpoint/group metadata, and returns
a new response effect that may require additional services and fail with the
middleware's declared error schema.

**Signature**

```ts
type HttpApiMiddleware<Provides, E, Requires> = (
  httpEffect: Effect.Effect<HttpServerResponse, unhandled, Provides>,
  options: {
    readonly endpoint: HttpApiEndpoint.AnyWithProps
    readonly group: HttpApiGroup.AnyWithProps
  }
) => Effect.Effect<HttpServerResponse, unhandled | ErrorSchemaFromConstraint<E>["Type"], Requires | HttpRouter.Provided>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L64)

Since v4.0.0

## HttpApiMiddlewareClient (interface)

Client-side middleware function for generated HTTP API clients.

**Details**

It receives endpoint/group metadata, the outgoing request, and a `next` function
for continuing the request pipeline.

**Signature**

```ts
export interface HttpApiMiddlewareClient<_E, CE, R> {
  (options: {
    readonly endpoint: HttpApiEndpoint.AnyWithProps
    readonly group: HttpApiGroup.AnyWithProps
    readonly request: HttpClientRequest.HttpClientRequest
    readonly next: (
      request: HttpClientRequest.HttpClientRequest
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.HttpClientError>
  }): Effect.Effect<HttpClientResponse.HttpClientResponse, CE | HttpClientError.HttpClientError, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L114)

Since v4.0.0

## HttpApiMiddlewareSecurity (type alias)

Server-side middleware implementations for one or more security schemes.

**Details**

Each property handles the credential decoded for that scheme and wraps the
endpoint response effect with the middleware's declared requirements and errors.

**Signature**

```ts
type HttpApiMiddlewareSecurity<Security, Provides, E, Requires> = {
  readonly [K in keyof Security]: (
    httpEffect: Effect.Effect<HttpServerResponse, unhandled, Provides>,
    options: {
      readonly credential: HttpApiSecurity.HttpApiSecurity.Type<Security[K]>
      readonly endpoint: HttpApiEndpoint.AnyWithProps
      readonly group: HttpApiGroup.AnyWithProps
    }
  ) => Effect.Effect<
    HttpServerResponse,
    unhandled | ErrorSchemaFromConstraint<E>["Type"],
    Requires | HttpRouter.Provided
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L83)

Since v4.0.0

## MiddlewareClient (type alias)

Computes the client-side service marker required for middleware that must also run in generated clients.

**Signature**

```ts
type MiddlewareClient<A> = A extends {
  readonly [TypeId]: {
    readonly requiredForClient: true
  }
}
  ? ForClient<A>
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L238)

Since v4.0.0

## Provides (type alias)

Extracts the services provided by a middleware identifier.

**Signature**

```ts
type Provides<A> = A extends { readonly [TypeId]: { readonly provides: infer P } } ? P : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L183)

Since v4.0.0

## Requires (type alias)

Extracts the services required to run a middleware implementation.

**Signature**

```ts
type Requires<A> = A extends { readonly [TypeId]: { readonly requires: infer R } } ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L191)

Since v4.0.0

# schemas

## Service

Creates a `Context.Service` class for an HTTP API middleware implementation.

**When to use**

Use when you need an HTTP API middleware service whose configuration declares
required services, provided services, typed error schemas, security schemes,
client errors, or a matching client middleware requirement.

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
  const Id extends string,
  const Error extends ErrorConstraint = never,
  const Security extends Record<string, HttpApiSecurity.HttpApiSecurity> = never,
  RequiredForClient extends boolean = false
>(
  id: Id,
  options?:
    | {
        readonly error?: Error | undefined
        readonly security?: Security | undefined
        readonly requiredForClient?: RequiredForClient | undefined
      }
    | undefined
) => ServiceClass<
  Self,
  Id,
  {
    requires: "requires" extends keyof Config ? Config["requires"] : never
    provides: "provides" extends keyof Config ? Config["provides"] : never
    error: Error
    clientError: "clientError" extends keyof Config ? Config["clientError"] : never
    requiredForClient: RequiredForClient
    security: Security
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L320)

Since v4.0.0

## ServiceClass (type alias)

Class type produced by `Service` for an HTTP API middleware service.

**Details**

It combines a `Context.Service` class with the middleware metadata used by
endpoints, builders, and generated clients.

**Signature**

```ts
type ServiceClass<Self, Id, Config, Service> = Context.Service<Self, Service> & {
  new (_: never): Context.ServiceClass.Shape<Id, Service> & {
    readonly [TypeId]: {
      readonly error: Config["error"]
      readonly requires: Config["requires"]
      readonly provides: Config["provides"]
      readonly clientError: Config["clientError"]
      readonly requiredForClient: Config["requiredForClient"]
    }
  }
  readonly [TypeId]: typeof TypeId
  readonly error: ReadonlySet<Schema.Top>
  readonly requiredForClient: Config["requiredForClient"]
  readonly "~ClientError": Config["clientError"]
} & ([keyof Config["security"]] extends [never]
    ? {}
    : {
        readonly [SecurityTypeId]: typeof SecurityTypeId
        readonly security: Config["security"]
      })
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiMiddleware.ts#L272)

Since v4.0.0
