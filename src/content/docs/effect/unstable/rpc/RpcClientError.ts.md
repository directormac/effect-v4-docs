---
title: RpcClientError.ts
nav_order: 314
parent: "effect"
---

## RpcClientError.ts overview

Client-side protocol failures reported by unstable RPC transports.

`RpcClientError` is the error type generated clients use when a call fails
before a remote handler can return its declared typed error. Its `reason`
covers built-in transport failures from HTTP, sockets, and workers, plus
`RpcClientDefect` values for malformed or incompatible protocol data.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [RpcClientDefect (class)](#rpcclientdefect-class)
  - [RpcClientError (class)](#rpcclienterror-class)
    - [[TypeId] (property)](#typeid-property)

---

# errors

## RpcClientDefect (class)

Represents a client-side RPC defect, such as a protocol violation or
decoding failure, with a message and original cause.

**Signature**

```ts
declare class RpcClientDefect
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClientError.ts#L25)

Since v4.0.0

## RpcClientError (class)

Error wrapper for RPC client failures, including worker, socket, HTTP client,
and client protocol defect failures.

**Signature**

```ts
declare class RpcClientError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClientError.ts#L38)

Since v4.0.0

### [TypeId] (property)

Marks this value as an RPC client error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/rpc/RpcClientError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClientError.ts#L52)

Since v4.0.0
