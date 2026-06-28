---
title: HttpEffect.ts
nav_order: 245
parent: "effect"
---

## HttpEffect.ts overview

Runs Effect HTTP server handlers at platform boundaries.

This module turns effects that produce `HttpServerResponse` values into Web
`Request` handlers and other server adapters. It also applies middleware,
converts failures into responses, runs hooks before a response is sent, and
manages request scopes for streamed responses.

Since v4.0.0

---

## Exports Grouped by Category

- [Pre-response handlers](#pre-response-handlers)
  - [PreResponseHandler (type alias)](#preresponsehandler-type-alias)
- [combinators](#combinators)
  - [toHandled](#tohandled)
- [converting](#converting)
  - [fromWebHandler](#fromwebhandler)
  - [toWebHandler](#towebhandler)
  - [toWebHandlerLayer](#towebhandlerlayer)
  - [toWebHandlerLayerWith](#towebhandlerlayerwith)
  - [toWebHandlerWith](#towebhandlerwith)
- [fiber refs](#fiber-refs)
  - [appendPreResponseHandler](#appendpreresponsehandler)
  - [appendPreResponseHandlerUnsafe](#appendpreresponsehandlerunsafe)
  - [withPreResponseHandler](#withpreresponsehandler)
- [resource management](#resource-management)
  - [scopeDisableClose](#scopedisableclose)
  - [scopeTransferToStream](#scopetransfertostream)

---

# Pre-response handlers

## PreResponseHandler (type alias)

Function run with the current request and response just before the response is sent, allowing the response to be replaced or failing with `HttpServerError`.

**Signature**

```ts
type PreResponseHandler = (
  request: HttpServerRequest,
  response: HttpServerResponse
) => Effect.Effect<HttpServerResponse, HttpServerError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L178)

Since v4.0.0

# combinators

## toHandled

Runs an HTTP server effect, sends the produced response with the supplied handler, and converts failures into HTTP responses.

**Signature**

```ts
declare const toHandled: <E, R, EH, RH>(
  self: Effect.Effect<HttpServerResponse, E, R>,
  handleResponse: (request: HttpServerRequest, response: HttpServerResponse) => Effect.Effect<unknown, EH, RH>,
  middleware?: HttpMiddleware | undefined
) => Effect.Effect<void, never, Exclude<R | RH | HttpServerRequest, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L36)

Since v4.0.0

# converting

## fromWebHandler

Adapts a Web `Request` handler into an HTTP server effect for the current `HttpServerRequest`.

**Signature**

```ts
declare const fromWebHandler: (
  handler: (request: Request) => Promise<Response>
) => Effect.Effect<HttpServerResponse, HttpServerError, HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L374)

Since v4.0.0

## toWebHandler

Converts an HTTP server effect into a Web `Request` handler using an empty base context.

**Signature**

```ts
declare const toWebHandler: <E>(
  self: Effect.Effect<HttpServerResponse, E, HttpServerRequest | Scope.Scope>,
  middleware?: HttpMiddleware | undefined
) => (request: Request, context?: Context.Context<never> | undefined) => Promise<globalThis.Response>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L273)

Since v4.0.0

## toWebHandlerLayer

Builds a Web `Request` handler for an HTTP server effect using a layer to provide its services, returning the handler with a `dispose` function.

**Signature**

```ts
declare const toWebHandlerLayer: <E, R, Provided, LE, ReqR = Exclude<R, Scope.Scope | HttpServerRequest | Provided>>(
  self: Effect.Effect<HttpServerResponse, E, R>,
  layer: Layer.Layer<Provided, LE>,
  options?:
    | { readonly middleware?: HttpMiddleware | undefined; readonly memoMap?: Layer.MemoMap | undefined }
    | undefined
) => {
  readonly dispose: () => Promise<void>
  readonly handler: [ReqR] extends [never]
    ? (request: Request, context?: Context.Context<never> | undefined) => Promise<globalThis.Response>
    : (request: Request, context: Context.Context<ReqR>) => Promise<globalThis.Response>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L347)

Since v4.0.0

## toWebHandlerLayerWith

Builds a Web `Request` handler from a layer and handler factory, returning the handler with a `dispose` function for the layer scope.

**Signature**

```ts
declare const toWebHandlerLayerWith: <
  E,
  Provided,
  LE,
  R,
  ReqR = Exclude<R, Scope.Scope | HttpServerRequest | Provided>
>(
  layer: Layer.Layer<Provided, LE>,
  options: {
    readonly toHandler: (
      context: Context.Context<Provided>
    ) => Effect.Effect<Effect.Effect<HttpServerResponse, E, R>, LE>
    readonly middleware?: HttpMiddleware | undefined
    readonly memoMap?: Layer.MemoMap | undefined
  }
) => {
  readonly dispose: () => Promise<void>
  readonly handler: [ReqR] extends [never]
    ? (request: Request, context?: Context.Context<never> | undefined) => Promise<globalThis.Response>
    : (request: Request, context: Context.Context<ReqR>) => Promise<globalThis.Response>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L285)

Since v4.0.0

## toWebHandlerWith

Converts an HTTP server effect into a Web `Request` handler using the supplied base context and optional middleware.

**Signature**

```ts
declare const toWebHandlerWith: <Provided, R = never, ReqR = Exclude<R, Scope.Scope | HttpServerRequest | Provided>>(
  context: Context.Context<Provided>
) => <E>(
  self: Effect.Effect<HttpServerResponse, E, R>,
  middleware?: HttpMiddleware | undefined
) => [ReqR] extends [never]
  ? (request: Request, context?: Context.Context<never> | undefined) => Promise<globalThis.Response>
  : (request: Request, context: Context.Context<ReqR>) => Promise<globalThis.Response>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L231)

Since v4.0.0

# fiber refs

## appendPreResponseHandler

Registers an additional pre-response handler for the current HTTP server request.

**Signature**

```ts
declare const appendPreResponseHandler: (handler: PreResponseHandler) => Effect.Effect<void, never, HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L189)

Since v4.0.0

## appendPreResponseHandlerUnsafe

Registers a pre-response handler for the supplied HTTP server request.

**Signature**

```ts
declare const appendPreResponseHandlerUnsafe: (request: HttpServerRequest, handler: PreResponseHandler) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L202)

Since v4.0.0

## withPreResponseHandler

Runs an effect after registering a pre-response handler for the current HTTP server request.

**Signature**

```ts
declare const withPreResponseHandler: {
  (handler: PreResponseHandler): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R | HttpServerRequest>
  <A, E, R>(self: Effect.Effect<A, E, R>, handler: PreResponseHandler): Effect.Effect<A, E, R | HttpServerRequest>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L211)

Since v4.0.0

# resource management

## scopeDisableClose

Disables automatic closing for an HTTP request scope.

**Gotchas**

Use only when another owner will close the scope; otherwise resources attached
to the request scope can leak.

**Signature**

```ts
declare const scopeDisableClose: (scope: Scope.Scope) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L129)

Since v4.0.0

## scopeTransferToStream

Returns a streaming server response that closes the request scope when the body stream exits.

**Signature**

```ts
declare const scopeTransferToStream: (response: HttpServerResponse) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpEffect.ts#L139)

Since v4.0.0
