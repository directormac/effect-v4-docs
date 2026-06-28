---
title: EventLogEncryption.ts
nav_order: 224
parent: "effect"
---

## EventLogEncryption.ts overview

Cryptographic service for encrypted event-log replication.

`EventLogEncryption` turns local journal entries into encrypted remote
payloads and decrypts encrypted changes received from a server. It also
hashes byte data and creates event-log identities, so remote replication can
use storage or transport that should not see plaintext event data.

Since v4.0.0

---

## Exports Grouped by Category

- [encryption](#encryption)
  - [layerSubtle](#layersubtle)
  - [makeEncryptionSubtle](#makeencryptionsubtle)
- [models](#models)
  - [EncryptedEntry](#encryptedentry)
  - [EncryptedRemoteEntry](#encryptedremoteentry)
  - [EncryptedRemoteEntry (interface)](#encryptedremoteentry-interface)
- [services](#services)
  - [EventLogEncryption (class)](#eventlogencryption-class)

---

# encryption

## layerSubtle

Provides `EventLogEncryption` using `globalThis.crypto`.

**Signature**

```ts
declare const layerSubtle: Layer.Layer<EventLogEncryption, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogEncryption.ts#L166)

Since v4.0.0

## makeEncryptionSubtle

Creates an `EventLogEncryption` service backed by the Web Crypto `SubtleCrypto`
APIs from the supplied `Crypto` implementation.

**Signature**

```ts
declare const makeEncryptionSubtle: (crypto: Crypto) => Effect.Effect<EventLogEncryption["Service"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogEncryption.ts#L99)

Since v4.0.0

# models

## EncryptedEntry

Schema for an encrypted journal entry paired with the id of the original
entry.

**Signature**

```ts
declare const EncryptedEntry: Schema.Struct<{
  readonly entryId: Schema.brand<
    Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>,
    "effect/eventlog/EventJournal/EntryId"
  >
  readonly encryptedEntry: Transferable.Transferable<
    Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogEncryption.ts#L28)

Since v4.0.0

## EncryptedRemoteEntry

Schema for encrypted entries exchanged with a remote event-log server.

**Signature**

```ts
declare const EncryptedRemoteEntry: Schema.Struct<{
  readonly sequence: Schema.Number
  readonly iv: Transferable.Transferable<Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>>
  readonly entryId: Schema.brand<
    Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>,
    "effect/eventlog/EventJournal/EntryId"
  >
  readonly encryptedEntry: Transferable.Transferable<
    Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogEncryption.ts#L48)

Since v4.0.0

## EncryptedRemoteEntry (interface)

Type of an encrypted remote entry, including its remote sequence number,
initialization vector, entry id, and encrypted entry bytes.

**Signature**

```ts
export interface EncryptedRemoteEntry extends Schema.Schema.Type<typeof EncryptedRemoteEntry> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogEncryption.ts#L40)

Since v4.0.0

# services

## EventLogEncryption (class)

Service that provides identity generation, entry
encryption and decryption, and SHA-256 hashing for event-log replication.

**When to use**

Use to provide cryptographic operations required by encrypted event-log
replication.

**Signature**

```ts
declare class EventLogEncryption
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogEncryption.ts#L75)

Since v4.0.0
