---
title: HttpApiGroup.ts
nav_order: 273
parent: "effect"
---

## HttpApiGroup.ts overview

Defines named groups of HTTP API endpoints.

A group collects endpoints that belong to the same resource or feature area
inside an `HttpApi`. Builders, generated clients, URL builders, and OpenAPI
generation read the same group value, including its identifier, endpoints,
annotations, and `topLevel` flag. This module includes helpers for creating
groups, adding endpoints, prefixing paths, applying middleware, annotating
groups or endpoints, and deriving builder or client types.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [guards](#guards)
  - [isHttpApiGroup](#ishttpapigroup)
- [models](#models)
  - [AddMiddleware (type alias)](#addmiddleware-type-alias)
  - [AddPrefix (type alias)](#addprefix-type-alias)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (type alias)](#anywithprops-type-alias)
  - [ApiGroup (interface)](#apigroup-interface)
  - [ClientServices (type alias)](#clientservices-type-alias)
  - [Endpoints (type alias)](#endpoints-type-alias)
  - [EndpointsWithName (type alias)](#endpointswithname-type-alias)
  - [ErrorServicesDecode (type alias)](#errorservicesdecode-type-alias)
  - [ErrorServicesEncode (type alias)](#errorservicesencode-type-alias)
  - [HttpApiGroup (interface)](#httpapigroup-interface)
  - [MiddlewareClient (type alias)](#middlewareclient-type-alias)
  - [MiddlewareError (type alias)](#middlewareerror-type-alias)
  - [MiddlewareProvides (type alias)](#middlewareprovides-type-alias)
  - [MiddlewareServices (type alias)](#middlewareservices-type-alias)
  - [Name (type alias)](#name-type-alias)
  - [ToService (type alias)](#toservice-type-alias)
  - [WithName (type alias)](#withname-type-alias)

---

# constructors

## make

Creates an empty `HttpApiGroup` with the supplied identifier.

**Details**

Add endpoints with `add`, provide implementations with `HttpApiBuilder.group`,
and set `topLevel` when the generated client should expose endpoint methods
directly instead of nesting them under the group name.

**Signature**

```ts
declare const make: <const Id extends string, const TopLevel extends boolean = false>(
  identifier: Id,
  options?: { readonly topLevel?: TopLevel | undefined }
) => HttpApiGroup<Id, never, TopLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L373)

Since v4.0.0

# guards

## isHttpApiGroup

Returns `true` when a value is an `HttpApiGroup`, narrowing the value to the
group interface.

**Signature**

```ts
declare const isHttpApiGroup: (u: unknown) => u is Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L31)

Since v4.0.0

# models

## AddMiddleware (type alias)

Returns the type of a group after applying a middleware identifier to every endpoint in the group.

**Signature**

```ts
type AddMiddleware<Group, Id> =
  Group extends HttpApiGroup<infer _Name, infer _Endpoints, infer _TopLevel>
    ? HttpApiGroup<_Name, HttpApiEndpoint.AddMiddleware<_Endpoints, Id>, _TopLevel>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L273)

Since v4.0.0

## AddPrefix (type alias)

Returns the type of a group after adding the supplied path prefix to each endpoint in the group.

**Signature**

```ts
type AddPrefix<Group, Prefix> =
  Group extends HttpApiGroup<infer _Name, infer _Endpoints, infer _TopLevel>
    ? HttpApiGroup<_Name, HttpApiEndpoint.AddPrefix<_Endpoints, Prefix>, _TopLevel>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L262)

Since v4.0.0

## Any (interface)

A widened `HttpApiGroup` type used when the concrete group name, endpoints, and
top-level flag are not needed.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
  readonly identifier: string
  readonly key: string
  readonly endpoints: Record.ReadonlyRecord<string, HttpApiEndpoint.Any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L135)

Since v4.0.0

## AnyWithProps (type alias)

A widened group type that preserves concrete runtime properties such as
identifier, key, top-level status, endpoints, and annotations.

**Signature**

```ts
type AnyWithProps = HttpApiGroup<string, HttpApiEndpoint.AnyWithProps, boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L149)

Since v4.0.0

## ApiGroup (interface)

Type-level identity for a group within an HTTP API, pairing the API id with the
group name for service derivation.

**Signature**

```ts
export interface ApiGroup<ApiId extends string, Name extends string> {
  readonly _: unique symbol
  readonly apiId: ApiId
  readonly name: Name
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L122)

Since v4.0.0

## ClientServices (type alias)

Computes the schema encoding and decoding services required by clients for all endpoints in a group.

**Signature**

```ts
type ClientServices<Group> =
  Group extends HttpApiGroup<infer _Name, infer _Endpoints, infer _TopLevel>
    ? HttpApiEndpoint.ClientServices<_Endpoints>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L252)

Since v4.0.0

## Endpoints (type alias)

Extracts the endpoint union contained in an `HttpApiGroup`.

**Signature**

```ts
type Endpoints<Group> = Group extends HttpApiGroup<infer _Name, infer _Endpoints, infer _TopLevel> ? _Endpoints : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L184)

Since v4.0.0

## EndpointsWithName (type alias)

Selects the endpoints in a group whose `name` matches the provided endpoint name.

**Signature**

```ts
type EndpointsWithName<Group, Name> = Endpoints<WithName<Group, Name>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L244)

Since v4.0.0

## ErrorServicesDecode (type alias)

Computes the services required to decode error responses for every endpoint in a
group.

**Signature**

```ts
type ErrorServicesDecode<Group> = HttpApiEndpoint.ErrorServicesDecode<Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L203)

Since v4.0.0

## ErrorServicesEncode (type alias)

Computes the services required to encode error responses for every endpoint in a
group.

**Signature**

```ts
type ErrorServicesEncode<Group> = HttpApiEndpoint.ErrorServicesEncode<Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L194)

Since v4.0.0

## HttpApiGroup (interface)

An `HttpApiGroup` is a named collection of `HttpApiEndpoint`s that represents
a portion of your domain.

**Details**

Endpoint implementations can be provided later with `HttpApiBuilder.group`.

**Signature**

```ts
export interface HttpApiGroup<
  out Id extends string,
  out Endpoints extends HttpApiEndpoint.Any = never,
  out TopLevel extends boolean = false
> extends Pipeable {
  new (_: never): {}
  readonly [TypeId]: typeof TypeId
  readonly identifier: Id
  readonly key: string
  readonly topLevel: TopLevel
  readonly endpoints: Record.ReadonlyRecord<string, Endpoints>
  readonly annotations: Context.Context<never>

  /**
   * Add an `HttpApiEndpoint` to an `HttpApiGroup`.
   */
  add<const A extends NonEmptyReadonlyArray<HttpApiEndpoint.Any>>(
    ...endpoints: A
  ): HttpApiGroup<Id, Endpoints | A[number], TopLevel>

  /**
   * Add a path prefix to all endpoints in an `HttpApiGroup`. Note that this will only
   * add the prefix to the endpoints before this api is called.
   */
  prefix<const Prefix extends PathInput>(
    prefix: Prefix
  ): HttpApiGroup<Id, HttpApiEndpoint.AddPrefix<Endpoints, Prefix>, TopLevel>

  /**
   * Adds an `HttpApiMiddleware` to every endpoint currently in the group.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not have the middleware
   * applied.
   */
  middleware<I extends HttpApiMiddleware.AnyId, S>(
    middleware: Context.Key<I, S>
  ): HttpApiGroup<Id, HttpApiEndpoint.AddMiddleware<Endpoints, I>, TopLevel>

  /**
   * Merge the annotations of an `HttpApiGroup` with the provided annotations.
   */
  annotateMerge<I>(annotations: Context.Context<I>): HttpApiGroup<Id, Endpoints, TopLevel>

  /**
   * Add an annotation to an `HttpApiGroup`.
   */
  annotate<I, S>(key: Context.Key<I, S>, value: S): HttpApiGroup<Id, Endpoints, TopLevel>

  /**
   * Merges the provided context into every endpoint currently in the group.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not have these annotations.
   */
  annotateEndpointsMerge<I>(annotations: Context.Context<I>): HttpApiGroup<Id, Endpoints, TopLevel>

  /**
   * Adds an annotation to every endpoint currently in the group.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not have this annotation.
   */
  annotateEndpoints<I, S>(key: Context.Key<I, S>, value: S): HttpApiGroup<Id, Endpoints, TopLevel>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L44)

Since v4.0.0

## MiddlewareClient (type alias)

Computes the client-side middleware services required by endpoints in a group.

**Signature**

```ts
type MiddlewareClient<Group> = HttpApiEndpoint.MiddlewareClient<Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L228)

Since v4.0.0

## MiddlewareError (type alias)

Computes the middleware error union for every endpoint in a group.

**Signature**

```ts
type MiddlewareError<Group> = HttpApiEndpoint.MiddlewareError<Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L211)

Since v4.0.0

## MiddlewareProvides (type alias)

Computes the services provided by middleware attached to any endpoint in a
group.

**Signature**

```ts
type MiddlewareProvides<Group> = HttpApiEndpoint.MiddlewareProvides<Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L220)

Since v4.0.0

## MiddlewareServices (type alias)

Extracts the runtime services required by middleware attached to the endpoints in an `HttpApiGroup`.

**Signature**

```ts
type MiddlewareServices<Group> = HttpApiEndpoint.MiddlewareServices<Endpoints<Group>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L236)

Since v4.0.0

## Name (type alias)

Extracts the identifier literal from an `HttpApiGroup`.

**Signature**

```ts
type Name<Group> = Group extends HttpApiGroup<infer _Name, infer _Endpoints, infer _TopLevel> ? _Name : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L175)

Since v4.0.0

## ToService (type alias)

Derives the API-specific `ApiGroup` service identity for an HTTP API group.

**Signature**

```ts
type ToService<ApiId, A> =
  A extends HttpApiGroup<infer Name, infer _Endpoints, infer _TopLevel> ? ApiGroup<ApiId, Name> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L157)

Since v4.0.0

## WithName (type alias)

Selects the group with the specified identifier from a union of groups.

**Signature**

```ts
type WithName<Group, Name> = Extract<Group, { readonly identifier: Name }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiGroup.ts#L167)

Since v4.0.0
