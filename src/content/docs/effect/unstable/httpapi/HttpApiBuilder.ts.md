---
title: HttpApiBuilder.ts
nav_order: 269
parent: "effect"
---

## HttpApiBuilder.ts overview

Builds server routes from declarative `HttpApi` contracts.

This module turns an `HttpApi` description plus group handlers into
`HttpRouter` routes. At runtime it decodes request parts with schemas, runs
middleware and security handlers, invokes the registered endpoint handler, and
encodes successes or declared errors into `HttpServerResponse` values.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [layer](#layer)
- [handlers](#handlers)
  - [Handlers (interface)](#handlers-interface)
  - [endpoint](#endpoint)
  - [group](#group)
- [security](#security)
  - [securityDecode](#securitydecode)
  - [securitySetCookie](#securitysetcookie)
- [type IDs](#type-ids)
  - [HandlersTypeId](#handlerstypeid)
  - [HandlersTypeId (type alias)](#handlerstypeid-type-alias)
- [utils](#utils)
  - [Handlers (namespace)](#handlers-namespace)
    - [Any (interface)](#any-interface)
    - [Item (type alias)](#item-type-alias)
    - [FromGroup (type alias)](#fromgroup-type-alias)
    - [ValidateReturn (type alias)](#validatereturn-type-alias)
    - [Error (type alias)](#error-type-alias)
    - [Context (type alias)](#context-type-alias)

---

# constructors

## layer

Registers an `HttpApi` with a `HttpRouter`.

**Signature**

```ts
declare const layer: <Id extends string, Groups extends HttpApiGroup.Any>(
  api: HttpApi.HttpApi<Id, Groups>,
  options?: { readonly openapiPath?: `/${string}` | undefined }
) => Layer.Layer<
  never,
  never,
  Etag.Generator | HttpRouter.HttpRouter | FileSystem | HttpPlatform | Path | HttpApiGroup.ToService<Id, Groups>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L62)

Since v4.0.0

# handlers

## Handlers (interface)

Mutable handler collection for one `HttpApi` group.

**Details**

Each call to `handle` or `handleRaw` registers an endpoint implementation and
removes that endpoint from the type-level set of endpoints still requiring
handlers.

**Signature**

```ts
export interface Handlers<R, Endpoints extends HttpApiEndpoint.Any = never> extends Pipeable {
  readonly [HandlersTypeId]: {
    _Endpoints: Covariant<Endpoints>
  }
  readonly group: HttpApiGroup.AnyWithProps
  readonly handlers: Map<string, Handlers.Item<R>>

  /**
   * Add the implementation for an `HttpApiEndpoint` to a `Handlers` group.
   */
  handle<Name extends HttpApiEndpoint.Name<Endpoints>, R1>(
    name: Name,
    handler: HttpApiEndpoint.HandlerWithName<Endpoints, Name, HttpApiEndpoint.ErrorsWithName<Endpoints, Name>, R1>,
    options?: { readonly uninterruptible?: boolean | undefined } | undefined
  ): Handlers<
    | R
    | HttpApiEndpoint.MiddlewareWithName<Endpoints, Name>
    | HttpApiEndpoint.MiddlewareServicesWithName<Endpoints, Name>
    | (HttpApiEndpoint.ExcludeProvidedWithName<
        Endpoints,
        Name,
        R1 | HttpApiEndpoint.ServerServicesWithName<Endpoints, Name>
      > extends infer _R
        ? _R extends never
          ? never
          : HttpRouter.Request<"Requires", _R>
        : never),
    HttpApiEndpoint.ExcludeName<Endpoints, Name>
  >

  /**
   * Add the implementation for an `HttpApiEndpoint` to a `Handlers` group.
   * This version opts out of automatic payload decoding and provides the raw request.
   */
  handleRaw<Name extends HttpApiEndpoint.Name<Endpoints>, R1>(
    name: Name,
    handler: HttpApiEndpoint.HandlerRawWithName<Endpoints, Name, HttpApiEndpoint.ErrorsWithName<Endpoints, Name>, R1>,
    options?: { readonly uninterruptible?: boolean | undefined } | undefined
  ): Handlers<
    | R
    | HttpApiEndpoint.MiddlewareWithName<Endpoints, Name>
    | HttpApiEndpoint.MiddlewareServicesWithName<Endpoints, Name>
    | (HttpApiEndpoint.ExcludeProvidedWithName<
        Endpoints,
        Name,
        R1 | HttpApiEndpoint.ServerServicesWithName<Endpoints, Name>
      > extends infer _R
        ? _R extends never
          ? never
          : HttpRouter.Request<"Requires", _R>
        : never),
    HttpApiEndpoint.ExcludeName<Endpoints, Name>
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L183)

Since v4.0.0

## endpoint

Builds the server-side HTTP effect for a single endpoint in an API group using
the endpoint metadata, middleware, codecs, and supplied handler.

**Signature**

```ts
declare const endpoint: <
  ApiId extends string,
  Groups extends HttpApiGroup.Any,
  const GroupName extends HttpApiGroup.Name<Groups>,
  const EndpointName extends HttpApiEndpoint.Name<HttpApiGroup.Endpoints<HttpApiGroup.WithName<Groups, GroupName>>>,
  R,
  Group extends HttpApiGroup.Any = Extract<Groups, { readonly identifier: GroupName }>,
  Endpoint extends HttpApiEndpoint.Any = Extract<HttpApiGroup.Endpoints<Group>, { readonly name: EndpointName }>
>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  groupName: GroupName,
  endpointName: EndpointName,
  handler: NoInfer<
    HttpApiEndpoint.HandlerWithName<
      HttpApiGroup.Endpoints<HttpApiGroup.WithName<Groups, GroupName>>,
      EndpointName,
      never,
      R
    >
  >
) => Effect.Effect<
  Effect.Effect<
    HttpServerResponse,
    never,
    | HttpServerRequest
    | HttpRouter.RouteContext
    | Request.ParsedSearchParams
    | Exclude<R, HttpApiEndpoint.MiddlewareProvides<Endpoint>>
  >,
  never,
  | HttpApiEndpoint.ServerServices<Endpoint>
  | HttpApiEndpoint.Middleware<Endpoint>
  | HttpApiEndpoint.MiddlewareServices<Endpoint>
  | Etag.Generator
  | FileSystem
  | HttpPlatform
  | Path
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L350)

Since v4.0.0

## group

Create a `Layer` that implements all endpoints in an `HttpApi` group.

**Details**

The `build` function receives an unimplemented `Handlers` instance that can
be used to add handlers to the group. Implement endpoints with
`handlers.handle`.

**Signature**

```ts
declare const group: <
  ApiId extends string,
  Groups extends HttpApiGroup.Any,
  const Name extends HttpApiGroup.Name<Groups>,
  Return
>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  groupName: Name,
  build: (handlers: Handlers.FromGroup<HttpApiGroup.WithName<Groups, Name>>) => Handlers.ValidateReturn<Return>
) => Layer.Layer<
  HttpApiGroup.ApiGroup<ApiId, Name>,
  Handlers.Error<Return>,
  Exclude<Handlers.Context<Return>, Scope.Scope>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L118)

Since v4.0.0

# security

## securityDecode

Decodes credentials for an HTTP API security scheme from the current request,
supporting bearer, API key, and basic authentication inputs.

**Signature**

```ts
declare const securityDecode: <Security extends HttpApiSecurity.HttpApiSecurity>(
  self: Security
) => Effect.Effect<
  HttpApiSecurity.HttpApiSecurity.Type<Security>,
  never,
  HttpServerRequest | Request.ParsedSearchParams
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L407)

Since v4.0.0

## securitySetCookie

Registers a pre-response handler that sets an API-key cookie on the outgoing
response, defaulting the cookie to `secure` and `httpOnly` unless overridden.

**Signature**

```ts
declare const securitySetCookie: (
  self: HttpApiSecurity.ApiKey,
  value: string | Redacted.Redacted,
  options?: Cookie["options"]
) => Effect.Effect<void, never, HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L475)

Since v4.0.0

# type IDs

## HandlersTypeId

Type identifier symbol used to brand `Handlers` values.

**Signature**

```ts
declare const HandlersTypeId: unique symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L161)

Since v4.0.0

## HandlersTypeId (type alias)

Type of the `Handlers` type identifier symbol.

**Signature**

```ts
type HandlersTypeId = typeof HandlersTypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L169)

Since v4.0.0

# utils

## Handlers (namespace)

Namespace containing helper types for `HttpApiBuilder` handler collections.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L238)

Since v4.0.0

### Any (interface)

A `Handlers` value with its context and endpoint types erased.

**Signature**

```ts
export interface Any {
  readonly [HandlersTypeId]: any
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L245)

Since v4.0.0

### Item (type alias)

Record stored for a registered endpoint handler.

**Details**

It keeps the endpoint metadata, handler function, whether raw request handling
is used, and whether the handler should run uninterruptibly.

**Signature**

```ts
type Item<R> = {
  readonly endpoint: HttpApiEndpoint.AnyWithProps
  readonly handler: HttpApiEndpoint.Handler<any, any, R>
  readonly isRaw: boolean
  readonly uninterruptible: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L260)

Since v4.0.0

### FromGroup (type alias)

Creates a handler collection for a group where every endpoint in the group is
still awaiting an implementation.

**Signature**

```ts
type FromGroup<Group> = Handlers<never, HttpApiGroup.Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L274)

Since v4.0.0

### ValidateReturn (type alias)

Validates the return value of a group handler builder, preserving successful
handler collections and producing a descriptive type error when endpoints remain
unhandled.

**Signature**

```ts
type ValidateReturn<A> = A extends
  | Handlers<infer _R, infer _Endpoints>
  | Effect.Effect<Handlers<infer _R, infer _Endpoints>, infer _EX, infer _RX>
  ? [_Endpoints] extends [never]
    ? A
    : `Endpoint not handled: ${HttpApiEndpoint.Name<_Endpoints>}`
  : `Must return the implemented handlers`
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L287)

Since v4.0.0

### Error (type alias)

Extracts the error channel from an effect that produces a `Handlers`
collection, returning `never` for non-effectful handler collections.

**Signature**

```ts
type Error<A> = A extends Effect.Effect<Handlers<infer _R, infer _Endpoints>, infer _EX, infer _RX> ? _EX : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L311)

Since v4.0.0

### Context (type alias)

Extracts the services required by a handler collection, including both handler
requirements and the environment required to construct the handlers.

**Signature**

```ts
type Context<A> =
  A extends Handlers<infer _R, infer _Endpoints>
    ? _R
    : A extends Effect.Effect<Handlers<infer _R, infer _Endpoints>, infer _EX, infer _RX>
      ? _R | _RX
      : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiBuilder.ts#L328)

Since v4.0.0
