---
title: FileSystem.ts
nav_order: 36
parent: "effect"
---

## FileSystem.ts overview

Defines the portable file system service for Effect programs.

`FileSystem` is the boundary between Effect code and the host file system.
Platform packages provide concrete layers, while this module defines the
operations for reading, writing, inspecting, streaming, and watching files.
Operations return `Effect`, `Stream`, or `Sink` values and fail with
`PlatformError`. The module also includes file handles, size helpers, open
flags, watch events, and the watch backend service.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [FileDescriptor](#filedescriptor)
  - [make](#make)
  - [makeNoop](#makenoop)
- [file](#file)
  - [File (interface)](#file-interface)
  - [isFile](#isfile)
- [file watcher](#file-watcher)
  - [WatchBackend (class)](#watchbackend-class)
- [layers](#layers)
  - [layerNoop](#layernoop)
- [models](#models)
  - [FileSystem (interface)](#filesystem-interface)
  - [OpenFlag (type alias)](#openflag-type-alias)
  - [SeekMode (type alias)](#seekmode-type-alias)
  - [WatchEvent (type alias)](#watchevent-type-alias)
- [services](#services)
  - [FileSystem](#filesystem)
- [sizes](#sizes)
  - [GiB](#gib)
  - [KiB](#kib)
  - [MiB](#mib)
  - [PiB](#pib)
  - [Size](#size)
  - [Size (type alias)](#size-type-alias)
  - [SizeInput (type alias)](#sizeinput-type-alias)
  - [TiB](#tib)
- [type IDs](#type-ids)
  - [FileTypeId](#filetypeid)
- [utils](#utils)
  - [File (namespace)](#file-namespace)
    - [Info (interface)](#info-interface)
    - [Descriptor (type alias)](#descriptor-type-alias)
    - [Type (type alias)](#type-type-alias)
  - [WatchEvent (namespace)](#watchevent-namespace)
    - [Create (interface)](#create-interface)
    - [Update (interface)](#update-interface)
    - [Remove (interface)](#remove-interface)

---

# constructors

## FileDescriptor

Creates a `File.Descriptor` from a number.

**When to use**

Use to brand an operating-system file descriptor number when implementing a
`FileSystem` that returns custom `File` handles.

**Details**

`File.Descriptor` is a branded integer handle used by operating systems to
identify open files.

**Gotchas**

This constructor is nominal and does not check that the number is an integer
or that it refers to an open file descriptor.

**See**

- `File.Descriptor` for the branded descriptor type produced by this constructor
- `File` for file handles that expose a descriptor through `fd`

**Signature**

```ts
declare const FileDescriptor: Brand.Constructor<File.Descriptor>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1254)

Since v4.0.0

## make

Creates a FileSystem implementation from a partial implementation.

**When to use**

Use to build a concrete `FileSystem` service from platform-specific core
operations while deriving the convenience methods that can be implemented
from them.

**Details**

This function takes a partial FileSystem implementation and automatically provides
default implementations for `exists`, `readFileString`, `stream`, `sink`, and
`writeFileString` methods based on the provided core methods.

**See**

- `makeNoop` for a testing stub that accepts method overrides without requiring a complete implementation
- `layerNoop` for providing a no-op `FileSystem` as a `Layer` in tests

**Signature**

```ts
declare const make: (
  impl: Omit<FileSystem, typeof TypeId | "exists" | "readFileString" | "stream" | "sink" | "writeFileString">
) => FileSystem
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L764)

Since v4.0.0

## makeNoop

Creates a stub `FileSystem` implementation for tests.

**Details**

By default, `exists` returns `false`, `remove` succeeds, many file operations
fail with `PlatformError` `NotFound`, and temporary-directory/file operations
die as not implemented. Pass method overrides to provide the behavior needed
by a specific test without touching the real file system.

**Example** (Creating a no-op FileSystem)

```ts
import { Effect, FileSystem, PlatformError } from "effect"

// Create a test filesystem that only allows reading specific files
const testFs = FileSystem.makeNoop({
  readFileString: (path) => {
    if (path === "test-config.json") {
      return Effect.succeed('{"test": true}')
    }
    return Effect.fail(
      PlatformError.systemError({
        _tag: "NotFound",
        module: "FileSystem",
        method: "readFileString",
        description: "File not found",
        pathOrDescriptor: path
      })
    )
  },
  exists: (path) => Effect.succeed(path === "test-config.json")
})

// Use in tests
const program = Effect.gen(function* () {
  const content = yield* testFs.readFileString("test-config.json")
  // Will succeed with mocked content
})

// Test with the no-op filesystem
const testProgram = Effect.provideService(program, FileSystem.FileSystem, testFs)
```

**Signature**

```ts
declare const makeNoop: (fileSystem: Partial<FileSystem>) => FileSystem
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L902)

Since v4.0.0

# file

## File (interface)

Interface representing an open file handle.

**Details**

Provides low-level file operations including reading, writing, seeking,
and retrieving file information. File handles are automatically managed
within scoped operations to ensure proper cleanup.

**Example** (Working with file handles)

```ts
import { Console, Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Open a file and work with the handle
  yield* Effect.scoped(
    Effect.gen(function* () {
      const file = yield* fs.open("./data.txt", { flag: "r+" })

      // Get file information
      const stats = yield* file.stat
      yield* Console.log(`File size: ${stats.size} bytes`)

      // Read from specific position
      yield* file.seek(10, "start")
      const buffer = new Uint8Array(5)
      const bytesRead = yield* file.read(buffer)
      yield* Console.log(`Read ${bytesRead} bytes:`, buffer)

      // Write data
      const data = new TextEncoder().encode("Hello")
      yield* file.write(data)
      yield* file.sync // Flush to disk
    })
  )
})
```

**Signature**

```ts
export interface File {
  readonly [FileTypeId]: typeof FileTypeId
  readonly fd: File.Descriptor
  readonly stat: Effect.Effect<File.Info, PlatformError>
  readonly seek: (offset: SizeInput, from: SeekMode) => Effect.Effect<void>
  readonly sync: Effect.Effect<void, PlatformError>
  readonly read: (buffer: Uint8Array) => Effect.Effect<Size, PlatformError>
  readonly readAlloc: (size: SizeInput) => Effect.Effect<Option.Option<Uint8Array>, PlatformError>
  readonly truncate: (length?: SizeInput) => Effect.Effect<void, PlatformError>
  readonly write: (buffer: Uint8Array) => Effect.Effect<Size, PlatformError>
  readonly writeAll: (buffer: Uint8Array) => Effect.Effect<void, PlatformError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1113)

Since v4.0.0

## isFile

Returns `true` if a value is a `File` handle by checking for the
`FileTypeId` marker.

**When to use**

Use when accepting an unknown value and you need to narrow it to a `File`
before calling file-handle operations.

**Details**

This is a structural marker check. It does not validate the marker value or
the shape of the file handle.

**See**

- `File` for the file-handle interface narrowed by this guard
- `FileTypeId` for the runtime marker checked by this guard

**Signature**

```ts
declare const isFile: (u: unknown) => u is File
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1067)

Since v4.0.0

# file watcher

## WatchBackend (class)

Service key for file system watch backend implementations.

**Details**

This service provides the low-level file watching capabilities that can be
implemented differently on various platforms (e.g., inotify on Linux,
FSEvents on macOS, etc.).

**Example** (Providing a custom watch backend)

```ts
import { Effect, FileSystem, Option, Stream } from "effect"

// Custom watch backend implementation
const customWatchBackend = {
  register: (path: string, stat: FileSystem.File.Info) => {
    // Implementation would depend on platform
    return Option.some(Stream.empty) // Placeholder implementation
  }
}

// Provide custom watch backend
const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // File watching will use the custom backend
  const watcher = fs.watch("./directory")
})

const withCustomBackend = Effect.provideService(program, FileSystem.WatchBackend, customWatchBackend)
```

**Signature**

```ts
declare class WatchBackend
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1392)

Since v4.0.0

# layers

## layerNoop

Creates a Layer that provides a no-op FileSystem implementation for testing.

**Details**

This is a convenience function that wraps `makeNoop` in a Layer, making it easy
to provide the test filesystem to your Effect programs.

**Example** (Providing a no-op FileSystem layer)

```ts
import { Effect, FileSystem } from "effect"

// Create a test layer with specific behaviors
const testLayer = FileSystem.layerNoop({
  readFileString: (path) => Effect.succeed("mocked content"),
  exists: () => Effect.succeed(true)
})

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem
  const content = yield* fs.readFileString("any-file.txt")
  return content
})

// Provide the test layer
const testProgram = Effect.provide(program, testLayer)
```

**Signature**

```ts
declare const layerNoop: (fileSystem: Partial<FileSystem>) => Layer.Layer<FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1027)

Since v4.0.0

# models

## FileSystem (interface)

Core interface for file system operations in Effect.

**Details**

The FileSystem interface provides a comprehensive set of file and directory operations
that work cross-platform. All operations return Effect values that can be composed,
transformed, and executed safely with proper error handling.

**Example** (Accessing file system operations)

```ts
import { Console, Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Basic file operations
  const exists = yield* fs.exists("./config.json")
  if (!exists) {
    yield* fs.writeFileString("./config.json", '{"env": "development"}')
  }

  // Directory operations
  yield* fs.makeDirectory("./logs", { recursive: true })

  // File information
  const stats = yield* fs.stat("./config.json")
  yield* Console.log(`File size: ${stats.size} bytes`)

  // Streaming operations
  const content = yield* fs.readFileString("./config.json")
  yield* Console.log("Config:", content)
})
```

**Signature**

```ts
export interface FileSystem {
  readonly [TypeId]: typeof TypeId

  /**
   * Checks whether a file can be accessed.
   * You can optionally specify the level of access to check for.
   */
  readonly access: (
    path: string,
    options?: {
      readonly ok?: boolean | undefined
      readonly readable?: boolean | undefined
      readonly writable?: boolean | undefined
    }
  ) => Effect.Effect<void, PlatformError>
  /**
   * Copy a file or directory from `fromPath` to `toPath`.
   *
   * **Details**
   *
   * Equivalent to `cp -r`.
   */
  readonly copy: (
    fromPath: string,
    toPath: string,
    options?: {
      readonly overwrite?: boolean | undefined
      readonly preserveTimestamps?: boolean | undefined
    }
  ) => Effect.Effect<void, PlatformError>
  /**
   * Copy a file from `fromPath` to `toPath`.
   */
  readonly copyFile: (fromPath: string, toPath: string) => Effect.Effect<void, PlatformError>
  /**
   * Change the permissions of a file.
   */
  readonly chmod: (path: string, mode: number) => Effect.Effect<void, PlatformError>
  /**
   * Change the owner and group of a file.
   */
  readonly chown: (path: string, uid: number, gid: number) => Effect.Effect<void, PlatformError>
  /**
   * Checks whether a path exists.
   */
  readonly exists: (path: string) => Effect.Effect<boolean, PlatformError>
  /**
   * Create a hard link from `fromPath` to `toPath`.
   */
  readonly link: (fromPath: string, toPath: string) => Effect.Effect<void, PlatformError>
  /**
   * Create a directory at `path`. You can optionally specify the mode and
   * whether to recursively create nested directories.
   */
  readonly makeDirectory: (
    path: string,
    options?: {
      readonly recursive?: boolean | undefined
      readonly mode?: number | undefined
    }
  ) => Effect.Effect<void, PlatformError>
  /**
   * Create a temporary directory.
   *
   * **Details**
   *
   * By default the directory will be created inside the system's default
   * temporary directory, but you can specify a different location by setting
   * the `directory` option.
   *
   * You can also specify a prefix for the directory name by setting the
   * `prefix` option.
   */
  readonly makeTempDirectory: (options?: {
    readonly directory?: string | undefined
    readonly prefix?: string | undefined
  }) => Effect.Effect<string, PlatformError>
  /**
   * Create a temporary directory inside a scope.
   *
   * **Details**
   *
   * Functionally equivalent to `makeTempDirectory`, but the directory will be
   * automatically deleted when the scope is closed.
   */
  readonly makeTempDirectoryScoped: (options?: {
    readonly directory?: string | undefined
    readonly prefix?: string | undefined
  }) => Effect.Effect<string, PlatformError, Scope>
  /**
   * Create a temporary file.
   * The directory creation is functionally equivalent to `makeTempDirectory`.
   * The file name will be a randomly generated string.
   */
  readonly makeTempFile: (options?: {
    readonly directory?: string | undefined
    readonly prefix?: string | undefined
    readonly suffix?: string | undefined
  }) => Effect.Effect<string, PlatformError>
  /**
   * Create a temporary file inside a scope.
   *
   * **Details**
   *
   * Functionally equivalent to `makeTempFile`, but the file will be
   * automatically deleted when the scope is closed.
   */
  readonly makeTempFileScoped: (options?: {
    readonly directory?: string | undefined
    readonly prefix?: string | undefined
    readonly suffix?: string | undefined
  }) => Effect.Effect<string, PlatformError, Scope>
  /**
   * Open a file at `path` with the specified `options`.
   *
   * **Details**
   *
   * The file handle will be automatically closed when the scope is closed.
   */
  readonly open: (
    path: string,
    options?: {
      readonly flag?: OpenFlag | undefined
      readonly mode?: number | undefined
    }
  ) => Effect.Effect<File, PlatformError, Scope>
  /**
   * List the contents of a directory.
   *
   * **Details**
   *
   * You can recursively list the contents of nested directories by setting the
   * `recursive` option.
   */
  readonly readDirectory: (
    path: string,
    options?: {
      readonly recursive?: boolean | undefined
    }
  ) => Effect.Effect<Array<string>, PlatformError>
  /**
   * Read the contents of a file.
   */
  readonly readFile: (path: string) => Effect.Effect<Uint8Array, PlatformError>
  /**
   * Read the contents of a file.
   */
  readonly readFileString: (path: string, encoding?: string) => Effect.Effect<string, PlatformError>
  /**
   * Read the destination of a symbolic link.
   */
  readonly readLink: (path: string) => Effect.Effect<string, PlatformError>
  /**
   * Resolve a path to its canonicalized absolute pathname.
   */
  readonly realPath: (path: string) => Effect.Effect<string, PlatformError>
  /**
   * Remove a file or directory.
   */
  readonly remove: (
    path: string,
    options?: {
      /**
       * When `true`, you can recursively remove nested directories.
       */
      readonly recursive?: boolean | undefined
      /**
       * When `true`, exceptions will be ignored if `path` does not exist.
       */
      readonly force?: boolean | undefined
    }
  ) => Effect.Effect<void, PlatformError>
  /**
   * Rename a file or directory.
   */
  readonly rename: (oldPath: string, newPath: string) => Effect.Effect<void, PlatformError>
  /**
   * Create a writable `Sink` for the specified `path`.
   */
  readonly sink: (
    path: string,
    options?: {
      readonly flag?: OpenFlag | undefined
      readonly mode?: number | undefined
    }
  ) => Sink.Sink<void, Uint8Array, never, PlatformError>
  /**
   * Get information about a file at `path`.
   */
  readonly stat: (path: string) => Effect.Effect<File.Info, PlatformError>
  /**
   * Create a readable `Stream` for the specified `path`.
   *
   * **Details**
   *
   * Changing the `bufferSize` option will change the internal buffer size of
   * the stream. It defaults to `4`.
   *
   * The `chunkSize` option will change the size of the chunks emitted by the
   * stream. It defaults to 64kb.
   *
   * Changing `offset` and `bytesToRead` will change the offset and the number
   * of bytes to read from the file.
   */
  readonly stream: (
    path: string,
    options?: {
      readonly bytesToRead?: SizeInput | undefined
      readonly chunkSize?: SizeInput | undefined
      readonly offset?: SizeInput | undefined
    }
  ) => Stream.Stream<Uint8Array, PlatformError>
  /**
   * Create a symbolic link from `fromPath` to `toPath`.
   */
  readonly symlink: (fromPath: string, toPath: string) => Effect.Effect<void, PlatformError>
  /**
   * Truncate a file to a specified length. If the `length` is not specified,
   * the file will be truncated to length `0`.
   */
  readonly truncate: (path: string, length?: SizeInput) => Effect.Effect<void, PlatformError>
  /**
   * Change the file system timestamps of the file at `path`.
   */
  readonly utimes: (path: string, atime: Date | number, mtime: Date | number) => Effect.Effect<void, PlatformError>
  /**
   * Watch a directory or file for changes
   */
  readonly watch: (path: string) => Stream.Stream<WatchEvent, PlatformError>
  /**
   * Write data to a file at `path`.
   */
  readonly writeFile: (
    path: string,
    data: Uint8Array,
    options?: {
      readonly flag?: OpenFlag | undefined
      readonly mode?: number | undefined
    }
  ) => Effect.Effect<void, PlatformError>
  /**
   * Write a string to a file at `path`.
   */
  readonly writeFileString: (
    path: string,
    data: string,
    options?: {
      readonly flag?: OpenFlag | undefined
      readonly mode?: number | undefined
    }
  ) => Effect.Effect<void, PlatformError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L69)

Since v4.0.0

## OpenFlag (type alias)

File open flags that determine how a file is opened and what operations are allowed.

**Details**

These flags correspond to standard POSIX file open modes and control the file access
permissions and behavior when opening files.

- `"r"` - Read-only. File must exist.
- `"r+"` - Read/write. File must exist.
- `"w"` - Write-only. Truncates file to zero length or creates new file.
- `"wx"` - Like 'w' but fails if file exists.
- `"w+"` - Read/write. Truncates file to zero length or creates new file.
- `"wx+"` - Like 'w+' but fails if file exists.
- `"a"` - Write-only. Appends to file or creates new file.
- `"ax"` - Like 'a' but fails if file exists.
- `"a+"` - Read/write. Appends to file or creates new file.
- `"ax+"` - Like 'a+' but fails if file exists.

**Example** (Opening files with flags)

```ts
import { Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Open for reading only
  const readFile = yield* fs.open("data.txt", { flag: "r" })

  // Open for writing, truncating existing content
  const writeFile = yield* fs.open("output.txt", { flag: "w" })

  // Open for appending
  const appendFile = yield* fs.open("log.txt", { flag: "a" })

  // Open for read/write, but fail if file doesn't exist
  const editFile = yield* fs.open("config.json", { flag: "r+" })
})
```

**Signature**

```ts
type OpenFlag = "r" | "r+" | "w" | "wx" | "w+" | "wx+" | "a" | "ax" | "a+" | "ax+"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L684)

Since v4.0.0

## SeekMode (type alias)

Specifies the reference point for seeking within an open file.

**When to use**

Use with `File` handles when positioning the cursor before a read or write
and the offset must be interpreted from either the start of the file or the
current cursor.

**Details**

- `"start"` seeks from the beginning of the file.
- `"current"` seeks from the current cursor position.

**See**

- `File` for the open file handle API whose `seek` method consumes this mode

**Signature**

```ts
type SeekMode = "start" | "current"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1275)

Since v4.0.0

## WatchEvent (type alias)

Represents file system events emitted when watching files or directories.

**When to use**

Use when consuming file system watch streams and pattern matching on `_tag`
to handle created, updated, or removed paths.

**Details**

The union covers create, update, and remove events. Each event carries the
reported `path`.

**See**

- `FileSystem` for the service interface whose `watch` operation emits these events

**Signature**

```ts
type WatchEvent = WatchEvent.Create | WatchEvent.Update | WatchEvent.Remove
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1295)

Since v4.0.0

# services

## FileSystem

Service tag for platform file-system operations.

**When to use**

Use to access or provide operations for files, directories, permissions,
streams, and sinks through the Effect context.

**Details**

This key is used to provide and access the FileSystem service in the Effect context.

**Example** (Accessing and providing FileSystem)

```ts
import { Effect, FileSystem } from "effect"

// Access the FileSystem service
const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  const exists = yield* fs.exists("./data.txt")
  if (exists) {
    const content = yield* fs.readFileString("./data.txt")
    yield* Effect.log("File content:", content)
  }
})

// Provide a custom FileSystem implementation
declare const platformImpl: Omit<
  FileSystem.FileSystem,
  "exists" | "readFileString" | "stream" | "sink" | "writeFileString"
>
const customFs = FileSystem.make(platformImpl)

const withCustomFs = Effect.provideService(program, FileSystem.FileSystem, customFs)
```

**Signature**

```ts
declare const FileSystem: Context.Service<FileSystem, FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L741)

Since v4.0.0

# sizes

## GiB

Creates a `Size` representing gibibytes (1024³ bytes).

**Details**

Converts a number of gibibytes to the equivalent size in bytes.
Uses binary gibibytes (1,073,741,824 bytes) rather than decimal gigabytes.

**Example** (Creating gibibyte sizes)

```ts
import { Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Use GiB values as size thresholds
  const maxArchiveSize = FileSystem.GiB(1)
  console.log(maxArchiveSize.toString()) // "1073741824"

  const tempFile = yield* fs.makeTempFile({ prefix: "archive-" })
  yield* fs.writeFileString(tempFile, "backup data")

  const info = yield* fs.stat(tempFile)
  console.log(info.size < maxArchiveSize) // true

  yield* fs.remove(tempFile)
})
```

**Signature**

```ts
declare const GiB: (n: number) => Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L563)

Since v4.0.0

## KiB

Creates a `Size` representing kilobytes (1024 bytes).

**Details**

Converts a number of kilobytes to the equivalent size in bytes.
Uses binary kilobytes (1024 bytes) rather than decimal (1000 bytes).

**Example** (Creating kibibyte sizes)

```ts
import { Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Create a 64 KiB buffer size for streaming
  const bufferSize = FileSystem.KiB(64)

  const stream = fs.stream("large-file.txt", {
    chunkSize: bufferSize
  })

  // Truncate file to 100 KiB
  yield* fs.truncate("data.txt", FileSystem.KiB(100))
})
```

**Signature**

```ts
declare const KiB: (n: number) => Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L491)

Since v4.0.0

## MiB

Creates a `Size` representing mebibytes (1024² bytes).

**Details**

Converts a number of mebibytes to the equivalent size in bytes.
Uses binary mebibytes (1,048,576 bytes) rather than decimal megabytes.

**Example** (Creating mebibyte sizes)

```ts
import { Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Set a 10 MiB chunk size for large file operations
  const largeChunkSize = FileSystem.MiB(10)

  const stream = fs.stream("video.mp4", {
    chunkSize: largeChunkSize
  })

  // Check if file is larger than 100 MiB
  const stats = yield* fs.stat("archive.zip")
  const maxSize = FileSystem.MiB(100)
  if (stats.size > maxSize) {
    yield* Effect.log("File is very large!")
  }
})
```

**Signature**

```ts
declare const MiB: (n: number) => Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L528)

Since v4.0.0

## PiB

Creates a `Size` representing pebibytes (1024⁵ bytes).

**Details**

Converts a number of pebibytes to the equivalent size in bytes.
Uses binary pebibytes (1,125,899,906,842,624 bytes) rather than decimal petabytes.
This function uses BigInt arithmetic to handle the very large numbers involved.

**Example** (Creating pebibyte sizes)

```ts
import { Console, Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // For extremely large data processing scenarios
  const massiveDataset = FileSystem.PiB(2) // 2 PiB

  // This would typically be used in enterprise/cloud scenarios
  yield* Console.log(`Processing ${massiveDataset} bytes of data`)

  // Such large files would require specialized streaming
  const stream = fs.stream("massive-dataset.bin", {
    chunkSize: FileSystem.GiB(1), // 1 GiB chunks
    offset: FileSystem.TiB(100) // Start from 100 TiB offset
  })
})
```

**Signature**

```ts
declare const PiB: (n: number) => Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L638)

Since v4.0.0

## Size

Creates a `Size` from various numeric input types.

**Details**

Converts numbers, bigints, or existing Size values into a properly
branded Size type. This function handles the conversion and ensures
type safety for file size operations.

**Example** (Converting size inputs)

```ts
import { Effect, FileSystem } from "effect"

// From number
const size1 = FileSystem.Size(1024)
console.log(typeof size1) // "bigint"

// From bigint
const size2 = FileSystem.Size(BigInt(2048))

// From existing Size (identity)
const size3 = FileSystem.Size(size1)

// Use in file operations
const readChunk = (path: string, chunkSize: number) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    return fs.stream(path, {
      chunkSize: FileSystem.Size(chunkSize)
    })
  })
```

**Signature**

```ts
declare const Size: (bytes: SizeInput) => Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L458)

Since v4.0.0

## Size (type alias)

Represents a file size in bytes using a branded bigint.

**Details**

This type ensures type safety when working with file sizes, preventing
accidental mixing of regular numbers with size values. The underlying
bigint allows for handling very large file sizes beyond JavaScript's
number precision limits.

**Example** (Creating branded file sizes)

```ts
import { Effect, FileSystem } from "effect"

// Create sizes using the Size constructor
const smallFile = FileSystem.Size(1024) // 1 KB
const largeFile = FileSystem.Size(BigInt("9007199254740992")) // Very large

// Use with file operations
const truncateToSize = Effect.fnUntraced(function* (path: string, size: FileSystem.Size) {
  const fs = yield* FileSystem.FileSystem
  return yield* fs.truncate(path, size)
})
```

**Signature**

```ts
type Size = Brand.Branded<bigint, "Size">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L390)

Since v4.0.0

## SizeInput (type alias)

Input type for size parameters that accepts multiple numeric types.

**Details**

This union type allows file system operations to accept size values in
different formats for convenience, which are then normalized to the
branded `Size` type internally.

**Example** (Using size inputs)

```ts
import { Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // All of these are valid SizeInput values
  yield* fs.truncate("file1.txt", 1024) // number
  yield* fs.truncate("file2.txt", BigInt(2048)) // bigint
  yield* fs.truncate("file3.txt", FileSystem.Size(4096)) // Size
})
```

**Signature**

```ts
type SizeInput = bigint | number | Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L419)

Since v4.0.0

## TiB

Creates a `Size` representing tebibytes (1024⁴ bytes).

**Details**

Converts a number of tebibytes to the equivalent size in bytes.
Uses binary tebibytes (1,099,511,627,776 bytes) rather than decimal terabytes.

**Example** (Creating tebibyte sizes)

```ts
import { Console, Effect, FileSystem } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Check if we're dealing with very large files
  const stats = yield* fs.stat("database-backup.sql")
  const oneTiB = FileSystem.TiB(1)

  if (stats.size > oneTiB) {
    yield* Console.log("This is a very large database backup!")

    // Use larger chunk sizes for such files
    const stream = fs.stream("database-backup.sql", {
      chunkSize: FileSystem.MiB(100) // 100 MiB chunks
    })
  }
})
```

**Signature**

```ts
declare const TiB: (n: number) => Size
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L599)

Since v4.0.0

# type IDs

## FileTypeId

Runtime type identifier attached to `FileSystem.File` handles and used by
`isFile` to recognize them.

**Details**

This marker is part of the runtime representation of file handles. Prefer
`isFile` when narrowing unknown values.

**See**

- `File` for the open file handle shape that carries this marker
- `isFile` for the public guard that checks this marker

**Signature**

```ts
declare const FileTypeId: "~effect/platform/FileSystem/File"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1045)

Since v4.0.0

# utils

## File (namespace)

Namespace containing types associated with open file handles, including file
descriptors, entry kinds, and stat information.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1132)

Since v4.0.0

### Info (interface)

Comprehensive file information structure.

**Details**

Contains metadata about a file or directory including type, timestamps,
permissions, and size information. This structure is returned by file
stat operations.

**Example** (Inspecting file information)

```ts
import { Effect, FileSystem, Option } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  const path = yield* fs.makeTempFile({ prefix: "info-" })
  yield* fs.writeFileString(path, "hello")

  const info: FileSystem.File.Info = yield* fs.stat(path)

  console.log(`File type: ${info.type}`) // "File type: File"
  console.log(`File size: ${info.size} bytes`) // "File size: 5 bytes"
  console.log(`Mode: ${info.mode.toString(8)}`) // Octal permissions

  // Handle optional timestamps without inventing a fallback date
  const modified = Option.match(info.mtime, {
    onNone: () => "unavailable",
    onSome: (mtime) => mtime.toISOString()
  })
  console.log(`Modified: ${modified}`)

  // Check if it's a regular file
  if (info.type === "File") {
    console.log("Processing regular file...") // "Processing regular file..."
  }

  yield* fs.remove(path)
})
```

**Signature**

```ts
export interface Info {
  readonly type: Type
  readonly mtime: Option.Option<Date>
  readonly atime: Option.Option<Date>
  readonly birthtime: Option.Option<Date>
  readonly dev: number
  readonly ino: Option.Option<number>
  readonly mode: number
  readonly nlink: Option.Option<number>
  readonly uid: Option.Option<number>
  readonly gid: Option.Option<number>
  readonly rdev: Option.Option<number>
  readonly size: Size
  readonly blksize: Option.Option<Size>
  readonly blocks: Option.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1212)

Since v4.0.0

### Descriptor (type alias)

Branded type for file descriptors.

**Details**

File descriptors are numeric handles used by the operating system
to identify open files. The branded type ensures type safety.

**Signature**

```ts
type Descriptor = Brand.Branded<number, "FileDescriptor">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1144)

Since v4.0.0

### Type (type alias)

Enumeration of possible file system entry types.

**Details**

Represents the different types of entries that can exist in a file system,
from regular files to special device files and symbolic links.

**Signature**

```ts
type Type = "File" | "Directory" | "SymbolicLink" | "BlockDevice" | "CharacterDevice" | "FIFO" | "Socket" | "Unknown"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1157)

Since v4.0.0

## WatchEvent (namespace)

Namespace containing the concrete event shapes emitted by `FileSystem.watch`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1302)

Since v4.0.0

### Create (interface)

Event representing the creation of a new file or directory.

**Details**

This event is triggered when a new file or directory is created
in the watched location.

**Signature**

```ts
export interface Create {
  readonly _tag: "Create"
  readonly path: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1314)

Since v4.0.0

### Update (interface)

Event representing the modification of an existing file or directory.

**Details**

This event is triggered when an existing file or directory is
modified in the watched location.

**Signature**

```ts
export interface Update {
  readonly _tag: "Update"
  readonly path: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1330)

Since v4.0.0

### Remove (interface)

Event representing the deletion of a file or directory.

**Details**

This event is triggered when a file or directory is deleted
from the watched location.

**Signature**

```ts
export interface Remove {
  readonly _tag: "Remove"
  readonly path: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FileSystem.ts#L1346)

Since v4.0.0
