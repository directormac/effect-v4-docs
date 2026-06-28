---
title: SchemaRepresentation.ts
nav_order: 103
parent: "effect"
---

## SchemaRepresentation.ts overview

Plain data structures for describing schemas in a serializable form. A
`Representation` is not the original `Schema` object; it is a JSON-friendly
description of the schema's types, fields, unions, checks, annotations, and
references.

This module defines the representation node types, document types, and
codecs used to validate those documents. It can build representation
documents from schema ASTs, turn representation documents back into schemas,
convert them to and from JSON Schema documents, and generate TypeScript code
artifacts for schema definitions.

Since v4.0.0

---

## Exports Grouped by Category

- [Code Generation](#code-generation)
  - [Artifact (type alias)](#artifact-type-alias)
  - [Code (type alias)](#code-type-alias)
  - [CodeDocument (type alias)](#codedocument-type-alias)
  - [makeCode](#makecode)
  - [toCodeDocument](#tocodedocument)
- [Runtime Generation](#runtime-generation)
  - [toSchema](#toschema)
- [Tree](#tree)
  - [PrimitiveTree (type alias)](#primitivetree-type-alias)
- [constructors](#constructors)
  - [fromAST](#fromast)
  - [fromASTs](#fromasts)
  - [fromJsonSchemaDocument](#fromjsonschemadocument)
  - [fromJsonSchemaMultiDocument](#fromjsonschemamultidocument)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [Arrays (interface)](#arrays-interface)
  - [ArraysMeta (type alias)](#arraysmeta-type-alias)
  - [BigInt (interface)](#bigint-interface)
  - [BigIntMeta (type alias)](#bigintmeta-type-alias)
  - [Boolean (interface)](#boolean-interface)
  - [Check (type alias)](#check-type-alias)
  - [DateMeta (type alias)](#datemeta-type-alias)
  - [Declaration (interface)](#declaration-interface)
  - [DeclarationMeta (type alias)](#declarationmeta-type-alias)
  - [Document (type alias)](#document-type-alias)
  - [Element (interface)](#element-interface)
  - [Enum (interface)](#enum-interface)
  - [Filter (interface)](#filter-interface)
  - [FilterGroup (interface)](#filtergroup-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [Literal (interface)](#literal-interface)
  - [MultiDocument (type alias)](#multidocument-type-alias)
  - [Never (interface)](#never-interface)
  - [Null (interface)](#null-interface)
  - [Number (interface)](#number-interface)
  - [NumberMeta (type alias)](#numbermeta-type-alias)
  - [ObjectKeyword (interface)](#objectkeyword-interface)
  - [Objects (interface)](#objects-interface)
  - [ObjectsMeta (type alias)](#objectsmeta-type-alias)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [Reference (interface)](#reference-interface)
  - [References (interface)](#references-interface)
  - [Representation (type alias)](#representation-type-alias)
  - [Reviver (type alias)](#reviver-type-alias)
  - [SizeMeta (type alias)](#sizemeta-type-alias)
  - [String (interface)](#string-interface)
  - [StringMeta (type alias)](#stringmeta-type-alias)
  - [Suspend (interface)](#suspend-interface)
  - [Symbol (interface)](#symbol-interface)
  - [TemplateLiteral (interface)](#templateliteral-interface)
  - [Undefined (interface)](#undefined-interface)
  - [Union (interface)](#union-interface)
  - [UniqueSymbol (interface)](#uniquesymbol-interface)
  - [Unknown (interface)](#unknown-interface)
  - [Void (interface)](#void-interface)
- [schemas](#schemas)
  - [$Annotations](#annotations)
  - [$Any](#any)
  - [$Arrays](#arrays)
  - [$BigInt](#bigint)
  - [$Boolean](#boolean)
  - [$DateMeta](#datemeta)
  - [$Declaration](#declaration)
  - [$DeclarationMeta](#declarationmeta)
  - [$Document](#document)
  - [$Element](#element)
  - [$Enum](#enum)
  - [$IndexSignature](#indexsignature)
  - [$Literal](#literal)
  - [$LiteralValue](#literalvalue)
  - [$MultiDocument](#multidocument)
  - [$Never](#never)
  - [$Null](#null)
  - [$Number](#number)
  - [$NumberMeta](#numbermeta)
  - [$ObjectKeyword](#objectkeyword)
  - [$Objects](#objects)
  - [$ObjectsMeta](#objectsmeta)
  - [$PrimitiveTree](#primitivetree)
  - [$PropertySignature](#propertysignature)
  - [$Reference](#reference)
  - [$Representation](#representation)
  - [$Representation (interface)](#representation-interface)
  - [$SizeMeta](#sizemeta)
  - [$String](#string)
  - [$StringMeta](#stringmeta)
  - [$Suspend](#suspend)
  - [$Symbol](#symbol)
  - [$TemplateLiteral](#templateliteral)
  - [$Undefined](#undefined)
  - [$Union](#union)
  - [$UniqueSymbol](#uniquesymbol)
  - [$Unknown](#unknown)
  - [$Void](#void)
  - [DocumentFromJson](#documentfromjson)
  - [MultiDocumentFromJson](#multidocumentfromjson)
- [transforming](#transforming)
  - [toJsonSchemaDocument](#tojsonschemadocument)
  - [toJsonSchemaMultiDocument](#tojsonschemamultidocument)
  - [toMultiDocument](#tomultidocument)
  - [toSchemaDefaultReviver](#toschemadefaultreviver)

---

# Code Generation

## Artifact (type alias)

An auxiliary code artifact produced during code generation — a symbol
declaration, an enum declaration, or an import statement.

**See**

- `CodeDocument`
- `toCodeDocument`

**Signature**

```ts
type Artifact =
  | {
      readonly _tag: "Symbol"
      readonly identifier: string
      readonly generation: Code
    }
  | {
      readonly _tag: "Enum"
      readonly identifier: string
      readonly generation: Code
    }
  | {
      readonly _tag: "Import"
      readonly importDeclaration: string
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2278)

Since v4.0.0

## Code (type alias)

A pair of TypeScript source strings for a schema: `runtime` is the
executable Schema expression, `Type` is the corresponding TypeScript type.

**See**

- `makeCode`
- `CodeDocument`

**Signature**

```ts
type Code = {
  readonly runtime: string
  readonly Type: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2250)

Since v4.0.0

## CodeDocument (type alias)

The output of `toCodeDocument`: generated TypeScript code for one or
more schemas plus their shared references and auxiliary artifacts.

**Details**

`codes` contains one `Code` per input representation.
`references.nonRecursives` contains topologically sorted non-recursive
definitions. `references.recursives` contains definitions involved in cycles.
`artifacts` contains symbols, enums, and import statements needed by the
code.

**See**

- `toCodeDocument`
- `Code`
- `Artifact`

**Signature**

```ts
type CodeDocument = {
  readonly codes: ReadonlyArray<Code>
  readonly references: {
    readonly nonRecursives: ReadonlyArray<{
      readonly $ref: string
      readonly code: Code
    }>
    readonly recursives: {
      readonly [$ref: string]: Code
    }
  }
  readonly artifacts: ReadonlyArray<Artifact>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2313)

Since v4.0.0

## makeCode

Constructs a `Code` value from a runtime expression string and a
TypeScript type string.

**See**

- `Code`

**Signature**

```ts
declare const makeCode: (runtime: string, Type: string) => Code
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2264)

Since v4.0.0

## toCodeDocument

Generates TypeScript code strings from a `MultiDocument`.

**When to use**

Use when you need to produce source code for Effect Schema definitions from a
schema representation `MultiDocument`.

**Details**

`options.reviver` can customize code generation for `Declaration`
nodes. Return `undefined` to fall back to the default logic, which uses
`generation` annotations or the encoded schema. References are
topologically sorted so non-recursive definitions are emitted before their
dependents. `$ref` keys are converted to sanitized JavaScript identifiers.

**Example** (Generating TypeScript code)

```ts
import { Schema, SchemaRepresentation } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Int
})

const multi = SchemaRepresentation.toMultiDocument(SchemaRepresentation.fromAST(Person.ast))
const codeDoc = SchemaRepresentation.toCodeDocument(multi)
console.log(codeDoc.codes[0].runtime)
// Schema.Struct({ ... })
```

**See**

- `CodeDocument`
- `MultiDocument`
- `Reviver`

**Signature**

```ts
declare const toCodeDocument: (
  multiDocument: MultiDocument,
  options?: { readonly reviver?: Reviver<Code> | undefined }
) => CodeDocument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2368)

Since v4.0.0

# Runtime Generation

## toSchema

Creates a runtime Schema from a `Document`.

**When to use**

Use when you have a serialized or computed schema representation document and
need a runtime Schema for decoding/encoding.

**Details**

Pass `options.reviver`, such as `toSchemaDefaultReviver`, to handle
`Declaration` nodes for types like `Date` and `Option`. Without a
reviver, declarations fall back to their `encodedSchema`. Circular references
are handled via lazy `Schema.suspend`.

**Gotchas**

This throws if a `$ref` is not found in `document.references`.

**Example** (Reconstructing a Schema)

```ts
import { Schema, SchemaRepresentation } from "effect"

const doc = SchemaRepresentation.fromAST(Schema.Struct({ name: Schema.String }).ast)

const schema = SchemaRepresentation.toSchema(doc)
console.log(JSON.stringify(Schema.toJsonSchemaDocument(schema), null, 2))
```

**See**

- `Document`
- `Reviver`
- `toSchemaDefaultReviver`

**Signature**

```ts
declare const toSchema: <S extends Schema.Top = Schema.Top>(
  document: Document,
  options?: { readonly reviver?: Reviver<Schema.Top> | undefined }
) => S
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1865)

Since v4.0.0

# Tree

## PrimitiveTree (type alias)

A tree of primitive values used to serialize annotations to JSON.

**Signature**

```ts
type PrimitiveTree = Schema.Tree<null | number | boolean | bigint | symbol | string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L747)

Since v4.0.0

# constructors

## fromAST

Converts a Schema AST into a `Document`.

**When to use**

Use when you have a single Schema AST and need a schema representation
document.

**Details**

Shared/recursive sub-schemas are extracted into the `references` map.

**Example** (Converting a Schema to a Document)

```ts
import { Schema, SchemaRepresentation } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const doc = SchemaRepresentation.fromAST(Person.ast)
console.log(doc.representation._tag)
// "Objects"
```

**See**

- `Document`
- `fromASTs`

**Signature**

```ts
declare const fromAST: (ast: SchemaAST.AST) => Document
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1636)

Since v4.0.0

## fromASTs

Converts one or more Schema ASTs into a `MultiDocument`.

**When to use**

Use when you have multiple Schema ASTs and need one schema representation
`MultiDocument` with shared references.

**Details**

All schemas share a single `references` map.

**See**

- `MultiDocument`
- `fromAST`

**Signature**

```ts
declare const fromASTs: (asts: readonly [SchemaAST.AST, ...Array<SchemaAST.AST>]) => MultiDocument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1656)

Since v4.0.0

## fromJsonSchemaDocument

Parses a Draft 2020-12 JSON Schema document into a `Document`.

**When to use**

Use when you need to import a Draft 2020-12 JSON Schema document into the
Effect schema representation system.

**Details**

`options.onEnter` is an optional hook called on each JSON Schema node before
processing, allowing pre-transformation.

**Gotchas**

JSON Schema import is best-effort. Some JSON Schema constructs do not map
exactly to Effect schema representations, and importing a schema previously
emitted by `toJsonSchemaDocument` may produce an equivalent approximation
rather than the original representation shape.

This throws if a `$ref` cannot be resolved within the document's definitions.
Circular `$ref`s are detected and cause an error.

**See**

- `Document`
- `toJsonSchemaDocument`
- `fromJsonSchemaMultiDocument`

**Signature**

```ts
declare const fromJsonSchemaDocument: (
  document: JsonSchema.Document<"draft-2020-12">,
  options?: { readonly onEnter?: ((js: JsonSchema.JsonSchema) => JsonSchema.JsonSchema) | undefined }
) => Document
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2994)

Since v4.0.0

## fromJsonSchemaMultiDocument

Parses a Draft 2020-12 JSON Schema multi-document into a
`MultiDocument`.

**When to use**

Use when you need to import a Draft 2020-12 JSON Schema multi-document whose
schemas share definitions.

**Details**

`options.onEnter` is an optional hook called on each JSON Schema node before
processing.

**Gotchas**

JSON Schema import is best-effort. Some JSON Schema constructs do not map
exactly to Effect schema representations, and importing schemas previously
emitted by `toJsonSchemaMultiDocument` may produce equivalent approximations
rather than the original representation shapes.

This throws if a `$ref` cannot be resolved.

**See**

- `MultiDocument`
- `toJsonSchemaMultiDocument`
- `fromJsonSchemaDocument`

**Signature**

```ts
declare const fromJsonSchemaMultiDocument: (
  document: JsonSchema.MultiDocument<"draft-2020-12">,
  options?: { readonly onEnter?: ((js: JsonSchema.JsonSchema) => JsonSchema.JsonSchema) | undefined }
) => MultiDocument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L3038)

Since v4.0.0

# models

## Any (interface)

The `any` type.

**Signature**

```ts
export interface Any {
  readonly _tag: "Any"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L170)

Since v4.0.0

## Arrays (interface)

An array or tuple type.

**Details**

`elements` are the fixed positional elements, or tuple prefix, and each may
be optional. `rest` contains the variadic tail types; a single-element
`rest` with no `elements` produces a plain `Array<T>`. `checks` holds
array-specific constraints, such as minLength, maxLength, and unique checks.

**See**

- `Element`
- `ArraysMeta`

**Signature**

```ts
export interface Arrays {
  readonly _tag: "Arrays"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly elements: ReadonlyArray<Element>
  readonly rest: ReadonlyArray<Representation>
  readonly checks: ReadonlyArray<Check<ArraysMeta>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L330)

Since v4.0.0

## ArraysMeta (type alias)

Metadata union for array-specific validation checks (minLength, maxLength,
length, unique).

**See**

- `Arrays`
- `Check`

**Signature**

```ts
type ArraysMeta = Schema.Annotations.BuiltInMetaDefinitions[
  | "isMinLength"
  | "isMaxLength"
  | "isLengthBetween"
  | "isUnique"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L602)

Since v4.0.0

## BigInt (interface)

The `bigint` type with optional validation checks.

**See**

- `BigIntMeta`

**Signature**

```ts
export interface BigInt {
  readonly _tag: "BigInt"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly checks: ReadonlyArray<Check<BigIntMeta>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L237)

Since v4.0.0

## BigIntMeta (type alias)

Metadata union for bigint-specific validation checks (min, max, between).

**See**

- `BigInt`
- `Check`

**Signature**

```ts
type BigIntMeta = Schema.Annotations.BuiltInMetaDefinitions[
  | "isGreaterThanOrEqualToBigInt"
  | "isLessThanOrEqualToBigInt"
  | "isGreaterThanBigInt"
  | "isLessThanBigInt"
  | "isBetweenBigInt"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L584)

Since v4.0.0

## Boolean (interface)

The `boolean` type.

**Signature**

```ts
export interface Boolean {
  readonly _tag: "Boolean"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L224)

Since v4.0.0

## Check (type alias)

A validation constraint attached to a type. Either a single `Filter`
or a `FilterGroup` combining multiple checks.

**See**

- `Filter`
- `FilterGroup`

**Signature**

```ts
type Check<M> = Filter<M> | FilterGroup<M>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L489)

Since v4.0.0

## DateMeta (type alias)

Metadata union for Date-specific validation checks (valid, min, max, between).

**See**

- `Declaration`
- `DeclarationMeta`

**Signature**

```ts
type DateMeta = Schema.Annotations.BuiltInMetaDefinitions[
  | "isDateValid"
  | "isGreaterThanDate"
  | "isGreaterThanOrEqualToDate"
  | "isLessThanDate"
  | "isLessThanOrEqualToDate"
  | "isBetweenDate"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L636)

Since v4.0.0

## Declaration (interface)

A custom type declaration, such as `Date`, `Option`, or `ReadonlySet`.

**When to use**

Use when inspecting or transforming non-primitive schema types.

**Details**

`typeParameters` holds the inner type arguments, such as the `A` in
`Option<A>`. `encodedSchema` is the fallback representation when no
`Reviver` recognizes this declaration. `annotations.typeConstructor`
identifies the declaration kind, such as `{ _tag: "effect/Option" }`.

**See**

- `Reviver`
- `toSchemaDefaultReviver`

**Signature**

```ts
export interface Declaration {
  readonly _tag: "Declaration"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly typeParameters: ReadonlyArray<Representation>
  readonly checks: ReadonlyArray<Check<DeclarationMeta>>
  readonly encodedSchema: Representation
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L52)

Since v4.0.0

## DeclarationMeta (type alias)

Metadata union for `Declaration` checks — either `DateMeta`
or `SizeMeta`.

**Signature**

```ts
type DeclarationMeta = DateMeta | SizeMeta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L668)

Since v4.0.0

## Document (type alias)

A single `Representation` together with its named `References`.

**When to use**

Use when representing a single Schema AST together with its named references
before reconstructing a runtime Schema, converting to JSON Schema, or
wrapping it as a `MultiDocument`.

**See**

- `MultiDocument`
- `fromAST`

**Signature**

```ts
type Document = {
  readonly representation: Representation
  readonly references: References
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L703)

Since v4.0.0

## Element (interface)

A positional element within an `Arrays` tuple.

**Details**

`isOptional` indicates whether this element can be absent. `type` is the
schema representation for this element's value.

**See**

- `Arrays`

**Signature**

```ts
export interface Element {
  readonly isOptional: boolean
  readonly type: Representation
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L351)

Since v4.0.0

## Enum (interface)

A TypeScript-style enum. Each entry is a `[name, value]` pair.

**Signature**

```ts
export interface Enum {
  readonly _tag: "Enum"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly enums: ReadonlyArray<readonly [string, string | number]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L295)

Since v4.0.0

## Filter (interface)

A single validation constraint with typed metadata describing the check
(e.g. `{ _tag: "isMinLength", minLength: 3 }`).

**See**

- `Check`

**Signature**

```ts
export interface Filter<M> {
  readonly _tag: "Filter"
  readonly annotations?: Schema.Annotations.Filter | undefined
  readonly meta: M
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L500)

Since v4.0.0

## FilterGroup (interface)

A group of validation constraints that are logically combined. Contains
at least one `Check`.

**See**

- `Check`

**Signature**

```ts
export interface FilterGroup<M> {
  readonly _tag: "FilterGroup"
  readonly annotations?: Schema.Annotations.Filter | undefined
  readonly checks: readonly [Check<M>, ...Array<Check<M>>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L515)

Since v4.0.0

## IndexSignature (interface)

An index signature, such as `[key: string]: number`, within an
`Objects`.

**Details**

`parameter` is the key type representation. `type` is the value type
representation.

**See**

- `Objects`

**Signature**

```ts
export interface IndexSignature {
  readonly parameter: Representation
  readonly type: Representation
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L417)

Since v4.0.0

## Literal (interface)

A specific literal value (`string`, `number`, `boolean`, or `bigint`).

**Signature**

```ts
export interface Literal {
  readonly _tag: "Literal"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly literal: string | number | boolean | bigint
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L260)

Since v4.0.0

## MultiDocument (type alias)

One or more `Representation`s sharing a common `References` map.

**When to use**

Use when you use `fromASTs` to create this from multiple Schema ASTs,
`toCodeDocument` to generate TypeScript code, and
`toJsonSchemaMultiDocument` to convert to JSON Schema.

**See**

- `Document`
- `fromASTs`

**Signature**

```ts
type MultiDocument = {
  readonly representations: readonly [Representation, ...Array<Representation>]
  readonly references: References
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L723)

Since v4.0.0

## Never (interface)

The `never` type (no valid values).

**Signature**

```ts
export interface Never {
  readonly _tag: "Never"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L148)

Since v4.0.0

## Null (interface)

The `null` type.

**Signature**

```ts
export interface Null {
  readonly _tag: "Null"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L115)

Since v4.0.0

## Number (interface)

The `number` type with optional validation checks.

**Details**

`checks` holds number-specific constraints, such as int, finite, min, max,
multipleOf, and between checks.

**See**

- `NumberMeta`

**Signature**

```ts
export interface Number {
  readonly _tag: "Number"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly checks: ReadonlyArray<Check<NumberMeta>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L212)

Since v4.0.0

## NumberMeta (type alias)

Metadata union for number-specific validation checks (int, finite,
min, max, multipleOf, between).

**See**

- `Number`
- `Check`

**Signature**

```ts
type NumberMeta = Schema.Annotations.BuiltInMetaDefinitions[
  | "isInt"
  | "isFinite"
  | "isMultipleOf"
  | "isGreaterThanOrEqualTo"
  | "isLessThanOrEqualTo"
  | "isGreaterThan"
  | "isLessThan"
  | "isBetween"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L564)

Since v4.0.0

## ObjectKeyword (interface)

The `object` keyword type (matches any non-primitive).

**Signature**

```ts
export interface ObjectKeyword {
  readonly _tag: "ObjectKeyword"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L284)

Since v4.0.0

## Objects (interface)

An object/struct type with named properties and optional index signatures.

**Details**

`propertySignatures` are the explicitly named fields. `indexSignatures`
define catch-all key/value types, such as `Record<string, T>`. `checks`
holds object-specific constraints, such as minProperties and maxProperties.

**See**

- `PropertySignature`
- `IndexSignature`
- `ObjectsMeta`

**Signature**

```ts
export interface Objects {
  readonly _tag: "Objects"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly propertySignatures: ReadonlyArray<PropertySignature>
  readonly indexSignatures: ReadonlyArray<IndexSignature>
  readonly checks: ReadonlyArray<Check<ObjectsMeta>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L373)

Since v4.0.0

## ObjectsMeta (type alias)

Metadata union for object-specific validation checks (minProperties,
maxProperties, propertiesLength, propertyNames).

**See**

- `Objects`
- `Check`

**Signature**

```ts
type ObjectsMeta =
  | Schema.Annotations.BuiltInMetaDefinitions["isMinProperties" | "isMaxProperties" | "isPropertiesLengthBetween"]
  | { readonly _tag: "isPropertyNames"; readonly propertyNames: Representation }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L619)

Since v4.0.0

## PropertySignature (interface)

A named property within an `Objects` representation.

**Details**

`name` is the property key, which can be a string, number, or symbol.
`isOptional` indicates whether the key can be absent. `isMutable` indicates
whether the property is mutable rather than readonly.

**See**

- `Objects`

**Signature**

```ts
export interface PropertySignature {
  readonly name: PropertyKey
  readonly type: Representation
  readonly isOptional: boolean
  readonly isMutable: boolean
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L395)

Since v4.0.0

## Reference (interface)

A named reference to a definition in the `References` map.

**When to use**

Use when a representation should point to a named definition instead of
embedding the definition inline.

**Details**

`$ref` is the key into `Document.references` or `MultiDocument.references`.
References are resolved lazily by `toSchema` and
`toCodeDocument`.

**Gotchas**

Resolution throws at runtime if the key is not found in the references map.

**See**

- `References`
- `Document`

**Signature**

```ts
export interface Reference {
  readonly _tag: "Reference"
  readonly $ref: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L104)

Since v4.0.0

## References (interface)

A string-keyed map of named `Representation` definitions. Used by
`Document` and `MultiDocument` for `$ref` resolution (analogous
to JSON Schema `$defs`).

**See**

- `Reference`
- `Document`

**Signature**

```ts
export interface References {
  readonly [$ref: string]: Representation
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L684)

Since v4.0.0

## Representation (type alias)

The core tagged union of all supported schema shapes.

**Details**

Each variant has a `_tag` discriminator. Switch on `_tag` to handle each
shape. Most variants carry optional `annotations` and some carry `checks`
for validation constraints.

**See**

- `Document`
- `fromAST`

**Signature**

```ts
type Representation =
  | Declaration
  | Reference
  | Suspend
  | Null
  | Undefined
  | Void
  | Never
  | Unknown
  | Any
  | String
  | Number
  | Boolean
  | BigInt
  | Symbol
  | Literal
  | UniqueSymbol
  | ObjectKeyword
  | Enum
  | TemplateLiteral
  | Arrays
  | Objects
  | Union
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L455)

Since v4.0.0

## Reviver (type alias)

A callback that handles `Declaration` nodes during reconstruction
(`toSchema`) or code generation (`toCodeDocument`).

**Details**

Return a value to handle the declaration. Return `undefined` to fall back to
default behavior, which uses `encodedSchema` for `toSchema` or the
`generation` annotation for `toCodeDocument`. `recur` processes child
representations recursively.

**See**

- `toSchema`
- `toSchemaDefaultReviver`
- `toCodeDocument`

**Signature**

```ts
type Reviver<T> = (declaration: Declaration, recur: (representation: Representation) => T) => T | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1736)

Since v4.0.0

## SizeMeta (type alias)

Metadata union for size-based validation checks (minSize, maxSize, size).
Used for collection types like `Set`, `Map`.

**See**

- `Declaration`
- `DeclarationMeta`

**Signature**

```ts
type SizeMeta = Schema.Annotations.BuiltInMetaDefinitions["isMinSize" | "isMaxSize" | "isSizeBetween"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L655)

Since v4.0.0

## String (interface)

The `string` type with optional validation checks.

**Details**

`checks` holds string-specific constraints, such as min/max length, pattern,
and UUID checks. `contentMediaType` and `contentSchema` indicate that the
string contains encoded data, such as `"application/json"` with a nested
schema.

**See**

- `StringMeta`
- `Check`

**Signature**

```ts
export interface String {
  readonly _tag: "String"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly checks: ReadonlyArray<Check<StringMeta>>
  readonly contentMediaType?: string | undefined
  readonly contentSchema?: Representation | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L191)

Since v4.0.0

## StringMeta (type alias)

Metadata union for string-specific validation checks (minLength, maxLength,
pattern, UUID, trimmed, etc.).

**See**

- `String`
- `Check`

**Signature**

```ts
type StringMeta = Schema.Annotations.BuiltInMetaDefinitions[
  | "isStringFinite"
  | "isStringBigInt"
  | "isStringSymbol"
  | "isMinLength"
  | "isMaxLength"
  | "isPattern"
  | "isLengthBetween"
  | "isTrimmed"
  | "isUUID"
  | "isGUID"
  | "isULID"
  | "isBase64"
  | "isBase64Url"
  | "isStartsWith"
  | "isEndsWith"
  | "isIncludes"
  | "isUppercased"
  | "isLowercased"
  | "isCapitalized"
  | "isUncapitalized"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L531)

Since v4.0.0

## Suspend (interface)

A lazily resolved representation used for recursive schemas.

**Details**

`thunk` points to the actual representation, possibly via a
`Reference`. `checks` is always empty on `Suspend` nodes.

**See**

- `Reference`

**Signature**

```ts
export interface Suspend {
  readonly _tag: "Suspend"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly checks: readonly []
  readonly thunk: Representation
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L73)

Since v4.0.0

## Symbol (interface)

The `symbol` type.

**Signature**

```ts
export interface Symbol {
  readonly _tag: "Symbol"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L249)

Since v4.0.0

## TemplateLiteral (interface)

A template literal type composed of a sequence of parts (literals, strings,
numbers, etc.).

**Signature**

```ts
export interface TemplateLiteral {
  readonly _tag: "TemplateLiteral"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly parts: ReadonlyArray<Representation>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L308)

Since v4.0.0

## Undefined (interface)

The `undefined` type.

**Signature**

```ts
export interface Undefined {
  readonly _tag: "Undefined"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L126)

Since v4.0.0

## Union (interface)

A union of multiple representations.

**Details**

`types` are the union members. `mode` controls JSON Schema output as either
`"anyOf"` (the default) or mutually exclusive `"oneOf"`.

**Signature**

```ts
export interface Union {
  readonly _tag: "Union"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly types: ReadonlyArray<Representation>
  readonly mode: "anyOf" | "oneOf"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L433)

Since v4.0.0

## UniqueSymbol (interface)

A specific unique `symbol` value.

**Signature**

```ts
export interface UniqueSymbol {
  readonly _tag: "UniqueSymbol"
  readonly annotations?: Schema.Annotations.Annotations | undefined
  readonly symbol: symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L272)

Since v4.0.0

## Unknown (interface)

The `unknown` type (any value accepted).

**Signature**

```ts
export interface Unknown {
  readonly _tag: "Unknown"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L159)

Since v4.0.0

## Void (interface)

The `void` type.

**Signature**

```ts
export interface Void {
  readonly _tag: "Void"
  readonly annotations?: Schema.Annotations.Annotations | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L137)

Since v4.0.0

# schemas

## $Annotations

Schema for serializing public `Schema.Annotations.Annotations` values. It
filters out internal annotation keys and non-primitive values during
encoding.

**When to use**

Use to serialize schema annotations in representation schemas while retaining
only primitive-tree metadata.

**Details**

Decoding is passthrough. Encoding removes internal annotation keys and values
that are not accepted by `$PrimitiveTree`.

**See**

- `$PrimitiveTree` for the codec used to filter annotation values

**Signature**

```ts
declare const $Annotations: Schema.decodeTo<
  Schema.$Record<Schema.String, Schema.Unknown>,
  Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L796)

Since v4.0.0

## $Any

Schema for the `Any` representation node.

**Signature**

```ts
declare const $Any: Schema.Struct<{
  readonly _tag: Schema.tag<"Any">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L872)

Since v4.0.0

## $Arrays

Schema for the `Arrays` representation node.

**Signature**

```ts
declare const $Arrays: Schema.Struct<{
  readonly _tag: Schema.tag<"Arrays">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly elements: Schema.$Array<
    Schema.Struct<{
      readonly isOptional: Schema.Boolean
      readonly type: Schema.suspend<$Representation>
      readonly annotations: Schema.optional<
        Schema.decodeTo<
          Schema.$Record<Schema.String, Schema.Unknown>,
          Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
          never,
          never
        >
      >
    }>
  >
  readonly rest: Schema.$Array<Schema.suspend<$Representation>>
  readonly checks: Schema.$Array<
    Schema.Codec<
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMinLength">; readonly minLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMaxLength">; readonly maxLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isLengthBetween">
              readonly minimum: Schema.Int
              readonly maximum: Schema.Int
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isUnique"> }, "Type">
      >,
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMinLength">; readonly minLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMaxLength">; readonly maxLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isLengthBetween">
              readonly minimum: Schema.Int
              readonly maximum: Schema.Int
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isUnique"> }, "Type">
      >,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1306)

Since v4.0.0

## $BigInt

Schema for the `BigInt` representation node.

**When to use**

Use to encode, decode, or validate serialized `BigInt` representation nodes,
not application `bigint` values.

**Details**

Accepts representation nodes with `_tag: "BigInt"`, optional annotations,
and bigint-specific validation metadata in `checks`.

**See**

- `BigIntMeta` for the metadata accepted by the `checks` array

**Signature**

```ts
declare const $BigInt: Schema.Struct<{
  readonly _tag: Schema.tag<"BigInt">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly checks: Schema.$Array<
    Schema.Codec<
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanBigInt">; readonly exclusiveMinimum: Schema.BigInt },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanOrEqualToBigInt">; readonly minimum: Schema.BigInt },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanBigInt">; readonly exclusiveMaximum: Schema.BigInt },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanOrEqualToBigInt">; readonly maximum: Schema.BigInt },
            "Type"
          >
        | {
            readonly _tag: "isBetweenBigInt"
            readonly minimum: bigint
            readonly maximum: bigint
            readonly exclusiveMinimum?: boolean | undefined
            readonly exclusiveMaximum?: boolean | undefined
          }
      >,
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanBigInt">; readonly exclusiveMinimum: Schema.BigInt },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanOrEqualToBigInt">; readonly minimum: Schema.BigInt },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanBigInt">; readonly exclusiveMaximum: Schema.BigInt },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanOrEqualToBigInt">; readonly maximum: Schema.BigInt },
            "Type"
          >
        | {
            readonly _tag: "isBetweenBigInt"
            readonly minimum: bigint
            readonly maximum: bigint
            readonly exclusiveMinimum?: boolean | undefined
            readonly exclusiveMaximum?: boolean | undefined
          }
      >,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1179)

Since v4.0.0

## $Boolean

Schema for the `Boolean` representation node.

**Signature**

```ts
declare const $Boolean: Schema.Struct<{
  readonly _tag: Schema.tag<"Boolean">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1120)

Since v4.0.0

## $DateMeta

Schema for `DateMeta`.

**Signature**

```ts
declare const $DateMeta: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"isDateValid"> }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isGreaterThanDate">; readonly exclusiveMinimum: Schema.Date }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isGreaterThanOrEqualToDate">; readonly minimum: Schema.Date }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isLessThanDate">; readonly exclusiveMaximum: Schema.Date }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isLessThanOrEqualToDate">; readonly maximum: Schema.Date }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isBetweenDate">
      readonly minimum: Schema.Date
      readonly maximum: Schema.Date
      readonly exclusiveMinimum: Schema.optional<Schema.Boolean>
      readonly exclusiveMaximum: Schema.optional<Schema.Boolean>
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1449)

Since v4.0.0

## $Declaration

Schema for the `Declaration` representation node.

**Signature**

```ts
declare const $Declaration: Schema.Struct<{
  readonly _tag: Schema.tag<"Declaration">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly typeParameters: Schema.$Array<Schema.suspend<$Representation>>
  readonly checks: Schema.$Array<
    Schema.Codec<
      Check<
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isDateValid"> }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanDate">; readonly exclusiveMinimum: Schema.Date },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanOrEqualToDate">; readonly minimum: Schema.Date },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanDate">; readonly exclusiveMaximum: Schema.Date },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanOrEqualToDate">; readonly maximum: Schema.Date },
            "Type"
          >
        | {
            readonly _tag: "isBetweenDate"
            readonly minimum: Date
            readonly maximum: Date
            readonly exclusiveMinimum?: boolean | undefined
            readonly exclusiveMaximum?: boolean | undefined
          }
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isMinSize">; readonly minSize: Schema.Int }, "Type">
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isMaxSize">; readonly maxSize: Schema.Int }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isSizeBetween">; readonly minimum: Schema.Int; readonly maximum: Schema.Int },
            "Type"
          >
      >,
      Check<
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isDateValid"> }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanDate">; readonly exclusiveMinimum: Schema.Date },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanOrEqualToDate">; readonly minimum: Schema.Date },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanDate">; readonly exclusiveMaximum: Schema.Date },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanOrEqualToDate">; readonly maximum: Schema.Date },
            "Type"
          >
        | {
            readonly _tag: "isBetweenDate"
            readonly minimum: Date
            readonly maximum: Date
            readonly exclusiveMinimum?: boolean | undefined
            readonly exclusiveMaximum?: boolean | undefined
          }
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isMinSize">; readonly minSize: Schema.Int }, "Type">
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isMaxSize">; readonly maxSize: Schema.Int }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isSizeBetween">; readonly minimum: Schema.Int; readonly maximum: Schema.Int },
            "Type"
          >
      >,
      never,
      never
    >
  >
  readonly encodedSchema: Schema.suspend<$Representation>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1503)

Since v4.0.0

## $DeclarationMeta

Schema for `DeclarationMeta`.

**Signature**

```ts
declare const $DeclarationMeta: Schema.Union<
  readonly [
    Schema.Union<
      readonly [
        Schema.Struct<{ readonly _tag: Schema.tag<"isDateValid"> }>,
        Schema.Struct<{ readonly _tag: Schema.tag<"isGreaterThanDate">; readonly exclusiveMinimum: Schema.Date }>,
        Schema.Struct<{ readonly _tag: Schema.tag<"isGreaterThanOrEqualToDate">; readonly minimum: Schema.Date }>,
        Schema.Struct<{ readonly _tag: Schema.tag<"isLessThanDate">; readonly exclusiveMaximum: Schema.Date }>,
        Schema.Struct<{ readonly _tag: Schema.tag<"isLessThanOrEqualToDate">; readonly maximum: Schema.Date }>,
        Schema.Struct<{
          readonly _tag: Schema.tag<"isBetweenDate">
          readonly minimum: Schema.Date
          readonly maximum: Schema.Date
          readonly exclusiveMinimum: Schema.optional<Schema.Boolean>
          readonly exclusiveMaximum: Schema.optional<Schema.Boolean>
        }>
      ]
    >,
    Schema.Union<
      readonly [
        Schema.Struct<{ readonly _tag: Schema.tag<"isMinSize">; readonly minSize: Schema.Int }>,
        Schema.Struct<{ readonly _tag: Schema.tag<"isMaxSize">; readonly maxSize: Schema.Int }>,
        Schema.Struct<{
          readonly _tag: Schema.tag<"isSizeBetween">
          readonly minimum: Schema.Int
          readonly maximum: Schema.Int
        }>
      ]
    >
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1492)

Since v4.0.0

## $Document

Schema for `Document`.

**When to use**

Use to validate or serialize a single schema representation document with
`Schema.decodeUnknownSync` or `Schema.encodeSync`.

**Gotchas**

This codec validates document structure but does not resolve `$ref` keys
against `references`.

**See**

- `DocumentFromJson` for the JSON-string codec wrapper
- `$MultiDocument` for validating documents with multiple root representations

**Signature**

```ts
declare const $Document: Schema.Struct<{
  readonly representation: $Representation
  readonly references: Schema.$Record<Schema.String, $Representation>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1583)

Since v4.0.0

## $Element

Schema for the `Element` type (positional tuple element).

**Signature**

```ts
declare const $Element: Schema.Struct<{
  readonly isOptional: Schema.Boolean
  readonly type: Schema.suspend<$Representation>
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1283)

Since v4.0.0

## $Enum

Schema for the `Enum` representation node.

**Signature**

```ts
declare const $Enum: Schema.Struct<{
  readonly _tag: Schema.tag<"Enum">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly enums: Schema.$Array<
    Schema.Tuple<readonly [Schema.String, Schema.Union<readonly [Schema.String, Schema.Number]>]>
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1251)

Since v4.0.0

## $IndexSignature

Schema for the `IndexSignature` type.

**Signature**

```ts
declare const $IndexSignature: Schema.Struct<{
  readonly parameter: Schema.suspend<$Representation>
  readonly type: Schema.suspend<$Representation>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1334)

Since v4.0.0

## $Literal

Schema for the `Literal` representation node.

**Signature**

```ts
declare const $Literal: Schema.Struct<{
  readonly _tag: Schema.tag<"Literal">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly literal: Schema.Union<readonly [Schema.String, Schema.Finite, Schema.Boolean, Schema.BigInt]>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1216)

Since v4.0.0

## $LiteralValue

Schema for the literal value types allowed in a `Literal` node
(string, finite number, boolean, or bigint).

**Signature**

```ts
declare const $LiteralValue: Schema.Union<readonly [Schema.String, Schema.Finite, Schema.Boolean, Schema.BigInt]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1203)

Since v4.0.0

## $MultiDocument

Schema for `MultiDocument`.

**Signature**

```ts
declare const $MultiDocument: Schema.Struct<{
  readonly representations: Schema.NonEmptyArray<$Representation>
  readonly references: Schema.$Record<Schema.String, $Representation>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1594)

Since v4.0.0

## $Never

Schema for the `Never` representation node.

**Signature**

```ts
declare const $Never: Schema.Struct<{
  readonly _tag: Schema.tag<"Never">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L850)

Since v4.0.0

## $Null

Schema for the `Null` representation node.

**Signature**

```ts
declare const $Null: Schema.Struct<{
  readonly _tag: Schema.tag<"Null">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L817)

Since v4.0.0

## $Number

Schema for the `Number` representation node.

**Signature**

```ts
declare const $Number: Schema.Struct<{
  readonly _tag: Schema.tag<"Number">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly checks: Schema.$Array<
    Schema.Codec<
      Check<
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isInt"> }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMultipleOf">; readonly divisor: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isFinite"> }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThan">; readonly exclusiveMinimum: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanOrEqualTo">; readonly minimum: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThan">; readonly exclusiveMaximum: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanOrEqualTo">; readonly maximum: Schema.Finite },
            "Type"
          >
        | {
            readonly _tag: "isBetween"
            readonly minimum: number
            readonly maximum: number
            readonly exclusiveMinimum?: boolean | undefined
            readonly exclusiveMaximum?: boolean | undefined
          }
      >,
      Check<
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isInt"> }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMultipleOf">; readonly divisor: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isFinite"> }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThan">; readonly exclusiveMinimum: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isGreaterThanOrEqualTo">; readonly minimum: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThan">; readonly exclusiveMaximum: Schema.Finite },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLessThanOrEqualTo">; readonly maximum: Schema.Finite },
            "Type"
          >
        | {
            readonly _tag: "isBetween"
            readonly minimum: number
            readonly maximum: number
            readonly exclusiveMinimum?: boolean | undefined
            readonly exclusiveMaximum?: boolean | undefined
          }
      >,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1108)

Since v4.0.0

## $NumberMeta

Schema for `NumberMeta`.

**Signature**

```ts
declare const $NumberMeta: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"isInt"> }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isMultipleOf">; readonly divisor: Schema.Finite }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isFinite"> }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isGreaterThan">; readonly exclusiveMinimum: Schema.Finite }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isGreaterThanOrEqualTo">; readonly minimum: Schema.Finite }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isLessThan">; readonly exclusiveMaximum: Schema.Finite }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isLessThanOrEqualTo">; readonly maximum: Schema.Finite }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isBetween">
      readonly minimum: Schema.Finite
      readonly maximum: Schema.Finite
      readonly exclusiveMinimum: Schema.optional<Schema.Boolean>
      readonly exclusiveMaximum: Schema.optional<Schema.Boolean>
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1091)

Since v4.0.0

## $ObjectKeyword

Schema for the `ObjectKeyword` representation node.

**Signature**

```ts
declare const $ObjectKeyword: Schema.Struct<{
  readonly _tag: Schema.tag<"ObjectKeyword">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1240)

Since v4.0.0

## $Objects

Schema for the `Objects` representation node.

**Signature**

```ts
declare const $Objects: Schema.Struct<{
  readonly _tag: Schema.tag<"Objects">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly propertySignatures: Schema.$Array<
    Schema.Struct<{
      readonly annotations: Schema.optional<
        Schema.decodeTo<
          Schema.$Record<Schema.String, Schema.Unknown>,
          Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
          never,
          never
        >
      >
      readonly name: Schema.Union<readonly [Schema.Finite, Schema.Symbol, Schema.String]>
      readonly type: Schema.suspend<$Representation>
      readonly isOptional: Schema.Boolean
      readonly isMutable: Schema.Boolean
    }>
  >
  readonly indexSignatures: Schema.$Array<
    Schema.Struct<{
      readonly parameter: Schema.suspend<$Representation>
      readonly type: Schema.suspend<$Representation>
    }>
  >
  readonly checks: Schema.$Array<
    Schema.Codec<
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMinProperties">; readonly minProperties: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMaxProperties">; readonly maxProperties: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isPropertiesLengthBetween">
              readonly minimum: Schema.Int
              readonly maximum: Schema.Int
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isPropertyNames">; readonly propertyNames: Schema.suspend<$Representation> },
            "Type"
          >
      >,
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMinProperties">; readonly minProperties: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMaxProperties">; readonly maxProperties: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isPropertiesLengthBetween">
              readonly minimum: Schema.Int
              readonly maximum: Schema.Int
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isPropertyNames">; readonly propertyNames: Schema.suspend<$Representation> },
            "Type"
          >
      >,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1379)

Since v4.0.0

## $ObjectsMeta

Schema for `ObjectsMeta`.

**Signature**

```ts
declare const $ObjectsMeta: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"isMinProperties">; readonly minProperties: Schema.Int }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isMaxProperties">; readonly maxProperties: Schema.Int }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isPropertiesLengthBetween">
      readonly minimum: Schema.Int
      readonly maximum: Schema.Int
    }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isPropertyNames">
      readonly propertyNames: Schema.suspend<$Representation>
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1366)

Since v4.0.0

## $PrimitiveTree

Schema for `PrimitiveTree`.

**When to use**

Use to validate recursive annotation metadata trees whose leaves are `null`,
`number`, `boolean`, `bigint`, `symbol`, or `string`.

**See**

- `PrimitiveTree` for the recursive tree type accepted by this codec
- `$Annotations` for the annotation codec that filters values through this codec

**Signature**

```ts
declare const $PrimitiveTree: Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L763)

Since v4.0.0

## $PropertySignature

Schema for the `PropertySignature` type.

**Signature**

```ts
declare const $PropertySignature: Schema.Struct<{
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly name: Schema.Union<readonly [Schema.Finite, Schema.Symbol, Schema.String]>
  readonly type: Schema.suspend<$Representation>
  readonly isOptional: Schema.Boolean
  readonly isMutable: Schema.Boolean
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1320)

Since v4.0.0

## $Reference

Schema for the `Reference` representation node.

**Signature**

```ts
declare const $Reference: Schema.Struct<{ readonly _tag: Schema.tag<"Reference">; readonly $ref: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1406)

Since v4.0.0

## $Representation

Schema for the full `Representation` union. It recursively validates
and encodes any representation node.

**Signature**

```ts
declare const $Representation: $Representation
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1539)

Since v4.0.0

## $Representation (interface)

Type-level helper for the recursive `$Representation` codec.

**Signature**

```ts
export interface $Representation extends Schema.Codec<Representation> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1530)

Since v4.0.0

## $SizeMeta

Schema for `SizeMeta`.

**Signature**

```ts
declare const $SizeMeta: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"isMinSize">; readonly minSize: Schema.Int }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isMaxSize">; readonly maxSize: Schema.Int }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isSizeBetween">
      readonly minimum: Schema.Int
      readonly maximum: Schema.Int
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1480)

Since v4.0.0

## $String

Schema for the `String` representation node.

**Signature**

```ts
declare const $String: Schema.Struct<{
  readonly _tag: Schema.tag<"String">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly checks: Schema.$Array<
    Schema.Codec<
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isStringFinite">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isStringBigInt">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isStringSymbol">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isTrimmed">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isUUID">
              readonly regExp: Schema.RegExp
              readonly version: Schema.UndefinedOr<Schema.Literals<readonly [1, 2, 3, 4, 5, 6, 7, 8]>>
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isGUID">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isULID">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isBase64">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isBase64Url">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isStartsWith">
              readonly startsWith: Schema.String
              readonly regExp: Schema.RegExp
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isEndsWith">
              readonly endsWith: Schema.String
              readonly regExp: Schema.RegExp
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isIncludes">
              readonly includes: Schema.String
              readonly regExp: Schema.RegExp
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isUppercased">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLowercased">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isCapitalized">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isUncapitalized">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMinLength">; readonly minLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMaxLength">; readonly maxLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isPattern">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isLengthBetween">
              readonly minimum: Schema.Int
              readonly maximum: Schema.Int
            },
            "Type"
          >
      >,
      Check<
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isStringFinite">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isStringBigInt">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isStringSymbol">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isTrimmed">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isUUID">
              readonly regExp: Schema.RegExp
              readonly version: Schema.UndefinedOr<Schema.Literals<readonly [1, 2, 3, 4, 5, 6, 7, 8]>>
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isGUID">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isULID">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isBase64">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isBase64Url">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isStartsWith">
              readonly startsWith: Schema.String
              readonly regExp: Schema.RegExp
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isEndsWith">
              readonly endsWith: Schema.String
              readonly regExp: Schema.RegExp
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isIncludes">
              readonly includes: Schema.String
              readonly regExp: Schema.RegExp
            },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isUppercased">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isLowercased">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isCapitalized">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isUncapitalized">; readonly regExp: Schema.RegExp },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMinLength">; readonly minLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<
            { readonly _tag: Schema.tag<"isMaxLength">; readonly maxLength: Schema.Int },
            "Type"
          >
        | Schema.Struct.ReadonlySide<{ readonly _tag: Schema.tag<"isPattern">; readonly regExp: Schema.RegExp }, "Type">
        | Schema.Struct.ReadonlySide<
            {
              readonly _tag: Schema.tag<"isLengthBetween">
              readonly minimum: Schema.Int
              readonly maximum: Schema.Int
            },
            "Type"
          >
      >,
      never,
      never
    >
  >
  readonly contentMediaType: Schema.optional<Schema.String>
  readonly contentSchema: Schema.optional<Schema.suspend<$Representation>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1036)

Since v4.0.0

## $StringMeta

Schema for `StringMeta`.

**Signature**

```ts
declare const $StringMeta: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"isStringFinite">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isStringBigInt">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isStringSymbol">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isTrimmed">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isUUID">
      readonly regExp: Schema.RegExp
      readonly version: Schema.UndefinedOr<Schema.Literals<readonly [1, 2, 3, 4, 5, 6, 7, 8]>>
    }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isGUID">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isULID">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isBase64">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isBase64Url">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isStartsWith">
      readonly startsWith: Schema.String
      readonly regExp: Schema.RegExp
    }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isEndsWith">
      readonly endsWith: Schema.String
      readonly regExp: Schema.RegExp
    }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isIncludes">
      readonly includes: Schema.String
      readonly regExp: Schema.RegExp
    }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isUppercased">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isLowercased">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isCapitalized">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isUncapitalized">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isMinLength">; readonly minLength: Schema.Int }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isMaxLength">; readonly maxLength: Schema.Int }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"isPattern">; readonly regExp: Schema.RegExp }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"isLengthBetween">
      readonly minimum: Schema.Int
      readonly maximum: Schema.Int
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L990)

Since v4.0.0

## $Suspend

Schema for the `Suspend` representation node.

**Signature**

```ts
declare const $Suspend: Schema.Struct<{
  readonly _tag: Schema.tag<"Suspend">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly checks: Schema.Tuple<readonly []>
  readonly thunk: Schema.suspend<$Representation>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1517)

Since v4.0.0

## $Symbol

Schema for the `Symbol` representation node.

**Signature**

```ts
declare const $Symbol: Schema.Struct<{
  readonly _tag: Schema.tag<"Symbol">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1191)

Since v4.0.0

## $TemplateLiteral

Schema for the `TemplateLiteral` representation node.

**Signature**

```ts
declare const $TemplateLiteral: Schema.Struct<{
  readonly _tag: Schema.tag<"TemplateLiteral">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly parts: Schema.$Array<Schema.suspend<$Representation>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1271)

Since v4.0.0

## $Undefined

Schema for the `Undefined` representation node.

**Signature**

```ts
declare const $Undefined: Schema.Struct<{
  readonly _tag: Schema.tag<"Undefined">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L828)

Since v4.0.0

## $Union

Schema for the `Union` representation node.

**Signature**

```ts
declare const $Union: Schema.Struct<{
  readonly _tag: Schema.tag<"Union">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly types: Schema.$Array<Schema.suspend<$Representation>>
  readonly mode: Schema.Literals<readonly ["anyOf", "oneOf"]>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1393)

Since v4.0.0

## $UniqueSymbol

Schema for the `UniqueSymbol` representation node.

**Signature**

```ts
declare const $UniqueSymbol: Schema.Struct<{
  readonly _tag: Schema.tag<"UniqueSymbol">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
  readonly symbol: Schema.Symbol
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1228)

Since v4.0.0

## $Unknown

Schema for the `Unknown` representation node.

**Signature**

```ts
declare const $Unknown: Schema.Struct<{
  readonly _tag: Schema.tag<"Unknown">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L861)

Since v4.0.0

## $Void

Schema for the `Void` representation node.

**Signature**

```ts
declare const $Void: Schema.Struct<{
  readonly _tag: Schema.tag<"Void">
  readonly annotations: Schema.optional<
    Schema.decodeTo<
      Schema.$Record<Schema.String, Schema.Unknown>,
      Schema.$Record<Schema.String, Schema.Codec<PrimitiveTree, PrimitiveTree, never, never>>,
      never,
      never
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L839)

Since v4.0.0

## DocumentFromJson

Schema that decodes a `Document` from JSON and encodes it back.

**When to use**

Use when you need a JSON codec for schema representation documents with
`Schema.decodeUnknownSync` or `Schema.encodeSync`.

**Example** (Round-tripping a Document through JSON)

```ts
import { Schema, SchemaRepresentation } from "effect"

const doc = SchemaRepresentation.fromAST(Schema.String.ast)
const json = Schema.encodeSync(SchemaRepresentation.DocumentFromJson)(doc)
const back = Schema.decodeUnknownSync(SchemaRepresentation.DocumentFromJson)(json)
```

**See**

- `$Document`
- `MultiDocumentFromJson`

**Signature**

```ts
declare const DocumentFromJson: Schema.Codec<Document, Schema.Json, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1683)

Since v4.0.0

## MultiDocumentFromJson

Schema for `MultiDocument` values encoded as JSON.

**See**

- `$MultiDocument`
- `DocumentFromJson`

**Signature**

```ts
declare const MultiDocumentFromJson: Schema.Codec<MultiDocument, Schema.Json, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1694)

Since v4.0.0

# transforming

## toJsonSchemaDocument

Converts a `Document` to a Draft 2020-12 JSON Schema document.

**When to use**

Use when you need to produce a standard JSON Schema document from a schema
representation `Document`.

**Gotchas**

JSON Schema generation is best-effort. Some Effect schema representation
semantics cannot be represented exactly in JSON Schema, and importing an
emitted JSON Schema may produce an equivalent approximation rather than the
original representation shape.

**Example** (Generating JSON Schema)

```ts
import { Schema, SchemaRepresentation } from "effect"

const doc = SchemaRepresentation.fromAST(Schema.String.ast)
const jsonSchema = SchemaRepresentation.toJsonSchemaDocument(doc)
console.log(jsonSchema.schema.type)
// "string"
```

**See**

- `Document`
- `toJsonSchemaMultiDocument`
- `fromJsonSchemaDocument`

**Signature**

```ts
declare const toJsonSchemaDocument: (
  document: Document,
  options?: Schema.ToJsonSchemaOptions
) => JsonSchema.Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2207)

Since v4.0.0

## toJsonSchemaMultiDocument

Converts a `MultiDocument` to a Draft 2020-12 JSON Schema
multi-document.

**When to use**

Use when you need to export related schema representation documents together
so shared definitions stay in multi-document JSON Schema form.

**Gotchas**

JSON Schema generation is best-effort. Some Effect schema representation
semantics cannot be represented exactly in JSON Schema, and importing an
emitted JSON Schema may produce equivalent approximations rather than the
original representation shapes.

**See**

- `MultiDocument`
- `toJsonSchemaDocument`
- `fromJsonSchemaMultiDocument`

**Signature**

```ts
declare const toJsonSchemaMultiDocument: (
  document: MultiDocument,
  options?: Schema.ToJsonSchemaOptions
) => JsonSchema.MultiDocument<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L2235)

Since v4.0.0

## toMultiDocument

Wraps a single `Document` as a `MultiDocument` with one
representation.

**When to use**

Use when you need to pass a single schema representation `Document` where an
API expects a `MultiDocument`.

**See**

- `Document`
- `MultiDocument`

**Signature**

```ts
declare const toMultiDocument: (document: Document) => MultiDocument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1711)

Since v4.0.0

## toSchemaDefaultReviver

Default `Reviver` for `toSchema` that handles built-in Effect
types, including Option, Result, Redacted, Cause, Exit, ReadonlyMap, HashMap,
ReadonlySet, Date, Duration, URL, and RegExp.

**When to use**

Use when you need the default `options.reviver` for `toSchema` to
reconstruct runtime schemas for built-in Effect declarations.

**Details**

The reviver returns `undefined` for unrecognized declarations, causing
fallback to `encodedSchema`.

**See**

- `toSchema`
- `Reviver`

**Signature**

```ts
declare const toSchemaDefaultReviver: Reviver<Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaRepresentation.ts#L1759)

Since v4.0.0
