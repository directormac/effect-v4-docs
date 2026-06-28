---
title: "LLMs"
---

# Effect library documentation

This documentation resides in the Effect monorepo, which contains the source
code for the Effect library and its related packages.

When you need to find any information about the Effect library, only use this
documentation and the source code found in `./packages`. Do not use
`node_modules` or any other external documentation, as it may be outdated or
incorrect.

**Note**: The examples in this documentation contain comments for illustration
purposes. In practice, you would not include these comments in your code.

## Writing `Effect` code

Prefer writing Effect code with `Effect.gen` & `Effect.fn("name")`. Then attach
additional behaviour with combinators. This style is more readable and easier to
maintain than using combinators alone.

### Using Effect.gen

Use `Effect.gen` to write code in an imperative style similar to async await.
You can use `yield*` to access the result of an effect.

```ts
import { Effect, Schema } from "effect"

Effect.gen(function*() {
  yield* Effect.log("Starting the file processing...")
  yield* Effect.log("Reading file...")

  // Always return when raising an error, to ensure typescript understands that
  // the function will not continue executing.
  return yield* new FileProcessingError({ message: "Failed to read the file" })
}).pipe(
  // Add additional functionality with .pipe
  Effect.catch((error) => Effect.logError(`An error occurred: ${error}`)),
  Effect.withSpan("fileProcessing", {
    attributes: {
      method: "Effect.gen"
    }
  })
)

// Use Schema.TaggedErrorClass to define a custom error
export class FileProcessingError extends Schema.TaggedErrorClass<FileProcessingError>()("FileProcessingError", {
  message: Schema.String
}) {}
```


### Using Effect.fn

When writing functions that return an Effect, use `Effect.fn` to use the
generator syntax.

**Avoid creating functions that return an Effect.gen**, use `Effect.fn`
instead.

```ts
import { Effect, Schema } from "effect"

// Pass a string to Effect.fn, which will improve stack traces and also
// attach a tracing span (using Effect.withSpan behind the scenes).
//
// The name string should match the function name.
//
export const effectFunction = Effect.fn("effectFunction")(
  // You can use `Effect.fn.Return` to specify the return type of the function.
  // It accepts the same type parameters as `Effect.Effect`.
  function*(n: number): Effect.fn.Return<string, SomeError> {
    yield* Effect.logInfo("Received number:", n)

    // Always return when raising an error, to ensure typescript understands that
    // the function will not continue executing.
    return yield* new SomeError({ message: "Failed to read the file" })
  },
  // Add additional functionality by passing in additional arguments.
  // **Do not** use .pipe with Effect.fn
  Effect.catch((error) => Effect.logError(`An error occurred: ${error}`)),
  Effect.annotateLogs({
    method: "effectFunction"
  })
)

// Use Schema.TaggedErrorClass to define a custom error
export class SomeError extends Schema.TaggedErrorClass<SomeError>()("SomeError", {
  message: Schema.String
}) {}
```


### Creating effects from common sources

Learn how to create effects from various sources, including plain values,
synchronous code, Promise APIs, optional values, and callback-based APIs.

```ts
import { Effect, Schema } from "effect"

class InvalidPayload extends Schema.TaggedErrorClass<InvalidPayload>()("InvalidPayload", {
  input: Schema.String,
  cause: Schema.Defect()
}) {}

class UserLookupError extends Schema.TaggedErrorClass<UserLookupError>()("UserLookupError", {
  userId: Schema.Number,
  cause: Schema.Defect()
}) {}

class MissingWorkspaceId extends Schema.TaggedErrorClass<MissingWorkspaceId>()("MissingWorkspaceId", {}) {}

// Some request fields are optional and may be absent.
const requestHeaders = new Map<string, string>([
  ["x-request-id", "req_1"]
])

// `Effect.succeed` wraps values you already have in memory.
export const fromValue = Effect.succeed({ env: "prod", retries: 3 })

// `Effect.sync` wraps synchronous side effects that should not throw.
export const fromSyncSideEffect = Effect.sync(() => Date.now())

// `Effect.try` wraps synchronous code that may throw.
export const parsePayload = Effect.fn("parsePayload")((input: string) =>
  Effect.try({
    try: () => JSON.parse(input) as { readonly userId: number },
    catch: (cause) => new InvalidPayload({ input, cause })
  })
)

const users = new Map<number, { readonly id: number; readonly name: string }>([
  [1, { id: 1, name: "Ada" }],
  [2, { id: 2, name: "Lin" }]
])

// `Effect.tryPromise` wraps Promise-based APIs that can reject or throw.
export const fetchUser = Effect.fn("fetchUser")((userId: number) =>
  Effect.tryPromise({
    async try() {
      const user = users.get(userId)
      if (!user) {
        throw new Error(`Missing user ${userId}`)
      }
      return user
    },
    catch: (cause) => new UserLookupError({ userId, cause })
  })
)

// `Effect.fromNullishOr` turns nullable values into a typed effect.
export const fromNullishHeader = Effect.fromNullishOr(requestHeaders.get("x-workspace-id")).pipe(
  Effect.mapError(() => new MissingWorkspaceId())
)

// `Effect.callback` wraps callback-style asynchronous APIs.
export const fromCallback = Effect.callback<number>((resume) => {
  const timeoutId = setTimeout(() => {
    resume(Effect.succeed(200))
  }, 10)

  // Return a finalizer so interruption can cancel the callback source.
  return Effect.sync(() => {
    clearTimeout(timeoutId)
  })
})
```

## Writing Effect services

Effect services are the most common way to structure Effect code. Prefer using
services to encapsulate behaviour over other approaches, as it ensures that your
code is modular, testable, and maintainable.

### Context.Service

The default way to define a service is to extend `Context.Service`,
passing in the service interface as a type parameter.

```ts
// file: src/db/Database.ts
import { Context, Effect, Layer, Schema } from "effect"

// Pass in the service class name as the first type parameter, and the service
// interface as the second type parameter.
export class Database extends Context.Service<Database, {
  query(sql: string): Effect.Effect<Array<unknown>, DatabaseError>
}>()(
  // The string identifier for the service, which should include the package
  // name and the subdirectory path to the service file.
  "myapp/db/Database"
) {
  // Attach a static layer to the service, which will be used to provide an
  // implementation of the service.
  static readonly layer = Layer.effect(
    Database,
    Effect.gen(function*() {
      // Define the service methods using Effect.fn
      const query = Effect.fn("Database.query")(function*(sql: string) {
        yield* Effect.log("Executing SQL query:", sql)
        return [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
      })

      // Return an instance of the service using Database.of, passing in an
      // object that implements the service interface.
      return Database.of({
        query
      })
    })
  )
}

export class DatabaseError extends Schema.TaggedErrorClass<DatabaseError>()("DatabaseError", {
  cause: Schema.Defect()
}) {}

// If you ever need to access the service type, use `Database["Service"]`
export type DatabaseService = Database["Service"]
```


### Context.Reference

For defining configuration values, feature flags, or any other service that has a default value.

```ts
import { Context } from "effect"

export const FeatureFlag = Context.Reference<boolean>("myapp/FeatureFlag", {
  defaultValue: () => false
})
```


### Composing services with the Layer module

Build focused service layers, then compose them with `Layer.provide` and
`Layer.provideMerge` based on what services you want to expose.

```ts
import { PgClient } from "@effect/sql-pg"
import { Array, Config, Context, Effect, Layer, type Option, Schema } from "effect"
import { SqlClient, SqlError } from "effect/unstable/sql"

// Define a layer for the SqlClient service
export const SqlClientLayer: Layer.Layer<
  PgClient.PgClient | SqlClient.SqlClient,
  Config.ConfigError | SqlError.SqlError
> = PgClient.layerConfig({
  url: Config.redacted("DATABASE_URL")
})

export class UserRespositoryError extends Schema.TaggedErrorClass<UserRespositoryError>()("UserRespositoryError", {
  reason: SqlError.SqlError
}) {}

export class UserRepository extends Context.Service<UserRepository, {
  findById(id: string): Effect.Effect<
    Option.Option<{ readonly id: string; readonly name: string }>,
    UserRespositoryError
  >
}>()("myapp/UserRepository") {
  // Implement the layer for the UserRepository service, which depends on the
  // SqlClient service
  static readonly layerNoDeps: Layer.Layer<
    UserRepository,
    never,
    SqlClient.SqlClient
  > = Layer.effect(
    UserRepository,
    Effect.gen(function*() {
      const sql = yield* SqlClient.SqlClient

      const findById = Effect.fn("UserRepository.findById")(function*(id: string) {
        const results = yield* sql<{
          readonly id: string
          readonly name: string
        }>`SELECT * FROM users WHERE id = '${id}'`
        return Array.head(results)
      }, Effect.mapError((reason) => new UserRespositoryError({ reason })))

      return UserRepository.of({ findById })
    })
  )

  // Use Layer.provide to compose the UserRepository layer with the SqlClient
  // layer, exposing only the UserRepository service
  static readonly layer: Layer.Layer<
    UserRepository,
    Config.ConfigError | SqlError.SqlError
  > = this.layerNoDeps.pipe(
    Layer.provide(SqlClientLayer)
  )

  // Use Layer.provideMerge to compose the UserRepository layer with the SqlClient
  // layer, exposing both the UserRepository and SqlClient services
  static readonly layerWithSqlClient: Layer.Layer<
    UserRepository | SqlClient.SqlClient,
    Config.ConfigError | SqlError.SqlError
  > = this.layerNoDeps.pipe(
    Layer.provideMerge(SqlClientLayer)
  )
}
```


### Creating Layers from configuration and/or Effects

Build a layer dynamically from an Effect / Config with `Layer.unwrap`.

```ts
import { Config, Context, Effect, Layer, Schema } from "effect"

export class MessageStoreError extends Schema.TaggedErrorClass<MessageStoreError>()("MessageStoreError", {
  cause: Schema.Defect()
}) {}

export class MessageStore extends Context.Service<MessageStore, {
  append(message: string): Effect.Effect<void>
  readonly all: Effect.Effect<ReadonlyArray<string>>
}>()("myapp/MessageStore") {
  static readonly layerInMemory = Layer.effect(
    MessageStore,
    Effect.sync(() => {
      const messages: Array<string> = []

      return MessageStore.of({
        append: (message) =>
          Effect.sync(() => {
            messages.push(message)
          }),
        all: Effect.sync(() => [...messages])
      })
    })
  )

  static readonly layerRemote = (url: URL) =>
    Layer.effect(
      MessageStore,
      Effect.try({
        try: () => {
          // In a real app this is where you would open a network connection.
          const messages: Array<string> = []

          return MessageStore.of({
            append: (message) =>
              Effect.sync(() => {
                messages.push(`[${url.host}] ${message}`)
              }),
            all: Effect.sync(() => [...messages])
          })
        },
        catch: (cause) => new MessageStoreError({ cause })
      })
    )

  static readonly layer = Layer.unwrap(
    Effect.gen(function*() {
      // Read config inside an Effect, then choose which concrete layer to use.
      const useInMemory = yield* Config.boolean("MESSAGE_STORE_IN_MEMORY").pipe(
        Config.withDefault(false)
      )

      if (useInMemory) {
        return MessageStore.layerInMemory
      }

      const remoteUrl = yield* Config.url("MESSAGE_STORE_URL")
      return MessageStore.layerRemote(remoteUrl)
    })
  )
}
```

## Error handling

### Error handling basics

Defining custom errors and handling them with Effect.catch and Effect.catchTag.

```ts
import { Effect, Schema } from "effect"

// Define custom errors using Schema.TaggedErrorClass
export class ParseError extends Schema.TaggedErrorClass<ParseError>()("ParseError", {
  input: Schema.String,
  message: Schema.String
}) {}

export class ReservedPortError extends Schema.TaggedErrorClass<ReservedPortError>()("ReservedPortError", {
  port: Schema.Number
}) {}

declare const loadPort: (input: string) => Effect.Effect<number, ParseError | ReservedPortError>

export const recovered = loadPort("80").pipe(
  // Catch multiple errors with Effect.catchTag, and return a default port number.
  Effect.catchTag(["ParseError", "ReservedPortError"], (_) => Effect.succeed(3000))
)

export const withFinalFallback = loadPort("invalid").pipe(
  // Catch a specific error with Effect.catchTag
  Effect.catchTag("ReservedPortError", (_) => Effect.succeed(3000)),
  // Catch all errors with Effect.catch
  Effect.catch((_) => Effect.succeed(3000))
)
```


### Catch multiple errors with Effect.catchTags

Use `Effect.catchTags` to handle several tagged errors in one place.

```ts
import { Effect, Schema } from "effect"

export class ValidationError extends Schema.TaggedErrorClass<ValidationError>()("ValidationError", {
  message: Schema.String
}) {}

export class NetworkError extends Schema.TaggedErrorClass<NetworkError>()("NetworkError", {
  statusCode: Schema.Number
}) {}

declare const fetchUser: (id: string) => Effect.Effect<string, ValidationError | NetworkError>

export const userOrFallback = fetchUser("123").pipe(
  Effect.catchTags({
    ValidationError: (error) => Effect.succeed(`Validation failed: ${error.message}`),
    NetworkError: (error) => Effect.succeed(`Network request failed with status ${error.statusCode}`)
  })
)
```


