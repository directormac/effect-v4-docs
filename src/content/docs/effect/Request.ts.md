---
title: Request.ts
nav_order: 91
parent: "effect"
---

## Request.ts overview

Typed request values for data loading with `Effect.request`.

A request describes one logical piece of work without performing it. It
records the success type, typed error, service requirements, and fields a
resolver needs to complete the request. Requests are paired with
`RequestResolver`, which performs backend-specific loading and completes each
pending request entry with a success, failure, cause, exit, or effect.

Since v2.0.0

---

## Exports Grouped by Category

- [completion](#completion)
  - [complete](#complete)
  - [completeEffect](#completeeffect)
  - [fail](#fail)
  - [failCause](#failcause)
  - [succeed](#succeed)
- [constructors](#constructors)
  - [Class](#class)
  - [TaggedClass](#taggedclass)
  - [of](#of)
  - [tagged](#tagged)
- [entry](#entry)
  - [Entry (interface)](#entry-interface)
  - [makeEntry](#makeentry)
- [guards](#guards)
  - [isRequest](#isrequest)
- [models](#models)
  - [Any (type alias)](#any-type-alias)
  - [Constructor (interface)](#constructor-interface)
  - [Request (interface)](#request-interface)
  - [Variance (interface)](#variance-interface)
- [prototypes](#prototypes)
  - [RequestPrototype](#requestprototype)
- [utility types](#utility-types)
  - [Error (type alias)](#error-type-alias)
  - [Result (type alias)](#result-type-alias)
  - [Services (type alias)](#services-type-alias)
  - [Success (type alias)](#success-type-alias)

---

# completion

## complete

Completes a request entry with the provided result.

**When to use**

Use when you need to finish a `Request.Entry` with a prebuilt final `Exit`
result.

**See**

- `completeEffect` for completing an entry from an effect that may succeed or fail
- `succeed` for completing an entry with a successful value
- `fail` for completing an entry with a typed failure
- `failCause` for completing an entry with a failure `Cause`

**Signature**

```ts
declare const complete: {
  <A extends Any>(result: Result<A>): (self: Entry<A>) => Effect.Effect<void>
  <A extends Any>(self: Entry<A>, result: Result<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L428)

Since v2.0.0

## completeEffect

Completes a request entry with the result of an effect.

**When to use**

Use to finish a `Request.Entry` by running an effect whose success or typed
failure should become the request result.

**Details**

If the effect succeeds, the entry is completed successfully with its value.
If the effect fails, the entry is completed with that failure.

**Gotchas**

The returned effect itself does not fail with the request error.

**See**

- `complete` for completing an entry with a prebuilt `Exit`
- `succeed` for completing an entry with a successful value
- `fail` for completing an entry with a typed failure
- `failCause` for completing an entry with a failure `Cause`

**Signature**

```ts
declare const completeEffect: {
  <A extends Any, R>(effect: Effect.Effect<Success<A>, Error<A>, R>): (self: Entry<A>) => Effect.Effect<void, never, R>
  <A extends Any, R>(self: Entry<A>, effect: Effect.Effect<Success<A>, Error<A>, R>): Effect.Effect<void, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L462)

Since v2.0.0

## fail

Completes a request entry with a typed failure.

**When to use**

Use to report a request-specific typed error while implementing a
`RequestResolver`.

**See**

- `failCause` for completing an entry with a full `Cause`
- `complete` for completing an entry with an existing `Exit`
- `completeEffect` for completing an entry from an effect result
- `succeed` for completing an entry successfully

**Signature**

```ts
declare const fail: {
  <A extends Any>(error: Error<A>): (self: Entry<A>) => Effect.Effect<void>
  <A extends Any>(self: Entry<A>, error: Error<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L490)

Since v2.0.0

## failCause

Completes a request entry with a failure `Cause`.

**When to use**

Use when you need a `RequestResolver` to complete an entry with structured
cause information rather than only the request's typed error value.

**See**

- `fail` for completing an entry with a typed error value
- `complete` for completing an entry with an existing `Exit`
- `completeEffect` for completing an entry from an effect result
- `succeed` for completing an entry successfully

**Signature**

```ts
declare const failCause: {
  <A extends Any>(cause: Cause.Cause<Error<A>>): (self: Entry<A>) => Effect.Effect<void>
  <A extends Any>(self: Entry<A>, cause: Cause.Cause<Error<A>>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L514)

Since v2.0.0

## succeed

Completes a request entry successfully with the supplied value.

**When to use**

Use when you need to finish a `Request.Entry` with a successful request
value.

**See**

- `complete` for completing an entry with a prebuilt `Exit`
- `completeEffect` for completing an entry from an effect result
- `fail` for completing an entry with a typed failure
- `failCause` for completing an entry with a failure `Cause`

**Signature**

```ts
declare const succeed: {
  <A extends Any>(value: Success<A>): (self: Entry<A>) => Effect.Effect<void>
  <A extends Any>(self: Entry<A>, value: Success<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L539)

Since v2.0.0

# constructors

## Class

Defines request types with TypeScript classes.

**Details**

Subclasses pass their data fields to `super`, and instances are marked as
`Request` values while retaining the provided readonly fields.

**Example** (Defining request classes)

```ts
import { Request } from "effect"

class GetUser extends Request.Class<{ id: number }, string, Error> {
  constructor(readonly id: number) {
    super({ id })
  }
}

const getUserRequest = new GetUser(123)
console.log(getUserRequest.id) // 123
```

**Signature**

```ts
declare const Class: new <A extends Record<string, any>, Success, Error = never, Context = never>(
  args: Types.Equals<Omit<A, keyof Request<unknown, unknown>>, {}> extends true
    ? void
    : { readonly [P in keyof A as P extends keyof Request<any, any, any> ? never : P]: A[P] }
) => Request<Success, Error, Context> & Readonly<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L363)

Since v2.0.0

## TaggedClass

Creates a class constructor for requests with a fixed `_tag` field.

**Details**

Use this when defining class-based request types that should participate in
tagged unions or tag-based request resolvers.

**Example** (Defining tagged request classes)

```ts
import { Request } from "effect"

class GetUserById extends Request.TaggedClass("GetUserById")<{ id: number }, string, Error> {}

const request = new GetUserById({ id: 123 })
console.log(request._tag) // "GetUserById"
console.log(request.id) // 123
```

**Signature**

```ts
declare const TaggedClass: <Tag extends string>(
  tag: Tag
) => new <A extends Record<string, any>, Success, Error = never, Services = never>(
  args: Types.Equals<Omit<A, keyof Request<unknown, unknown>>, {}> extends true
    ? void
    : { readonly [P in keyof A as P extends "_tag" | keyof Request<any, any, any> ? never : P]: A[P] }
) => Request<Success, Error, Services> & Readonly<A> & { readonly _tag: Tag }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L401)

Since v2.0.0

## of

Creates a constructor function for a specific Request type.

**Example** (Creating untagged request constructors)

```ts
import { Request } from "effect"

declare const UserProfile: unique symbol
declare const ProfileError: unique symbol
type UserProfile = typeof UserProfile
type ProfileError = typeof ProfileError

interface GetUserProfile extends Request.Request<UserProfile, ProfileError> {
  readonly id: string
  readonly includeSettings: boolean
}

const GetUserProfile = Request.of<GetUserProfile>()

const request = GetUserProfile({
  id: "user-123",
  includeSettings: true
})
```

**Signature**

```ts
declare const of: <R extends Request<any, any, any>>() => Constructor<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L282)

Since v2.0.0

## tagged

Creates a constructor function for a tagged Request type. The tag is automatically
added to the request, making it useful for discriminated unions.

**Example** (Creating tagged request constructors)

```ts
import { Request } from "effect"

declare const User: unique symbol
declare const UserNotFound: unique symbol
declare const Post: unique symbol
declare const PostNotFound: unique symbol
type User = typeof User
type UserNotFound = typeof UserNotFound
type Post = typeof Post
type PostNotFound = typeof PostNotFound

interface GetUser extends Request.Request<User, UserNotFound> {
  readonly _tag: "GetUser"
  readonly id: string
}

interface GetPost extends Request.Request<Post, PostNotFound> {
  readonly _tag: "GetPost"
  readonly id: string
}

const GetUser = Request.tagged<GetUser>("GetUser")
const GetPost = Request.tagged<GetPost>("GetPost")

const userRequest = GetUser({ id: "user-123" })
const postRequest = GetPost({ id: "post-456" })

// _tag is automatically set
console.log(userRequest._tag) // "GetUser"
console.log(postRequest._tag) // "GetPost"
```

**Signature**

```ts
declare const tagged: <R extends Request<any, any, any> & { _tag: string }>(tag: R["_tag"]) => Constructor<R, "_tag">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L327)

Since v2.0.0

# entry

## Entry (interface)

A pending request handed to a `RequestResolver`.

**Details**

An entry contains the original request, the fiber context needed to run it,
an `uninterruptible` flag used by batching and caching internals, and the
`completeUnsafe` callback used by resolvers to supply the final `Exit`.

**Signature**

```ts
export interface Entry<out R> {
  readonly request: R
  readonly context: Context.Context<[R] extends [Request<infer _A, infer _E, infer _R>] ? _R : never>
  uninterruptible: boolean
  completeUnsafe(
    exit: Exit.Exit<
      [R] extends [Request<infer _A, infer _E, infer _R>] ? _A : never,
      [R] extends [Request<infer _A, infer _E, infer _R>] ? _E : never
    >
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L560)

Since v2.0.0

## makeEntry

Creates a `Request.Entry` from its component fields.

**Details**

This is a low-level helper for request runtime and resolver infrastructure;
most application code receives entries from a `RequestResolver` instead of
constructing them directly.

**Signature**

```ts
declare const makeEntry: <R>(options: {
  readonly request: R
  readonly context: Context.Context<[R] extends [Request<infer _A, infer _E, infer _R>] ? _R : never>
  readonly uninterruptible: boolean
  readonly completeUnsafe: (
    exit: Exit.Exit<
      [R] extends [Request<infer _A, infer _E, infer _R>] ? _A : never,
      [R] extends [Request<infer _A, infer _E, infer _R>] ? _E : never
    >
  ) => void
}) => Entry<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L586)

Since v2.0.0

# guards

## isRequest

Checks whether a value is a `Request`.

**Example** (Checking request values)

```ts
import { Request } from "effect"

declare const User: unique symbol
declare const UserNotFound: unique symbol
type User = typeof User
type UserNotFound = typeof UserNotFound

interface GetUser extends Request.Request<User, UserNotFound> {
  readonly _tag: "GetUser"
  readonly id: string
}
const GetUser = Request.tagged<GetUser>("GetUser")

const request = GetUser({ id: "123" })
console.log(Request.isRequest(request)) // true
console.log(Request.isRequest("not a request")) // false
```

**Signature**

```ts
declare const isRequest: (u: unknown) => u is Request<unknown, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L251)

Since v2.0.0

# models

## Any (type alias)

Alias for any `Request`, regardless of its success, error, or service
requirements.

**When to use**

Use as a generic constraint for APIs that accept any request while preserving
each concrete request's success, error, and service types.

**See**

- `Request` for the request interface
- `Success` for extracting a request's success type
- `Error` for extracting a request's error type
- `Services` for extracting a request's service requirements
- `Result` for the exit type produced by completing a request

**Signature**

```ts
type Any = Request<any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L69)

Since v4.0.0

## Constructor (interface)

The constructor type returned by `Request.of` and `Request.tagged`.

**Details**

The constructor accepts the request's data fields, excluding request variance
fields and any fields already supplied by the constructor such as `_tag`, and
returns a value of the request type.

**Example** (Using generated request constructors)

```ts
import { Request } from "effect"

interface GetUser extends Request.Request<string, Error> {
  readonly _tag: "GetUser"
  readonly id: number
}

// Constructor type is used internally by Request.of() and Request.tagged()
const GetUser = Request.tagged<GetUser>("GetUser")
const userRequest = GetUser({ id: 123 })
```

**Signature**

```ts
export interface Constructor<R extends Request<any, any, any>, T extends keyof R = never> {
  (args: Types.VoidIfEmpty<Types.Simplify<Omit<R, T | keyof Variance<any, any, any>>>>): R
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L117)

Since v2.0.0

## Request (interface)

A `Request<A, E, R>` is a request from a data source for a value of type `A`
that may fail with an `E` and have requirements of type `R`.

**Example** (Defining typed requests)

```ts
import type { Request } from "effect"

// Define a request that fetches a user by ID
interface GetUser extends Request.Request<string, Error> {
  readonly _tag: "GetUser"
  readonly id: number
}

// Define a request that fetches all users
interface GetAllUsers extends Request.Request<ReadonlyArray<string>, Error> {
  readonly _tag: "GetAllUsers"
}
```

**Signature**

```ts
export interface Request<out A, out E = never, out R = never> extends Variance<A, E, R> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L49)

Since v2.0.0

## Variance (interface)

Variance marker carried by every `Request`.

**Details**

This marker preserves the success, error, and service requirement types for
Effect's type-level machinery. Users normally get it by extending `Request`.

**Signature**

```ts
export interface Variance<out A, out E, out R> {
  readonly [TypeId]: {
    readonly _A: Types.Covariant<A>
    readonly _E: Types.Covariant<E>
    readonly _R: Types.Covariant<R>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L82)

Since v2.0.0

# prototypes

## RequestPrototype

Prototype used by Effect's request constructors.

**Details**

This low-level value provides the structural request marker for values
created by `Request.of`, `Request.tagged`, `Request.Class`, and
`Request.TaggedClass`. Most users should use those constructors instead of
interacting with the prototype directly.

**Signature**

```ts
declare const RequestPrototype: Request<any, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L219)

Since v4.0.0

# utility types

## Error (type alias)

A utility type to extract the error type from a `Request`.

**Example** (Extracting a request error type)

```ts
import type { Request } from "effect"

interface GetUser extends Request.Request<string, Error> {
  readonly id: number
}

// Extract the error type from a Request using the utility
type UserError = Request.Error<GetUser> // Error
```

**Signature**

```ts
type Error<T> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L140)

Since v2.0.0

## Result (type alias)

A utility type to extract the result type from a `Request`.

**Example** (Extracting a request result type)

```ts
import type { Request } from "effect"

interface GetUser extends Request.Request<string, Error> {
  readonly _tag: "GetUser"
  readonly id: number
}

// Extract the result type from a Request using the utility
type UserResult = Request.Result<GetUser> // Exit.Exit<string, Error>
```

**Signature**

```ts
type Result<T> = T extends Request<infer A, infer E, infer _R> ? Exit.Exit<A, E> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L194)

Since v2.0.0

## Services (type alias)

A utility type to extract the requirements type from a `Request`.

**Signature**

```ts
type Services<T> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L171)

Since v4.0.0

## Success (type alias)

A utility type to extract the value type from a `Request`.

**Example** (Extracting a request success type)

```ts
import type { Request } from "effect"

interface GetUser extends Request.Request<string, Error> {
  readonly _tag: "GetUser"
  readonly id: number
}

// Extract the success type from a Request using the utility
type UserSuccess = Request.Success<GetUser> // string
```

**Signature**

```ts
type Success<T> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Request.ts#L162)

Since v2.0.0
