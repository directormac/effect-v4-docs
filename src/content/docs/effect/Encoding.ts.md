---
title: Encoding.ts
nav_order: 26
parent: "effect"
---

## Encoding.ts overview

Encoding and decoding helpers for Base64, Base64Url, and hexadecimal text.
The functions convert between strings, UTF-8 text, and `Uint8Array` bytes.
Encode functions return strings directly, while decode functions return
`Result.Result` so invalid input is reported as an `EncodingError` instead of
being thrown.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [EncodingError (class)](#encodingerror-class)
    - [[EncodingErrorTypeId] (property)](#encodingerrortypeid-property)
- [decoding](#decoding)
  - [decodeBase64](#decodebase64)
  - [decodeBase64String](#decodebase64string)
  - [decodeBase64Url](#decodebase64url)
  - [decodeBase64UrlString](#decodebase64urlstring)
  - [decodeHex](#decodehex)
  - [decodeHexString](#decodehexstring)
- [encoding](#encoding)
  - [encodeBase64](#encodebase64)
  - [encodeBase64Url](#encodebase64url)
  - [encodeHex](#encodehex)
- [guards](#guards)
  - [isEncodingError](#isencodingerror)
- [type IDs](#type-ids)
  - [EncodingErrorTypeId](#encodingerrortypeid)
  - [EncodingErrorTypeId (type alias)](#encodingerrortypeid-type-alias)

---

# constructors

## EncodingError (class)

Error returned when an encoding or decoding operation cannot process its
input.

**When to use**

Use when you need to handle or inspect failures from encoding or decoding
operations.

**Details**

The error records whether the failure happened during encoding or decoding,
which encoding module reported it, the original input, and a human-readable
message.

**See**

- `isEncodingError` for checking whether a value is an EncodingError

**Signature**

```ts
declare class EncodingError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L70)

Since v4.0.0

### [EncodingErrorTypeId] (property)

Marks this value as an encoding or decoding error for runtime guards.

**When to use**

Use to identify `EncodingError` instances through `isEncodingError`.

**Signature**

```ts
readonly [EncodingErrorTypeId]: "~effect/encoding/EncodingError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L85)

Since v4.0.0

# decoding

## decodeBase64

Decodes a base64 (RFC4648) string into bytes safely.

**When to use**

Use to decode a standard padded Base64 string into bytes without throwing on
invalid input.

**Details**

Returns `Result.succeed` with a `Uint8Array` when decoding succeeds, or
`Result.fail` with an `EncodingError` when the input is not valid base64.

**Example** (Decoding Base64 bytes)

```ts
import { Encoding, Result } from "effect"

const result = Encoding.decodeBase64("SGVsbG8=")
if (Result.isSuccess(result)) {
  console.log(Array.from(result.success)) // [72, 101, 108, 108, 111]
}
```

**Signature**

```ts
declare const decodeBase64: (str: string) => Result.Result<Uint8Array, EncodingError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L177)

Since v2.0.0

## decodeBase64String

Decodes a base64 (RFC4648) string into a UTF-8 string safely.

**When to use**

Use to decode a standard padded Base64 string into UTF-8 text without
throwing on invalid input.

**Details**

Returns `Result.succeed` with the decoded text when decoding succeeds, or
`Result.fail` with an `EncodingError` when the input is not valid base64.

**Example** (Decoding Base64 strings)

```ts
import { Encoding, Result } from "effect"

const result = Encoding.decodeBase64String("aGVsbG8=")
if (Result.isSuccess(result)) {
  console.log(result.success) // "hello"
}
```

**Signature**

```ts
declare const decodeBase64String: (str: string) => Result.Result<string, EncodingError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L257)

Since v2.0.0

## decodeBase64Url

Decodes a URL-safe base64 string into bytes safely.

**When to use**

Use to decode padded or unpadded Base64Url text into bytes without throwing
on invalid input.

**Details**

Returns `Result.succeed` with a `Uint8Array` when decoding succeeds, or
`Result.fail` with an `EncodingError` when the input is not valid URL-safe
base64. Both padded and unpadded URL-safe base64 forms are accepted when
otherwise valid.

**Example** (Decoding URL-safe Base64 bytes)

```ts
import { Encoding, Result } from "effect"

const result = Encoding.decodeBase64Url("SGVsbG8_")
if (Result.isSuccess(result)) {
  console.log(Array.from(result.success)) // [72, 101, 108, 108, 111, 63]
}
```

**Signature**

```ts
declare const decodeBase64Url: (str: string) => Result.Result<Uint8Array, EncodingError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L328)

Since v2.0.0

## decodeBase64UrlString

Decodes a URL-safe base64 string into a UTF-8 string safely.

**When to use**

Use to decode padded or unpadded Base64Url text into UTF-8 text without
throwing on invalid input.

**Details**

Returns `Result.succeed` with the decoded text when decoding succeeds, or
`Result.fail` with an `EncodingError` when the input is not valid URL-safe
base64.

**Example** (Decoding URL-safe Base64 strings)

```ts
import { Encoding, Result } from "effect"

const result = Encoding.decodeBase64UrlString("aGVsbG8_")
if (Result.isSuccess(result)) {
  console.log(result.success) // "hello?"
}
```

**Signature**

```ts
declare const decodeBase64UrlString: (str: string) => Result.Result<string, EncodingError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L388)

Since v2.0.0

## decodeHex

Decodes a hexadecimal string into bytes safely.

**When to use**

Use to decode hexadecimal text into bytes without throwing on invalid input.

**Details**

Returns `Result.succeed` with a `Uint8Array` when decoding succeeds, or
`Result.fail` with an `EncodingError` when the input has an odd length or
contains invalid hex characters.

**Example** (Decoding hex bytes)

```ts
import { Encoding, Result } from "effect"

const result = Encoding.decodeHex("48656c6c6f")
if (Result.isSuccess(result)) {
  console.log(Array.from(result.success)) // [72, 101, 108, 108, 111]
}
```

**Signature**

```ts
declare const decodeHex: (str: string) => Result.Result<Uint8Array, EncodingError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L447)

Since v2.0.0

## decodeHexString

Decodes a hexadecimal string into a UTF-8 string safely.

**When to use**

Use to decode hexadecimal text into UTF-8 text without throwing on invalid
input.

**Details**

Returns `Result.succeed` with the decoded text when decoding succeeds, or
`Result.fail` with an `EncodingError` when the input is not valid hex.

**Example** (Decoding hex strings)

```ts
import { Encoding, Result } from "effect"

const result = Encoding.decodeHexString("68656c6c6f")
if (Result.isSuccess(result)) {
  console.log(result.success) // "hello"
}
```

**Signature**

```ts
declare const decodeHexString: (str: string) => Result.Result<string, EncodingError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L509)

Since v2.0.0

# encoding

## encodeBase64

Encodes the given value into a base64 (RFC4648) `string`.

**When to use**

Use to encode text or bytes as a standard padded Base64 string for storage or
transport.

**Details**

String inputs are encoded as UTF-8 bytes before Base64 encoding.
`Uint8Array` inputs are encoded directly. The output uses the standard
RFC4648 alphabet with `=` padding.

**Example** (Encoding Base64 strings and bytes)

```ts
import { Encoding } from "effect"

// Encode a string
console.log(Encoding.encodeBase64("hello")) // "aGVsbG8="

// Encode binary data
const bytes = new Uint8Array([72, 101, 108, 108, 111])
console.log(Encoding.encodeBase64(bytes)) // "SGVsbG8="
```

**See**

- `decodeBase64` for decoding standard Base64 to bytes
- `decodeBase64String` for decoding standard Base64 to UTF-8 text
- `encodeBase64Url` for URL-safe unpadded Base64 output

**Signature**

```ts
declare const encodeBase64: (input: Uint8Array | string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L147)

Since v2.0.0

## encodeBase64Url

Encodes the given value into a base64 (URL) `string`.

**When to use**

Use to encode text or bytes as an unpadded Base64Url string for contexts that
require the URL-safe alphabet.

**Details**

String inputs are encoded as UTF-8 bytes before Base64Url encoding.
`Uint8Array` inputs are encoded directly. The output removes `=` padding and
replaces `+` with `-` and `/` with `_`.

**Example** (Encoding URL-safe Base64)

```ts
import { Encoding } from "effect"

// URL-safe base64 encoding (uses - and _ instead of + and /)
console.log(Encoding.encodeBase64Url("hello?")) // "aGVsbG8_"

const bytes = new Uint8Array([72, 101, 108, 108, 111, 63])
console.log(Encoding.encodeBase64Url(bytes)) // "SGVsbG8_"
```

**See**

- `decodeBase64Url` for decoding URL-safe Base64 to bytes
- `decodeBase64UrlString` for decoding URL-safe Base64 to UTF-8 text
- `encodeBase64` for standard padded Base64 output

**Signature**

```ts
declare const encodeBase64Url: (input: Uint8Array | string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L296)

Since v2.0.0

## encodeHex

Encodes the given value into a hex `string`.

**When to use**

Use to encode text or bytes as lowercase hexadecimal text.

**Example** (Encoding hex strings and bytes)

```ts
import { Encoding } from "effect"

// Encode a string to hex
console.log(Encoding.encodeHex("hello")) // "68656c6c6f"

// Encode binary data to hex
const bytes = new Uint8Array([72, 101, 108, 108, 111])
console.log(Encoding.encodeHex(bytes)) // "48656c6c6f"
```

**Signature**

```ts
declare const encodeHex: (input: Uint8Array | string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L417)

Since v2.0.0

# guards

## isEncodingError

Checks whether a value is an `EncodingError`.

**When to use**

Use to narrow an unknown value before handling it as an `EncodingError` from
encoding or decoding code.

**Details**

Returns `true` when the value carries the `EncodingErrorTypeId` marker and
narrows the value to `EncodingError`.

**See**

- `EncodingError` for the structured error produced by failed
  encoding and decoding operations

**Signature**

```ts
declare const isEncodingError: (u: unknown) => u is EncodingError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L107)

Since v4.0.0

# type IDs

## EncodingErrorTypeId

Type identifier stored on `EncodingError` values and used by
`isEncodingError`.

**When to use**

Use when implementing low-level `EncodingError`-compatible values that need
to carry the runtime marker.

**Details**

This marker is part of the runtime representation of `EncodingError`. Prefer
`isEncodingError` when narrowing unknown values.

**See**

- `isEncodingError` for the public guard that checks this marker

**Signature**

```ts
declare const EncodingErrorTypeId: "~effect/encoding/EncodingError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L37)

Since v4.0.0

## EncodingErrorTypeId (type alias)

Literal type of the `EncodingErrorTypeId` marker.

**When to use**

Use to type the marker carried by `EncodingError` values.

**Signature**

```ts
type EncodingErrorTypeId = typeof EncodingErrorTypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Encoding.ts#L49)

Since v4.0.0