### Creating and handling errors with reasons

Define a tagged error with a tagged `reason` field, then recover with
`Effect.catchReason`, `Effect.catchReasons`, or by unwrapping the reason into
the error channel with `Effect.unwrapReason`.

```ts
import { Effect, Schema } from "effect"

export class RateLimitError extends Schema.TaggedErrorClass<RateLimitError>()("RateLimitError", {
  retryAfter: Schema.Number
}) {}

export class QuotaExceededError extends Schema.TaggedErrorClass<QuotaExceededError>()("QuotaExceededError", {
  limit: Schema.Number
}) {}

export class SafetyBlockedError extends Schema.TaggedErrorClass<SafetyBlockedError>()("SafetyBlockedError", {
  category: Schema.String
}) {}

export class AiError extends Schema.TaggedErrorClass<AiError>()("AiError", {
  reason: Schema.Union([RateLimitError, QuotaExceededError, SafetyBlockedError])
}) {}

declare const callModel: Effect.Effect<string, AiError>

export const handleOneReason = callModel.pipe(
  // Use `Effect.catchReason` to handle a specific reason type
  Effect.catchReason(
    "AiError", // The parent error _tag to catch
    "RateLimitError", // The reason _tag to catch
    // The handler for the caught reason
    (reason) => Effect.succeed(`Retry after ${reason.retryAfter} seconds`),
    // Optionally handle all the other reasons with a catch-all handler
    (reason) => Effect.succeed(`Model call failed for reason: ${reason._tag}`)
  )
)

export const handleMultipleReasons = callModel.pipe(
  // Use `Effect.catchReasons` to handle multiple reason types for a given error
  // in one go
  Effect.catchReasons(
    "AiError",
    {
      RateLimitError: (reason) => Effect.succeed(`Retry after ${reason.retryAfter} seconds`),
      QuotaExceededError: (reason) => Effect.succeed(`Quota exceeded at ${reason.limit} tokens`)
    }
    // Optionally handle all the other reasons with a catch-all handler
    // (reason) => Effect.succeed(`Unhandled reason: ${reason._tag}`)
  )
)

export const unwrapAndHandle = callModel.pipe(
  // Use `Effect.unwrapReason` to move the reasons into the error channel, then
  // handle them all with `Effect.catchTags` or other error handling combinators
  Effect.unwrapReason("AiError"),
  Effect.catchTags({
    RateLimitError: (reason) => Effect.succeed(`Back off for ${reason.retryAfter} seconds`),
    QuotaExceededError: (reason) => Effect.succeed(`Increase quota beyond ${reason.limit}`),
    SafetyBlockedError: (reason) => Effect.succeed(`Blocked by safety category: ${reason.category}`)
  })
)
```

## Managing resources and `Scope`s

Learn how to safely manage resources in Effect using `Scope`s and finalizers.

### Acquiring resources with Effect.acquireRelease

Define a service that uses `Effect.acquireRelease` to manage the lifecycle of
a resource, ensuring that it is properly cleaned up when the service is no
longer needed.

```ts
import { Config, Context, Effect, Layer, Redacted, Schema } from "effect"
import * as NodeMailer from "nodemailer"

export class SmtpError extends Schema.ErrorClass<SmtpError>("SmtpError")({
  cause: Schema.Defect()
}) {}

export class Smtp extends Context.Service<Smtp, {
  send(message: {
    readonly to: string
    readonly subject: string
    readonly body: string
  }): Effect.Effect<void, SmtpError>
}>()("app/Smtp") {
  static readonly layer = Layer.effect(
    Smtp,
    Effect.gen(function*() {
      const user = yield* Config.string("SMTP_USER")
      const pass = yield* Config.redacted("SMTP_PASS")

      // Use `Effect.acquireRelease` to manage the lifecycle of the SMTP
      // transporter.
      //
      // When the Layer is built, the transporter will be created. When the
      // Layer is torn down, the transporter will be closed, ensuring that
      // resources are always cleaned up properly.
      const transporter = yield* Effect.acquireRelease(
        Effect.sync(() =>
          NodeMailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false,
            auth: { user, pass: Redacted.value(pass) }
          })
        ),
        (transporter) => Effect.sync(() => transporter.close())
      )

      const send = Effect.fn("Smtp.send")((message: {
        readonly to: string
        readonly subject: string
        readonly body: string
      }) =>
        Effect.tryPromise({
          try: () =>
            transporter.sendMail({
              from: "Acme Cloud <cloud@acme.com>",
              to: message.to,
              subject: message.subject,
              text: message.body
            }),
          catch: (cause) => new SmtpError({ cause })
        }).pipe(
          Effect.asVoid
        )
      )

      return Smtp.of({ send })
    })
  )
}

// We can then use the `Smtp` service in another service, and the transporter
// will be properly managed by the Layer system.

export class MailerError extends Schema.TaggedErrorClass<MailerError>()("MailerError", {
  reason: SmtpError
}) {}

export class Mailer extends Context.Service<Mailer, {
  sendWelcomeEmail(to: string): Effect.Effect<void, MailerError>
}>()("app/Mailer") {
  static readonly layerNoDeps = Layer.effect(
    Mailer,
    Effect.gen(function*() {
      const smtp = yield* Smtp

      const sendWelcomeEmail = Effect.fn("Mailer.sendWelcomeEmail")(function*(to: string) {
        yield* smtp.send({
          to,
          subject: "Welcome to Acme Cloud!",
          body: "Thanks for signing up for Acme Cloud. We're glad to have you!"
        }).pipe(
          Effect.mapError((reason) => new MailerError({ reason }))
        )
        yield* Effect.logInfo(`Sent welcome email to ${to}`)
      })

      return Mailer.of({ sendWelcomeEmail })
    })
  )

  // Locally provide the Smtp layer to the Mailer layer, to eliminate all the
  // requirements
  static readonly layer = this.layerNoDeps.pipe(
    Layer.provide(Smtp.layer)
  )
}
```


### Creating Layers that run background tasks

Use Layer.effectDiscard to encapsulate background tasks without a service interface.

```ts
import { NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"

// Use Layer.effectDiscard when you want to create a layer that runs an effect
// but does not provide any services.
const BackgroundTask = Layer.effectDiscard(Effect.gen(function*() {
  yield* Effect.logInfo("Starting background task...")

  yield* Effect.gen(function*() {
    while (true) {
      yield* Effect.sleep("5 seconds")
      yield* Effect.logInfo("Background task running...")
    }
  }).pipe(
    Effect.onInterrupt(() => Effect.logInfo("Background task interrupted: layer scope closed")),
    Effect.forkScoped
  )
}))

// Run the background task layer. It will start when the layer is launched and
// will be automatically interrupted when the layer scope is closed (e.g. when
// the program exits).
BackgroundTask.pipe(
  Layer.launch,
  NodeRuntime.runMain
)
```


### Dynamic resources with LayerMap

Use `LayerMap.Service` to dynamically build and manage resources that are
keyed by some identifier, such as a tenant ID.

```ts
import { Context, Effect, Layer, LayerMap, Schema } from "effect"

class DatabaseQueryError extends Schema.TaggedErrorClass<DatabaseQueryError>()("DatabaseQueryError", {
  tenantId: Schema.String,
  cause: Schema.Defect()
}) {}

type UserRecord = {
  readonly id: number
  readonly email: string
}

let nextConnectionId = 0

export class DatabasePool extends Context.Service<DatabasePool, {
  readonly tenantId: string
  readonly connectionId: number
  readonly query: (sql: string) => Effect.Effect<ReadonlyArray<UserRecord>, DatabaseQueryError>
}>()("app/DatabasePool") {
  // A layer factory that builds one pool per tenant.
  static readonly layer = (tenantId: string) =>
    Layer.effect(
      DatabasePool,
      Effect.acquireRelease(
        Effect.sync(() => {
          const connectionId = ++nextConnectionId

          return DatabasePool.of({
            tenantId,
            connectionId,
            query: Effect.fn("DatabasePool.query")((_sql: string) =>
              Effect.succeed([
                { id: 1, email: `admin@${tenantId}.example.com` },
                { id: 2, email: `ops@${tenantId}.example.com` }
              ])
            )
          })
        }),
        (pool) => Effect.logInfo(`Closing tenant pool ${pool.tenantId}#${pool.connectionId}`)
      )
    )
}

// extend `LayerMap.Service` to create a `LayerMap` service
export class PoolMap extends LayerMap.Service<PoolMap>()("app/PoolMap", {
  // `lookup` tells LayerMap how to build a layer for each tenant key.
  lookup: (tenantId: string) => DatabasePool.layer(tenantId),

  // You can also use the layers option for a static set of layers
  // layers: {
  //   acme: DatabasePool.layer("acme"),
  //   globex: DatabasePool.layer("globex")
  // },

  // If a pool is not used for this duration, it is released automatically.
  idleTimeToLive: "1 minute"
}) {}

const queryUsersForCurrentTenant = Effect.gen(function*() {
  // Run a query agnostic of the tenant. The correct pool will be provided by
  // the LayerMap.
  const pool = yield* DatabasePool
  return yield* pool.query("SELECT id, email FROM users ORDER BY id")
})

export const program = Effect.gen(function*() {
  yield* queryUsersForCurrentTenant.pipe(
    // Use `PoolMap.get` to access the pool for a specific tenant. The first
    // time this is called for a tenant, the pool will be built using the
    // `lookup` function defined in `PoolMap`. Subsequent calls will reuse the
    // cached pool until it is idle for too long or invalidated.
    Effect.provide(PoolMap.get("acme"))
  )

  // `PoolMap.invalidate` forces a key to rebuild on the next access.
  yield* PoolMap.invalidate("acme")
}).pipe(
  // Provide the `PoolMap` layer to the entire program.
  Effect.provide(PoolMap.layer)
)
```

## Running Effect programs

### Running effects with NodeRuntime and BunRuntime

Use `NodeRuntime.runMain` to run an Effect program as your process entrypoint.

```ts
import { BunRuntime } from "@effect/platform-bun"
import { NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"

const Worker = Layer.effectDiscard(Effect.gen(function*() {
  yield* Effect.logInfo("Starting worker...")
  yield* Effect.forkScoped(Effect.gen(function*() {
    while (true) {
      yield* Effect.logInfo("Working...")
      yield* Effect.sleep("1 second")
    }
  }))
}))

const program = Layer.launch(Worker)

// `runMain` installs SIGINT / SIGTERM handlers and interrupts running fibers
// for graceful shutdown.
NodeRuntime.runMain(program, {
  // Disable automatic error reporting if your app already centralizes it.
  disableErrorReporting: true
})

// Bun has the same API shape:
BunRuntime.runMain(program, { disableErrorReporting: true })
```


### Using Layer.launch as the application entry point

Use `Layer.launch` to run a long-running Effect program as your process entrypoint.

```ts
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { HttpRouter, HttpServerResponse } from "effect/unstable/http"
import { createServer } from "node:http"

// Build a tiny HTTP app with a health-check endpoint.
export const HealthRoutes = HttpRouter.use(Effect.fn(function*(router) {
  yield* router.add("GET", "/health", Effect.succeed(HttpServerResponse.text("ok")))
  yield* router.add("GET", "/healthz", Effect.succeed(HttpServerResponse.text("ok")))
}))

// Turn the routes into a server layer and provide the Node HTTP server backend.
export const HttpServerLive = HttpRouter.serve(HealthRoutes).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
)

// `Layer.launch` converts the layer into a long-running Effect<never>.
export const main = Layer.launch(HttpServerLive)

// This entrypoint pattern works well when the whole app is represented as
// layers (for example: HTTP server + background workers).
NodeRuntime.runMain(main)
```

## Broadcasting messages with PubSub

Use `PubSub` when you need one producer to fan out messages to many consumers.

### Broadcasting domain events with PubSub

Build an in-process event bus with `PubSub` and expose it as a service.

```ts
import { Context, Effect, Layer, PubSub, Stream } from "effect"

export type OrderEvent =
  | { readonly _tag: "OrderPlaced"; readonly orderId: string }
  | { readonly _tag: "PaymentCaptured"; readonly orderId: string }
  | { readonly _tag: "OrderShipped"; readonly orderId: string }

