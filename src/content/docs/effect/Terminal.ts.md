---
title: Terminal.ts
nav_order: 119
parent: "effect"
---

## Terminal.ts overview

Service definition for interactive terminal capabilities. Programs can query
terminal dimensions, read a line of input, receive low-level key events, and
display text without depending directly on a specific platform implementation.

This module defines the `Terminal` service, input event shapes, key metadata,
the `QuitError` used when a user cancels input, a guard for that error, and a
constructor for custom terminal service implementations.

Since v4.0.0

---

## Exports Grouped by Category

- [QuitError](#quiterror)
  - [QuitError (class)](#quiterror-class)
    - [[QuitErrorTypeId] (property)](#quiterrortypeid-property)
- [constructors](#constructors)
  - [make](#make)
- [guards](#guards)
  - [isQuitError](#isquiterror)
- [models](#models)
  - [Key (interface)](#key-interface)
  - [Terminal (interface)](#terminal-interface)
  - [UserInput (interface)](#userinput-interface)
- [services](#services)
  - [Terminal](#terminal)

---

# QuitError

## QuitError (class)

Represents an error that occurs when a user attempts to
quit out of a `Terminal` prompt for input (usually by entering `ctrl`+`c`).

**When to use**

Use when implementing terminal input or prompts that need to signal
user-requested cancellation through the typed error channel.

**See**

- `isQuitError` for checking unknown errors when handling terminal cancellation

**Signature**

```ts
declare class QuitError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L124)

Since v4.0.0

### [QuitErrorTypeId] (property)

Marks this value as a terminal quit error for runtime guards.

**Signature**

```ts
readonly [QuitErrorTypeId]: "effect/platform/Terminal/QuitError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L132)

Since v4.0.0

# constructors

## make

Creates a `Terminal` service implementation.

**When to use**

Use to construct a custom `Terminal` service implementation from concrete
terminal capabilities when writing a platform adapter, test implementation,
or custom runtime service.

**Details**

The implementation object supplies `columns`, `rows`, `readInput`,
`readLine`, and `display`; `make` attaches the `Terminal` service marker so
the result can be provided through the `Terminal` context service.

**Signature**

```ts
declare const make: (impl: Omit<Terminal, typeof TypeId>) => Terminal
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L186)

Since v4.0.0

# guards

## isQuitError

Returns `true` if the provided value is a `Terminal.QuitError`.

**When to use**

Use to narrow unknown failures to `QuitError` when handling terminal input
cancellation.

**Details**

Returns `true` when the value carries the `QuitError` runtime marker and
narrows it to `QuitError`.

**See**

- `QuitError` for the error value produced when terminal input is quit

**Signature**

```ts
declare const isQuitError: (u: unknown) => u is QuitError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L153)

Since v4.0.0

# models

## Key (interface)

Keyboard key metadata for terminal input, including the key name and
modifier state.

**Signature**

```ts
export interface Key {
  /**
   * The name of the key being pressed.
   */
  readonly name: string
  /**
   * If set to `true`, then the user is also holding down the `Ctrl` key.
   */
  readonly ctrl: boolean
  /**
   * If set to `true`, then the user is also holding down the `Meta` key.
   */
  readonly meta: boolean
  /**
   * If set to `true`, then the user is also holding down the `Shift` key.
   */
  readonly shift: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L64)

Since v4.0.0

## Terminal (interface)

A `Terminal` represents a command-line interface which can read input from a
user and display messages to a user.

**Signature**

```ts
export interface Terminal {
  readonly [TypeId]: typeof TypeId

  /**
   * The number of columns available on the platform's terminal interface.
   */
  readonly columns: Effect.Effect<number>
  /**
   * The number of rows available on the platform's terminal interface.
   */

  readonly rows: Effect.Effect<number>
  /**
   * Reads input events from the default standard input.
   */
  readonly readInput: Effect.Effect<Queue.Dequeue<UserInput, Cause.Done>, never, Scope.Scope>
  /**
   * Reads a single line from the default standard input.
   */
  readonly readLine: Effect.Effect<string, QuitError>
  /**
   * Displays text to the default standard output.
   */
  readonly display: (text: string) => Effect.Effect<void, PlatformError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L31)

Since v4.0.0

## UserInput (interface)

A terminal input event containing an optional raw character and the parsed
key that was pressed.

**When to use**

Use when consuming low-level terminal input events from `Terminal.readInput`
and you need both raw character input and parsed key metadata.

**See**

- `Key` for the parsed key metadata stored on each input event

**Signature**

```ts
export interface UserInput {
  /**
   * The character read from the user (if any).
   */
  readonly input: Option.Option<string>
  /**
   * The key that the user pressed.
   */
  readonly key: Key
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L97)

Since v4.0.0

# services

## Terminal

Service tag for command-line input and output services.

**When to use**

Use to access or provide platform terminal capabilities such as reading
input, writing output, and inspecting terminal dimensions.

**Signature**

```ts
declare const Terminal: Context.Service<Terminal, Terminal>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Terminal.ts#L166)

Since v4.0.0
