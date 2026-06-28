---
title: "Effect"
---

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
