---
title: NodeMultipart.ts
nav_order: 13
parent: "@effect/platform-node"
---

## NodeMultipart.ts overview

Node.js multipart parsing for HTTP `multipart/form-data` request bodies.

`NodeMultipart` adapts a Node `Readable` plus incoming HTTP headers into
Effect's shared multipart model. It can expose form parts as a stream or
collect a complete persisted form by writing file uploads to scoped temporary
files through the current `FileSystem` and `Path` services. `fileToReadable`
returns the underlying Node readable stream for file parts produced by this
parser.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [persisted](#persisted)
  - [stream](#stream)
- [converting](#converting)
  - [fileToReadable](#filetoreadable)

---

# constructors

## persisted

Parses multipart data from a Node readable request body and persists file
parts using the current `FileSystem`, `Path`, and `Scope` services.

**Signature**

```ts
declare const persisted: (
  source: Readable,
  headers: IncomingHttpHeaders
) => Effect.Effect<Multipart.Persisted, Multipart.MultipartError, Scope.Scope | FileSystem.FileSystem | Path.Path>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeMultipart.ts#L61)

Since v4.0.0

## stream

Parses multipart data from a Node readable request body and headers into a
stream of `Multipart.Part` values, converting parser failures to
`MultipartError`.

**Signature**

```ts
declare const stream: (
  source: Readable,
  headers: IncomingHttpHeaders
) => Stream.Stream<Multipart.Part, Multipart.MultipartError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeMultipart.ts#L35)

Since v4.0.0

# converting

## fileToReadable

Returns the underlying Node readable stream for a multipart file produced by
the Node multipart parser.

**Signature**

```ts
declare const fileToReadable: (file: Multipart.File) => Readable
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeMultipart.ts#L82)

Since v4.0.0
