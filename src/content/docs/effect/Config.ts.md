---
title: Config.ts
nav_order: 13
parent: "effect"
---

## Config.ts overview

Descriptions of configuration values that can be read from a
`ConfigProvider`. A `Config<T>` explains which keys to read, how to decode
and validate them, and how to combine defaults, fallbacks, nested paths, and
multiple settings. Configs are also Effects, so they can be yielded in
`Effect.gen` after a provider has been supplied.

Since v4.0.0

---

## Exports Grouped by Category

- [Wrap](#wrap)
  - [Wrap (type alias)](#wrap-type-alias)
  - [unwrap](#unwrap)
- [combinators](#combinators)
  - [all](#all)
  - [nested](#nested)
  - [option](#option)
  - [orElse](#orelse)
  - [withDefault](#withdefault)
- [constructors](#constructors)
  - [boolean](#boolean)
  - [date](#date)
  - [duration](#duration)
  - [fail](#fail)
  - [finite](#finite)
  - [int](#int)
  - [literal](#literal)
  - [literals](#literals)
  - [logLevel](#loglevel)
  - [nonEmptyString](#nonemptystring)
  - [number](#number)
  - [port](#port)
  - [redacted](#redacted)
  - [string](#string)
  - [succeed](#succeed)
  - [url](#url)
- [errors](#errors)
  - [ConfigError (class)](#configerror-class)
    - [toString (method)](#tostring-method)
    - [\_tag (property)](#_tag-property)
    - [name (property)](#name-property)
    - [cause (property)](#cause-property)
- [guards](#guards)
  - [isConfig](#isconfig)
- [mapping](#mapping)
  - [map](#map)
  - [mapOrFail](#maporfail)
- [models](#models)
  - [Config (interface)](#config-interface)
- [schemas](#schemas)
  - [Array](#array)
  - [Boolean](#boolean-1)
  - [LogLevel](#loglevel-1)
  - [Port](#port-1)
  - [Record](#record)
  - [schema](#schema)
- [utility types](#utility-types)
  - [Success (type alias)](#success-type-alias)

---

# Wrap

## Wrap (type alias)

Utility type that recursively replaces primitives with `Config` in a nested
structure.

**When to use**

Use when typing the input of `unwrap` so callers can pass either a `Config`
or a record of `Config`s.

**Details**

`Config.Wrap<{ key: string }>` becomes `{ key: Config<string> } | Config<{ key: string }>`

**See**

- `unwrap` – construct a `Config` from a `Wrap<T>`

**Signature**

```ts
type Wrap<A> = [NonNullable<A>] extends [infer T]
  ? [IsPlainObject<T>] extends [true]
    ? { readonly [K in keyof A]: Wrap<A[K]> } | Config<A>
    : Config<A>
  : Config<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L438)

Since v2.0.0

## unwrap

Constructs a `Config<T>` from a value matching `Wrap<T>`.

**When to use**

Use when accepting config from callers who may pass either a single `Config` or a
record of individual `Config`s.

**Details**

If the input is already a `Config`, it is returned as-is. Otherwise, each
key is recursively unwrapped and combined.

**Example** (Unwrapping a record of configs)

```ts
import { Config } from "effect"

interface Options {
  key: string
}

const makeConfig = (config: Config.Wrap<Options>): Config.Config<Options> => Config.unwrap(config)
```

**See**

- `Wrap` – the utility type accepted by this function

**Signature**

```ts
declare const unwrap: <T>(wrapped: Wrap<T>) => Config<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L479)

Since v2.0.0

# combinators

## all

Combines multiple configs into a single config that parses all of them.

**When to use**

Use when you need to group related configs into a tuple or named struct.

**Details**

Accepts a tuple (preserves positions), an iterable, or a record of configs.
Returns a config whose parsed value mirrors the input shape.

**Example** (Combining configs as a struct)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const dbConfig = Config.all({
  host: Config.string("host"),
  port: Config.number("port")
})

const provider = ConfigProvider.fromUnknown({ host: "localhost", port: 5432 })
// Effect.runSync(dbConfig.parse(provider))
// { host: "localhost", port: 5432 }
```

**Signature**

```ts
declare const all: <const Arg extends Iterable<Config<any>> | Record<string, Config<any>>>(
  arg: Arg
) => Config<
  [Arg] extends [ReadonlyArray<Config<any>>]
    ? { -readonly [K in keyof Arg]: [Arg[K]] extends [Config<infer A>] ? A : never }
    : [Arg] extends [Iterable<Config<infer A>>]
      ? Array<A>
      : [Arg] extends [Record<string, Config<any>>]
        ? { -readonly [K in keyof Arg]: [Arg[K]] extends [Config<infer A>] ? A : never }
        : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L270)

Since v2.0.0

## nested

Scopes a config under a named prefix.

**When to use**

Use when you need to group related config keys under a common namespace.

**Details**

The prefix is prepended to every key the inner config reads. With
`fromUnknown` this means an extra object level; with `fromEnv` it means
a `_`-separated prefix on env var names.

Multiple `nested` calls compose: the outermost name becomes the
outermost path segment.

**Example** (Nesting a struct config under `"database"`)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const dbConfig = Config.all({
  host: Config.string("host"),
  port: Config.number("port")
}).pipe(Config.nested("database"))

const provider = ConfigProvider.fromUnknown({
  database: { host: "localhost", port: "5432" }
})
// Effect.runSync(dbConfig.parse(provider))
// { host: "localhost", port: 5432 }
```

**Example** (Reading env vars with a nested prefix)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const host = Config.string("host").pipe(Config.nested("database"))

const provider = ConfigProvider.fromEnv({
  env: { database_host: "localhost" }
})
// Effect.runSync(host.parse(provider)) // "localhost"
```

**See**

- `all` – combine multiple configs into a struct
- `schema` – read structured config from a schema

**Signature**

```ts
declare const nested: {
  (name: string): <A>(self: Config<A>) => Config<A>
  <A>(self: Config<A>, name: string): Config<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1418)

Since v2.0.0

## option

Makes a config optional: returns `Some(value)` on success and `None` when
data is missing.

**When to use**

Use when you need to handle a config key that may or may not be present.

**Gotchas**

Like `withDefault`, only missing-data errors produce `None`.
Validation errors still propagate.

**Example** (Reading optional config)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const maybePort = Config.option(Config.number("port"))

const provider = ConfigProvider.fromUnknown({})
// Effect.runSync(maybePort.parse(provider)) // { _tag: "None" }
```

**See**

- `withDefault` – provide a concrete fallback value instead

**Signature**

```ts
declare const option: <A>(self: Config<A>) => Config<Option.Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L401)

Since v2.0.0

## orElse

Provides a fallback config when parsing fails with a `ConfigError`.

**When to use**

Use when you need to try an alternative config source after the primary one
fails.

**Details**

Unlike `withDefault`, this catches **all** `ConfigError`s (not just
missing data). The fallback function receives the error and returns a new
`Config`.

**Example** (Falling back to a literal)

```ts
import { Config } from "effect"

const hostConfig = Config.string("HOST").pipe(Config.orElse(() => Config.succeed("localhost")))
```

**See**

- `withDefault` – fallback only on missing data

**Signature**

```ts
declare const orElse: {
  <A2>(that: (error: ConfigError) => Config<A2>): <A>(self: Config<A>) => Config<A2 | A>
  <A, A2>(self: Config<A>, that: (error: ConfigError) => Config<A2>): Config<A | A2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L231)

Since v2.0.0

## withDefault

Provides a fallback value when the config fails due to missing data.

**When to use**

Use when you need to make a config key optional with a sensible default.

**Gotchas**

Only applies when the error is a `SchemaError` caused exclusively by
missing data (missing keys, undefined values). Validation errors (wrong
type, out of range) still propagate.

**Example** (Defaulting a missing port)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const port = Config.number("port").pipe(Config.withDefault(3000))

const provider = ConfigProvider.fromUnknown({})
// Effect.runSync(port.parse(provider)) // 3000
```

**See**

- `option` – returns `Option` instead of a default value
- `orElse` – catches all errors, not just missing data

**Signature**

```ts
declare const withDefault: {
  <const A2>(defaultValue: A2): <A>(self: Config<A>) => Config<A2 | A>
  <A, const A2>(self: Config<A>, defaultValue: A2): Config<A | A2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L357)

Since v2.0.0

# constructors

## boolean

Creates a config for a boolean value parsed from common string
representations.

**When to use**

Use to read boolean flags from string-like config sources.

**Details**

Shortcut for `Config.schema(Config.Boolean, name)`.

Accepted values: `true`, `false`, `yes`, `no`, `on`, `off`, `1`, `0`,
`y`, `n`.

**Example** (Reading a boolean flag)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const flag = yield* Config.boolean("FEATURE_FLAG")
  console.log(flag)
})

const provider = ConfigProvider.fromEnv({
  env: {
    FEATURE_FLAG: "yes"
  }
})

Effect.runSync(program.pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider)))
// Output: true
```

**See**

- `Boolean` for the underlying boolean codec

**Signature**

```ts
declare const boolean: (name?: string) => Config<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1090)

Since v2.0.0

## date

Creates a config for a `Date` value parsed from a string.

**When to use**

Use to read date settings that must parse to valid `Date` values.

**Details**

Shortcut for `Config.schema(Schema.DateValid, name)`.

**Gotchas**

Fails with a `SchemaError` if the string produces an invalid `Date`.

**Example** (Reading a date)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const createdAt = Config.date("CREATED_AT")

const provider = ConfigProvider.fromUnknown({ CREATED_AT: "2024-01-15" })
// Effect.runSync(createdAt.parse(provider))
// Date("2024-01-15T00:00:00.000Z")
```

**Signature**

```ts
declare const date: (name?: string) => Config<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1362)

Since v2.0.0

## duration

Creates a config for a `Duration` value parsed from a human-readable
string.

**When to use**

Use to read time duration settings such as timeouts, intervals, or TTLs.

**Details**

Shortcut for `Config.schema(Schema.DurationFromString, name)`.

Accepts any string that `Duration.fromInput` can parse (e.g.
`"10 seconds"`, `"500 millis"`, `"Infinity"`, `"-Infinity"`).

**Example** (Reading a duration)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const duration = yield* Config.duration("DURATION")
  console.log(duration)
})

const provider = ConfigProvider.fromEnv({
  env: {
    DURATION: "10 seconds"
  }
})

Effect.runSync(program.pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider)))
// Output: Duration { _tag: "millis", value: 10000 }
```

**See**

- `schema` for decoding configuration values with a custom codec

**Signature**

```ts
declare const duration: (name?: string) => Config<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1136)

Since v2.5.0

## fail

Creates a config that always fails with the given error.

**When to use**

Use when you need to re-raise a specific config error, such as inside
`orElse`.

**Signature**

```ts
declare const fail: (err: SourceError | Schema.SchemaError) => Config<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L846)

Since v2.0.0

## finite

Creates a config for a finite number (rejects `NaN` and `Infinity`).

**When to use**

Use to read a numeric config value that must be finite.

**Details**

Shortcut for `Config.schema(Schema.Finite, name)`.

**See**

- `number` for accepting `NaN` and `Infinity`
- `int` for accepting only integers

**Signature**

```ts
declare const finite: (name?: string) => Config<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L968)

Since v4.0.0

## int

Creates a config for an integer value. Rejects floats.

**When to use**

Use to read a numeric config value that must be an integer.

**Details**

Shortcut for `Config.schema(Schema.Int, name)`.

**See**

- `number` for accepting any number
- `port` for accepting only integers in `1` through `65535`

**Signature**

```ts
declare const int: (name?: string) => Config<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L989)

Since v4.0.0

## literal

Creates a config that only accepts a specific literal value.

**When to use**

Use to restrict a config to a single, specific literal value.

**Details**

Shortcut for `Config.schema(Schema.Literal(literal), name)`.

**Example** (Restricting to a literal)

```ts
import { Config } from "effect"

const env = Config.literal("production", "ENV")
```

**See**

- `literals` – accepts multiple literal values

**Signature**

```ts
declare const literal: <L extends SchemaAST.LiteralValue>(literal: L, name?: string) => Config<L>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1016)

Since v2.0.0

## literals

Creates a config that only accepts one of the specified literal values.

**When to use**

Use to restrict a config to a fixed set of allowed literal values.

**Details**

Shortcut for `Config.schema(Schema.Literals(literals), name)`.

**Example** (Restricting to a set of literals)

```ts
import { Config } from "effect"

const env = Config.literals(["development", "production"], "ENV")
```

**See**

- `literal` for accepting one specific literal value

**Signature**

```ts
declare const literals: <const L extends ReadonlyArray<SchemaAST.LiteralValue>>(
  literals: L,
  name?: string
) => Config<L[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1044)

Since v4.0.0

## logLevel

Creates a config for a log level string.

**When to use**

Use to read Effect log-level settings from configuration.

**Details**

Shortcut for `Config.schema(Config.LogLevel, name)`.

Accepted values: `"All"`, `"Fatal"`, `"Error"`, `"Warn"`, `"Info"`,
`"Debug"`, `"Trace"`, `"None"`.

**Example** (Reading a log level)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const logLevel = yield* Config.logLevel("LOG_LEVEL")
  console.log(logLevel)
})

const provider = ConfigProvider.fromEnv({
  env: {
    LOG_LEVEL: "Info"
  }
})

Effect.runSync(program.pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider)))
// Output: "Info"
```

**See**

- `LogLevel` for the underlying log-level codec

**Signature**

```ts
declare const logLevel: (name?: string) => Config<LogLevel_.LogLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1224)

Since v2.0.0

## nonEmptyString

Creates a config for a non-empty string value. Fails if the value is an
empty string.

**When to use**

Use to read a string config value that must contain at least one character.

**Details**

Shortcut for `Config.schema(Schema.NonEmptyString, name)`.

**See**

- `string` for allowing empty strings

**Signature**

```ts
declare const nonEmptyString: (name?: string) => Config<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L925)

Since v3.7.0

## number

Creates a config for a numeric value (including `NaN`, `Infinity`).

**When to use**

Use when you need config input to accept JavaScript's full number domain,
including NaN and infinities, rather than reject non-finite values.

**Details**

Shortcut for `Config.schema(Schema.Number, name)`.

**See**

- `finite` for rejecting `NaN` and `Infinity`
- `int` for accepting only integers

**Signature**

```ts
declare const number: (name?: string) => Config<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L947)

Since v2.0.0

## port

Creates a config for a port number (integer in 1–65535).

**When to use**

Use to read network port settings that must be valid port numbers.

**Details**

Shortcut for `Config.schema(Config.Port, name)`.

**Example** (Reading a port)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const port = yield* Config.port("PORT")
  console.log(port)
})

const provider = ConfigProvider.fromEnv({
  env: {
    PORT: "8080"
  }
})

Effect.runSync(program.pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider)))
// Output: 8080
```

**See**

- `int` for integer config values outside the port range
- `Port` for the underlying port codec

**Signature**

```ts
declare const port: (name?: string) => Config<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1179)

Since v3.16.0

## redacted

Creates a config for a redacted string value. The parsed result is wrapped
in a `Redacted` container that hides the value from logs and `toString`.

**When to use**

Use to read secret string settings that should not be exposed in logs or
string output.

**Details**

Shortcut for `Config.schema(Schema.Redacted(Schema.String), name)`.

**Example** (Reading a secret)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const apiKey = yield* Config.redacted("API_KEY")
  console.log(apiKey)
})

const provider = ConfigProvider.fromEnv({
  env: {
    API_KEY: "sk-1234567890abcdef"
  }
})

Effect.runSync(program.pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider)))
// Output: <redacted>
```

**See**

- `string` for non-secret string settings

**Signature**

```ts
declare const redacted: (name?: string) => Config<Redacted<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1268)

Since v2.0.0

## string

Creates a config for a single string value.

**When to use**

Use when reading a single string env var or config key.

**Details**

Shortcut for `Config.schema(Schema.String, name)`.

**Example** (Reading a string config)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const host = Config.string("HOST")

const provider = ConfigProvider.fromUnknown({ HOST: "localhost" })
// Effect.runSync(host.parse(provider)) // "localhost"
```

**See**

- `nonEmptyString` – rejects empty strings
- `schema` – for more complex types

**Signature**

```ts
declare const string: (name?: string) => Config<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L904)

Since v2.0.0

## succeed

Creates a config that always succeeds with the given value, ignoring the
provider entirely.

**When to use**

Use when you need a hardcoded config value, such as inside `orElse` or
tests.

**Example** (Returning a constant fallback)

```ts
import { Config } from "effect"

const host = Config.string("HOST").pipe(Config.orElse(() => Config.succeed("localhost")))
```

**Signature**

```ts
declare const succeed: <T>(value: T) => Config<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L872)

Since v2.0.0

## url

Creates a config for a `URL` value parsed from a string.

**When to use**

Use to read configuration values that must be valid URL strings.

**Details**

This is a shortcut for `Config.schema(Schema.URL, name)`.

**Gotchas**

Fails if the string cannot be parsed by the `URL` constructor.

**Example** (Reading a URL)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const url = yield* Config.url("URL")
  console.log(url)
})

const provider = ConfigProvider.fromEnv({
  env: {
    URL: "https://example.com"
  }
})

Effect.runSync(program.pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider)))
// Output:
// URL {
//   href: 'https://example.com/',
//   origin: 'https://example.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'example.com',
//   hostname: 'example.com',
//   port: '',
//   pathname: '/',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: ''
// }
```

**See**

- `schema` for decoding configuration values with a custom codec

**Signature**

```ts
declare const url: (name?: string) => Config<URL>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L1328)

Since v3.11.0

# errors

## ConfigError (class)

Represents the error type produced when config loading or validation fails.

**When to use**

Use when you need to inspect config loading or validation failures.

**Details**

Wraps either:

- A `SourceError` — the provider could not read data (I/O failure).
- A `SchemaError` — the data was found but did not match the schema
  (wrong type, out of range, missing key, etc.).

**See**

- `orElse` – recover from a ConfigError
- `withDefault` – provide a fallback for missing-data errors

**Signature**

```ts
declare class ConfigError {
  constructor(cause: SourceError | Schema.SchemaError)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L70)

Since v4.0.0

### toString (method)

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L80)

### \_tag (property)

**Signature**

```ts
readonly _tag: "ConfigError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L71)

### name (property)

**Signature**

```ts
readonly name: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L72)

### cause (property)

**Signature**

```ts
readonly cause: Schema.SchemaError | SourceError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L73)

# guards

## isConfig

Returns `true` if `u` is a `Config` instance.

**When to use**

Use when you need to distinguish a `Config` from an unknown value before
calling `.parse` or `unwrap`.

**Example** (Checking Config values)

```ts
import { Config } from "effect"

console.log(Config.isConfig(Config.string("HOST"))) // true
console.log(Config.isConfig("not a config")) // false
```

**Signature**

```ts
declare const isConfig: (u: unknown) => u is Config<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L48)

Since v2.0.0

# mapping

## map

Transforms the parsed value of a config with a pure function.

**When to use**

Use when you need to transform a parsed config value with a function that
cannot fail.

**Example** (Uppercasing a string config)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const upper = Config.string("name").pipe(Config.map((s) => s.toUpperCase()))

const provider = ConfigProvider.fromUnknown({ name: "alice" })
// Effect.runSync(upper.parse(provider)) // "ALICE"
```

**See**

- `mapOrFail` – when the transformation can fail

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): (self: Config<A>) => Config<B>
  <A, B>(self: Config<A>, f: (a: A) => B): Config<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L165)

Since v2.0.0

## mapOrFail

Transforms the parsed value with a function that may fail.

**When to use**

Use when you need to transform a parsed config value with a function that can
produce a `ConfigError` (e.g. parsing a URL, checking a range).

**Example** (Wrapping a value in an effectful transformation)

```ts
import { Config, Effect } from "effect"

const trimmed = Config.string("name").pipe(Config.mapOrFail((s) => Effect.succeed(s.trim())))
```

**See**

- `map` – when the transformation cannot fail

**Signature**

```ts
declare const mapOrFail: {
  <A, B>(f: (a: A) => Effect.Effect<B, ConfigError>): (self: Config<A>) => Config<B>
  <A, B>(self: Config<A>, f: (a: A) => Effect.Effect<B, ConfigError>): Config<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L195)

Since v2.0.0

# models

## Config (interface)

A recipe for extracting a typed value `T` from a `ConfigProvider`.

**When to use**

Use to describe typed configuration that can be parsed from a provider or
yielded inside `Effect.gen`.

**Details**

Key members:

- `parse(provider, pathPrefix?)` – runs the config against a specific provider.
  The optional path prefix is the logical scope accumulated from outer
  `Config.nested` calls.
- Yieldable – can be yielded inside `Effect.gen`, which automatically
  resolves the current `ConfigProvider` from the context.
- Pipeable – supports `.pipe(Config.map(...))` etc.

**See**

- `schema` – the main way to create a Config

**Signature**

```ts
export interface Config<out T> extends Effect.Effect<T, ConfigError> {
  readonly [TypeId]: typeof TypeId
  readonly parse: (provider: ConfigProvider.ConfigProvider, pathPrefix?: Path) => Effect.Effect<T, ConfigError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L108)

Since v2.0.0

# schemas

## Array

Schema for array types that can also be parsed from a flat separated string.

**When to use**

Use when reading array values from a single env var, such as comma-separated
exporter names.

**Details**

Accepts either a JSON-like array from the provider or a flat string like
`"a,b,c"`. The `separator` defaults to `","` and can be customized.

**Signature**

```ts
declare const Array: <V extends Schema.Constraint>(
  value: V,
  options?: { readonly separator?: string | undefined }
) => Schema.Union<
  readonly [
    Schema.compose<Schema.$Array<V>, Schema.decodeTo<Schema.$Array<Schema.String>, Schema.String, never, never>>,
    Schema.$Array<V>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L828)

Since v4.0.0

## Boolean

Schema for boolean values encoded as strings.

**When to use**

Use when you need the reusable boolean schema value for `Config.schema` with
custom paths.

**Details**

Accepted string values: `true`, `false`, `yes`, `no`, `on`, `off`, `1`,
`0`, `y`, `n` (case-sensitive).

**See**

- `boolean` – convenience constructor

**Signature**

```ts
declare const Boolean: Schema.decodeTo<
  Schema.Boolean,
  Schema.Literals<readonly ["true", "yes", "on", "1", "y", "false", "no", "off", "0", "n"]>,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L686)

Since v4.0.0

## LogLevel

Schema for `LogLevel` string literals.

**When to use**

Use when you need the reusable log-level schema value for `Config.schema`
with custom paths.

**Details**

Accepted values: `"All"`, `"Fatal"`, `"Error"`, `"Warn"`, `"Info"`,
`"Debug"`, `"Trace"`, `"None"`.

**See**

- `logLevel` – convenience constructor

**Signature**

```ts
declare const LogLevel: Schema.Literals<ReadonlyArray<LogLevel_.LogLevel>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L729)

Since v4.0.0

## Port

Schema for port numbers (integers in 1–65535).

**When to use**

Use when you need the reusable port schema value for `Config.schema` with
custom paths.

**See**

- `port` – convenience constructor

**Signature**

```ts
declare const Port: Schema.Int
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L709)

Since v4.0.0

## Record

Schema for key-value record types that can also be parsed from
a flat comma-separated string.

**When to use**

Use when reading key-value maps from a single env var (e.g. OpenTelemetry
resource attributes).

**Details**

Accepts either a JSON-like record from the provider or a flat string like
`"key1=val1,key2=val2"`. The `separator` (default `","`) and
`keyValueSeparator` (default `"="`) can be customized.

**Example** (Parsing a comma-separated record)

```ts
import { Config, ConfigProvider, Effect, Schema } from "effect"

const schema = Config.Record(Schema.String, Schema.String)
const config = Config.schema(schema, "OTEL_RESOURCE_ATTRIBUTES")

const provider = ConfigProvider.fromEnv({
  env: {
    OTEL_RESOURCE_ATTRIBUTES: "service.name=my-service,service.version=1.0.0,custom.attribute=value"
  }
})

console.dir(Effect.runSync(config.parse(provider)))
// {
//   'service.name': 'my-service',
//   'service.version': '1.0.0',
//   'custom.attribute': 'value'
// }
```

**Signature**

```ts
declare const Record: <K extends Schema.Record.Key, V extends Schema.Constraint>(
  key: K,
  value: V,
  options?: { readonly separator?: string | undefined; readonly keyValueSeparator?: string | undefined }
) => Schema.Union<
  readonly [
    Schema.$Record<K, V>,
    Schema.compose<
      Schema.$Record<K, V>,
      Schema.decodeTo<Schema.$Record<Schema.String, Schema.String>, Schema.String, never, never>
    >
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L772)

Since v4.0.0

## schema

Creates a `Config<T>` from a `Schema.Codec`.

**When to use**

Use when you need to read structured or schema-validated configuration.

**Details**

The optional `path` sets the local path segment(s) for the config lookup.
It is appended to the logical path prefix accumulated from outer
`nested` calls. Pass a single string for a flat key or an array for
nested paths.

Convenience constructors such as `string`, `number`, and `boolean` delegate
to this API.

The codec is used to decode the raw `StringTree` produced by the provider
into `T`. Schema validation errors are wrapped in `ConfigError`.

**Example** (Reading a structured config)

```ts
import { Config, ConfigProvider, Effect, Schema } from "effect"

const DbConfig = Config.schema(
  Schema.Struct({
    host: Schema.String,
    port: Schema.Int
  }),
  "db"
)

const provider = ConfigProvider.fromUnknown({
  db: { host: "localhost", port: 5432 }
})

// Effect.runSync(DbConfig.parse(provider))
// { host: "localhost", port: 5432 }
```

**See**

- `string` / `number` / `boolean` – shortcuts for
  single-value configs

**Signature**

```ts
declare const schema: <T, E>(codec: Schema.Codec<T, E>, path?: string | ConfigProvider.Path) => Config<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L642)

Since v4.0.0

# utility types

## Success (type alias)

Extracts the successfully parsed value type from a `Config`.

**When to use**

Use to derive the parsed value type from an existing `Config` value when
declaring reusable config-driven types.

**See**

- `Config` for the config type whose parsed value is extracted
- `Effect.Success` for extracting the success type from any `Effect`

**Signature**

```ts
type Success<T> = [T] extends [Config<infer A>] ? A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Config.ts#L418)

Since v2.5.0
