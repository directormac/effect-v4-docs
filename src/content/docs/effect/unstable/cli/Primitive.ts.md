---
title: Primitive.ts
nav_order: 170
parent: "effect"
---

## Primitive.ts overview

Parses raw command-line strings into typed values.

A `Primitive<A>` receives one string and returns an `Effect` that either
produces an `A` or fails with a parser message. `Argument` and `Flag` build
on these primitives to add names, aliases, defaults, prompts, configuration
fallbacks, repetition, and help metadata. Primitive parsers cover common
scalar values, paths, files, structured config files, schema-decoded input,
redacted values, and key-value pairs.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [boolean](#boolean)
  - [choice](#choice)
  - [date](#date)
  - [fileParse](#fileparse)
  - [fileSchema](#fileschema)
  - [fileText](#filetext)
  - [float](#float)
  - [integer](#integer)
  - [keyValuePair](#keyvaluepair)
  - [none](#none)
  - [path](#path)
  - [redacted](#redacted)
  - [string](#string)
- [getters](#getters)
  - [getTypeName](#gettypename)
- [models](#models)
  - [PathType (type alias)](#pathtype-type-alias)
  - [Primitive (interface)](#primitive-interface)
- [options](#options)
  - [FileParseOptions (type alias)](#fileparseoptions-type-alias)
  - [FileSchemaOptions (type alias)](#fileschemaoptions-type-alias)
- [utils](#utils)
  - [Primitive (namespace)](#primitive-namespace)
    - [Variance (interface)](#variance-interface)

---

# constructors

## boolean

Creates a primitive that parses boolean values from string input.

**Details**

Recognizes various forms of true/false values:

- True values: "true", "1", "y", "yes", "on"
- False values: "false", "0", "n", "no", "off"

**Example** (Parsing boolean values)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseBoolean = Effect.gen(function* () {
  const result1 = yield* Primitive.boolean.parse("true")
  console.log(result1) // true

  const result2 = yield* Primitive.boolean.parse("yes")
  console.log(result2) // true

  const result3 = yield* Primitive.boolean.parse("false")
  console.log(result3) // false

  const result4 = yield* Primitive.boolean.parse("0")
  console.log(result4) // false
})
```

**Signature**

```ts
declare const boolean: Primitive<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L150)

Since v4.0.0

## choice

Creates a primitive that accepts only specific choice values mapped to custom types.

**Example** (Parsing choices)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

type LogLevel = "debug" | "info" | "warn" | "error"

const logLevelPrimitive = Primitive.choice<LogLevel>([
  ["debug", "debug"],
  ["info", "info"],
  ["warn", "warn"],
  ["error", "error"]
])

const parseLogLevel = Effect.gen(function* () {
  const result1 = yield* logLevelPrimitive.parse("info")
  console.log(result1) // "info"

  const result2 = yield* logLevelPrimitive.parse("debug")
  console.log(result2) // "debug"
})
```

**Signature**

```ts
declare const choice: <A>(choices: ReadonlyArray<readonly [string, A]>) => Primitive<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L298)

Since v4.0.0

## date

Creates a primitive that parses Date objects from string input.

**Example** (Parsing date values)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseDate = Effect.gen(function* () {
  const result1 = yield* Primitive.date.parse("2023-12-25")
  console.log(result1) // Date object for December 25, 2023

  const result2 = yield* Primitive.date.parse("2023-12-25T10:30:00Z")
  console.log(result2) // Date object with time

  const result3 = yield* Primitive.date.parse("Dec 25, 2023")
  console.log(result3) // Date object parsed from natural format
})
```

**Signature**

```ts
declare const date: Primitive<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L237)

Since v4.0.0

## fileParse

Creates a primitive that reads a file and parses its content as structured
data.

**Details**

The parser is selected from `options.format` when provided, otherwise from
the file extension. Supported formats include INI, JSON, TOML, YAML, and YML.

**Example** (Parsing file content)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const tomlFilePrimitive = Primitive.fileParse({ format: "toml" })

const loadConfig = Effect.gen(function* () {
  const config = yield* tomlFilePrimitive.parse("./config.toml")
  console.log(config) // { name: "my-app", version: "1.0.0", port: 3000 }
  return config
})
```

**Signature**

```ts
declare const fileParse: (options?: FileParseOptions) => Primitive<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L555)

Since v4.0.0

## fileSchema

Reads and parses file content using the specified schema.

**Example** (Parsing file content with a schema)

```ts
import { Effect, Schema } from "effect"
import { Primitive } from "effect/unstable/cli"

const ConfigSchema = Schema.Struct({
  name: Schema.String,
  version: Schema.String,
  port: Schema.Number
})

const jsonConfigPrimitive = Primitive.fileSchema(ConfigSchema, {
  format: "json"
})

const loadConfig = Effect.gen(function* () {
  const config = yield* jsonConfigPrimitive.parse("./config.json")
  console.log(config) // { name: "my-app", version: "1.0.0", port: 3000 }
  return config
})
```

**Signature**

```ts
declare const fileSchema: <A>(
  schema: Schema.ConstraintDecoder<A, Environment>,
  options?: FileSchemaOptions | undefined
) => Primitive<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L615)

Since v4.0.0

## fileText

Creates a primitive that reads and returns the contents of a file as a string.

**Example** (Reading file text)

```ts
import { Effect, Schema } from "effect"
import { Primitive } from "effect/unstable/cli"

const ConfigSchema = Schema.Struct({
  name: Schema.String,
  version: Schema.String,
  port: Schema.Number
})
const decodeConfig = Schema.decodeUnknownEffect(Schema.fromJsonString(ConfigSchema))

const readConfigFile = Effect.gen(function* () {
  const content = yield* Primitive.fileText.parse("./config.json")
  console.log(content) // {"name":"my-app","version":"1.0.0","port":3000}

  const config = yield* decodeConfig(content)
  console.log(config) // { name: "my-app", version: "1.0.0", port: 3000 }
  return config
})
```

**Signature**

```ts
declare const fileText: Primitive<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L468)

Since v4.0.0

## float

Creates a primitive that parses floating-point numbers from string input.

**Example** (Parsing floating-point numbers)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseFloat = Effect.gen(function* () {
  const result1 = yield* Primitive.float.parse("3.14")
  console.log(result1) // 3.14

  const result2 = yield* Primitive.float.parse("-42.5")
  console.log(result2) // -42.5

  const result3 = yield* Primitive.float.parse("0")
  console.log(result3) // 0
})
```

**Signature**

```ts
declare const float: Primitive<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L179)

Since v4.0.0

## integer

Creates a primitive that parses integer numbers from string input.

**Example** (Parsing integer values)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseInteger = Effect.gen(function* () {
  const result1 = yield* Primitive.integer.parse("42")
  console.log(result1) // 42

  const result2 = yield* Primitive.integer.parse("-123")
  console.log(result2) // -123

  const result3 = yield* Primitive.integer.parse("0")
  console.log(result3) // 0
})
```

**Signature**

```ts
declare const integer: Primitive<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L208)

Since v4.0.0

## keyValuePair

Parses a single `key=value` pair into a record object.

**Example** (Parsing key-value pairs)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseKeyValue = Effect.gen(function* () {
  const result1 = yield* Primitive.keyValuePair.parse("name=john")
  console.log(result1) // { name: "john" }

  const result2 = yield* Primitive.keyValuePair.parse("port=3000")
  console.log(result2) // { port: "3000" }

  const result3 = yield* Primitive.keyValuePair.parse("debug=true")
  console.log(result3) // { debug: "true" }
})
```

**Signature**

```ts
declare const keyValuePair: Primitive<Record<string, string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L656)

Since v4.0.0

## none

Creates a sentinel primitive that always fails to parse a value.

**When to use**

Use when you need a CLI primitive for flags that do not accept values.

**Example** (Rejecting option values)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const program = Effect.gen(function* () {
  // This will always fail - useful for boolean flags
  return yield* Primitive.none.parse("any-value")
})

// The above effect will fail with "This option does not accept values"
```

**Signature**

```ts
declare const none: Primitive<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L699)

Since v4.0.0

## path

Creates a primitive that validates and resolves file system paths.

**Example** (Parsing file system paths)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const program = Effect.gen(function* () {
  // Parse a file path that must exist
  const filePrimitive = Primitive.path("file", true)
  const filePath = yield* filePrimitive.parse("./package.json")
  console.log(filePath) // Absolute path to package.json

  // Parse a directory path
  const dirPrimitive = Primitive.path("directory", false)
  const dirPath = yield* dirPrimitive.parse("./src")
  console.log(dirPath) // Absolute path to src directory

  // Parse any path type
  const anyPrimitive = Primitive.path("either", false)
  const anyPath = yield* anyPrimitive.parse("./some/path")
  console.log(anyPath) // Absolute path
})
```

**Signature**

```ts
declare const path: (pathType: PathType, mustExist?: boolean) => Primitive<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L365)

Since v4.0.0

## redacted

Creates a primitive that wraps string input in `Redacted`.

**Details**

The wrapped value is hidden when formatted or inspected, while the original
string remains available through the `Redacted` API when explicitly needed.

**Example** (Parsing redacted values)

```ts
import { Effect, Redacted } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseRedacted = Effect.gen(function* () {
  const result = yield* Primitive.redacted.parse("secret-password")
  console.log(Redacted.value(result)) // "secret-password"
  console.log(String(result)) // "<redacted>"
})
```

**Signature**

```ts
declare const redacted: Primitive<Redacted.Redacted<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L432)

Since v4.0.0

## string

Creates a primitive that accepts any string value without validation.

**Example** (Parsing string values)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

const parseString = Effect.gen(function* () {
  const result1 = yield* Primitive.string.parse("hello world")
  console.log(result1) // "hello world"

  const result2 = yield* Primitive.string.parse("")
  console.log(result2) // ""

  const result3 = yield* Primitive.string.parse("123")
  console.log(result3) // "123"
})
```

**Signature**

```ts
declare const string: Primitive<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L266)

Since v4.0.0

# getters

## getTypeName

Gets a human-readable type name for a primitive.

**When to use**

Use when you need the display type name for a `Primitive`, such as when
generating CLI help documentation.

**Example** (Getting primitive type names)

```ts
import { Primitive } from "effect/unstable/cli"

console.log(Primitive.getTypeName(Primitive.string)) // "string"
console.log(Primitive.getTypeName(Primitive.integer)) // "integer"
console.log(Primitive.getTypeName(Primitive.boolean)) // "boolean"
console.log(Primitive.getTypeName(Primitive.date)) // "date"
console.log(Primitive.getTypeName(Primitive.keyValuePair)) // "key=value"

const logLevelChoice = Primitive.choice([
  ["debug", "debug"],
  ["info", "info"]
])
console.log(Primitive.getTypeName(logLevelChoice)) // "choice"
```

**Signature**

```ts
declare const getTypeName: <A>(primitive: Primitive<A>) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L730)

Since v4.0.0

# models

## PathType (type alias)

Specifies the type of path validation to perform.

**Example** (Choosing path validation)

```ts
import { Primitive } from "effect/unstable/cli"

// Only accept files
const filePath = Primitive.path("file", true)

// Only accept directories
const dirPath = Primitive.path("directory", true)

// Accept either files or directories
const anyPath = Primitive.path("either", false)
```

**Signature**

```ts
type PathType = "file" | "directory" | "either"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L333)

Since v4.0.0

## Primitive (interface)

Represents a primitive type that can parse string input into a typed value.

**Example** (Parsing values with primitives)

```ts
import { Effect } from "effect"
import { Primitive } from "effect/unstable/cli"

// Using built-in primitives
const parseString = Effect.gen(function* () {
  const stringResult = yield* Primitive.string.parse("hello")
  const numberResult = yield* Primitive.integer.parse("42")
  const boolResult = yield* Primitive.boolean.parse("true")

  return { stringResult, numberResult, boolResult }
})

// All primitives provide parsing functionality
const parseDate = Effect.gen(function* () {
  const dateResult = yield* Primitive.date.parse("2023-12-25")
  const pathResult = yield* Primitive.path("file", true).parse("./package.json")
  return { dateResult, pathResult }
})
```

**Signature**

```ts
export interface Primitive<out A> extends Primitive.Variance<A> {
  readonly _tag: string
  readonly parse: (value: string) => Effect.Effect<A, string, Environment>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L60)

Since v4.0.0

# options

## FileParseOptions (type alias)

Represents options which can be provided to methods that deal with parsing
file content.

**Signature**

```ts
type FileParseOptions = {
  readonly format?: "ini" | "json" | "toml" | "yaml"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L516)

Since v4.0.0

## FileSchemaOptions (type alias)

Represents options which can be provided to methods that deal with parsing
file content and decoding the file content with a `Schema`.

**Signature**

```ts
type FileSchemaOptions = Struct.Simplify<
  FileParseOptions & {
    readonly errorFormatter?: Formatter<string> | undefined
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L580)

Since v4.0.0

# utils

## Primitive (namespace)

Namespace containing type-level helpers for `Primitive`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L70)

Since v4.0.0

### Variance (interface)

Type-level variance marker for the value parsed by a `Primitive`.

**Signature**

```ts
export interface Variance<out A> {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Primitive.ts#L77)

Since v4.0.0
