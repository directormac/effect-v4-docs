---
title: ClusterSchema.ts
nav_order: 175
parent: "effect"
---

## ClusterSchema.ts overview

The `ClusterSchema` module collects the annotations that add cluster behavior
to RPC protocols and entity definitions. These annotations describe how
requests are persisted, handled in transactions, interrupted, traced, and
routed to shard groups without changing the request or response schema.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [ClientTracingEnabled](#clienttracingenabled)
  - [Dynamic](#dynamic)
  - [Persisted](#persisted)
  - [ShardGroup](#shardgroup)
  - [Uninterruptible](#uninterruptible)
  - [WithTransaction](#withtransaction)
  - [isUninterruptibleForClient](#isuninterruptibleforclient)
  - [isUninterruptibleForServer](#isuninterruptibleforserver)

---

# annotations

## ClientTracingEnabled

Annotation that controls whether client-side cluster request tracing is
enabled.

**Details**

The default value is `true`.

**Signature**

```ts
declare const ClientTracingEnabled: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L145)

Since v4.0.0

## Dynamic

Context reference for deriving request annotations from a cluster request.

**When to use**

Use to customize server-side request annotations based on the decoded
request value.

**Gotchas**

This only applies to requests handled by the entity, not to the generated
client.

**Signature**

```ts
declare const Dynamic: Context.Reference<
  (annotations: Context.Context<never>, request: Request<Rpc.AnyWithProps>) => Context.Context<never>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L165)

Since v4.0.0

## Persisted

Annotation that marks whether a cluster request should be persisted in mailbox
storage.

**Details**

The default value is `false`.

**Signature**

```ts
declare const Persisted: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L26)

Since v4.0.0

## ShardGroup

Annotation that selects the shard group for an entity id.

**Details**

By default, every entity id is assigned to the `"default"` shard group.

**Signature**

```ts
declare const ShardGroup: Context.Reference<(entityId: EntityId) => string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L129)

Since v4.0.0

## Uninterruptible

Annotation that controls whether a cluster request is treated as
uninterruptible.

**Details**

Use `true` for both client and server handling, `"client"` for client-side
handling only, `"server"` for server-side handling only, or `false` to allow
interruption.

**Signature**

```ts
declare const Uninterruptible: Context.Reference<boolean | "server" | "client">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L70)

Since v4.0.0

## WithTransaction

Annotation that marks whether request handling should be wrapped in the
configured message storage transaction.

**When to use**

Use when you need server-side request handling or storage work wrapped in the
storage transaction.

**Details**

The default value is `false`. When `true`, entity handling wraps server
writes with the configured storage transaction.

**Gotchas**

This annotation has transactional behavior only when the configured
`MessageStorage` implements it.

**Signature**

```ts
declare const WithTransaction: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L52)

Since v4.0.0

## isUninterruptibleForClient

Returns whether the `Uninterruptible` annotation applies to client-side
request handling for the provided context.

**When to use**

Use when you need client-side cluster request handling to decide whether to
ignore an interrupt.

**Details**

Returns `true` when `Uninterruptible` is `true` or `"client"`, and `false`
for `"server"` or the default `false`.

**See**

- `Uninterruptible` for the annotation values interpreted by this helper
- `isUninterruptibleForServer` for the server-side counterpart

**Signature**

```ts
declare const isUninterruptibleForClient: (context: Context.Context<never>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L114)

Since v4.0.0

## isUninterruptibleForServer

Returns whether the `Uninterruptible` annotation applies to server-side
request handling for the provided context.

**Details**

Returns `true` only when `Uninterruptible` is `true` or `"server"`.

**See**

- `Uninterruptible` for the annotation values interpreted by this helper
- `isUninterruptibleForClient` for the client-side counterpart

**Signature**

```ts
declare const isUninterruptibleForServer: (context: Context.Context<never>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterSchema.ts#L89)

Since v4.0.0
