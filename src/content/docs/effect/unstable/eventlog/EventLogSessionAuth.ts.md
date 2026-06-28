---
title: EventLogSessionAuth.ts
nav_order: 230
parent: "effect"
---

## EventLogSessionAuth.ts overview

Signs and verifies event-log session authentication payloads.

Remote peers use this challenge-response flow to prove that they control a
session signing key before sending session traffic. The signed payload
includes the remote id, a short-lived challenge, the event-log public key, and
the signing public key in a stable byte format.

Since v4.0.0

---

## Exports Grouped by Category

- [challenge](#challenge)
  - [makeSessionAuthChallenge](#makesessionauthchallenge)
- [constants](#constants)
  - [AuthPayloadContext](#authpayloadcontext)
  - [Ed25519PublicKeyLength](#ed25519publickeylength)
  - [Ed25519SignatureLength](#ed25519signaturelength)
  - [SessionAuthChallengeLength](#sessionauthchallengelength)
  - [SessionAuthChallengeTimeToLiveMillis](#sessionauthchallengetimetolivemillis)
- [encoding](#encoding)
  - [decodeSessionAuthPayload](#decodesessionauthpayload)
  - [encodeSessionAuthPayload](#encodesessionauthpayload)
- [errors](#errors)
  - [EventLogSessionAuthError (class)](#eventlogsessionautherror-class)
- [models](#models)
  - [SessionAuthPayload (interface)](#sessionauthpayload-interface)
- [signing](#signing)
  - [signSessionAuthPayload](#signsessionauthpayload)
  - [signSessionAuthPayloadBytes](#signsessionauthpayloadbytes)
- [verification](#verification)
  - [verifySessionAuthPayload](#verifysessionauthpayload)
  - [verifySessionAuthPayloadBytes](#verifysessionauthpayloadbytes)
  - [verifySessionAuthenticateRequest](#verifysessionauthenticaterequest)

---

# challenge

## makeSessionAuthChallenge

Generates a random session authentication challenge using `globalThis.crypto`.

**Signature**

```ts
declare const makeSessionAuthChallenge: Effect.Effect<Uint8Array<ArrayBuffer>, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L485)

Since v4.0.0

# constants

## AuthPayloadContext

Defines the domain-separation string embedded in canonical session
authentication payloads.

**When to use**

Use when you need the domain-separation string used to build canonical
event-log session authentication payloads.

**Signature**

```ts
declare const AuthPayloadContext: "eventlog-auth-v1"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L31)

Since v4.0.0

## Ed25519PublicKeyLength

Defines the required byte length for raw Ed25519 public keys used in session
authentication.

**When to use**

Use when implementing session-auth serialization or validation that must
reject public keys with a non-canonical raw byte length.

**Signature**

```ts
declare const Ed25519PublicKeyLength: 32
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L45)

Since v4.0.0

## Ed25519SignatureLength

Defines the required byte length for Ed25519 signatures used in session authentication.

**When to use**

Use when implementing session-auth verification that must reject signatures
with a non-canonical byte length before cryptographic checking.

**Signature**

```ts
declare const Ed25519SignatureLength: 64
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L58)

Since v4.0.0

## SessionAuthChallengeLength

Defines the number of random bytes generated for a session authentication
challenge.

**When to use**

Use when you need the challenge size for event-log session authentication.

**Signature**

```ts
declare const SessionAuthChallengeLength: 32
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L71)

Since v4.0.0

## SessionAuthChallengeTimeToLiveMillis

Defines the time-to-live, in milliseconds, for a pending session
authentication challenge.

**When to use**

Use when you need the timeout for pending event-log session authentication
challenges.

**Signature**

```ts
declare const SessionAuthChallengeTimeToLiveMillis: 30000
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L85)

Since v4.0.0

# encoding

## decodeSessionAuthPayload

Decodes a canonical session authentication payload.

**Details**

The decoder validates the context field, UTF-8 fields, signing public key
length, and rejects truncated or trailing bytes.

**Signature**

```ts
declare const decodeSessionAuthPayload: (
  payload: Uint8Array<ArrayBufferLike>
) => Effect.Effect<SessionAuthPayload, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L313)

Since v4.0.0

## encodeSessionAuthPayload

Encodes a session authentication payload into the canonical byte format.

**Details**

The canonical payload format uses ordered big-endian length-prefixed fields:

1. context (fixed: eventlog-auth-v1)
2. remoteId
3. challenge bytes
4. publicKey
5. signingPublicKey bytes

**Signature**

```ts
declare const encodeSessionAuthPayload: (
  payload: SessionAuthPayload
) => Effect.Effect<Uint8Array<ArrayBuffer>, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L275)

Since v4.0.0

# errors

## EventLogSessionAuthError (class)

Error raised while encoding, decoding, signing, verifying, or generating
session authentication challenges.

**Signature**

```ts
declare class EventLogSessionAuthError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L108)

Since v4.0.0

# models

## SessionAuthPayload (interface)

Payload fields that are canonicalized and signed during session
authentication.

**Signature**

```ts
export interface SessionAuthPayload {
  readonly remoteId: string | Uint8Array
  readonly challenge: Uint8Array
  readonly publicKey: string
  readonly signingPublicKey: Uint8Array
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L94)

Since v4.0.0

# signing

## signSessionAuthPayload

Encodes a session authentication payload in canonical form and signs it with an
Ed25519 private key.

**Signature**

```ts
declare const signSessionAuthPayload: (
  options: SessionAuthPayload & { readonly signingPrivateKey: Uint8Array }
) => Effect.Effect<Uint8Array<ArrayBuffer>, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L443)

Since v4.0.0

## signSessionAuthPayloadBytes

Creates a canonical session authentication signature with an Ed25519 private key.

**Details**

The private key must be PKCS#8-encoded bytes importable by `SubtleCrypto`.

**Signature**

```ts
declare const signSessionAuthPayloadBytes: (options: {
  readonly payload: Uint8Array
  readonly signingPrivateKey: Uint8Array
}) => Effect.Effect<Uint8Array<ArrayBuffer>, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L357)

Since v4.0.0

# verification

## verifySessionAuthPayload

Encodes a session authentication payload in canonical form and verifies its
Ed25519 signature.

**Signature**

```ts
declare const verifySessionAuthPayload: (
  options: SessionAuthPayload & { readonly signature: Uint8Array }
) => Effect.Effect<boolean, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L464)

Since v4.0.0

## verifySessionAuthPayloadBytes

Verifies an Ed25519 signature for canonical session authentication payload
bytes.

**Details**

The payload, signing public key, and signature lengths are validated before
calling `SubtleCrypto.verify`.

**Signature**

```ts
declare const verifySessionAuthPayloadBytes: (options: {
  readonly payload: Uint8Array
  readonly signingPublicKey: Uint8Array
  readonly signature: Uint8Array
}) => Effect.Effect<boolean, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L405)

Since v4.0.0

## verifySessionAuthenticateRequest

Verifies an authentication request by requiring the `Ed25519` algorithm and
checking the signature over the canonical session authentication payload.

**Signature**

```ts
declare const verifySessionAuthenticateRequest: (options: {
  readonly remoteId: string | Uint8Array
  readonly challenge: Uint8Array
  readonly publicKey: string
  readonly signingPublicKey: Uint8Array
  readonly signature: Uint8Array
  readonly algorithm: string
}) => Effect.Effect<boolean, EventLogSessionAuthError, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogSessionAuth.ts#L502)

Since v4.0.0
