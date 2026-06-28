---
title: GlobalFlag.ts
nav_order: 166
parent: "effect"
---

## GlobalFlag.ts overview

Global flags for Effect CLI command trees. Global flags are parsed outside a
single command's local flags and can apply to a command and its descendants.

This module defines two kinds of global flags: action flags, which run an
effect and stop normal command execution, and setting flags, which provide a
parsed value to the command handler through the Effect context. It also
defines the built-in help, version, shell-completion, and log-level flags
used by `Command.run` and `Command.runWith`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [action](#action)
  - [setting](#setting)
- [models](#models)
  - [Action (interface)](#action-interface)
  - [BuiltInSettingContext (type alias)](#builtinsettingcontext-type-alias)
  - [GlobalFlag (type alias)](#globalflag-type-alias)
  - [HandlerContext (interface)](#handlercontext-interface)
  - [Setting (interface)](#setting-interface)
- [references](#references)
  - [BuiltIns](#builtins)
  - [Completions](#completions)
  - [Help](#help)
  - [LogLevel](#loglevel)
  - [Version](#version)
- [utils](#utils)
  - [Setting (namespace)](#setting-namespace)
    - [Identifier (type alias)](#identifier-type-alias)

---

# constructors

## action

Creates an Action flag that performs a side effect and exits.

**Signature**

```ts
declare const action: <A>(options: {
  readonly flag: Flag.Flag<A>
  readonly run: (value: A, context: HandlerContext) => Effect.Effect<void>
}) => Action<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L103)

Since v4.0.0

## setting

Creates a Setting flag that configures the command handler's environment.

**Signature**

```ts
declare const setting: <const Id extends string>(
  id: Id
) => <A>(options: { readonly flag: Flag.Flag<A> }) => Setting<Id, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L121)

Since v4.0.0

# models

## Action (interface)

Action flag: side effect + exit (--help, --version, --completions).

**Signature**

```ts
export interface Action<A> {
  readonly _tag: "Action"
  readonly flag: Flag.Flag<A>
  readonly run: (value: A, context: HandlerContext) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L48)

Since v4.0.0

## BuiltInSettingContext (type alias)

Built-in setting context identifiers.

**Signature**

```ts
type BuiltInSettingContext = Setting.Identifier<"log-level">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L295)

Since v4.0.0

## GlobalFlag (type alias)

Global flag discriminated union.

**Signature**

```ts
type GlobalFlag<A> = Action<A> | Setting<any, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L91)

Since v4.0.0

## HandlerContext (interface)

Context passed to action handlers.

**Signature**

```ts
export interface HandlerContext {
  readonly command: Command.Command.Any
  readonly commandPath: ReadonlyArray<string>
  readonly version: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L36)

Since v4.0.0

## Setting (interface)

Setting flag: configure command handler's environment (--log-level, --config).

**Signature**

```ts
export interface Setting<Id extends string, A> extends Context.Service<Setting.Identifier<Id>, A> {
  readonly _tag: "Setting"
  readonly id: Id
  readonly flag: Flag.Flag<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L63)

Since v4.0.0

# references

## BuiltIns

Built-in global flags in default precedence order.

**When to use**

Use when extending or inspecting the default global-flag set that
`Command.runWith` prepends before user-defined global flags.

**Details**

The built-ins are `Help`, `Version`, `Completions`, and `LogLevel`.
`Command.runWith` prepends these built-ins when collecting and parsing global
flags.

**Gotchas**

Action flags are processed in active flag order and the first present action
exits, so this array controls built-in action precedence.

**See**

- `Help` for the help action flag
- `Version` for the version action flag
- `Completions` for the shell-completions action flag
- `LogLevel` for the built-in log-level setting flag

**Signature**

```ts
declare const BuiltIns: ReadonlyArray<GlobalFlag<any>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L282)

Since v4.0.0

## Completions

Defines the `--completions` global flag, which prints a shell completion script for
the given shell.

**Details**

Accepted values are `bash`, `zsh`, `fish`, and `sh`; `sh` is normalized to
`bash`.

**Signature**

```ts
declare const Completions: Action<Option.Option<"bash" | "zsh" | "fish">>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L201)

Since v4.0.0

## Help

Defines the `--help` / `-h` global flag, which shows help documentation for the
active command path.

**See**

- `BuiltIns` for the default list containing this flag
- `action` for defining custom action global flags

**Signature**

```ts
declare const Help: Action<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L154)

Since v4.0.0

## LogLevel

Defines the global setting flag for command log level.

**When to use**

Use to add a built-in `--log-level` option that configures the minimum log
level for the command.

**Signature**

```ts
declare const LogLevel: Setting<"log-level", Option.Option<LogLevelType>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L230)

Since v4.0.0

## Version

Defines the global action flag for showing command version information.

**When to use**

Use to add a built-in `--version / -v` flag to a command runner.

**Signature**

```ts
declare const Version: Action<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L177)

Since v4.0.0

# utils

## Setting (namespace)

Namespace containing type helpers for global setting flags.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L74)

Since v4.0.0

### Identifier (type alias)

Type-level service identifier used by `Setting` global flags for the
parsed value associated with a setting id.

**Signature**

```ts
type`effect/unstable/cli/GlobalFlag/${Id}` = `effect/unstable/cli/GlobalFlag/${Id}`
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/GlobalFlag.ts#L82)

Since v4.0.0
