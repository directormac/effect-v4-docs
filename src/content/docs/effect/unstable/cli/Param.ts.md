---
title: Param.ts
nav_order: 169
parent: "effect"
---

## Param.ts overview

Defines the shared parameter model for CLI arguments and flags.

A `Param<Kind, A>` describes how to consume parsed command-line input and
return a typed value. The `Kind` decides whether the parameter reads
positional arguments or named flags. `Argument` and `Flag` build on this
module to share parsing structure, primitive constructors, help metadata,
aliases, defaults, prompts, configuration fallbacks, validation, schema
decoding, fallback parameters, and traversal helpers.

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
  - [withAlias](#withalias)
  - [withDefault](#withdefault)
  - [withDescription](#withdescription)
  - [withFallbackConfig](#withfallbackconfig)
  - [withFallbackPrompt](#withfallbackprompt)
  - [withSchema](#withschema)
- [constants](#constants)
  - [argumentKind](#argumentkind)
  - [flagKind](#flagkind)
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
  - [makeSingle](#makesingle)
  - [none](#none)
  - [path](#path)
  - [redacted](#redacted)
  - [string](#string)
- [metadata](#metadata)
  - [withHidden](#withhidden)
  - [withMetavar](#withmetavar)
- [models](#models)
  - [Any (type alias)](#any-type-alias)
  - [AnyArgument (type alias)](#anyargument-type-alias)
  - [AnyFlag (type alias)](#anyflag-type-alias)
  - [FallbackPrompt (type alias)](#fallbackprompt-type-alias)
  - [Flags (type alias)](#flags-type-alias)
  - [Map (interface)](#map-interface)
  - [Optional (interface)](#optional-interface)
  - [Param (interface)](#param-interface)
  - [ParamKind (type alias)](#paramkind-type-alias)
  - [Parse (type alias)](#parse-type-alias)
  - [ParsedArgs (interface)](#parsedargs-interface)
  - [Single (interface)](#single-interface)
  - [Transform (interface)](#transform-interface)
  - [Variadic (interface)](#variadic-interface)
- [options](#options)
  - [VariadicParamOptions (type alias)](#variadicparamoptions-type-alias)
- [refinements](#refinements)
  - [isParam](#isparam)
  - [isSingle](#issingle)
- [utils](#utils)
  - [Param (namespace)](#param-namespace)
    - [Variance (interface)](#variance-interface)

---

# combinators

## atLeast

Wraps an option to require it to be specified at least `min` times.

**Details**

This combinator transforms an option to accept at least `min`
occurrences on the command line, returning an array of all provided values.

**Example** (Requiring repeated values)

```ts
import { Param } from "effect/unstable/cli"

// Require at least 2 input files
const inputs = Param.string(Param.flagKind, "input").pipe(Param.atLeast(2), Param.withAlias("-i"))

// Parse: --input file1.txt --input file2.txt --input file3.txt
// Result: ["file1.txt", "file2.txt", "file3.txt"]
```

**Signature**

```ts
declare const atLeast: {
  <A>(min: number): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, ReadonlyArray<A>>
  <Kind extends ParamKind, A>(self: Param<Kind, A>, min: number): Param<Kind, ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1561)

Since v4.0.0

## atMost

Wraps an option to allow it to be specified at most `max` times.

**Details**

This combinator transforms an option to accept between 0 and `max`
occurrences on the command line, returning an array of all provided values.

**Example** (Limiting repeated values)

```ts
import { Param } from "effect/unstable/cli"

// Allow at most 3 warning suppressions
const suppressions = Param.string(Param.flagKind, "suppress").pipe(Param.atMost(3))

// Parse: --suppress warning1 --suppress warning2
// Result: ["warning1", "warning2"]
```

**Signature**

```ts
declare const atMost: {
  <A>(max: number): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, ReadonlyArray<A>>
  <Kind extends ParamKind, A>(self: Param<Kind, A>, max: number): Param<Kind, ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1525)

Since v4.0.0

## between

Wraps an option to allow it to be specified multiple times within a range.

**Details**

This combinator transforms an option to accept between `min` and `max`
occurrences on the command line, returning an array of all provided values.

**Example** (Bounding repeated values)

```ts
import { Param } from "effect/unstable/cli"

// Allow 1-3 file inputs
const files = Param.string(Param.flagKind, "file").pipe(Param.between(1, 3), Param.withAlias("-f"))

// Parse: --file a.txt --file b.txt
// Result: ["a.txt", "b.txt"]

// Allow 0 or more tags
const tags = Param.string(Param.flagKind, "tag").pipe(Param.between(0, Number.MAX_SAFE_INTEGER))

// Parse: --tag dev --tag staging --tag v1.0
// Result: ["dev", "staging", "v1.0"]
```

**Signature**

```ts
declare const between: {
  <A>(min: number, max: number): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, ReadonlyArray<A>>
  <Kind extends ParamKind, A>(self: Param<Kind, A>, min: number, max: number): Param<Kind, ReadonlyArray<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1486)

Since v4.0.0

## filter

Filters parsed values, failing with a custom error message if the predicate returns false.

**Example** (Filtering parsed values)

```ts
import { Param } from "effect/unstable/cli"

const evenNumber = Param.integer(Param.flagKind, "num").pipe(
  Param.filter(
    (n) => n % 2 === 0,
    (n) => `Expected even number, got ${n}`
  )
)
```

**Signature**

```ts
declare const filter: {
  <A>(
    predicate: Predicate.Predicate<A>,
    onFalse: (a: A) => string
  ): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, A>
  <Kind extends ParamKind, A>(
    self: Param<Kind, A>,
    predicate: Predicate.Predicate<A>,
    onFalse: (a: A) => string
  ): Param<Kind, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1647)

Since v4.0.0

## filterMap

Filters and transforms parsed values, failing with a custom error message
if the filter function returns `Option.none()`.

**When to use**

Use when you need validation and transformation in a single parameter
combinator.

**Example** (Filtering and transforming values)

```ts
import { Option } from "effect"
import { Param } from "effect/unstable/cli"
const positiveInt = Param.integer(Param.flagKind, "count").pipe(
  Param.filterMap(
    (n) => (n > 0 ? Option.some(n) : Option.none()),
    (n) => `Expected positive integer, got ${n}`
  )
)
```

**Signature**

```ts
declare const filterMap: {
  <A, B>(
    filter: (a: A) => Option.Option<B>,
    onNone: (a: A) => string
  ): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, B>
  <Kind extends ParamKind, A, B>(
    self: Param<Kind, A>,
    filter: (a: A) => Option.Option<B>,
    onNone: (a: A) => string
  ): Param<Kind, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1596)

Since v4.0.0

## map

Transforms the parsed value of an option using a mapping function.

**Example** (Mapping parsed values)

```ts
import { Param } from "effect/unstable/cli"

const port = Param.integer(Param.flagKind, "port").pipe(Param.map((n) => ({ port: n, url: `http://localhost:${n}` })))
```

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, B>
  <Kind extends ParamKind, A, B>(self: Param<Kind, A>, f: (a: A) => B): Param<Kind, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1027)

Since v4.0.0

## mapEffect

Transforms the parsed value of an option using an effectful mapping function.

**Example** (Mapping parsed values effectfully)

```ts
import { Effect } from "effect"
import { CliError, Param } from "effect/unstable/cli"

const validatedEmail = Param.string(Param.flagKind, "email").pipe(
  Param.mapEffect((email) =>
    email.includes("@")
      ? Effect.succeed(email)
      : Effect.fail(
          new CliError.InvalidValue({
            option: "email",
            value: email,
            expected: "valid email format",
            kind: "flag"
          })
        )
  )
)
```

**Signature**

```ts
declare const mapEffect: {
  <A, B>(
    f: (a: A) => Effect.Effect<B, CliError.CliError, Environment>
  ): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, B>
  <Kind extends ParamKind, A, B>(
    self: Param<Kind, A>,
    f: (a: A) => Effect.Effect<B, CliError.CliError, Environment>
  ): Param<Kind, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1085)

Since v4.0.0

## mapTryCatch

Transforms the parsed value of an option using a function that may throw,
converting any thrown errors into failure messages.

**Example** (Mapping thrown errors)

```ts
import { Param } from "effect/unstable/cli"

const parsedJson = Param.string(Param.flagKind, "config").pipe(
  Param.mapTryCatch(
    (str) => JSON.parse(str),
    (error) => `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`
  )
)
```

**Signature**

```ts
declare const mapTryCatch: {
  <A, B>(
    f: (a: A) => B,
    onError: (error: unknown) => string
  ): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, B>
  <Kind extends ParamKind, A, B>(
    self: Param<Kind, A>,
    f: (a: A) => B,
    onError: (error: unknown) => string
  ): Param<Kind, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1127)

Since v4.0.0

## optional

Makes a flag or positional argument optional.

**Details**

When the parameter is absent, parsing succeeds with `Option.none()` instead
of failing with a missing option or missing argument error. When present, the
parsed value is wrapped in `Option.some()`.

**Example** (Making parameters optional)

```ts
import { Param } from "effect/unstable/cli"

// Create an optional port option
// - When not provided: returns Option.none()
// - When provided: returns Option.some(parsedValue)
const port = Param.optional(Param.integer(Param.flagKind, "port"))
```

**Signature**

```ts
declare const optional: <Kind extends ParamKind, A>(param: Param<Kind, A>) => Param<Kind, Option.Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1189)

Since v4.0.0

## orElse

Provides a fallback param to use if this param fails to parse.

**Example** (Falling back to another parameter)

```ts
import { Param } from "effect/unstable/cli"

const config = Param.file(Param.flagKind, "config").pipe(Param.orElse(() => Param.string(Param.flagKind, "config-url")))
```

**Signature**

```ts
declare const orElse: {
  <B, Kind extends ParamKind>(
    orElse: (error: CliError.CliError) => Param<Kind, B>
  ): <A>(self: Param<Kind, A>) => Param<Kind, A | B>
  <Kind extends ParamKind, A, B>(
    self: Param<Kind, A>,
    orElse: (error: CliError.CliError) => Param<Kind, B>
  ): Param<Kind, A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1766)

Since v4.0.0

## orElseResult

Provides a fallback param and returns a `Result` indicating which param
succeeded.

**Details**

The original param's value is returned as `Result.succeed`, while the
fallback param's value is returned as `Result.fail`.

**Example** (Returning fallback results)

```ts
import { Param } from "effect/unstable/cli"

const configSource = Param.file(Param.flagKind, "config").pipe(
  Param.orElseResult(() => Param.string(Param.flagKind, "config-url"))
)
// Returns Result<string, string>
```

**Signature**

```ts
declare const orElseResult: {
  <Kind extends ParamKind, B>(
    orElse: (error: CliError.CliError) => Param<Kind, B>
  ): <A>(self: Param<Kind, A>) => Param<Kind, Result.Result<A, B>>
  <Kind extends ParamKind, A, B>(
    self: Param<Kind, A>,
    orElse: (error: CliError.CliError) => Param<Kind, B>
  ): Param<Kind, Result.Result<A, B>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1806)

Since v4.0.0

## variadic

Creates a variadic parameter that can be specified multiple times.

**Details**

This is the base combinator for creating parameters that accept multiple values.
The `min` and `max` parameters are optional. When they are not provided, the
parameter can be specified any number of times, from 0 to infinity.

**Example** (Accepting multiple values)

```ts
import { Param } from "effect/unstable/cli"

// Basic variadic parameter (0 to infinity)
const tags = Param.variadic(Param.string(Param.flagKind, "tag"))

// Variadic with minimum count
const inputs = Param.variadic(
  Param.string(Param.flagKind, "input"),
  { min: 1 } // at least 1 required
)

// Variadic with both min and max
const limited = Param.variadic(Param.string(Param.flagKind, "item"), {
  min: 2, // at least 2 times
  max: 2 // at most 2 times
})
```

**Signature**

```ts
declare const variadic: <Kind extends ParamKind, A>(
  self: Param<Kind, A>,
  options?: VariadicParamOptions | undefined
) => Param<Kind, ReadonlyArray<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1430)

Since v4.0.0

## withAlias

Adds an alias to an option.

**When to use**

Use when you need a CLI parameter to accept an alternate name, such as "-f"
for "--force".

**Details**

This works on any param structure by recursively finding the underlying
`Single` node and applying the alias there.

**Example** (Adding parameter aliases)

```ts
import { Param } from "effect/unstable/cli"

const force = Param.boolean(Param.flagKind, "force").pipe(Param.withAlias("-f"), Param.withAlias("-F"))

// Also works on composed params:
const count = Param.integer(Param.flagKind, "count").pipe(
  Param.optional,
  Param.withAlias("-c") // finds the underlying Single and adds alias
)
```

**Signature**

```ts
declare const withAlias: {
  <Kind extends ParamKind, A>(alias: string): (self: Param<Kind, A>) => Param<Kind, A>
  <Kind extends ParamKind, A>(self: Param<Kind, A>, alias: string): Param<Kind, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L938)

Since v4.0.0

## withDefault

Makes a flag or positional argument optional by supplying a fallback value.

**Details**

The fallback may be a pure value or an effect. It is used only when the
parameter is absent; provided values are parsed normally.

**Example** (Providing default values)

```ts
import { Param } from "effect/unstable/cli"

// Using the pipe operator to make an option optional
const port = Param.integer(Param.flagKind, "port").pipe(Param.withDefault(8080))

// Can also be used with other combinators
const verbose = Param.boolean(Param.flagKind, "verbose").pipe(
  Param.withAlias("-v"),
  Param.withDescription("Enable verbose output"),
  Param.withDefault(false)
)
```

**Signature**

```ts
declare const withDefault: {
  <const B>(
    defaultValue: B | Effect.Effect<B, CliError.CliError, Environment>
  ): <Kind extends ParamKind, A>(self: Param<Kind, A>) => Param<Kind, A | B>
  <Kind extends ParamKind, A, const B>(
    self: Param<Kind, A>,
    defaultValue: B | Effect.Effect<B, CliError.CliError, Environment>
  ): Param<Kind, A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1252)

Since v4.0.0

## withDescription

Adds a description to an option for help text.

**Details**

Descriptions provide users with information about what the option does
when they view help documentation.

**Example** (Adding help descriptions)

```ts
import { Param } from "effect/unstable/cli"

const verbose = Param.boolean(Param.flagKind, "verbose").pipe(
  Param.withAlias("-v"),
  Param.withDescription("Enable verbose output")
)
```

**Signature**

```ts
declare const withDescription: {
  <Kind extends ParamKind, A>(description: string): (self: Param<Kind, A>) => Param<Kind, A>
  <Kind extends ParamKind, A>(self: Param<Kind, A>, description: string): Param<Kind, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L971)

Since v4.0.0

## withFallbackConfig

Adds a fallback config that is loaded when a required parameter is missing.

**When to use**

Use when you need config to provide a fallback source for required flags or
arguments that are absent from CLI input.

**Details**

Provided CLI values win. Config is loaded only after a missing option or
missing argument error.

**Gotchas**

Missing config preserves the original missing-parameter error. Config parse
failure becomes `CliError.InvalidValue`.

**See**

- `withDefault` for a pure default value
- `withFallbackPrompt` for prompting interactively when input is missing

**Signature**

```ts
declare const withFallbackConfig: {
  <B>(config: Config.Config<B>): <Kind extends ParamKind, A>(self: Param<Kind, A>) => Param<Kind, A | B>
  <Kind extends ParamKind, A, B>(self: Param<Kind, A>, config: Config.Config<B>): Param<Kind, A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1300)

Since v4.0.0

## withFallbackPrompt

Adds a fallback prompt that is shown when a required parameter is missing.

**When to use**

Use when a CLI should ask interactively for a missing required flag or
argument.

**Details**

`FallbackPrompt` accepts either a `Prompt` or an effect that builds one.
Effectful prompt creation is lazy and runs only when the fallback is needed.

**Gotchas**

This only handles missing options and missing arguments. Invalid values do not
prompt, and prompt cancellation re-fails with the original missing error.

**See**

- `FallbackPrompt` for accepted fallback prompt forms
- `withFallbackConfig` for loading a fallback from config
- `withDefault` for a pure default value

**Signature**

```ts
declare const withFallbackPrompt: {
  <B>(prompt: FallbackPrompt<B>): <Kind extends ParamKind, A>(self: Param<Kind, A>) => Param<Kind, A | B>
  <Kind extends ParamKind, A, B>(self: Param<Kind, A>, prompt: FallbackPrompt<B>): Param<Kind, A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1359)

Since v4.0.0

## withSchema

Validates parsed values against a Schema, providing detailed error messages.

**Example** (Validating with schemas)

```ts
import { Schema } from "effect"
import { Param } from "effect/unstable/cli"
const isEmail = Schema.isPattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

const Email = Schema.String.pipe(Schema.check(isEmail))

const email = Param.string(Param.flagKind, "email").pipe(Param.withSchema(Email))
```

**Signature**

```ts
declare const withSchema: {
  <A, B>(
    schema: Schema.Codec<B, A, Environment, Environment>
  ): <Kind extends ParamKind>(self: Param<Kind, A>) => Param<Kind, B>
  <Kind extends ParamKind, A, B>(
    self: Param<Kind, A>,
    schema: Schema.Codec<B, A, Environment, Environment>
  ): Param<Kind, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1723)

Since v4.0.0

# constants

## argumentKind

Defines the kind discriminator for positional argument parameters.

**When to use**

Use to build low-level `Param` constructors or type positions for positional
argument parameters.

**See**

- `flagKind` for the named flag parameter discriminator
- `ParamKind` for the full parameter kind union

**Signature**

```ts
declare const argumentKind: "argument"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L70)

Since v4.0.0

## flagKind

Defines the kind discriminator for flag parameters.

**When to use**

Use to build low-level `Param` constructors or type positions for named flag
parameters.

**See**

- `argumentKind` for the positional argument parameter discriminator

**Signature**

```ts
declare const flagKind: "flag"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L85)

Since v4.0.0

# constructors

## boolean

Creates a boolean parameter.

**Example** (Creating boolean parameters)

```ts
import { Param } from "effect/unstable/cli"

// Create a boolean flag
const verboseFlag = Param.boolean(Param.flagKind, "verbose")

// Create a boolean argument
const enableArg = Param.boolean(Param.argumentKind, "enable")

// Usage in CLI: --verbose (defaults to true when present, false when absent)
// or as positional: true/false
```

**Signature**

```ts
declare const boolean: <const Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L407)

Since v4.0.0

## choice

Constructs command-line params that represent a choice between several
string inputs.

**Example** (Creating string choices)

```ts
import { Param } from "effect/unstable/cli"

const logLevel = Param.choice(Param.flagKind, "log-level", ["debug", "info", "warn", "error"])
```

**Signature**

```ts
declare const choice: <const Kind extends ParamKind, const Choices extends ReadonlyArray<string>>(
  kind: Kind,
  name: string,
  choices: Choices
) => Param<Kind, Choices[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L566)

Since v4.0.0

## choiceWithValue

Constructs command-line params that represent a choice between several
inputs. The input will be mapped to it's associated value during parsing.

**Example** (Creating valued choices)

```ts
import { Param } from "effect/unstable/cli"

type Animal = Dog | Cat

interface Dog {
  readonly _tag: "Dog"
}

interface Cat {
  readonly _tag: "Cat"
}

const animal = Param.choiceWithValue(Param.flagKind, "animal", [
  ["dog", { _tag: "Dog" }],
  ["cat", { _tag: "Cat" }]
])
```

**Signature**

```ts
declare const choiceWithValue: <
  const Kind extends ParamKind,
  const Choices extends ReadonlyArray<readonly [string, any]>
>(
  kind: Kind,
  name: string,
  choices: Choices
) => Param<Kind, Choices[number][1]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L536)

Since v4.0.0

## date

Creates a date parameter that parses ISO date strings.

**Example** (Creating date parameters)

```ts
import { Param } from "effect/unstable/cli"

// Create a date flag
const startFlag = Param.date(Param.flagKind, "start-date")

// Create a date argument
const dueDateArg = Param.date(Param.argumentKind, "due-date")

// Usage in CLI: --start-date "2023-12-25" or as positional: "2023-01-01"
// Parses to JavaScript Date object
```

**Signature**

```ts
declare const date: <const Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L498)

Since v4.0.0

## directory

Creates a directory path parameter.

**Details**

This is a convenience function that creates a path parameter with the
`pathType` set to `"directory"` and a default type name of `"directory"`.

**Example** (Creating directory parameters)

```ts
import { Param } from "effect/unstable/cli"

// Basic directory parameter
const outputDir = Param.directory(Param.flagKind, "output-dir")

// Directory that must exist
const sourceDir = Param.directory(Param.flagKind, "source", { mustExist: true })

// Usage: --output-dir /path/to/dir --source /existing/dir
```

**Signature**

```ts
declare const directory: <Kind extends ParamKind>(
  kind: Kind,
  name: string,
  options?: { readonly mustExist?: boolean | undefined }
) => Param<Kind, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L640)

Since v4.0.0

## file

Creates a file path parameter.

**Details**

This is a convenience function that creates a path parameter with a
`pathType` set to `"file"` and a default type name of `"file"`.

**Example** (Creating file parameters)

```ts
import { Param } from "effect/unstable/cli"

// Basic file parameter
const outputFile = Param.file(Param.flagKind, "output")

// File that must exist
const inputFile = Param.file(Param.flagKind, "input", { mustExist: true })

// Usage: --output result.txt --input existing-file.txt
```

**Signature**

```ts
declare const file: <Kind extends ParamKind>(
  kind: Kind,
  name: string,
  options?: { readonly mustExist?: boolean | undefined }
) => Param<Kind, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L678)

Since v4.0.0

## fileParse

Creates a param that reads and parses the content of the specified file.

**Details**

The parser that is utilized will depend on the specified `format`, or the
extension of the file passed on the command-line if no `format` is specified.

**Example** (Parsing file contents)

```ts
import { Param } from "effect/unstable/cli"

// Will use the extension of the file passed on the command line to determine
// the parser to use
const config = Param.fileParse(Param.flagKind, "config")

// Will use the JSON parser
const jsonConfig = Param.fileParse(Param.flagKind, "json-config", {
  format: "json"
})
```

**Signature**

```ts
declare const fileParse: <Kind extends ParamKind>(
  kind: Kind,
  name: string,
  options?: Primitive.FileParseOptions | undefined
) => Param<Kind, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L775)

Since v4.0.0

## fileSchema

Creates a parameter that reads and validates file content using a schema.

**Example** (Validating file contents)

```ts
import { Schema } from "effect"
import { Param } from "effect/unstable/cli"
// Parse JSON config file
const configSchema = Schema.Struct({
  port: Schema.Number,
  host: Schema.String
})

const config = Param.fileSchema(Param.flagKind, "config", configSchema, {
  format: "json"
})

// Parse YAML file
const yamlConfig = Param.fileSchema(Param.flagKind, "config", configSchema, {
  format: "yaml"
})

// Usage: --config config.json (reads and validates file content)
```

**Signature**

```ts
declare const fileSchema: <Kind extends ParamKind, A>(
  kind: Kind,
  name: string,
  schema: Schema.ConstraintDecoder<A, Environment>,
  options?: Primitive.FileSchemaOptions | undefined
) => Param<Kind, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L815)

Since v4.0.0

## fileText

Creates a parameter that reads and returns file content as a string.

**Example** (Reading file text)

```ts
import { Param } from "effect/unstable/cli"

// Read a config file as string
const configContent = Param.fileText(Param.flagKind, "config")

// Read a template file as argument
const templateContent = Param.fileText(Param.argumentKind, "template")

// Usage: --config config.txt (reads file content into string)
```

**Signature**

```ts
declare const fileText: <Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L742)

Since v4.0.0

## float

Creates a floating-point number parameter.

**Example** (Creating float parameters)

```ts
import { Param } from "effect/unstable/cli"

// Create a float flag
const rateFlag = Param.float(Param.flagKind, "rate")

// Create a float argument
const thresholdArg = Param.float(Param.argumentKind, "threshold")

// Usage in CLI: --rate 0.95 or as positional argument: 3.14159
```

**Signature**

```ts
declare const float: <const Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L467)

Since v4.0.0

## integer

Creates an integer parameter.

**Example** (Creating integer parameters)

```ts
import { Param } from "effect/unstable/cli"

// Create an integer flag
const portFlag = Param.integer(Param.flagKind, "port")

// Create an integer argument
const countArg = Param.integer(Param.argumentKind, "count")

// Usage in CLI: --port 8080 or as positional argument: 42
```

**Signature**

```ts
declare const integer: <const Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L437)

Since v4.0.0

## keyValuePair

Creates a param that parses key=value pairs.

**When to use**

Use when you need command-line options or arguments that collect `key=value`
configuration entries.

**Details**

Requires at least one key=value pair. The parsed pairs are merged into a
single record object.

**Example** (Parsing key-value pairs)

```ts
import { Param } from "effect/unstable/cli"

const env = Param.keyValuePair(Param.flagKind, "env")
// --env FOO=bar --env BAZ=qux will parse to { FOO: "bar", BAZ: "qux" }

const props = Param.keyValuePair(Param.flagKind, "property")
// --property name=value --property debug=true
```

**Signature**

```ts
declare const keyValuePair: <Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, Record<string, string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L855)

Since v4.0.0

## makeSingle

Constructs a leaf `Single` parameter from its kind, name, primitive parser,
and optional help metadata.

**Details**

The returned parser reads either one positional argument or the named flag,
depending on `kind`.

**Signature**

```ts
declare const makeSingle: <const Kind extends ParamKind, A>(params: {
  readonly kind: Kind
  readonly name: string
  readonly primitiveType: Primitive.Primitive<A>
  readonly typeName?: string | undefined
  readonly description?: Option.Option<string> | undefined
  readonly aliases?: ReadonlyArray<string> | undefined
  readonly hidden?: boolean | undefined
}) => Single<Kind, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L333)

Since v4.0.0

## none

Creates an empty sentinel parameter that always fails to parse.

**When to use**

Use when you need an empty CLI parameter sentinel for optional parameter
construction or internal combinators.

**Example** (Creating sentinel parameters)

```ts
import { Param } from "effect/unstable/cli"

const disabledDebugParam = Param.none(Param.flagKind)

const makeDebugParam = (enableDebug: boolean) =>
  enableDebug ? Param.string(Param.flagKind, "debug") : disabledDebugParam

console.log(makeDebugParam(true) === disabledDebugParam) // false
console.log(makeDebugParam(false) === disabledDebugParam) // true
```

**Signature**

```ts
declare const none: <Kind extends ParamKind>(kind: Kind) => Param<Kind, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L896)

Since v4.0.0

## path

Creates a path parameter that accepts file or directory paths.

**Example** (Creating path parameters)

```ts
import { Param } from "effect/unstable/cli"

// Basic path parameter
const outputPath = Param.path(Param.flagKind, "output")

// Path that must exist
const inputPath = Param.path(Param.flagKind, "input", { mustExist: true })

// File-only path
const configFile = Param.path(Param.flagKind, "config", {
  pathType: "file",
  mustExist: true,
  typeName: "config-file"
})
```

**Signature**

```ts
declare const path: <Kind extends ParamKind>(
  kind: Kind,
  name: string,
  options?: {
    readonly pathType?: Primitive.PathType | undefined
    readonly mustExist?: boolean | undefined
    readonly typeName?: string | undefined
  }
) => Param<Kind, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L599)

Since v4.0.0

## redacted

Creates a redacted parameter for sensitive data like passwords.
The value is masked in help output and logging.

**Example** (Creating redacted parameters)

```ts
import { Param } from "effect/unstable/cli"

// Create a password parameter
const password = Param.redacted(Param.flagKind, "password")

// Create an API key argument
const apiKey = Param.redacted(Param.argumentKind, "api-key")

// Usage: --password (value will be hidden in help/logs)
```

**Signature**

```ts
declare const redacted: <Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, Redacted.Redacted<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L712)

Since v4.0.0

## string

Creates a string parameter.

**Example** (Creating string parameters)

```ts
import { Param } from "effect/unstable/cli"

// Create a string flag
const nameFlag = Param.string(Param.flagKind, "name")

// Create a string argument
const fileArg = Param.string(Param.argumentKind, "file")

// Usage in CLI: --name "John Doe" or as positional argument
```

**Signature**

```ts
declare const string: <const Kind extends ParamKind>(kind: Kind, name: string) => Param<Kind, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L376)

Since v4.0.0

# metadata

## withHidden

Hides a parameter from generated help output and completions while keeping
it parseable on the command line.

**When to use**

Use when experimental, internal, or deprecated flags should be accepted but
not advertised.

**Example** (Hiding a flag from help)

```ts
import { Param } from "effect/unstable/cli"

const experimental = Param.boolean(Param.flagKind, "experimental-foo").pipe(Param.withHidden)
```

**Signature**

```ts
declare const withHidden: <Kind extends ParamKind, A>(self: Param<Kind, A>) => Param<Kind, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1004)

Since v4.0.0

## withMetavar

Sets a custom metavar (placeholder name) for the param in help documentation.

**Details**

The metavar is displayed in usage text to indicate what value the user should provide.
For example, `--output FILE` shows `FILE` as the metavar.

**Example** (Setting metavars)

```ts
import { Param } from "effect/unstable/cli"

const port = Param.integer(Param.flagKind, "port").pipe(
  Param.withMetavar("PORT"),
  Param.filter(
    (p) => p >= 1 && p <= 65535,
    () => "Port must be between 1 and 65535"
  )
)
```

**Signature**

```ts
declare const withMetavar: {
  <K extends ParamKind>(metavar: string): <A>(self: Param<K, A>) => Param<K, A>
  <K extends ParamKind, A>(self: Param<K, A>, metavar: string): Param<K, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1688)

Since v4.0.0

# models

## Any (type alias)

Represents any parameter.

**Signature**

```ts
type Any = Param<ParamKind, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L93)

Since v4.0.0

## AnyArgument (type alias)

Represents any positional argument parameter.

**Signature**

```ts
type AnyArgument = Param<typeof argumentKind, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L101)

Since v4.0.0

## AnyFlag (type alias)

Represents any flag parameter.

**Signature**

```ts
type AnyFlag = Param<typeof flagKind, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L109)

Since v4.0.0

## FallbackPrompt (type alias)

Represents a fallback prompt that can either be provided directly or
computed effectfully when the parameter is missing.

**Signature**

```ts
type FallbackPrompt<A> = Prompt.Prompt<A> | Effect.Effect<Prompt.Prompt<A>, CliError.CliError, Environment>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L177)

Since v4.0.0

## Flags (type alias)

Map of flag names to their provided string values.
Multiple occurrences of a flag produce multiple values.

**Signature**

```ts
type Flags = Record<string, ReadonlyArray<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L155)

Since v4.0.0

## Map (interface)

Parameter node that maps the successfully parsed value of another parameter
with a pure function.

**Signature**

```ts
export interface Map<Kind extends ParamKind, in out A, out B> extends Param<Kind, B> {
  readonly _tag: "Map"
  readonly kind: Kind
  readonly param: Param<Kind, A>
  readonly f: (value: A) => B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L210)

Since v4.0.0

## Optional (interface)

Parameter node that turns a missing argument or flag into `Option.none()` and
a present parsed value into `Option.some(value)`.

**Signature**

```ts
export interface Optional<Kind extends ParamKind, A> extends Param<Kind, Option.Option<A>> {
  readonly _tag: "Optional"
  readonly kind: Kind
  readonly param: Param<Kind, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L239)

Since v4.0.0

## Param (interface)

Polymorphic CLI parameter shared by `Argument` and `Flag`.

**Details**

A parameter knows whether it consumes positional arguments or flags and
parses a `ParsedArgs` value into its typed result.

**Signature**

```ts
export interface Param<Kind extends ParamKind, out A> extends Param.Variance<A> {
  readonly _tag: "Single" | "Map" | "Transform" | "Optional" | "Variadic"
  readonly kind: Kind
  readonly parse: Parse<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L41)

Since v4.0.0

## ParamKind (type alias)

Discriminator for whether a `Param` parses positional arguments or
command-line flags.

**Signature**

```ts
type ParamKind = "argument" | "flag"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L54)

Since v4.0.0

## Parse (type alias)

Function type used by parameters to parse currently available flags and
positional arguments.

**Details**

It returns the remaining positional arguments together with the parsed value,
or fails with a `CliError` while requiring the CLI parsing environment.

**Signature**

```ts
type Parse<A> = (
  args: ParsedArgs
) => Effect.Effect<readonly [leftover: ReadonlyArray<string>, value: A], CliError.CliError, Environment>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L123)

Since v4.0.0

## ParsedArgs (interface)

Input context passed to `Param.parse` implementations.

- `flags`: already-collected flag values by canonical flag name
- `arguments`: remaining positional arguments to be consumed

**Signature**

```ts
export interface ParsedArgs {
  readonly flags: Flags
  readonly arguments: ReadonlyArray<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L165)

Since v4.0.0

## Single (interface)

Leaf parameter that reads one named argument or flag with a primitive parser.

**Details**

Single parameters carry the user-facing name, aliases, description, primitive
type, and optional metavar/type name used in help output.

**Signature**

```ts
export interface Single<Kind extends ParamKind, out A> extends Param<Kind, A> {
  readonly _tag: "Single"
  readonly kind: Kind
  readonly name: string
  readonly description: Option.Option<string>
  readonly aliases: ReadonlyArray<string>
  readonly primitiveType: Primitive.Primitive<A>
  readonly typeName?: string | undefined
  readonly hidden: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L192)

Since v4.0.0

## Transform (interface)

Parameter node that rewrites another parameter's parser, allowing effectful
validation, fallback behavior, or error translation while preserving the same
parameter kind.

**Signature**

```ts
export interface Transform<Kind extends ParamKind, in out A, out B> extends Param<Kind, B> {
  readonly _tag: "Transform"
  readonly kind: Kind
  readonly param: Param<Kind, A>
  readonly f: (parse: Parse<A>) => Parse<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L225)

Since v4.0.0

## Variadic (interface)

Parameter node that parses another parameter zero or more times and returns
all parsed values as an array, respecting optional minimum and maximum
occurrence bounds.

**Signature**

```ts
export interface Variadic<Kind extends ParamKind, A> extends Param<Kind, ReadonlyArray<A>> {
  readonly _tag: "Variadic"
  readonly kind: Kind
  readonly param: Param<Kind, A>
  readonly min: Option.Option<number>
  readonly max: Option.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L253)

Since v4.0.0

# options

## VariadicParamOptions (type alias)

Represent options which can be used to configure variadic parameters.

**Signature**

```ts
type VariadicParamOptions = {
  /**
   * The minimum number of times the parameter can be specified.
   */
  readonly min?: number | undefined
  /**
   * The maximum number of times the parameter can be specified.
   */
  readonly max?: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L1386)

Since v4.0.0

# refinements

## isParam

Type guard to check if a value is a Param.

**Example** (Checking for params)

```ts
import { Param } from "effect/unstable/cli"

const maybeParam = Param.string(Param.flagKind, "name")

if (Param.isParam(maybeParam)) {
  console.log("This is a Param")
}
```

**Signature**

```ts
declare const isParam: (u: unknown) => u is Param<any, ParamKind>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L288)

Since v4.0.0

## isSingle

Type guard to check if a param is a Single param (not composed).

**Example** (Checking for single params)

```ts
import { Param } from "effect/unstable/cli"

const nameParam = Param.string(Param.flagKind, "name")
const optionalParam = Param.optional(nameParam)

console.log(Param.isSingle(nameParam)) // true
console.log(Param.isSingle(optionalParam)) // false
```

**Signature**

```ts
declare const isSingle: <const Kind extends ParamKind, A>(param: Param<Kind, A>) => param is Single<Kind, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L308)

Since v4.0.0

# utils

## Param (namespace)

Namespace containing type-level utilities attached to the `Param` interface.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L134)

Since v4.0.0

### Variance (interface)

Variance and pipeability marker carried by every `Param` value.

**Signature**

```ts
export interface Variance<out A> extends Pipeable {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Param.ts#L141)

Since v4.0.0
