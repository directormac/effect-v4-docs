---
title: index.ts
nav_order: 46
parent: "effect"
---

## index.ts overview

Since v2.0.0

---

## Exports Grouped by Category

- [utils](#utils)
  - [Array (namespace export)](#array-namespace-export)
  - [BigDecimal (namespace export)](#bigdecimal-namespace-export)
  - [BigInt (namespace export)](#bigint-namespace-export)
  - [Boolean (namespace export)](#boolean-namespace-export)
  - [Brand (namespace export)](#brand-namespace-export)
  - [Cache (namespace export)](#cache-namespace-export)
  - [Cause (namespace export)](#cause-namespace-export)
  - [Channel (namespace export)](#channel-namespace-export)
  - [ChannelSchema (namespace export)](#channelschema-namespace-export)
  - [Chunk (namespace export)](#chunk-namespace-export)
  - [Clock (namespace export)](#clock-namespace-export)
  - [Combiner (namespace export)](#combiner-namespace-export)
  - [Config (namespace export)](#config-namespace-export)
  - [ConfigProvider (namespace export)](#configprovider-namespace-export)
  - [Console (namespace export)](#console-namespace-export)
  - [Context (namespace export)](#context-namespace-export)
  - [Cron (namespace export)](#cron-namespace-export)
  - [Crypto (namespace export)](#crypto-namespace-export)
  - [Data (namespace export)](#data-namespace-export)
  - [DateTime (namespace export)](#datetime-namespace-export)
  - [Deferred (namespace export)](#deferred-namespace-export)
  - [Differ (namespace export)](#differ-namespace-export)
  - [Duration (namespace export)](#duration-namespace-export)
  - [Effect (namespace export)](#effect-namespace-export)
  - [Effectable (namespace export)](#effectable-namespace-export)
  - [Encoding (namespace export)](#encoding-namespace-export)
  - [Equal (namespace export)](#equal-namespace-export)
  - [Equivalence (namespace export)](#equivalence-namespace-export)
  - [ErrorReporter (namespace export)](#errorreporter-namespace-export)
  - [ExecutionPlan (namespace export)](#executionplan-namespace-export)
  - [Exit (namespace export)](#exit-namespace-export)
  - [Fiber (namespace export)](#fiber-namespace-export)
  - [FiberHandle (namespace export)](#fiberhandle-namespace-export)
  - [FiberMap (namespace export)](#fibermap-namespace-export)
  - [FiberSet (namespace export)](#fiberset-namespace-export)
  - [FileSystem (namespace export)](#filesystem-namespace-export)
  - [Filter (namespace export)](#filter-namespace-export)
  - [Formatter (namespace export)](#formatter-namespace-export)
  - [Function (namespace export)](#function-namespace-export)
  - [Graph (namespace export)](#graph-namespace-export)
  - [HKT (namespace export)](#hkt-namespace-export)
  - [Hash (namespace export)](#hash-namespace-export)
  - [HashMap (namespace export)](#hashmap-namespace-export)
  - [HashRing (namespace export)](#hashring-namespace-export)
  - [HashSet (namespace export)](#hashset-namespace-export)
  - [Inspectable (namespace export)](#inspectable-namespace-export)
  - [Iterable (namespace export)](#iterable-namespace-export)
  - [JsonPatch (namespace export)](#jsonpatch-namespace-export)
  - [JsonPointer (namespace export)](#jsonpointer-namespace-export)
  - [JsonSchema (namespace export)](#jsonschema-namespace-export)
  - [Latch (namespace export)](#latch-namespace-export)
  - [Layer (namespace export)](#layer-namespace-export)
  - [LayerMap (namespace export)](#layermap-namespace-export)
  - [LogLevel (namespace export)](#loglevel-namespace-export)
  - [Logger (namespace export)](#logger-namespace-export)
  - [ManagedRuntime (namespace export)](#managedruntime-namespace-export)
  - [Match (namespace export)](#match-namespace-export)
  - [Metric (namespace export)](#metric-namespace-export)
  - [MutableHashMap (namespace export)](#mutablehashmap-namespace-export)
  - [MutableHashSet (namespace export)](#mutablehashset-namespace-export)
  - [MutableList (namespace export)](#mutablelist-namespace-export)
  - [MutableRef (namespace export)](#mutableref-namespace-export)
  - [Newtype (namespace export)](#newtype-namespace-export)
  - [NonEmptyIterable (namespace export)](#nonemptyiterable-namespace-export)
  - [Number (namespace export)](#number-namespace-export)
  - [Optic (namespace export)](#optic-namespace-export)
  - [Option (namespace export)](#option-namespace-export)
  - [Order (namespace export)](#order-namespace-export)
  - [Ordering (namespace export)](#ordering-namespace-export)
  - [PartitionedSemaphore (namespace export)](#partitionedsemaphore-namespace-export)
  - [Path (namespace export)](#path-namespace-export)
  - [Pipeable (namespace export)](#pipeable-namespace-export)
  - [PlatformError (namespace export)](#platformerror-namespace-export)
  - [Pool (namespace export)](#pool-namespace-export)
  - [Predicate (namespace export)](#predicate-namespace-export)
  - [PrimaryKey (namespace export)](#primarykey-namespace-export)
  - [PubSub (namespace export)](#pubsub-namespace-export)
  - [Pull (namespace export)](#pull-namespace-export)
  - [Queue (namespace export)](#queue-namespace-export)
  - [Random (namespace export)](#random-namespace-export)
  - [RcMap (namespace export)](#rcmap-namespace-export)
  - [RcRef (namespace export)](#rcref-namespace-export)
  - [Record (namespace export)](#record-namespace-export)
  - [Redactable (namespace export)](#redactable-namespace-export)
  - [Redacted (namespace export)](#redacted-namespace-export)
  - [Reducer (namespace export)](#reducer-namespace-export)
  - [Ref (namespace export)](#ref-namespace-export)
  - [References (namespace export)](#references-namespace-export)
  - [RegExp (namespace export)](#regexp-namespace-export)
  - [Request (namespace export)](#request-namespace-export)
  - [RequestResolver (namespace export)](#requestresolver-namespace-export)
  - [Resource (namespace export)](#resource-namespace-export)
  - [Result (namespace export)](#result-namespace-export)
  - [Runtime (namespace export)](#runtime-namespace-export)
  - [Schedule (namespace export)](#schedule-namespace-export)
  - [Scheduler (namespace export)](#scheduler-namespace-export)
  - [Schema (namespace export)](#schema-namespace-export)
  - [SchemaAST (namespace export)](#schemaast-namespace-export)
  - [SchemaGetter (namespace export)](#schemagetter-namespace-export)
  - [SchemaIssue (namespace export)](#schemaissue-namespace-export)
  - [SchemaParser (namespace export)](#schemaparser-namespace-export)
  - [SchemaRepresentation (namespace export)](#schemarepresentation-namespace-export)
  - [SchemaTransformation (namespace export)](#schematransformation-namespace-export)
  - [SchemaUtils (namespace export)](#schemautils-namespace-export)
  - [Scope (namespace export)](#scope-namespace-export)
  - [ScopedCache (namespace export)](#scopedcache-namespace-export)
  - [ScopedRef (namespace export)](#scopedref-namespace-export)
  - [Semaphore (namespace export)](#semaphore-namespace-export)
  - [Sink (namespace export)](#sink-namespace-export)
  - [Stdio (namespace export)](#stdio-namespace-export)
  - [Stream (namespace export)](#stream-namespace-export)
  - [String (namespace export)](#string-namespace-export)
  - [Struct (namespace export)](#struct-namespace-export)
  - [SubscriptionRef (namespace export)](#subscriptionref-namespace-export)
  - [Symbol (namespace export)](#symbol-namespace-export)
  - [SynchronizedRef (namespace export)](#synchronizedref-namespace-export)
  - [Take (namespace export)](#take-namespace-export)
  - [Terminal (namespace export)](#terminal-namespace-export)
  - [Tracer (namespace export)](#tracer-namespace-export)
  - [Trie (namespace export)](#trie-namespace-export)
  - [Tuple (namespace export)](#tuple-namespace-export)
  - [TxChunk (namespace export)](#txchunk-namespace-export)
  - [TxDeferred (namespace export)](#txdeferred-namespace-export)
  - [TxHashMap (namespace export)](#txhashmap-namespace-export)
  - [TxHashSet (namespace export)](#txhashset-namespace-export)
  - [TxPriorityQueue (namespace export)](#txpriorityqueue-namespace-export)
  - [TxPubSub (namespace export)](#txpubsub-namespace-export)
  - [TxQueue (namespace export)](#txqueue-namespace-export)
  - [TxReentrantLock (namespace export)](#txreentrantlock-namespace-export)
  - [TxRef (namespace export)](#txref-namespace-export)
  - [TxSemaphore (namespace export)](#txsemaphore-namespace-export)
  - [TxSubscriptionRef (namespace export)](#txsubscriptionref-namespace-export)
  - [Types (namespace export)](#types-namespace-export)
  - [UndefinedOr (namespace export)](#undefinedor-namespace-export)
  - [Unify (namespace export)](#unify-namespace-export)
  - [Utils (namespace export)](#utils-namespace-export)
  - [absurd](#absurd)
  - [cast](#cast)
  - [flow](#flow)
  - [hole](#hole)
  - [identity](#identity)
  - [pipe](#pipe)

---

# utils

## Array (namespace export)

Re-exports all named exports from the "./Array.ts" module as `Array`.

**Signature**

```ts
export * as Array from "./Array.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L37)

Since v2.0.0

## BigDecimal (namespace export)

Re-exports all named exports from the "./BigDecimal.ts" module as `BigDecimal`.

**Signature**

```ts
export * as BigDecimal from "./BigDecimal.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L42)

Since v2.0.0

## BigInt (namespace export)

Re-exports all named exports from the "./BigInt.ts" module as `BigInt`.

**Signature**

```ts
export * as BigInt from "./BigInt.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L47)

Since v2.0.0

## Boolean (namespace export)

Re-exports all named exports from the "./Boolean.ts" module as `Boolean`.

**Signature**

```ts
export * as Boolean from "./Boolean.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L52)

Since v2.0.0

## Brand (namespace export)

Re-exports all named exports from the "./Brand.ts" module as `Brand`.

**Signature**

```ts
export * as Brand from "./Brand.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L57)

Since v2.0.0

## Cache (namespace export)

Re-exports all named exports from the "./Cache.ts" module as `Cache`.

**Signature**

```ts
export * as Cache from "./Cache.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L62)

Since v4.0.0

## Cause (namespace export)

Re-exports all named exports from the "./Cause.ts" module as `Cause`.

**Signature**

```ts
export * as Cause from "./Cause.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L67)

Since v2.0.0

## Channel (namespace export)

Re-exports all named exports from the "./Channel.ts" module as `Channel`.

**Signature**

```ts
export * as Channel from "./Channel.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L72)

Since v2.0.0

## ChannelSchema (namespace export)

Re-exports all named exports from the "./ChannelSchema.ts" module as `ChannelSchema`.

**Signature**

```ts
export * as ChannelSchema from "./ChannelSchema.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L77)

Since v4.0.0

## Chunk (namespace export)

Re-exports all named exports from the "./Chunk.ts" module as `Chunk`.

**Signature**

```ts
export * as Chunk from "./Chunk.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L82)

Since v2.0.0

## Clock (namespace export)

Re-exports all named exports from the "./Clock.ts" module as `Clock`.

**Signature**

```ts
export * as Clock from "./Clock.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L87)

Since v2.0.0

## Combiner (namespace export)

Re-exports all named exports from the "./Combiner.ts" module as `Combiner`.

**Signature**

```ts
export * as Combiner from "./Combiner.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L92)

Since v4.0.0

## Config (namespace export)

Re-exports all named exports from the "./Config.ts" module as `Config`.

**Signature**

```ts
export * as Config from "./Config.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L97)

Since v4.0.0

## ConfigProvider (namespace export)

Re-exports all named exports from the "./ConfigProvider.ts" module as `ConfigProvider`.

**Signature**

```ts
export * as ConfigProvider from "./ConfigProvider.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L102)

Since v4.0.0

## Console (namespace export)

Re-exports all named exports from the "./Console.ts" module as `Console`.

**Signature**

```ts
export * as Console from "./Console.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L107)

Since v2.0.0

## Context (namespace export)

Re-exports all named exports from the "./Context.ts" module as `Context`.

**Signature**

```ts
export * as Context from "./Context.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L112)

Since v4.0.0

## Cron (namespace export)

Re-exports all named exports from the "./Cron.ts" module as `Cron`.

**Signature**

```ts
export * as Cron from "./Cron.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L117)

Since v2.0.0

## Crypto (namespace export)

Re-exports all named exports from the "./Crypto.ts" module as `Crypto`.

**Signature**

```ts
export * as Crypto from "./Crypto.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L122)

Since v4.0.0

## Data (namespace export)

Re-exports all named exports from the "./Data.ts" module as `Data`.

**Signature**

```ts
export * as Data from "./Data.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L127)

Since v2.0.0

## DateTime (namespace export)

Re-exports all named exports from the "./DateTime.ts" module as `DateTime`.

**Signature**

```ts
export * as DateTime from "./DateTime.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L132)

Since v3.6.0

## Deferred (namespace export)

Re-exports all named exports from the "./Deferred.ts" module as `Deferred`.

**Signature**

```ts
export * as Deferred from "./Deferred.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L137)

Since v2.0.0

## Differ (namespace export)

Re-exports all named exports from the "./Differ.ts" module as `Differ`.

**Signature**

```ts
export * as Differ from "./Differ.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L142)

Since v4.0.0

## Duration (namespace export)

Re-exports all named exports from the "./Duration.ts" module as `Duration`.

**Signature**

```ts
export * as Duration from "./Duration.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L147)

Since v2.0.0

## Effect (namespace export)

Re-exports all named exports from the "./Effect.ts" module as `Effect`.

**Signature**

```ts
export * as Effect from "./Effect.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L152)

Since v2.0.0

## Effectable (namespace export)

Re-exports all named exports from the "./Effectable.ts" module as `Effectable`.

**Signature**

```ts
export * as Effectable from "./Effectable.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L157)

Since v4.0.0

## Encoding (namespace export)

Re-exports all named exports from the "./Encoding.ts" module as `Encoding`.

**Signature**

```ts
export * as Encoding from "./Encoding.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L162)

Since v4.0.0

## Equal (namespace export)

Re-exports all named exports from the "./Equal.ts" module as `Equal`.

**Signature**

```ts
export * as Equal from "./Equal.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L167)

Since v2.0.0

## Equivalence (namespace export)

Re-exports all named exports from the "./Equivalence.ts" module as `Equivalence`.

**Signature**

```ts
export * as Equivalence from "./Equivalence.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L172)

Since v2.0.0

## ErrorReporter (namespace export)

Re-exports all named exports from the "./ErrorReporter.ts" module as `ErrorReporter`.

**Signature**

```ts
export * as ErrorReporter from "./ErrorReporter.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L177)

Since v4.0.0

## ExecutionPlan (namespace export)

Re-exports all named exports from the "./ExecutionPlan.ts" module as `ExecutionPlan`.

**Signature**

```ts
export * as ExecutionPlan from "./ExecutionPlan.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L182)

Since v3.16.0

## Exit (namespace export)

Re-exports all named exports from the "./Exit.ts" module as `Exit`.

**Signature**

```ts
export * as Exit from "./Exit.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L187)

Since v2.0.0

## Fiber (namespace export)

Re-exports all named exports from the "./Fiber.ts" module as `Fiber`.

**Signature**

```ts
export * as Fiber from "./Fiber.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L192)

Since v2.0.0

## FiberHandle (namespace export)

Re-exports all named exports from the "./FiberHandle.ts" module as `FiberHandle`.

**Signature**

```ts
export * as FiberHandle from "./FiberHandle.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L197)

Since v2.0.0

## FiberMap (namespace export)

Re-exports all named exports from the "./FiberMap.ts" module as `FiberMap`.

**Signature**

```ts
export * as FiberMap from "./FiberMap.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L202)

Since v2.0.0

## FiberSet (namespace export)

Re-exports all named exports from the "./FiberSet.ts" module as `FiberSet`.

**Signature**

```ts
export * as FiberSet from "./FiberSet.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L207)

Since v2.0.0

## FileSystem (namespace export)

Re-exports all named exports from the "./FileSystem.ts" module as `FileSystem`.

**Signature**

```ts
export * as FileSystem from "./FileSystem.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L212)

Since v4.0.0

## Filter (namespace export)

Re-exports all named exports from the "./Filter.ts" module as `Filter`.

**Signature**

```ts
export * as Filter from "./Filter.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L217)

Since v4.0.0

## Formatter (namespace export)

Re-exports all named exports from the "./Formatter.ts" module as `Formatter`.

**Signature**

```ts
export * as Formatter from "./Formatter.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L222)

Since v4.0.0

## Function (namespace export)

Re-exports all named exports from the "./Function.ts" module as `Function`.

**Signature**

```ts
export * as Function from "./Function.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L227)

Since v2.0.0

## Graph (namespace export)

Re-exports all named exports from the "./Graph.ts" module as `Graph`.

**Signature**

```ts
export * as Graph from "./Graph.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L232)

Since v4.0.0

## HKT (namespace export)

Re-exports all named exports from the "./HKT.ts" module as `HKT`.

**Signature**

```ts
export * as HKT from "./HKT.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L257)

Since v2.0.0

## Hash (namespace export)

Re-exports all named exports from the "./Hash.ts" module as `Hash`.

**Signature**

```ts
export * as Hash from "./Hash.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L237)

Since v2.0.0

## HashMap (namespace export)

Re-exports all named exports from the "./HashMap.ts" module as `HashMap`.

**Signature**

```ts
export * as HashMap from "./HashMap.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L242)

Since v2.0.0

## HashRing (namespace export)

Re-exports all named exports from the "./HashRing.ts" module as `HashRing`.

**Signature**

```ts
export * as HashRing from "./HashRing.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L247)

Since v4.0.0

## HashSet (namespace export)

Re-exports all named exports from the "./HashSet.ts" module as `HashSet`.

**Signature**

```ts
export * as HashSet from "./HashSet.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L252)

Since v2.0.0

## Inspectable (namespace export)

Re-exports all named exports from the "./Inspectable.ts" module as `Inspectable`.

**Signature**

```ts
export * as Inspectable from "./Inspectable.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L262)

Since v2.0.0

## Iterable (namespace export)

Re-exports all named exports from the "./Iterable.ts" module as `Iterable`.

**Signature**

```ts
export * as Iterable from "./Iterable.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L267)

Since v2.0.0

## JsonPatch (namespace export)

Re-exports all named exports from the "./JsonPatch.ts" module as `JsonPatch`.

**Signature**

```ts
export * as JsonPatch from "./JsonPatch.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L272)

Since v4.0.0

## JsonPointer (namespace export)

Re-exports all named exports from the "./JsonPointer.ts" module as `JsonPointer`.

**Signature**

```ts
export * as JsonPointer from "./JsonPointer.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L277)

Since v4.0.0

## JsonSchema (namespace export)

Re-exports all named exports from the "./JsonSchema.ts" module as `JsonSchema`.

**Signature**

```ts
export * as JsonSchema from "./JsonSchema.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L282)

Since v4.0.0

## Latch (namespace export)

Re-exports all named exports from the "./Latch.ts" module as `Latch`.

**Signature**

```ts
export * as Latch from "./Latch.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L287)

Since v4.0.0

## Layer (namespace export)

Re-exports all named exports from the "./Layer.ts" module as `Layer`.

**Signature**

```ts
export * as Layer from "./Layer.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L292)

Since v2.0.0

## LayerMap (namespace export)

Re-exports all named exports from the "./LayerMap.ts" module as `LayerMap`.

**Signature**

```ts
export * as LayerMap from "./LayerMap.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L297)

Since v3.14.0

## LogLevel (namespace export)

Re-exports all named exports from the "./LogLevel.ts" module as `LogLevel`.

**Signature**

```ts
export * as LogLevel from "./LogLevel.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L307)

Since v2.0.0

## Logger (namespace export)

Re-exports all named exports from the "./Logger.ts" module as `Logger`.

**Signature**

```ts
export * as Logger from "./Logger.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L302)

Since v2.0.0

## ManagedRuntime (namespace export)

Re-exports all named exports from the "./ManagedRuntime.ts" module as `ManagedRuntime`.

**Signature**

```ts
export * as ManagedRuntime from "./ManagedRuntime.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L312)

Since v2.0.0

## Match (namespace export)

Re-exports all named exports from the "./Match.ts" module as `Match`.

**Signature**

```ts
export * as Match from "./Match.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L317)

Since v4.0.0

## Metric (namespace export)

Re-exports all named exports from the "./Metric.ts" module as `Metric`.

**Signature**

```ts
export * as Metric from "./Metric.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L322)

Since v2.0.0

## MutableHashMap (namespace export)

Re-exports all named exports from the "./MutableHashMap.ts" module as `MutableHashMap`.

**Signature**

```ts
export * as MutableHashMap from "./MutableHashMap.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L327)

Since v2.0.0

## MutableHashSet (namespace export)

Re-exports all named exports from the "./MutableHashSet.ts" module as `MutableHashSet`.

**Signature**

```ts
export * as MutableHashSet from "./MutableHashSet.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L332)

Since v2.0.0

## MutableList (namespace export)

Re-exports all named exports from the "./MutableList.ts" module as `MutableList`.

**Signature**

```ts
export * as MutableList from "./MutableList.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L337)

Since v4.0.0

## MutableRef (namespace export)

Re-exports all named exports from the "./MutableRef.ts" module as `MutableRef`.

**Signature**

```ts
export * as MutableRef from "./MutableRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L342)

Since v2.0.0

## Newtype (namespace export)

Re-exports all named exports from the "./Newtype.ts" module as `Newtype`.

**Signature**

```ts
export * as Newtype from "./Newtype.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L347)

Since v4.0.0

## NonEmptyIterable (namespace export)

Re-exports all named exports from the "./NonEmptyIterable.ts" module as `NonEmptyIterable`.

**Signature**

```ts
export * as NonEmptyIterable from "./NonEmptyIterable.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L352)

Since v2.0.0

## Number (namespace export)

Re-exports all named exports from the "./Number.ts" module as `Number`.

**Signature**

```ts
export * as Number from "./Number.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L357)

Since v2.0.0

## Optic (namespace export)

Re-exports all named exports from the "./Optic.ts" module as `Optic`.

**Signature**

```ts
export * as Optic from "./Optic.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L362)

Since v4.0.0

## Option (namespace export)

Re-exports all named exports from the "./Option.ts" module as `Option`.

**Signature**

```ts
export * as Option from "./Option.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L367)

Since v2.0.0

## Order (namespace export)

Re-exports all named exports from the "./Order.ts" module as `Order`.

**Signature**

```ts
export * as Order from "./Order.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L372)

Since v2.0.0

## Ordering (namespace export)

Re-exports all named exports from the "./Ordering.ts" module as `Ordering`.

**Signature**

```ts
export * as Ordering from "./Ordering.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L377)

Since v2.0.0

## PartitionedSemaphore (namespace export)

Re-exports all named exports from the "./PartitionedSemaphore.ts" module as `PartitionedSemaphore`.

**Signature**

```ts
export * as PartitionedSemaphore from "./PartitionedSemaphore.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L382)

Since v4.0.0

## Path (namespace export)

Re-exports all named exports from the "./Path.ts" module as `Path`.

**Signature**

```ts
export * as Path from "./Path.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L387)

Since v4.0.0

## Pipeable (namespace export)

Re-exports all named exports from the "./Pipeable.ts" module as `Pipeable`.

**Signature**

```ts
export * as Pipeable from "./Pipeable.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L392)

Since v2.0.0

## PlatformError (namespace export)

Re-exports all named exports from the "./PlatformError.ts" module as `PlatformError`.

**Signature**

```ts
export * as PlatformError from "./PlatformError.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L397)

Since v4.0.0

## Pool (namespace export)

Re-exports all named exports from the "./Pool.ts" module as `Pool`.

**Signature**

```ts
export * as Pool from "./Pool.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L402)

Since v2.0.0

## Predicate (namespace export)

Re-exports all named exports from the "./Predicate.ts" module as `Predicate`.

**Signature**

```ts
export * as Predicate from "./Predicate.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L407)

Since v2.0.0

## PrimaryKey (namespace export)

Re-exports all named exports from the "./PrimaryKey.ts" module as `PrimaryKey`.

**Signature**

```ts
export * as PrimaryKey from "./PrimaryKey.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L412)

Since v2.0.0

## PubSub (namespace export)

Re-exports all named exports from the "./PubSub.ts" module as `PubSub`.

**Signature**

```ts
export * as PubSub from "./PubSub.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L417)

Since v2.0.0

## Pull (namespace export)

Re-exports all named exports from the "./Pull.ts" module as `Pull`.

**Signature**

```ts
export * as Pull from "./Pull.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L422)

Since v4.0.0

## Queue (namespace export)

Re-exports all named exports from the "./Queue.ts" module as `Queue`.

**Signature**

```ts
export * as Queue from "./Queue.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L427)

Since v3.8.0

## Random (namespace export)

Re-exports all named exports from the "./Random.ts" module as `Random`.

**Signature**

```ts
export * as Random from "./Random.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L432)

Since v4.0.0

## RcMap (namespace export)

Re-exports all named exports from the "./RcMap.ts" module as `RcMap`.

**Signature**

```ts
export * as RcMap from "./RcMap.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L437)

Since v3.5.0

## RcRef (namespace export)

Re-exports all named exports from the "./RcRef.ts" module as `RcRef`.

**Signature**

```ts
export * as RcRef from "./RcRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L442)

Since v3.5.0

## Record (namespace export)

Re-exports all named exports from the "./Record.ts" module as `Record`.

**Signature**

```ts
export * as Record from "./Record.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L447)

Since v2.0.0

## Redactable (namespace export)

Re-exports all named exports from the "./Redactable.ts" module as `Redactable`.

**Signature**

```ts
export * as Redactable from "./Redactable.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L452)

Since v4.0.0

## Redacted (namespace export)

Re-exports all named exports from the "./Redacted.ts" module as `Redacted`.

**Signature**

```ts
export * as Redacted from "./Redacted.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L457)

Since v3.3.0

## Reducer (namespace export)

Re-exports all named exports from the "./Reducer.ts" module as `Reducer`.

**Signature**

```ts
export * as Reducer from "./Reducer.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L462)

Since v4.0.0

## Ref (namespace export)

Re-exports all named exports from the "./Ref.ts" module as `Ref`.

**Signature**

```ts
export * as Ref from "./Ref.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L467)

Since v2.0.0

## References (namespace export)

Re-exports all named exports from the "./References.ts" module as `References`.

**Signature**

```ts
export * as References from "./References.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L472)

Since v4.0.0

## RegExp (namespace export)

Re-exports all named exports from the "./RegExp.ts" module as `RegExp`.

**Signature**

```ts
export * as RegExp from "./RegExp.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L477)

Since v2.0.0

## Request (namespace export)

Re-exports all named exports from the "./Request.ts" module as `Request`.

**Signature**

```ts
export * as Request from "./Request.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L482)

Since v2.0.0

## RequestResolver (namespace export)

Re-exports all named exports from the "./RequestResolver.ts" module as `RequestResolver`.

**Signature**

```ts
export * as RequestResolver from "./RequestResolver.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L487)

Since v2.0.0

## Resource (namespace export)

Re-exports all named exports from the "./Resource.ts" module as `Resource`.

**Signature**

```ts
export * as Resource from "./Resource.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L492)

Since v2.0.0

## Result (namespace export)

Re-exports all named exports from the "./Result.ts" module as `Result`.

**Signature**

```ts
export * as Result from "./Result.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L497)

Since v4.0.0

## Runtime (namespace export)

Re-exports all named exports from the "./Runtime.ts" module as `Runtime`.

**Signature**

```ts
export * as Runtime from "./Runtime.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L502)

Since v4.0.0

## Schedule (namespace export)

Re-exports all named exports from the "./Schedule.ts" module as `Schedule`.

**Signature**

```ts
export * as Schedule from "./Schedule.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L507)

Since v2.0.0

## Scheduler (namespace export)

Re-exports all named exports from the "./Scheduler.ts" module as `Scheduler`.

**Signature**

```ts
export * as Scheduler from "./Scheduler.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L512)

Since v2.0.0

## Schema (namespace export)

Re-exports all named exports from the "./Schema.ts" module as `Schema`.

**Signature**

```ts
export * as Schema from "./Schema.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L517)

Since v4.0.0

## SchemaAST (namespace export)

Re-exports all named exports from the "./SchemaAST.ts" module as `SchemaAST`.

**Signature**

```ts
export * as SchemaAST from "./SchemaAST.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L522)

Since v4.0.0

## SchemaGetter (namespace export)

Re-exports all named exports from the "./SchemaGetter.ts" module as `SchemaGetter`.

**Signature**

```ts
export * as SchemaGetter from "./SchemaGetter.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L527)

Since v4.0.0

## SchemaIssue (namespace export)

Re-exports all named exports from the "./SchemaIssue.ts" module as `SchemaIssue`.

**Signature**

```ts
export * as SchemaIssue from "./SchemaIssue.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L532)

Since v4.0.0

## SchemaParser (namespace export)

Re-exports all named exports from the "./SchemaParser.ts" module as `SchemaParser`.

**Signature**

```ts
export * as SchemaParser from "./SchemaParser.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L537)

Since v4.0.0

## SchemaRepresentation (namespace export)

Re-exports all named exports from the "./SchemaRepresentation.ts" module as `SchemaRepresentation`.

**Signature**

```ts
export * as SchemaRepresentation from "./SchemaRepresentation.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L542)

Since v4.0.0

## SchemaTransformation (namespace export)

Re-exports all named exports from the "./SchemaTransformation.ts" module as `SchemaTransformation`.

**Signature**

```ts
export * as SchemaTransformation from "./SchemaTransformation.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L547)

Since v4.0.0

## SchemaUtils (namespace export)

Re-exports all named exports from the "./SchemaUtils.ts" module as `SchemaUtils`.

**Signature**

```ts
export * as SchemaUtils from "./SchemaUtils.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L552)

Since v4.0.0

## Scope (namespace export)

Re-exports all named exports from the "./Scope.ts" module as `Scope`.

**Signature**

```ts
export * as Scope from "./Scope.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L557)

Since v2.0.0

## ScopedCache (namespace export)

Re-exports all named exports from the "./ScopedCache.ts" module as `ScopedCache`.

**Signature**

```ts
export * as ScopedCache from "./ScopedCache.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L562)

Since v4.0.0

## ScopedRef (namespace export)

Re-exports all named exports from the "./ScopedRef.ts" module as `ScopedRef`.

**Signature**

```ts
export * as ScopedRef from "./ScopedRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L567)

Since v2.0.0

## Semaphore (namespace export)

Re-exports all named exports from the "./Semaphore.ts" module as `Semaphore`.

**Signature**

```ts
export * as Semaphore from "./Semaphore.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L572)

Since v4.0.0

## Sink (namespace export)

Re-exports all named exports from the "./Sink.ts" module as `Sink`.

**Signature**

```ts
export * as Sink from "./Sink.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L577)

Since v2.0.0

## Stdio (namespace export)

Re-exports all named exports from the "./Stdio.ts" module as `Stdio`.

**Signature**

```ts
export * as Stdio from "./Stdio.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L582)

Since v4.0.0

## Stream (namespace export)

Re-exports all named exports from the "./Stream.ts" module as `Stream`.

**Signature**

```ts
export * as Stream from "./Stream.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L587)

Since v2.0.0

## String (namespace export)

Re-exports all named exports from the "./String.ts" module as `String`.

**Signature**

```ts
export * as String from "./String.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L592)

Since v2.0.0

## Struct (namespace export)

Re-exports all named exports from the "./Struct.ts" module as `Struct`.

**Signature**

```ts
export * as Struct from "./Struct.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L597)

Since v2.0.0

## SubscriptionRef (namespace export)

Re-exports all named exports from the "./SubscriptionRef.ts" module as `SubscriptionRef`.

**Signature**

```ts
export * as SubscriptionRef from "./SubscriptionRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L602)

Since v2.0.0

## Symbol (namespace export)

Re-exports all named exports from the "./Symbol.ts" module as `Symbol`.

**Signature**

```ts
export * as Symbol from "./Symbol.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L607)

Since v2.0.0

## SynchronizedRef (namespace export)

Re-exports all named exports from the "./SynchronizedRef.ts" module as `SynchronizedRef`.

**Signature**

```ts
export * as SynchronizedRef from "./SynchronizedRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L612)

Since v2.0.0

## Take (namespace export)

Re-exports all named exports from the "./Take.ts" module as `Take`.

**Signature**

```ts
export * as Take from "./Take.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L617)

Since v2.0.0

## Terminal (namespace export)

Re-exports all named exports from the "./Terminal.ts" module as `Terminal`.

**Signature**

```ts
export * as Terminal from "./Terminal.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L622)

Since v4.0.0

## Tracer (namespace export)

Re-exports all named exports from the "./Tracer.ts" module as `Tracer`.

**Signature**

```ts
export * as Tracer from "./Tracer.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L627)

Since v2.0.0

## Trie (namespace export)

Re-exports all named exports from the "./Trie.ts" module as `Trie`.

**Signature**

```ts
export * as Trie from "./Trie.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L632)

Since v2.0.0

## Tuple (namespace export)

Re-exports all named exports from the "./Tuple.ts" module as `Tuple`.

**Signature**

```ts
export * as Tuple from "./Tuple.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L637)

Since v2.0.0

## TxChunk (namespace export)

Re-exports all named exports from the "./TxChunk.ts" module as `TxChunk`.

**Signature**

```ts
export * as TxChunk from "./TxChunk.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L642)

Since v4.0.0

## TxDeferred (namespace export)

Re-exports all named exports from the "./TxDeferred.ts" module as `TxDeferred`.

**Signature**

```ts
export * as TxDeferred from "./TxDeferred.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L647)

Since v4.0.0

## TxHashMap (namespace export)

Re-exports all named exports from the "./TxHashMap.ts" module as `TxHashMap`.

**Signature**

```ts
export * as TxHashMap from "./TxHashMap.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L652)

Since v2.0.0

## TxHashSet (namespace export)

Re-exports all named exports from the "./TxHashSet.ts" module as `TxHashSet`.

**Signature**

```ts
export * as TxHashSet from "./TxHashSet.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L657)

Since v2.0.0

## TxPriorityQueue (namespace export)

Re-exports all named exports from the "./TxPriorityQueue.ts" module as `TxPriorityQueue`.

**Signature**

```ts
export * as TxPriorityQueue from "./TxPriorityQueue.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L662)

Since v4.0.0

## TxPubSub (namespace export)

Re-exports all named exports from the "./TxPubSub.ts" module as `TxPubSub`.

**Signature**

```ts
export * as TxPubSub from "./TxPubSub.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L667)

Since v4.0.0

## TxQueue (namespace export)

Re-exports all named exports from the "./TxQueue.ts" module as `TxQueue`.

**Signature**

```ts
export * as TxQueue from "./TxQueue.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L672)

Since v4.0.0

## TxReentrantLock (namespace export)

Re-exports all named exports from the "./TxReentrantLock.ts" module as `TxReentrantLock`.

**Signature**

```ts
export * as TxReentrantLock from "./TxReentrantLock.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L677)

Since v4.0.0

## TxRef (namespace export)

Re-exports all named exports from the "./TxRef.ts" module as `TxRef`.

**Signature**

```ts
export * as TxRef from "./TxRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L682)

Since v4.0.0

## TxSemaphore (namespace export)

Re-exports all named exports from the "./TxSemaphore.ts" module as `TxSemaphore`.

**Signature**

```ts
export * as TxSemaphore from "./TxSemaphore.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L687)

Since v4.0.0

## TxSubscriptionRef (namespace export)

Re-exports all named exports from the "./TxSubscriptionRef.ts" module as `TxSubscriptionRef`.

**Signature**

```ts
export * as TxSubscriptionRef from "./TxSubscriptionRef.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L692)

Since v4.0.0

## Types (namespace export)

Re-exports all named exports from the "./Types.ts" module as `Types`.

**Signature**

```ts
export * as Types from "./Types.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L697)

Since v4.0.0

## UndefinedOr (namespace export)

Re-exports all named exports from the "./UndefinedOr.ts" module as `UndefinedOr`.

**Signature**

```ts
export * as UndefinedOr from "./UndefinedOr.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L702)

Since v4.0.0

## Unify (namespace export)

Re-exports all named exports from the "./Unify.ts" module as `Unify`.

**Signature**

```ts
export * as Unify from "./Unify.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L707)

Since v2.0.0

## Utils (namespace export)

Re-exports all named exports from the "./Utils.ts" module as `Utils`.

**Signature**

```ts
export * as Utils from "./Utils.ts"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L712)

Since v2.0.0

## absurd

**Signature**

```ts
declare const absurd: <A>(_: never) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L9)

Since v2.0.0

## cast

**Signature**

```ts
declare const cast: <A, B>(a: A) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L13)

Since v2.0.0

## flow

**Signature**

```ts
declare const flow: {
  <A extends ReadonlyArray<unknown>, B = never>(ab: (...a: A) => B): (...a: A) => B
  <A extends ReadonlyArray<unknown>, B = never, C = never>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
  ): (...a: A) => D
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): (...a: A) => E
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never, F = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): (...a: A) => F
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never, F = never, G = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
  ): (...a: A) => G
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
  ): (...a: A) => H
  <
    A extends ReadonlyArray<unknown>,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never
  >(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
  ): (...a: A) => I
  <
    A extends ReadonlyArray<unknown>,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never
  >(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
  ): (...a: A) => J
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L17)

Since v2.0.0

## hole

**Signature**

```ts
declare const hole: <T>() => T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L21)

Since v2.0.0

## identity

**Signature**

```ts
declare const identity: <A>(a: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L25)

Since v2.0.0

## pipe

**Signature**

```ts
declare const pipe: {
  <A>(a: A): A
  <A, B = never>(a: A, ab: (a: A) => B): B
  <A, B = never, C = never>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
  <A, B = never, C = never, D = never>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
  <A, B = never, C = never, D = never, E = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): E
  <A, B = never, C = never, D = never, E = never, F = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): F
  <A, B = never, C = never, D = never, E = never, F = never, G = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
  ): G
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
  ): H
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
  ): I
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
  ): J
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K
  ): K
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L
  ): L
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M
  ): M
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N
  ): N
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O
  ): O
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P
  ): P
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q
  ): Q
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R
  ): R
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S
  ): S
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never,
    T = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S,
    st: (s: S) => T
  ): T
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/index.ts#L29)

Since v2.0.0
