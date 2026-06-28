---
title: Statement.ts
nav_order: 339
parent: "effect"
---

## Statement.ts overview

Low-level SQL statement and fragment primitives.

`SqlClient` uses this module to build executable, parameterized SQL from
reusable fragments. A statement can be executed, streamed, run without row
transformation, or compiled to SQL text and parameters for a specific
dialect. The module also contains helpers for identifiers, parameters,
inserts, updates, custom dialect fragments, statement compilation, and row
transformation.

Since v4.0.0

---

## Exports Grouped by Category

- [compiler](#compiler)
  - [Compiler (interface)](#compiler-interface)
  - [CompilerOptions (type alias)](#compileroptions-type-alias)
  - [makeCompiler](#makecompiler)
  - [makeCompilerSqlite](#makecompilersqlite)
- [constructors](#constructors)
  - [and](#and)
  - [arrayHelper](#arrayhelper)
  - [csv](#csv)
  - [custom](#custom)
  - [defaultEscape](#defaultescape)
  - [fragment](#fragment)
  - [identifier](#identifier)
  - [join](#join)
  - [literal](#literal)
  - [make](#make)
  - [or](#or)
  - [parameter](#parameter)
  - [recordInsertHelper](#recordinserthelper)
  - [recordUpdateHelper](#recordupdatehelper)
  - [recordUpdateHelperSingle](#recordupdatehelpersingle)
  - [statement](#statement)
- [guards](#guards)
  - [isCustom](#iscustom)
  - [isFragment](#isfragment)
- [models](#models)
  - [ArrayHelper (interface)](#arrayhelper-interface)
  - [Constructor (interface)](#constructor-interface)
  - [Custom (interface)](#custom-interface)
  - [Dialect (type alias)](#dialect-type-alias)
  - [Fragment (interface)](#fragment-interface)
  - [Helper (type alias)](#helper-type-alias)
  - [Identifier (interface)](#identifier-interface)
  - [Literal (interface)](#literal-interface)
  - [Parameter (interface)](#parameter-interface)
  - [PrimitiveKind (type alias)](#primitivekind-type-alias)
  - [RecordInsertHelper (interface)](#recordinserthelper-interface)
  - [RecordUpdateHelper (interface)](#recordupdatehelper-interface)
  - [RecordUpdateHelperSingle (interface)](#recordupdatehelpersingle-interface)
  - [Segment (type alias)](#segment-type-alias)
  - [Statement (interface)](#statement-interface)
  - [Transformer (type alias)](#transformer-type-alias)
- [predicates](#predicates)
  - [primitiveKind](#primitivekind)
- [transformer](#transformer)
  - [CurrentTransformer](#currenttransformer)
- [transforming](#transforming)
  - [defaultTransforms](#defaulttransforms)

---

# compiler

## Compiler (interface)

Dialect-specific compiler that converts a SQL `Fragment` into SQL text and
bind parameters, with a no-transform variant.

**Signature**

```ts
export interface Compiler {
  readonly dialect: Dialect
  readonly compile: (
    statement: Fragment,
    withoutTransform: boolean
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
  readonly withoutTransform: this
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L743)

Since v4.0.0

## CompilerOptions (type alias)

Callbacks used by `makeCompiler` to render dialect placeholders,
identifiers, insert helpers, update helpers, and custom SQL segments.

**Signature**

```ts
type CompilerOptions<C> = {
  readonly dialect: Dialect
  readonly placeholder: (index: number, value: unknown) => string
  readonly onIdentifier: (value: string, withoutTransform: boolean) => string
  readonly onRecordUpdate: (
    placeholders: string,
    alias: string,
    columns: string,
    values: ReadonlyArray<ReadonlyArray<unknown>>,
    returning: readonly [sql: string, params: ReadonlyArray<unknown>] | undefined
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
  readonly onCustom: (
    type: C,
    placeholder: (u: unknown) => string,
    withoutTransform: boolean
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
  readonly onInsert?: (
    columns: ReadonlyArray<string>,
    placeholders: string,
    values: ReadonlyArray<ReadonlyArray<unknown>>,
    returning: readonly [sql: string, params: ReadonlyArray<unknown>] | undefined
  ) => readonly [sql: string, binds: ReadonlyArray<unknown>]
  readonly onRecordUpdateSingle?: (
    columns: ReadonlyArray<string>,
    values: ReadonlyArray<unknown>,
    returning: readonly [sql: string, params: ReadonlyArray<unknown>] | undefined
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L759)

Since v4.0.0

## makeCompiler

Creates a dialect-specific SQL `Compiler` from rendering callbacks.

**Signature**

```ts
declare const makeCompiler: <C extends Custom<any, any, any, any> = any>(options: CompilerOptions<C>) => Compiler
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L794)

Since v4.0.0

## makeCompilerSqlite

Creates a SQLite compiler that uses `?` placeholders and quoted identifiers,
optionally transforming identifier names before escaping.

**Signature**

```ts
declare const makeCompilerSqlite: (transform?: ((_: string) => string) | undefined) => Compiler
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L1054)

Since v4.0.0

# constructors

## and

Combines clauses with `AND`, parenthesizing multiple clauses and returning
`1=1` when the list is empty.

**Signature**

```ts
declare const and: (clauses: ReadonlyArray<string | Fragment>) => Fragment
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L693)

Since v4.0.0

## arrayHelper

Constructs an `ArrayHelper` segment for an array of values or fragments.

**Signature**

```ts
declare const arrayHelper: (value: ReadonlyArray<unknown | Fragment>) => ArrayHelper
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L233)

Since v4.0.0

## csv

Creates a comma-separated SQL fragment from values, optionally adding a
prefix, and returns an empty fragment when no values are provided.

**Signature**

```ts
declare const csv: {
  (values: ReadonlyArray<string | Fragment>): Fragment
  (prefix: string, values: ReadonlyArray<string | Fragment>): Fragment
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L711)

Since v4.0.0

## custom

Creates a constructor for custom SQL segments of a specific kind handled by
the active compiler.

**Signature**

```ts
declare const custom: <C extends Custom<any, any, any, any>>(
  kind: C["kind"]
) => (paramA: C["paramA"], paramB: C["paramB"], paramC: C["paramC"]) => C
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L381)

Since v4.0.0

## defaultEscape

Creates an identifier escaping function that wraps names in the given
delimiter, doubles delimiter characters, and escapes dots between identifier
parts.

**Signature**

```ts
declare const defaultEscape: (c: string) => (str: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L1081)

Since v4.0.0

## fragment

Constructs a SQL `Fragment` from low-level statement segments.

**Signature**

```ts
declare const fragment: (segments: ReadonlyArray<Segment>) => Fragment
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L47)

Since v4.0.0

## identifier

Constructs a SQL identifier segment that will be escaped by the active
compiler.

**Signature**

```ts
declare const identifier: (value: string) => Identifier
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L187)

Since v4.0.0

## join

Creates a helper that joins SQL clauses with a literal separator, optionally
wrapping multiple clauses in parentheses and using a fallback for an empty
list.

**Signature**

```ts
declare const join: (
  lit: string,
  addParens?: boolean,
  fallback?: string
) => (clauses: ReadonlyArray<string | Fragment>) => Fragment
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L654)

Since v4.0.0

## literal

Constructs a raw SQL literal segment. The literal text is not escaped, so use
bound parameters for untrusted values.

**Signature**

```ts
declare const literal: (value: string, params?: ReadonlyArray<unknown> | undefined) => Literal
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L163)

Since v4.0.0

## make

Creates a cached SQL statement constructor from a connection acquirer,
compiler, tracing attributes, and optional row transformation function.

**Signature**

```ts
declare const make: (
  acquirer: Acquirer,
  compiler: Compiler,
  spanAttributes: ReadonlyArray<readonly [string, unknown]>,
  transformRows: (<A extends object>(row: ReadonlyArray<A>) => ReadonlyArray<A>) | undefined
) => Constructor
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L531)

Since v4.0.0

## or

Combines clauses with `OR`, parenthesizing multiple clauses and returning
`1=1` when the list is empty.

**Signature**

```ts
declare const or: (clauses: ReadonlyArray<string | Fragment>) => Fragment
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L702)

Since v4.0.0

## parameter

Constructs a bound parameter segment for a statement value.

**Signature**

```ts
declare const parameter: (value: unknown) => Parameter
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L210)

Since v4.0.0

## recordInsertHelper

Constructs a `RecordInsertHelper` from one or more row objects.

**Signature**

```ts
declare const recordInsertHelper: (value: ReadonlyArray<Record<string, unknown>>) => RecordInsertHelper
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L270)

Since v4.0.0

## recordUpdateHelper

Constructs a `RecordUpdateHelper` for multi-row update compilation using the
provided alias.

**Signature**

```ts
declare const recordUpdateHelper: (value: ReadonlyArray<Record<string, unknown>>, alias: string) => RecordUpdateHelper
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L306)

Since v4.0.0

## recordUpdateHelperSingle

Constructs a `RecordUpdateHelperSingle` from a record and a list of columns
to omit from the update.

**Signature**

```ts
declare const recordUpdateHelperSingle: (
  value: Record<string, unknown>,
  omit: ReadonlyArray<string>
) => RecordUpdateHelperSingle
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L344)

Since v4.0.0

## statement

Builds a `Statement` from template strings and arguments, preserving
fragments and helper segments while converting ordinary interpolated values
into bound parameters.

**Signature**

```ts
declare const statement: <A = Row>(
  acquirer: Acquirer,
  compiler: Compiler,
  strings: TemplateStringsArray,
  args: Array<any>,
  spanAttributes: ReadonlyArray<readonly [string, unknown]>,
  transformRows: (<A extends object>(row: ReadonlyArray<A>) => ReadonlyArray<A>) | undefined
) => Statement<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L617)

Since v4.0.0

# guards

## isCustom

Creates a type guard for custom SQL segments with the specified custom kind.

**Signature**

```ts
declare const isCustom: <A extends Custom<any, any, any, any>>(kind: A["kind"]) => (u: unknown) => u is A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L122)

Since v4.0.0

## isFragment

Returns `true` when a value is a SQL `Fragment`.

**Signature**

```ts
declare const isFragment: (u: unknown) => u is Fragment
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L114)

Since v4.0.0

# models

## ArrayHelper (interface)

Helper segment for compiling an array of values, commonly used to produce
placeholder lists for `IN` clauses.

**Signature**

```ts
export interface ArrayHelper {
  readonly _tag: "ArrayHelper"
  readonly value: ReadonlyArray<unknown | Fragment>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L222)

Since v4.0.0

## Constructor (interface)

SQL tagged-template constructor and helper API for building parameterized
statements, escaped identifiers, fragments, record helpers, and
dialect-specific branches. Raw helpers such as `unsafe` and `literal` insert
SQL text directly.

**Signature**

```ts
export interface Constructor {
  <A extends object = Row>(strings: TemplateStringsArray, ...args: Array<any>): Statement<A>

  (value: string): Identifier

  /**
   * Create unsafe SQL query
   */
  readonly unsafe: <A extends object>(sql: string, params?: ReadonlyArray<unknown> | undefined) => Statement<A>

  readonly literal: (sql: string) => Fragment

  readonly in: {
    (value: ReadonlyArray<unknown>): ArrayHelper
    (column: string, value: ReadonlyArray<unknown>): Fragment
  }

  readonly insert: {
    (value: ReadonlyArray<Record<string, unknown>>): RecordInsertHelper
    (value: Record<string, unknown>): RecordInsertHelper
  }

  /** Update a single row */
  readonly update: <A extends Record<string, unknown>>(
    value: A,
    omit?: ReadonlyArray<keyof A>
  ) => RecordUpdateHelperSingle

  /**
   * Update multiple rows.
   *
   * **Gotchas**
   *
   * Not supported in sqlite.
   */
  readonly updateValues: (value: ReadonlyArray<Record<string, unknown>>, alias: string) => RecordUpdateHelper

  /**
   * Create an `AND` chain for a where clause
   */
  readonly and: (clauses: ReadonlyArray<string | Fragment>) => Fragment

  /**
   * Create an `OR` chain for a where clause
   */
  readonly or: (clauses: ReadonlyArray<string | Fragment>) => Fragment

  /**
   * Create comma seperated values, with an optional prefix.
   *
   * **When to use**
   *
   * Use when `ORDER BY` and `GROUP BY` clauses.
   */
  readonly csv: {
    (values: ReadonlyArray<string | Fragment>): Fragment
    (prefix: string, values: ReadonlyArray<string | Fragment>): Fragment
  }

  readonly join: (
    literal: string,
    addParens?: boolean,
    fallback?: string
  ) => (clauses: ReadonlyArray<string | Fragment>) => Fragment

  readonly onDialect: <A, B, C, D, E>(options: {
    readonly sqlite: () => A
    readonly pg: () => B
    readonly mysql: () => C
    readonly mssql: () => D
    readonly clickhouse: () => E
  }) => A | B | C | D | E

  readonly onDialectOrElse: <A, B = never, C = never, D = never, E = never, F = never>(options: {
    readonly orElse: () => A
    readonly sqlite?: () => B
    readonly pg?: () => C
    readonly mysql?: () => D
    readonly mssql?: () => E
    readonly clickhouse?: () => F
  }) => A | B | C | D | E | F
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L430)

Since v4.0.0

## Custom (interface)

Custom SQL segment identified by `kind` and interpreted by the compiler's
`onCustom` callback.

**Signature**

```ts
export interface Custom<T extends string = string, A = void, B = void, C = void> {
  readonly _tag: "Custom"
  readonly kind: T
  readonly paramA: A
  readonly paramB: B
  readonly paramC: C
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L361)

Since v4.0.0

## Dialect (type alias)

Supported SQL dialect identifiers used by statement compilers.

**Signature**

```ts
type Dialect = "sqlite" | "pg" | "mysql" | "mssql" | "clickhouse"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L60)

Since v4.0.0

## Fragment (interface)

Composable SQL fragment represented as low-level segments that can be
interpolated into statements.

**Signature**

```ts
export interface Fragment {
  readonly [FragmentTypeId]: typeof FragmentTypeId
  readonly segments: ReadonlyArray<Segment>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L36)

Since v4.0.0

## Helper (type alias)

Union of helper segment types accepted by the SQL statement constructor.

**Signature**

```ts
type Helper = ArrayHelper | RecordInsertHelper | RecordUpdateHelper | RecordUpdateHelperSingle | Identifier | Custom
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L413)

Since v4.0.0

## Identifier (interface)

SQL identifier segment whose value is escaped by the active dialect compiler.

**Signature**

```ts
export interface Identifier {
  readonly _tag: "Identifier"
  readonly value: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L175)

Since v4.0.0

## Literal (interface)

Raw SQL literal segment. The literal text is inserted directly into the
compiled SQL, while optional `params` are appended as bind parameters.

**Signature**

```ts
export interface Literal {
  readonly _tag: "Literal"
  readonly value: string
  readonly params?: ReadonlyArray<unknown> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L150)

Since v4.0.0

## Parameter (interface)

Bound parameter segment whose value is emitted as a dialect-specific
placeholder and bind value.

**Signature**

```ts
export interface Parameter {
  readonly _tag: "Parameter"
  readonly value: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L199)

Since v4.0.0

## PrimitiveKind (type alias)

Names the primitive value categories recognized by SQL statement helpers and
`primitiveKind`.

**Signature**

```ts
type PrimitiveKind = "string" | "number" | "bigint" | "boolean" | "Date" | "null" | "Int8Array" | "Uint8Array"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L397)

Since v4.0.0

## RecordInsertHelper (interface)

Helper segment for compiling one or more record objects into an INSERT
column/value clause, with optional returning output.

**Signature**

```ts
export interface RecordInsertHelper {
  readonly _tag: "RecordInsertHelper"
  readonly value: ReadonlyArray<Record<string, unknown>>
  /** @internal */
  readonly returningIdentifier: string | Fragment | undefined
  readonly returning: (sql: string | Identifier | Fragment) => RecordInsertHelper
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L245)

Since v4.0.0

## RecordUpdateHelper (interface)

Helper segment for compiling multi-row update values with a table alias and
optional returning output.

**Signature**

```ts
export interface RecordUpdateHelper {
  readonly _tag: "RecordUpdateHelper"
  readonly value: ReadonlyArray<Record<string, unknown>>
  readonly alias: string
  /** @internal */
  readonly returningIdentifier: string | Fragment | undefined
  readonly returning: (sql: string | Identifier | Fragment) => RecordUpdateHelper
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L285)

Since v4.0.0

## RecordUpdateHelperSingle (interface)

Helper segment for compiling a single record into update assignments,
omitting selected columns and optionally returning output.

**Signature**

```ts
export interface RecordUpdateHelperSingle {
  readonly _tag: "RecordUpdateHelperSingle"
  readonly value: Record<string, unknown>
  readonly omit: ReadonlyArray<string>
  /** @internal */
  readonly returningIdentifier: string | Fragment | undefined
  readonly returning: (sql: string | Identifier | Fragment) => RecordUpdateHelperSingle
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L323)

Since v4.0.0

## Segment (type alias)

Union of low-level segment types that make up a SQL `Fragment`.

**Signature**

```ts
type Segment =
  | Literal
  | Identifier
  | Parameter
  | ArrayHelper
  | RecordInsertHelper
  | RecordUpdateHelper
  | RecordUpdateHelperSingle
  | Custom<any, any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L133)

Since v4.0.0

## Statement (interface)

Executable SQL statement that is also a `Fragment` and `Effect`, with helpers
for raw execution, streaming, value rows, unprepared execution, no-transform
execution, and compilation.

**Signature**

```ts
export interface Statement<A> extends Fragment, Effect.Effect<ReadonlyArray<A>, SqlError> {
  readonly raw: Effect.Effect<unknown, SqlError>
  readonly withoutTransform: Effect.Effect<ReadonlyArray<A>, SqlError>
  readonly stream: Stream.Stream<A, SqlError>
  readonly values: Effect.Effect<ReadonlyArray<ReadonlyArray<unknown>>, SqlError>
  readonly valuesUnprepared: Effect.Effect<ReadonlyArray<ReadonlyArray<unknown>>, SqlError>
  readonly unprepared: Effect.Effect<ReadonlyArray<A>, SqlError>
  readonly compile: (withoutTransform?: boolean | undefined) => readonly [sql: string, params: ReadonlyArray<unknown>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L70)

Since v4.0.0

## Transformer (type alias)

Hook that can rewrite or wrap a `Statement` before execution, using the
current SQL constructor, fiber, and tracing span.

**Signature**

```ts
type Transformer = (
  self: Statement<unknown>,
  sql: Constructor,
  fiber: Fiber.Fiber<unknown, unknown>,
  span: Tracer.Span
) => Effect.Effect<Statement<unknown>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L90)

Since v4.0.0

# predicates

## primitiveKind

Classifies a JavaScript value as a SQL primitive kind, treating `undefined`
as `null` and defaulting unrecognized objects to `string`.

**Signature**

```ts
declare const primitiveKind: (value: unknown) => PrimitiveKind
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L1097)

Since v4.0.0

# transformer

## CurrentTransformer

Context reference for an optional current SQL statement transformer applied
before statement execution.

**Signature**

```ts
declare const CurrentTransformer: Context.Reference<Transformer | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L104)

Since v4.0.0

# transforming

## defaultTransforms

Builds value, object, and row-array transformers that rename object keys with
the supplied function and optionally recurse into nested object arrays.

**Signature**

```ts
declare const defaultTransforms: (
  transformer: (str: string) => string,
  nested?: boolean
) => {
  readonly value: (value: any) => any
  readonly object: (obj: Record<string, any>) => any
  readonly array: <A extends object>(rows: ReadonlyArray<A>) => ReadonlyArray<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Statement.ts#L1131)

Since v4.0.0
