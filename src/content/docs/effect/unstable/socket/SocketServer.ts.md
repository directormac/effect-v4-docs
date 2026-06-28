---
title: SocketServer.ts
nav_order: 329
parent: "effect"
---

## SocketServer.ts overview

Service contract for servers that accept socket connections.

`SocketServer` exposes the bound server `address` and a long-running `run`
loop that hands each accepted connection to a handler as a `Socket.Socket`.
The module also defines TCP and Unix socket address models plus the
server-level errors reported while opening or running a server. Platform
layers provide concrete implementations of this service.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [SocketServerError (class)](#socketservererror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
  - [SocketServerErrorReason (type alias)](#socketservererrorreason-type-alias)
  - [SocketServerOpenError (class)](#socketserveropenerror-class)
  - [SocketServerUnknownError (class)](#socketserverunknownerror-class)
- [models](#models)
  - [Address (type alias)](#address-type-alias)
  - [TcpAddress (interface)](#tcpaddress-interface)
  - [UnixAddress (interface)](#unixaddress-interface)
- [services](#services)
  - [SocketServer (class)](#socketserver-class)
- [type IDs](#type-ids)
  - [ErrorTypeId](#errortypeid)
  - [ErrorTypeId (type alias)](#errortypeid-type-alias)

---

# errors

## SocketServerError (class)

Tagged socket server error that wraps a server error reason and exposes its
cause.

**Signature**

```ts
declare class SocketServerError {
  constructor(props: { readonly reason: SocketServerErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L90)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as a socket server error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "@effect/platform/SocketServer/SocketServerError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L106)

Since v4.0.0

## SocketServerErrorReason (type alias)

Union of socket server error reasons.

**Signature**

```ts
type SocketServerErrorReason = SocketServerOpenError | SocketServerUnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L81)

Since v4.0.0

## SocketServerOpenError (class)

Error reason for failures that occur while opening a socket server.

**Signature**

```ts
declare class SocketServerOpenError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L53)

Since v4.0.0

## SocketServerUnknownError (class)

Error reason for uncategorized socket server failures.

**Signature**

```ts
declare class SocketServerUnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L67)

Since v4.0.0

# models

## Address (type alias)

Socket server address, either a TCP host and port or a Unix socket path.

**Signature**

```ts
type Address = UnixAddress | TcpAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L124)

Since v4.0.0

## TcpAddress (interface)

TCP socket server address with hostname and port.

**Signature**

```ts
export interface TcpAddress {
  readonly _tag: "TcpAddress"
  readonly hostname: string
  readonly port: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L132)

Since v4.0.0

## UnixAddress (interface)

Unix socket server address identified by a filesystem path.

**Signature**

```ts
export interface UnixAddress {
  readonly _tag: "UnixAddress"
  readonly path: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L144)

Since v4.0.0

# services

## SocketServer (class)

Context service for a socket server, exposing its bound address and a run
loop that handles each accepted `Socket`.

**Signature**

```ts
declare class SocketServer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L24)

Since v4.0.0

# type IDs

## ErrorTypeId

Runtime type identifier attached to `SocketServerError` values.

**Signature**

```ts
declare const ErrorTypeId: "@effect/platform/SocketServer/SocketServerError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L37)

Since v4.0.0

## ErrorTypeId (type alias)

Type-level identifier used to mark `SocketServerError` values.

**Signature**

```ts
type ErrorTypeId = "@effect/platform/SocketServer/SocketServerError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketServer.ts#L45)

Since v4.0.0
