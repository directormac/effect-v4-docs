---
title: Flag.ts
nav_order: 165
parent: "effect"
---

## Flag.ts overview

Defines named options for command-line applications.

A `Flag<A>` describes how to read one named value from parsed command-line
input, validate it, and produce an `A`. Flags are useful for inputs such as
ports, verbosity switches, configuration files, output directories, choices,
secrets, and repeated values. The helpers here build flags with aliases,
defaults, optional values, prompts, configuration fallbacks, validation, and
value transformations.

Since v4.0.0

---

## Exports Grouped by Category

- [aliasing](#aliasing)
  - [withAlias](#withalias)
- [alternatives](#alternatives)
  - [orElse](#orelse)
  - [orElseResult](#orelseresult)
- [combinators](#combinators)
  - [withFallbackConfig](#withfallbackconfig)
  - [withFallbackPrompt](#withfallbackprompt)
- [constructors](#constructors)
  - [boolean](#boolean)
  - [choice](#choice)
  - [choiceWithValue](#choicewithvalue)
  - [date](#date)
  - [directory](#directory)
  - [file](#file)
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
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
- [help documentation](#help-documentation)
  - [withDescription](#withdescription)
- [mapping](#mapping)
  - [map](#map)
  - [mapEffect](#mapeffect)
  - [mapTryCatch](#maptrycatch)
- [metadata](#metadata)
  - [withHidden](#withhidden)
  - [withMetavar](#withmetavar)
- [models](#models)
  - [Flag (interface)](#flag-interface)
- [optionality](#optionality)
  - [optional](#optional)
  - [withDefault](#withdefault)
- [repetition](#repetition)
  - [atLeast](#atleast)
  - [atMost](#atmost)
  - [between](#between)
- [schemas](#schemas)
  - [withSchema](#withschema)

---

# aliasing

## withAlias

Adds an alias to a flag, allowing it to be referenced by multiple names.

**Example** (Adding flag aliases)

```ts
import { Flag } from "effect/unstable/cli"

// Flag can be used as both --verbose and -v
const verboseFlag = Flag.boolean("verbose").pipe(Flag.withAlias("v"))

// Multiple aliases can be chained
const helpFlag = Flag.boolean("help").pipe(Flag.withAlias("h"), Flag.withAlias("?"))
```

**Signature**

```ts
declare const withAlias: { <A>(alias: string): (self: Flag<A>) => Flag<A>; <A>(self: Flag<A>, alias: string): Flag<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L438)

Since v4.0.0

# alternatives

## orElse

Provides an alternative flag if the first one fails to parse.

**Example** (Falling back to another flag)

```ts
import { Flag } from "effect/unstable/cli"

// Try parsing as integer, fallback to string
const valueFlag = Flag.orElse(Flag.integer("value"), () => Flag.string("value"))

// Multiple input sources with fallback
const configFlag = Flag.orElse(Flag.file("config"), () => Flag.string("config-url"))
```

**Signature**

```ts
declare const orElse: {
  <B>(that: LazyArg<Flag<B>>): <A>(self: Flag<A>) => Flag<A | B>
  <A, B>(self: Flag<A>, that: LazyArg<Flag<B>>): Flag<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L906)

Since v4.0.0

## orElseResult

Tries to parse with the first flag, then the second, returning a Result that indicates which succeeded.

**Example** (Returning fallback results)

```ts
import { Effect, Result } from "effect"
import { Flag } from "effect/unstable/cli"

// Try file path, fallback to URL
const sourceFlag = Flag.orElseResult(Flag.file("source"), () => Flag.string("source-url"))

const program = Effect.gen(function* () {
  const [leftover, source] = yield* sourceFlag.parse({
    arguments: [],
    flags: { "source-url": ["https://google.com"] }
  })
  if (Result.isSuccess(source)) {
    console.log("Using file:", source.success)
  } else {
    console.log("Using URL:", source.failure)
  }
})
```

**Signature**

```ts
declare const orElseResult: {
  <B>(that: LazyArg<Flag<B>>): <A>(self: Flag<A>) => Flag<Result.Result<A, B>>
  <A, B>(self: Flag<A>, that: LazyArg<Flag<B>>): Flag<Result.Result<A, B>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L942)

Since v4.0.0

# combinators

## withFallbackConfig

Adds a fallback config that is loaded when a required flag is missing.

**Example** (Falling back to config)

```ts
import { Config } from "effect"
import { Flag } from "effect/unstable/cli"

const verbose = Flag.boolean("verbose").pipe(Flag.withFallbackConfig(Config.boolean("VERBOSE")))
```

**Signature**

```ts
declare const withFallbackConfig: {
  <B>(config: Config.Config<B>): <A>(self: Flag<A>) => Flag<A | B>
  <A, B>(self: Flag<A>, config: Config.Config<B>): Flag<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L604)

Since v4.0.0

## withFallbackPrompt

Adds a fallback prompt that is shown when a required flag is missing.

**Example** (Falling back to prompts)

```ts
import { Flag, Prompt } from "effect/unstable/cli"

const name = Flag.string("name").pipe(Flag.withFallbackPrompt(Prompt.text({ message: "Name" })))
```

**Signature**

```ts
declare const withFallbackPrompt: {
  <B>(prompt: Param.FallbackPrompt<B>): <A>(self: Flag<A>) => Flag<A | B>
  <A, B>(self: Flag<A>, prompt: Param.FallbackPrompt<B>): Flag<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L625)

Since v4.0.0

# constructors

## boolean

Creates a boolean flag that can be enabled or disabled.

**Example** (Creating boolean flags)

```ts
import { Flag } from "effect/unstable/cli"

const verboseFlag = Flag.boolean("verbose")
// Usage: --verbose (true) or --no-verbose (false)
```

**Signature**

```ts
declare const boolean: (name: string) => Flag<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L73)

Since v4.0.0

## choice

Creates a flag that accepts one of the provided string choices and returns
the selected string.

**When to use**

Use when you need to define a named CLI flag with fixed string choices and no
custom value mapping.

**Gotchas**

An empty choices array compiles, but no input value can parse successfully.

**See**

- `choiceWithValue` for mapping accepted strings to different typed values

**Signature**

```ts
declare const choice: <const Choices extends ReadonlyArray<string>>(
  name: string,
  choices: Choices
) => Flag<Choices[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L172)

Since v4.0.0

## choiceWithValue

Constructs option parameters that represent a choice between several inputs.
Each tuple maps a string flag value to an associated typed value.

**Example** (Creating flag choices with values)

```ts
import { Flag } from "effect/unstable/cli"

// simple enum like choice mapping directly to string union
const color = Flag.choice("color", ["red", "green", "blue"])

// choice with custom value mapping
const logLevel = Flag.choiceWithValue("log-level", [
  ["debug", "Debug" as const],
  ["info", "Info" as const],
  ["error", "Error" as const]
])
```

**Signature**

```ts
declare const choiceWithValue: <const Choice extends ReadonlyArray<readonly [string, any]>>(
  name: string,
  choices: Choice
) => Flag<Choice[number][1]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L149)

Since v4.0.0

## date

Creates a date flag that accepts date input in ISO format.

**Example** (Creating date flags)

```ts
import { Flag } from "effect/unstable/cli"

const startDateFlag = Flag.date("start-date")
// Usage: --start-date 2023-12-25
```

**Signature**

```ts
declare const date: (name: string) => Flag<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L124)

Since v4.0.0

## directory

Creates a directory path flag that accepts directory paths with optional existence validation.

**Example** (Creating directory flags)

```ts
import { Flag } from "effect/unstable/cli"

// Basic directory flag
const outputFlag = Flag.directory("output")
// Usage: --output ./build

// Directory that must exist
const sourceFlag = Flag.directory("source", { mustExist: true })
// Usage: --source ./src (directory must exist)
```

**Signature**

```ts
declare const directory: (name: string, options?: { readonly mustExist?: boolean | undefined }) => Flag<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L254)

Since v4.0.0

## file

Creates a file path flag that accepts file paths with optional existence validation.

**Example** (Creating file flags)

```ts
import { Flag } from "effect/unstable/cli"

// Basic file flag
const inputFlag = Flag.file("input")
// Usage: --input ./data.json

// File that must exist
const configFlag = Flag.file("config", { mustExist: true })
// Usage: --config ./config.yaml (file must exist)
```

**Signature**

```ts
declare const file: (name: string, options?: { readonly mustExist?: boolean | undefined }) => Flag<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L230)

Since v4.0.0

## fileParse

Creates a flag that reads and parses the content of the specified file.

**Details**

The parser that is utilized will depend on the specified `format`, or the
extension of the file passed on the command-line if no `format` is specified.

**Example** (Parsing file contents)

```ts
import { Flag } from "effect/unstable/cli"

// Will use the extension of the file passed on the command line to determine
// the parser to use
const config = Flag.fileParse("config")

// Will use the JSON parser
const jsonConfig = Flag.fileParse("json-config", { format: "json" })
```

**Signature**

```ts
declare const fileParse: (name: string, options?: Primitive.FileParseOptions | undefined) => Flag<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L331)

Since v4.0.0

## fileSchema

Creates a flag that reads and validates file content using the specified
schema.

**Example** (Validating file contents)

```ts
import { Schema } from "effect"
import { Flag } from "effect/unstable/cli"

const ConfigSchema = Schema.Struct({
  port: Schema.Number,
  host: Schema.String
})

const config = Flag.fileSchema("config", ConfigSchema, { format: "json" })
```

**Signature**

```ts
declare const fileSchema: <A>(
  name: string,
  schema: Schema.ConstraintDecoder<A, Environment>,
  options?: Primitive.FileSchemaOptions | undefined
) => Flag<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L357)

Since v4.0.0

## fileText

Creates a flag that reads and returns file content as a string.

**Example** (Reading file text)

```ts
import { Flag } from "effect/unstable/cli"

const config = Flag.fileText("config-file")
// --config-file ./app.json will read the file content
```

**Signature**

```ts
declare const fileText: (name: string) => Flag<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L305)

Since v4.0.0

## float

Creates a float flag that accepts decimal number input.

**Example** (Creating float flags)

```ts
import { Flag } from "effect/unstable/cli"

const rateFlag = Flag.float("rate")
// Usage: --rate 3.14
```

**Signature**

```ts
declare const float: (name: string) => Flag<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L107)

Since v4.0.0

## integer

Creates an integer flag that accepts whole number input.

**Example** (Creating integer flags)

```ts
import { Flag } from "effect/unstable/cli"

const portFlag = Flag.integer("port")
// Usage: --port 8080
```

**Signature**

```ts
declare const integer: (name: string) => Flag<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L90)

Since v4.0.0

## keyValuePair

Creates a flag that parses key=value pairs.

**When to use**

Use when you need a CLI flag that accepts one or more `key=value`
configuration entries.

**Details**

Requires at least one key=value pair. Multiple pairs are merged into a single
record.

**Example** (Parsing key-value pairs)

```ts
import { Flag } from "effect/unstable/cli"

const env = Flag.keyValuePair("env")
// --env FOO=bar --env BAZ=qux will parse to { FOO: "bar", BAZ: "qux" }
```

**Signature**

```ts
declare const keyValuePair: (name: string) => Flag<Record<string, string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L388)

Since v4.0.0

## none

Creates an empty sentinel flag that always fails to parse.
This is useful for creating placeholder flags or for combinators.

**Example** (Creating sentinel flags)

```ts
import { Flag } from "effect/unstable/cli"

const makeValueFlag = (includeValue: boolean) => (includeValue ? Flag.string("value") : Flag.none)

console.log(makeValueFlag(true) === Flag.none) // false
console.log(makeValueFlag(false) === Flag.none) // true
```

**Signature**

```ts
declare const none: Flag<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L409)

Since v4.0.0

## path

Creates a path flag that accepts file system path input with validation options.

**Example** (Creating path flags)

```ts
import { Flag } from "effect/unstable/cli"

// Basic path flag
const pathFlag = Flag.path("config-path")

// File-only path that must exist
const fileFlag = Flag.path("input-file", {
  pathType: "file",
  mustExist: true
})

// Directory path with custom type name
const dirFlag = Flag.path("output-dir", {
  pathType: "directory",
  typeName: "OUTPUT_DIRECTORY"
})
```

**Signature**

```ts
declare const path: (
  name: string,
  options?: {
    readonly pathType?: "file" | "directory" | "either" | undefined
    readonly mustExist?: boolean | undefined
    readonly typeName?: string | undefined
  }
) => Flag<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L204)

Since v4.0.0

## redacted

Creates a string flag whose parsed value is wrapped in `Redacted.Redacted` so
stringification and logging redact the value.

**Gotchas**

Values supplied on the command line may still be visible to the operating
system or shell history.

**Example** (Creating redacted flags)

```ts
import { Effect, Redacted } from "effect"
import { Flag } from "effect/unstable/cli"

const passwordFlag = Flag.redacted("password")

const program = Effect.gen(function* () {
  const [leftover, password] = yield* passwordFlag.parse({
    arguments: [],
    flags: { password: ["abc123"] }
  })
  const value = Redacted.value(password) // Access the underlying value
  console.log("Password length:", value.length)
})
```

**Signature**

```ts
declare const redacted: (name: string) => Flag<Redacted.Redacted<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L288)

Since v4.0.0

## string

Creates a string flag that accepts text input.

**Example** (Creating string flags)

```ts
import { Flag } from "effect/unstable/cli"

const nameFlag = Flag.string("name")
// Usage: --name "John Doe"
```

**Signature**

```ts
declare const string: (name: string) => Flag<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L56)

Since v4.0.0

# filtering

## filter

Filters a flag value based on a predicate, failing with a custom error if the predicate returns false.

**Example** (Filtering parsed values)

```ts
import { Flag } from "effect/unstable/cli"

// Ensure port is in valid range
const portFlag = Flag.integer("port").pipe(
  Flag.filter(
    (port) => port >= 1 && port <= 65535,
    (port) => `Port ${port} is out of range (1-65535)`
  )
)

// Ensure non-empty string
const nameFlag = Flag.string("name").pipe(
  Flag.filter(
    (name) => name.trim().length > 0,
    () => "Name cannot be empty"
  )
)
```

**Signature**

```ts
declare const filter: {
  <A>(predicate: (a: A) => boolean, onFalse: (a: A) => string): (self: Flag<A>) => Flag<A>
  <A>(self: Flag<A>, predicate: (a: A) => boolean, onFalse: (a: A) => string): Flag<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L873)

Since v4.0.0

## filterMap

Transforms and filters a flag value, failing with a custom error if the transformation returns None.

**Example** (Filtering and transforming values)

```ts
import { Option } from "effect"
import { Flag } from "effect/unstable/cli"

// Parse positive integers only
const positiveInt = Flag.integer("count").pipe(
  Flag.filterMap(
    (n) => (n > 0 ? Option.some(n) : Option.none()),
    (n) => `Expected positive integer, got ${n}`
  )
)

// Parse valid email addresses
const emailFlag = Flag.string("email").pipe(
  Flag.filterMap(
    (email) => (email.includes("@") ? Option.some(email) : Option.none()),
    (email) => `Invalid email address: ${email}`
  )
)
```

**Signature**

```ts
declare const filterMap: {
  <A, B>(f: (a: A) => Option.Option<B>, onNone: (a: A) => string): (self: Flag<A>) => Flag<B>
  <A, B>(self: Flag<A>, f: (a: A) => Option.Option<B>, onNone: (a: A) => string): Flag<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L836)

Since v4.0.0

# help documentation

## withDescription

Adds a description to a flag for help documentation.

**Example** (Adding help descriptions)

```ts
import { Flag } from "effect/unstable/cli"

const portFlag = Flag.integer("port").pipe(Flag.withDescription("The port number to listen on"))

const configFlag = Flag.file("config").pipe(Flag.withDescription("Path to the configuration file"))
```

**Signature**

```ts
declare const withDescription: {
  <A>(description: string): (self: Flag<A>) => Flag<A>
  <A>(self: Flag<A>, description: string): Flag<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L463)

Since v4.0.0

# mapping

## map

Transforms the parsed value of a flag using a mapping function.

**Example** (Mapping parsed values)

```ts
import { Flag } from "effect/unstable/cli"

// Convert string to uppercase
const nameFlag = Flag.string("name").pipe(Flag.map((name) => name.toUpperCase()))

// Convert port to URL
const urlFlag = Flag.integer("port").pipe(Flag.map((port) => `http://localhost:${port}`))
```

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): (self: Flag<A>) => Flag<B>
  <A, B>(self: Flag<A>, f: (a: A) => B): Flag<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L652)

Since v4.0.0

## mapEffect

Transforms the parsed value using an Effect that can perform IO operations.

**Example** (Mapping parsed values effectfully)

```ts
import { Effect, FileSystem } from "effect"
import { Flag } from "effect/unstable/cli"

// Read file size from path flag
const fileSizeFlag = Flag.file("input").pipe(
  Flag.mapEffect(
    Effect.fnUntraced(function* (path) {
      const fs = yield* FileSystem.FileSystem
      const stats = yield* Effect.orDie(fs.stat(path))
      return stats.size
    })
  )
)
```

**Signature**

```ts
declare const mapEffect: {
  <A, B>(f: (a: A) => Effect.Effect<B, CliError.CliError, Environment>): (self: Flag<A>) => Flag<B>
  <A, B>(self: Flag<A>, f: (a: A) => Effect.Effect<B, CliError.CliError, Environment>): Flag<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L679)

Since v4.0.0

## mapTryCatch

Transforms the parsed value using a function that might throw, with error handling.

**Example** (Mapping thrown errors)

```ts
import { Flag } from "effect/unstable/cli"

// Parse JSON string with error handling
const jsonFlag = Flag.string("config").pipe(
  Flag.mapTryCatch(
    (json) => JSON.parse(json),
    (error) => `Invalid JSON: ${error}`
  )
)

// Parse URL with error handling
const urlFlag = Flag.string("url").pipe(
  Flag.mapTryCatch(
    (url) => new URL(url),
    (error) => `Invalid URL: ${error}`
  )
)
```

**Signature**

```ts
declare const mapTryCatch: {
  <A, B>(f: (a: A) => B, onError: (error: unknown) => string): (self: Flag<A>) => Flag<B>
  <A, B>(self: Flag<A>, f: (a: A) => B, onError: (error: unknown) => string): Flag<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L720)

Since v4.0.0

# metadata

## withHidden

Hides a flag from generated help output and shell completions while keeping
it fully parseable on the command line.

**When to use**

Use when experimental or internal flags should be accepted but not advertised, such as
`--experimental-foo`, debug toggles, or escape hatches that are not yet committed to the
public CLI surface.

**Example** (Hiding a flag from help)

```ts
import { Flag } from "effect/unstable/cli"

// Flag still parses --experimental-foo, but it does not appear in --help.
const experimental = Flag.boolean("experimental-foo").pipe(Flag.withHidden)
```

**Signature**

```ts
declare const withHidden: <A>(self: Flag<A>) => Flag<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L529)

Since v4.0.0

## withMetavar

Sets a custom metavar (placeholder name) for the flag in help documentation.

**Details**

The metavar is displayed in usage text to indicate what value the user should
provide. For example, `--output FILE` shows `FILE` as the metavar.

**Example** (Setting metavars)

```ts
import { Flag } from "effect/unstable/cli"

const databaseFlag = Flag.string("database-url").pipe(
  Flag.withMetavar("URL"),
  Flag.withDescription("Database connection URL")
)
// In help: --database-url URL

const timeoutFlag = Flag.integer("timeout").pipe(Flag.withMetavar("SECONDS"))
// In help: --timeout SECONDS
```

**Signature**

```ts
declare const withMetavar: {
  <A>(metavar: string): (self: Flag<A>) => Flag<A>
  <A>(self: Flag<A>, metavar: string): Flag<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L500)

Since v4.0.0

# models

## Flag (interface)

Represents a command-line flag.

**Signature**

```ts
export interface Flag<A> extends Param.Param<typeof Param.flagKind, A> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L35)

Since v4.0.0

# optionality

## optional

Makes a flag optional, returning an Option type that can be None if not provided.

**Example** (Making flags optional)

```ts
import { Effect, Option } from "effect"
import { Flag } from "effect/unstable/cli"

const optionalPort = Flag.optional(Flag.integer("port"))

const program = Effect.gen(function* () {
  const [leftover, port] = yield* optionalPort.parse({
    arguments: [],
    flags: { port: ["4000"] }
  })
  if (Option.isSome(port)) {
    console.log("Port specified:", port.value)
  } else {
    console.log("No port specified, using default")
  }
})
```

**Signature**

```ts
declare const optional: <A>(param: Flag<A>) => Flag<Option.Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L558)

Since v4.0.0

## withDefault

Provides a default value for a flag when it's not specified.

**Example** (Providing default values)

```ts
import { Flag } from "effect/unstable/cli"

const portFlag = Flag.integer("port").pipe(Flag.withDefault(8080))
// If --port is not provided, defaults to 8080

const hostFlag = Flag.string("host").pipe(Flag.withDefault("localhost"))
// If --host is not provided, defaults to "localhost"
```

**Signature**

```ts
declare const withDefault: {
  <const B>(defaultValue: B | Effect.Effect<B, CliError.CliError, Environment>): <A>(self: Flag<A>) => Flag<A | B>
  <A, const B>(self: Flag<A>, defaultValue: B | Effect.Effect<B, CliError.CliError, Environment>): Flag<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L582)

Since v4.0.0

# repetition

## atLeast

Ensures a flag is specified at least a minimum number of times.

**Example** (Requiring repeated values)

```ts
import { Flag } from "effect/unstable/cli"

const sourceFlag = Flag.atLeast(Flag.file("source"), 2)
// Requires at least 2 source files
// Usage: --source file1.ts --source file2.ts

const tagFlag = Flag.string("tag").pipe(Flag.atLeast(1))
// Requires at least 1 tag
```

**Signature**

```ts
declare const atLeast: {
  <A>(min: number): (self: Flag<A>) => Flag<ReadonlyArray<A>>
  <A>(self: Flag<A>, min: number): Flag<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L750)

Since v4.0.0

## atMost

Ensures a flag is specified at most a maximum number of times.

**Example** (Limiting repeated values)

```ts
import { Flag } from "effect/unstable/cli"

const warningFlag = Flag.atMost(Flag.string("warning"), 3)
// Allows up to 3 warning flags
// Usage: --warning w1 --warning w2 --warning w3

const debugFlag = Flag.string("debug").pipe(Flag.atMost(1))
// Allows at most 1 debug flag
```

**Signature**

```ts
declare const atMost: {
  <A>(max: number): (self: Flag<A>) => Flag<ReadonlyArray<A>>
  <A>(self: Flag<A>, max: number): Flag<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L776)

Since v4.0.0

## between

Ensures a flag is specified between a minimum and maximum number of times.

**Example** (Bounding repeated values)

```ts
import { Flag } from "effect/unstable/cli"

const hostFlag = Flag.between(Flag.string("host"), 1, 3)
// Requires 1-3 host flags
// Usage: --host host1 --host host2

const excludeFlag = Flag.string("exclude").pipe(Flag.between(0, 5))
// Allows 0-5 exclude patterns
```

**Signature**

```ts
declare const between: {
  <A>(min: number, max: number): (self: Flag<A>) => Flag<ReadonlyArray<A>>
  <A>(self: Flag<A>, min: number, max: number): Flag<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L802)

Since v4.0.0

# schemas

## withSchema

Validates and transforms a flag value using a Schema codec.

**Example** (Validating with schemas)

```ts
import { Schema } from "effect"
import { Flag } from "effect/unstable/cli"

const isEmail = Schema.isPattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
  message: "Must be a valid email address"
})

// Parse and validate email with custom schema
const EmailSchema = Schema.String.pipe(Schema.check(isEmail))

const emailFlag = Flag.string("email").pipe(Flag.withSchema(EmailSchema))

// Parse JSON configuration with schema validation
const ConfigSchema = Schema.Struct({
  port: Schema.Number,
  host: Schema.String,
  ssl: Schema.optional(Schema.Boolean)
}).pipe(Schema.fromJsonString)

const configFlag = Flag.string("config").pipe(Flag.withSchema(ConfigSchema))
```

**Signature**

```ts
declare const withSchema: {
  <A, B>(schema: Schema.Codec<B, A, Environment, Environment>): (self: Flag<A>) => Flag<B>
  <A, B>(self: Flag<A>, schema: Schema.Codec<B, A, Environment, Environment>): Flag<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Flag.ts#L984)

Since v4.0.0
