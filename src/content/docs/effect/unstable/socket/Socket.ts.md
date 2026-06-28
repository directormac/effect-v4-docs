---
title: Socket.ts
nav_order: 328
parent: "effect"
---

## Socket.ts overview

Models bidirectional socket connections in Effect.

The `Socket` service runs handlers for binary, string, or raw frames and
provides a scoped writer for outgoing bytes, text, or close events. This
module also includes socket errors, channel adapters, WebSocket layers, and
transform-stream-backed sockets.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [toChannel](#tochannel)
  - [toChannelMap](#tochannelmap)
  - [toChannelString](#tochannelstring)
  - [toChannelWith](#tochannelwith)
- [constructors](#constructors)
  - [fromTransformStream](#fromtransformstream)
  - [fromWebSocket](#fromwebsocket)
  - [make](#make)
  - [makeChannel](#makechannel)
  - [makeWebSocket](#makewebsocket)
  - [makeWebSocketChannel](#makewebsocketchannel)
- [errors](#errors)
  - [SocketCloseError (class)](#socketcloseerror-class)
    - [filterClean (static method)](#filterclean-static-method)
  - [SocketError (class)](#socketerror-class)
    - [is (static method)](#is-static-method)
    - [[SocketErrorTypeId] (property)](#socketerrortypeid-property)
    - [message (property)](#message-property)
  - [SocketErrorReason](#socketerrorreason)
  - [SocketErrorReason (type alias)](#socketerrorreason-type-alias)
  - [SocketOpenError (class)](#socketopenerror-class)
  - [SocketReadError (class)](#socketreaderror-class)
    - [message (property)](#message-property-1)
  - [SocketWriteError (class)](#socketwriteerror-class)
    - [message (property)](#message-property-2)
- [fiber refs](#fiber-refs)
  - [SendQueueCapacity](#sendqueuecapacity)
- [guards](#guards)
  - [isSocket](#issocket)
- [layers](#layers)
  - [layerWebSocket](#layerwebsocket)
  - [layerWebSocketConstructorGlobal](#layerwebsocketconstructorglobal)
- [models](#models)
  - [CloseEvent (class)](#closeevent-class)
    - [toString (method)](#tostring-method)
    - [[CloseEventTypeId] (property)](#closeeventtypeid-property)
    - [code (property)](#code-property)
    - [reason (property)](#reason-property)
  - [InputTransformStream (interface)](#inputtransformstream-interface)
  - [Socket (interface)](#socket-interface)
- [predicates](#predicates)
  - [defaultCloseCodeIsError](#defaultclosecodeiserror)
- [refinements](#refinements)
  - [isCloseEvent](#iscloseevent)
  - [isSocketError](#issocketerror)
- [services](#services)
  - [Socket](#socket)
  - [WebSocket (class)](#websocket-class)
  - [WebSocketConstructor (class)](#websocketconstructor-class)
- [type IDs](#type-ids)
  - [SocketErrorTypeId](#socketerrortypeid)
  - [SocketErrorTypeId (type alias)](#socketerrortypeid-type-alias)
  - [TypeId](#typeid)

---

# combinators

## toChannel

Converts a `Socket` into a binary `Channel`, encoding incoming string frames
as UTF-8 bytes.

**Signature**

```ts
declare const toChannel: <IE>(
  self: Socket
) => Channel.Channel<
  NonEmptyReadonlyArray<Uint8Array>,
  SocketError | IE,
  void,
  NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
  IE
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L444)

Since v4.0.0

## toChannelMap

Converts a `Socket` into a bidirectional `Channel`, mapping incoming string
or binary frames and writing outgoing frame batches to the socket.

**Signature**

```ts
declare const toChannelMap: <IE, A>(
  self: Socket,
  f: (data: Uint8Array | string) => A
) => Channel.Channel<
  NonEmptyReadonlyArray<A>,
  SocketError | IE,
  void,
  NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
  IE
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L386)

Since v4.0.0

## toChannelString

Converts a `Socket` into a string `Channel`, decoding binary frames with the
optional text encoding.

**Signature**

```ts
declare const toChannelString: {
  (
    encoding?: string | undefined
  ): <IE>(
    self: Socket
  ) => Channel.Channel<
    NonEmptyReadonlyArray<string>,
    SocketError | IE,
    void,
    NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
    IE
  >
  <IE>(
    self: Socket,
    encoding?: string | undefined
  ): Channel.Channel<
    NonEmptyReadonlyArray<string>,
    SocketError | IE,
    void,
    NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
    IE
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L464)

Since v4.0.0

## toChannelWith

Creates a `Socket` to binary `Channel` adapter with a fixed upstream error
type.

**Signature**

```ts
declare const toChannelWith: <IE = never>() => (
  self: Socket
) => Channel.Channel<
  NonEmptyReadonlyArray<Uint8Array>,
  SocketError | IE,
  void,
  NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
  IE
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L503)

Since v4.0.0

# constructors

## fromTransformStream

Builds a `Socket` from a scoped `InputTransformStream`, reading incoming
chunks through socket handlers and writing outgoing chunks to the writable
stream, encoding strings as UTF-8 and using close-code classification for
`CloseEvent` values.

**Signature**

```ts
declare const fromTransformStream: <R>(
  acquire: Effect.Effect<InputTransformStream, SocketError, R>,
  options?: { readonly closeCodeIsError?: (code: number) => boolean }
) => Effect.Effect<Socket, never, Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L814)

Since v4.0.0

## fromWebSocket

Builds a `Socket` from a scoped WebSocket acquisition effect, waiting for the
socket to open, dispatching message handlers in fibers, and translating
open, read, and close events into `SocketError` values.

**Signature**

```ts
declare const fromWebSocket: <RO>(
  acquire: Effect.Effect<globalThis.WebSocket, SocketError, RO>,
  options?:
    | {
        readonly closeCodeIsError?: ((code: number) => boolean) | undefined
        readonly openTimeout?: Duration.Input | undefined
      }
    | undefined
) => Effect.Effect<Socket, never, Exclude<RO, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L606)

Since v4.0.0

## make

Constructs a `Socket` from a raw read loop and scoped writer, deriving binary
and string read loops when they are not provided.

**Signature**

```ts
declare const make: (options: {
  readonly runRaw: <_, E, R>(
    handler: (_: string | Uint8Array) => Effect.Effect<_, E, R> | void,
    options?: { readonly onOpen?: Effect.Effect<void> | undefined }
  ) => Effect.Effect<void, SocketError | E, R>
  readonly run?: <_, E, R>(
    handler: (_: Uint8Array) => Effect.Effect<_, E, R> | void,
    options?: { readonly onOpen?: Effect.Effect<void> | undefined }
  ) => Effect.Effect<void, SocketError | E, R>
  readonly runString?: <_, E, R>(
    handler: (_: string) => Effect.Effect<_, E, R> | void,
    options?: { readonly onOpen?: Effect.Effect<void> | undefined }
  ) => Effect.Effect<void, SocketError | E, R>
  readonly writer: Effect.Effect<
    (chunk: Uint8Array | string | CloseEvent) => Effect.Effect<void, SocketError>,
    never,
    Scope.Scope
  >
}) => Socket
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L100)

Since v4.0.0

## makeChannel

Creates a binary socket `Channel` from the `Socket` service in the
environment.

**Signature**

```ts
declare const makeChannel: <IE = never>() => Channel.Channel<
  NonEmptyReadonlyArray<Uint8Array>,
  SocketError | IE,
  void,
  NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
  IE,
  unknown,
  Socket
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L521)

Since v4.0.0

## makeWebSocket

Creates a `Socket` backed by a `WebSocketConstructor`, acquiring the
WebSocket for each run and using the close-code classifier to decide which
closes fail the run.

**Signature**

```ts
declare const makeWebSocket: (
  url: string | Effect.Effect<string>,
  options?: {
    readonly closeCodeIsError?: ((code: number) => boolean) | undefined
    readonly openTimeout?: Duration.Input | undefined
    readonly protocols?: string | Array<string> | undefined
  }
) => Effect.Effect<Socket, never, WebSocketConstructor>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L581)

Since v4.0.0

## makeWebSocketChannel

Creates a binary `Channel` backed by a WebSocket URL, requiring a
`WebSocketConstructor` service.

**Signature**

```ts
declare const makeWebSocketChannel: <IE = never>(
  url: string,
  options?: { readonly closeCodeIsError?: (code: number) => boolean }
) => Channel.Channel<
  NonEmptyReadonlyArray<Uint8Array>,
  SocketError | IE,
  void,
  NonEmptyReadonlyArray<Uint8Array | string | CloseEvent>,
  IE,
  unknown,
  WebSocketConstructor
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L749)

Since v4.0.0

# errors

## SocketCloseError (class)

Typed error for a socket close event, carrying the close code and optional
close reason.

**Signature**

```ts
declare class SocketCloseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L284)

Since v4.0.0

### filterClean (static method)

Separates clean socket close errors from errors that should remain failures.

**Signature**

```ts
declare const filterClean: (isClean: (code: number) => boolean) => <E>(u: E) => Result.Result<SocketCloseError, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L294)

Since v4.0.0

## SocketError (class)

Tagged error that wraps socket read, write, open, and close failures while
preserving the underlying reason.

**Signature**

```ts
declare class SocketError {
  constructor(props: { readonly reason: SocketReadError | SocketWriteError | SocketOpenError | SocketCloseError })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L342)

Since v4.0.0

### is (static method)

Returns `true` when the value is a `SocketError`.

**Signature**

```ts
declare const is: (u: unknown) => u is SocketError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L372)

Since v4.0.0

### [SocketErrorTypeId] (property)

Marks this value as a socket error wrapper for runtime guards.

**Signature**

```ts
readonly [SocketErrorTypeId]: "~effect/socket/Socket/SocketError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L365)

Since v4.0.0

### message (property)

**Signature**

```ts
readonly message: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L376)

## SocketErrorReason

Schema for all socket-specific error reasons.

**Signature**

```ts
declare const SocketErrorReason: Schema.Union<
  readonly [typeof SocketReadError, typeof SocketWriteError, typeof SocketOpenError, typeof SocketCloseError]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L316)

Since v4.0.0

## SocketErrorReason (type alias)

Union of socket-specific read, write, open, and close error reasons.

**Signature**

```ts
type SocketErrorReason = SocketReadError | SocketWriteError | SocketOpenError | SocketCloseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L329)

Since v4.0.0

## SocketOpenError (class)

Typed error for failures that occur while opening a socket, including
unknown open failures and open timeouts.

**Signature**

```ts
declare class SocketOpenError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L260)

Since v4.0.0

## SocketReadError (class)

Typed error for failures that occur while reading from a socket.

**Signature**

```ts
declare class SocketReadError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L223)

Since v4.0.0

### message (property)

Default message used for socket read failures.

**Signature**

```ts
readonly message: "An error occurred during Read"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L232)

Since v4.0.0

## SocketWriteError (class)

Typed error for failures that occur while writing to a socket.

**Signature**

```ts
declare class SocketWriteError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L241)

Since v4.0.0

### message (property)

Default message used for socket write failures.

**Signature**

```ts
readonly message: "An error occurred during Write"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L250)

Since v4.0.0

# fiber refs

## SendQueueCapacity

Context reference for socket send queue capacity, defaulting to `16`.

**Signature**

```ts
declare const SendQueueCapacity: Context.Reference<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L789)

Since v4.0.0

# guards

## isSocket

Returns `true` when a value is a `Socket`.

**Signature**

```ts
declare const isSocket: (u: unknown) => u is Socket
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L44)

Since v4.0.0

# layers

## layerWebSocket

Layer that provides a `Socket` service backed by a WebSocket URL or URL
effect.

**Signature**

```ts
declare const layerWebSocket: (
  url: string | Effect.Effect<string>,
  options?:
    | {
        readonly closeCodeIsError?: ((code: number) => boolean) | undefined
        readonly openTimeout?: Duration.Input | undefined
        readonly protocols?: string | Array<string> | undefined
      }
    | undefined
) => Layer.Layer<Socket, never, WebSocketConstructor>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L774)

Since v4.0.0

## layerWebSocketConstructorGlobal

Layer that provides `WebSocketConstructor` using `globalThis.WebSocket`.

**Signature**

```ts
declare const layerWebSocketConstructorGlobal: Layer.Layer<WebSocketConstructor, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L569)

Since v4.0.0

# models

## CloseEvent (class)

Represents a socket close event value carrying a close code and optional
reason.

**Signature**

```ts
declare class CloseEvent {
  constructor(code = 1000, reason?: string)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L160)

Since v4.0.0

### toString (method)

Formats the close code and optional reason for display.

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L180)

Since v4.0.0

### [CloseEventTypeId] (property)

Marks this value as a socket close event for runtime guards.

**Signature**

```ts
readonly [CloseEventTypeId]: "~effect/socket/Socket/CloseEvent"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L166)

Since v4.0.0

### code (property)

**Signature**

```ts
readonly code: number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L167)

### reason (property)

**Signature**

```ts
readonly reason: string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L168)

## InputTransformStream (interface)

Readable and writable stream pair used to adapt transform-style streams into
a `Socket`.

**Signature**

```ts
export interface InputTransformStream {
  readonly readable: ReadableStream<Uint8Array> | ReadableStream<string> | ReadableStream<Uint8Array | string>
  readonly writable: WritableStream<Uint8Array>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L800)

Since v4.0.0

## Socket (interface)

Effect-based socket abstraction for running string or binary read handlers
and obtaining a scoped writer for outgoing frames and close events.

**Signature**

```ts
export interface Socket {
  readonly [TypeId]: typeof TypeId
  readonly run: <_, E = never, R = never>(
    handler: (_: Uint8Array) => Effect.Effect<_, E, R> | void,
    options?: {
      readonly onOpen?: Effect.Effect<void> | undefined
    }
  ) => Effect.Effect<void, SocketError | E, R>
  readonly runString: <_, E = never, R = never>(
    handler: (_: string) => Effect.Effect<_, E, R> | void,
    options?: {
      readonly onOpen?: Effect.Effect<void> | undefined
    }
  ) => Effect.Effect<void, SocketError | E, R>
  readonly runRaw: <_, E = never, R = never>(
    handler: (_: string | Uint8Array) => Effect.Effect<_, E, R> | void,
    options?: {
      readonly onOpen?: Effect.Effect<void> | undefined
    }
  ) => Effect.Effect<void, SocketError | E, R>
  readonly writer: Effect.Effect<
    (chunk: Uint8Array | string | CloseEvent) => Effect.Effect<void, SocketError>,
    never,
    Scope.Scope
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L66)

Since v4.0.0

# predicates

## defaultCloseCodeIsError

Default close-code classifier that treats every socket close code as an
error.

**Signature**

```ts
declare const defaultCloseCodeIsError: (_code: number) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L538)

Since v4.0.0

# refinements

## isCloseEvent

Returns `true` when a value is a `CloseEvent`.

**Signature**

```ts
declare const isCloseEvent: (u: unknown) => u is CloseEvent
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L191)

Since v4.0.0

## isSocketError

Returns `true` when a value is a `SocketError`.

**Signature**

```ts
declare const isSocketError: (u: unknown) => u is SocketError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L215)

Since v4.0.0

# services

## Socket

Service tag for bidirectional socket transports.

**When to use**

Use to access or provide the socket implementation used by programs that
read and write frames through the Effect environment.

**Signature**

```ts
declare const Socket: Context.Service<Socket, Socket>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L57)

Since v4.0.0

## WebSocket (class)

Context service for the active `WebSocket` instance available while a
WebSocket-backed socket run is handling events.

**Signature**

```ts
declare class WebSocket
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L547)

Since v4.0.0

## WebSocketConstructor (class)

Context service for constructing `WebSocket` instances from a URL and
optional protocols.

**Signature**

```ts
declare class WebSocketConstructor
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L558)

Since v4.0.0

# type IDs

## SocketErrorTypeId

Runtime type identifier attached to `SocketError` values.

**Signature**

```ts
declare const SocketErrorTypeId: "~effect/socket/Socket/SocketError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L207)

Since v4.0.0

## SocketErrorTypeId (type alias)

Type-level identifier used to mark `SocketError` values.

**Signature**

```ts
type SocketErrorTypeId = "~effect/socket/Socket/SocketError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L199)

Since v4.0.0

## TypeId

Runtime type identifier attached to `Socket` services.

**Signature**

```ts
declare const TypeId: "~effect/socket/Socket"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Socket.ts#L36)

Since v4.0.0