export class OrderEvents extends Context.Service<OrderEvents, {
  publish(event: OrderEvent): Effect.Effect<void>
  publishAll(events: ReadonlyArray<OrderEvent>): Effect.Effect<void>
  readonly subscribe: Stream.Stream<OrderEvent>
}>()("acme/OrderEvents") {
  static readonly layer = Layer.effect(
    OrderEvents,
    Effect.gen(function*() {
      // Use PubSub.bounded to create a PubSub with backpressure support.
      // You can also use PubSub.unbounded if you don't need backpressure.
      const pubsub = yield* PubSub.bounded<OrderEvent>({
        capacity: 256,
        // Optionally add a replay buffer to let late subscribers catch up on
        // recent events after restarts.
        replay: 50
      })

      // Ensure the PubSub is properly shut down when the service is no longer
      // needed.
      yield* Effect.addFinalizer(() => PubSub.shutdown(pubsub))

      const publish = Effect.fn("OrderEvents.publish")(function*(event: OrderEvent) {
        yield* PubSub.publish(pubsub, event)
      })

      const publishAll = Effect.fn("OrderEvents.publishAll")(function*(events: ReadonlyArray<OrderEvent>) {
        yield* PubSub.publishAll(pubsub, events)
      })

      // Create a Stream that emits events published to the PubSub.
      //
      // Each subscriber will receive all events published after they subscribe,
      // and if a replay buffer is configured, they will also receive the most
      // recent events that were published before they subscribed.
      const subscribe = Stream.fromPubSub(pubsub)

      return OrderEvents.of({
        publish,
        publishAll,
        subscribe
      })
    })
  )
}
```

## Working with Streams

Effect Streams represent effectful, pull-based sequences of values over time.
They let you model finite or infinite data sources.

### Creating streams from common data sources

Learn how to create streams from various data sources. Includes:

- `Stream.fromIterable` for arrays and other iterables
- `Stream.fromEffectSchedule` for polling effects
- `Stream.paginate` for paginated APIs
- `Stream.fromAsyncIterable` for async iterables
- `Stream.fromEventListener` for DOM events
- `Stream.callback` for any callback-based API
- `NodeStream.fromReadable` for Node.js readable streams

```ts
import { NodeStream } from "@effect/platform-node"
import { Array, Effect, Queue, Schedule, Schema, Stream } from "effect"
import * as Option from "effect/Option"
import { Readable } from "node:stream"

// `Stream.fromIterable` turns any iterable into a stream.
export const numbers = Stream.fromIterable<number>([1, 2, 3, 4, 5])

// `Stream.fromEffectSchedule` turns a single effect into a polling stream.
// This is useful for metrics, health checks, and cache refresh loops.
export const samples = Stream.fromEffectSchedule(
  Effect.succeed(3),
  Schedule.spaced("30 seconds")
).pipe(
  // Stream.take limits the number of elements emitted by the stream.
  Stream.take(3)
)

// Use `Stream.paginate` when reading APIs that return one page at a time.
// The function returns the current page of values and optionally the next
// cursor.
export const fetchJobsPage = Stream.paginate(
  0, // start with page 0 (the cursor)
  Effect.fn(function*(page) {
    // Simulate network latency
    yield* Effect.sleep("50 millis")

    const results = Array.range(0, 100).map((i) => `Job ${i + 1 + page * 100}`)

    // only return 10 pages of results
    const nextPage = page <= 10
      ? Option.some(page + 1)
      : Option.none()

    return [results, nextPage] as const
  })
)

class LetterError extends Schema.TaggedErrorClass<LetterError>()("LetterError", {
  cause: Schema.Defect()
}) {}

async function* asyncIterable() {
  yield "a"
  yield "b"
  yield "c"
}

// Create a stream from an async iterable.
// The second argument is a function that converts any errors thrown by the
// async iterable into a typed error.
export const letters = Stream.fromAsyncIterable(
  asyncIterable(),
  (cause) => new LetterError({ cause })
)

const button = document.getElementById("my-button")!

// `Stream.fromEventListener` creates a stream from an event listener.
export const events = Stream.fromEventListener<PointerEvent>(button, "click")

// You can also use `Stream.callback` to create a stream from any callback-based
// API.
export const callbackStream = Stream.callback<PointerEvent>(Effect.fn(function*(queue) {
  // You can use the `Queue` apis to emit values into the stream from the
  // callback.
  function onEvent(event: PointerEvent) {
    Queue.offerUnsafe(queue, event)
  }
  // register the event listener and add a finalizer to unregister it when the
  // stream is finished.
  yield* Effect.acquireRelease(
    Effect.sync(() => button.addEventListener("click", onEvent)),
    () => Effect.sync(() => button.removeEventListener("click", onEvent))
  )
}))

export class NodeStreamError extends Schema.TaggedErrorClass<NodeStreamError>()("NodeStreamError", {
  cause: Schema.Defect()
}) {}

// Create a stream from a Node.js readable stream.
//
// It takes options to convert any errors emitted by the stream into a typed
// error, and to evaluate the stream lazily.
export const nodeStream = NodeStream.fromReadable({
  evaluate: () => Readable.from(["Hello", " ", "world", "!"]),
  onError: (cause) => new NodeStreamError({ cause }),
  closeOnDone: true // true by default
})
```


### Consuming and transforming streams

How to transform and consume streams using operators like `map`, `flatMap`, `filter`, `mapEffect`, and various `run*` methods.

```ts
import { Effect, Sink, Stream } from "effect"

interface Order {
  readonly id: string
  readonly customerId: string
  readonly status: "paid" | "refunded"
  readonly subtotalCents: number
  readonly shippingCents: number
  readonly country: "US" | "CA" | "NZ"
}

interface NormalizedOrder extends Order {
  readonly totalCents: number
}

interface EnrichedOrder extends NormalizedOrder {
  readonly taxCents: number
  readonly grandTotalCents: number
  readonly priority: "normal" | "high"
}

// Start with structured order events from an in-memory source.
export const orderEvents = Stream.succeed<Order>({
  id: "ord_1001",
  customerId: "cus_1",
  status: "paid",
  subtotalCents: 4_500,
  shippingCents: 500,
  country: "US"
})

// Use `Stream.map` for pure per-element transforms.
export const normalizedOrders = orderEvents.pipe(
  Stream.map((order): NormalizedOrder => ({
    ...order,
    totalCents: order.subtotalCents + order.shippingCents
  }))
)

// `Stream.filter` lets you exclude elements that don't match a predicate.
export const paidOrders = normalizedOrders.pipe(
  Stream.filter((order) => order.status === "paid")
)

// Use `Stream.flatMap` to transform each element into a stream, and flatten the
// results.
export const allOrders = Stream.make("US", "CA", "NZ").pipe(
  Stream.flatMap(
    (country) =>
      Stream.range(1, 50).pipe(
        Stream.map((i): Order => ({
          id: `ord_${country}_${i}`,
          customerId: `cus_${i}`,
          status: i % 10 === 0 ? "refunded" : "paid",
          subtotalCents: Math.round(Math.random() * 100_000),
          shippingCents: Math.round(Math.random() * 10_000),
          country
        }))
      ),
    // Optionally control the concurrency of the flatMap with the second argument.
    { concurrency: 2 }
  )
)

const enrichOrder = Effect.fn(function*(order: NormalizedOrder): Effect.fn.Return<EnrichedOrder> {
  // Simulate effectful enrichment (for example, tax/risk lookup).
  yield* Effect.sleep("5 millis")

  const taxRate = order.country === "US" ? 0.08 : 0.13
  const taxCents = Math.round(order.totalCents * taxRate)

  return {
    ...order,
    taxCents,
    grandTotalCents: order.totalCents + taxCents,
    priority: order.totalCents >= 20_000 ? "high" : "normal"
  }
})

// `Stream.mapEffect` performs effectful per-element transforms with concurrency control.
export const enrichedPaidOrders = paidOrders.pipe(
  Stream.mapEffect(enrichOrder, { concurrency: 4 })
)

// `runCollect` gathers all stream outputs into an immutable array.
export const collectedOrders = Stream.runCollect(enrichedPaidOrders)

// `runDrain` runs the stream for its effects, ignoring all outputs.
export const drained = Stream.runDrain(enrichedPaidOrders)

// `runForEach` executes an effectful consumer for every element.
export const logOrders = enrichedPaidOrders.pipe(
  Stream.runForEach((order) => Effect.logInfo(`Order ${order.id} total=$${(order.grandTotalCents / 100).toFixed(2)}`))
)

// `runFold` reduces the stream to one accumulated value.
export const totalRevenueCents = enrichedPaidOrders.pipe(
  Stream.runFold(() => 0, (acc: number, order) => acc + order.grandTotalCents)
)

// `run` lets you consume a stream through any Sink.
export const totalRevenueViaSink = enrichedPaidOrders.pipe(
  Stream.map((order) => order.grandTotalCents),
  Stream.run(Sink.sum)
)

// `runHead` and `runLast` capture edge elements as Option values.
export const firstLargeOrder = enrichedPaidOrders.pipe(
  Stream.filter((order) => order.priority === "high"),
  Stream.runHead
)

export const lastLargeOrder = enrichedPaidOrders.pipe(
  Stream.filter((order) => order.priority === "high"),
  Stream.runLast
)

// Windowing-style operators help shape what downstream consumers see.
export const firstTwoOrders = enrichedPaidOrders.pipe(
  Stream.take(2),
  Stream.runCollect
)

export const afterWarmupOrder = enrichedPaidOrders.pipe(
  Stream.drop(1),
  Stream.runCollect
)

export const untilLargeOrder = enrichedPaidOrders.pipe(
  Stream.takeWhile((order) => order.priority === "normal"),
  Stream.runCollect
)
```


### Decoding and encoding streams

Use `Stream.pipeThroughChannel` with the `Ndjson` & `Msgpack` modules to
decode and encode streams of structured data.

```ts
import { DateTime, Schema, Stream } from "effect"
import { Msgpack, Ndjson } from "effect/unstable/encoding"

// All of the examples below can also be done with Msgpack by replacing `Ndjson`
// with `Msgpack` and using the appropriate channels (`Msgpack.decode()`,
// `Msgpack.encode()`, etc.).
export const msgpackDecoder = Msgpack.decodeSchema(Schema.Struct({
  id: Schema.Number,
  name: Schema.String
}))

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

// A log entry schema representing structured log events. In practice these
// would come from a file, HTTP body, or socket connection.
// `DateTimeUtcFromString` decodes an ISO-8601 string into a `DateTime.Utc`.
class LogEntry extends Schema.Class<LogEntry>("LogEntry")({
  timestamp: Schema.DateTimeUtcFromString,
  level: Schema.Literals(["info", "warn", "error"]),
  message: Schema.String
}) {}

// ---------------------------------------------------------------------------
// Decoding NDJSON strings → objects
// ---------------------------------------------------------------------------

// Suppose we receive raw NDJSON text from a file or network socket.
// `Ndjson.decodeString()` is a Channel that splits incoming strings on
// newlines and `JSON.parse`s each line.
// Pipe the stream through the channel with `Stream.pipeThroughChannel`.
export const decodeUntyped = Stream.make(
  "{\"timestamp\":\"2025-06-01T00:00:00Z\",\"level\":\"info\",\"message\":\"start\"}\n" +
    "{\"timestamp\":\"2025-06-01T00:00:01Z\",\"level\":\"error\",\"message\":\"oops\"}\n"
).pipe(
  Stream.pipeThroughChannel(Ndjson.decodeString()),
  Stream.runCollect
)

// When you need schema validation on top of the raw JSON parse, use
// `Ndjson.decodeSchemaString(Schema)()`. This decodes each line, parses the
// JSON, and then validates each value against the schema — all in one channel.
export const decodeTyped = Stream.make(
  "{\"timestamp\":\"2025-06-01T00:00:00Z\",\"level\":\"info\",\"message\":\"start\"}\n" +
    "{\"timestamp\":\"2025-06-01T00:00:01Z\",\"level\":\"error\",\"message\":\"oops\"}\n"
).pipe(
  Stream.pipeThroughChannel(Ndjson.decodeSchemaString(LogEntry)()),
  Stream.runCollect
)

// ---------------------------------------------------------------------------
// Encoding objects → NDJSON strings
// ---------------------------------------------------------------------------

// `Ndjson.encodeString()` serialises each value to a JSON line.
// The resulting stream emits ready-to-write NDJSON strings.
export const encodeUntyped = Stream.make(
  { timestamp: "2025-06-01T00:00:00Z", level: "info", message: "start" },
  { timestamp: "2025-06-01T00:00:01Z", level: "error", message: "oops" }
).pipe(
  Stream.pipeThroughChannel(Ndjson.encodeString()),
  Stream.runCollect
)

// `Ndjson.encodeSchemaString(Schema)()` encodes each value through the schema
// first (applying any transformations such as date formatting), then
// serialises it to an NDJSON line.
export const encodeTyped = Stream.make(
  new LogEntry({
    timestamp: DateTime.makeUnsafe("2025-06-01T00:00:00Z"),
    level: "info",
    message: "start"
  }),
  new LogEntry({
    timestamp: DateTime.makeUnsafe("2025-06-01T00:00:01Z"),
    level: "error",
    message: "oops"
  })
).pipe(
  Stream.pipeThroughChannel(Ndjson.encodeSchemaString(LogEntry)()),
  Stream.runCollect
)

// ---------------------------------------------------------------------------
// Binary (Uint8Array) variants
// ---------------------------------------------------------------------------

// When working with binary I/O (e.g. TCP sockets, file descriptors) use the
// non-string variants. `Ndjson.decode()` expects `Uint8Array` chunks and
// handles text decoding internally. `Ndjson.encode()` produces `Uint8Array`
// output.
const enc = new TextEncoder()

export const decodeBinary = Stream.make(
  enc.encode("{\"level\":\"info\",\"message\":\"binary\"}\n")
).pipe(
  Stream.pipeThroughChannel(Ndjson.decode()),
  Stream.runCollect
)

export const encodeBinary = Stream.make(
  { level: "info", message: "binary" }
).pipe(
  Stream.pipeThroughChannel(Ndjson.encode()),
  Stream.runCollect
)

// ---------------------------------------------------------------------------
// Handling empty lines
// ---------------------------------------------------------------------------

