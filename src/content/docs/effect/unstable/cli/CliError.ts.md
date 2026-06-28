---
title: CliError.ts
nav_order: 161
parent: "effect"
---

## CliError.ts overview

Defines structured errors for the unstable CLI parser and runner.

CLI errors describe problems such as unknown or duplicate flags, missing
flags or arguments, invalid values, unknown subcommands, user handler
failures, and requests to show command help. This module includes the
`CliError` union, the `isCliError` guard, schema-backed error classes with
display messages, and the `NonShowHelpErrors` union used when parse or
validation errors should be shown with help output.

Since v4.0.0

---

## Exports Grouped by Category

- [guards](#guards)
  - [isCliError](#isclierror)
- [models](#models)
  - [CliError (type alias)](#clierror-type-alias)
  - [DuplicateOption (class)](#duplicateoption-class)
    - [[TypeId] (property)](#typeid-property)
  - [InvalidValue (class)](#invalidvalue-class)
    - [[TypeId] (property)](#typeid-property-1)
  - [MissingArgument (class)](#missingargument-class)
    - [[TypeId] (property)](#typeid-property-2)
  - [MissingOption (class)](#missingoption-class)
    - [[TypeId] (property)](#typeid-property-3)
  - [NonShowHelpErrors](#nonshowhelperrors)
  - [NonShowHelpErrors (type alias)](#nonshowhelperrors-type-alias)
  - [ShowHelp (class)](#showhelp-class)
    - [[TypeId] (property)](#typeid-property-4)
    - [[Runtime.errorExitCode] (property)](#runtimeerrorexitcode-property)
    - [[Runtime.errorReported] (property)](#runtimeerrorreported-property)
  - [UnknownSubcommand (class)](#unknownsubcommand-class)
    - [[TypeId] (property)](#typeid-property-5)
  - [UnrecognizedOption (class)](#unrecognizedoption-class)
    - [[TypeId] (property)](#typeid-property-6)
  - [UserError (class)](#usererror-class)
    - [[TypeId] (property)](#typeid-property-7)

---

# guards

## isCliError

Type guard to check if a value is a CLI error.

**Example** (Checking CLI errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

const handleError = (error: unknown) => {
  if (CliError.isCliError(error)) {
    console.log("CLI Error:", error.message)
    return Effect.succeed("Handled CLI error")
  }
  return Effect.fail("Unknown error")
}

// Example usage in error handling
const program = Effect.gen(function* () {
  const result = yield* Effect.try({
    try: () => ({ success: true }),
    catch: (error) => error
  })
  handleError(result)
})
```

**Signature**

```ts
declare const isCliError: (u: unknown) => u is CliError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L53)

Since v4.0.0

# models

## CliError (type alias)

Union type representing all possible CLI error conditions.

**Example** (Handling CLI errors)

```ts
import type { CliError } from "effect/unstable/cli"

const handleCliError = (error: CliError.CliError): void => {
  switch (error._tag) {
    case "UnrecognizedOption":
      console.log(`Unknown flag: ${error.option}`)
      break
    case "MissingOption":
      console.log(`Required flag missing: ${error.option}`)
      break
    case "InvalidValue":
      console.log(`Invalid value: ${error.value} for ${error.option}`)
      break
    case "ShowHelp":
      // Display help for the command path
      console.log(`Help requested for: ${error.commandPath.join(" ")}`)
      break
    default:
      console.log(error.message)
  }
}
```

**Signature**

```ts
type CliError =
  | UnrecognizedOption
  | DuplicateOption
  | MissingOption
  | MissingArgument
  | InvalidValue
  | UnknownSubcommand
  | ShowHelp
  | UserError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L87)

Since v4.0.0

## DuplicateOption (class)

Error thrown when duplicate option names are detected between parent and child commands.

**Example** (Creating duplicate option errors)

```ts
import { CliError } from "effect/unstable/cli"

const duplicateError = new CliError.DuplicateOption({
  option: "--verbose",
  parentCommand: "myapp",
  childCommand: "deploy"
})

console.log(duplicateError.message)
// "Duplicate flag name "--verbose" in parent command "myapp" and subcommand "deploy".
// Parent will always claim this flag (Mode A semantics). Consider renaming one of them to avoid confusion."
```

**Signature**

```ts
declare class DuplicateOption
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L181)

Since v4.0.0

### [TypeId] (property)

Marks this value as a CLI configuration error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L192)

Since v4.0.0

## InvalidValue (class)

Error thrown when an option or argument value is invalid.

**Example** (Creating invalid value errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

const invalidValueError = new CliError.InvalidValue({
  option: "port",
  value: "abc123",
  expected: "integer between 1 and 65535",
  kind: "flag"
})

console.log(invalidValueError.message)
// "Invalid value for flag --port: "abc123". Expected: integer between 1 and 65535"

// For positional arguments
const invalidArgError = new CliError.InvalidValue({
  option: "count",
  value: "abc",
  expected: "integer",
  kind: "argument"
})

console.log(invalidArgError.message)
// "Invalid value for argument <count>: "abc". Expected: integer"
```

**Signature**

```ts
declare class InvalidValue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L340)

Since v4.0.0

### [TypeId] (property)

Marks this value as an invalid CLI value error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L352)

Since v4.0.0

## MissingArgument (class)

Error thrown when a required positional argument is missing.

**Example** (Creating missing argument errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

const missingArgError = new CliError.MissingArgument({
  argument: "target"
})

console.log(missingArgError.message)
// "Missing required argument: target"

// In argument parsing
const parseArguments = (args: Array<string>) =>
  Effect.gen(function* () {
    if (args.length === 0) {
      return yield* missingArgError
    }
    return args[0]
  })
```

**Signature**

```ts
declare class MissingArgument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L285)

Since v4.0.0

### [TypeId] (property)

Marks this value as a missing CLI argument error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L294)

Since v4.0.0

## MissingOption (class)

Error thrown when a required option is missing.

**Example** (Creating missing option errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

const missingOptionError = new CliError.MissingOption({
  option: "api-key"
})

console.log(missingOptionError.message)
// "Missing required flag: --api-key"

// In validation context
const validateRequiredOptions = (options: Record<string, string | undefined>) =>
  Effect.gen(function* () {
    const apiKey = options["api-key"]
    if (!apiKey) {
      return yield* missingOptionError
    }
    return apiKey
  })
```

**Signature**

```ts
declare class MissingOption
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L235)

Since v4.0.0

### [TypeId] (property)

Marks this value as a missing CLI option error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L244)

Since v4.0.0

## NonShowHelpErrors

Schema for concrete CLI errors that can be reported together with help output.

**Details**

This excludes `ShowHelp` itself, allowing parse and validation errors to be
stored in `ShowHelp.errors` without nesting another help-control value.

**Signature**

```ts
declare const NonShowHelpErrors: Schema.Union<
  readonly [
    typeof UnrecognizedOption,
    typeof DuplicateOption,
    typeof MissingOption,
    typeof MissingArgument,
    typeof InvalidValue,
    typeof UnknownSubcommand,
    typeof UserError
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L490)

Since v4.0.0

## NonShowHelpErrors (type alias)

Type of CLI errors that are not `ShowHelp`.

**Details**

These errors can be accumulated and attached to `ShowHelp.errors` when the
runner should display help along with the underlying parse or validation
failures.

**Signature**

```ts
type NonShowHelpErrors = typeof NonShowHelpErrors.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L522)

Since v4.0.0

## ShowHelp (class)

Error data requesting CLI help rendering for a command path.

**Details**

It is used for explicit help requests and for parse or validation failures
that should be shown with help text. When `errors` is non-empty, the runtime
exit code is `1`; otherwise it is `0`.

**Signature**

```ts
declare class ShowHelp
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L536)

Since v4.0.0

### [TypeId] (property)

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L541)

### [Runtime.errorExitCode] (property)

**Signature**

```ts
readonly [Runtime.errorExitCode]: 1 | 0
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L543)

### [Runtime.errorReported] (property)

**Signature**

```ts
readonly [Runtime.errorReported]: false
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L544)

## UnknownSubcommand (class)

Error thrown when an unknown subcommand is encountered.

**Example** (Creating unknown subcommand errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

const unknownSubcommandError = new CliError.UnknownSubcommand({
  subcommand: "deplyo", // typo
  parent: ["myapp"],
  suggestions: ["deploy", "destroy"]
})

console.log(unknownSubcommandError.message)
// "Unknown subcommand "deplyo" for "myapp"
//
//  Did you mean this?
//    deploy
//    destroy"

// In subcommand parsing
const parseSubcommand = (subcommand: string) =>
  Effect.gen(function* () {
    const validCommands = ["deploy", "destroy", "status"]
    if (!validCommands.includes(subcommand)) {
      return yield* unknownSubcommandError
    }
    return subcommand
  })
```

**Signature**

```ts
declare class UnknownSubcommand
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L403)

Since v4.0.0

### [TypeId] (property)

Marks this value as an unknown CLI subcommand error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L414)

Since v4.0.0

## UnrecognizedOption (class)

Error thrown when an unrecognized option is encountered.

**Example** (Creating unrecognized option errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

// Creating an unrecognized option error
const unrecognizedError = new CliError.UnrecognizedOption({
  option: "--unknown-flag",
  command: ["deploy", "production"],
  suggestions: ["--verbose", "--force"]
})

console.log(unrecognizedError.message)
// "Unrecognized flag: --unknown-flag in command deploy production
//
//  Did you mean this?
//    --verbose
//    --force"

// In CLI parsing context
const parseCommand = Effect.gen(function* () {
  // If parsing encounters unknown flag
  return yield* unrecognizedError
})
```

**Signature**

```ts
declare class UnrecognizedOption
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L130)

Since v4.0.0

### [TypeId] (property)

Marks this value as a CLI parsing error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L141)

Since v4.0.0

## UserError (class)

Error wrapper for user handler failures in the CLI error channel.

**Example** (Wrapping user errors)

```ts
import { Effect } from "effect"
import { CliError } from "effect/unstable/cli"

// Wrapping user errors
const userError = new CliError.UserError({
  cause: new Error("Database connection failed")
})

// In command handler
const deployCommand = Effect.gen(function* () {
  const result = yield* Effect.try({
    try: () => ({ deployed: true }),
    catch: (error) => new CliError.UserError({ cause: error })
  })
  return result
})

// In error handling
const handleError = (error: CliError.CliError): Effect.Effect<number> => {
  if (error._tag === "UserError") {
    console.log("Command failed:", error.cause)
    return Effect.succeed(1) // Exit code 1
  }
  return Effect.succeed(0)
}
```

**Signature**

```ts
declare class UserError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L467)

Since v4.0.0

### [TypeId] (property)

Marks this value as a user handler error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cli/CliError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/CliError.ts#L476)

Since v4.0.0
