---
title: JsonSchema.ts
nav_order: 51
parent: "effect"
---

## JsonSchema.ts overview

Helpers for normalizing and converting JSON Schema and OpenAPI schema
documents. Supported inputs include JSON Schema Draft-07, Draft 2020-12,
OpenAPI 3.0, and OpenAPI 3.1; conversions normalize through
`Document<"draft-2020-12">` before emitting another dialect. The module also
defines document types, meta-schema constants, OpenAPI component-key helpers,
and `$ref` resolution utilities.

Since v4.0.0

---

## Exports Grouped by Category

- [constants](#constants)
  - [META_SCHEMA_URI_DRAFT_07](#meta_schema_uri_draft_07)
  - [META_SCHEMA_URI_DRAFT_2020_12](#meta_schema_uri_draft_2020_12)
- [decoding](#decoding)
  - [fromSchemaDraft07](#fromschemadraft07)
  - [fromSchemaDraft2020_12](#fromschemadraft2020_12)
  - [fromSchemaOpenApi3_0](#fromschemaopenapi3_0)
  - [fromSchemaOpenApi3_1](#fromschemaopenapi3_1)
- [encoding](#encoding)
  - [toDocumentDraft07](#todocumentdraft07)
  - [toMultiDocumentOpenApi3_1](#tomultidocumentopenapi3_1)
- [getters](#getters)
  - [resolve$ref](#resolveref)
- [models](#models)
  - [Definitions (interface)](#definitions-interface)
  - [Dialect (type alias)](#dialect-type-alias)
  - [Document (interface)](#document-interface)
  - [JsonSchema (interface)](#jsonschema-interface)
  - [MultiDocument (interface)](#multidocument-interface)
  - [Type (type alias)](#type-type-alias)
- [transforming](#transforming)
  - [resolveTopLevel$ref](#resolvetoplevelref)

---

# constants

## META_SCHEMA_URI_DRAFT_07

Represents the `$schema` meta-schema URI for JSON Schema Draft-07.

**When to use**

Use when constructing a Draft-07 JSON Schema document and you need a stable
value for the root `$schema` field.

**Details**

The exported value is the literal string
`http://json-schema.org/draft-07/schema`.

**See**

- `META_SCHEMA_URI_DRAFT_2020_12` for the Draft 2020-12 `$schema` URI

**Signature**

```ts
declare const META_SCHEMA_URI_DRAFT_07: "http://json-schema.org/draft-07/schema"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L179)

Since v4.0.0

## META_SCHEMA_URI_DRAFT_2020_12

Represents the `$schema` meta-schema URI for JSON Schema Draft 2020-12.

**When to use**

Use when you need to populate the `$schema` field while emitting a JSON
Schema document that should declare JSON Schema Draft 2020-12.

**Details**

The exported value is the literal string
`https://json-schema.org/draft/2020-12/schema`.

**See**

- `META_SCHEMA_URI_DRAFT_07` for the Draft-07 `$schema` URI

**Signature**

```ts
declare const META_SCHEMA_URI_DRAFT_2020_12: "https://json-schema.org/draft/2020-12/schema"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L199)

Since v4.0.0

# decoding

## fromSchemaDraft07

Parses a raw Draft-07 JSON Schema into a `Document<"draft-2020-12">`.

**When to use**

Use when you have a raw JSON Schema object that follows Draft-07 conventions
and need the canonical Draft-2020-12 document representation.

**Details**

This converts Draft-07 tuple syntax (`items` as array plus
`additionalItems`) to Draft-2020-12 form (`prefixItems` plus `items`),
rewrites `#/definitions/...` refs to `#/$defs/...`, and extracts root-level
`definitions` into the `definitions` field.

**Gotchas**

Unsupported keywords, such as `if`/`then`/`else` and `$id`, are dropped.

**Example** (Parsing a Draft-07 schema)

```ts
import { JsonSchema } from "effect"

const raw: JsonSchema.JsonSchema = {
  type: "object",
  properties: {
    tags: {
      type: "array",
      items: { type: "string" }
    }
  }
}

const doc = JsonSchema.fromSchemaDraft07(raw)
console.log(doc.dialect) // "draft-2020-12"
console.log(doc.schema.properties) // { tags: { type: "array", items: { type: "string" } } }
```

**See**

- `fromSchemaDraft2020_12`
- `fromSchemaOpenApi3_0`
- `toDocumentDraft07`

**Signature**

```ts
declare const fromSchemaDraft07: (js: JsonSchema) => Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L250)

Since v4.0.0

## fromSchemaDraft2020_12

Parses a raw Draft-2020-12 JSON Schema into a `Document<"draft-2020-12">`.

**When to use**

Use when you already have a raw JSON Schema object in Draft-2020-12 format.

**Details**

This separates `$defs` from the root schema into the `definitions` field.
Unlike `fromSchemaDraft07`, this performs no keyword rewriting.

**Example** (Parsing a Draft-2020-12 schema)

```ts
import { JsonSchema } from "effect"

const raw: JsonSchema.JsonSchema = {
  type: "number",
  minimum: 0,
  $defs: { PositiveInt: { type: "integer", minimum: 1 } }
}

const doc = JsonSchema.fromSchemaDraft2020_12(raw)
console.log(doc.schema) // { type: "number", minimum: 0 }
console.log(doc.definitions) // { PositiveInt: { type: "integer", minimum: 1 } }
```

**See**

- `fromSchemaDraft07`
- `fromSchemaOpenApi3_1`

**Signature**

```ts
declare const fromSchemaDraft2020_12: (js: JsonSchema) => Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L391)

Since v4.0.0

## fromSchemaOpenApi3_0

Parses a raw OpenAPI 3.0 JSON Schema into a `Document<"draft-2020-12">`.

**When to use**

Use when you need to consume raw JSON Schema objects from an OpenAPI 3.0
specification.

**Details**

This handles OpenAPI 3.0 extensions, including `nullable`, singular
`example`, and boolean `exclusiveMinimum` or `exclusiveMaximum`. It
normalizes the schema to Draft-07 first, then converts to Draft-2020-12 via
`fromSchemaDraft07`.

**Example** (Parsing an OpenAPI 3.0 nullable schema)

```ts
import { JsonSchema } from "effect"

const raw: JsonSchema.JsonSchema = {
  type: "string",
  nullable: true
}

const doc = JsonSchema.fromSchemaOpenApi3_0(raw)
// nullable is expanded into a type array
console.log(doc.schema.type) // ["string", "null"]
```

**See**

- `fromSchemaOpenApi3_1`
- `fromSchemaDraft07`

**Signature**

```ts
declare const fromSchemaOpenApi3_0: (schema: JsonSchema) => Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L475)

Since v4.0.0

## fromSchemaOpenApi3_1

Parses a raw OpenAPI 3.1 JSON Schema into a `Document<"draft-2020-12">`.

**When to use**

Use when you need to consume raw JSON Schema objects from an OpenAPI 3.1
specification.

**Details**

This rewrites `#/components/schemas/...` refs to `#/$defs/...`, then delegates
to `fromSchemaDraft2020_12`.

**Example** (Parsing an OpenAPI 3.1 schema)

```ts
import { JsonSchema } from "effect"

const raw: JsonSchema.JsonSchema = {
  type: "object",
  properties: {
    user: { $ref: "#/components/schemas/User" }
  }
}

const doc = JsonSchema.fromSchemaOpenApi3_1(raw)
// $ref is rewritten to Draft-2020-12 form
console.log(doc.schema.properties) // { user: { $ref: "#/$defs/User" } }
```

**See**

- `fromSchemaOpenApi3_0`
- `toMultiDocumentOpenApi3_1`

**Signature**

```ts
declare const fromSchemaOpenApi3_1: (js: JsonSchema) => Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L435)

Since v4.0.0

# encoding

## toDocumentDraft07

Converts a `Document<"draft-2020-12">` to a `Document<"draft-07">`.

**When to use**

Use when you need to output a canonical JSON Schema document in Draft-07
format.

**Details**

This rewrites `#/$defs/...` refs to `#/definitions/...`, converts
Draft-2020-12 tuple syntax (`prefixItems` plus `items`) to Draft-07 form
(`items` as array plus `additionalItems`), and converts both the root schema
and all definitions.

**Gotchas**

Unsupported Draft-2020-12 keywords are dropped.

**Example** (Converting to Draft-07)

```ts
import { JsonSchema } from "effect"

const doc = JsonSchema.fromSchemaDraft2020_12({
  type: "array",
  prefixItems: [{ type: "string" }, { type: "number" }],
  items: { type: "boolean" }
})

const draft07 = JsonSchema.toDocumentDraft07(doc)
console.log(draft07.dialect) // "draft-07"
console.log(draft07.schema.items) // [{ type: "string" }, { type: "number" }]
console.log(draft07.schema.additionalItems) // { type: "boolean" }
```

**See**

- `fromSchemaDraft07`
- `toMultiDocumentOpenApi3_1`

**Signature**

```ts
declare const toDocumentDraft07: (document: Document<"draft-2020-12">) => Document<"draft-07">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L521)

Since v4.0.0

## toMultiDocumentOpenApi3_1

Converts a `MultiDocument<"draft-2020-12">` to a
`MultiDocument<"openapi-3.1">`.

**When to use**

Use when you need to emit an OpenAPI 3.1 multi-document from canonical JSON
Schema documents.

**Details**

This rewrites `#/$defs/...` refs to `#/components/schemas/...`, sanitizes
definition keys to match the OpenAPI component key pattern
(`^[a-zA-Z0-9.\-_]+$`) by replacing invalid characters with `_`, updates all
`$ref` pointers to use the sanitized keys, and converts all schemas and
definitions in the multi-document.

**Example** (Converting to OpenAPI 3.1)

```ts
import { JsonSchema } from "effect"

const multi: JsonSchema.MultiDocument<"draft-2020-12"> = {
  dialect: "draft-2020-12",
  schemas: [{ $ref: "#/$defs/User" }],
  definitions: {
    User: { type: "object", properties: { name: { type: "string" } } }
  }
}

const openapi = JsonSchema.toMultiDocumentOpenApi3_1(multi)
console.log(openapi.dialect) // "openapi-3.1"
console.log(openapi.schemas[0]) // { $ref: "#/components/schemas/User" }
```

**See**

- `toDocumentDraft07`
- `MultiDocument`

**Signature**

```ts
declare const toMultiDocumentOpenApi3_1: (multiDocument: MultiDocument<"draft-2020-12">) => MultiDocument<"openapi-3.1">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L670)

Since v4.0.0

# getters

## resolve$ref

Resolves a `$ref` string by looking up the last path segment in a
definitions map.

**When to use**

Use when you need to dereference a `$ref` pointer to get the JSON Schema
object it points to.

**Details**

This only resolves the final segment of the ref path, such as `"User"` from
`"#/$defs/User"`. It returns `undefined` if the definition is not found.

**Gotchas**

This function does not follow arbitrary JSON Pointer paths.

**Example** (Resolving a $ref)

```ts
import { JsonSchema } from "effect"

const definitions: JsonSchema.Definitions = {
  User: { type: "object", properties: { name: { type: "string" } } }
}

const result = JsonSchema.resolve$ref("#/$defs/User", definitions)
console.log(result) // { type: "object", properties: { name: { type: "string" } } }

const missing = JsonSchema.resolve$ref("#/$defs/Unknown", definitions)
console.log(missing) // undefined
```

**See**

- `resolveTopLevel$ref`
- `Definitions`

**Signature**

```ts
declare const resolve$ref: ($ref: string, definitions: Definitions) => JsonSchema | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L894)

Since v4.0.0

# models

## Definitions (interface)

A record of named JSON Schema definitions, keyed by definition name.

**When to use**

Use as the shared lookup table for named JSON Schema nodes that are
referenced from JSON Schema documents.

**Details**

The map is dialect-neutral. Conversion APIs emit it as `$defs`,
`definitions`, or `components.schemas` depending on the target format.

**See**

- `Document` for a single root schema with definitions
- `MultiDocument` for multiple root schemas sharing definitions
- `resolve$ref` for resolving a `$ref` against definitions

**Signature**

```ts
export interface Definitions extends Record<string, JsonSchema> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L89)

Since v4.0.0

## Dialect (type alias)

The set of JSON Schema dialects supported by this module.

**When to use**

Use as the dialect marker for `JsonSchema` documents when parsing,
converting, or emitting schemas across the supported formats.

**Details**

Supported values are `"draft-07"` for JSON Schema Draft-07,
`"draft-2020-12"` for JSON Schema Draft 2020-12 and the canonical internal
form, `"openapi-3.1"` for OpenAPI 3.1, and `"openapi-3.0"` for OpenAPI 3.0.

**See**

- `Document` for a single root schema tagged with a dialect
- `MultiDocument` for multiple root schemas tagged with a dialect

**Signature**

```ts
type Dialect = "draft-07" | "draft-2020-12" | "openapi-3.1" | "openapi-3.0"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L55)

Since v4.0.0

## Document (interface)

A structured container for a single JSON Schema and its associated
definitions.

**When to use**

Use when you need to carry a root schema together with its shared
definitions, or when converting between dialects with the `from*` and `to*`
functions.

**Details**

The `schema` field holds the root schema _without_ the definitions
collection. Root definitions are stored separately in `definitions` and
referenced via `#/$defs/<name>` for Draft-2020-12, `#/definitions/<name>`
for Draft-07, and `#/components/schemas/<name>` for OpenAPI 3.1 and
OpenAPI 3.0.

**Example** (Inspecting a parsed document)

```ts
import { JsonSchema } from "effect"

const raw: JsonSchema.JsonSchema = {
  type: "string",
  $defs: { Trimmed: { type: "string", minLength: 1 } }
}

const doc = JsonSchema.fromSchemaDraft2020_12(raw)

console.log(doc.dialect) // "draft-2020-12"
console.log(doc.schema) // { type: "string" }
console.log(doc.definitions) // { Trimmed: { type: "string", minLength: 1 } }
```

**See**

- `MultiDocument`
- `fromSchemaDraft2020_12`

**Signature**

```ts
export interface Document<D extends Dialect> {
  readonly dialect: D
  readonly schema: JsonSchema
  readonly definitions: Definitions
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L131)

Since v4.0.0

## JsonSchema (interface)

A plain object representing a single JSON Schema node.

**When to use**

Use to represent an arbitrary JSON Schema object regardless of dialect.

**Details**

This is an open record type (`[x: string]: unknown`) so it can hold any JSON
Schema keyword. Most functions in this module accept or return this type.

**Signature**

```ts
export interface JsonSchema {
  [x: string]: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L31)

Since v4.0.0

## MultiDocument (interface)

Like `Document`, but carries multiple root schemas that share a
single definitions pool.

**When to use**

Use when generating several schemas, such as a request body
and a response body, that reference the same set of definitions.

**Details**

The `schemas` tuple is non-empty and contains at least one element.

**See**

- `Document`
- `toMultiDocumentOpenApi3_1`

**Signature**

```ts
export interface MultiDocument<D extends Dialect> {
  readonly dialect: D
  readonly schemas: readonly [JsonSchema, ...Array<JsonSchema>]
  readonly definitions: Definitions
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L155)

Since v4.0.0

## Type (type alias)

The JSON Schema primitive type names.

**When to use**

Use to restrict a JSON Schema `type` keyword to the supported primitive names.

**Signature**

```ts
type Type = "string" | "number" | "boolean" | "array" | "object" | "null" | "integer"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L67)

Since v4.0.0

# transforming

## resolveTopLevel$ref

Resolves a document whose root schema is a top-level `$ref`.

**When to use**

Use when you need to dereference a top-level `$ref` before inspecting the
root JSON Schema object's properties directly.

**Details**

This returns the same object if no change is needed, or a shallow copy with
the resolved schema.

**Example** (Resolving a top-level $ref)

```ts
import { JsonSchema } from "effect"

const doc: JsonSchema.Document<"draft-2020-12"> = {
  dialect: "draft-2020-12",
  schema: { $ref: "#/$defs/User" },
  definitions: {
    User: { type: "object", properties: { name: { type: "string" } } }
  }
}

const resolved = JsonSchema.resolveTopLevel$ref(doc)
console.log(resolved.schema) // { type: "object", properties: { name: { type: "string" } } }
```

**See**

- `resolve$ref`
- `Document`

**Signature**

```ts
declare const resolveTopLevel$ref: (document: Document<"draft-2020-12">) => Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/JsonSchema.ts#L940)

Since v4.0.0
