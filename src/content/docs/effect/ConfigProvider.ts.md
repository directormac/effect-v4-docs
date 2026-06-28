---
title: ConfigProvider.ts
nav_order: 14
parent: "effect"
---

## ConfigProvider.ts overview

Data sources used by `Config` to load raw configuration values. A
`ConfigProvider` reads paths from places such as environment variables,
JavaScript objects, `.env` contents, or directories, and returns a uniform
`Node` shape that config schemas can decode. The module also includes helpers
for composing providers, changing paths, and installing providers through
layers.

Since v4.0.0

---

## Exports Grouped by Category

- [ConfigProviders](#configproviders)
  - [fromDir](#fromdir)
  - [fromDotEnvContents](#fromdotenvcontents)
  - [fromEnv](#fromenv)
  - [fromUnknown](#fromunknown)
- [combinators](#combinators)
  - [constantCase](#constantcase)
  - [mapInput](#mapinput)
  - [nested](#nested)
  - [orElse](#orelse)
- [constructors](#constructors)
  - [fromDotEnv](#fromdotenv)
  - [make](#make)
  - [makeArray](#makearray)
  - [makeRecord](#makerecord)
  - [makeValue](#makevalue)
- [layers](#layers)
  - [layer](#layer)
  - [layerAdd](#layeradd)
- [models](#models)
  - [ConfigProvider (interface)](#configprovider-interface)
  - [Node (type alias)](#node-type-alias)
  - [Path (type alias)](#path-type-alias)
  - [SourceError (class)](#sourceerror-class)
- [services](#services)
  - [ConfigProvider](#configprovider)

---

# ConfigProviders

## fromDir

Creates a `ConfigProvider` that reads configuration from a directory tree
on disk, where each file is a leaf value and each directory is a container.

**When to use**

Use when you expose each config key as a file under a directory, such as
Kubernetes ConfigMap or Secret volume mounts.

**Details**

Resolution tries a regular file first and returns a `Value` node with
trimmed file contents. If the file read fails, it tries a directory and
returns a `Record` node with immediate child names as keys. If both fail with
`NotFound`, it returns `undefined`. Other platform failures return
`SourceError`.

Requires `Path` and `FileSystem` in the Effect context. Defaults to root
path `/`; override with `{ rootPath: "/etc/config" }`.

**Example** (Reading config from a directory)

```ts
import { ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const provider = yield* ConfigProvider.fromDir({
    rootPath: "/etc/myapp"
  })
  return provider
})
```

**See**

- `fromEnv` – for environment variables
- `fromDotEnv` – for `.env` files

**Signature**

```ts
declare const fromDir: (options?: {
  readonly rootPath?: string | undefined
}) => Effect.Effect<ConfigProvider, never, Path_.Path | FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L1116)

Since v4.0.0

## fromDotEnvContents

Creates a `ConfigProvider` by parsing the string contents of a `.env` file.

**When to use**

Use when you already have the `.env` contents as a string, such as contents
fetched from a remote store or embedded in a test.

**Details**

Supports `export` prefixes, single/double/backtick quoting, inline comments,
and escaped newlines. Variable expansion (for example, `${VAR}`) is disabled
by default; enable with `{ expandVariables: true }`.

Parsing is based on the `dotenv` / `dotenv-expand` algorithm.

Internally delegates to `fromEnv` with the parsed key-value pairs.

**Example** (Parsing .env contents)

```ts
import { ConfigProvider } from "effect"

const contents = `
HOST=localhost
PORT=3000
# this is a comment
`

const provider = ConfigProvider.fromDotEnvContents(contents)
```

**See**

- `fromDotEnv` – loads a `.env` file from disk
- `fromEnv` – for raw environment variable access

**Signature**

```ts
declare const fromDotEnvContents: (
  lines: string,
  options?: { readonly expandVariables?: boolean | undefined }
) => ConfigProvider
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L931)

Since v4.0.0

## fromEnv

Creates a `ConfigProvider` backed by environment variables.

**When to use**

Use to read configuration from `process.env`, which is the default when no
provider is explicitly set, or pass a custom env record for testing or
non-Node runtimes.

**Details**

Path segments are joined with `_` for direct lookup, and env var names are
also split on `_` to build a trie for child key discovery. This means
`DATABASE_HOST=localhost` is accessible at both path `["DATABASE_HOST"]`
and `["DATABASE", "HOST"]`. If all immediate children of a trie node have
purely numeric names, the node is reported as an `Array`; otherwise as a
`Record`.

The default environment merges `process.env` and `import.meta.env` (when
available). Override by passing `{ env: { ... } }`.

Never fails with `SourceError` — all lookups are synchronous.

**Example** (Reading from a custom env record)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const provider = ConfigProvider.fromEnv({
  env: {
    DATABASE_HOST: "localhost",
    DATABASE_PORT: "5432"
  }
})

const host = Config.string("HOST").parse(provider.pipe(ConfigProvider.nested("DATABASE")))

// Effect.runSync(host) // "localhost"
```

**See**

- `fromUnknown` – for JSON objects
- `constantCase` – bridge camelCase keys to SCREAMING_SNAKE_CASE

**Signature**

```ts
declare const fromEnv: (options?: { readonly env?: Record<string, string> | undefined }) => ConfigProvider
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L821)

Since v2.0.0

## fromUnknown

Creates a `ConfigProvider` backed by an in-memory JavaScript value
(typically a parsed JSON object).

**When to use**

Use when you need deterministic config from an in-memory JavaScript value,
such as in tests, embedded config, or parsed JSON.

**Details**

Path traversal follows standard JS rules: string segments index into object
keys, numeric segments index into arrays. Returns `undefined` for any path
that cannot be resolved. Never fails with `SourceError`.

Primitive values (`number`, `boolean`, `bigint`) are stringified via
`String(...)`.

**Example** (Providing config from a plain object)

```ts
import { Config, ConfigProvider, Effect } from "effect"

const provider = ConfigProvider.fromUnknown({
  database: {
    host: "localhost",
    port: 5432
  }
})

const host = Config.string("host").parse(provider.pipe(ConfigProvider.nested("database")))

// Effect.runSync(host) // "localhost"
```

**See**

- `fromEnv` – for environment variables
- `make` – for custom backing stores

**Signature**

```ts
declare const fromUnknown: (root: unknown) => ConfigProvider
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L729)

Since v4.0.0

# combinators

## constantCase

Converts all string path segments to `CONSTANT_CASE` before lookup.

**When to use**

Use to bridge camelCase schema keys to `SCREAMING_SNAKE_CASE`
environment variables.

**Details**

Numeric segments are left unchanged. String segments use `String.configCase`
so numeric word groups such as `v2` are preserved for environment variable
names. This is a specialization of `mapInput`.

**Example** (Resolving camelCase keys to env vars)

```ts
import { ConfigProvider } from "effect"

const provider = ConfigProvider.fromEnv({
  env: { DATABASE_HOST: "localhost" }
}).pipe(ConfigProvider.constantCase)

// path ["databaseHost"] now resolves to env var DATABASE_HOST
```

**See**

- `mapInput` – for arbitrary path transformations

**Signature**

```ts
declare const constantCase: (self: ConfigProvider) => ConfigProvider
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L535)

Since v2.0.0

## mapInput

Transforms the path segments before they reach the underlying store.

**When to use**

Use when you need to rename, re-case, or otherwise transform config path
segments before lookup.

**Details**

The function `f` receives the whole path produced by earlier provider
transformations and must return a new path. Lookup path transformations
compose in application order: the existing transformation runs first, then
`f` runs. For providers composed with `orElse`, the transformation is
applied to each operand.

**Example** (Uppercasing path segments)

```ts
import { ConfigProvider } from "effect"

const provider = ConfigProvider.fromEnv({
  env: { APP_HOST: "localhost" }
})

const upper = ConfigProvider.mapInput(provider, (path) =>
  path.map((seg) => (typeof seg === "string" ? seg.toUpperCase() : seg))
)
```

**See**

- `constantCase` – a preset that converts to `CONSTANT_CASE`
- `nested` – for prepending a prefix instead of transforming

**Signature**

```ts
declare const mapInput: {
  (f: (path: Path) => Path): (self: ConfigProvider) => ConfigProvider
  (self: ConfigProvider, f: (path: Path) => Path): ConfigProvider
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L488)

Since v4.0.0

## nested

Scopes a provider so that all lookups are prefixed with the given path
segments.

**When to use**

Use to namespace config under a prefix like `"app"` or `"database"`, or
reuse the same provider shape for multiple sub-configs.

**Details**

Accepts a single string or a full `Path` array. For providers composed with
`orElse`, the prefix is applied to each operand. Supports both
data-last and data-first calling conventions.

**Gotchas**

Ordering matters when composing with `mapInput` or
`constantCase`. Later provider transformations run after earlier ones:
a later `nested` becomes the outer prefix, and a later `mapInput` sees the
whole path produced by previous transformations.

**Example** (Nesting under a prefix)

```ts
import { ConfigProvider } from "effect"

const provider = ConfigProvider.fromEnv({
  env: { APP_HOST: "localhost", APP_PORT: "3000" }
})

// Lookups for ["HOST"] now resolve to ["APP", "HOST"]
const scoped = ConfigProvider.nested(provider, "APP")
```

**See**

- `mapInput` – for arbitrary path transformations

**Signature**

```ts
declare const nested: {
  (prefix: string | Path): (self: ConfigProvider) => ConfigProvider
  (self: ConfigProvider, prefix: string | Path): ConfigProvider
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L579)

Since v2.0.0

## orElse

Returns a provider that falls back to `that` when `self` returns `undefined`
for a path.

**When to use**

Use to layer multiple config sources, such as env vars plus a defaults file,
or provide partial overrides on top of a base config.

**Details**

Each provider keeps its own path transformations. If the combined provider
is later transformed with `mapInput` or `nested`, the
transformation is applied to both sides.

**Gotchas**

The fallback only runs when the path is not found (`undefined`). A
`SourceError` from `self` is not caught; it propagates immediately.

**Example** (Falling back to a default provider)

```ts
import { ConfigProvider } from "effect"

const envProvider = ConfigProvider.fromEnv({
  env: { HOST: "prod.example.com" }
})
const defaults = ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "3000" })

const combined = ConfigProvider.orElse(envProvider, defaults)
```

**See**

- `layerAdd` – install a fallback provider via a Layer

**Signature**

```ts
declare const orElse: {
  (that: ConfigProvider): (self: ConfigProvider) => ConfigProvider
  (self: ConfigProvider, that: ConfigProvider): ConfigProvider
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L442)

Since v2.0.0

# constructors

## fromDotEnv

Creates a `ConfigProvider` by reading and parsing a `.env` file from the
file system.

**When to use**

Use to load environment config from a `.env` file at application startup.

**Details**

Requires `FileSystem` in the Effect context. Defaults to reading `".env"` in
the current directory; override with `{ path: "/custom/.env" }`.

Returns an `Effect` that resolves to a `ConfigProvider`. Fails with a
`PlatformError` if the file cannot be read.

**Example** (Loading a .env file)

```ts
import { ConfigProvider, Effect } from "effect"

const program = Effect.gen(function* () {
  const provider = yield* ConfigProvider.fromDotEnv()
  return provider
})
```

**See**

- `fromDotEnvContents` – parse a `.env` string directly
- `fromEnv` – read from the runtime environment

**Signature**

```ts
declare const fromDotEnv: (options?: {
  readonly path?: string | undefined
  readonly expandVariables?: boolean | undefined
}) => Effect.Effect<ConfigProvider, PlatformError, FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L1066)

Since v4.0.0

## make

Creates a `ConfigProvider` from a raw lookup function.

**When to use**

Use when implementing a provider backed by a custom store, such as a
database, remote API, or in-memory map.

**Details**

The `get` callback receives a `Path` and must return
`Effect<Node | undefined, SourceError>`. Return `undefined` when the path
does not exist; fail with `SourceError` only for actual I/O errors.

**Example** (Creating a simple in-memory provider)

```ts
import { ConfigProvider, Effect } from "effect"

const data: Record<string, string> = {
  host: "localhost",
  port: "5432"
}

const provider = ConfigProvider.make((path) => {
  const key = path.join(".")
  const value = data[key]
  return Effect.succeed(value !== undefined ? ConfigProvider.makeValue(value) : undefined)
})
```

**See**

- `fromEnv` – pre-built provider for environment variables
- `fromUnknown` – pre-built provider for JSON objects

**Signature**

```ts
declare const make: (get: (path: Path) => Effect.Effect<Node | undefined, SourceError>) => ConfigProvider
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L400)

Since v2.0.0

## makeArray

Creates an `Array` node representing an indexed container with a known
length.

**When to use**

Use when you need to describe a JSON array or numerically indexed env vars
inside a custom provider.

**Details**

The optional `value` allows a node to be both a container and a leaf at the
same time.

**Example** (Creating an array node)

```ts
import { ConfigProvider } from "effect"

const node = ConfigProvider.makeArray(3)
// { _tag: "Array", length: 3, value: undefined }
```

**See**

- `makeValue` – for terminal leaves
- `makeRecord` – for object-like containers

**Signature**

```ts
declare const makeArray: (length: number, value?: string) => Node
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L164)

Since v4.0.0

## makeRecord

Creates a `Record` node representing an object-like container with known
child keys.

**When to use**

Use when you need to describe a directory or JSON object inside a custom
provider.

**Details**

The optional `value` allows a node to be both a container and a leaf at the
same time (for example, an env var `A=x` that also has children `A_FOO` and
`A_BAR`).

**Example** (Creating a record node)

```ts
import { ConfigProvider } from "effect"

const node = ConfigProvider.makeRecord(new Set(["host", "port"]))
// { _tag: "Record", keys: Set(["host", "port"]), value: undefined }
```

**See**

- `makeValue` – for terminal leaves
- `makeArray` – for array-like containers

**Signature**

```ts
declare const makeRecord: (keys: ReadonlySet<string>, value?: string) => Node
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L131)

Since v4.0.0

## makeValue

Creates a `Value` node representing a terminal string leaf.

**When to use**

Use when building nodes inside a custom `ConfigProvider`'s `get`
callback.

**Details**

The function returns a new plain object.

**Example** (Creating a value node)

```ts
import { ConfigProvider } from "effect"

const node = ConfigProvider.makeValue("3000")
// { _tag: "Value", value: "3000" }
```

**See**

- `makeRecord` – for object-like containers
- `makeArray` – for array-like containers

**Signature**

```ts
declare const makeValue: (value: string) => Node
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L97)

Since v4.0.0

# layers

## layer

Provides a layer that installs a `ConfigProvider` as the active provider for
all downstream effects, replacing any previously installed provider.

**When to use**

Use to set the config source for an entire application or test suite.

**Details**

Accepts either a plain `ConfigProvider` or an `Effect` that produces one.
When given an Effect, it is evaluated once when the layer is built.

**Example** (Reading config from a JSON object)

```ts
import { Config, ConfigProvider, Effect, Layer } from "effect"

const TestLayer = ConfigProvider.layer(ConfigProvider.fromUnknown({ port: 8080 }))

const program = Effect.gen(function* () {
  const port = yield* Config.number("port")
  return port
})

// Effect.runSync(Effect.provide(program, TestLayer)) // 8080
```

**See**

- `layerAdd` – add a provider without replacing the existing one

**Signature**

```ts
declare const layer: <E = never, R = never>(
  self: ConfigProvider | Effect.Effect<ConfigProvider, E, R>
) => Layer.Layer<never, E, Exclude<R, Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L631)

Since v4.0.0

## layerAdd

Creates a Layer that composes a new `ConfigProvider` with the currently
active one, rather than replacing it.

**When to use**

Use to add defaults that should only apply when the primary provider has no
value for a path, or override specific keys while keeping the rest from the
existing provider by setting `asPrimary: true`.

**Details**

By default, the new provider acts as a fallback and is consulted only when
the current provider returns `undefined`. Set `asPrimary: true` to make the
new provider the primary source, with the existing one as fallback.

**Example** (Adding default values)

```ts
import { ConfigProvider } from "effect"

const defaults = ConfigProvider.fromUnknown({
  HOST: "localhost",
  PORT: "3000"
})

// The current env provider is tried first; `defaults` is the fallback
const DefaultsLayer = ConfigProvider.layerAdd(defaults)
```

**See**

- `layer` – replace the provider entirely
- `orElse` – compose providers without layers

**Signature**

```ts
declare const layerAdd: <E = never, R = never>(
  self: ConfigProvider | Effect.Effect<ConfigProvider, E, R>,
  options?: { readonly asPrimary?: boolean | undefined } | undefined
) => Layer.Layer<never, E, Exclude<R, Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L672)

Since v4.0.0

# models

## ConfigProvider (interface)

The core interface for loading raw configuration data.

**When to use**

Use to type-annotate variables that hold a provider or to implement a
custom provider via `make`.

**Details**

`load(path)` is the semantic lookup operation used by the `Config` module.
It applies provider transformations and composition before consulting the
underlying source. `undefined` means "not found" and `SourceError` means the
source itself failed.

**See**

- `make` – construct a provider from a lookup function
- `orElse` – compose providers with fallback

**Signature**

```ts
export interface ConfigProvider extends Pipeable {
  /**
   * Returns the node found at `path`, or `undefined` if it does not exist.
   * Fails with `SourceError` when the underlying source cannot be read.
   *
   * **When to use**
   *
   * Use to resolve a path through this provider's path transformations before
   * reading the backing source.
   */
  readonly load: (path: Path) => Effect.Effect<Node | undefined, SourceError>

  /** @internal */
  readonly state: ProviderState
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L248)

Since v2.0.0

## Node (type alias)

A discriminated union describing the shape of a configuration value at a
given path.

**When to use**

Use when implementing a custom `ConfigProvider` by returning raw
nodes from the `get` callback passed to `make`, or when inspecting raw
provider output before schema parsing.

**Details**

`Value` is a terminal string leaf. `Record` is an object-like container
whose immediate child keys are known and may carry an optional co-located
`value`. `Array` is an indexed container with a known `length` and may also
carry an optional co-located `value`.

**See**

- `makeValue` – construct a `Value` node
- `makeRecord` – construct a `Record` node
- `makeArray` – construct an `Array` node

**Signature**

```ts
type Node =
  | {
      readonly _tag: "Value"
      readonly value: string
    }
  /** An object; keys are unordered */
  | {
      readonly _tag: "Record"
      readonly keys: ReadonlySet<string>
      readonly value: string | undefined
    }
  /** An array-like container; length is the number of elements */
  | {
      readonly _tag: "Array"
      readonly length: number
      readonly value: string | undefined
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L51)

Since v4.0.0

## Path (type alias)

An ordered sequence of string or numeric segments that addresses a node in
the configuration tree. String segments name object keys; numeric segments
index into arrays.

**When to use**

Use to address raw configuration nodes when implementing or transforming a
`ConfigProvider`.

**Example** (A typical config path)

```ts
import type { ConfigProvider } from "effect"

const path: ConfigProvider.Path = ["database", "replicas", 0, "host"]
```

**Signature**

```ts
type Path = ReadonlyArray<string | number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L225)

Since v4.0.0

## SourceError (class)

Typed error indicating that a configuration source could not be read.

**When to use**

Use when you need to report that a custom provider's underlying store is
unreachable or produced an I/O error while reading configuration data.

**Gotchas**

Do not use `SourceError` for "key not found". That case is represented by
returning `undefined` from `load`.

**Example** (Failing with a SourceError)

```ts
import { ConfigProvider, Effect } from "effect"

const provider = ConfigProvider.make((_path) =>
  Effect.fail(new ConfigProvider.SourceError({ message: "connection refused" }))
)
```

**See**

- `ConfigProvider` – the interface whose `load` may fail with this
  error

**Signature**

```ts
declare class SourceError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L199)

Since v4.0.0

# services

## ConfigProvider

Context reference for the active raw configuration provider, registered in the context with a
default value of `fromEnv()`. Because it is a `Context.Reference`, it is
available without explicit provision; `Config` schemas automatically resolve
it.

**When to use**

Use to override the active raw configuration provider for an entire program,
or retrieve the current provider inside an Effect.

**Example** (Providing a custom provider)

```ts
import { ConfigProvider, Effect } from "effect"

const provider = ConfigProvider.fromUnknown({ port: 8080 })

const program = Effect.gen(function* () {
  const current = yield* ConfigProvider.ConfigProvider
  return current
}).pipe(Effect.provideService(ConfigProvider.ConfigProvider, provider))
```

**See**

- `layer` – install a provider as a Layer
- `layerAdd` – add a fallback provider as a Layer

**Signature**

```ts
declare const ConfigProvider: Context.Reference<ConfigProvider>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ConfigProvider.ts#L296)

Since v2.0.0