// NDJSON files sometimes contain blank lines (e.g. trailing newlines or
// pretty-printed output). Pass `{ ignoreEmptyLines: true }` to skip them
// instead of raising an `NdjsonError`.
export const decodeIgnoringBlanks = Stream.make(
  "{\"ok\":true}\n\n{\"ok\":false}\n"
).pipe(
  Stream.pipeThroughChannel(Ndjson.decodeString({ ignoreEmptyLines: true })),
  Stream.runCollect
)

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

// `Ndjson.NdjsonError` is raised when encoding (`kind: "Pack"`) or decoding
// (`kind: "Unpack"`) fails. You can catch it with `Stream.catchTag` or
// `Effect.catchTag`.
export const handleDecodeErrors = Stream.make("not-valid-json\n").pipe(
  Stream.pipeThroughChannel(Ndjson.decodeString()),
  Stream.catchTag("NdjsonError", (err) =>
    // The `kind` field indicates whether the error occurred during
    // encoding ("Pack") or decoding ("Unpack"), and `cause` contains
    // the underlying exception.
    Stream.succeed({ recovered: true, kind: err.kind })),
  Stream.runCollect
)

// ---------------------------------------------------------------------------
// Realistic pipeline: decode → transform → re-encode
// ---------------------------------------------------------------------------

// A common pattern is to read NDJSON, transform each record, and write it
// back as NDJSON. This example filters error-level log entries and re-encodes
// them.
const ndjsonInput = "{\"timestamp\":\"2025-06-01T00:00:00Z\",\"level\":\"info\",\"message\":\"ok\"}\n" +
  "{\"timestamp\":\"2025-06-01T00:00:01Z\",\"level\":\"error\",\"message\":\"fail\"}\n" +
  "{\"timestamp\":\"2025-06-01T00:00:02Z\",\"level\":\"warn\",\"message\":\"slow\"}\n"

export const filterAndReencode = Stream.make(ndjsonInput).pipe(
  // Decode each line into a validated LogEntry
  Stream.pipeThroughChannel(Ndjson.decodeSchemaString(LogEntry)()),
  // Keep only error-level entries
  Stream.filter((entry) => entry.level === "error"),
  // Re-encode the filtered entries back to NDJSON strings
  Stream.pipeThroughChannel(Ndjson.encodeSchemaString(LogEntry)()),
  Stream.runCollect
)
```

## Integrating Effect into existing applications

`ManagedRuntime` bridges Effect programs with non-Effect code. Build one runtime
from your application Layer, then use it anywhere you need imperative execution,
like web handlers, framework hooks, worker queues, or legacy callback APIs.

### Using ManagedRuntime with Hono

Use `ManagedRuntime` to run Effect programs from external frameworks while keeping your domain logic in services and Layers.

```ts
import { Context, Effect, Layer, ManagedRuntime, Ref, Schema } from "effect"
import { Hono } from "hono"

class Todo extends Schema.Class<Todo>("Todo")({
  id: Schema.Number,
  title: Schema.String,
  completed: Schema.Boolean
}) {}

class CreateTodoPayload extends Schema.Class<CreateTodoPayload>("CreateTodoPayload")({
  title: Schema.String
}) {}

class TodoNotFound extends Schema.TaggedErrorClass<TodoNotFound>()("TodoNotFound", {
  id: Schema.Number
}) {}

export class TodoRepo extends Context.Service<TodoRepo, {
  readonly getAll: Effect.Effect<ReadonlyArray<Todo>>
  getById(id: number): Effect.Effect<Todo, TodoNotFound>
  create(payload: CreateTodoPayload): Effect.Effect<Todo>
}>()("app/TodoRepo") {
  static readonly layer = Layer.effect(
    TodoRepo,
    Effect.gen(function*() {
      const store = new Map<number, Todo>()
      const nextId = yield* Ref.make(1)

      const getAll = Effect.gen(function*() {
        return Array.from(store.values())
      }).pipe(
        Effect.withSpan("TodoRepo.getAll")
      )

      const getById = Effect.fn("TodoRepo.getById")(function*(id: number) {
        const todo = store.get(id)
        if (todo === undefined) {
          return yield* new TodoNotFound({ id })
        }
        return todo
      })

      const create = Effect.fn("TodoRepo.create")(function*(payload: CreateTodoPayload) {
        const id = yield* Ref.getAndUpdate(nextId, (current) => current + 1)
        const todo = new Todo({ id, title: payload.title, completed: false })
        store.set(id, todo)
        return todo
      })

      return TodoRepo.of({ getAll, getById, create })
    })
  )
}

// Create a global memo map that can be shared across the app. This is necessary
// for memoization to work correctly across ManagedRuntime instances.
export const appMemoMap = Layer.makeMemoMapUnsafe()

// Create a ManagedRuntime for the TodoRepo layer. This runtime can be shared
// across all handlers in the app, and it will manage the lifecycle of the
// TodoRepo service and any resources it uses.
export const runtime = ManagedRuntime.make(TodoRepo.layer, {
  memoMap: appMemoMap
})

export const app = new Hono()

app.get("/todos", async (context) => {
  const todos = await runtime.runPromise(
    TodoRepo.use((repo) => repo.getAll)
  )
  return context.json(todos)
})

app.get("/todos/:id", async (context) => {
  const id = Number(context.req.param("id"))
  if (!Number.isFinite(id)) {
    return context.json({ message: "Todo id must be a number" }, 400)
  }

  const todo = await runtime.runPromise(
    TodoRepo.use((repo) => repo.getById(id)).pipe(
      Effect.catchTag("TodoNotFound", () => Effect.succeed(null))
    )
  )

  if (todo === null) {
    return context.json({ message: "Todo not found" }, 404)
  }

  return context.json(todo)
})

const decodeCreateTodoPayload = Schema.decodeUnknownSync(CreateTodoPayload)

app.post("/todos", async (context) => {
  const body = await context.req.json()

  let payload: CreateTodoPayload
  try {
    payload = decodeCreateTodoPayload(body)
  } catch {
    return context.json({ message: "Invalid request body" }, 400)
  }

  const todo = await runtime.runPromise(
    TodoRepo.use((repo) => repo.create(payload))
  )

  return context.json(todo, 201)
})

// The same bridge pattern works for Express, Fastify, Koa, and other frameworks.
// Use `runtime.runSync` for synchronous edges or `runtime.runCallback` for
// callback-only APIs.

// When the process receives a shutdown signal, dispose the runtime to clean up
// any resources used by the TodoRepo service and its dependencies.
const shutdown = () => {
  void runtime.dispose()
}

process.once("SIGINT", shutdown)
process.once("SIGTERM", shutdown)
```

## Batching external requests

Learn how to batch multiple requests into fewer external calls.

### Batching requests with RequestResolver

Define request types with `Request.Class`, resolve them in batches with `RequestResolver`.

```ts
import { Context, Effect, Exit, Layer, Request, RequestResolver, Schema, Tracer } from "effect"

export class User extends Schema.Class<User>("User")({
  id: Schema.Number,
  name: Schema.String,
  email: Schema.String
}) {}

export class UserNotFound extends Schema.TaggedErrorClass<UserNotFound>()("UserNotFound", {
  id: Schema.Number
}) {}

export class Users extends Context.Service<Users, {
  getUserById(id: number): Effect.Effect<User, UserNotFound>
}>()("app/Users") {
  static readonly layer = Layer.effect(
    Users,
    Effect.gen(function*() {
      // Request classes model a single external lookup.
      class GetUserById extends Request.Class<
        { readonly id: number },
        User, // The success type of the request
        UserNotFound, // The error type of the request
        never // The requirements type of the request, if any
      > {}

      // Simulate an external data source that supports batched lookup.
      const usersTable = new Map<number, User>([
        [1, new User({ id: 1, name: "Ada Lovelace", email: "ada@acme.dev" })],
        [2, new User({ id: 2, name: "Alan Turing", email: "alan@acme.dev" })],
        [3, new User({ id: 3, name: "Grace Hopper", email: "grace@acme.dev" })]
      ])

      const resolver = yield* RequestResolver.make<GetUserById>(Effect.fn(function*(entries) {
        for (const entry of entries) {
          const user = usersTable.get(entry.request.id)

          // If the request had requirements, you can access them with
          // `entry.context`
          const requestSpan = Context.getOption(entry.context, Tracer.ParentSpan)
          console.log("Request span", requestSpan)

          if (user) {
            // Complete requests with .completeUnsafe and pass in an Exit value
            entry.completeUnsafe(Exit.succeed(user))
          } else {
            entry.completeUnsafe(Exit.fail(new UserNotFound({ id: entry.request.id })))
          }
        }
      })).pipe(
        // Control the delay before the resolver is executed. This allows more
        // requests to be batched together, but also adds latency to the first
        // request.
        RequestResolver.setDelay("10 millis"),
        // RequestResolver.withSpan adds a span around the resolver execution,
        // and also sets up span links for each request
        RequestResolver.withSpan("Users.getUserById.resolver"),
        // RequestResolver.withCache adds a simple LRU cache to avoid repeated
        // lookups for the same ID.
        RequestResolver.withCache({ capacity: 1024 })
      )

      // Wrap the resolver in a service method. The resolver batches calls to
      // `getUserById` that occur within the delay window.
      const getUserById = (id: number) =>
        Effect.request(new GetUserById({ id }), resolver).pipe(
          Effect.withSpan("Users.getUserById", { attributes: { userId: id } })
        )

      return { getUserById } as const
    })
  )
}

// Run multiple lookups concurrently. The resolver receives one batch and
// internally deduplicates repeated IDs for the external call.
export const batchedLookupExample = Effect.gen(function*() {
  const { getUserById } = yield* Users

  // This will only trigger a single call to the resolver with the unique IDs [1, 2, 3].
  yield* Effect.forEach([1, 2, 1, 3, 2], getUserById, {
    concurrency: "unbounded"
  })
})
```

## Working with Schedules

Schedules define recurring patterns for retries, repeats and polling.

### Working with the Schedule module

Build schedules, compose them, and use them with `Effect.retry` and `Effect.repeat`.

```ts
import { Duration, Effect, Random, Schedule, Schema } from "effect"

export class HttpError extends Schema.TaggedErrorClass<HttpError>()("HttpError", {
  message: Schema.String,
  status: Schema.Number,
  retryable: Schema.Boolean
}) {}

// Start with a few schedule constructors.
export const maxRetries = Schedule.recurs(5)
export const spacedPolling = Schedule.spaced("30 seconds")
export const exponentialBackoff = Schedule.exponential("200 millis")

// `Schedule.both` continues only while both schedules continue.
// It is useful for combining a delay pattern with a hard attempt cap.
export const retryBackoffWithLimit = Schedule.both(
  Schedule.exponential("250 millis"),
  Schedule.recurs(6)
)

// `Schedule.either` continues while either schedule continues.
// It is useful for fallback behavior (e.g. stop only when both are exhausted).
export const keepTryingUntilBothStop = Schedule.either(
  Schedule.spaced("2 seconds"),
  Schedule.recurs(3)
)

// Use `Schedule.while` to continue only for retryable failures.
// This lets non-retryable errors fail fast, even if attempts remain.
export const retryableOnly = Schedule.exponential("200 millis").pipe(
  // You can use `setInputType` to specify the type of input the schedule will
  // receive.
  Schedule.setInputType<HttpError>(),
  Schedule.while(({ input }) => input.retryable)
)

// `tapInput` and `tapOutput` are useful for performing side effects like
// logging or metrics.
export const instrumentedRetrySchedule = retryableOnly.pipe(
  Schedule.setInputType<HttpError>(),
  Schedule.tapInput((error) => Effect.logDebug(`Retrying after ${error.status}: ${error.message}`)),
  Schedule.tapOutput((delay) => Effect.logDebug(`Next retry in ${Duration.toMillis(delay)}ms`))
)

// Production pattern: capped exponential backoff with jitter and max attempts.
// Delays start at 250ms, grow exponentially with jitter, and are capped at 10s.
export const productionRetrySchedule = Schedule.exponential("250 millis").pipe(
  // Cap the delay at 10 seconds to avoid excessively long waits.
  Schedule.either(Schedule.spaced("10 seconds")),
  Schedule.jittered,
  Schedule.setInputType<HttpError>(),
  Schedule.while(({ input }) => input.retryable)
)

export const fetchUserProfile = Effect.fn("fetchUserProfile")(
  function*(userId: string) {
    const random = yield* Random.next
    const status = random > 0.7
      ? 200
      : random > 0.3
      ? 503
      : 401

    if (status !== 200) {
      return yield* new HttpError({
        message: `Request for ${userId} failed`,
        status,
        retryable: status >= 500
      })
    }

    return {
      id: userId,
      name: "Ada Lovelace"
    } as const
  }
)

// Use the schedule with `Effect.retry` to retry failures.
export const loadUserWithRetry = fetchUserProfile("user-123").pipe(
  Effect.retry(productionRetrySchedule),
  // If the effect still fails after exhausting the schedule, turn the error
  // into a fatal one.
  Effect.orDie
)

