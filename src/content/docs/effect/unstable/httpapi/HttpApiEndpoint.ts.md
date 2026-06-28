---
title: HttpApiEndpoint.ts
nav_order: 271
parent: "effect"
---

## HttpApiEndpoint.ts overview

Defines endpoint declarations used inside an HTTP API group.

An endpoint records a stable name, HTTP method, router path, request schemas,
response schemas, declared errors, middleware, and annotations. Endpoint
values are declarations, not handlers: builders use them to decode requests,
type handler input, encode responses, generate OpenAPI metadata, and derive
generated-client call signatures. This module also includes HTTP method
constructors, payload and response schema helpers, and type utilities used by
builders and generated clients.

Since v4.0.0

---

## Exports Grouped by Category

- [Codecs](#codecs)
  - [Json (interface)](#json-interface)
  - [StringTree (interface)](#stringtree-interface)
- [constraints](#constraints)
  - [ErrorConstraint (type alias)](#errorconstraint-type-alias)
  - [HeadersConstraint (type alias)](#headersconstraint-type-alias)
  - [ParamsConstraint (type alias)](#paramsconstraint-type-alias)
  - [PayloadConstraint (type alias)](#payloadconstraint-type-alias)
  - [PayloadConstraintCodecs (type alias)](#payloadconstraintcodecs-type-alias)
  - [QueryConstraint (type alias)](#queryconstraint-type-alias)
  - [SuccessConstraint (type alias)](#successconstraint-type-alias)
- [constructors](#constructors)
  - [delete](#delete)
  - [get](#get)
  - [head](#head)
  - [make](#make)
  - [options](#options)
  - [patch](#patch)
  - [post](#post)
  - [put](#put)
- [guards](#guards)
  - [isHttpApiEndpoint](#ishttpapiendpoint)
- [models](#models)
  - [AddError (type alias)](#adderror-type-alias)
  - [AddMiddleware (type alias)](#addmiddleware-type-alias)
  - [AddPrefix (type alias)](#addprefix-type-alias)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (interface)](#anywithprops-interface)
  - [ClientRequest (type alias)](#clientrequest-type-alias)
  - [ClientResponseMode (type alias)](#clientresponsemode-type-alias)
  - [ClientServices (type alias)](#clientservices-type-alias)
  - [Error (type alias)](#error-type-alias)
  - [ErrorServicesDecode (type alias)](#errorservicesdecode-type-alias)
  - [ErrorServicesEncode (type alias)](#errorservicesencode-type-alias)
  - [Errors (type alias)](#errors-type-alias)
  - [ErrorsWithName (type alias)](#errorswithname-type-alias)
  - [ExcludeName (type alias)](#excludename-type-alias)
  - [ExcludeProvided (type alias)](#excludeprovided-type-alias)
  - [ExcludeProvidedWithName (type alias)](#excludeprovidedwithname-type-alias)
  - [Handler (type alias)](#handler-type-alias)
  - [HandlerRaw (type alias)](#handlerraw-type-alias)
  - [HandlerRawWithName (type alias)](#handlerrawwithname-type-alias)
  - [HandlerWithName (type alias)](#handlerwithname-type-alias)
  - [Headers (type alias)](#headers-type-alias)
  - [HttpApiEndpoint (interface)](#httpapiendpoint-interface)
  - [Middleware (type alias)](#middleware-type-alias)
  - [MiddlewareClient (type alias)](#middlewareclient-type-alias)
  - [MiddlewareError (type alias)](#middlewareerror-type-alias)
  - [MiddlewareProvides (type alias)](#middlewareprovides-type-alias)
  - [MiddlewareServices (type alias)](#middlewareservices-type-alias)
  - [MiddlewareServicesWithName (type alias)](#middlewareserviceswithname-type-alias)
  - [MiddlewareWithName (type alias)](#middlewarewithname-type-alias)
  - [Name (type alias)](#name-type-alias)
  - [Params (type alias)](#params-type-alias)
  - [Payload (type alias)](#payload-type-alias)
  - [PayloadMap (type alias)](#payloadmap-type-alias)
  - [Query (type alias)](#query-type-alias)
  - [Request (type alias)](#request-type-alias)
  - [RequestRaw (type alias)](#requestraw-type-alias)
  - [ServerServices (type alias)](#serverservices-type-alias)
  - [ServerServicesWithName (type alias)](#serverserviceswithname-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [SuccessWithName (type alias)](#successwithname-type-alias)
  - [WithName (type alias)](#withname-type-alias)

---

# Codecs

## Json (interface)

A schema codec that decodes and encodes the schema's value type through JSON
transport values.

**Signature**

```ts
export interface Json<S extends Schema.Constraint> extends Schema.Codec<
  S["Type"],
  Schema.Json,
  S["DecodingServices"],
  S["EncodingServices"]
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1258)

Since v4.0.0

## StringTree (interface)

A schema codec that decodes and encodes the schema's value type through
`Schema.StringTree` transport values.

**Signature**

```ts
export interface StringTree<S extends Schema.Constraint> extends Schema.Codec<
  S["Type"],
  Schema.StringTree,
  S["DecodingServices"],
  S["EncodingServices"]
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1269)

Since v4.0.0

# constraints

## ErrorConstraint (type alias)

Constraint for error response schemas, allowing either a single schema or a
readonly array of schemas.

**Signature**

```ts
type ErrorConstraint = Schema.Top | ReadonlyArray<Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1110)

Since v4.0.0

## HeadersConstraint (type alias)

Constraint for header schemas: each header must encode to `string | undefined`,
or the schema must encode to a record of those values.

**Signature**

```ts
type HeadersConstraint =
  | Record<string, Schema.Codec<unknown, string | undefined, unknown, unknown>>
  | Schema.Codec<unknown, Record<string, string | undefined>, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1050)

Since v4.0.0

## ParamsConstraint (type alias)

Constraint for path parameter schemas: each parameter must encode to
`string | undefined`, or the schema must encode to a record of those values.

**Signature**

```ts
type ParamsConstraint =
  | Record<string, Schema.Codec<unknown, string | undefined, unknown, unknown>>
  | Schema.Codec<unknown, Record<string, string | undefined>, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1039)

Since v4.0.0

## PayloadConstraint (type alias)

Payload schema depends on the HTTP method:

- for no-body methods, payload is modeled as query params, so each field must
  encode to `string | ReadonlyArray<string> | undefined` and OpenAPI can expand
  it into `in: query` parameters
- for body methods, payload may be any `Schema.Top` (or content-type keyed
  schemas) and OpenAPI uses `requestBody` instead of `parameters`

**Signature**

```ts
type PayloadConstraint<Method> = Method extends HttpMethod.NoBody
  ? Record<string, Schema.Codec<unknown, string | ReadonlyArray<string> | undefined, unknown, unknown>>
  : Schema.Top | ReadonlyArray<Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1076)

Since v4.0.0

## PayloadConstraintCodecs (type alias)

Payload constraint used when automatic codecs are enabled: no-body methods
accept field records for query-style encoding, while body methods accept one or
more schemas.

**Signature**

```ts
type PayloadConstraintCodecs<Method> = Method extends HttpMethod.NoBody
  ? Record<string, Schema.Top>
  : Schema.Top | ReadonlyArray<Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1090)

Since v4.0.0

## QueryConstraint (type alias)

Constraint for query schemas: each field must encode to `string`, an array of
strings, or `undefined`, or the schema must encode to a record of those values.

**Signature**

```ts
type QueryConstraint =
  | Record<string, Schema.Codec<unknown, string | ReadonlyArray<string> | undefined, unknown, unknown>>
  | Schema.Codec<unknown, string | ReadonlyArray<string> | undefined, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1061)

Since v4.0.0

## SuccessConstraint (type alias)

Constraint for success response schemas, allowing either a single schema or a
readonly array of schemas.

**Signature**

```ts
type SuccessConstraint = Schema.Top | ReadonlyArray<Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1101)

Since v4.0.0

# constructors

## delete

Creates a `DELETE` endpoint declaration.

**Signature**

```ts
declare const delete: { <const Name extends string, const Path extends HttpRouter.PathInput, Params extends Schema.Top | Schema.Struct.Fields = never, Query extends Schema.Top | Schema.Struct.Fields = never, Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never, Headers extends Schema.Top | Schema.Struct.Fields = never, const Success extends SuccessConstraint = HttpApiSchema.NoContent, const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never>(name: Name, path: Path, options?: { readonly disableCodecs?: false | undefined; readonly params?: Params | undefined; readonly query?: Query | undefined; readonly headers?: Headers | undefined; readonly payload?: Payload | undefined; readonly success?: Success | undefined; readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined; } | undefined): HttpApiEndpoint<Name, "DELETE", Path, StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>, StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>, Json<ExtractSchemaOrArray<Payload>>, StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>, JsonSuccessOrArray<Success>, Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>, never, never>; <const Name extends string, const Path extends HttpRouter.PathInput, Params extends ParamsConstraint = never, Query extends QueryConstraint = never, Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never, Headers extends HeadersConstraint = never, const Success extends SuccessConstraint = HttpApiSchema.NoContent, const Error extends ErrorConstraint = never>(name: Name, path: Path, options?: { readonly disableCodecs: true; readonly params?: Params | undefined; readonly query?: Query | undefined; readonly headers?: Headers | undefined; readonly payload?: Payload | undefined; readonly success?: Success | undefined; readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined; } | undefined): HttpApiEndpoint<Name, "DELETE", Path, Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params, Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query, ExtractSchemaOrArray<Payload>, ExtractSchemaOrArray<Headers>, ExtractSuccessOrArray<Success>, Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error, never, never>; }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1540)

Since v4.0.0

## get

Creates a `GET` endpoint declaration.

**Signature**

```ts
declare const get: {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends Record<string, Schema.Top> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs?: false | undefined
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "GET",
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    StringTree<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>,
    never,
    never
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends Record<
      string,
      Schema.Codec<unknown, string | ReadonlyArray<string> | undefined, unknown, unknown>
    > = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs: true
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "GET",
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error,
    never,
    never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1505)

Since v4.0.0

## head

Creates a `HEAD` endpoint declaration.

**Signature**

```ts
declare const head: {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends Record<string, Schema.Top> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs?: false | undefined
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "HEAD",
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    StringTree<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>,
    never,
    never
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends Record<
      string,
      Schema.Codec<unknown, string | ReadonlyArray<string> | undefined, unknown, unknown>
    > = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs: true
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "HEAD",
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error,
    never,
    never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1549)

Since v4.0.0

## make

Creates endpoint constructors for a specific HTTP method. The resulting
constructor builds an `HttpApiEndpoint` from a name, path, and optional request
and response schemas, applying automatic JSON or string-tree codecs unless
`disableCodecs` is enabled.

**Signature**

```ts
declare const make: <Method extends HttpMethod>(
  method: Method
) => {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends PayloadConstraintCodecs<Method> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?: {
      readonly disableCodecs?: false | undefined
      readonly params?: Params | undefined
      readonly query?: Query | undefined
      readonly headers?: Headers | undefined
      readonly payload?: Payload | undefined
      readonly success?: Success | undefined
      readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
    }
  ): HttpApiEndpoint<
    Name,
    Method,
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    Method extends HttpMethod.WithBody
      ? Json<ExtractSchemaOrArray<Payload>>
      : StringTree<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends PayloadConstraint<Method> = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?: {
      readonly disableCodecs: true
      readonly params?: Params | undefined
      readonly query?: Query | undefined
      readonly headers?: Headers | undefined
      readonly payload?: Payload | undefined
      readonly success?: Success | undefined
      readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
    }
  ): HttpApiEndpoint<
    Name,
    Method,
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1128)

Since v4.0.0

## options

Creates an `OPTIONS` endpoint declaration.

**Signature**

```ts
declare const options: {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends Record<string, Schema.Top> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs?: false | undefined
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "OPTIONS",
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    StringTree<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>,
    never,
    never
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends Record<
      string,
      Schema.Codec<unknown, string | ReadonlyArray<string> | undefined, unknown, unknown>
    > = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs: true
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "OPTIONS",
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error,
    never,
    never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1557)

Since v4.0.0

## patch

Creates a `PATCH` endpoint declaration.

**Signature**

```ts
declare const patch: {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs?: false | undefined
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "PATCH",
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    Json<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>,
    never,
    never
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs: true
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "PATCH",
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error,
    never,
    never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1529)

Since v4.0.0

## post

Creates a `POST` endpoint declaration.

**Signature**

```ts
declare const post: {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs?: false | undefined
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "POST",
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    Json<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>,
    never,
    never
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs: true
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "POST",
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error,
    never,
    never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1513)

Since v4.0.0

## put

Creates a `PUT` endpoint declaration.

**Signature**

```ts
declare const put: {
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends Schema.Top | Schema.Struct.Fields = never,
    Query extends Schema.Top | Schema.Struct.Fields = never,
    Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never,
    Headers extends Schema.Top | Schema.Struct.Fields = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends Schema.Top | ReadonlyArray<Schema.Top> = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs?: false | undefined
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "PUT",
    Path,
    StringTree<Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params>,
    StringTree<Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query>,
    Json<ExtractSchemaOrArray<Payload>>,
    StringTree<Headers extends Schema.Struct.Fields ? Schema.Struct<Headers> : Headers>,
    JsonSuccessOrArray<Success>,
    Json<Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error>,
    never,
    never
  >
  <
    const Name extends string,
    const Path extends HttpRouter.PathInput,
    Params extends ParamsConstraint = never,
    Query extends QueryConstraint = never,
    Payload extends Schema.Top | ReadonlyArray<Schema.Top> = never,
    Headers extends HeadersConstraint = never,
    const Success extends SuccessConstraint = HttpApiSchema.NoContent,
    const Error extends ErrorConstraint = never
  >(
    name: Name,
    path: Path,
    options?:
      | {
          readonly disableCodecs: true
          readonly params?: Params | undefined
          readonly query?: Query | undefined
          readonly headers?: Headers | undefined
          readonly payload?: Payload | undefined
          readonly success?: Success | undefined
          readonly error?: (Error & ErrorNoStream<Types.NoInfer<Error>>) | undefined
        }
      | undefined
  ): HttpApiEndpoint<
    Name,
    "PUT",
    Path,
    Params extends Schema.Struct.Fields ? Schema.Struct<Params> : Params,
    Query extends Schema.Struct.Fields ? Schema.Struct<Query> : Query,
    ExtractSchemaOrArray<Payload>,
    ExtractSchemaOrArray<Headers>,
    ExtractSuccessOrArray<Success>,
    Error extends ReadonlyArray<Schema.Constraint> ? Error[number] : Error,
    never,
    never
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L1521)

Since v4.0.0

# guards

## isHttpApiEndpoint

Returns `true` when a value is an `HttpApiEndpoint`, narrowing the value to the
endpoint interface.

**Signature**

```ts
declare const isHttpApiEndpoint: (u: unknown) => u is HttpApiEndpoint<any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L43)

Since v4.0.0

# models

## AddError (type alias)

Returns an endpoint type with an additional error schema added to the endpoint's
existing error schema union.

**Signature**

```ts
type AddError<Endpoint, E> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? HttpApiEndpoint<_Name, _Method, _Path, _Params, _Query, _Payload, _Headers, _Success, _Error | E, _M, _MR>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L900)

Since v4.0.0

## AddMiddleware (type alias)

Returns an endpoint type with additional middleware applied and the endpoint's
middleware service requirements updated accordingly.

**Signature**

```ts
type AddMiddleware<Endpoint, M> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? HttpApiEndpoint<
        _Name,
        _Method,
        _Path,
        _Params,
        _Query,
        _Payload,
        _Headers,
        _Success,
        _Error,
        _M | M,
        HttpApiMiddleware.ApplyServices<M, _MR>
      >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L934)

Since v4.0.0

## AddPrefix (type alias)

Returns an endpoint type with the supplied path prefix prepended while
preserving the endpoint's schemas, method, errors, and middleware.

**Signature**

```ts
type AddPrefix<Endpoint, Prefix> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? HttpApiEndpoint<
        _Name,
        _Method,
        `${Prefix}${_Path}`,
        _Params,
        _Query,
        _Payload,
        _Headers,
        _Success,
        _Error,
        _M,
        _MR
      >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L866)

Since v4.0.0

## Any (interface)

A widened `HttpApiEndpoint` type used when the concrete method, path, schemas,
and middleware types are not needed.

**Signature**

```ts
export interface Any extends Pipeable {
  readonly [TypeId]: any
  readonly name: string
  readonly ["~Success"]: Schema.Top
  readonly ["~Error"]: Schema.Top
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L251)

Since v4.0.0

## AnyWithProps (interface)

A widened endpoint type that preserves concrete runtime properties such as
method, path, schemas, annotations, and middleware sets.

**Signature**

```ts
export interface AnyWithProps extends HttpApiEndpoint<
  string,
  HttpMethod,
  string,
  Schema.Top,
  Schema.Top,
  Schema.Top,
  Schema.Top,
  any,
  any
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L265)

Since v4.0.0

## ClientRequest (type alias)

Builds the request object accepted by a generated client method, including only
the params, query, headers, payload, and response mode fields required by the
endpoint. Multipart payloads are supplied as `FormData`.

**Signature**

```ts
type ClientRequest<Params, Query, Payload, Headers, ResponseMode> = ([Params["Type"]] extends [never]
  ? {}
  : { readonly params: Params["Type"] }) &
  ([Query["Type"]] extends [never] ? {} : { readonly query: Query["Type"] }) &
  ([Headers["Type"]] extends [never] ? {} : { readonly headers: Headers["Type"] }) &
  ([Payload["Type"]] extends [never]
    ? {}
    : Payload["Type"] extends infer P
      ? P extends Brand<HttpApiSchema.MultipartTypeId> | Brand<HttpApiSchema.MultipartStreamTypeId>
        ? { readonly payload: FormData }
        : { readonly payload: Payload["Type"] }
      : { readonly payload: Payload["Type"] }) extends infer Req
  ? keyof Req extends never
    ? void | { readonly responseMode?: ResponseMode }
    : Req & { readonly responseMode?: ResponseMode }
  : void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L590)

Since v4.0.0

## ClientResponseMode (type alias)

Controls what a generated client method returns: the decoded success value,
the decoded value paired with the raw response, or only the raw response.

**Signature**

```ts
type ClientResponseMode = "decoded-only" | "decoded-and-response" | "response-only"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L617)

Since v4.0.0

## ClientServices (type alias)

Computes the services required on the client to encode endpoint requests and
decode endpoint success or error responses.

**Signature**

```ts
type ClientServices<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ?
        | _Params["EncodingServices"]
        | _Query["EncodingServices"]
        | _Payload["EncodingServices"]
        | _Headers["EncodingServices"]
        | SuccessDecodingServices<_Success>
        | _Error["DecodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L655)

Since v4.0.0

## Error (type alias)

Extracts the error schema associated with an endpoint.

**Signature**

```ts
type Error<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Error
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L327)

Since v4.0.0

## ErrorServicesDecode (type alias)

Computes the services required to decode an endpoint's error responses,
including services required by middleware error decoders.

**Signature**

```ts
type ErrorServicesDecode<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Error["DecodingServices"] | HttpApiMiddleware.ErrorServicesDecode<Middleware<Endpoint>>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L704)

Since v4.0.0

## ErrorServicesEncode (type alias)

Computes the services required to encode an endpoint's error responses,
including services required by middleware error encoders.

**Signature**

```ts
type ErrorServicesEncode<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Error["EncodingServices"] | HttpApiMiddleware.ErrorServicesEncode<Middleware<Endpoint>>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L501)

Since v4.0.0

## Errors (type alias)

Computes the full error value union for an endpoint, including the endpoint
error schema's type and errors introduced by middleware.

**Signature**

```ts
type Errors<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Error["Type"] | HttpApiMiddleware.Error<Middleware<Endpoint>>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L479)

Since v4.0.0

## ErrorsWithName (type alias)

Computes the full error value union for the endpoint with the specified name in
an endpoint union.

**Signature**

```ts
type ErrorsWithName<Endpoints, Name> = Errors<WithName<Endpoints, Name>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L801)

Since v4.0.0

## ExcludeName (type alias)

Removes endpoints with the specified name from a union of endpoints.

**Signature**

```ts
type ExcludeName<Endpoints, Name> = Exclude<Endpoints, { readonly name: Name }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L755)

Since v4.0.0

## ExcludeProvided (type alias)

Removes services provided by the HTTP router and endpoint middleware from a
service requirement union.

**Signature**

```ts
type ExcludeProvided<Endpoint, R> = Exclude<R, HttpRouter.Provided | HttpApiMiddleware.Provides<Middleware<Endpoint>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L853)

Since v4.0.0

## ExcludeProvidedWithName (type alias)

Removes services provided by the HTTP router and the named endpoint's middleware
from a service requirement union.

**Signature**

```ts
type ExcludeProvidedWithName<Endpoints, Name, R> = ExcludeProvided<WithName<Endpoints, Name>, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L841)

Since v4.0.0

## Handler (type alias)

The normal server handler for an endpoint, accepting the decoded request shape
and returning either the endpoint success value or a custom `HttpServerResponse`.

**Signature**

```ts
type Handler<Endpoint, E, R> = (
  request: Types.Simplify<Request<Endpoint>>
) => Effect<SuccessType<Endpoint["~Success"]> | HttpServerResponse, Endpoint["~Error"]["Type"] | E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L726)

Since v4.0.0

## HandlerRaw (type alias)

The raw server handler for an endpoint, receiving a request shape without a
decoded payload so the handler can read the raw `HttpServerRequest` directly.

**Signature**

```ts
type HandlerRaw<Endpoint, E, R> = (
  request: Types.Simplify<RequestRaw<Endpoint>>
) => Effect<SuccessType<Endpoint["~Success"]> | HttpServerResponse, Endpoint["~Error"]["Type"] | E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L737)

Since v4.0.0

## HandlerRawWithName (type alias)

Derives the raw handler type for the endpoint with the specified name in an
endpoint union.

**Signature**

```ts
type HandlerRawWithName<Endpoints, Name, E, R> = HandlerRaw<WithName<Endpoints, Name>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L777)

Since v4.0.0

## HandlerWithName (type alias)

Derives the normal handler type for the endpoint with the specified name in an
endpoint union.

**Signature**

```ts
type HandlerWithName<Endpoints, Name, E, R> = Handler<WithName<Endpoints, Name>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L764)

Since v4.0.0

## Headers (type alias)

Extracts the schema used for an endpoint's request headers.

**Signature**

```ts
type Headers<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Headers
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L411)

Since v4.0.0

## HttpApiEndpoint (interface)

Represents an API endpoint. An API endpoint is mapped to a single route on
the underlying `HttpRouter`.

**Signature**

```ts
export interface HttpApiEndpoint<
  out Name extends string,
  out Method extends HttpMethod,
  out Path extends string,
  out Params extends Schema.Top = never,
  out Query extends Schema.Top = never,
  out Payload extends Schema.Top = never,
  out Headers extends Schema.Top = never,
  out Success extends Schema.Top = typeof HttpApiSchema.NoContent,
  out Error extends Schema.Top = never,
  in out Middleware = never,
  out MiddlewareR = never
> extends Pipeable {
  readonly [TypeId]: {
    readonly _MiddlewareR: Types.Covariant<MiddlewareR>
  }
  readonly "~Params": Params
  readonly "~Query": Query
  readonly "~Headers": Headers
  readonly "~Payload": Payload
  readonly "~Success": Success
  readonly "~Error": Error

  readonly name: Name
  readonly path: Path
  readonly method: Method
  readonly params: Schema.Top | undefined
  readonly query: Schema.Top | undefined
  readonly headers: Schema.Top | undefined
  readonly payload: PayloadMap
  readonly success: ReadonlySet<Schema.Top>
  readonly error: ReadonlySet<Schema.Top>
  readonly annotations: Context.Context<never>
  readonly middlewares: ReadonlySet<Context.Key<Middleware, any>>

  /**
   * Add a prefix to the path of the endpoint.
   */
  prefix<const Prefix extends HttpRouter.PathInput>(
    prefix: Prefix
  ): HttpApiEndpoint<
    Name,
    Method,
    `${Prefix}${Path}`,
    Params,
    Query,
    Payload,
    Headers,
    Success,
    Error,
    Middleware,
    MiddlewareR
  >

  /**
   * Add an `HttpApiMiddleware` to the endpoint.
   */
  middleware<I extends HttpApiMiddleware.AnyId, S>(
    middleware: Context.Key<I, S>
  ): HttpApiEndpoint<
    Name,
    Method,
    Path,
    Params,
    Query,
    Payload,
    Headers,
    Success,
    Error,
    Middleware | I,
    HttpApiMiddleware.ApplyServices<I, MiddlewareR>
  >

  /**
   * Add an annotation on the endpoint.
   */
  annotate<I, S>(
    key: Context.Key<I, S>,
    value: Types.NoInfer<S>
  ): HttpApiEndpoint<Name, Method, Path, Params, Query, Payload, Headers, Success, Error, Middleware, MiddlewareR>

  /**
   * Merge the annotations of the endpoint with the provided context.
   */
  annotateMerge<I>(
    annotations: Context.Context<I>
  ): HttpApiEndpoint<Name, Method, Path, Params, Query, Payload, Headers, Success, Error, Middleware, MiddlewareR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L106)

Since v4.0.0

## Middleware (type alias)

Extracts the middleware identifiers attached to an endpoint.

**Signature**

```ts
type Middleware<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _M
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L432)

Since v4.0.0

## MiddlewareClient (type alias)

Computes the client-side middleware services required by an endpoint.

**Signature**

```ts
type MiddlewareClient<Endpoint> = HttpApiMiddleware.MiddlewareClient<Middleware<Endpoint>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L461)

Since v4.0.0

## MiddlewareError (type alias)

Computes the error types that can be produced by the middleware attached to an
endpoint.

**Signature**

```ts
type MiddlewareError<Endpoint> = HttpApiMiddleware.Error<Middleware<Endpoint>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L470)

Since v4.0.0

## MiddlewareProvides (type alias)

Computes the services provided by the middleware attached to an endpoint.

**Signature**

```ts
type MiddlewareProvides<Endpoint> = HttpApiMiddleware.Provides<Middleware<Endpoint>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L453)

Since v4.0.0

## MiddlewareServices (type alias)

Extracts the additional services required by middleware applied to an endpoint.

**Signature**

```ts
type MiddlewareServices<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _MR
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L682)

Since v4.0.0

## MiddlewareServicesWithName (type alias)

Extracts the middleware service requirements for the endpoint with the specified
name in an endpoint union.

**Signature**

```ts
type MiddlewareServicesWithName<Endpoints, Name> = MiddlewareServices<WithName<Endpoints, Name>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L830)

Since v4.0.0

## MiddlewareWithName (type alias)

Extracts the middleware identifiers for the endpoint with the specified name in
an endpoint union.

**Signature**

```ts
type MiddlewareWithName<Endpoints, Name> = Middleware<WithName<Endpoints, Name>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L821)

Since v4.0.0

## Name (type alias)

Extracts the name literal from an `HttpApiEndpoint`.

**Signature**

```ts
type Name<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Name
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L285)

Since v4.0.0

## Params (type alias)

Extracts the schema used for an endpoint's path parameters.

**Signature**

```ts
type Params<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Params
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L348)

Since v4.0.0

## Payload (type alias)

Extracts the schema used for an endpoint's request payload.

**Signature**

```ts
type Payload<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Payload
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L390)

Since v4.0.0

## PayloadMap (type alias)

Maps content types to the payload encoding strategy and one or more schemas that
can decode or encode payloads for that content type.

**Signature**

```ts
type PayloadMap = ReadonlyMap<
  string,
  {
    readonly encoding: HttpApiSchema.PayloadEncoding
    readonly schemas: [Schema.Top, ...Array<Schema.Top>]
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L52)

Since v4.0.0

## Query (type alias)

Extracts the schema used for an endpoint's query parameters.

**Signature**

```ts
type Query<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Query
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L369)

Since v4.0.0

## Request (type alias)

Builds the decoded request shape passed to a normal endpoint handler, including
available params, query, payload, headers, the raw request, endpoint, and group.
Multipart stream payloads are exposed as streams of parts.

**Signature**

```ts
type Request<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? ([_Params["Type"]] extends [never] ? {} : { readonly params: _Params["Type"] }) &
        ([_Query["Type"]] extends [never] ? {} : { readonly query: _Query["Type"] }) &
        ([_Payload["Type"]] extends [never]
          ? {}
          : _Payload["Type"] extends Brand<HttpApiSchema.MultipartStreamTypeId>
            ? { readonly payload: Stream.Stream<Multipart.Part, Multipart.MultipartError> }
            : { readonly payload: _Payload["Type"] }) &
        ([_Headers] extends [never] ? {} : { readonly headers: _Headers["Type"] }) & {
          readonly request: HttpServerRequest
          readonly endpoint: Endpoint
          readonly group: HttpApiGroup.AnyWithProps
        }
    : {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L524)

Since v4.0.0

## RequestRaw (type alias)

Builds the request shape passed to a raw endpoint handler, including decoded
params, query, and headers plus the raw request, endpoint, and group, while
leaving payload handling to the raw request.

**Signature**

```ts
type RequestRaw<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? ([_Params["Type"]] extends [never] ? {} : { readonly params: _Params["Type"] }) &
        ([_Query["Type"]] extends [never] ? {} : { readonly query: _Query["Type"] }) &
        ([_Headers["Type"]] extends [never] ? {} : { readonly headers: _Headers["Type"] }) & {
          readonly request: HttpServerRequest
          readonly endpoint: Endpoint
          readonly group: HttpApiGroup.AnyWithProps
        }
    : {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L559)

Since v4.0.0

## ServerServices (type alias)

Computes the services required on the server to decode endpoint inputs and
encode endpoint success, error, and middleware error responses.

**Signature**

```ts
type ServerServices<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ?
        | _Params["DecodingServices"]
        | _Query["DecodingServices"]
        | _Payload["DecodingServices"]
        | _Headers["DecodingServices"]
        | SuccessEncodingServices<_Success>
        | _Error["EncodingServices"]
        | HttpApiMiddleware.ErrorServicesEncode<_M>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L626)

Since v4.0.0

## ServerServicesWithName (type alias)

Computes the server-side service requirements for the endpoint with the
specified name in an endpoint union.

**Signature**

```ts
type ServerServicesWithName<Endpoints, Name> = ServerServices<WithName<Endpoints, Name>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L810)

Since v4.0.0

## Success (type alias)

Extracts the success schema associated with an endpoint.

**Signature**

```ts
type Success<Endpoint> =
  Endpoint extends HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _M,
    infer _MR
  >
    ? _Success
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L306)

Since v4.0.0

## SuccessWithName (type alias)

Extracts the decoded success value type for the endpoint with the specified name
in an endpoint union.

**Signature**

```ts
type SuccessWithName<Endpoints, Name> = Success<WithName<Endpoints, Name>> extends infer S ? SuccessType<S> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L790)

Since v4.0.0

## WithName (type alias)

Selects the endpoint with the specified name from a union of endpoints.

**Signature**

```ts
type WithName<Endpoints, Name> = Extract<Endpoints, { readonly name: Name }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiEndpoint.ts#L747)

Since v4.0.0
