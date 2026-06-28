---
title: JsonPointer.ts
nav_order: 50
parent: "effect"
---

## JsonPointer.ts overview

Escapes a JSON Pointer reference token according to RFC 6901 by encoding special characters so the token can be safely used as a segment in a JSON Pointer.

**When to use**

Use when you need to escape a single JSON Pointer path segment.

**Details**

- Returns a new escaped string
- Replaces `~` (tilde) with `~0` and `/` (forward slash) with `~1`
- Returns the input unchanged if it contains no special characters
- Empty strings are valid and returned unchanged

**Gotchas**

The replacement order matters: `~` is replaced before `/` to prevent double-escaping.

**Example** (Escaping special characters)

```ts
import { JsonPointer } from "effect"

JsonPointer.escapeToken("a/b") // "a~1b"
JsonPointer.escapeToken("c~d") // "c~0d"
JsonPointer.escapeToken("path/to~key") // "path~1to~0key"
```

**See**

- `unescapeToken` The inverse operation for decoding escaped tokens

Since v4.0.0

---

## Exports Grouped by Category

- [decoding](#decoding)
  - [unescapeToken](#unescapetoken)
- [encoding](#encoding)
  - [escapeToken](#escapetoken)

---

# decoding

## unescapeToken

Decodes a JSON Pointer reference token according to RFC 6901 escaping rules.

**When to use**

Use when you need to decode a single escaped JSON Pointer path segment.

**Details**

- Returns a new unescaped string
- Replaces `~1` with `/` (forward slash) and `~0` with `~` (tilde)
- Returns the input unchanged if it contains no escaped sequences
- Empty strings are valid and returned unchanged

**Gotchas**

The replacement order matters: `~1` is replaced before `~0` to prevent incorrect decoding.

**Example** (Unescaping special characters)

```ts
import { JsonPointer } from "effect"

JsonPointer.unescapeToken("a~1b") // "a/b"
JsonPointer.unescapeToken("c~0d") // "c~d"
JsonPointer.unescapeToken("path~1to~0key") // "path/to~key"
```

**See**

- `escapeToken` The inverse operation for encoding tokens

**Signature**

```ts
declare const unescapeToken: (token: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonPointer.ts#L78)

Since v4.0.0

# encoding

## escapeToken

Escapes a JSON Pointer reference token according to RFC 6901 by encoding special characters so the token can be safely used as a segment in a JSON Pointer.

**When to use**

Use when you need to escape a single JSON Pointer path segment.

**Details**

- Returns a new escaped string
- Replaces `~` (tilde) with `~0` and `/` (forward slash) with `~1`
- Returns the input unchanged if it contains no special characters
- Empty strings are valid and returned unchanged

**Gotchas**

The replacement order matters: `~` is replaced before `/` to prevent double-escaping.

**Example** (Escaping special characters)

```ts
import { JsonPointer } from "effect"

JsonPointer.escapeToken("a/b") // "a~1b"
JsonPointer.escapeToken("c~d") // "c~0d"
JsonPointer.escapeToken("path/to~key") // "path~1to~0key"
```

**See**

- `unescapeToken` The inverse operation for decoding escaped tokens

**Signature**

```ts
declare const escapeToken: (token: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonPointer.ts#L42)

Since v4.0.0
