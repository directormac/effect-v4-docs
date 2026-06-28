---
title: Completions.ts
nav_order: 164
parent: "effect"
---

## Completions.ts overview

The `Completions` module turns a plain description of an Effect CLI command
tree into shell completion scripts for Bash, Zsh, and Fish. It is the
low-level script generation surface used by the unstable CLI package and by
the built-in completions global flag.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [generate](#generate)
- [models](#models)
  - [ArgumentDescriptor (interface)](#argumentdescriptor-interface)
  - [ArgumentType (type alias)](#argumenttype-type-alias)
  - [CommandDescriptor (interface)](#commanddescriptor-interface)
  - [FlagDescriptor (interface)](#flagdescriptor-interface)
  - [FlagType (type alias)](#flagtype-type-alias)
  - [Shell (type alias)](#shell-type-alias)

---

# constructors

## generate

Generates a shell completion script for a command descriptor.

**When to use**

Use when you need an installable completion script from an existing
`CommandDescriptor`.

**Details**

Dispatches by `shell` to Bash, Zsh, or Fish generation and returns a static
script string for `executableName`.

**See**

- `Shell` for supported shell names
- `CommandDescriptor` for the command shape used by completion generation

**Signature**

```ts
declare const generate: (executableName: string, shell: Shell, descriptor: CommandDescriptor) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L110)

Since v4.0.0

# models

## ArgumentDescriptor (interface)

Describes a positional argument for completions.

**Signature**

```ts
export interface ArgumentDescriptor {
  readonly name: string
  readonly description: string | undefined
  readonly required: boolean
  readonly variadic: boolean
  readonly type: ArgumentType
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L69)

Since v4.0.0

## ArgumentType (type alias)

Describes the supported argument value shapes.

**Signature**

```ts
type ArgumentType =
  | { readonly _tag: "String" }
  | { readonly _tag: "Integer" }
  | { readonly _tag: "Float" }
  | { readonly _tag: "Date" }
  | { readonly _tag: "Choice"; readonly values: ReadonlyArray<string> }
  | { readonly _tag: "Path"; readonly pathType: "file" | "directory" | "either" }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L83)

Since v4.0.0

## CommandDescriptor (interface)

Describes a command for completion script generation.

**Signature**

```ts
export interface CommandDescriptor {
  readonly name: string
  readonly description: string | undefined
  readonly flags: ReadonlyArray<FlagDescriptor>
  readonly arguments: ReadonlyArray<ArgumentDescriptor>
  readonly subcommands: ReadonlyArray<CommandDescriptor>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L27)

Since v4.0.0

## FlagDescriptor (interface)

Describes a command flag for completions.

**Signature**

```ts
export interface FlagDescriptor {
  readonly name: string
  readonly aliases: ReadonlyArray<string>
  readonly description: string | undefined
  readonly type: FlagType
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L41)

Since v4.0.0

## FlagType (type alias)

Describes the supported flag value shapes.

**Signature**

```ts
type FlagType =
  | { readonly _tag: "Boolean" }
  | { readonly _tag: "String" }
  | { readonly _tag: "Integer" }
  | { readonly _tag: "Float" }
  | { readonly _tag: "Date" }
  | { readonly _tag: "Choice"; readonly values: ReadonlyArray<string> }
  | { readonly _tag: "Path"; readonly pathType: "file" | "directory" | "either" }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L54)

Since v4.0.0

## Shell (type alias)

Shell type used to generate completion scripts.

**Signature**

```ts
type Shell = "bash" | "zsh" | "fish"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Completions.ts#L19)

Since v4.0.0