export const loadUserWithInferredInput = fetchUserProfile("user-123").pipe(
  // You can also pass a schedule builder function that assists with inferring
  // the input type. This is especially useful when the schedule needs to
  // inspect the error to determine retryability.
  Effect.retry(($) =>
    $(Schedule.spaced("1 seconds")).pipe(
      Schedule.while(({ input }) => input.retryable)
    )
  ),
  Effect.orDie
)
```

## Working with DateTime

When working with dates and time, use the `DateTime` module instead of `Date` and `Date.now`.

Use it when your Effect programs need testable current time, safe parsing, stable ISO formatting, time-zone conversion, or calendar arithmetic.

### Creating and formatting DateTime values

Parse incoming date values safely, use Clock-powered current time, and format
instants for API payloads or user-facing labels.

```ts
import { DateTime, Effect, Option } from "effect"

Effect.gen(function*() {
  // Use DateTime.now to get the current time from Effect's Clock service.
  // Using the Clock service ensures tests can use the `TestClock` module to
  // control time.
  const now = yield* DateTime.now

  // Use DateTime.make to parse a date input, such as a user-entered string or a
  // epoch timestamp. It returns an Option depending on whether the input was
  // valid.
  const parsedOption: Option.Option<DateTime.Utc> = DateTime.make("2024-06-15T14:30:00.000Z")

  // you can then use the Option apis to unwrap the value
  Option.getOrUndefined(parsedOption)

  // Calendar/date-time math returns a new DateTime value; the original value is
  // immutable.
  const endsAt = now.pipe(DateTime.add({ hours: 2 }))

  // The DateTime.format* functions can be used to convert a DateTime value to
  // differen formats.
  yield* Effect.log("ISO string:", DateTime.formatIso(endsAt))
})
```


### Working with time zones

Attach IANA zones to instants, render zoned ISO strings, and provide a
CurrentTimeZone service for code that should use the workspace/user zone.

```ts
import { NodeRuntime } from "@effect/platform-node"
import { DateTime, Effect, Option } from "effect"

Effect.gen(function*() {
  // Use DateTime.now to get the current time from Effect's Clock service.
  const now = yield* DateTime.now

  // To attach a named IANA zone to a DateTime value
  const nowInAuckland = now.pipe(
    // Use DateTime.setZoneNamedUnsafe when you know the zone is valid.
    DateTime.setZoneNamedUnsafe("Pacific/Auckland")
  )
  yield* Effect.log("Now in Auckland:", nowInAuckland)

  // Use DateTime.setZoneNamed when you don't know the zone is valid.
  const nowInSydneyOption: Option.Option<DateTime.Zoned> = now.pipe(
    DateTime.setZoneNamed("Australia/Sydney")
  )

  yield* Effect.log("Now in Sydney:", Option.getOrUndefined(nowInSydneyOption))

  // To generate a `DateTime.Zoned` in the `DateTime.CurrentTimeZone`
  const nowInNewYork = yield* DateTime.nowInCurrentZone
  yield* Effect.log("Now in New York:", nowInNewYork)

  // If you have a date string that you know is in a particular IANA zone, you
  // can convert it to a DateTime.Zoned to ensure the instant is correct
  const dateInAuckland: DateTime.Zoned = DateTime.makeZonedUnsafe("2026-06-05", {
    timeZone: "Pacific/Auckland",
    // adjustForTimeZone will adjust the input to the given zone, otherwise it
    // will be treated as UTC.
    adjustForTimeZone: true
  })
  yield* Effect.log("Date in Auckland:", dateInAuckland)
}).pipe(
  Effect.provide(DateTime.layerCurrentZoneNamed("America/New_York")),
  NodeRuntime.runMain
)
```

## Observability

Effect has built-in support for structured logging, distributed tracing, and
metrics. For exporting telemetry, use the lightweight Otlp modules from
`effect/unstable/observability` in new projects, or use
`@effect/opentelemetry` NodeSdk when integrating with an existing OpenTelemetry
setup.

### Customizing logging

Configure loggers & log-level filtering for production applications.

```ts
import { NodeFileSystem } from "@effect/platform-node"
import { Config, Effect, Layer, Logger, References } from "effect"

// Build a logger layer that emits one JSON line per log entry.
export const JsonLoggerLayer = Logger.layer([Logger.consoleJson])

// Raise the minimum level to "Warn" to skip debug/info logs.
export const WarnAndAbove = Layer.succeed(References.MinimumLogLevel, "Warn")

// There is a built-in logger for writing to a file
export const FileLoggerLayer = Logger.layer([
  Logger.toFile(Logger.formatSimple, "app.log")
]).pipe(
  Layer.provide(NodeFileSystem.layer)
)

// Define a custom logger for app-specific formatting and routing.
export const appLogger = Effect.gen(function*() {
  // Here you could initialize a connection to an external logging service, set
  // up log file rotation, etc.
  yield* Effect.logDebug("initializing app logger")

  return yield* Logger.batched(Logger.formatStructured, {
    window: "1 second",
    flush: Effect.fn(function*(batch) {
      // In a real implementation, this is where you would send the batch of log entries to an external logging service or write them to a file.
      console.log(`Flushing ${batch.length} log entries`)
    })
  })
})

export const AppLoggerLayer = Logger.layer([appLogger]).pipe(
  Layer.provideMerge(WarnAndAbove) // Start with "Warn" level for the app logger.
)

// Create a logger layer that uses the default logger for development, and the
// custom logger for production
export const LoggerLayer = Layer.unwrap(Effect.gen(function*() {
  const env = yield* Config.string("NODE_ENV").pipe(Config.withDefault("development"))
  if (env === "production") {
    return AppLoggerLayer
  }
  return Logger.layer([Logger.defaultLogger])
}))

// Example effect that logs at various levels during a checkout flow.
export const logCheckoutFlow = Effect.gen(function*() {
  yield* Effect.logDebug("loading checkout state")

  yield* Effect.logInfo("validating cart")
  yield* Effect.logWarning("inventory is low for one line item")
  yield* Effect.logError("payment provider timeout")
}).pipe(
  // Attach structured metadata to all log lines emitted by this effect.
  Effect.annotateLogs({
    service: "checkout-api",
    route: "POST /checkout"
  }),
  // Add a duration span so each log line includes checkout=<N>ms metadata.
  Effect.withLogSpan("checkout")
)
```


### Setting up tracing with Otlp modules

Configure Otlp tracing + log export with a reusable observability layer.

```ts
import { NodeRuntime } from "@effect/platform-node"
import { Context, Effect, Layer } from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { OtlpLogger, OtlpSerialization, OtlpTracer } from "effect/unstable/observability"

// Configure OTLP span export.
export const OtlpTracingLayer = OtlpTracer.layer({
  url: "http://localhost:4318/v1/traces",
  resource: {
    serviceName: "checkout-api",
    serviceVersion: "1.0.0",
    attributes: {
      "deployment.environment": "staging"
    }
  }
})

// Configure OTLP log export.
export const OtlpLoggingLayer = OtlpLogger.layer({
  url: "http://localhost:4318/v1/logs",
  resource: {
    serviceName: "checkout-api",
    serviceVersion: "1.0.0"
  }
})

// Reusable app-wide observability layer.
//
// - OtlpTracer/OtlpLogger require an OTLP serializer and an HttpClient.
// - FetchHttpClient.layer provides the HttpClient used by the exporter.
export const ObservabilityLayer = Layer.merge(OtlpTracingLayer, OtlpLoggingLayer).pipe(
  Layer.provide(OtlpSerialization.layerJson),
  Layer.provide(FetchHttpClient.layer)
)

export class Checkout extends Context.Service<Checkout, {
  processCheckout(orderId: string): Effect.Effect<void>
}>()("acme/Checkout") {
  static readonly layer = Layer.effect(
    Checkout,
    Effect.gen(function*() {
      yield* Effect.logInfo("setting up checkout service")

      return Checkout.of({
        processCheckout: Effect.fn("Checkout.processCheckout")(function*(orderId: string) {
          yield* Effect.logInfo("starting checkout", { orderId })

          yield* Effect.sleep("50 millis").pipe(
            Effect.withSpan("checkout.charge-card"),
            Effect.annotateSpans({
              "checkout.order_id": orderId,
              "checkout.provider": "acme-pay"
            })
          )

          yield* Effect.sleep("20 millis").pipe(
            Effect.withSpan("checkout.persist-order")
          )

          yield* Effect.logInfo("checkout completed", { orderId })
        })
      })
    })
  )
}

// Example usage of the Checkout service.
const CheckoutTest = Layer.effectDiscard(
  Effect.gen(function*() {
    const checkout = yield* Checkout
    yield* checkout.processCheckout("ord_123")
  }).pipe(
    Effect.withSpan("checkout-test-run")
  )
).pipe(
  // You can also attach spans to Layers
  Layer.withSpan("checkout-test"),
  Layer.provide(Checkout.layer)
)

const Main = CheckoutTest.pipe(
  // Provide the observability layer at the very end, so that all spans created
  // by the app are exported.
  Layer.provide(ObservabilityLayer)
)

// Launch the app
Layer.launch(Main).pipe(
  NodeRuntime.runMain
)
```

## Testing Effect programs

### Writing Effect tests with @effect/vitest

Using `it.effect` for Effect-based tests.

```ts
import { assert, describe, it } from "@effect/vitest"
import { Effect, Fiber, Schema } from "effect"
import { TestClock } from "effect/testing"

describe("@effect/vitest basics", () => {
  it.effect("runs Effect code with assert helpers", () =>
    Effect.gen(function*() {
      const upper = ["ada", "lin"].map((name) => name.toUpperCase())
      assert.deepStrictEqual(upper, ["ADA", "LIN"])
      assert.strictEqual(upper.length, 2)
      assert.isTrue(upper.includes("ADA"))
    }))

  it.effect.each([
    { input: " Ada ", expected: "ada" },
    { input: " Lin ", expected: "lin" },
    { input: " Nia ", expected: "nia" }
  ])("parameterized normalization %#", ({ input, expected }) =>
    Effect.gen(function*() {
      assert.strictEqual(input.trim().toLowerCase(), expected)
    }))

  it.effect("controls time with TestClock", () =>
    Effect.gen(function*() {
      const fiber = yield* Effect.forkChild(
        Effect.sleep(60_000).pipe(Effect.as("done" as const))
      )

      // Move virtual time forward to complete sleeping fibers immediately.
      yield* TestClock.adjust(60_000)

      const value = yield* Fiber.join(fiber)
      assert.strictEqual(value, "done")
    }))

  it.live("uses real runtime services", () =>
    Effect.gen(function*() {
      const startedAt = Date.now()
      yield* Effect.sleep(1)
      assert.isTrue(Date.now() >= startedAt)
    }))

  // For property-based testing, use `it.effect.prop` with Schema-based
  // arbitraries
  it.effect.prop("reversing twice is identity", [Schema.String], ([value]) =>
    Effect.gen(function*() {
      const reversedTwice = value.split("").reverse().reverse().join("")
      assert.strictEqual(reversedTwice, value)
    }))
})
```


### Testing services with shared layers

How to test Effect services that depend on other services.

```ts
import { assert, describe, it, layer } from "@effect/vitest"
import { Array, Context, Effect, Layer, Ref } from "effect"

export interface Todo {
  readonly id: number
  readonly title: string
}

// Create a test ref service that can be used to store and manipulate test data
// in layers.
export class TodoRepoTestRef extends Context.Service<TodoRepoTestRef, Ref.Ref<Array<Todo>>>()("app/TodoRepoTestRef") {
  static readonly layer = Layer.effect(TodoRepoTestRef, Ref.make(Array.empty()))
}

class TodoRepo extends Context.Service<TodoRepo, {
  create(title: string): Effect.Effect<Todo>
  readonly list: Effect.Effect<ReadonlyArray<Todo>>
}>()("app/TodoRepo") {
  static readonly layerTest = Layer.effect(
    TodoRepo,
    Effect.gen(function*() {
      const store = yield* TodoRepoTestRef

      const create = Effect.fn("TodoRepo.create")(function*(title: string) {
        const todos = yield* Ref.get(store)
        const todo = { id: todos.length + 1, title }
        yield* Ref.set(store, [...todos, todo])
        return todo
      })

      const list = Ref.get(store)

      return TodoRepo.of({
        create,
        list
      })
    })
  ).pipe(
    // Provide the test ref layer as a dependency for the test repo layer.
    // Use Layer.provideMerge so the tests can also access the test ref directly
    // if needed.
    Layer.provideMerge(TodoRepoTestRef.layer)
  )
}

class TodoService extends Context.Service<TodoService, {
  addAndCount(title: string): Effect.Effect<number>
  readonly titles: Effect.Effect<ReadonlyArray<string>>
}>()("app/TodoService") {
  static readonly layerNoDeps = Layer.effect(
    TodoService,
    Effect.gen(function*() {
      const repo = yield* TodoRepo

      const addAndCount = Effect.fn("TodoService.addAndCount")(function*(title: string) {
        yield* repo.create(title)
        const todos = yield* repo.list
        return todos.length
      })

      const titles = repo.list.pipe(
        Effect.map((todos) => todos.map((todo) => todo.title))
      )

      return TodoService.of({
        addAndCount,
        titles
      })
    })
  )

  // You would also add a live layer here that provides real dependencies for
  // production code.
  //
  // static readonly layer = Layer.effect(TodoService, ...).pipe(
  //   Layer.provide(TodoRepo.layer)
  // )

  static readonly layerTest = this.layerNoDeps.pipe(
    // Provide the test repo layer as a dependency for the test service layer.
    // Use `Layer.provideMerge` so the tests can also access the test repo
    // directly if needed, as well as the test ref through the repo layer.
    Layer.provideMerge(TodoRepo.layerTest)
  )
}

