---
title: SchemaIssue.ts
nav_order: 101
parent: "effect"
---

## SchemaIssue.ts overview

Describes problems found while decoding, encoding, or checking data with
schemas.

An `Issue` records what failed and, for nested data, where the failure
happened. The Schema system uses these values for missing keys, unexpected
keys, invalid types, invalid values, failed filters, failed transformations,
and alternatives that did not match. This module also formats issues and
supports redaction for sensitive values.

Since v4.0.0

---

## Exports Grouped by Category

- [Formatter](#formatter)
  - [CheckHook (type alias)](#checkhook-type-alias)
  - [Formatter (interface)](#formatter-interface)
  - [LeafHook (type alias)](#leafhook-type-alias)
  - [defaultCheckHook](#defaultcheckhook)
  - [defaultLeafHook](#defaultleafhook)
  - [makeFormatterDefault](#makeformatterdefault)
  - [makeFormatterStandardSchemaV1](#makeformatterstandardschemav1)
- [getters](#getters)
  - [getActual](#getactual)
- [guards](#guards)
  - [isIssue](#isissue)
- [models](#models)
  - [AnyOf (class)](#anyof-class)
    - [\_tag (property)](#_tag-property)
    - [ast (property)](#ast-property)
    - [actual (property)](#actual-property)
    - [issues (property)](#issues-property)
  - [Composite (class)](#composite-class)
    - [\_tag (property)](#_tag-property-1)
    - [ast (property)](#ast-property-1)
    - [actual (property)](#actual-property-1)
    - [issues (property)](#issues-property-1)
  - [Encoding (class)](#encoding-class)
    - [\_tag (property)](#_tag-property-2)
    - [ast (property)](#ast-property-2)
    - [actual (property)](#actual-property-2)
    - [issue (property)](#issue-property)
  - [Filter (class)](#filter-class)
    - [\_tag (property)](#_tag-property-3)
    - [actual (property)](#actual-property-3)
    - [filter (property)](#filter-property)
    - [issue (property)](#issue-property-1)
  - [Forbidden (class)](#forbidden-class)
    - [\_tag (property)](#_tag-property-4)
    - [actual (property)](#actual-property-4)
    - [annotations (property)](#annotations-property)
  - [InvalidType (class)](#invalidtype-class)
    - [\_tag (property)](#_tag-property-5)
    - [ast (property)](#ast-property-3)
    - [actual (property)](#actual-property-5)
  - [InvalidValue (class)](#invalidvalue-class)
    - [\_tag (property)](#_tag-property-6)
    - [actual (property)](#actual-property-6)
    - [annotations (property)](#annotations-property-1)
  - [Issue (type alias)](#issue-type-alias)
  - [Leaf (type alias)](#leaf-type-alias)
  - [MissingKey (class)](#missingkey-class)
    - [\_tag (property)](#_tag-property-7)
    - [annotations (property)](#annotations-property-2)
  - [OneOf (class)](#oneof-class)
    - [\_tag (property)](#_tag-property-8)
    - [ast (property)](#ast-property-4)
    - [actual (property)](#actual-property-7)
    - [successes (property)](#successes-property)
  - [Pointer (class)](#pointer-class)
    - [\_tag (property)](#_tag-property-9)
    - [path (property)](#path-property)
    - [issue (property)](#issue-property-2)
  - [UnexpectedKey (class)](#unexpectedkey-class)
    - [\_tag (property)](#_tag-property-10)
    - [ast (property)](#ast-property-5)
    - [actual (property)](#actual-property-8)

---

# Formatter

## CheckHook (type alias)

Callback type used to format `Filter` issues into strings.

**When to use**

Use when customizing how `makeFormatterStandardSchemaV1` renders
filter failures.

**Details**

- Returns `string` to override the message, or `undefined` to fall back to
  the default formatting.

**See**

- `defaultCheckHook` — the built-in implementation
- `Filter` — the issue type this hook formats

**Signature**

```ts
type CheckHook = (issue: Filter) => string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L936)

Since v4.0.0

## Formatter (interface)

A function type that converts an `Issue` into a formatted
representation. Specialisation of the generic `Formatter` from
`Formatter.ts` with `Value` fixed to `Issue`.

**See**

- `makeFormatterDefault` — creates a `Formatter<string>`
- `makeFormatterStandardSchemaV1` — creates a `Formatter<StandardSchemaV1.FailureResult>`

**Signature**

```ts
export interface Formatter<out Format> extends FormatterI<Issue, Format> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L846)

Since v4.0.0

## LeafHook (type alias)

Callback type used to format `Leaf` issues into strings.

**When to use**

Use when customizing how `makeFormatterStandardSchemaV1` renders
terminal issues.

**See**

- `defaultLeafHook` — the built-in implementation
- `Leaf` — the union of terminal issue types

**Signature**

```ts
type LeafHook = (issue: Leaf) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L862)

Since v4.0.0

## defaultCheckHook

Returns the built-in `CheckHook` used by default formatters.

**When to use**

Use as the default filter renderer when customizing only the `LeafHook`.

**Details**

- Looks for a `message` annotation on the inner issue first, then on the
  filter itself.
- Returns `undefined` when no annotation is found, causing the formatter to
  fall back to `"Expected <filter>, got <actual>"`.

**See**

- `CheckHook`
- `makeFormatterStandardSchemaV1`

**Signature**

```ts
declare const defaultCheckHook: CheckHook
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L958)

Since v4.0.0

## defaultLeafHook

Returns the built-in `LeafHook` used by default formatters.

**When to use**

Use as the default leaf renderer when customizing only the `CheckHook`.

**Details**

- Checks for a `message` annotation first; returns it if present.
- Otherwise generates a default message per `_tag`:
  - `InvalidType` → `"Expected <type>, got <actual>"`
  - `InvalidValue` → `"Invalid data <actual>"`
  - `MissingKey` → `"Missing key"`
  - `UnexpectedKey` → `"Unexpected key with value <actual>"`
  - `Forbidden` → `"Forbidden operation"`
  - `OneOf` → `"Expected exactly one member to match the input <actual>"`

**Example** (Formatting Standard Schema issues with defaultLeafHook)

```ts
import { SchemaIssue } from "effect"

const formatter = SchemaIssue.makeFormatterStandardSchemaV1({
  leafHook: SchemaIssue.defaultLeafHook
})
```

**See**

- `LeafHook`
- `makeFormatterStandardSchemaV1`

**Signature**

```ts
declare const defaultLeafHook: LeafHook
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L898)

Since v4.0.0

## makeFormatterDefault

Creates a `Formatter` that converts an `Issue` into a
human-readable multi-line string.

**When to use**

Use when you need to format a `SchemaIssue.Issue` as error messages for
logging, CLI output, or developer-facing diagnostics.

**Details**

This is the default formatter used by `SchemaIssue.toString()`.

- Flattens the issue tree into `{ message, path }` entries using
  `defaultLeafHook` and `defaultCheckHook`.
- Each entry is rendered as `"<message>"` or `"<message>\n  at <path>"`.
- Multiple entries are joined with newlines.

**Example** (Formatting an issue as a string)

```ts
import { SchemaIssue } from "effect"

const formatter = SchemaIssue.makeFormatterDefault()
```

**See**

- `makeFormatterStandardSchemaV1` — produces Standard Schema V1 format instead
- `Formatter`

**Signature**

```ts
declare const makeFormatterDefault: () => Formatter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L1100)

Since v4.0.0

## makeFormatterStandardSchemaV1

Creates a `Formatter` that produces a `StandardSchemaV1.FailureResult`.

**When to use**

Use when you need schema parse errors in
[Standard Schema V1](https://github.com/standard-schema/standard-schema)
format, optionally customizing leaf or check issue rendering.

**Details**

- Returns a `Formatter<StandardSchemaV1.FailureResult>`.
- Each leaf issue is flattened into `{ message, path }` entries.
- `Pointer` paths are accumulated to produce full property paths.
- Falls back to `defaultLeafHook` / `defaultCheckHook` when no
  hooks are provided.

**Example** (Creating a Standard Schema V1 formatter)

```ts
import { SchemaIssue } from "effect"

const formatter = SchemaIssue.makeFormatterStandardSchemaV1()
```

**See**

- `makeFormatterDefault` — produces a plain string instead
- `LeafHook`
- `CheckHook`

**Signature**

```ts
declare const makeFormatterStandardSchemaV1: (options?: {
  readonly leafHook?: LeafHook | undefined
  readonly checkHook?: CheckHook | undefined
}) => Formatter<StandardSchemaV1.FailureResult>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L994)

Since v4.0.0

# getters

## getActual

Extracts the actual input value from any `Issue` variant.

**When to use**

Use when you need to retrieve an `Issue`'s offending input value for logging
or custom error rendering.

**Details**

- Returns `Option.none()` for `Pointer` and `MissingKey` (they carry no
  value).
- Returns the existing `Option` for variants that already store `actual` as
  `Option<unknown>` (`InvalidType`, `InvalidValue`, `Forbidden`, `Encoding`,
  `Composite`).
- Wraps `actual` with `Option.some` for variants that store it as plain
  `unknown` (`AnyOf`, `UnexpectedKey`, `OneOf`, `Filter`).

**Example** (Extracting the actual value)

```ts
import { Option, SchemaIssue } from "effect"

const issue = new SchemaIssue.MissingKey(undefined)
console.log(SchemaIssue.getActual(issue))
// { _tag: "None" }
```

**See**

- `Issue`
- `isIssue`

**Signature**

```ts
declare const getActual: (issue: Issue) => Option.Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L778)

Since v4.0.0

# guards

## isIssue

Returns `true` if the given value is an `Issue`.

**When to use**

Use when you need to narrow an `unknown` value to `Issue` in error-handling
code, such as distinguishing an `Issue` from other error types in a catch-all
handler.

**Details**

- Checks for the internal `TypeId` brand on the value.

**Example** (Type-guarding an unknown error)

```ts
import { SchemaIssue } from "effect"

const issue = new SchemaIssue.MissingKey(undefined)
console.log(SchemaIssue.isIssue(issue))
// true
console.log(SchemaIssue.isIssue("not an issue"))
// false
```

**See**

- `Issue`

**Signature**

```ts
declare const isIssue: (u: unknown) => u is Issue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L55)

Since v4.0.0

# models

## AnyOf (class)

Represents a schema issue produced when a value does not match _any_ member of a union schema.

**When to use**

Use when you need to inspect which union members were attempted and why each
failed.

**Details**

- `ast` is the `Union` AST node.
- `actual` is the raw input value (plain `unknown`).
- `issues` contains per-member failures. When empty, the formatter falls
  back to the union's `expected` annotation.

**See**

- `OneOf` — the opposite: _too many_ members matched
- `Composite` — groups multiple issues under a non-union schema

**Signature**

```ts
declare class AnyOf {
  constructor(
    /**
     * The schema that caused the issue.
     */
    ast: SchemaAST.Union,
    /**
     * The input value that caused the issue.
     */
    actual: unknown,
    /**
     * The issues that occurred.
     */
    issues: ReadonlyArray<Issue>
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L650)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "AnyOf"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L651)

### ast (property)

The schema that caused the issue.

**Signature**

```ts
readonly ast: SchemaAST.Union<SchemaAST.AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L655)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L659)

### issues (property)

The issues that occurred.

**Signature**

```ts
readonly issues: ReadonlyArray<Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L663)

## Composite (class)

Represents a schema issue that groups multiple child issues under a single schema node.

**When to use**

Use when you need to walk the issue tree for struct/tuple schemas that collect
all field errors rather than failing on the first.

**Details**

- `issues` is a non-empty readonly array (at least one child).
- `actual` is `Option.some(value)` when the input was present, or
  `Option.none()` when absent.
- Formatters flatten `Composite` by recursing into each child.

**See**

- `AnyOf` — used for union no-match errors (similar but different semantics)
- `Pointer` — adds path context to individual issues

**Signature**

```ts
declare class Composite {
  constructor(
    /**
     * The schema that caused the issue.
     */
    ast: SchemaAST.AST,
    /**
     * The input value that caused the issue.
     */
    actual: Option.Option<unknown>,
    /**
     * The issues that occurred.
     */
    issues: readonly [Issue, ...Array<Issue>]
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L406)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Composite"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L407)

### ast (property)

The schema that caused the issue.

**Signature**

```ts
readonly ast: SchemaAST.AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L411)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: Option.Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L415)

### issues (property)

The issues that occurred.

**Signature**

```ts
readonly issues: readonly [Issue, ...Issue[]]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L419)

## Encoding (class)

Represents a schema issue produced when a schema transformation (encode/decode step) fails.

**When to use**

Use when you need to inspect failures from `Schema.decodeTo` / `Schema.encodeTo`
transformations.

**Details**

- `ast` is the AST node for the transformation that failed.
- `actual` is `Option.some(value)` when the input was present, or
  `Option.none()` when it was absent.
- `issue` is the inner issue describing the failure.

**See**

- `Filter` — failure from a refinement check (not a transformation)
- `Composite` — multiple issues from a single schema node

**Signature**

```ts
declare class Encoding {
  constructor(
    /**
     * The schema that caused the issue.
     */
    ast: SchemaAST.AST,
    /**
     * The input value that caused the issue.
     */
    actual: Option.Option<unknown>,
    /**
     * The issue that occurred.
     */
    issue: Issue
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L216)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Encoding"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L217)

### ast (property)

The schema that caused the issue.

**Signature**

```ts
readonly ast: SchemaAST.AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L221)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: Option.Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L225)

### issue (property)

The issue that occurred.

**Signature**

```ts
readonly issue: Issue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L229)

## Filter (class)

Represents a schema issue produced when a schema filter (refinement check) fails.

**When to use**

Use when you need to inspect a schema issue that records which refinement
check rejected the value.

**Details**

- `actual` is the raw input value that was tested (plain `unknown`, not
  wrapped in `Option`).
- `filter` is the AST filter node that produced this issue.
- `issue` is the inner issue describing the failure reason.

**Example** (Matching a Filter issue)

```ts
import { SchemaIssue } from "effect"

function describe(issue: SchemaIssue.Issue): string {
  if (issue._tag === "Filter") {
    return `Filter failed on: ${JSON.stringify(issue.actual)}`
  }
  return String(issue)
}
```

**See**

- `Leaf` — terminal issue types that commonly appear as the inner `issue`
- `CheckHook` — formatter hook for `Filter` issues

**Signature**

```ts
declare class Filter {
  constructor(
    /**
     * The input value that caused the issue.
     */
    actual: unknown,
    /**
     * The filter that failed.
     */
    filter: SchemaAST.Filter<any>,
    /**
     * The issue that occurred.
     */
    issue: Issue
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L159)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Filter"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L160)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L164)

### filter (property)

The filter that failed.

**Signature**

```ts
readonly filter: SchemaAST.Filter<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L168)

### issue (property)

The issue that occurred.

**Signature**

```ts
readonly issue: Issue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L172)

## Forbidden (class)

Represents a schema issue produced when a forbidden operation is encountered during parsing,
such as an asynchronous Effect running inside `Schema.decodeUnknownSync`.

**When to use**

Use when you need to detect that a schema requires async execution but was run
synchronously.

**Details**

- `actual` is `Option.some(value)` when the input is known, or
  `Option.none()` when absent.
- `annotations` optionally carries a `message` string.
- The default formatter renders this as `"Forbidden operation"`.

**Example** (Creating a Forbidden issue)

```ts
import { Option, SchemaIssue } from "effect"

const issue = new SchemaIssue.Forbidden(Option.none(), { message: "async operation not allowed in sync context" })
console.log(String(issue))
// "async operation not allowed in sync context"
```

**See**

- `InvalidValue` — for value-constraint failures (not operation failures)

**Signature**

```ts
declare class Forbidden {
  constructor(
    /**
     * The input value that caused the issue.
     */
    actual: Option.Option<unknown>,
    /**
     * The metadata for the issue.
     */
    annotations: Schema.Annotations.Issue | undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L602)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Forbidden"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L603)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: Option.Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L607)

### annotations (property)

The metadata for the issue.

**Signature**

```ts
readonly annotations: Schema.Annotations.Issue | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L611)

## InvalidType (class)

Represents a schema issue produced when the runtime type of the input does not match the type
expected by the schema (e.g. got `null` when `string` was expected).

**When to use**

Use when you need to detect basic type mismatches, such as a wrong primitive
or `null` where an object was expected.

**Details**

- `ast` is the schema node that expected a different type.
- `actual` is `Option.some(value)` when the input was present, or
  `Option.none()` when no value was provided.
- The default formatter renders this as `"Expected <type>, got <actual>"`.

**Example** (Formatting output)

```ts
import { Schema } from "effect"

try {
  Schema.decodeUnknownSync(Schema.String)(42)
} catch (e) {
  if (Schema.isSchemaError(e)) {
    console.log(String(e.issue))
    // "Expected string, got 42"
  }
}
```

**See**

- `InvalidValue` — the input has the right type but fails a value constraint

**Signature**

```ts
declare class InvalidType {
  constructor(
    /**
     * The schema that caused the issue.
     */
    ast: SchemaAST.AST,
    /**
     * The input value that caused the issue.
     */
    actual: Option.Option<unknown>
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L478)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "InvalidType"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L479)

### ast (property)

The schema that caused the issue.

**Signature**

```ts
readonly ast: SchemaAST.AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L483)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: Option.Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L487)

## InvalidValue (class)

Represents a schema issue produced when the input has the correct type but its value violates a
constraint (e.g. a string that is too short, a number out of range).

**When to use**

Use when you need to detect constraint violations from `Schema.filter`,
`Schema.minLength`, `Schema.greaterThan`, or similar checks.

**Details**

- `actual` is `Option.some(value)` when the failing value is known, or
  `Option.none()` when absent.
- `annotations` optionally carries a `message` string for formatting.
- The default formatter renders this as `"Invalid data <actual>"` unless a
  custom `message` annotation is provided.

**Example** (Returning InvalidValue from a custom filter)

```ts
import { Option, SchemaIssue } from "effect"

const issue = new SchemaIssue.InvalidValue(Option.some(""), { message: "must not be empty" })
console.log(String(issue))
// "must not be empty"
```

**See**

- `InvalidType` — the input has the wrong type entirely
- `Filter` — composite wrapper when a schema filter produces this issue

**Signature**

```ts
declare class InvalidValue {
  constructor(
    /**
     * The value that caused the issue.
     */
    actual: Option.Option<unknown>,
    /**
     * The metadata for the issue.
     */
    annotations?: Schema.Annotations.Issue | undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L541)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "InvalidValue"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L542)

### actual (property)

The value that caused the issue.

**Signature**

```ts
readonly actual: Option.Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L546)

### annotations (property)

The metadata for the issue.

**Signature**

```ts
readonly annotations: Schema.Annotations.Issue | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L550)

## Issue (type alias)

The root discriminated union of all validation error nodes.

**When to use**

Use when typing the error channel in `Effect<A, Issue, R>` results from
schema parsing, or when writing custom formatters or issue-tree walkers.

**Details**

Every node has a `_tag` field for pattern-matching. The union includes both
terminal `Leaf` types and composite types that wrap inner issues:
`Filter`, `Encoding`, `Pointer`, `Composite`,
`AnyOf`. All `Issue` instances have a `toString()` that delegates to
the default formatter, so `String(issue)` produces a human-readable message.

**See**

- `Leaf` — the terminal subset
- `isIssue` — type guard
- `getActual` — extract the actual value from any issue

**Signature**

```ts
type Issue =
  | Leaf
  // composite
  | Filter
  | Encoding
  | Pointer
  | Composite
  | AnyOf
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L109)

Since v4.0.0

## Leaf (type alias)

Union of all terminal (leaf) issue types that have no inner `Issue` children.

**When to use**

Use when constraining formatter hooks to only handle terminal nodes or when
pattern matching on the `_tag` of an issue and only leaf nodes matter.

**Details**

Members: `InvalidType`, `InvalidValue`, `MissingKey`,
`UnexpectedKey`, `Forbidden`, `OneOf`.

**See**

- `Issue` — the full union including composite nodes
- `LeafHook` — formatter hook that operates on `Leaf` values

**Signature**

```ts
type Leaf = InvalidType | InvalidValue | MissingKey | UnexpectedKey | Forbidden | OneOf
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L78)

Since v4.0.0

## MissingKey (class)

Represents a schema issue produced when a required key or tuple index is missing from the input.

**When to use**

Use when you need to detect absent fields in struct/tuple validation.

**Details**

- Has no `actual` value — `getActual` returns `Option.none()`.
- `annotations` may contain a custom `messageMissingKey` for formatting.

**See**

- `Pointer` — wraps this issue with the missing key's path
- `UnexpectedKey` — the opposite case (extra key present)

**Signature**

```ts
declare class MissingKey {
  constructor(
    /**
     * The metadata for the issue.
     */
    annotations: Schema.Annotations.Key<unknown> | undefined
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L319)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "MissingKey"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L320)

### annotations (property)

The metadata for the issue.

**Signature**

```ts
readonly annotations: Schema.Annotations.Key<unknown> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L324)

## OneOf (class)

Represents a schema issue produced when a value matches _multiple_ members of a union that is
configured to allow exactly one match (oneOf mode).

**When to use**

Use when you need to detect ambiguous union matches when `oneOf` validation is
enabled.

**Details**

- `ast` is the `Union` AST node.
- `actual` is the raw input value (plain `unknown`).
- `successes` lists the AST nodes of each member that accepted the input.
- The default formatter renders this as
  `"Expected exactly one member to match the input <actual>"`.

**See**

- `AnyOf` — the opposite: _no_ members matched

**Signature**

```ts
declare class OneOf {
  constructor(
    /**
     * The schema that caused the issue.
     */
    ast: SchemaAST.Union,
    /**
     * The input value that caused the issue.
     */
    actual: unknown,
    /**
     * The schemas that were successful.
     */
    successes: ReadonlyArray<SchemaAST.AST>
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L708)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "OneOf"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L709)

### ast (property)

The schema that caused the issue.

**Signature**

```ts
readonly ast: SchemaAST.Union<SchemaAST.AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L713)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L717)

### successes (property)

The schemas that were successful.

**Signature**

```ts
readonly successes: ReadonlyArray<SchemaAST.AST>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L721)

## Pointer (class)

Wraps an inner `Issue` with a property-key path, indicating _where_ in
a nested structure the error occurred.

**When to use**

Use when you need to walk the issue tree to accumulate path segments for error
reporting.

**Details**

- `path` is an array of property keys (strings, numbers, or symbols).
- Has no `actual` value — `getActual` returns `Option.none()`.
- Formatters concatenate nested `Pointer` paths into a single path like
  `["a"]["b"][0]`.

**See**

- `getActual` — returns `Option.none()` for `Pointer`
- `Composite` — groups multiple issues under one schema node

**Signature**

```ts
declare class Pointer {
  constructor(
    /**
     * The path to the location in the input that caused the issue.
     */
    path: ReadonlyArray<PropertyKey>,
    /**
     * The issue that occurred.
     */
    issue: Issue
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L274)

Since v3.10.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "Pointer"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L275)

### path (property)

The path to the location in the input that caused the issue.

**Signature**

```ts
readonly path: ReadonlyArray<PropertyKey>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L279)

### issue (property)

The issue that occurred.

**Signature**

```ts
readonly issue: Issue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L283)

## UnexpectedKey (class)

Represents a schema issue produced when an input object or tuple contains a key/index not
declared by the schema.

**When to use**

Use when you need to detect excess properties during strict struct/tuple
validation.

**Details**

- `actual` is the raw value at the unexpected key (plain `unknown`).
- `ast` is the schema that was being validated against.
- `annotations` on `ast` may contain a custom `messageUnexpectedKey`.

**See**

- `MissingKey` — the opposite case (required key absent)
- `Pointer` — wraps this issue with the unexpected key's path

**Signature**

```ts
declare class UnexpectedKey {
  constructor(
    /**
     * The schema that caused the issue.
     */
    ast: SchemaAST.AST,
    /**
     * The input value that caused the issue.
     */
    actual: unknown
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L358)

Since v4.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "UnexpectedKey"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L359)

### ast (property)

The schema that caused the issue.

**Signature**

```ts
readonly ast: SchemaAST.AST
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L363)

### actual (property)

The input value that caused the issue.

**Signature**

```ts
readonly actual: unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaIssue.ts#L367)
