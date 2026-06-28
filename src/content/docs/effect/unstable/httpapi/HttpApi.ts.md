---
title: HttpApi.ts
nav_order: 268
parent: "effect"
---

## HttpApi.ts overview

Describes an Effect HTTP API as groups of endpoints.

An `HttpApi` value is data: it has an identifier, annotations, and groups of
endpoints that describe request inputs, responses, middleware, and route
metadata. The same description can be used by server builders, generated
clients, URL builders, OpenAPI generation, and reflection tools.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [guards](#guards)
  - [isHttpApi](#ishttpapi)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (type alias)](#anywithprops-type-alias)
  - [HttpApi (interface)](#httpapi-interface)
- [reflection](#reflection)
  - [reflect](#reflect)
- [services](#services)
  - [AdditionalSchemas (class)](#additionalschemas-class)

---

# constructors

## make

Creates an empty `HttpApi` with the supplied identifier.

**When to use**

Use when you need to start defining an HTTP API, add groups with `add` or
`addHttpApi`, provide endpoint implementations with `HttpApiBuilder.group`,
and register the API with `HttpApiBuilder.layer`.

**Signature**

```ts
declare const make: <const Id extends string>(identifier: Id) => HttpApi<Id, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L206)

Since v4.0.0

# guards

## isHttpApi

Returns `true` when a value is an `HttpApi`.

**Signature**

```ts
declare const isHttpApi: (u: unknown) => u is Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L33)

Since v4.0.0

# models

## Any (interface)

An `HttpApi` value with its identifier and group types erased.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L102)

Since v4.0.0

## AnyWithProps (type alias)

An `HttpApi` with broad identifier and group types while retaining the concrete
runtime properties used by implementation helpers.

**Signature**

```ts
type AnyWithProps = HttpApi<string, HttpApiGroup.AnyWithProps>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L113)

Since v4.0.0

## HttpApi (interface)

An `HttpApi` is a collection of HTTP API groups and endpoints that represents a
portion of your domain.

**When to use**

Use when endpoint implementations can be provided with `HttpApiBuilder.group`, and the
completed API can be registered with `HttpApiBuilder.layer`.

**Signature**

```ts
export interface HttpApi<out Id extends string, out Groups extends HttpApiGroup.Any = never> extends Pipeable {
  new (_: never): {}
  readonly [TypeId]: typeof TypeId
  readonly identifier: Id
  readonly groups: Record.ReadonlyRecord<string, Groups>
  readonly annotations: Context.Context<never>

  /**
   * Add a `HttpApiGroup` to the `HttpApi`.
   */
  add<const A extends NonEmptyReadonlyArray<HttpApiGroup.Any>>(...groups: A): HttpApi<Id, Groups | A[number]>

  /**
   * Add another `HttpApi` to the `HttpApi`.
   */
  addHttpApi<Id2 extends string, Groups2 extends HttpApiGroup.Any>(
    api: HttpApi<Id2, Groups2>
  ): HttpApi<Id, Groups | Groups2>

  /**
   * Prefix all endpoints in the `HttpApi`.
   */
  prefix<const Prefix extends PathInput>(prefix: Prefix): HttpApi<Id, HttpApiGroup.AddPrefix<Groups, Prefix>>

  /**
   * Adds a middleware to every endpoint currently in the `HttpApi`.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not receive the middleware.
   */
  middleware<I extends HttpApiMiddleware.AnyId, S>(
    middleware: Context.Key<I, S>
  ): HttpApi<Id, HttpApiGroup.AddMiddleware<Groups, I>>

  /**
   * Annotate the `HttpApi`.
   */
  annotate<I, S>(tag: Context.Key<I, S>, value: S): HttpApi<Id, Groups>

  /**
   * Annotate the `HttpApi` with a Context.
   */
  annotateMerge<I>(context: Context.Context<I>): HttpApi<Id, Groups>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L47)

Since v4.0.0

# reflection

## reflect

Describes the groups and endpoints in an `HttpApi`.

**Details**

The callbacks receive each group or endpoint with merged annotations, endpoint
middleware, and response schemas grouped by HTTP status.

**Signature**

```ts
declare const reflect: <Id extends string, Groups extends HttpApiGroup.Any>(
  self: HttpApi<Id, Groups>,
  options: {
    readonly predicate?:
      | Predicate.Predicate<{
          readonly endpoint: HttpApiEndpoint.AnyWithProps
          readonly group: HttpApiGroup.AnyWithProps
        }>
      | undefined
    readonly onGroup: (options: {
      readonly group: HttpApiGroup.AnyWithProps
      readonly mergedAnnotations: Context.Context<never>
    }) => void
    readonly onEndpoint: (options: {
      readonly group: HttpApiGroup.AnyWithProps
      readonly endpoint: HttpApiEndpoint.AnyWithProps
      readonly mergedAnnotations: Context.Context<never>
      readonly middleware: ReadonlySet<HttpApiMiddleware.AnyService>
      readonly successes: ReadonlyMap<number, readonly [Schema.Top, ...Array<Schema.Top>]>
      readonly errors: ReadonlyMap<number, readonly [Schema.Top, ...Array<Schema.Top>]>
    }) => void
  }
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L224)

Since v4.0.0

# services

## AdditionalSchemas (class)

Adds additional schemas to components/schemas.
The provided schemas must have a `identifier` annotation.

**Signature**

```ts
declare class AdditionalSchemas
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApi.ts#L313)

Since v4.0.0