// `layer(...)` creates one shared layer for the block and tears it down in
// `afterAll`, so all tests inside can access the same service context.
layer(TodoRepo.layerTest)("TodoRepo", (it) => {
  it.effect("tests repository behavior", () =>
    Effect.gen(function*() {
      const repo = yield* TodoRepo
      const before = (yield* repo.list).length
      assert.strictEqual(before, 0)

      yield* repo.create("Write docs")

      const after = (yield* repo.list).length
      assert.strictEqual(after, 1)
    }))

  it.effect("layer is shared", () =>
    Effect.gen(function*() {
      const repo = yield* TodoRepo
      const before = (yield* repo.list).length
      assert.strictEqual(before, 1)

      yield* repo.create("Write docs again")

      // because the layer is shared between tests, the todo created in the
      // previous test is still present, so the count should be 2, not 1
      const after = (yield* repo.list).length
      assert.strictEqual(after, 2)
    }))
})

describe("TodoService", () => {
  it.effect("tests higher-level service logic", () =>
    Effect.gen(function*() {
      const ref = yield* TodoRepoTestRef
      const service = yield* TodoService
      const count = yield* service.addAndCount("Review docs")
      const titles = yield* service.titles

      assert.isTrue(count >= 1)
      assert.isTrue(titles.some((title) => title.includes("Review docs")))

      // You can also access the test ref directly to make assertions about the
      // underlying data.
      const todos = yield* Ref.get(ref)
      assert.isTrue(todos.length >= 1)
    }).pipe(Effect.provide(TodoService.layerTest)))
})
```

## Effect HttpClient

Build http clients with the `HttpClient` module.

### Getting started with HttpClient

Define a service that uses the HttpClient module to fetch data from an external API

```ts
import { Context, Effect, flow, Layer, Schedule, Schema } from "effect"
import { FetchHttpClient, HttpClient, HttpClientRequest, HttpClientResponse } from "effect/unstable/http"

class Todo extends Schema.Class<Todo>("Todo")({
  userId: Schema.Number,
  id: Schema.Number,
  title: Schema.String,
  completed: Schema.Boolean
}) {}

export class JsonPlaceholder extends Context.Service<JsonPlaceholder, {
  readonly allTodos: Effect.Effect<ReadonlyArray<Todo>, JsonPlaceholderError>
  getTodo(id: number): Effect.Effect<Todo, JsonPlaceholderError>
  createTodo(todo: Omit<Todo, "id">): Effect.Effect<Todo, JsonPlaceholderError>
}>()("app/JsonPlaceholder") {
  static readonly layer = Layer.effect(
    JsonPlaceholder,
    Effect.gen(function*() {
      // Access the HttpClient service, and apply some common middleware to all
      // requests:
      const client = (yield* HttpClient.HttpClient).pipe(
        // Add a base URL to all requests made with this client, and set the
        // Accept header to expect JSON responses
        HttpClient.mapRequest(flow(
          HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com"),
          HttpClientRequest.acceptJson
        )),
        // Fail if the response status is not 2xx
        HttpClient.filterStatusOk,
        // Retry transient errors (network issues, 5xx responses) with an
        // exponential backoff.
        //
        // See the schedule documentation for more complex retry strategies.
        HttpClient.retryTransient({
          schedule: Schedule.exponential(100),
          times: 3
        })
      )

      const allTodos = client.get("/todos").pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(Todo))),
        Effect.mapError((cause) => new JsonPlaceholderError({ cause })),
        Effect.withSpan("JsonPlaceholder.allTodos")
      )

      // Use the HttpClient to fetch a todo item by id, and decode the response
      // using the Todo schema.
      const getTodo = Effect.fn("JsonPlaceholder.getTodo")(function*(id: number) {
        // Annotate the current span with the id of the todo being fetched, so
        // that it shows up in telemetry for this request.
        yield* Effect.annotateCurrentSpan({ id })

        const todo = yield* client.get(`/todos/${id}`, {
          // You can pass additional options to individual requests.
          // There are options for query parameters, request body, headers, and
          // more.
          urlParams: { format: "json" }
        }).pipe(
          Effect.flatMap(HttpClientResponse.schemaBodyJson(Todo)),
          Effect.mapError((cause) => new JsonPlaceholderError({ cause }))
        )

        return todo
      })

      // You can use the HttpClientRequest module to build up more complex
      // requests:
      const createTodo = Effect.fn("JsonPlaceholder.createTodo")(function*(todo: Omit<Todo, "id">) {
        yield* Effect.annotateCurrentSpan({ title: todo.title })

        const createdTodo = yield* HttpClientRequest.post("/todos").pipe(
          // The HttpClientRequest module has many helper functions for building requests.
          HttpClientRequest.setUrlParams({ format: "json" }),
          HttpClientRequest.bodyJsonUnsafe(todo),
          client.execute,
          Effect.flatMap(HttpClientResponse.schemaBodyJson(Todo)),
          Effect.mapError((cause) => new JsonPlaceholderError({ cause }))
        )

        return createdTodo
      })

      return JsonPlaceholder.of({
        allTodos,
        getTodo,
        createTodo
      })
    })
  ).pipe(
    // Provide the fetch-based HttpClient implementation
    Layer.provide(FetchHttpClient.layer)
  )
}

export class JsonPlaceholderError extends Schema.TaggedErrorClass<JsonPlaceholderError>()("JsonPlaceholderError", {
  cause: Schema.Defect()
}) {}
```

## Building HttpApi servers

`HttpApi` gives you schema-first, type-safe HTTP APIs with runtime validation, typed clients, and OpenAPI docs from one definition.

### Getting started with HttpApi

Define a schema-first API, implement handlers, secure endpoints with
middleware, serve it over HTTP, and call it using a generated typed client.

```ts
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Context, Effect, flow, Layer, Schedule } from "effect"
import { FetchHttpClient, HttpClient, HttpClientRequest, HttpRouter, HttpServer } from "effect/unstable/http"
import { HttpApiBuilder, HttpApiClient, HttpApiMiddleware, HttpApiScalar } from "effect/unstable/httpapi"
import { createServer } from "node:http"
// Api definitions should **always** be seperate from the server implementation,
// so that they can be shared between the server and client without leaking
// server code into clients.
// Ideally, the would use a seperate package in a monorepo.
import { Api } from "./fixtures/api/Api.ts"
import { Authorization } from "./fixtures/api/Authorization.ts"
import { UsersApiHandlers } from "./fixtures/server/Users/http.ts"

// This walkthrough focuses on runtime wiring and typed client usage.
// See the fixture files for the API schemas, endpoint definitions and handlers:

const SystemApiHandlers = HttpApiBuilder.group(
  Api,
  "system",
  Effect.fn(function*(handlers) {
    return handlers.handle("health", () => Effect.void)
  })
)

const ApiRoutes = HttpApiBuilder.layer(Api, {
  openapiPath: "/openapi.json"
}).pipe(
  // Provide all the handler Layers for the API.
  Layer.provide([UsersApiHandlers, SystemApiHandlers])
)

// Define a /docs route that serves scalar documentation
const DocsRoute = HttpApiScalar.layer(Api, {
  path: "/docs"
})

// Merge all the http routes together
const AllRoutes = Layer.mergeAll(ApiRoutes, DocsRoute)

// Create an HTTP server Layer that serves the API routes.
//
// Here we are using the NodeHttpServer, but you could also use the
// BunHttpServer
export const HttpServerLayer = HttpRouter.serve(AllRoutes).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
)

// Then run the server using Layer.launch
Layer.launch(HttpServerLayer).pipe(
  NodeRuntime.runMain
)

// Or create a web handler, which can be used in serverless environments
export const { handler, dispose } = HttpRouter.toWebHandler(AllRoutes.pipe(
  Layer.provide(HttpServer.layerServices)
))

// -----------------
// Client side setup
// -----------------

export const AuthorizationClient = HttpApiMiddleware.layerClient(
  Authorization,
  Effect.fn(function*({ next, request }) {
    // Here you can modify the request and pass it down the middleware chain.
    // This is where you would add authentication tokens, custom headers, etc.
    // For this example, we just add a hardcoded bearer token to all requests.
    return yield* next(HttpClientRequest.bearerToken(request, "dev-token"))
  })
)

// Define the HttpApiClient service, which will be used to make requests to the
// API.
export class ApiClient extends Context.Service<ApiClient, HttpApiClient.ForApi<typeof Api>>()("acme/ApiClient") {
  static readonly layer = Layer.effect(
    ApiClient,
    HttpApiClient.make(Api, {
      // Use transformClient to apply middleware to the generated client. This
      // is useful for settings the base url and applying retry policies.
      transformClient: (client) =>
        client.pipe(
          HttpClient.mapRequest(flow(
            HttpClientRequest.prependUrl("http://localhost:3000")
          )),
          HttpClient.retryTransient({
            schedule: Schedule.exponential(100),
            times: 3
          })
        )
    })
  ).pipe(
    // Provide the client implementation of the Authorization middleware, which
    // is required.
    Layer.provide(AuthorizationClient),
    // Supply a HttpClient implementation to use for making requests. Here we
    // use the FetchHttpClient, but you could also use the NodeHttpClient or
    // BunHttpClient.
    Layer.provide(FetchHttpClient.layer)
  )
}

// The generated client mirrors your API definition, so renames and schema
// changes are checked end-to-end at compile time.
export const callApi = Effect.gen(function*() {
  const client = yield* ApiClient

  yield* client.health()
}).pipe(
  Effect.provide(ApiClient.layer)
)
```

## Working with child processes

Use the `effect/unstable/process` modules to define child processes and run them with `ChildProcessSpawner.

### Working with child processes

This example shows how to collect process output, compose pipelines, and stream long-running command output.

```ts
import { NodeServices } from "@effect/platform-node"
import { Console, Context, Effect, Layer, Schema, Stream, String } from "effect"
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process"

export class DevToolsError extends Schema.TaggedErrorClass<DevToolsError>()("DevToolsError", {
  cause: Schema.Defect()
}) {}

export class DevTools extends Context.Service<DevTools, {
  readonly nodeVersion: Effect.Effect<string, DevToolsError>
  readonly recentCommitSubjects: Effect.Effect<ReadonlyArray<string>, DevToolsError>
  readonly runLintFix: Effect.Effect<void, DevToolsError>
  changedTypeScriptFiles(baseRef: string): Effect.Effect<ReadonlyArray<string>, DevToolsError>
}>()("docs/DevTools") {
  static readonly layer = Layer.effect(
    DevTools,
    Effect.gen(function*() {
      // To run child processes, we need access to a `ChildProcessSpawner`.
      const spawner = yield* ChildProcessSpawner.ChildProcessSpawner

      // Use `spawner.string` when you want to collect the entire output of a
      // command as a string. This runs `node --version` and collects the
      // output.
      const nodeVersion = spawner.string(
        ChildProcess.make("node", ["--version"])
      ).pipe(
        Effect.map(String.trim),
        Effect.mapError((cause) => new DevToolsError({ cause }))
      )

      const changedTypeScriptFiles = Effect.fn("DevTools.changedTypeScriptFiles")(function*(baseRef: string) {
        yield* Effect.annotateCurrentSpan({ baseRef })

        // `spawner.lines` is a convenience helper for line-oriented command
        // output.
        const files = yield* spawner.lines(
          ChildProcess.make("git", ["diff", "--name-only", `${baseRef}...HEAD`])
        ).pipe(
          Effect.mapError((cause) => new DevToolsError({ cause }))
        )

        return files.filter((file) => file.endsWith(".ts"))
      })

      // Build a pipeline from two command values. This runs:
      // `git log --pretty=format:%s -n 20 | head -n 5`
      const recentCommitSubjects = spawner.lines(
        ChildProcess.make("git", ["log", "--pretty=format:%s", "-n", "20"]).pipe(
          ChildProcess.pipeTo(ChildProcess.make("head", ["-n", "5"]))
        )
      ).pipe(
        Effect.mapError((cause) => new DevToolsError({ cause }))
      )

      const runLintFix = Effect.gen(function*() {
        // Use `spawn` when you want the process handle and stream output while
        // the process is still running.
        const handle = yield* spawner.spawn(
          ChildProcess.make("pnpm", ["lint-fix"], {
            env: { FORCE_COLOR: "1" },
            extendEnv: true
          })
        ).pipe(
          Effect.mapError((cause) => new DevToolsError({ cause }))
        )

        yield* handle.all.pipe(
          Stream.decodeText(),
          Stream.splitLines,
          Stream.runForEach((line) => Console.log(`[lint-fix] ${line}`)),
          Effect.mapError((cause) => new DevToolsError({ cause }))
        )

        const exitCode = yield* handle.exitCode.pipe(
          Effect.mapError((cause) => new DevToolsError({ cause }))
        )

        if (exitCode !== ChildProcessSpawner.ExitCode(0)) {
          return yield* new DevToolsError({
            cause: new Error(`pnpm lint-fix failed with exit code ${exitCode}`)
          })
        }
      }).pipe(
        // `spawner.spawn` adds a `Scope` requirement to manage the lifecycle of
        // the child process. We can use `Effect.scoped` to provide a `Scope`
        // and close it when the effect completes.
        Effect.scoped
      )

      return DevTools.of({
        nodeVersion,
        changedTypeScriptFiles,
        recentCommitSubjects,
        runLintFix
      })
    })
  ).pipe(
    // Provide the `ChildProcessSpawner` dependency from `NodeServices.layer`.
    Layer.provide(NodeServices.layer)
  )
}

export const program = Effect.gen(function*() {
  const tools = yield* DevTools

  const version = yield* tools.nodeVersion
  yield* Effect.log(`node=${version}`)
}).pipe(
  // `ChildProcess` requires a platform implementation of
  // `ChildProcessSpawner`. In Node.js, `NodeServices.layer` provides it.
  Effect.provide(DevTools.layer)
)
```

