---
title: DurableQueue.ts
nav_order: 348
parent: "effect"
---

## DurableQueue.ts overview

Durable workflow queues delegate work to persisted background workers and
resume the waiting workflow with the worker result.

A workflow calls `process` to encode a payload, offer it to a named
`PersistedQueue`, attach a `DurableDeferred` token, and suspend. A worker
created with `makeWorker` or `worker` takes the item, runs the handler, and
records the handler's `Exit` through that token so the original workflow can
continue with the typed success or error.

Since v4.0.0

---

## Exports Grouped by Category

- [Processing](#processing)
  - [process](#process)
- [Worker](#worker)
  - [makeWorker](#makeworker)
  - [worker](#worker-1)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [DurableQueue (interface)](#durablequeue-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# Processing

## process

Adds an item to the queue and wait for a worker to process it.

**Signature**

```ts
declare const process: <Payload extends Schema.Top, Success extends Schema.Top, Error extends Schema.Top>(
  self: DurableQueue<Payload, Success, Error>,
  payload: Payload["~type.make.in"],
  options?: { readonly retrySchedule?: Schedule.Schedule<any, PersistedQueue.PersistedQueueError> | undefined }
) => Effect.Effect<
  Success["Type"],
  Error["Type"],
  | WorkflowEngine
  | WorkflowInstance
  | PersistedQueue.PersistedQueueFactory
  | Payload["EncodingServices"]
  | Payload["DecodingServices"]
  | Success["DecodingServices"]
  | Error["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L176)

Since v4.0.0

# Worker

## makeWorker

Create a worker effect that processes items from the durable queue.

**Signature**

```ts
declare const makeWorker: <Payload extends Schema.Top, Success extends Schema.Top, Error extends Schema.Top, R>(
  self: DurableQueue<Payload, Success, Error>,
  f: (payload: Payload["Type"]) => Effect.Effect<Success["Type"], Error["Type"], R>,
  options?: { readonly concurrency?: number | undefined } | undefined
) => Effect.Effect<
  never,
  never,
  | WorkflowEngine
  | PersistedQueue.PersistedQueueFactory
  | R
  | Payload["EncodingServices"]
  | Payload["DecodingServices"]
  | Success["EncodingServices"]
  | Error["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L252)

Since v4.0.0

## worker

Create a layer that runs workers for the durable queue.

**Signature**

```ts
declare const worker: <Payload extends Schema.Top, Success extends Schema.Top, Error extends Schema.Top, R>(
  self: DurableQueue<Payload, Success, Error>,
  f: (payload: Payload["Type"]) => Effect.Effect<Success["Type"], Error["Type"], R>,
  options?: { readonly concurrency?: number | undefined } | undefined
) => Layer.Layer<
  never,
  never,
  | WorkflowEngine
  | PersistedQueue.PersistedQueueFactory
  | R
  | Payload["EncodingServices"]
  | Payload["DecodingServices"]
  | Success["EncodingServices"]
  | Error["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L339)

Since v4.0.0

# constructors

## make

Creates a `DurableQueue` that waits for persisted items to finish processing
using a `DurableDeferred`.

**Example** (Defining a durable queue with workers)

```ts
import { Effect, Schema } from "effect"
import { DurableQueue, Workflow } from "effect/unstable/workflow"

// Define a DurableQueue that can be used to derive workers and offer items for
// processing.
const ApiQueue = DurableQueue.make({
  name: "ApiQueue",
  payload: {
    id: Schema.String
  },
  success: Schema.Void,
  error: Schema.Never,
  idempotencyKey(payload) {
    return payload.id
  }
})

const MyWorkflow = Workflow.make("MyWorkflow", {
  payload: {
    id: Schema.String
  },
  idempotencyKey: ({ id }) => id
})

const MyWorkflowLayer = MyWorkflow.toLayer(
  Effect.fnUntraced(function* () {
    // Add an item to the DurableQueue defined above.
    //
    // When the worker has finished processing the item, the workflow will
    // resume.
    //
    yield* DurableQueue.process(ApiQueue, { id: "api-call-1" })

    yield* Effect.log("Workflow succeeded!")
  })
)

// Define a worker layer that can process items from the DurableQueue.
const ApiWorker = DurableQueue.worker(
  ApiQueue,
  Effect.fnUntraced(function* ({ id }) {
    yield* Effect.log(`Worker processing API call with id: ${id}`)
  }),
  { concurrency: 5 } // Process up to 5 items concurrently
)
```

**Signature**

```ts
declare const make: <
  Payload extends Schema.Top | Schema.Struct.Fields,
  Success extends Schema.Top = Schema.Void,
  Error extends Schema.Top = Schema.Never
>(options: {
  readonly name: string
  readonly payload: Payload
  readonly idempotencyKey: (
    payload: Payload extends Schema.Struct.Fields ? Schema.Struct.Type<Payload> : Payload["Type"]
  ) => string
  readonly success?: Success | undefined
  readonly error?: Error | undefined
}) => DurableQueue<Payload extends Schema.Struct.Fields ? Schema.Struct<Payload> : Payload, Success, Error>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L115)

Since v4.0.0

# models

## DurableQueue (interface)

Durable workflow queue definition containing a payload schema, idempotency
key, and deferred used to await worker results.

**Signature**

```ts
export interface DurableQueue<
  Payload extends Schema.Top,
  Success extends Schema.Top = Schema.Void,
  Error extends Schema.Top = Schema.Never
> {
  readonly [TypeId]: TypeId
  readonly name: string
  readonly payloadSchema: Payload
  readonly idempotencyKey: (payload: Payload["Type"]) => string
  readonly deferred: DurableDeferred.DurableDeferred<Success, Error>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L46)

Since v4.0.0

# type IDs

## TypeId

Runtime identifier attached to `DurableQueue` values.

**Signature**

```ts
declare const TypeId: "~effect/workflow/DurableQueue"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L37)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to recognize `DurableQueue` values.

**Signature**

```ts
type TypeId = "~effect/workflow/DurableQueue"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DurableQueue.ts#L29)

Since v4.0.0
