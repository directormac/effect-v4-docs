---
title: HttpApiError.ts
nav_order: 272
parent: "effect"
---

## HttpApiError.ts overview

Built-in error schemas for common HTTP API failure responses.

This module provides reusable `Schema.ErrorClass` values for common HTTP
status codes, plus `HttpApiSchemaError` for request decoding failures raised
by the HTTP API runtime. The status errors can be used in endpoint or
middleware error declarations and are understood by builders, generated
clients, reflection, and OpenAPI generation.

Since v4.0.0

---

## Exports Grouped by Category

- [NoContent errors](#nocontent-errors)
  - [BadRequestNoContent](#badrequestnocontent)
  - [ConflictNoContent](#conflictnocontent)
  - [ForbiddenNoContent](#forbiddennocontent)
  - [GoneNoContent](#gonenocontent)
  - [InternalServerErrorNoContent](#internalservererrornocontent)
  - [MethodNotAllowedNoContent](#methodnotallowednocontent)
  - [NotAcceptableNoContent](#notacceptablenocontent)
  - [NotFoundNoContent](#notfoundnocontent)
  - [NotImplementedNoContent](#notimplementednocontent)
  - [RequestTimeoutNoContent](#requesttimeoutnocontent)
  - [ServiceUnavailableNoContent](#serviceunavailablenocontent)
  - [UnauthorizedNoContent](#unauthorizednocontent)
- [errors](#errors)
  - [BadRequest (class)](#badrequest-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property)
  - [Conflict (class)](#conflict-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-1)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-1)
  - [Forbidden (class)](#forbidden-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-2)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-2)
  - [Gone (class)](#gone-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-3)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-3)
  - [HttpApiSchemaError (class)](#httpapischemaerror-class)
    - [is (static method)](#is-static-method)
    - [wrap (static method)](#wrap-static-method)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-4)
    - [[HttpApiSchemaErrorTypeId] (property)](#httpapischemaerrortypeid-property)
    - [name (property)](#name-property)
    - [message (property)](#message-property)
  - [InternalServerError (class)](#internalservererror-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-5)
  - [MethodNotAllowed (class)](#methodnotallowed-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-6)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-4)
  - [NotAcceptable (class)](#notacceptable-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-7)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-5)
  - [NotFound (class)](#notfound-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-8)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-6)
  - [NotImplemented (class)](#notimplemented-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-9)
  - [RequestTimeout (class)](#requesttimeout-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-10)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-7)
  - [ServiceUnavailable (class)](#serviceunavailable-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-11)
  - [Unauthorized (class)](#unauthorized-class)
    - [[HttpServerRespondable.symbol] (method)](#httpserverrespondablesymbol-method-12)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property-8)
- [type IDs](#type-ids)
  - [HttpApiSchemaErrorTypeId](#httpapischemaerrortypeid)
  - [HttpApiSchemaErrorTypeId (type alias)](#httpapischemaerrortypeid-type-alias)

---

# NoContent errors

## BadRequestNoContent

No-content schema variant for `BadRequest`, decoding an empty 400 response into
a `BadRequest` error value.

**Signature**

```ts
declare const BadRequestNoContent: HttpApiSchema.asNoContent<typeof BadRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L61)

Since v4.0.0

## ConflictNoContent

No-content schema variant for `Conflict`, decoding an empty 409 response into a
`Conflict` error value.

**Signature**

```ts
declare const ConflictNoContent: HttpApiSchema.asNoContent<typeof Conflict>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L271)

Since v4.0.0

## ForbiddenNoContent

No-content schema variant for `Forbidden`, decoding an empty 403 response into a
`Forbidden` error value.

**Signature**

```ts
declare const ForbiddenNoContent: HttpApiSchema.asNoContent<typeof Forbidden>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L121)

Since v4.0.0

## GoneNoContent

No-content schema variant for `Gone`, decoding an empty 410 response into a
`Gone` error value.

**Signature**

```ts
declare const GoneNoContent: HttpApiSchema.asNoContent<typeof Gone>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L301)

Since v4.0.0

## InternalServerErrorNoContent

No-content schema variant for `InternalServerError`, decoding an empty 500
response into an `InternalServerError` error value.

**Signature**

```ts
declare const InternalServerErrorNoContent: HttpApiSchema.asNoContent<typeof InternalServerError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L332)

Since v4.0.0

## MethodNotAllowedNoContent

No-content schema variant for `MethodNotAllowed`, decoding an empty 405 response
into a `MethodNotAllowed` error value.

**Signature**

```ts
declare const MethodNotAllowedNoContent: HttpApiSchema.asNoContent<typeof MethodNotAllowed>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L181)

Since v4.0.0

## NotAcceptableNoContent

No-content schema variant for `NotAcceptable`, decoding an empty 406 response
into a `NotAcceptable` error value.

**Signature**

```ts
declare const NotAcceptableNoContent: HttpApiSchema.asNoContent<typeof NotAcceptable>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L211)

Since v4.0.0

## NotFoundNoContent

No-content schema variant for `NotFound`, decoding an empty 404 response into a
`NotFound` error value.

**Signature**

```ts
declare const NotFoundNoContent: HttpApiSchema.asNoContent<typeof NotFound>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L151)

Since v4.0.0

## NotImplementedNoContent

No-content schema variant for `NotImplemented`, decoding an empty 501 response
into a `NotImplemented` error value.

**Signature**

```ts
declare const NotImplementedNoContent: HttpApiSchema.asNoContent<typeof NotImplemented>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L361)

Since v4.0.0

## RequestTimeoutNoContent

No-content schema variant for `RequestTimeout`, decoding an empty 408 response
into a `RequestTimeout` error value.

**Signature**

```ts
declare const RequestTimeoutNoContent: HttpApiSchema.asNoContent<typeof RequestTimeout>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L241)

Since v4.0.0

## ServiceUnavailableNoContent

No-content schema variant for `ServiceUnavailable`, decoding an empty 503
response into a `ServiceUnavailable` error value.

**Signature**

```ts
declare const ServiceUnavailableNoContent: HttpApiSchema.asNoContent<typeof ServiceUnavailable>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L392)

Since v4.0.0

## UnauthorizedNoContent

No-content schema variant for `Unauthorized`, decoding an empty 401 response
into an `Unauthorized` error value.

**Signature**

```ts
declare const UnauthorizedNoContent: HttpApiSchema.asNoContent<typeof Unauthorized>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L91)

Since v4.0.0

# errors

## BadRequest (class)

Built-in HTTP API error for a `400 Bad Request` response. When used directly as
a server response, it renders as an empty response with status 400.

**Signature**

```ts
declare class BadRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L41)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L48)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L47)

## Conflict (class)

Built-in HTTP API error for a `409 Conflict` response. When used directly as a
server response, it renders as an empty response with status 409.

**Signature**

```ts
declare class Conflict
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L252)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L259)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L258)

## Forbidden (class)

Built-in HTTP API error for a `403 Forbidden` response. When used directly as a
server response, it renders as an empty response with status 403.

**Signature**

```ts
declare class Forbidden
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L102)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L109)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L108)

## Gone (class)

Built-in HTTP API error for a `410 Gone` response. When used directly as a
server response, it renders as an empty response with status 410.

**Signature**

```ts
declare class Gone
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L282)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L289)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L288)

## HttpApiSchemaError (class)

Error raised when an HTTP API request component fails schema decoding. It records
which component failed and responds as an empty `400 Bad Request` when rendered
as a server response.

**Signature**

```ts
declare class HttpApiSchemaError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L420)

Since v4.0.0

### is (static method)

**Signature**

```ts
declare const is: (u: unknown) => u is HttpApiSchemaError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L426)

### wrap (static method)

**Signature**

```ts
declare const wrap: <A, R>(
  kind: HttpApiSchemaError["kind"],
  effect: Effect.Effect<A, Schema.SchemaError, R>
) => Effect.Effect<A, HttpApiSchemaError, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L430)

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L440)

### [HttpApiSchemaErrorTypeId] (property)

**Signature**

```ts
readonly [HttpApiSchemaErrorTypeId]: "~effect/httpapi/HttpApiError/HttpApiSchemaError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L424)

### name (property)

**Signature**

```ts
readonly name: "HttpApiSchemaError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L437)

### message (property)

**Signature**

```ts
readonly message: "Params" | "Headers" | "Query" | "Body" | "Payload"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L438)

## InternalServerError (class)

Built-in HTTP API error for a `500 Internal Server Error` response. When used
directly as a server response, it renders as an empty response with status 500.

**Signature**

```ts
declare class InternalServerError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L312)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L320)

## MethodNotAllowed (class)

Built-in HTTP API error for a `405 Method Not Allowed` response. When used
directly as a server response, it renders as an empty response with status 405.

**Signature**

```ts
declare class MethodNotAllowed
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L162)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L169)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L168)

## NotAcceptable (class)

Built-in HTTP API error for a `406 Not Acceptable` response. When used directly
as a server response, it renders as an empty response with status 406.

**Signature**

```ts
declare class NotAcceptable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L192)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L199)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L198)

## NotFound (class)

Built-in HTTP API error for a `404 Not Found` response. When used directly as a
server response, it renders as an empty response with status 404.

**Signature**

```ts
declare class NotFound
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L132)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L139)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L138)

## NotImplemented (class)

Built-in HTTP API error for a `501 Not Implemented` response. When used directly
as a server response, it renders as an empty response with status 501.

**Signature**

```ts
declare class NotImplemented
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L343)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L349)

## RequestTimeout (class)

Built-in HTTP API error for a `408 Request Timeout` response. When used directly
as a server response, it renders as an empty response with status 408.

**Signature**

```ts
declare class RequestTimeout
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L222)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L229)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L228)

## ServiceUnavailable (class)

Built-in HTTP API error for a `503 Service Unavailable` response. When used
directly as a server response, it renders as an empty response with status 503.

**Signature**

```ts
declare class ServiceUnavailable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L372)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L380)

## Unauthorized (class)

Built-in HTTP API error for a `401 Unauthorized` response. When used directly as
a server response, it renders as an empty response with status 401.

**Signature**

```ts
declare class Unauthorized
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L72)

Since v4.0.0

### [HttpServerRespondable.symbol] (method)

**Signature**

```ts
declare const [HttpServerRespondable.symbol]: () => Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L79)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L78)

# type IDs

## HttpApiSchemaErrorTypeId

Runtime identifier used to mark and detect `HttpApiSchemaError` values.

**Signature**

```ts
declare const HttpApiSchemaErrorTypeId: "~effect/httpapi/HttpApiError/HttpApiSchemaError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L410)

Since v4.0.0

## HttpApiSchemaErrorTypeId (type alias)

Type-level identifier used to mark `HttpApiSchemaError` values.

**Signature**

```ts
type HttpApiSchemaErrorTypeId = "~effect/httpapi/HttpApiError/HttpApiSchemaError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiError.ts#L402)

Since v4.0.0
