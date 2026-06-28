---
title: ChildProcess.ts
nav_order: 299
parent: "effect"
---

## ChildProcess.ts overview

Describes child processes before they are started.

A `Command` stores the executable, arguments, environment, standard streams,
working directory, and other process options. Commands can also be piped
together. A command is an `Effect`; running it asks the
`ChildProcessSpawner` service to start the process and returns a
`ChildProcessHandle`.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [pipeTo](#pipeto)
  - [prefix](#prefix)
  - [setCwd](#setcwd)
  - [setEnv](#setenv)
- [constructors](#constructors)
  - [make](#make)
- [converting](#converting)
  - [fdName](#fdname)
  - [parseFdName](#parsefdname)
- [guards](#guards)
  - [isCommand](#iscommand)
  - [isPipedCommand](#ispipedcommand)
  - [isStandardCommand](#isstandardcommand)
- [models](#models)
  - [AdditionalFdConfig (type alias)](#additionalfdconfig-type-alias)
  - [Command (type alias)](#command-type-alias)
  - [CommandInput (type alias)](#commandinput-type-alias)
  - [CommandOutput (type alias)](#commandoutput-type-alias)
  - [Encoding (type alias)](#encoding-type-alias)
  - [PipeFromOption (type alias)](#pipefromoption-type-alias)
  - [PipeToOption (type alias)](#pipetooption-type-alias)
  - [PipedCommand (interface)](#pipedcommand-interface)
  - [Signal (type alias)](#signal-type-alias)
  - [StandardCommand (interface)](#standardcommand-interface)
  - [StderrConfig (interface)](#stderrconfig-interface)
  - [StdinConfig (interface)](#stdinconfig-interface)
  - [StdoutConfig (interface)](#stdoutconfig-interface)
  - [TemplateExpression (type alias)](#templateexpression-type-alias)
  - [TemplateExpressionItem (type alias)](#templateexpressionitem-type-alias)
- [options](#options)
  - [CommandOptions (interface)](#commandoptions-interface)
  - [KillOptions (interface)](#killoptions-interface)
  - [PipeOptions (interface)](#pipeoptions-interface)

---

# combinators

## pipeTo

Pipes the output of one command to the input of another.

**Details**

By default, pipes `stdout` from the source to `stdin` of the destination.
Use the `options` parameter to customize which streams are connected.

**Example** (Piping command output)

```ts
import { ChildProcess } from "effect/unstable/process"

// Pipe stdout (default)
const pipeline1 = ChildProcess.make`cat file.txt`.pipe(ChildProcess.pipeTo(ChildProcess.make`grep pattern`))

// Pipe stderr instead of stdout
const pipeline2 = ChildProcess.make`my-program`.pipe(
  ChildProcess.pipeTo(ChildProcess.make`grep error`, { from: "stderr" })
)

// Pipe combined stdout and stderr
const pipeline3 = ChildProcess.make`my-program`.pipe(
  ChildProcess.pipeTo(ChildProcess.make`tee output.log`, { from: "all" })
)
```

**Signature**

```ts
declare const pipeTo: {
  (that: Command, options?: PipeOptions): (self: Command) => PipedCommand
  (self: Command, that: Command, options?: PipeOptions): PipedCommand
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L670)

Since v4.0.0

## prefix

Prepends another command to a command.

**Details**

For pipelines, only the leftmost command is prefixed.

**Example** (Prefixing commands)

```ts
import { ChildProcess } from "effect/unstable/process"

const command = ChildProcess.make`echo "foo"`

const prefixed = command.pipe(ChildProcess.prefix`time`)

// now prefixed will execute `time echo "foo"`
```

**Signature**

```ts
declare const prefix: {
  (command: string, args?: ReadonlyArray<string>): (self: Command) => Command
  (templates: TemplateStringsArray, ...expressions: ReadonlyArray<TemplateExpression>): (self: Command) => Command
  (self: Command, command: string, args?: ReadonlyArray<string>): Command
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L702)

Since v4.0.0

## setCwd

Sets the current working directory for a command.

**Details**

For pipelines, applies to each command in the pipeline.

**Example** (Setting command working directories)

```ts
import { ChildProcess } from "effect/unstable/process"

const cmd = ChildProcess.make`ls -la`.pipe(ChildProcess.setCwd("/tmp"))
```

**Signature**

```ts
declare const setCwd: { (cwd: string): (self: Command) => Command; (self: Command, cwd: string): Command }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L766)

Since v4.0.0

## setEnv

Adds environment variables to a command, merging them with any existing
command environment and overriding duplicate keys.

**Details**

For pipelines, applies to each command in the pipeline.

**Example** (Setting command environment variables)

```ts
import { ChildProcess } from "effect/unstable/process"

const cmd = ChildProcess.make`node script.js`.pipe(ChildProcess.setEnv({ NODE_ENV: "test" }))
```

**Signature**

```ts
declare const setEnv: {
  (env: Record<string, string>): (self: Command) => Command
  (self: Command, env: Record<string, string>): Command
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L804)

Since v4.0.0

# constructors

## make

Create a command from a template literal, options + template, or array form.

**Details**

This function supports three calling conventions:

1. Template literal: `make\`npm run build\``
2. Options + template literal: `make({ cwd: "/app" })\`npm run build\``
3. Array form: `make("npm", ["run", "build"], options?)`

Template literals are not parsed until execution time, allowing parsing
errors to flow through Effect's error channel.

**Example** (Creating commands)

```ts
import { ChildProcess } from "effect/unstable/process"

// Template literal form
const cmd1 = ChildProcess.make`echo "hello"`

// With options
const cmd2 = ChildProcess.make({ cwd: "/tmp" })`ls -la`

// Array form
const cmd3 = ChildProcess.make("git", ["status"])
```

**Signature**

```ts
declare const make: {
  (command: string, options?: CommandOptions): StandardCommand
  (command: string, args: ReadonlyArray<string>, options?: CommandOptions): StandardCommand
  (
    options: CommandOptions
  ): (templates: TemplateStringsArray, ...expressions: ReadonlyArray<TemplateExpression>) => StandardCommand
  (templates: TemplateStringsArray, ...expressions: ReadonlyArray<TemplateExpression>): StandardCommand
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L583)

Since v4.0.0

# converting

## fdName

Create an fd name from its numeric index.

**Signature**

```ts
declare const fdName: (fd: number) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L851)

Since v4.0.0

## parseFdName

Parses an fd name like "fd3" to its numeric index.
Returns undefined if the name is invalid.

**Signature**

```ts
declare const parseFdName: (name: string) => number | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L838)

Since v4.0.0

# guards

## isCommand

Checks whether a value is a `Command`.

**Signature**

```ts
declare const isCommand: (u: unknown) => u is Command
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L510)

Since v4.0.0

## isPipedCommand

Checks whether a command is a `PipedCommand`.

**Signature**

```ts
declare const isPipedCommand: (command: Command) => command is PipedCommand
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L526)

Since v4.0.0

## isStandardCommand

Checks whether a command is a `StandardCommand`.

**Signature**

```ts
declare const isStandardCommand: (command: Command) => command is StandardCommand
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L518)

Since v4.0.0

# models

## AdditionalFdConfig (type alias)

Configuration for additional file descriptors to expose to the child process.

**Signature**

```ts
type AdditionalFdConfig =
  | {
      /**
       * The direction of data flow for this file descriptor.
       * - "input": Data flows from parent to child (writable by parent)
       * - "output": Data flows from child to parent (readable by parent)
       */
      readonly type: "input"
      /**
       * For input file descriptors, an optional stream to pipe into the file
       * descriptor..
       */
      readonly stream?: Stream.Stream<Uint8Array, PlatformError.PlatformError> | undefined
    }
  | {
      /**
       * The direction of data flow for this file descriptor.
       * - "input": Data flows from parent to child (writable by parent)
       * - "output": Data flows from child to parent (readable by parent)
       */
      readonly type: "output"
      /**
       * For output file descriptors, an optional sink which receives data from
       * the file descriptor.
       */
      readonly sink?: Sink.Sink<Uint8Array, Uint8Array, never, PlatformError.PlatformError> | undefined
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L339)

Since v4.0.0

## Command (type alias)

A command that can be built using `make`, combined using `pipeTo`, and executed using `exec` or `spawn`.

**Signature**

```ts
type Command = StandardCommand | PipedCommand
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L32)

Since v4.0.0

## CommandInput (type alias)

Input type for child process stdin.

**Signature**

```ts
type CommandInput =
  | "pipe"
  | "inherit"
  | "ignore"
  | "overlapped"
  | Stream.Stream<Uint8Array, PlatformError.PlatformError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L150)

Since v4.0.0

## CommandOutput (type alias)

Output type for child process stdout/stderr.

**Signature**

```ts
type CommandOutput =
  | "pipe"
  | "inherit"
  | "ignore"
  | "overlapped"
  | Sink.Sink<Uint8Array, Uint8Array, never, PlatformError.PlatformError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L163)

Since v4.0.0

## Encoding (type alias)

The encoding format to use for binary data.

**Signature**

```ts
type Encoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "utf-16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L221)

Since v4.0.0

## PipeFromOption (type alias)

Specifies which stream to pipe from the source subprocess.

**Details**

- `"stdout"`: Pipe stdout from the source (default)
- `"stderr"`: Pipe stderr from the source
- `"all"`: Pipe both stdout and stderr interleaved
- `` `fd${number}` ``: Pipe from a custom file descriptor (e.g., `"fd3"`)

**Signature**

```ts
type PipeFromOption = "stdout" | "stderr" | "all" | `fd${number}`
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L88)

Since v4.0.0

## PipeToOption (type alias)

Specifies which input to pipe to on the destination subprocess.

**Details**

- `"stdin"`: Pipe to stdin of the destination (default)
- `` `fd${number}` ``: Pipe to a custom file descriptor (e.g., `"fd3"`)

**Signature**

```ts
type PipeToOption = "stdin" | `fd${number}`
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L101)

Since v4.0.0

## PipedCommand (interface)

A pipeline of commands where the output of one is piped to the input of the
next.

**Signature**

```ts
export interface PipedCommand extends Effect.Effect<
  ChildProcessHandle,
  PlatformError.PlatformError,
  ChildProcessSpawner | Scope.Scope
> {
  readonly _tag: "PipedCommand"
  readonly left: Command
  readonly right: Command
  readonly options: PipeOptions
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L62)

Since v4.0.0

## Signal (type alias)

A signal that can be sent to a child process.

**Signature**

```ts
type Signal =
  | "SIGABRT"
  | "SIGALRM"
  | "SIGBUS"
  | "SIGCHLD"
  | "SIGCONT"
  | "SIGFPE"
  | "SIGHUP"
  | "SIGILL"
  | "SIGINT"
  | "SIGIO"
  | "SIGIOT"
  | "SIGKILL"
  | "SIGPIPE"
  | "SIGPOLL"
  | "SIGPROF"
  | "SIGPWR"
  | "SIGQUIT"
  | "SIGSEGV"
  | "SIGSTKFLT"
  | "SIGSTOP"
  | "SIGSYS"
  | "SIGTERM"
  | "SIGTRAP"
  | "SIGTSTP"
  | "SIGTTIN"
  | "SIGTTOU"
  | "SIGUNUSED"
  | "SIGURG"
  | "SIGUSR1"
  | "SIGUSR2"
  | "SIGVTALRM"
  | "SIGWINCH"
  | "SIGXCPU"
  | "SIGXFSZ"
  | "SIGBREAK"
  | "SIGLOST"
  | "SIGINFO"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L176)

Since v4.0.0

## StandardCommand (interface)

A standard command with pre-parsed command and arguments.

**Signature**

```ts
export interface StandardCommand extends Effect.Effect<
  ChildProcessHandle,
  PlatformError.PlatformError,
  ChildProcessSpawner | Scope.Scope
> {
  readonly _tag: "StandardCommand"
  readonly command: string
  readonly args: ReadonlyArray<string>
  readonly options: CommandOptions
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L42)

Since v4.0.0

## StderrConfig (interface)

Configuration for the child process standard error stream.

**Signature**

```ts
export interface StderrConfig {
  /**
   * The configuration for the standard error stream of the child process.
   *
   * **Details**
   *
   * Can be a string indicating how the operating system should configure the
   * pipe established between the child process `stderr` and the parent process.
   *
   * A `Sink` can also be passed, which will receive all elements produced by
   * the `stderr` of the child process.
   *
   * Defaults to "pipe".
   */
  readonly stream?: CommandOutput | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L316)

Since v4.0.0

## StdinConfig (interface)

Configuration for the child process standard input stream.

**Signature**

```ts
export interface StdinConfig {
  /**
   * The configuration for the standard input stream of the child process.
   *
   * **Details**
   *
   * Can be a string indicating how the operating system should configure the
   * pipe established between the child process `stdin` and the parent process.
   *
   * Can also be a `Stream`, which will pipe all elements produced into the
   * `stdin` of the child process.
   *
   * Defaults to "pipe".
   */
  readonly stream: CommandInput
  /**
   * Whether or not the child process `stdin` should be closed after the input
   * stream is finished. Defaults to `true`.
   */
  readonly endOnDone?: boolean | undefined
  /**
   * The buffer encoding to use to decode string chunks. Defaults to `utf-8`.
   */
  readonly encoding?: Encoding | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L261)

Since v4.0.0

## StdoutConfig (interface)

Configuration for the child process standard output stream.

**Signature**

```ts
export interface StdoutConfig {
  /**
   * The configuration for the standard output stream of the child process.
   *
   * **Details**
   *
   * Can be a string indicating how the operating system should configure the
   * pipe established between the child process `stdout` and the parent process.
   *
   * A `Sink` can also be passed, which will receive all elements produced by
   * the `stdout` of the child process.
   *
   * Defaults to "pipe".
   */
  readonly stream?: CommandOutput | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L293)

Since v4.0.0

## TemplateExpression (type alias)

Template expression type for interpolated values.

**Signature**

```ts
type TemplateExpression = TemplateExpressionItem | ReadonlyArray<TemplateExpressionItem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L488)

Since v4.0.0

## TemplateExpressionItem (type alias)

Valid template expression item types.

**Signature**

```ts
type TemplateExpressionItem = string | number | boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L480)

Since v4.0.0

# options

## CommandOptions (interface)

Options for command execution.

**Signature**

````ts
export interface CommandOptions extends KillOptions {
  /**
   * The current working directory of the child process.
   */
  readonly cwd?: string | undefined
  /**
   * The environment of the child process.
   *
   * **Details**
   *
   * If `extendEnv` is set to `true`, the value of `env` will be merged with
   * the value of `globalThis.process.env`, prioritizing the values in `env`
   * when conflicts exist.
   */
  readonly env?: Record<string, string | undefined> | undefined
  /**
   * If set to `true`, the child process uses both the values in `env` as well
   * as the values in `globalThis.process.env`, prioritizing the values in `env`
   * when conflicts exist.
   *
   * **Details**
   *
   * If set to `false`, only the value of `env` is used.
   */
  readonly extendEnv?: boolean | undefined
  /**
   * If set to `true`, runs the command inside of a shell, defaulting to `/bin/sh`
   * on UNIX systems and `cmd.exe` on Windows.
   *
   * **Details**
   *
   * Can also be set to a string representing the absolute path to a shell to
   * use on the system.
   *
   * **Gotchas**
   *
   * It is generally disadvised to use this option.
   */
  readonly shell?: boolean | string | undefined
  /**
   * If set to `true`, the child process will run independently of the parent
   * process.
   *
   * **Details**
   *
   * The specific behavior of this option depends upon the platform. For
   * example, the NodeJS documentation outlines the differences between Windows
   * and non-Windows platforms.
   *
   * See https://nodejs.org/api/child_process.html#child_process_options_detached.
   *
   * Defaults to `true` on non-Windows platforms and `false` on Windows platforms.
   */
  readonly detached?: boolean | undefined
  /**
   * Configuration options for the standard input stream for the child process.
   */
  readonly stdin?: CommandInput | StdinConfig | undefined
  /**
   * Configuration options for the standard output stream for the child process.
   */
  readonly stdout?: CommandOutput | StdoutConfig | undefined
  /**
   * Configuration options for the standard error stream for the child process.
   */
  readonly stderr?: CommandOutput | StderrConfig | undefined
  /**
   * Additional file descriptors to expose to the child process beyond `stdin` /
   * `stdout` / `stderr`.
   *
   * **Details**
   *
   * Keys must be in the format `"fd3"`, `"fd4"`, etc. with a file descriptor
   * index >= 3.
   *
   * The file descriptor index is determined by the numeric suffix (i.e. `fd3`
   * has a file descriptor index of 3).
   *
   * **Example** (Configuring additional file descriptors)
   *
   * ```ts
   * import { ChildProcess } from "effect/unstable/process"
   *
   * // Output fd3 - read data from child
   * const cmd1 = ChildProcess.make("my-program", [], {
   *   additionalFds: {
   *     fd3: { type: "output" }
   *   }
   * })
   *
   * // Input fd3 - write data to child
   * const cmd2 = ChildProcess.make("my-program", [], {
   *   additionalFds: {
   *     fd3: { type: "input" }
   *   }
   * })
   * ```
   */
  readonly additionalFds?: Record<`fd${number}`, AdditionalFdConfig> | undefined
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L373)

Since v4.0.0

## KillOptions (interface)

Options that can be used to control how a child process is terminated.

**Signature**

```ts
export interface KillOptions {
  /**
   * The default signal used to terminate the child process. Defaults to `"SIGTERM"`.
   */
  readonly killSignal?: Signal | undefined
  /**
   * The duration of time to wait after the child process has been terminated
   * before forcefully killing the child process by sending it the `"SIGKILL"`
   * signal. Defaults to `undefined`, which means that no timeout will be
   * enforced by default.
   */
  readonly forceKillAfter?: Duration.Input | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L241)

Since v4.0.0

## PipeOptions (interface)

Options for controlling how commands are piped together.

**Example** (Piping stderr between commands)

```ts
import { ChildProcess } from "effect/unstable/process"

// Pipe stderr instead of stdout
const pipeline = ChildProcess.make`my-program`.pipe(
  ChildProcess.pipeTo(ChildProcess.make`grep error`, { from: "stderr" })
)
```

**Signature**

```ts
export interface PipeOptions {
  /**
   * Which stream to pipe from the source subprocess.
   *
   * **Details**
   *
   * - `"stdout"` (default): Pipe stdout from the source
   * - `"stderr"`: Pipe stderr from the source
   * - `"all"`: Pipe both stdout and stderr interleaved
   * - `"fd3"`, `"fd4"`, etc.: Pipe from a custom file descriptor
   */
  readonly from?: PipeFromOption | undefined

  /**
   * Which input to pipe to on the destination subprocess.
   *
   * **Details**
   *
   * - `"stdin"` (default): Pipe to stdin of the destination
   * - `"fd3"`, `"fd4"`, etc.: Pipe to a custom file descriptor
   */
  readonly to?: PipeToOption | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcess.ts#L120)

Since v4.0.0
