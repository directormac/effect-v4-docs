---
title: DeliverAt.ts
nav_order: 177
parent: "effect"
---

## DeliverAt.ts overview

The `DeliverAt` module defines the protocol used by cluster message payloads
that carry their own scheduled delivery time. A value implements the protocol
by exposing a method at the `DeliverAt` symbol that returns the target
`DateTime`.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [toMillis](#tomillis)
- [guards](#guards)
  - [isDeliverAt](#isdeliverat)
- [models](#models)
  - [DeliverAt (interface)](#deliverat-interface)
- [symbols](#symbols)
  - [symbol](#symbol)

---

# accessors

## toMillis

Returns the scheduled delivery time in epoch milliseconds when the value
implements `DeliverAt`, or `null` otherwise.

**Signature**

```ts
declare const toMillis: (self: unknown) => number | null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DeliverAt.ts#L53)

Since v4.0.0

# guards

## isDeliverAt

Returns `true` if the value implements the `DeliverAt` scheduled-delivery
protocol.

**Signature**

```ts
declare const isDeliverAt: (self: unknown) => self is DeliverAt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DeliverAt.ts#L44)

Since v4.0.0

# models

## DeliverAt (interface)

Interface for payloads that specify when a cluster message should be delivered
by returning the target delivery `DateTime` through the `DeliverAt` symbol
method.

**Signature**

```ts
export interface DeliverAt {
  [symbol](): DateTime
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DeliverAt.ts#L33)

Since v4.0.0

# symbols

## symbol

Defines the property key used by values that provide a scheduled delivery time.

**When to use**

Use to implement the scheduled-delivery protocol on cluster message payloads
by defining a method at this property key.

**Signature**

```ts
declare const symbol: "~effect/cluster/DeliverAt"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DeliverAt.ts#L23)

Since v4.0.0
