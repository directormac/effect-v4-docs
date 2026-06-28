---
title: HttpClientError.ts
nav_order: 242
parent: "effect"
---

## HttpClientError.ts overview

Typed failure model for Effect HTTP client operations.

HTTP clients wrap request construction, transport, status-code validation, and
response decoding failures in `HttpClientError`. The wrapper keeps the failed
request and the specific failure reason together, so callers can handle client
failures uniformly while still matching on the reason `_tag` for retry
policy, logging, metrics, and user-facing messages.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [DecodeError (class)](#decodeerror-class)
  - [EmptyBodyError (class)](#emptybodyerror-class)
  - [EncodeError (class)](#encodeerror-class)
  - [HttpClientError (class)](#httpclienterror-class)
    - [[TypeId] (property)](#typeid-property)
  - [HttpClientErrorReason (type alias)](#httpclienterrorreason-type-alias)
  - [InvalidUrlError (class)](#invalidurlerror-class)
  - [RequestError (type alias)](#requesterror-type-alias)
  - [ResponseError (type alias)](#responseerror-type-alias)
  - [StatusCodeError (class)](#statuscodeerror-class)
  - [TransportError (class)](#transporterror-class)
- [guards](#guards)
  - [isHttpClientError](#ishttpclienterror)
- [schemas](#schemas)
  - [HttpClientErrorSchema (class)](#httpclienterrorschema-class)
    - [fromHttpClientError (static method)](#fromhttpclienterror-static-method)

---

# errors

## DecodeError (class)

Response error for failures while decoding an HTTP response body.

**Signature**

```ts
declare class DecodeError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L213)

Since v4.0.0

## EmptyBodyError (class)

Response error for operations that expected a response body but received an empty body.

**Signature**

```ts
declare class EmptyBodyError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L245)

Since v4.0.0

## EncodeError (class)

Error describing failures while encoding an HTTP request body.

**Signature**

```ts
declare class EncodeError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L121)

Since v4.0.0

## HttpClientError (class)

Error wrapper for HTTP client failures, exposing the failed request and the optional response through its `reason`.

**Signature**

```ts
declare class HttpClientError {
  constructor(props: { readonly reason: HttpClientErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L34)

Since v4.0.0

### [TypeId] (property)

Marks this value as an HTTP client error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/http/HttpClientError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L55)

Since v4.0.0

## HttpClientErrorReason (type alias)

Union of all specific failure reasons carried by `HttpClientError`.

**Signature**

```ts
type HttpClientErrorReason = RequestError | ResponseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L293)

Since v4.0.0

## InvalidUrlError (class)

Error describing failures while constructing a URL from an HTTP client request.

**Signature**

```ts
declare class InvalidUrlError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L151)

Since v4.0.0

## RequestError (type alias)

Union of HTTP client errors that occur before a response is available.

**Signature**

```ts
type RequestError = TransportError | EncodeError | InvalidUrlError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L277)

Since v4.0.0

## ResponseError (type alias)

Union of HTTP client errors that include an HTTP response.

**Signature**

```ts
type ResponseError = StatusCodeError | DecodeError | EmptyBodyError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L285)

Since v4.0.0

## StatusCodeError (class)

Response error for HTTP responses rejected because of their status code.

**Signature**

```ts
declare class StatusCodeError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L181)

Since v4.0.0

## TransportError (class)

Error describing transport-level failures that occur while sending an HTTP request.

**Signature**

```ts
declare class TransportError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L91)

Since v4.0.0

# guards

## isHttpClientError

Returns `true` when a value is an `HttpClientError`.

**Signature**

```ts
declare const isHttpClientError: (u: unknown) => u is HttpClientError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L26)

Since v4.0.0

# schemas

## HttpClientErrorSchema (class)

Schema for serializable HTTP client errors, preserving the specific error kind
and cause.

**Signature**

```ts
declare class HttpClientErrorSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L302)

Since v4.0.0

### fromHttpClientError (static method)

Builds the serializable schema representation for an HTTP client error.

**Signature**

```ts
declare const fromHttpClientError: (error: HttpClientError) => HttpClientErrorSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientError.ts#L321)

Since v4.0.0