## Building CLI applications

Use the "effect/unstable/cli" modules to build CLI applications. These modules
provide utilities for parsing command-line arguments, handling user input, and
managing the flow of a CLI application.

### Getting started with Effect CLI modules

Build a command-line app with typed arguments and flags, then wire subcommand
handlers into a single executable command.

```ts
import { NodeRuntime, NodeServices } from "@effect/platform-node"
import { Console, Effect } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"

// You can define flags outside of commands and reuse them across multiple
// commands.
const workspace = Flag.string("workspace").pipe(
  Flag.withAlias("w"),
  Flag.withDescription("Workspace to operate on"),
  Flag.withDefault("personal")
)

// Start with a root command and explicitly share the parent flags that should
// be available to all subcommands.
const tasks = Command.make("tasks").pipe(
  Command.withSharedFlags({
    workspace,
    verbose: Flag.boolean("verbose").pipe(
      Flag.withAlias("v"),
      Flag.withDescription("Print diagnostic output")
    )
  }),
  Command.withDescription("Track and manage tasks")
)

const create = Command.make(
  "create",
  {
    title: Argument.string("title").pipe(
      Argument.withDescription("Task title")
    ),
    priority: Flag.choice("priority", ["low", "normal", "high"]).pipe(
      Flag.withDescription("Priority for the new task"),
      Flag.withDefault("normal")
    )
  },
  Effect.fn(function*({ title, priority }) {
    // Subcommands can read parent command input by yielding the parent command.
    const root = yield* tasks

    if (root.verbose) {
      yield* Console.log(`workspace=${root.workspace} action=create`)
    }

    yield* Console.log(`Created "${title}" in ${root.workspace} with ${priority} priority`)
  })
).pipe(
  Command.withDescription("Create a task"),
  Command.withExamples([
    {
      command: "tasks create \"Ship 4.0\" --priority high",
      description: "Create a high-priority task"
    }
  ])
)

const list = Command.make(
  "list",
  {
    status: Flag.choice("status", ["open", "done", "all"]).pipe(
      Flag.withDescription("Filter tasks by status"),
      Flag.withDefault("open")
    ),
    json: Flag.boolean("json").pipe(
      Flag.withDescription("Print machine-readable output")
    )
  },
  Effect.fn(function*({ status, json }) {
    const root = yield* tasks
    const items = [
      { title: "Ship 4.0", status: "open" },
      { title: "Update onboarding guide", status: "done" }
    ] as const
    const filtered = status === "all"
      ? items
      : items.filter((item) => item.status === status)

    if (root.verbose) {
      yield* Console.log(`workspace=${root.workspace} action=list`)
    }

    if (json) {
      yield* Console.log(JSON.stringify(
        {
          workspace: root.workspace,
          status,
          items: filtered
        },
        null,
        2
      ))
      return
    }

    yield* Console.log(`Listing ${status} tasks in ${root.workspace}`)
    if (filtered.length === 0) {
      yield* Console.log("- No tasks found")
      return
    }

    for (const item of filtered) {
      yield* Console.log(`- ${item.title}`)
    }
  })
).pipe(
  Command.withDescription("List tasks"),
  Command.withAlias("ls"),
  Command.withExamples([
    {
      command: "tasks --workspace team-a list --status open",
      description: "List open tasks in a specific workspace"
    },
    {
      command: "tasks --workspace team-b ls --status open",
      description: "List open tasks in another workspace"
    }
  ])
)

// Finally, compose the subcommands into a single command and then run it.
tasks.pipe(
  Command.withSubcommands([create, list]),
  Command.run({
    version: "1.0.0"
  }),
  // Provide the services for the platform you are targeting. In this case,
  // Node.js
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain
)
```

## Working with AI modules

Effect's AI modules provide a provider-agnostic interface for language models.
You can generate text, decode structured objects with `Schema` and stream partial
responses.

### Using LanguageModel for text, objects, and streams

Configure a provider once, then use `LanguageModel` for plain text
generation, schema-validated object generation, and streaming responses.

```ts
import { AnthropicClient, AnthropicLanguageModel } from "@effect/ai-anthropic"
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai"
import { Config, Context, Effect, ExecutionPlan, Layer, Schema, Stream } from "effect"
import { AiError, LanguageModel, Model, type Response } from "effect/unstable/ai"
import { FetchHttpClient } from "effect/unstable/http"
import { LaunchPlan } from "./fixtures/domain/LaunchPlan.ts"

// You can use Config to create ai clients
const AnthropicClientLayer = AnthropicClient.layerConfig({
  apiKey: Config.redacted("ANTHROPIC_API_KEY")
}).pipe(
  // Providers typically require an HttpClient, but you can choose which one to
  // use.
  Layer.provide(FetchHttpClient.layer)
)

const OpenAiClientLayer = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY")
}).pipe(
  Layer.provide(FetchHttpClient.layer)
)

export class AiWriterError extends Schema.TaggedErrorClass<AiWriterError>()("AiWriterError", {
  // AiErrorReason is a Schema, so we can include it directly in our custom
  // error schema.
  reason: AiError.AiErrorReason
}) {
  static fromAiError(error: AiError.AiError) {
    return new AiWriterError({
      reason: error.reason
    })
  }
}

// You can use `ExecutionPlan` to define a strategy for trying multiple
// providers with different configurations. In this example, we try a cheaper
// OpenAI model first, then fall back to a more expensive Anthropic model if the
// first one fails.
const DraftPlan = ExecutionPlan.make(
  {
    provide: OpenAiLanguageModel.model("gpt-5.2"),
    // Attempt to use the openai model up to 3 times before falling back to the
    // anthropic model.
    attempts: 3
  },
  {
    provide: AnthropicLanguageModel.model("claude-opus-4-6"),
    attempts: 2
  }
)

export class AiWriter extends Context.Service<AiWriter, {
  draftAnnouncement(product: string): Effect.Effect<{
    readonly provider: string
    readonly text: string
  }, AiWriterError>
  extractLaunchPlan(notes: string): Effect.Effect<LaunchPlan, AiWriterError>
  streamReleaseHighlights(version: string): Stream.Stream<string, AiWriterError>
}>()("docs/AiWriter") {
  static readonly layer = Layer.effect(
    AiWriter,
    Effect.gen(function*() {
      // Calling `captureRequirements` on an `ExecutionPlan` will move the
      // requirements of the plan (in this case the ai clients) into the Layer
      // requirements.
      const draftsModel = yield* DraftPlan.captureRequirements

      // Use a different model for the launch plan extraction
      const launchPlanModel = yield* OpenAiLanguageModel.model("gpt-4.1").captureRequirements

      const draftAnnouncement = Effect.fn("AiWriter.draftAnnouncement")(
        function*(product: string) {
          const model = yield* LanguageModel.LanguageModel
          const provider = yield* Model.ProviderName
          const response = yield* model.generateText({
            prompt: `Write a short launch announcement for ${product}. ` +
              "Keep it concise and include one concrete user benefit."
          })

          // `LanguageModel.generateText` exposes convenience fields so you can
          // inspect usage and finish reason without parsing content parts.
          yield* Effect.logInfo(
            `${provider} finished with ${response.finishReason}. outputTokens=${response.usage.outputTokens.total}`
          )

          return {
            provider,
            text: response.text
          }
        },
        // To apply an `ExecutionPlan`, we use `Effect.withExecutionPlan`
        Effect.withExecutionPlan(draftsModel),
        // Map AiError into our custom error type
        Effect.mapError((error) => AiWriterError.fromAiError(error))
      )

      const extractLaunchPlan = Effect.fn("AiWriter.extractLaunchPlan")(
        function*(notes: string) {
          const model = yield* LanguageModel.LanguageModel
          const response = yield* model.generateObject({
            objectName: "launch_plan",
            prompt:
              "Convert these notes into a launch plan object with audience, channels, launchDate, summary, and keyRisks:\n" +
              notes,
            // The generated object is validated and decoded through this schema.
            schema: LaunchPlan
          })

          return response.value
        },
        // The .model(...) apis return a Layer that can be used with
        // Effect.provide
        Effect.provide(launchPlanModel),
        // Map AiError into our custom error type
        Effect.mapError((error) => AiWriterError.fromAiError(error))
      )

      const streamReleaseHighlights = (version: string) =>
        LanguageModel.streamText({
          prompt: `Write release highlights for version ${version} as a short bulleted list.`
        }).pipe(
          Stream.filter((part): part is Response.TextDeltaPart => part.type === "text-delta"),
          Stream.map((part) => part.delta),
          Stream.provide(launchPlanModel),
          // Map AiError into our custom error type
          Stream.mapError((error) => AiWriterError.fromAiError(error))
        )

      return AiWriter.of({
        draftAnnouncement,
        extractLaunchPlan,
        streamReleaseHighlights
      })
    })
  ).pipe(
    // This Layer has requirements for both the OpenAI and Anthropic clients,
    // since the ExecutionPlan includes models from both providers.
    Layer.provide([OpenAiClientLayer, AnthropicClientLayer])
  )
}

// We can now use `AiWriter` like any other Effect service.
export const program: Effect.Effect<
  void,
  AiWriterError,
  AiWriter
> = Effect.gen(function*() {
  const writer = yield* AiWriter
  yield* writer.draftAnnouncement("Effect Cloud")
})
```


### Defining and using AI tools

Define tools with schemas, group them into toolkits, implement handlers,
and pass them to `LanguageModel.generateText`.

