---
title: RpcGroup.ts
nav_order: 315
parent: "effect"
---

## RpcGroup.ts overview

Collects typed RPC definitions and server handlers.

An `RpcGroup` stores RPC definitions by tag and keeps annotations shared by
the group. This module provides helpers for composing groups, applying
middleware or annotations, deriving handler types, and turning handler objects
into `Context` or `Layer` values used by RPC servers.

Since v4.0.0

---

## Exports Grouped by Category

- [groups](#groups)
  - [Any (interface)](#any-interface)
  - [HandlerFrom (type alias)](#handlerfrom-type-alias)
  - [HandlerServices (type alias)](#handlerservices-type-alias)
  - [HandlersFrom (type alias)](#handlersfrom-type-alias)
  - [HandlersServices (type alias)](#handlersservices-type-alias)
  - [RpcGroup (interface)](#rpcgroup-interface)
  - [Rpcs (type alias)](#rpcs-type-alias)
  - [make](#make)

---

# groups

## Any (interface)

An erased `RpcGroup` type for APIs that only need to know that a value is an
RPC group.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L176)

Since v4.0.0

## HandlerFrom (type alias)

Extracts the server handler function type for a specific RPC tag from an RPC
union.

**Signature**

```ts
type HandlerFrom<Rpc, Tag> =
  Extract<Rpc, { readonly _tag: Tag }> extends infer Current
    ? Current extends Rpc.Any
      ? Rpc.ToHandlerFn<Current>
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L198)

Since v4.0.0

## HandlerServices (type alias)

Computes the services required by a single RPC handler, excluding services
provided by middleware and `Scope` where the server supplies it.

**Signature**

```ts
type HandlerServices<Rpcs, K, Handler> =
  true extends Rpc.IsStream<Rpcs, K>
    ? Handler extends (
        ...args: any
      ) =>
        | Stream.Stream<infer _A, infer _E, infer _R>
        | Rpc.Wrapper<Stream.Stream<infer _A, infer _E, infer _R>>
        | Effect.Effect<Queue.Dequeue<infer _A, infer _E | Cause.Done>, infer _EX, infer _R>
        | Rpc.Wrapper<Effect.Effect<Queue.Dequeue<infer _A, infer _E | Cause.Done>, infer _EX, infer _R>>
      ? Exclude<Rpc.ExcludeProvides<_R, Rpcs, K>, Scope> | Rpc.ExtractRequires<Rpcs, K>
      : never
    : Handler extends (
          ...args: any
        ) => Effect.Effect<infer _A, infer _E, infer _R> | Rpc.Wrapper<Effect.Effect<infer _A, infer _E, infer _R>>
      ? Exclude<Rpc.ExcludeProvides<_R, Rpcs, K>, Scope> | Rpc.ExtractRequires<Rpcs, K>
      : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L219)

Since v4.0.0

## HandlersFrom (type alias)

Builds the object type of server handler functions required to implement each
RPC in a union.

**Signature**

```ts
type HandlersFrom<Rpc> = {
  readonly [Current in Rpc as Current["_tag"]]: Rpc.ToHandlerFn<Current>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L187)

Since v4.0.0

## HandlersServices (type alias)

Computes the services required by all handlers in a handler object for an RPC
union.

**Signature**

```ts
type HandlersServices<Rpcs, Handlers> = keyof Handlers extends infer K
  ? K extends keyof Handlers & string
    ? HandlerServices<Rpcs, K, Handlers[K]>
    : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L208)

Since v4.0.0

## RpcGroup (interface)

A collection of RPC definitions that can be composed, annotated, and
converted into server handlers or layers.

**Signature**

```ts
export interface RpcGroup<in out R extends Rpc.Any> extends Pipeable {
  new (_: never): {}

  readonly [TypeId]: typeof TypeId
  readonly requests: ReadonlyMap<string, R>
  readonly annotations: Context.Context<never>

  /**
   * Add one or more procedures to the group.
   */
  add<const Rpcs2 extends ReadonlyArray<Rpc.Any>>(...rpcs: Rpcs2): RpcGroup<R | Rpcs2[number]>

  /**
   * Merge this group with one or more other groups.
   */
  merge<const Groups extends ReadonlyArray<Any>>(...groups: Groups): RpcGroup<R | Rpcs<Groups[number]>>

  /**
   * Omit one or more procedures from the group.
   */
  omit<const Tags extends ReadonlyArray<R["_tag"]>>(
    ...tags: Tags
  ): RpcGroup<Exclude<R, { readonly _tag: Tags[number] }>>

  /**
   * Add middleware to all the procedures added to the group until this point.
   */
  middleware<M extends RpcMiddleware.AnyService>(middleware: M): RpcGroup<Rpc.AddMiddleware<R, M>>

  /**
   * Add a prefix to the procedures in this group, returning a new group
   */
  prefix<const Prefix extends string>(prefix: Prefix): RpcGroup<Rpc.Prefixed<R, Prefix>>

  /**
   * Implement the handlers for the procedures in this group, returning a
   * context object.
   */
  toHandlers<Handlers extends HandlersFrom<R>, EX = never, RX = never>(
    build: Handlers | Effect.Effect<Handlers, EX, RX>
  ): Effect.Effect<Context.Context<Rpc.ToHandler<R>>, EX, RX | HandlersServices<R, Handlers>>

  /**
   * Implement the handlers for the procedures in this group.
   */
  toLayer<Handlers extends HandlersFrom<R>, EX = never, RX = never>(
    build: Handlers | Effect.Effect<Handlers, EX, RX>
  ): Layer.Layer<Rpc.ToHandler<R>, EX, Exclude<RX, Scope> | HandlersServices<R, Handlers>>

  of<const Handlers extends HandlersFrom<R>>(handlers: Handlers): Handlers

  /**
   * Implement a single handler from the group.
   */
  toLayerHandler<const Tag extends R["_tag"], Handler extends HandlerFrom<R, Tag>, EX = never, RX = never>(
    tag: Tag,
    build: Handler | Effect.Effect<Handler, EX, RX>
  ): Layer.Layer<Rpc.Handler<Tag>, EX, Exclude<RX, Scope> | HandlerServices<R, Tag, Handler>>

  /**
   * Retrieve a handler for a specific procedure in the group.
   */
  accessHandler<const Tag extends R["_tag"]>(
    tag: Tag
  ): Effect.Effect<
    (
      payload: Rpc.Payload<Extract<R, { readonly _tag: Tag }>>,
      options: {
        readonly client: Rpc.ServerClient
        readonly requestId: RequestId
        readonly headers: Headers
      }
    ) => Rpc.ResultFrom<Extract<R, { readonly _tag: Tag }>, never>,
    never,
    Rpc.Handler<Tag>
  >

  /**
   * Annotate the group with a value.
   */
  annotate<I, S>(service: Context.Key<I, S>, value: S): RpcGroup<R>

  /**
   * Annotate the Rpc's above this point with a value.
   */
  annotateRpcs<I, S>(service: Context.Key<I, S>, value: S): RpcGroup<R>

  /**
   * Annotate the group with the provided annotations.
   */
  annotateMerge<S>(annotations: Context.Context<S>): RpcGroup<R>

  /**
   * Annotate the Rpc's above this point with the provided annotations.
   */
  annotateRpcsMerge<S>(annotations: Context.Context<S>): RpcGroup<R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L35)

Since v4.0.0

## Rpcs (type alias)

Extracts the union of RPC definitions from an `RpcGroup`.

**Signature**

```ts
type Rpcs<Group> = Group extends RpcGroup<infer R> ? (string extends R["_tag"] ? never : R) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L248)

Since v4.0.0

## make

Creates an `RpcGroup` from one or more RPC definitions.

**Signature**

```ts
declare const make: <const Rpcs extends ReadonlyArray<Rpc.Any>>(...rpcs: Rpcs) => RpcGroup<Rpcs[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcGroup.ts#L402)

Since v4.0.0
