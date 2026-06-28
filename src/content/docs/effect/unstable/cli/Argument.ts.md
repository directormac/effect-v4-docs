---
title: Argument.ts
nav_order: 160
parent: "effect"
---

## Argument.ts overview

Defines typed positional arguments for Effect CLI applications.

Arguments consume ordered values after a command name and its flags, then
parse them into the types a command handler expects. This module includes
constructors for common argument shapes, plus helpers for optional or
variadic arguments, schema validation, transformations, defaults, config
fallbacks, and prompts for missing values.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [atLeast](#atleast)
  - [atMost](#atmost)
  - [between](#between)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [map](#map)
  - [mapEffect](#mapeffect)
  - [mapTryCatch](#maptrycatch)
  - [optional](#optional)
  - [orElse](#orelse)
  - [orElseResult](#orelseresult)
  - [variadic](#variadic)
  - [withDefault](#withdefault)
  - [withDescription](#withdescription)
  - [withFallbackConfig](#withfallbackconfig)
  - [withFallbackPrompt](#withfallbackprompt)
  - [withSchema](#withschema)
- [constructors](#constructors)
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
  - [none](#none)
  - [path](#path)
  - [redacted](#redacted)
  - [string](#string)
- [metadata](#metadata)
  - [withMetavar](#withmetavar)
- [models](#models)
  - [Argument (interface)](#argument-interface)

---

# combinators

## atLeast

Creates a variadic argument that requires at least n values.

**Example** (Requiring a minimum number of values)

```ts
import { Argument } from "effect/unstable/cli"

const files = Argument.string("files").pipe(Argument.atLeast(1))
```

**Signature**

```ts
declare const atLeast: {
  <A>(min: number): (self: Argument<A>) => Argument<ReadonlyArray<A>>
  <A>(self: Argument<A>, min: number): Argument<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L532)

Since v4.0.0

## atMost

Creates a variadic argument that accepts at most n values.

**Example** (Limiting the maximum number of values)

```ts
import { Argument } from "effect/unstable/cli"

const files = Argument.string("files").pipe(Argument.atMost(5))
```

**Signature**

```ts
declare const atMost: {
  <A>(max: number): (self: Argument<A>) => Argument<ReadonlyArray<A>>
  <A>(self: Argument<A>, max: number): Argument<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L551)

Since v4.0.0

## between

Creates a variadic argument that accepts between min and max values.

**Example** (Requiring a range of values)

```ts
import { Argument } from "effect/unstable/cli"

const files = Argument.string("files").pipe(Argument.between(1, 5))
```

**Signature**

```ts
declare const between: {
  <A>(min: number, max: number): (self: Argument<A>) => Argument<ReadonlyArray<A>>
  <A>(self: Argument<A>, min: number, max: number): Argument<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L570)

Since v4.0.0

## filter

Filters parsed values, failing with a custom error message if the predicate returns false.

**Example** (Filtering parsed values)

```ts
import { Argument } from "effect/unstable/cli"

const positiveInt = Argument.integer("count").pipe(
  Argument.filter(
    (n) => n > 0,
    (n) => `Expected positive integer, got ${n}`
  )
)
```

**Signature**

```ts
declare const filter: {
  <A>(predicate: (a: A) => boolean, onFalse: (a: A) => string): (self: Argument<A>) => Argument<A>
  <A>(self: Argument<A>, predicate: (a: A) => boolean, onFalse: (a: A) => string): Argument<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L670)

Since v4.0.0

## filterMap

Filters and transforms parsed values, failing with a custom error message
if the filter function returns None.

**Example** (Filtering and mapping parsed values)

```ts
import { Option } from "effect"
import { Argument } from "effect/unstable/cli"

const positiveInt = Argument.integer("count").pipe(
  Argument.filterMap(
    (n) => (n > 0 ? Option.some(n) : Option.none()),
    (n) => `Expected positive integer, got ${n}`
  )
)
```

**Signature**

```ts
declare const filterMap: {
  <A, B>(f: (a: A) => Option.Option<B>, onNone: (a: A) => string): (self: Argument<A>) => Argument<B>
  <A, B>(self: Argument<A>, f: (a: A) => Option.Option<B>, onNone: (a: A) => string): Argument<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L700)

Since v4.0.0

## map

Transforms the parsed value of a positional argument.

**Example** (Mapping parsed values)

```ts
import { Argument } from "effect/unstable/cli"

const port = Argument.integer("port").pipe(Argument.map((p) => ({ port: p, url: `http://localhost:${p}` })))
```

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): (self: Argument<A>) => Argument<B>
  <A, B>(self: Argument<A>, f: (a: A) => B): Argument<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L443)

Since v4.0.0

## mapEffect

Transforms the parsed value of a positional argument using an effectful function.

**Example** (Validating values effectfully)

```ts
import { Effect } from "effect"
import { Argument, CliError } from "effect/unstable/cli"

const files = Argument.string("files").pipe(
  Argument.mapEffect((file) =>
    file.endsWith(".txt")
      ? Effect.succeed(file)
      : Effect.fail(
          new CliError.UserError({
            cause: new Error("Only .txt files allowed")
          })
        )
  )
)
```

**Signature**

```ts
declare const mapEffect: {
  <A, B>(f: (a: A) => Effect.Effect<B, CliError.CliError, Environment>): (self: Argument<A>) => Argument<B>
  <A, B>(self: Argument<A>, f: (a: A) => Effect.Effect<B, CliError.CliError, Environment>): Argument<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L473)

Since v4.0.0

## mapTryCatch

Transforms the parsed value of a positional argument using a function that may throw.

**Example** (Mapping values that may throw)

```ts
import { Argument } from "effect/unstable/cli"

const json = Argument.string("data").pipe(
  Argument.mapTryCatch(
    (str) => JSON.parse(str),
    (error) => `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`
  )
)
```

**Signature**

```ts
declare const mapTryCatch: {
  <A, B>(f: (a: A) => B, onError: (error: unknown) => string): (self: Argument<A>) => Argument<B>
  <A, B>(self: Argument<A>, f: (a: A) => B, onError: (error: unknown) => string): Argument<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L506)

Since v4.0.0

## optional

Makes a positional argument optional.

**Example** (Making an argument optional)

```ts
import { Argument } from "effect/unstable/cli"

const optionalVersion = Argument.string("version").pipe(Argument.optional)
```

**Signature**

```ts
declare const optional: <A>(arg: Argument<A>) => Argument<Option.Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L304)

Since v4.0.0

## orElse

Provides a fallback argument to use if this argument fails to parse.

**Example** (Providing a fallback argument)

```ts
import { Argument } from "effect/unstable/cli"

const value = Argument.integer("value").pipe(Argument.orElse(() => Argument.string("value")))
```

**Signature**

```ts
declare const orElse: {
  <B>(that: LazyArg<Argument<B>>): <A>(self: Argument<A>) => Argument<A | B>
  <A, B>(self: Argument<A>, that: LazyArg<Argument<B>>): Argument<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L725)

Since v4.0.0

## orElseResult

Provides a fallback argument, wrapping results in Result to distinguish which succeeded.

**Example** (Returning which fallback succeeded)

```ts
import { Argument } from "effect/unstable/cli"

const source = Argument.file("source").pipe(Argument.orElseResult(() => Argument.string("url")))
// Returns Result<string, string>
```

**Signature**

```ts
declare const orElseResult: {
  <B>(that: LazyArg<Argument<B>>): <A>(self: Argument<A>) => Argument<Result.Result<A, B>>
  <A, B>(self: Argument<A>, that: LazyArg<Argument<B>>): Argument<Result.Result<A, B>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L747)

Since v4.0.0

## variadic

Creates a variadic positional argument that accepts multiple values.

**Example** (Accepting multiple values)

```ts
import { Argument } from "effect/unstable/cli"

// Accept any number of files
const anyFiles = Argument.string("files").pipe(Argument.variadic)

// Accept at least 1 file
const atLeastOneFile = Argument.string("files").pipe(Argument.variadic({ min: 1 }))

// Accept between 1 and 5 files
const limitedFiles = Argument.string("files").pipe(Argument.variadic({ min: 1, max: 5 }))
```

**Signature**

```ts
declare const variadic: {
  (options?: Param.VariadicParamOptions | undefined): <A>(self: Argument<A>) => Argument<ReadonlyArray<A>>
  <A>(self: Argument<A>, options?: Param.VariadicParamOptions | undefined): Argument<ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L419)

Since v4.0.0

## withDefault

Provides a default value for a positional argument.

**Example** (Providing a default value)

```ts
import { Argument } from "effect/unstable/cli"

const port = Argument.integer("port").pipe(Argument.withDefault(8080))
```

**Signature**

```ts
declare const withDefault: {
  <const B>(
    defaultValue: B | Effect.Effect<B, CliError.CliError, Environment>
  ): <A>(self: Argument<A>) => Argument<A | B>
  <A, const B>(self: Argument<A>, defaultValue: B | Effect.Effect<B, CliError.CliError, Environment>): Argument<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L341)

Since v4.0.0

## withDescription

Adds a description to a positional argument.

**Example** (Adding an argument description)

```ts
import { Argument } from "effect/unstable/cli"

const filename = Argument.string("filename").pipe(Argument.withDescription("The input file to process"))
```

**Signature**

```ts
declare const withDescription: {
  <A>(description: string): (self: Argument<A>) => Argument<A>
  <A>(self: Argument<A>, description: string): Argument<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L322)

Since v4.0.0

## withFallbackConfig

Adds a fallback config that is loaded when a required argument is missing.

**Example** (Loading a fallback config)

```ts
import { Config } from "effect"
import { Argument } from "effect/unstable/cli"

const repository = Argument.string("repository").pipe(Argument.withFallbackConfig(Config.string("REPOSITORY")))
```

**Signature**

```ts
declare const withFallbackConfig: {
  <B>(config: Config.Config<B>): <A>(self: Argument<A>) => Argument<A | B>
  <A, B>(self: Argument<A>, config: Config.Config<B>): Argument<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L368)

Since v4.0.0

## withFallbackPrompt

Adds a fallback prompt that is shown when a required argument is missing.

**Example** (Showing a fallback prompt)

```ts
import { Argument, Prompt } from "effect/unstable/cli"

const filename = Argument.string("filename").pipe(Argument.withFallbackPrompt(Prompt.text({ message: "Filename" })))
```

**Signature**

```ts
declare const withFallbackPrompt: {
  <B>(prompt: Param.FallbackPrompt<B>): <A>(self: Argument<A>) => Argument<A | B>
  <A, B>(self: Argument<A>, prompt: Param.FallbackPrompt<B>): Argument<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L389)

Since v4.0.0

## withSchema

Validates parsed values against a Schema.

**Example** (Validating parsed values with a schema)

```ts
import { Schema } from "effect"
import { Argument } from "effect/unstable/cli"

const input = Argument.string("input").pipe(Argument.withSchema(Schema.NonEmptyString))
```

**Signature**

```ts
declare const withSchema: {
  <A, B>(schema: Schema.Codec<B, A, Environment, Environment>): (self: Argument<A>) => Argument<B>
  <A, B>(self: Argument<A>, schema: Schema.Codec<B, A, Environment, Environment>): Argument<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L592)

Since v4.0.0

# constructors

## choice

Creates a positional choice argument.

**Example** (Creating a choice argument)

```ts
import { Argument } from "effect/unstable/cli"

const environment = Argument.choice("environment", ["dev", "staging", "prod"])
```

**Signature**

```ts
declare const choice: <const Choices extends ReadonlyArray<string>>(
  name: string,
  choices: Choices
) => Argument<Choices[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L162)

Since v4.0.0

## choiceWithValue

Creates a positional choice argument with custom value mapping.

**Example** (Mapping choices to values)

```ts
import { Argument } from "effect/unstable/cli"

const logLevel = Argument.choiceWithValue("level", [
  ["debug", 0],
  ["info", 1],
  ["warn", 2],
  ["error", 3]
])
```

**Signature**

```ts
declare const choiceWithValue: <const Choices extends ReadonlyArray<readonly [string, any]>>(
  name: string,
  choices: Choices
) => Argument<Choices[number][1]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L616)

Since v4.0.0

## date

Creates a positional date argument.

**Example** (Creating a date argument)

```ts
import { Argument } from "effect/unstable/cli"

const startDate = Argument.date("start-date")
```

**Signature**

```ts
declare const date: (name: string) => Argument<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L146)

Since v4.0.0

## directory

Creates a positional directory path argument.

**Example** (Creating a directory path argument)

```ts
import { Argument } from "effect/unstable/cli"

const workspace = Argument.directory("workspace", { mustExist: true }) // Must exist
```

**Signature**

```ts
declare const directory: (name: string, options?: { readonly mustExist?: boolean | undefined }) => Argument<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L112)

Since v4.0.0

## file

Creates a positional file path argument.

**Example** (Creating file path arguments)

```ts
import { Argument } from "effect/unstable/cli"

const inputFile = Argument.file("input", { mustExist: true }) // Must exist
const outputFile = Argument.file("output", { mustExist: false }) // Must not exist
```

**Signature**

```ts
declare const file: (name: string, options?: { readonly mustExist?: boolean | undefined }) => Argument<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L94)

Since v4.0.0

## fileParse

Creates a positional argument that reads a file and parses its content.

**Details**

The parser is chosen from the explicit `format` option or, when omitted, the
file extension. The parsed value is `unknown`; use `fileSchema` when the
parsed content should also be decoded with a Schema.

**Example** (Parsing file content)

```ts
import { Argument } from "effect/unstable/cli"

const config = Argument.fileParse("config", { format: "json" })
```

**Signature**

```ts
declare const fileParse: (name: string, options?: Primitive.FileParseOptions | undefined) => Argument<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L238)

Since v4.0.0

## fileSchema

Creates a positional argument that reads and validates file content using a schema.

**Example** (Validating file content with a schema)

```ts
import { Schema } from "effect"
import { Argument } from "effect/unstable/cli"

const ConfigSchema = Schema.Struct({
  port: Schema.Number,
  host: Schema.String
})

const config = Argument.fileSchema("config", ConfigSchema)
```

**Signature**

```ts
declare const fileSchema: <A>(
  name: string,
  schema: Schema.ConstraintDecoder<A, Environment>,
  options?: Primitive.FileSchemaOptions | undefined
) => Argument<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L263)

Since v4.0.0

## fileText

Creates a positional argument that reads file content as a string.

**Example** (Reading file text)

```ts
import { Argument } from "effect/unstable/cli"

const config = Argument.fileText("config-file")
```

**Signature**

```ts
declare const fileText: (name: string) => Argument<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L216)

Since v4.0.0

## float

Creates a positional float argument.

**Example** (Creating a float argument)

```ts
import { Argument } from "effect/unstable/cli"

const ratio = Argument.float("ratio")
```

**Signature**

```ts
declare const float: (name: string) => Argument<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L130)

Since v4.0.0

## integer

Creates a positional integer argument.

**Example** (Creating an integer argument)

```ts
import { Argument } from "effect/unstable/cli"

const count = Argument.integer("count")
```

**Signature**

```ts
declare const integer: (name: string) => Argument<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L77)

Since v4.0.0

## none

Creates an empty sentinel argument that always fails to parse.

**Example** (Creating a sentinel argument)

```ts
import { Argument } from "effect/unstable/cli"

// Used as a placeholder or default in combinators
const noArg = Argument.none
```

**Signature**

```ts
declare const none: Argument<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L284)

Since v4.0.0

## path

Creates a positional path argument.

**Example** (Creating a path argument)

```ts
import { Argument } from "effect/unstable/cli"

const configPath = Argument.path("config")
```

**Signature**

```ts
declare const path: (
  name: string,
  options?: { pathType?: "file" | "directory" | "either"; mustExist?: boolean }
) => Argument<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L181)

Since v4.0.0

## redacted

Creates a positional redacted argument that obscures its value.

**Example** (Creating a redacted argument)

```ts
import { Argument } from "effect/unstable/cli"

const secret = Argument.redacted("secret")
```

**Signature**

```ts
declare const redacted: (name: string) => Argument<Redacted.Redacted<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L200)

Since v4.0.0

## string

Creates a positional string argument.

**Example** (Creating a string argument)

```ts
import { Argument } from "effect/unstable/cli"

const filename = Argument.string("filename")
```

**Signature**

```ts
declare const string: (name: string) => Argument<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L61)

Since v4.0.0

# metadata

## withMetavar

Sets a custom metavar (placeholder name) for the argument in help documentation.

**Details**

The metavar is displayed in usage text to indicate what value the user should provide.
For example, `<FILE>` shows `FILE` as the metavar.

**Example** (Setting a metavar)

```ts
import { Argument } from "effect/unstable/cli"

const port = Argument.integer("port").pipe(Argument.withMetavar("PORT"))
```

**Signature**

```ts
declare const withMetavar: {
  <A>(metavar: string): (self: Argument<A>) => Argument<A>
  <A>(self: Argument<A>, metavar: string): Argument<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L646)

Since v4.0.0

# models

## Argument (interface)

Represents a positional command-line argument.

**Gotchas**

`boolean` is intentionally omitted from Argument constructors. Positional
boolean arguments are ambiguous in CLI design since there is no flag name to
negate (for example, `--no-verbose`). Use Flag.boolean instead, or use
Argument.choice with explicit "true" / "false" strings if needed.

**Signature**

```ts
export interface Argument<A> extends Param.Param<typeof Param.argumentKind, A> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Argument.ts#L41)

Since v4.0.0
