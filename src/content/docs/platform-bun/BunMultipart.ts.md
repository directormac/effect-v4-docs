---
title: BunMultipart.ts
nav_order: 10
parent: "@effect/platform-bun"
---

## BunMultipart.ts overview

Bun-specific helpers for parsing HTTP `multipart/form-data` request bodies.

This module adapts a Bun `Request` body and headers into the shared
`Multipart` model. `stream` returns multipart parts as a `Stream`, while
`persisted` collects the form and writes file parts to scoped temporary files
through the current `FileSystem`, `Path`, and `Scope` services.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [persisted](#persisted)
  - [stream](#stream)

---

# constructors

## persisted

Parses and persists multipart data from a Bun `Request`, requiring file-system, path, and scope services.

**Signature**

```ts
declare const persisted: (
  source: Request
) => Effect.Effect<Multipart.Persisted, Multipart.MultipartError, FileSystem | Path | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunMultipart.ts#L46)

Since v4.0.0

## stream

Parses a Bun `Request` body as multipart data and returns a stream of multipart parts.

**Signature**

```ts
declare const stream: (source: Request) => Stream.Stream<Multipart.Part, Multipart.MultipartError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunMultipart.ts#L25)

Since v4.0.0
