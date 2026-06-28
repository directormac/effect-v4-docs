---
title: HttpBody.ts
nav_order: 240
parent: "effect"
---

## HttpBody.ts overview

Describes HTTP request and response bodies before they reach a platform
adapter.

`HttpBody` is the shared body representation used by the HTTP modules. Each
variant stores the payload together with metadata that can be known before
sending it, such as `contentType` and `contentLength`. This module includes
body constructors for common payload shapes, support for schema-encoded JSON
bodies, streaming and file-backed bodies, and the error type used when body
construction fails.

Since v4.0.0

---

## Exports Grouped by Category

- [constants](#constants)
  - [empty](#empty)
- [constructors](#constructors)
  - [file](#file)
  - [fileFromInfo](#filefrominfo)
  - [formData](#formdata)
  - [formDataRecord](#formdatarecord)
  - [json](#json)
  - [jsonSchema](#jsonschema)
  - [jsonUnsafe](#jsonunsafe)
  - [raw](#raw)
  - [stream](#stream)
  - [text](#text)
  - [uint8Array](#uint8array)
  - [urlParams](#urlparams)
- [errors](#errors)
  - [ErrorReason (type alias)](#errorreason-type-alias)
  - [HttpBodyError (class)](#httpbodyerror-class)
    - [[HttpBodyErrorTypeId] (property)](#httpbodyerrortypeid-property)
- [models](#models)
  - [Empty (class)](#empty-class)
    - [toJSON (method)](#tojson-method)
    - [\_tag (property)](#_tag-property)
  - [FormData (class)](#formdata-class)
    - [toJSON (method)](#tojson-method-1)
    - [\_tag (property)](#_tag-property-1)
    - [contentType (property)](#contenttype-property)
    - [contentLength (property)](#contentlength-property)
    - [formData (property)](#formdata-property)
  - [FormDataCoercible (type alias)](#formdatacoercible-type-alias)
  - [FormDataInput (type alias)](#formdatainput-type-alias)
  - [HttpBody (type alias)](#httpbody-type-alias)
  - [Raw (class)](#raw-class)
    - [toJSON (method)](#tojson-method-2)
    - [\_tag (property)](#_tag-property-2)
    - [body (property)](#body-property)
    - [contentType (property)](#contenttype-property-1)
    - [contentLength (property)](#contentlength-property-1)
  - [Stream (class)](#stream-class)
    - [toJSON (method)](#tojson-method-3)
    - [\_tag (property)](#_tag-property-3)
    - [stream (property)](#stream-property)
    - [contentType (property)](#contenttype-property-2)
    - [contentLength (property)](#contentlength-property-2)
  - [Uint8Array (class)](#uint8array-class)
    - [toJSON (method)](#tojson-method-4)
    - [\_tag (property)](#_tag-property-4)
    - [body (property)](#body-property-1)
    - [contentType (property)](#contenttype-property-3)
    - [contentLength (property)](#contentlength-property-3)
- [refinements](#refinements)
  - [isHttpBody](#ishttpbody)
- [utils](#utils)
  - [HttpBody (namespace)](#httpbody-namespace)
    - [Proto (interface)](#proto-interface)
    - [FileLike (interface)](#filelike-interface)

---

# constants

## empty

Provides the singleton empty HTTP body.

**When to use**

Use when you need an HTTP body value that represents no body content.

**Signature**

```ts
declare const empty: Empty
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L166)

Since v4.0.0

# constructors

## file

Creates a streaming HTTP body for a file path.

**Details**

The effect requires `FileSystem`, stats the file to set the content length, and can fail with `PlatformError`.

**Signature**

```ts
declare const file: (
  path: string,
  options?: {
    readonly bytesToRead?: FileSystem.SizeInput | undefined
    readonly chunkSize?: FileSystem.SizeInput | undefined
    readonly offset?: FileSystem.SizeInput | undefined
    readonly contentType?: string | undefined
  }
) => Effect.Effect<Stream, PlatformError.PlatformError, FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L497)

Since v4.0.0

## fileFromInfo

Creates a streaming HTTP body for a file path using already-known file information.

**Details**

The effect requires `FileSystem`, uses the provided file size as the content length, and can fail with `PlatformError`.

**Signature**

```ts
declare const fileFromInfo: (
  path: string,
  info: FileSystem.File.Info,
  options?: {
    readonly bytesToRead?: FileSystem.SizeInput | undefined
    readonly chunkSize?: FileSystem.SizeInput | undefined
    readonly offset?: FileSystem.SizeInput | undefined
    readonly contentType?: string | undefined
  }
) => Effect.Effect<Stream, PlatformError.PlatformError, FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L527)

Since v4.0.0

## formData

Wraps a Web `FormData` value as an HTTP body.

**Signature**

```ts
declare const formData: (body: globalThis.FormData) => FormData
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L378)

Since v4.0.0

## formDataRecord

Creates a `FormData` HTTP body from a record.

**Details**

Array fields append each item under the same key; primitive values are stringified, `File` and `Blob` values are appended directly, and nullish values are skipped.

**Signature**

```ts
declare const formDataRecord: (entries: FormDataInput) => FormData
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L425)

Since v4.0.0

## json

Creates a JSON HTTP body in an `Effect`.

**Details**

`JSON.stringify` failures are captured as `HttpBodyError` values, and the content type defaults to `application/json`.

**Signature**

```ts
declare const json: (body: unknown, contentType?: string) => Effect.Effect<Uint8Array, HttpBodyError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L304)

Since v4.0.0

## jsonSchema

Creates a JSON body constructor that first encodes values with the schema's JSON codec.

**Details**

Schema encoding issues and JSON serialization failures are returned as `HttpBodyError` values.

**Signature**

```ts
declare const jsonSchema: <S extends Schema.Constraint>(
  schema: S,
  options?: ParseOptions | undefined
) => (body: S["Type"], contentType?: string) => Effect.Effect<Uint8Array, HttpBodyError, S["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L320)

Since v4.0.0

## jsonUnsafe

Creates a JSON HTTP body using `JSON.stringify`, throwing if serialization fails.

**Details**

The content type defaults to `application/json`.

**Signature**

```ts
declare const jsonUnsafe: (body: unknown, contentType?: string) => Uint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L291)

Since v4.0.0

## raw

Creates a raw HTTP body from an arbitrary value and optional `contentType` and `contentLength` metadata.

**Signature**

```ts
declare const raw: (
  body: unknown,
  options?: { readonly contentType?: string | undefined; readonly contentLength?: number | undefined } | undefined
) => Raw
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L207)

Since v4.0.0

## stream

Creates a streaming HTTP body from a stream of byte chunks.

**Details**

The content type defaults to `application/octet-stream`; content length is optional.

**Signature**

```ts
declare const stream: (
  body: Stream_.Stream<globalThis.Uint8Array, unknown>,
  contentType?: string,
  contentLength?: number
) => Stream
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L481)

Since v4.0.0

## text

Creates a UTF-8 encoded text HTTP body.

**Details**

The content type defaults to `text/plain`.

**Signature**

```ts
declare const text: (body: string, contentType?: string) => Uint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L278)

Since v4.0.0

## uint8Array

Creates a byte-array HTTP body.

**Details**

The content type defaults to `application/octet-stream`, and the content length is the byte array length.

**Signature**

```ts
declare const uint8Array: (body: globalThis.Uint8Array, contentType?: string) => Uint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L263)

Since v4.0.0

## urlParams

Creates an `application/x-www-form-urlencoded` HTTP body from `UrlParams`.

**Signature**

```ts
declare const urlParams: (urlParams: UrlParams.UrlParams, contentType?: string) => Uint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L338)

Since v4.0.0

# errors

## ErrorReason (type alias)

Reason for an `HttpBodyError`.

**Details**

`JsonError` represents a `JSON.stringify` failure; `SchemaError` represents a schema encoding issue.

**Signature**

```ts
type ErrorReason =
  | {
      readonly _tag: "JsonError"
    }
  | {
      readonly _tag: "SchemaError"
      readonly issue: Issue
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L118)

Since v4.0.0

## HttpBodyError (class)

Error produced while constructing an HTTP body from JSON or schema-encoded input.

**Signature**

```ts
declare class HttpBodyError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L96)

Since v4.0.0

### [HttpBodyErrorTypeId] (property)

Marks this value as an HTTP body error for runtime guards.

**Signature**

```ts
readonly [HttpBodyErrorTypeId]: "~effect/http/HttpBody/HttpBodyError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L105)

Since v4.0.0

# models

## Empty (class)

HTTP body variant representing the absence of request content.

**Signature**

```ts
declare class Empty
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L146)

Since v4.0.0

### toJSON (method)

**Signature**

```ts
declare const toJSON: () => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L148)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Empty"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L147)

## FormData (class)

HTTP body variant backed by Web `FormData`.

**Details**

The content type and content length are left unset so the runtime can supply multipart boundaries.

**Signature**

```ts
declare class FormData {
  constructor(formData: globalThis.FormData)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L351)

Since v4.0.0

### toJSON (method)

**Signature**

```ts
declare const toJSON: () => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L363)

### \_tag (property)

**Signature**

```ts
readonly _tag: "FormData"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L352)

### contentType (property)

**Signature**

```ts
readonly contentType: undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L353)

### contentLength (property)

**Signature**

```ts
readonly contentLength: undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L354)

### formData (property)

**Signature**

```ts
readonly formData: globalThis.FormData
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L355)

## FormDataCoercible (type alias)

Value that can be appended by `formDataRecord`.

**Details**

`File` and `Blob` values are appended directly, primitive values are converted to strings, and `null` or `undefined` values are skipped.

**Signature**

```ts
type FormDataCoercible = string | number | boolean | globalThis.File | globalThis.Blob | null | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L402)

Since v4.0.0

## FormDataInput (type alias)

Record input accepted by `formDataRecord`.

**Details**

Each field may be a single coercible value or an array of coercible values.

**Signature**

```ts
type FormDataInput = Record<string, FormDataCoercible | ReadonlyArray<FormDataCoercible>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L390)

Since v4.0.0

## HttpBody (type alias)

Represents an HTTP request body.

**Details**

Supported variants include empty bodies, raw bodies, byte arrays, `FormData`, and streams of bytes.

**Signature**

```ts
type HttpBody = Empty | Raw | Uint8Array | FormData | Stream
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L48)

Since v4.0.0

## Raw (class)

HTTP body variant containing an arbitrary runtime body value with optional content metadata.

**Signature**

```ts
declare class Raw {
  constructor(body: unknown, contentType: string | undefined, contentLength: number | undefined)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L174)

Since v4.0.0

### toJSON (method)

**Signature**

```ts
declare const toJSON: () => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L190)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Raw"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L175)

### body (property)

**Signature**

```ts
readonly body: unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L176)

### contentType (property)

**Signature**

```ts
readonly contentType: string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L177)

### contentLength (property)

**Signature**

```ts
readonly contentLength: number | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L178)

## Stream (class)

HTTP body variant backed by a stream of `Uint8Array` chunks.

**Signature**

```ts
declare class Stream {
  constructor(
    stream: Stream_.Stream<globalThis.Uint8Array, unknown>,
    contentType: string,
    contentLength: number | undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L445)

Since v4.0.0

### toJSON (method)

**Signature**

```ts
declare const toJSON: () => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L461)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Stream"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L446)

### stream (property)

**Signature**

```ts
readonly stream: Stream_.Stream<globalThis.Uint8Array<ArrayBufferLike>, unknown, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L447)

### contentType (property)

**Signature**

```ts
readonly contentType: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L448)

### contentLength (property)

**Signature**

```ts
readonly contentLength: number | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L449)

## Uint8Array (class)

HTTP body variant backed by a `Uint8Array`.

**Details**

It stores the bytes, content type, and byte length.

**Signature**

```ts
declare class Uint8Array {
  constructor(body: globalThis.Uint8Array, contentType: string, contentLength: number)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L225)

Since v4.0.0

### toJSON (method)

**Signature**

```ts
declare const toJSON: () => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L241)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Uint8Array"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L226)

### body (property)

**Signature**

```ts
readonly body: globalThis.Uint8Array<ArrayBufferLike>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L227)

### contentType (property)

**Signature**

```ts
readonly contentType: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L228)

### contentLength (property)

**Signature**

```ts
readonly contentLength: number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L229)

# refinements

## isHttpBody

Returns `true` if the provided value is an `HttpBody`.

**Signature**

```ts
declare const isHttpBody: (u: unknown) => u is HttpBody
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L36)

Since v4.0.0

# utils

## HttpBody (namespace)

Namespace containing type-level members associated with `HttpBody`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L55)

Since v4.0.0

### Proto (interface)

Common protocol implemented by all HTTP body variants.

**Details**

It carries the variant tag plus optional `contentType` and `contentLength` metadata.

**Signature**

```ts
export interface Proto extends Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly _tag: string
  readonly contentType?: string | undefined
  readonly contentLength?: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L66)

Since v4.0.0

### FileLike (interface)

Minimal Web `File`-like shape used by HTTP helpers that need file metadata.

**Signature**

```ts
export interface FileLike {
  readonly name: string
  readonly lastModified: number
  readonly size: number
  readonly stream: () => unknown
  readonly type: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpBody.ts#L79)

Since v4.0.0
