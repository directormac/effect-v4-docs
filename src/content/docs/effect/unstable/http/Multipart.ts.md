---
title: Multipart.ts
nav_order: 259
parent: "effect"
---

## Multipart.ts overview

Parses and persists HTTP `multipart/form-data` request bodies.

`Multipart` turns incoming byte streams into typed form parts. Text parts
become decoded fields, while upload parts stay as streamed files until they
are collected or written to scoped temporary files. The persisted
representation can then be decoded with schemas for handlers that receive
fields and uploaded files together. This module also includes multipart error
types, schema helpers for persisted files, and parser limit settings.

Since v4.0.0

---

## Exports Grouped by Category

- [Parsers](#parsers)
  - [makeChannel](#makechannel)
- [configuration](#configuration)
  - [makeConfig](#makeconfig)
- [converting](#converting)
  - [collectUint8Array](#collectuint8array)
  - [toPersisted](#topersisted)
- [errors](#errors)
  - [MultipartError (class)](#multiparterror-class)
    - [fromReason (static method)](#fromreason-static-method)
    - [[MultipartErrorTypeId] (property)](#multiparterrortypeid-property)
  - [MultipartErrorReason (class)](#multiparterrorreason-class)
- [guards](#guards)
  - [isField](#isfield)
  - [isFile](#isfile)
  - [isPart](#ispart)
  - [isPersistedFile](#ispersistedfile)
- [models](#models)
  - [Field (interface)](#field-interface)
  - [File (interface)](#file-interface)
  - [Part (type alias)](#part-type-alias)
  - [Persisted (interface)](#persisted-interface)
  - [PersistedFile (interface)](#persistedfile-interface)
- [references](#references)
  - [FieldMimeTypes](#fieldmimetypes)
  - [MaxFieldSize](#maxfieldsize)
  - [MaxFileSize](#maxfilesize)
  - [MaxParts](#maxparts)
  - [limitsServices](#limitsservices)
- [schemas](#schemas)
  - [FilesSchema](#filesschema)
  - [PersistedFileSchema](#persistedfileschema)
  - [PersistedFileSchema (interface)](#persistedfileschema-interface)
  - [SingleFileSchema](#singlefileschema)
  - [schemaJson](#schemajson)
  - [schemaPersisted](#schemapersisted)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
- [utils](#utils)
  - [Part (namespace)](#part-namespace)
    - [Proto (interface)](#proto-interface)
  - [withLimits (namespace)](#withlimits-namespace)
    - [Options (type alias)](#options-type-alias)

---

# Parsers

## makeChannel

Creates a channel that parses multipart byte chunks into multipart parts.

**Details**

The channel consumes non-empty batches of `Uint8Array` chunks and emits
non-empty batches of parsed `Part` values, failing with `MultipartError` for
parser and limit failures.

**Signature**

```ts
declare const makeChannel: <IE>(
  headers: Record<string, string>
) => Channel.Channel<
  Arr.NonEmptyReadonlyArray<Part>,
  MultipartError | IE,
  void,
  Arr.NonEmptyReadonlyArray<Uint8Array>,
  IE,
  unknown
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L411)

Since v4.0.0

# configuration

## makeConfig

Builds the low-level multipart parser configuration from request headers and
the current fiber context.

**Details**

Parser limits are read from the multipart references, including maximum parts,
field size, file size, total body size, and field MIME type overrides.

**Signature**

```ts
declare const makeConfig: (headers: Record<string, string>) => Effect.Effect<MP.BaseConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L381)

Since v4.0.0

# converting

## collectUint8Array

Runs a channel of byte chunks and collects all output into a single
`Uint8Array`.

**Gotchas**

This materializes the full content in memory.

**Signature**

```ts
declare const collectUint8Array: <OE, OD, R>(
  self: Channel.Channel<Arr.NonEmptyReadonlyArray<Uint8Array>, OE, OD, unknown, unknown, unknown, R>
) => Effect.Effect<Uint8Array<ArrayBuffer>, OE, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L607)

Since v4.0.0

## toPersisted

Persists a stream of multipart parts into a record.

**Details**

Text fields are collected as strings, and file parts are written to files in a
scoped temporary directory.

**Gotchas**

Persisted file paths remain valid for the lifetime of the scope.

**Signature**

```ts
declare const toPersisted: (
  stream: Stream.Stream<Part, MultipartError>,
  writeFile?: (path: string, file: File) => Effect.Effect<void, MultipartError, FileSystem.FileSystem>
) => Effect.Effect<Persisted, MultipartError, FileSystem.FileSystem | Path.Path | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L637)

Since v4.0.0

# errors

## MultipartError (class)

Error raised while parsing, streaming, or persisting multipart form data.

**Details**

The `reason` field contains the concrete `MultipartErrorReason`.

**Signature**

```ts
declare class MultipartError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L212)

Since v4.0.0

### fromReason (static method)

Creates a multipart error from a reason tag and optional cause.

**Signature**

```ts
declare const fromReason: (reason: MultipartErrorReason["_tag"], cause?: unknown) => MultipartError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L220)

Since v4.0.0

### [MultipartErrorTypeId] (property)

Marks this value as a multipart error for runtime guards.

**Signature**

```ts
readonly [MultipartErrorTypeId]: "~effect/http/Multipart/MultipartError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L229)

Since v4.0.0

## MultipartErrorReason (class)

Error reason carried by a `MultipartError`.

**Details**

It identifies parser and limit failures such as oversized files or fields, too
many parts, total body size limits, parse errors, and internal errors.

**Signature**

```ts
declare class MultipartErrorReason
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L197)

Since v4.0.0

# guards

## isField

Returns `true` when a value is a multipart text `Field`.

**Signature**

```ts
declare const isField: (u: unknown) => u is Field
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L111)

Since v4.0.0

## isFile

Returns `true` when a value is a multipart `File`.

**Signature**

```ts
declare const isFile: (u: unknown) => u is File
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L139)

Since v4.0.0

## isPart

Returns `true` when a value is a multipart `Part`.

**Signature**

```ts
declare const isPart: (u: unknown) => u is Part
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L103)

Since v4.0.0

## isPersistedFile

Returns `true` when a value is a persisted multipart file.

**Signature**

```ts
declare const isPersistedFile: (u: unknown) => u is PersistedFile
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L166)

Since v4.0.0

# models

## Field (interface)

Multipart form field containing a decoded text value.

**Details**

The `key` is the field name, `contentType` is the part media type, and `value`
is the decoded field content.

**Signature**

```ts
export interface Field extends Part.Proto {
  readonly _tag: "Field"
  readonly key: string
  readonly contentType: string
  readonly value: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L90)

Since v4.0.0

## File (interface)

Multipart file part.

**Gotchas**

The file content is exposed as a byte stream. `contentEffect` collects the full
file into memory and should be used only when the file size is acceptable.

**Signature**

```ts
export interface File extends Part.Proto {
  readonly _tag: "File"
  readonly key: string
  readonly name: string
  readonly contentType: string
  readonly content: Stream.Stream<Uint8Array, MultipartError>
  readonly contentEffect: Effect.Effect<Uint8Array, MultipartError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L124)

Since v4.0.0

## Part (type alias)

A parsed multipart part.

**Details**

A part is either a text `Field` or a streamed `File`.

**Signature**

```ts
type Part = Field | File
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L54)

Since v4.0.0

## Persisted (interface)

Record representation of persisted multipart data.

**Details**

Field names map to text values, arrays of text values, or arrays of
`PersistedFile` values.

**Signature**

```ts
export interface Persisted {
  readonly [key: string]: ReadonlyArray<PersistedFile> | ReadonlyArray<string> | string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L180)

Since v4.0.0

## PersistedFile (interface)

Multipart file part that has been written to the filesystem.

**Details**

The `path` points to the persisted file while the scope used to persist the
multipart data remains open.

**Signature**

```ts
export interface PersistedFile extends Part.Proto {
  readonly _tag: "PersistedFile"
  readonly key: string
  readonly name: string
  readonly contentType: string
  readonly path: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L152)

Since v4.0.0

# references

## FieldMimeTypes

Context reference for MIME type fragments that should be parsed as multipart
fields instead of files.

**Details**

The default treats `application/json` parts as fields.

**Signature**

```ts
declare const FieldMimeTypes: Context.Reference<ReadonlyArray<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L828)

Since v4.0.0

## MaxFieldSize

Context reference for the maximum size of a multipart field value.

**Details**

The default limit is 10 MiB.

**Signature**

```ts
declare const MaxFieldSize: Context.Reference<FileSystem.SizeInput>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L798)

Since v4.0.0

## MaxFileSize

Context reference for the maximum size of a multipart file part.

**Details**

The default is `undefined`, meaning no explicit per-file limit.

**Signature**

```ts
declare const MaxFileSize: Context.Reference<FileSystem.SizeInput | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L812)

Since v4.0.0

## MaxParts

Context reference for the maximum number of multipart parts allowed.

**Details**

The default is `undefined`, meaning no explicit part-count limit.

**Signature**

```ts
declare const MaxParts: Context.Reference<number | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L784)

Since v4.0.0

## limitsServices

Creates a context containing multipart parser limit settings.

**Details**

The context can provide maximum part count, field size, file size, total body
size, and MIME types that should be parsed as fields.

**Signature**

```ts
declare const limitsServices: (options: {
  readonly maxParts?: number | undefined
  readonly maxFieldSize?: FileSystem.SizeInput | undefined
  readonly maxFileSize?: FileSystem.SizeInput | undefined
  readonly maxTotalSize?: FileSystem.SizeInput | undefined
  readonly fieldMimeTypes?: ReadonlyArray<string> | undefined
}) => Context.Context<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L722)

Since v4.0.0

# schemas

## FilesSchema

Schema for an array of persisted multipart files.

**Signature**

```ts
declare const FilesSchema: Schema.$Array<PersistedFileSchema>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L299)

Since v4.0.0

## PersistedFileSchema

Schema for persisted multipart files.

**Details**

The encoded form contains the field key, original file name, content type, and
filesystem path.

**Signature**

```ts
declare const PersistedFileSchema: PersistedFileSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L260)

Since v4.0.0

## PersistedFileSchema (interface)

Schema type for persisted multipart files.

**Signature**

```ts
export interface PersistedFileSchema extends Schema.declare<PersistedFile> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L247)

Since v4.0.0

## SingleFileSchema

Schema for exactly one persisted multipart file.

**Details**

The encoded form is a one-element file array, while the decoded value is the
single `PersistedFile`.

**Signature**

```ts
declare const SingleFileSchema: Schema.decodeTo<PersistedFileSchema, Schema.$Array<PersistedFileSchema>, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L312)

Since v4.0.0

## schemaJson

Creates a decoder for a JSON-encoded field in persisted multipart data.

**Details**

The selected field is parsed from a JSON string and decoded with the supplied
schema.

**Signature**

```ts
declare const schemaJson: <A, I, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => {
  (field: string): (persisted: Persisted) => Effect.Effect<A, Schema.SchemaError, RD>
  (persisted: Persisted, field: string): Effect.Effect<A, Schema.SchemaError, RD>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L352)

Since v4.0.0

## schemaPersisted

Creates a decoder for persisted multipart data using the supplied schema.

**Details**

The returned function decodes an unknown input into the schema output and fails
with `SchemaError` when validation fails.

**Signature**

```ts
declare const schemaPersisted: <A, I extends Partial<Persisted>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>
) => (input: unknown, options?: ParseOptions) => Effect.Effect<A, Schema.SchemaError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L336)

Since v4.0.0

# type IDs

## TypeId

Type identifier used to brand multipart part values.

**Signature**

```ts
declare const TypeId: "~effect/http/Multipart"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L42)

Since v4.0.0

# utils

## Part (namespace)

Namespace containing shared multipart part model types.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L61)

Since v4.0.0

### Proto (interface)

Common protocol implemented by multipart part values.

**Details**

It provides the multipart type identifier, tag, and inspectable behavior shared
by fields, files, and persisted files.

**Signature**

```ts
export interface Proto extends Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly _tag: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L73)

Since v4.0.0

## withLimits (namespace)

Namespace containing multipart parser limit option types.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L753)

Since v4.0.0

### Options (type alias)

Options for overriding multipart parser limits.

**Details**

These settings control maximum part count, field size, file size, total body
size, and MIME types that should be treated as fields instead of files.

**Signature**

```ts
type Options = {
  readonly maxParts?: number | undefined
  readonly maxFieldSize?: FileSystem.SizeInput | undefined
  readonly maxFileSize?: FileSystem.SizeInput | undefined
  readonly maxTotalSize?: FileSystem.SizeInput | undefined
  readonly fieldMimeTypes?: ReadonlyArray<string> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Multipart.ts#L765)

Since v4.0.0
