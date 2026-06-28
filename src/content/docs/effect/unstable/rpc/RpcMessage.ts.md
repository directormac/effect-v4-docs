---
title: RpcMessage.ts
nav_order: 316
parent: "effect"
---

## RpcMessage.ts overview

Message envelopes shared by unstable RPC clients, servers, serializers, and
transports.

`RpcMessage` is the protocol vocabulary below `RpcClient` and `RpcServer`.
It defines decoded messages for in-process channels and encoded messages for
transport boundaries, so custom protocols can move the same request,
streaming, acknowledgement, interrupt, keepalive, and defect signals as the
built-in HTTP, socket, worker, and test transports.

Since v4.0.0

---

## Exports Grouped by Category

- [guards](#guards)
  - [isTerminalResponse](#isterminalresponse)
- [request](#request)
  - [Ack (interface)](#ack-interface)
  - [AckEncoded (interface)](#ackencoded-interface)
  - [Eof (interface)](#eof-interface)
  - [FromClient (type alias)](#fromclient-type-alias)
  - [FromClientEncoded (type alias)](#fromclientencoded-type-alias)
  - [Interrupt (interface)](#interrupt-interface)
  - [InterruptEncoded (interface)](#interruptencoded-interface)
  - [Ping (interface)](#ping-interface)
  - [Request (interface)](#request-interface)
  - [RequestEncoded (interface)](#requestencoded-interface)
  - [RequestId](#requestid)
  - [RequestId (type alias)](#requestid-type-alias)
  - [constEof](#consteof)
  - [constPing](#constping)
- [response](#response)
  - [ClientEnd (interface)](#clientend-interface)
  - [ClientProtocolError (interface)](#clientprotocolerror-interface)
  - [ExitEncoded (type alias)](#exitencoded-type-alias)
  - [FromServer (type alias)](#fromserver-type-alias)
  - [FromServerEncoded (type alias)](#fromserverencoded-type-alias)
  - [Pong (interface)](#pong-interface)
  - [ResponseChunk (interface)](#responsechunk-interface)
  - [ResponseChunkEncoded (interface)](#responsechunkencoded-interface)
  - [ResponseDefect (interface)](#responsedefect-interface)
  - [ResponseDefectEncoded](#responsedefectencoded)
  - [ResponseDefectEncoded (interface)](#responsedefectencoded-interface)
  - [ResponseExit (interface)](#responseexit-interface)
  - [ResponseExitDieEncoded](#responseexitdieencoded)
  - [ResponseExitEncoded (interface)](#responseexitencoded-interface)
  - [ResponseId (type alias)](#responseid-type-alias)
  - [constPong](#constpong)
- [type IDs](#type-ids)
  - [ResponseIdTypeId](#responseidtypeid)
  - [ResponseIdTypeId (type alias)](#responseidtypeid-type-alias)

---

# guards

## isTerminalResponse

Checks if the response type is terminal.

**Signature**

```ts
declare const isTerminalResponse: (response: FromServerEncoded) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L410)

Since v4.0.0

# request

## Ack (interface)

A decoded acknowledgement for a streamed RPC response chunk.

**Signature**

```ts
export interface Ack {
  readonly _tag: "Ack"
  readonly requestId: RequestId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L96)

Since v4.0.0

## AckEncoded (interface)

The transport-encoded acknowledgement for a streamed RPC response chunk.

**Signature**

```ts
export interface AckEncoded {
  readonly _tag: "Ack"
  readonly requestId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L120)

Since v4.0.0

## Eof (interface)

A client-to-server message indicating that the client has finished sending
input for the current connection or request batch.

**Signature**

```ts
export interface Eof {
  readonly _tag: "Eof"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L143)

Since v4.0.0

## FromClient (type alias)

Decoded messages that can be sent from an RPC client to a server.

**Signature**

```ts
type FromClient<A> = Request<A> | Ack | Interrupt | Eof
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L26)

Since v4.0.0

## FromClientEncoded (type alias)

Transport-encoded messages that can be sent from an RPC client to a server.

**Signature**

```ts
type FromClientEncoded = RequestEncoded | AckEncoded | InterruptEncoded | Ping | Eof
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L34)

Since v4.0.0

## Interrupt (interface)

A decoded request to interrupt an in-flight RPC, carrying the request id and
interrupting fiber ids.

**Signature**

```ts
export interface Interrupt {
  readonly _tag: "Interrupt"
  readonly requestId: RequestId
  readonly interruptors: ReadonlyArray<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L108)

Since v4.0.0

## InterruptEncoded (interface)

The transport-encoded request to interrupt an in-flight RPC.

**Signature**

```ts
export interface InterruptEncoded {
  readonly _tag: "Interrupt"
  readonly requestId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L131)

Since v4.0.0

## Ping (interface)

A client-to-server keepalive message used by protocols that monitor
connection liveness.

**Signature**

```ts
export interface Ping {
  readonly _tag: "Ping"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L154)

Since v4.0.0

## Request (interface)

The decoded RPC request envelope for an RPC union, carrying a branded request
id, typed RPC tag, decoded payload, headers, and optional trace context.

**Signature**

```ts
export interface Request<A extends Rpc.Any> {
  readonly _tag: "Request"
  readonly id: RequestId
  readonly tag: Rpc.Tag<A>
  readonly payload: Rpc.Payload<A>
  readonly headers: Headers
  readonly traceId?: string
  readonly spanId?: string
  readonly sampled?: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L79)

Since v4.0.0

## RequestEncoded (interface)

The transport-encoded RPC request envelope, including the string request id,
RPC tag, encoded payload, headers, and optional trace context.

**Signature**

```ts
export interface RequestEncoded {
  readonly _tag: "Request"
  readonly id: string
  readonly tag: string
  readonly payload: unknown
  readonly headers: ReadonlyArray<[string, string]>
  readonly traceId?: string
  readonly spanId?: string
  readonly sampled?: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L61)

Since v4.0.0

## RequestId

Converts a bigint or string request id into the branded `RequestId` type.

**Signature**

```ts
declare const RequestId: (id: bigint | string) => RequestId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L51)

Since v4.0.0

## RequestId (type alias)

A branded request identifier used to correlate RPC requests, responses,
chunks, acknowledgements, and interrupts.

**Signature**

```ts
type RequestId = Branded<bigint, "~effect/rpc/RpcMessage/RequestId">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L43)

Since v4.0.0

## constEof

Represents the reusable `Eof` message value.

**Signature**

```ts
declare const constEof: Eof
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L164)

Since v4.0.0

## constPing

Represents the reusable `Ping` message value.

**Signature**

```ts
declare const constPing: Ping
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L172)

Since v4.0.0

# response

## ClientEnd (interface)

A server message indicating that the client connection has ended.

**Signature**

```ts
export interface ClientEnd {
  readonly _tag: "ClientEnd"
  readonly clientId: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L381)

Since v4.0.0

## ClientProtocolError (interface)

A server-to-client protocol message reporting a client protocol error to all
affected in-flight requests.

**Signature**

```ts
export interface ClientProtocolError {
  readonly _tag: "ClientProtocolError"
  readonly error: RpcClientError
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L296)

Since v4.0.0

## ExitEncoded (type alias)

The transport representation of an RPC `Exit`, encoding success values or a
failure cause made of failures, defects, and interrupts.

**Signature**

```ts
type ExitEncoded<A, E> =
  | {
      readonly _tag: "Success"
      readonly value: A
    }
  | {
      readonly _tag: "Failure"
      readonly cause: ReadonlyArray<
        | {
            readonly _tag: "Fail"
            readonly error: E
          }
        | {
            readonly _tag: "Die"
            readonly defect: unknown
          }
        | {
            readonly _tag: "Interrupt"
            readonly fiberId: number | undefined
          }
      >
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L257)

Since v4.0.0

## FromServer (type alias)

Decoded messages that can be sent from an RPC server to a client.

**Signature**

```ts
type FromServer<A> = ResponseChunk<A> | ResponseExit<A> | ResponseDefect | ClientEnd
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L180)

Since v4.0.0

## FromServerEncoded (type alias)

Transport-encoded messages that can be sent from an RPC server to a client.

**Signature**

```ts
type FromServerEncoded = ResponseChunkEncoded | ResponseExitEncoded | ResponseDefectEncoded | Pong | ClientProtocolError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L192)

Since v4.0.0

## Pong (interface)

A server-to-client keepalive response to a `Ping` message.

**Signature**

```ts
export interface Pong {
  readonly _tag: "Pong"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L392)

Since v4.0.0

## ResponseChunk (interface)

The decoded response message containing a non-empty batch of stream chunk
values for a specific client and request.

**Signature**

```ts
export interface ResponseChunk<A extends Rpc.Any> {
  readonly _tag: "Chunk"
  readonly clientId: number
  readonly requestId: RequestId
  readonly values: NonEmptyReadonlyArray<Rpc.SuccessChunk<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L243)

Since v4.0.0

## ResponseChunkEncoded (interface)

The transport-encoded response message containing a non-empty batch of stream
chunk values for a request.

**Signature**

```ts
export interface ResponseChunkEncoded {
  readonly _tag: "Chunk"
  readonly requestId: string
  readonly values: NonEmptyReadonlyArray<unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L230)

Since v4.0.0

## ResponseDefect (interface)

The decoded server defect message for a client connection.

**Signature**

```ts
export interface ResponseDefect {
  readonly _tag: "Defect"
  readonly clientId: number
  readonly defect: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L369)

Since v4.0.0

## ResponseDefectEncoded

Creates a transport-encoded defect response by encoding the input with
`Schema.Defect()`.

**Signature**

```ts
declare const ResponseDefectEncoded: (input: unknown) => ResponseDefectEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L358)

Since v4.0.0

## ResponseDefectEncoded (interface)

The transport-encoded server defect message used for protocol-level defects
that affect the client connection.

**Signature**

```ts
export interface ResponseDefectEncoded {
  readonly _tag: "Defect"
  readonly defect: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L322)

Since v4.0.0

## ResponseExit (interface)

The decoded terminal response for a request, carrying the typed `Rpc.Exit`
for the RPC.

**Signature**

```ts
export interface ResponseExit<A extends Rpc.Any> {
  readonly _tag: "Exit"
  readonly clientId: number
  readonly requestId: RequestId
  readonly exit: Rpc.Exit<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L308)

Since v4.0.0

## ResponseExitDieEncoded

Creates an encoded terminal response for a request whose exit is a defect
encoded with `Schema.Defect()`.

**Signature**

```ts
declare const ResponseExitDieEncoded: (options: {
  readonly requestId: RequestId
  readonly defect: unknown
}) => ResponseExitEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L336)

Since v4.0.0

## ResponseExitEncoded (interface)

The transport-encoded terminal response for a request, carrying the encoded
`Exit`.

**Signature**

```ts
export interface ResponseExitEncoded {
  readonly _tag: "Exit"
  readonly requestId: string
  readonly exit: ExitEncoded<unknown, unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L283)

Since v4.0.0

## ResponseId (type alias)

A branded numeric identifier for server responses.

**Signature**

```ts
type ResponseId = Branded<number, ResponseIdTypeId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L221)

Since v4.0.0

## constPong

Represents the reusable `Pong` message value.

**Signature**

```ts
declare const constPong: Pong
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L402)

Since v4.0.0

# type IDs

## ResponseIdTypeId

The brand identifier used by the `ResponseId` type.

**Signature**

```ts
declare const ResponseIdTypeId: "~effect//rpc/RpcServer/ResponseId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L205)

Since v4.0.0

## ResponseIdTypeId (type alias)

The literal type of the `ResponseId` brand identifier.

**Signature**

```ts
type ResponseIdTypeId = typeof ResponseIdTypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcMessage.ts#L213)

Since v4.0.0