```ts
import { OpenAiClient, OpenAiLanguageModel, OpenAiTool } from "@effect/ai-openai"
import { Config, Context, Effect, Layer, Schema } from "effect"
import { AiError, LanguageModel, Tool, Toolkit } from "effect/unstable/ai"
import { FetchHttpClient } from "effect/unstable/http"

// ---------------------------------------------------------------------------
// 1. Defining tools
// ---------------------------------------------------------------------------

const ProductId = Schema.String.pipe(Schema.brand("ProductId")).annotate({
  description: "A unique identifier for a product, e.g. 'p-123'"
})

class Product extends Schema.Class<Product>("acme/domain/Product")({
  id: ProductId,
  name: Schema.String,
  price: Schema.Number
}) {}

// Each tool has a name, an optional description, a parameters schema that the
// model fills in, and a success schema for the handler result. The description
// is shown to the model to help it decide when to call the tool.
const SearchProducts = Tool.make("SearchProducts", {
  description: "Search the product catalog by keyword",
  parameters: Schema.Struct({
    query: Schema.String.annotate({
      // Add a description to individual parameters for even better model
      // guidance.
      description: "The search query, e.g. 'wireless headphones'"
    }),
    maxResults: Schema.Number.pipe(Schema.withDecodingDefault(Effect.succeed(10))).annotate({
      description: "The maximum number of results to return"
    })
  }),
  success: Schema.Array(Product),
  // The strategy used for handling errors returned from tool call handler
  // execution.
  //
  // If set to `"error"` (the default), errors that occur during tool call handler
  // execution will be returned in the error channel of the calling effect.
  //
  // If set to `"return"`, errors that occur during tool call handler execution
  // will be captured and returned as part of the tool call result.
  failureMode: "error"
})

const GetInventory = Tool.make("GetInventory", {
  description: "Check current stock level for a product",
  parameters: Schema.Struct({
    productId: ProductId
  }),
  success: Schema.Struct({
    productId: ProductId,
    available: Schema.Number
  })
})

// ---------------------------------------------------------------------------
// 2. Grouping tools into a Toolkit
// ---------------------------------------------------------------------------

// `Toolkit.make` accepts any number of tools and produces a typed toolkit that
// knows the names and schemas of every tool it contains.
const ProductToolkit = Toolkit.make(SearchProducts, GetInventory)

// ---------------------------------------------------------------------------
// 3. Implementing handlers via toLayer
// ---------------------------------------------------------------------------

// `toLayer` returns a `Layer` that satisfies the handler requirements for every
// tool in the toolkit. Each handler receives the decoded parameters and returns
// an Effect producing the success type.
const ProductToolkitLayer = ProductToolkit.toLayer(Effect.gen(function*() {
  yield* Effect.log("Initializing ProductToolkitLive")
  // Here you could access other services or resources needed to implement the
  // handlers, e.g. a database client or external API client.
  //
  // const client = yield* SomeDatabaseClient
  return ProductToolkit.of({
    SearchProducts: Effect.fn("ProductToolkit.SearchProducts")(function*({ query, maxResults }) {
      return [
        new Product({ id: ProductId.make("p-1"), name: `${query} widget`, price: 19.99 }),
        new Product({ id: ProductId.make("p-2"), name: `${query} gadget`, price: 29.99 })
      ].slice(0, maxResults)
    }),
    GetInventory: Effect.fn("ProductToolkit.GetInventory")(function*({ productId }) {
      return { productId, available: 42 }
    })
  })
}))

// ---------------------------------------------------------------------------
// 4. Using tools with LanguageModel
// ---------------------------------------------------------------------------

// Provider setup (same pattern as the language-model example).
const OpenAiClientLayer = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY")
}).pipe(Layer.provide(FetchHttpClient.layer))

export class ProductAssistantError extends Schema.TaggedErrorClass<ProductAssistantError>()(
  "ProductAssistantError",
  { reason: AiError.AiErrorReason }
) {}

// Wrap tool-enabled generation in a service
export class ProductAssistant extends Context.Service<ProductAssistant, {
  answer(question: string): Effect.Effect<{
    readonly text: string
    readonly toolCallCount: number
  }, ProductAssistantError>
}>()("docs/ProductAssistant") {
  static readonly layer = Layer.effect(
    ProductAssistant,
    Effect.gen(function*() {
      // Access the toolkit's handlers by yielding the toolkit definition.
      const toolkit = yield* ProductToolkit

      // Choose a model to use
      const model = yield* OpenAiLanguageModel.model("gpt-5.2").captureRequirements

      const answer = Effect.fn("ProductAssistant.answer")(
        function*(question: string) {
          // Pass the toolkit to `generateText`. The model can call any tool in
          // the toolkit; the framework resolves parameters, invokes handlers,
          // and feeds results back automatically.
          const response = yield* LanguageModel.generateText({
            prompt: question,
            toolkit,
            // You can set `toolChoice` to "required" to force the model to call
            // a tool before responding with text.
            //
            // By default it is set to "auto"
            toolChoice: "required"
          })

          // -------------------------------------------------------------------
          // 5. Inspecting tool calls and results
          // -------------------------------------------------------------------

          // `response.toolCalls` lists every tool the model invoked, each with
          // the tool name, a unique id, and the decoded parameters.
          for (const call of response.toolCalls) {
            yield* Effect.log(`Tool call: ${call.name} id=${call.id}`)
          }

          // `response.toolResults` lists the resolved results, each with the
          // tool name, id, decoded result, and an `isFailure` flag.
          for (const result of response.toolResults) {
            yield* Effect.log(
              `Tool result: ${result.name} id=${result.id} isFailure=${result.isFailure}`
            )
          }

          return {
            text: response.text,
            toolCallCount: response.toolCalls.length
          }
        },
        // Provide the chosen model to use
        Effect.provide(model),
        (_) => _,
        // Map AI errors into our domain error type
        Effect.catchTag(
          "AiError",
          (error) =>
            Effect.fail(
              new ProductAssistantError({
                reason: error.reason
              })
            ),
          // For unexpected errors, die with the original error
          (e) => Effect.die(e)
        )
      )

      return ProductAssistant.of({ answer })
    })
  ).pipe(
    // The toolkit handler layer must be provided so the framework can invoke
    // the tool handlers when the model makes tool calls.
    Layer.provide(ProductToolkitLayer),
    // Also provide the openai client required by OpenAiLanguageModel.model
    Layer.provide(OpenAiClientLayer)
  )
}

// ---------------------------------------------------------------------------
// 6. Provider-defined tools
// ---------------------------------------------------------------------------

// Some providers offer built-in tools (web search, code interpreter, etc.)
// that run server-side. Use `Tool.providerDefined` or the pre-built
// definitions from provider packages.

// OpenAI's web search tool is pre-defined in `@effect/ai-openai`. Calling it
// produces a tool instance that can be merged into any toolkit.
const webSearch = OpenAiTool.WebSearch({
  search_context_size: "medium"
})

// Combine user-defined and provider-defined tools in a single toolkit.
const AssistantToolkit = Toolkit.make(SearchProducts, GetInventory, webSearch)

// Only user-defined tools that require handlers appear in `toLayer`. The
// provider-defined `WebSearch` is executed server-side by the provider.
export const AssistantToolkitLayer = AssistantToolkit.toLayer(Effect.gen(function*() {
  yield* Effect.log("Initializing AssistantToolkitLive")
  return AssistantToolkit.of({
    SearchProducts: Effect.fn("AssistantToolkit.SearchProducts")(function*({ query, maxResults }) {
      return [
        new Product({ id: ProductId.make("p-1"), name: `${query} widget`, price: 19.99 }),
        new Product({ id: ProductId.make("p-2"), name: `${query} gadget`, price: 29.99 })
      ].slice(0, maxResults)
    }),
    GetInventory: Effect.fn("AssistantToolkit.GetInventory")(function*({ productId }) {
      return { productId, available: 42 }
    })
  })
}))
```


### Stateful chat sessions

The AI `Chat` module maintains conversation history automatically. Build
AI agents or chat assistants.

```ts
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai"
import { Config, Context, DateTime, Effect, Layer, Ref, Schema } from "effect"
import { AiError, Chat, Prompt, Tool, Toolkit } from "effect/unstable/ai"
import { FetchHttpClient } from "effect/unstable/http"

// ---------------------------------------------------------------------------
// Provider setup
// ---------------------------------------------------------------------------

const OpenAiClientLayer = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY")
}).pipe(Layer.provide(FetchHttpClient.layer))

// ---------------------------------------------------------------------------
// Tools for the agentic loop
// ---------------------------------------------------------------------------

const Tools = Toolkit.make(Tool.make("getCurrentTime", {
  description: "Get the current time in ISO format",
  parameters: Schema.Struct({
    id: Schema.String
  }),
  success: Schema.String
}))

const ToolsLayer = Tools.toLayer(Effect.gen(function*() {
  yield* Effect.logDebug("Initializing tools...")
  return Tools.of({
    getCurrentTime: Effect.fn("Tools.getCurrentTime")(function*(_) {
      const now = yield* DateTime.now
      return DateTime.formatIso(now)
    })
  })
}))

// ---------------------------------------------------------------------------
// Service that wraps Chat for a domain use-case
// ---------------------------------------------------------------------------

export class AiAssistantError extends Schema.TaggedErrorClass<AiAssistantError>()("AiAssistantError", {
  reason: AiError.AiErrorReason
}) {
  static fromAiError(error: AiError.AiError) {
    return new AiAssistantError({ reason: error.reason })
  }
}

export class AiAssistant extends Context.Service<AiAssistant, {
  // Send a message while maintaining conversation history across turns.
  chat(message: string): Effect.Effect<string, AiAssistantError>
  // Ask a question and use an agentic loop with tool calls to answer it.
  agent(question: string): Effect.Effect<string, AiAssistantError>
}>()("acme/AiAssistant") {
  static readonly layer = Layer.effect(
    AiAssistant,
    Effect.gen(function*() {
      // Choose the model you want to use for the chat sessions.
      const modelLayer = yield* OpenAiLanguageModel.model("gpt-5.2").captureRequirements

      // ---------------------------------------------------------------------------
      // 1. Chat.empty — basic multi-turn conversation
      // ---------------------------------------------------------------------------

      // Create a new chat session with `Chat.empty` or `Chat.fromPrompt`. The
      // session maintains conversation history automatically, so you can focus on
      // the current turn without having to manage context.
      const newSession = yield* Chat.fromPrompt(Prompt.empty.pipe(
        Prompt.setSystem("You are a helpful assistant that answers questions.")
      ))

      // You can also create a chat using a json export.
      const json = yield* newSession.exportJson
      const session = yield* Chat.fromJson(json)

      const chat = Effect.fn("AiAssistant.chat")(
        function*(message: string) {
          // Create a new turn in the conversation by passing the user's message
          // to `session.generateText`.
          const response = yield* session.generateText({ prompt: message }).pipe(
            // Provide the model layer to use.
            // You could potentially use different models for different turns,
            // or even switch models in the middle of a conversation.
            Effect.provide(modelLayer)
          )

          // You can inspect the accumulated history at any point through the
          // `history` ref on the chat instance.
          const history = yield* Ref.get(session.history)
          yield* Effect.logInfo(
            `Conversation has ${history.content.length} messages`
          )

          return response.text
        },
        Effect.mapError((error) => AiAssistantError.fromAiError(error))
      )

      // ---------------------------------------------------------------------------
      // 2. Create agentic loops with tools
      // ---------------------------------------------------------------------------

      const tools = yield* Tools
      const agent = Effect.fn("AiAssistant.agent")(
        function*(question: string) {
          // We start the agent with a system prompt and the user question. The
          // agent can then call tools in a loop until it decides to return a
          // final answer.
          const session = yield* Chat.fromPrompt([
            { role: "system", content: "You are an assistant that can use tools to answer questions." },
            { role: "user", content: question }
          ])

          while (true) {
            const response = yield* session.generateText({
              prompt: [], // No additional prompt — the model has full access to the conversation history
              toolkit: tools // Provide the tools to the model
            }).pipe(
              // Provide the model layer to use.
              // You could potentially use different models for different turns,
              // or even switch models in the middle of a conversation.
              Effect.provide(modelLayer)
            )
            if (response.toolCalls.length > 0) {
              // If the model called any tools, execute them and the Chat module
              // will automatically add the tool results to the conversation
              // history before the next turn.
              continue
            }
            // If there are no tool calls, the model has returned a final answer
            // and we can exit the loop.
            return response.text
          }
        },
        // Remap AI errors to our domain-specific error type, but die on
        // unexpected errors.
        Effect.catchTag(
          "AiError",
          (error) => Effect.fail(AiAssistantError.fromAiError(error)),
          (e) => Effect.die(e)
        )
      )

      return AiAssistant.of({
        chat,
        agent
      })
    })
  ).pipe(
    // Provide the OpenAI client and tools layers to the AiAssistant service.
    Layer.provide([OpenAiClientLayer, ToolsLayer])
  )
}
```

## Building distributed applications with cluster

The cluster modules let you model stateful services as entities and distribute
them across multiple machines.

### Defining cluster entities

Define distributed entity RPCs and run them in a cluster.

```ts
import { NodeClusterSocket, NodeRuntime } from "@effect/platform-node"
import { Effect, Layer, Ref, Schema } from "effect"
import { ClusterSchema, Entity, TestRunner } from "effect/unstable/cluster"
import { Rpc } from "effect/unstable/rpc"
import type { SqlClient } from "effect/unstable/sql"

export const Increment = Rpc.make("Increment", {
  payload: { amount: Schema.Number },
  success: Schema.Number
})

export const GetCount = Rpc.make("GetCount", {
  success: Schema.Number
})
  // If you want GetCount messages to be persisted, you can annotate the RPC
  // schema with `ClusterSchema.Persisted`.
  //
  // By default, messages are volatile and only sent over a network.
  .annotate(ClusterSchema.Persisted, true)

// `Entity.make` takes an array of Rpc definitions
export const Counter = Entity.make("Counter", [Increment, GetCount])

// Entity handlers can keep in-memory state while the entity is active.
// `maxIdleTime` controls passivation: if the entity is idle long enough, it is
// stopped and later recreated on demand.
export const CounterEntityLayer = Counter.toLayer(
  Effect.gen(function*() {
    const count = yield* Ref.make(0)

    return Counter.of({
      Increment: ({ payload }) => Ref.updateAndGet(count, (current) => current + payload.amount),
      GetCount: () =>
        Ref.get(count).pipe(
          // Add Rpc.fork to allow the GetCount handler to run concurrently with
          // Increment handlers.
          //
          // This opts-out of the default behavior where all handlers for a
          // given entity run sequentially.
          Rpc.fork
        )
    })
  }),
  { maxIdleTime: "5 minutes" }
)

// If you ever need to access an entity client, you can use the `client`
// property on the entity definition.
export const useCounter = Effect.gen(function*() {
  const clientFor = yield* Counter.client
  const counter = clientFor("counter-123")

  const afterIncrement = yield* counter.Increment({ amount: 1 })
  const currentCount = yield* counter.GetCount()

  console.log(`Count after increment: ${afterIncrement}, current count: ${currentCount}`)
})

// `SingleRunner.layer` is useful for local development / tests where you still
// want the cluster entity runtime model.
declare const SqlClientLayer: Layer.Layer<SqlClient.SqlClient>

// Create the cluster layer using `NodeClusterSocket.layer`
const ClusterLayer = NodeClusterSocket.layer().pipe(
  Layer.provide(SqlClientLayer)
)

// You can also use `TestRunner.layer` to run your entities in a single process,
// without any network communication and in-memory storage. This is useful for testing and
// development.
const ClusterLayerTest = TestRunner.layer

// Merge all your entity layers together and provide the cluster layer to run
// them in a cluster.
const EntitiesLayer = Layer.mergeAll(
  CounterEntityLayer
)

const ProductionLayer = EntitiesLayer.pipe(
  Layer.provide(ClusterLayer)
)

export const TestLayer = EntitiesLayer.pipe(
  // For testing, we can use `Layer.provideMerge` to tests can access storage
  // and other cluster services directly.
  Layer.provideMerge(ClusterLayerTest)
)

// Finally, run your app with the entities layer.
Layer.launch(ProductionLayer).pipe(
  NodeRuntime.runMain
)
```
