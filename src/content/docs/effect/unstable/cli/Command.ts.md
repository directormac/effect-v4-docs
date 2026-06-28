---
title: Command.ts
nav_order: 163
parent: "effect"
---

## Command.ts overview

Main building block for defining and running Effect-based command-line
applications.

A `Command` combines a name, typed flags and positional arguments, optional
subcommands, help metadata, and an effectful handler. The module includes
builders for command trees and the runners that parse command-line input,
handle built-in help and version behavior, render help through `CliOutput`,
and execute the selected handler.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [annotate](#annotate)
  - [annotateMerge](#annotatemerge)
  - [withAlias](#withalias)
  - [withDescription](#withdescription)
  - [withExamples](#withexamples)
  - [withGlobalFlags](#withglobalflags)
  - [withHandler](#withhandler)
  - [withHidden](#withhidden)
  - [withSharedFlags](#withsharedflags)
  - [withShortDescription](#withshortdescription)
  - [withSubcommands](#withsubcommands)
- [command execution](#command-execution)
  - [run](#run)
  - [runWith](#runwith)
- [constructors](#constructors)
  - [make](#make)
- [guards](#guards)
  - [isCommand](#iscommand)
- [models](#models)
  - [Command (interface)](#command-interface)
  - [CommandContext (interface)](#commandcontext-interface)
  - [ParsedTokens (interface)](#parsedtokens-interface)
- [providing services](#providing-services)
  - [provide](#provide)
  - [provideEffect](#provideeffect)
  - [provideEffectDiscard](#provideeffectdiscard)
  - [provideSync](#providesync)
- [utility types](#utility-types)
  - [Environment (type alias)](#environment-type-alias)
  - [Error (type alias)](#error-type-alias)
- [utils](#utils)
  - [Command (namespace)](#command-namespace)
    - [Variance (interface)](#variance-interface)
    - [Example (interface)](#example-interface)
    - [Config (interface)](#config-interface)
    - [FlagConfig (interface)](#flagconfig-interface)
    - [Any (interface)](#any-interface)
    - [SubcommandGroup (interface)](#subcommandgroup-interface)
    - [SubcommandEntry (type alias)](#subcommandentry-type-alias)
    - [Config (namespace)](#config-namespace)
      - [Infer (type alias)](#infer-type-alias)
      - [InferValue (type alias)](#infervalue-type-alias)

---

# combinators

## annotate

Adds a custom annotation to a command.

**When to use**

Use to attach one command-scoped metadata value under a `Context.Key`,
especially for consumers such as custom help formatters.

**Details**

Annotations are stored on the command's annotation context and flow into
generated help document annotations.

**Gotchas**

Adding the same `Context.Key` again replaces the earlier value.

**See**

- `annotateMerge` for merging an existing annotation context

**Signature**

```ts
declare const annotate: {
  <I, S>(
    service: Context.Key<I, S>,
    value: NoInfer<S>
  ): <Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, R>
  <Name extends string, Input, E, R, ContextInput, I, S>(
    self: Command<Name, Input, ContextInput, E, R>,
    service: Context.Key<I, S>,
    value: NoInfer<S>
  ): Command<Name, Input, ContextInput, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1079)

Since v4.0.0

## annotateMerge

Merges a Context of annotations into a command.

**When to use**

Use when you need to attach an already-built `Context.Context` of command
annotations.

**Details**

Merged annotations are stored on the command and exposed through generated
help document annotations.

**Gotchas**

If both contexts contain the same `Context.Key`, the incoming annotations
context wins.

**See**

- `annotate` for adding a single annotation without constructing a `Context`

**Signature**

```ts
declare const annotateMerge: {
  <I>(
    annotations: Context.Context<I>
  ): <Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, R>
  <Name extends string, Input, E, R, ContextInput, I>(
    self: Command<Name, Input, ContextInput, E, R>,
    annotations: Context.Context<I>
  ): Command<Name, Input, ContextInput, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1123)

Since v4.0.0

## withAlias

Sets an alias for a command.

**Details**

Aliases are accepted as alternate subcommand names during parsing and are
shown in help output as `name, alias`.

**Signature**

```ts
declare const withAlias: {
  (
    alias: string
  ): <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, R>
  <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>,
    alias: string
  ): Command<Name, Input, ContextInput, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1011)

Since v4.0.0

## withDescription

Sets the description for a command.

**Details**

Descriptions provide users with information about what the command does
when they view help documentation.

**Example** (Setting descriptions)

```ts
import { Console, Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"

const deploy = Command.make(
  "deploy",
  {
    environment: Flag.string("env")
  },
  (config) =>
    Effect.gen(function* () {
      yield* Console.log(`Deploying to ${config.environment}`)
    })
).pipe(Command.withDescription("Deploy the application to a specified environment"))
```

**Signature**

```ts
declare const withDescription: {
  (
    description: string
  ): <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, R>
  <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>,
    description: string
  ): Command<Name, Input, ContextInput, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L962)

Since v4.0.0

## withExamples

Sets usage examples for a command.

**Details**

Examples are exposed in structured `HelpDoc` data and rendered by the
default formatter in an `EXAMPLES` section.

**Example** (Adding usage examples)

```ts
import { Command } from "effect/unstable/cli"

const login = Command.make("login").pipe(
  Command.withExamples([
    { command: "myapp login", description: "Log in with browser OAuth" },
    { command: "myapp login --token sbp_abc123", description: "Log in with a token" }
  ])
)
```

**Signature**

```ts
declare const withExamples: {
  (
    examples: ReadonlyArray<Command.Example>
  ): <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, R>
  <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>,
    examples: ReadonlyArray<Command.Example>
  ): Command<Name, Input, ContextInput, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1165)

Since v4.0.0

## withGlobalFlags

Adds global flags to a command scope.

**Details**

Declared global flags apply to the command and all of its descendants.

**Signature**

```ts
declare const withGlobalFlags: {
  <const GlobalFlags extends ReadonlyArray<GlobalFlag.GlobalFlag<any>>>(
    globalFlags: GlobalFlags
  ): <Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, Exclude<R, ExtractGlobalFlagContext<GlobalFlags>>>
  <Name extends string, Input, E, R, ContextInput, const GlobalFlags extends ReadonlyArray<GlobalFlag.GlobalFlag<any>>>(
    self: Command<Name, Input, ContextInput, E, R>,
    globalFlags: GlobalFlags
  ): Command<Name, Input, ContextInput, E, Exclude<R, ExtractGlobalFlagContext<GlobalFlags>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L887)

Since v4.0.0

## withHandler

Adds or replaces the handler for a command.

**Example** (Adding command handlers)

```ts
import { Console } from "effect"
import { Command, Flag } from "effect/unstable/cli"

// Command without initial handler
const greet = Command.make("greet", {
  name: Flag.string("name")
})

// Add handler later
const greetWithHandler = greet.pipe(
  Command.withHandler((config: { readonly name: string }) => Console.log(`Hello, ${config.name}!`))
)
```

**Signature**

```ts
declare const withHandler: {
  <A, R, E>(
    handler: (value: A) => Effect.Effect<void, E, R>
  ): <Name extends string, XR, XE, ContextInput>(
    self: Command<Name, A, ContextInput, XE, XR>
  ) => Command<Name, A, ContextInput, E, Exclude<R, GlobalFlag.BuiltInSettingContext>>
  <Name extends string, A, XR, XE, R, E, ContextInput>(
    self: Command<Name, A, ContextInput, XE, XR>,
    handler: (value: A) => Effect.Effect<void, E, R>
  ): Command<Name, A, ContextInput, E, Exclude<R, GlobalFlag.BuiltInSettingContext>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L563)

Since v4.0.0

## withHidden

Hides a subcommand from parent help output, shell completions, and
"did you mean?" suggestions while keeping it fully invocable by exact name.

**When to use**

Use when experimental or internal subcommands should be accepted but not advertised on
the public CLI surface.

**Example** (Hiding a subcommand)

```ts
import { Command } from "effect/unstable/cli"

// `experimental` still runs when invoked as `mycli experimental`,
// but it does not appear under SUBCOMMANDS in `mycli --help`.
const experimental = Command.make("experimental").pipe(Command.withHidden)

const root = Command.make("mycli").pipe(Command.withSubcommands([experimental]))
```

**Signature**

```ts
declare const withHidden: <const Name extends string, Input, E, R, ContextInput>(
  self: Command<Name, Input, ContextInput, E, R>
) => Command<Name, Input, ContextInput, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1052)

Since v4.0.0

## withSharedFlags

Adds flags that are inherited by subcommands.

**Details**

Shared flags are available to this command's handler and to descendant
handlers via `yield* parentCommand`. Shared flags are accepted both before
and after a selected subcommand name (npm-style).

**Signature**

```ts
declare const withSharedFlags: {
  <const SharedFlags extends Command.FlagConfig>(
    sharedFlags: SharedFlags
  ): <Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<
    Name,
    Simplify<Input & Command.Config.Infer<SharedFlags>>,
    Simplify<ContextInput & Command.Config.Infer<SharedFlags>>,
    E,
    R
  >
  <Name extends string, Input, E, R, ContextInput, const SharedFlags extends Command.FlagConfig>(
    self: Command<Name, Input, ContextInput, E, R>,
    sharedFlags: SharedFlags
  ): Command<
    Name,
    Simplify<Input & Command.Config.Infer<SharedFlags>>,
    Simplify<ContextInput & Command.Config.Infer<SharedFlags>>,
    E,
    R
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L789)

Since v4.0.0

## withShortDescription

Sets a short description for a command.

**Details**

Short descriptions are used when listing subcommands in help output and
shell completions. If no short description is provided, the full
`description` is used as a fallback.

**Signature**

```ts
declare const withShortDescription: {
  (
    shortDescription: string
  ): <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, R>
  <const Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>,
    shortDescription: string
  ): Command<Name, Input, ContextInput, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L987)

Since v4.0.0

## withSubcommands

Adds subcommands to a command, creating a hierarchical command structure.

**Details**

Subcommands can access their parent's parsed configuration by yielding the parent
command within their handler. This enables shared parent flags that affect
all subcommands.

**Example** (Adding subcommands)

```ts
import { Console, Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"

// Parent command with shared flags
const git = Command.make("git").pipe(
  Command.withSharedFlags({
    verbose: Flag.boolean("verbose")
  })
)

// Subcommand that accesses parent config
const clone = Command.make(
  "clone",
  {
    repository: Flag.string("repo")
  },
  (config) =>
    Effect.gen(function* () {
      const parent = yield* git // Access parent's parsed config
      if (parent.verbose) {
        yield* Console.log("Verbose mode enabled")
      }
      yield* Console.log(`Cloning ${config.repository}`)
    })
)

const app = git.pipe(Command.withSubcommands([clone]))
// Usage: git --verbose clone --repo github.com/foo/bar
```

**Signature**

```ts
declare const withSubcommands: {
  <const Subcommands extends ReadonlyArray<Command.SubcommandEntry>>(
    subcommands: Subcommands
  ): <Name extends string, Input, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<
    Name,
    Simplify<Input | ContextInput>,
    ContextInput,
    E | ExtractSubcommandErrors<Subcommands>,
    R | Exclude<ExtractSubcommandContext<Subcommands>, CommandContext<Name>>
  >
  <Name extends string, Input, E, R, ContextInput, const Subcommands extends ReadonlyArray<Command.SubcommandEntry>>(
    self: Command<Name, Input, ContextInput, E, R>,
    subcommands: Subcommands
  ): Command<
    Name,
    Simplify<Input | ContextInput>,
    ContextInput,
    E | ExtractSubcommandErrors<Subcommands>,
    R | Exclude<ExtractSubcommandContext<Subcommands>, CommandContext<Name>>
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L671)

Since v4.0.0

# command execution

## run

Runs a command using the arguments supplied by the `Stdio` service.

**When to use**

Use when command-line arguments should come from `Stdio` at the application
entry point.

**Example** (Running commands with standard input)

```ts
import { Console, Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"

const greetCommand = Command.make(
  "greet",
  {
    name: Flag.string("name")
  },
  (config) =>
    Effect.gen(function* () {
      yield* Console.log(`Hello, ${config.name}!`)
    })
)

// Automatically gets args from the Stdio service
const program = Command.run(greetCommand, {
  version: "1.0.0"
})
```

**See**

- `runWith` for running a command with an explicit argument array

**Signature**

```ts
declare const run: {
  (config: {
    readonly version: string
  }): <Name extends string, Input, E, R, ContextInput>(
    command: Command<Name, Input, ContextInput, E, R>
  ) => Effect.Effect<void, E | CliError.CliError, R | Environment>
  <Name extends string, Input, E, R, ContextInput>(
    command: Command<Name, Input, ContextInput, E, R>,
    config: { readonly version: string }
  ): Effect.Effect<void, E | CliError.CliError, R | Environment>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1440)

Since v4.0.0

## runWith

Runs a command with explicitly provided arguments instead of using arguments from `Stdio`.

**When to use**

Use when you need to test CLI applications or programmatically execute
commands with specific arguments.

**Example** (Running commands with explicit arguments)

```ts
import { Console, Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"

const greet = Command.make(
  "greet",
  {
    name: Flag.string("name"),
    count: Flag.integer("count").pipe(Flag.withDefault(1))
  },
  (config) =>
    Effect.gen(function* () {
      for (let i = 0; i < config.count; i++) {
        yield* Console.log(`Hello, ${config.name}!`)
      }
    })
)

// Test with specific arguments
const testProgram = Effect.gen(function* () {
  const runCommand = Command.runWith(greet, { version: "1.0.0" })

  // Test normal execution
  yield* runCommand(["--name", "Alice", "--count", "2"])

  // Test help display
  yield* runCommand(["--help"])

  // Test version display
  yield* runCommand(["--version"])
})
```

**Signature**

```ts
declare const runWith: <const Name extends string, Input, E, R, ContextInput>(
  command: Command<Name, Input, ContextInput, E, R>,
  config: { readonly version: string }
) => (
  input: ReadonlyArray<string>
) => Effect.Effect<void, Exclude<E, Terminal.QuitError> | CliError.CliError, R | Environment>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1507)

Since v4.0.0

# constructors

## make

Creates a `Command` from a name, an optional configuration, and an optional
handler.

**Details**

Use `withDescription` and related metadata combinators to add help text. The
overloads support simple commands, configured commands, and commands with
effectful handlers.

**Example** (Creating commands)

```ts
import { Console, Effect } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"

// Simple command with no configuration
const version = Command.make("version")

// Command with simple flags
const greet = Command.make("greet", {
  name: Flag.string("name"),
  count: Flag.integer("count").pipe(Flag.withDefault(1))
})

// Command with nested configuration
const deploy = Command.make("deploy", {
  environment: Flag.string("env").pipe(Flag.withDescription("Target environment")),
  server: {
    host: Flag.string("host").pipe(Flag.withDefault("localhost")),
    port: Flag.integer("port").pipe(Flag.withDefault(3000))
  },
  files: Argument.string("files").pipe(Argument.variadic),
  force: Flag.boolean("force").pipe(Flag.withDescription("Force deployment"))
})

// Command with handler
const deployWithHandler = Command.make(
  "deploy",
  {
    environment: Flag.string("env"),
    force: Flag.boolean("force")
  },
  (config) =>
    Effect.gen(function* () {
      yield* Console.log(`Starting deployment to ${config.environment}`)

      if (!config.force && config.environment === "production") {
        return yield* Effect.fail("Production deployments require --force flag")
      }

      yield* Console.log("Deployment completed successfully")
    })
)
```

**Signature**

```ts
declare const make: {
  <Name extends string>(name: Name): Command<Name, {}, {}, never, never>
  <Name extends string, const Config extends Command.Config>(
    name: Name,
    config: Config
  ): Command<Name, Command.Config.Infer<Config>, {}, never, never>
  <Name extends string, const Config extends Command.Config, R, E>(
    name: Name,
    config: Config,
    handler: (config: Command.Config.Infer<Config>) => Effect.Effect<void, E, R>
  ): Command<Name, Command.Config.Infer<Config>, {}, E, Exclude<R, GlobalFlag.BuiltInSettingContext>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L508)

Since v4.0.0

# guards

## isCommand

Returns `true` if the provided value is a `Command`.

**Gotchas**

This checks for the `Command` type-id property; it does not validate the full
command shape.

**Signature**

```ts
declare const isCommand: (u: unknown) => u is Command.Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L445)

Since v4.0.0

# models

## Command (interface)

Represents a CLI command with its configuration, handler, and metadata.

**Details**

Commands are the core building blocks of CLI applications. They define:

- The command name and description
- Configuration including flags and arguments
- Handler function for execution
- Optional subcommands for hierarchical structures

**Example** (Defining CLI commands)

```ts
import { Console } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"

// Simple command with no configuration
const version: Command.Command<"version", {}, {}, never, never> = Command.make("version")

// Command with flags and arguments
const deploy: Command.Command<
  "deploy",
  {
    readonly env: string
    readonly force: boolean
    readonly files: ReadonlyArray<string>
  },
  {},
  never,
  never
> = Command.make("deploy", {
  env: Flag.string("env"),
  force: Flag.boolean("force"),
  files: Argument.string("files").pipe(Argument.variadic())
})

// Command with handler
const greet = Command.make(
  "greet",
  {
    name: Flag.string("name")
  },
  (config) => Console.log(`Hello, ${config.name}!`)
)
```

**Signature**

```ts
export interface Command<
  in out Name extends string,
  in Input,
  out ContextInput = {},
  out E = never,
  out R = never
> extends Effect.Effect<ContextInput, never, CommandContext<Name>> {
  readonly [TypeId]: Command.Variance<Input, E, R>

  /**
   * The name of the command.
   */
  readonly name: Name

  /**
   * An optional description of the command.
   */
  readonly description: string | undefined

  /**
   * An optional short description used when listing subcommands.
   */
  readonly shortDescription: string | undefined

  /**
   * An optional alias that can be used as a shorter command name.
   */
  readonly alias: string | undefined

  /**
   * Optional usage examples for the command.
   */
  readonly examples: ReadonlyArray<Command.Example>

  /**
   * The subcommands available under this command.
   */
  readonly subcommands: ReadonlyArray<{
    readonly group: string | undefined
    readonly commands: NonEmptyReadonlyArray<Command.Any>
  }>

  /**
   * Custom annotations associated with this command.
   */
  readonly annotations: Context.Context<never>

  /**
   * Whether this command is hidden from parent help output, shell
   * completions, and unknown-subcommand suggestions. Hidden commands still
   * parse and execute normally when invoked by exact name.
   */
  readonly hidden: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L92)

Since v4.0.0

## CommandContext (interface)

Service context for a specific command, enabling subcommands to access their parent's parsed configuration.

**Details**

When a subcommand handler needs access to flags or arguments from a parent command,
it can yield the parent command directly to retrieve its config. This is powered by
Effect's service system - each command automatically creates a service that provides
its parsed input to child commands.

**Example** (Accessing parent command context)

```ts
import { Console, Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"

const parent = Command.make("app").pipe(
  Command.withSharedFlags({
    verbose: Flag.boolean("verbose"),
    config: Flag.string("config")
  })
)

const child = Command.make(
  "deploy",
  {
    target: Flag.string("target")
  },
  (config) =>
    Effect.gen(function* () {
      // Access parent's config by yielding the parent command
      const parentConfig = yield* parent
      yield* Console.log(`Verbose: ${parentConfig.verbose}`)
      yield* Console.log(`Config: ${parentConfig.config}`)
      yield* Console.log(`Target: ${config.target}`)
    })
)

const app = parent.pipe(Command.withSubcommands([child]))
// Usage: app --verbose --config prod.json deploy --target staging
```

**Signature**

```ts
export interface CommandContext<Name extends string> {
  readonly _: unique symbol
  readonly name: Name
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L413)

Since v4.0.0

## ParsedTokens (interface)

Represents the parsed tokens from command-line input before validation.

**Signature**

```ts
export interface ParsedTokens {
  readonly flags: Record<string, ReadonlyArray<string>>
  readonly arguments: ReadonlyArray<string>
  readonly errors?: ReadonlyArray<CliError.NonShowHelpErrors>
  readonly subcommand: Option.Option<{
    readonly name: string
    readonly parsedInput: ParsedTokens
  }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L424)

Since v4.0.0

# providing services

## provide

Provides the handler of a command with the services produced by a layer
that optionally depends on the command-line input to be created.

**Example** (Providing command services)

```ts
import { Effect, FileSystem, PlatformError } from "effect"
import { Command, Flag } from "effect/unstable/cli"

const deploy = Command.make(
  "deploy",
  {
    env: Flag.string("env")
  },
  (config) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem
      // Use fs...
    })
).pipe(
  // Provide FileSystem based on the --env flag
  Command.provide((config) =>
    config.env === "local"
      ? FileSystem.layerNoop({})
      : FileSystem.layerNoop({
          access: () =>
            Effect.fail(
              PlatformError.badArgument({
                module: "FileSystem",
                method: "access"
              })
            )
        })
  )
)
```

**Signature**

```ts
declare const provide: {
  <Input, LR, LE, LA>(
    layer: Layer.Layer<LA, LE, LR> | ((input: Input) => Layer.Layer<LA, LE, LR>),
    options?: { readonly local?: boolean | undefined } | undefined
  ): <const Name extends string, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E | LE, Exclude<R, LA> | LR>
  <const Name extends string, Input, E, R, ContextInput, LA, LE, LR>(
    self: Command<Name, Input, ContextInput, E, R>,
    layer: Layer.Layer<LA, LE, LR> | ((input: Input) => Layer.Layer<LA, LE, LR>),
    options?: { readonly local?: boolean | undefined } | undefined
  ): Command<Name, Input, ContextInput, E | LE, Exclude<R, LA> | LR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1228)

Since v4.0.0

## provideEffect

Provides the handler of a command with the service produced by an effect
that optionally depends on the command-line input to be created.

**When to use**

Use to acquire a service effectfully for each command run, optionally using
parsed command input.

**See**

- `provideSync` for synchronous service acquisition
- `provide` for providing an already-available service
- `provideEffectDiscard` for running an effect before the handler without providing a service

**Signature**

```ts
declare const provideEffect: {
  <I, S, Input, R2, E2>(
    service: Context.Key<I, S>,
    effect: Effect.Effect<S, E2, R2> | ((input: Input) => Effect.Effect<S, E2, R2>)
  ): <const Name extends string, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E | E2, Exclude<R, I> | R2>
  <const Name extends string, Input, E, R, ContextInput, I, S, R2, E2>(
    self: Command<Name, Input, ContextInput, E, R>,
    service: Context.Key<I, S>,
    effect: Effect.Effect<S, E2, R2> | ((input: Input) => Effect.Effect<S, E2, R2>)
  ): Command<Name, Input, ContextInput, E | E2, Exclude<R, I> | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1306)

Since v4.0.0

## provideEffectDiscard

Allows for execution of an effect, which optionally depends on command-line
input to be created, prior to executing the handler of a command.

**Signature**

```ts
declare const provideEffectDiscard: {
  <_, Input, E2, R2>(
    effect: Effect.Effect<_, E2, R2> | ((input: Input) => Effect.Effect<_, E2, R2>)
  ): <const Name extends string, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E | E2, R | R2>
  <const Name extends string, Input, E, R, ContextInput, _, E2, R2>(
    self: Command<Name, Input, ContextInput, E, R>,
    effect: Effect.Effect<_, E2, R2> | ((input: Input) => Effect.Effect<_, E2, R2>)
  ): Command<Name, Input, ContextInput, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1336)

Since v4.0.0

## provideSync

Provides the handler of a command with the implementation of a service that
optionally depends on the command-line input to be constructed.

**When to use**

Use when a command handler needs a pure service implementation, optionally
derived from the parsed command input.

**Signature**

```ts
declare const provideSync: {
  <I, S, Input>(
    service: Context.Key<I, S>,
    implementation: S | ((input: Input) => S)
  ): <const Name extends string, E, R, ContextInput>(
    self: Command<Name, Input, ContextInput, E, R>
  ) => Command<Name, Input, ContextInput, E, Exclude<R, I>>
  <const Name extends string, Input, E, R, ContextInput, I, S>(
    self: Command<Name, Input, ContextInput, E, R>,
    service: Context.Key<I, S>,
    implementation: S | ((input: Input) => S)
  ): Command<Name, Input, ContextInput, E, Exclude<R, I>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L1266)

Since v4.0.0

# utility types

## Environment (type alias)

Services required by CLI parsing and execution.

**Details**

This includes file-system and path services for arguments, terminal and
stdio services for running commands, and child-process spawning for
process-related CLI features.

**Signature**

```ts
type Environment = FileSystem.FileSystem | Path.Path | Terminal.Terminal | ChildProcessSpawner | Stdio.Stdio
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L355)

Since v4.0.0

## Error (type alias)

A utility type to extract the error type from a `Command`.

**Signature**

```ts
type Error<C> =
  C extends Command<infer _Name, infer _Input, infer _ContextInput, infer _Error, infer _Requirements> ? _Error : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L363)

Since v4.0.0

# utils

## Command (namespace)

Companion namespace containing type-level helpers and configuration shapes
used by `Command`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L154)

Since v4.0.0

### Variance (interface)

Type-level variance marker for `Command`.

**Details**

The parsed input type is contravariant, while the command error and service
requirement types are covariant.

**Signature**

```ts
export interface Variance<in Input, out E, out R> {
  readonly Input: Contravariant<Input>
  readonly E: Covariant<E>
  readonly R: Covariant<R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L166)

Since v4.0.0

### Example (interface)

Represents a concrete usage example for a command.

**Signature**

```ts
export interface Example {
  readonly command: string
  readonly description?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L178)

Since v4.0.0

### Config (interface)

Configuration object for defining command flags, arguments, and nested structures.

**Details**

`Command.Config` can contain individual flags and arguments using `Param`
types, nested configuration objects for organization, and arrays of
parameters for repeated elements.

**Example** (Configuring command input)

```ts
import { Argument, Flag } from "effect/unstable/cli"
import type { Command as CliCommand } from "effect/unstable/cli"

// Simple flat configuration
const simpleConfig: CliCommand.Command.Config = {
  name: Flag.string("name"),
  age: Flag.integer("age"),
  file: Argument.string("file")
}

// Nested configuration for organization
const nestedConfig: CliCommand.Command.Config = {
  user: {
    name: Flag.string("name"),
    email: Flag.string("email")
  },
  server: {
    host: Flag.string("host"),
    port: Flag.integer("port")
  }
}
```

**Signature**

```ts
export interface Config {
  readonly [key: string]:
    | Param.Param<Param.ParamKind, any>
    | ReadonlyArray<Param.Param<Param.ParamKind, any> | Config>
    | Config
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L221)

Since v4.0.0

### FlagConfig (interface)

Configuration shape accepted by `Command.withSharedFlags`.

**Details**

Only flags are allowed here; arguments are intentionally excluded.

**Signature**

```ts
export interface FlagConfig {
  readonly [key: string]:
    | Param.Param<typeof Param.flagKind, any>
    | ReadonlyArray<Param.Param<typeof Param.flagKind, any> | FlagConfig>
    | FlagConfig
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L238)

Since v4.0.0

### Any (interface)

Represents any Command regardless of its type parameters.

**Signature**

```ts
export interface Any extends Effect.Effect<any, never, any> {
  readonly [TypeId]: any
  readonly name: string
  readonly description: string | undefined
  readonly shortDescription: string | undefined
  readonly alias: string | undefined
  readonly examples: ReadonlyArray<Command.Example>
  readonly subcommands: ReadonlyArray<{
    readonly group: string | undefined
    readonly commands: NonEmptyReadonlyArray<Command.Any>
  }>
  readonly annotations: Context.Context<never>
  readonly hidden: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L308)

Since v4.0.0

### SubcommandGroup (interface)

A grouped set of subcommands used by `Command.withSubcommands`.

**Signature**

```ts
export interface SubcommandGroup<Commands extends ReadonlyArray<Any> = ReadonlyArray<Any>> {
  readonly group: string
  readonly commands: Commands
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L329)

Since v4.0.0

### SubcommandEntry (type alias)

Entry type accepted by `Command.withSubcommands`.

**Signature**

```ts
type SubcommandEntry = Any | SubcommandGroup<ReadonlyArray<Any>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L340)

Since v4.0.0

### Config (namespace)

Utilities for working with command configurations.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L250)

Since v4.0.0

#### Infer (type alias)

Infers the TypeScript type from a Command.Config structure.

**Details**

This type utility extracts the final configuration type that handlers will receive,
preserving the nested structure while converting Param types to their values.

**Example** (Inferring command input)

```ts
import { Flag } from "effect/unstable/cli"
import type { Command as CliCommand } from "effect/unstable/cli"

const config = {
  name: Flag.string("name"),
  server: {
    host: Flag.string("host"),
    port: Flag.integer("port")
  }
} as const

type Result = CliCommand.Command.Config.Infer<typeof config>
// {
//   readonly name: string
//   readonly server: {
//     readonly host: string
//     readonly port: number
//   }
// }
```

**Signature**

```ts
type Infer<A> = Simplify<{ readonly [Key in keyof A]: InferValue<A[Key]> }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L286)

Since v4.0.0

#### InferValue (type alias)

Helper type utility for recursively inferring types from Config values.

**Signature**

```ts
type InferValue<A> =
  A extends ReadonlyArray<any>
    ? { readonly [Key in keyof A]: InferValue<A[Key]> }
    : A extends Param.Param<infer _Kind, infer _Value>
      ? _Value
      : A extends Config
        ? Infer<A>
        : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Command.ts#L296)

Since v4.0.0
