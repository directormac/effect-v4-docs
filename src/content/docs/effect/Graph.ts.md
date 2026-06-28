---
title: Graph.ts
nav_order: 40
parent: "effect"
---

## Graph.ts overview

Models relationships between indexed nodes and edges.

This module provides immutable and scoped-mutable graph data structures. A
graph can be directed or undirected, and it can store user-defined data on
both nodes and edges. The module includes traversal, analysis, path-finding,
transformation, and diagram export utilities.

Since v4.0.0

---

## Exports Grouped by Category

- [algorithms](#algorithms)
  - [astar](#astar)
  - [bellmanFord](#bellmanford)
  - [connectedComponents](#connectedcomponents)
  - [dijkstra](#dijkstra)
  - [floydWarshall](#floydwarshall)
  - [isAcyclic](#isacyclic)
  - [isBipartite](#isbipartite)
  - [stronglyConnectedComponents](#stronglyconnectedcomponents)
- [constructors](#constructors)
  - [directed](#directed)
  - [undirected](#undirected)
- [converting](#converting)
  - [toGraphViz](#tographviz)
  - [toMermaid](#tomermaid)
- [errors](#errors)
  - [GraphError (class)](#grapherror-class)
- [getters](#getters)
  - [edgeCount](#edgecount)
  - [findEdge](#findedge)
  - [findEdges](#findedges)
  - [findNode](#findnode)
  - [findNodes](#findnodes)
  - [getEdge](#getedge)
  - [getNode](#getnode)
  - [hasEdge](#hasedge)
  - [hasNode](#hasnode)
  - [neighbors](#neighbors)
  - [nodeCount](#nodecount)
- [guards](#guards)
  - [isGraph](#isgraph)
- [iterators](#iterators)
  - [bfs](#bfs)
  - [dfs](#dfs)
  - [dfsPostOrder](#dfspostorder)
  - [edges](#edges)
  - [entries](#entries)
  - [externals](#externals)
  - [indices](#indices)
  - [nodes](#nodes)
  - [topo](#topo)
  - [values](#values)
- [models](#models)
  - [AllPairsResult (interface)](#allpairsresult-interface)
  - [AstarConfig (interface)](#astarconfig-interface)
  - [BellmanFordConfig (interface)](#bellmanfordconfig-interface)
  - [DijkstraConfig (interface)](#dijkstraconfig-interface)
  - [DirectedGraph (type alias)](#directedgraph-type-alias)
  - [Direction (type alias)](#direction-type-alias)
  - [Edge (class)](#edge-class)
  - [EdgeIndex (type alias)](#edgeindex-type-alias)
  - [EdgeWalker (type alias)](#edgewalker-type-alias)
  - [ExternalsConfig (interface)](#externalsconfig-interface)
  - [Graph (interface)](#graph-interface)
  - [Kind (type alias)](#kind-type-alias)
  - [MermaidDiagramType (type alias)](#mermaiddiagramtype-type-alias)
  - [MermaidDirection (type alias)](#mermaiddirection-type-alias)
  - [MermaidNodeShape (type alias)](#mermaidnodeshape-type-alias)
  - [MutableDirectedGraph (type alias)](#mutabledirectedgraph-type-alias)
  - [MutableGraph (interface)](#mutablegraph-interface)
  - [MutableUndirectedGraph (type alias)](#mutableundirectedgraph-type-alias)
  - [NodeIndex (type alias)](#nodeindex-type-alias)
  - [NodeWalker (type alias)](#nodewalker-type-alias)
  - [PathResult (interface)](#pathresult-interface)
  - [Proto (interface)](#proto-interface)
  - [SearchConfig (interface)](#searchconfig-interface)
  - [TopoConfig (interface)](#topoconfig-interface)
  - [UndirectedGraph (type alias)](#undirectedgraph-type-alias)
  - [Walker (class)](#walker-class)
    - [[Symbol.iterator] (property)](#symboliterator-property)
    - [visit (property)](#visit-property)
- [mutations](#mutations)
  - [addEdge](#addedge)
  - [addNode](#addnode)
  - [beginMutation](#beginmutation)
  - [endMutation](#endmutation)
  - [mutate](#mutate)
  - [removeEdge](#removeedge)
  - [removeNode](#removenode)
  - [updateEdge](#updateedge)
- [options](#options)
  - [GraphVizOptions (interface)](#graphvizoptions-interface)
  - [MermaidOptions (interface)](#mermaidoptions-interface)
- [queries](#queries)
  - [~~neighborsDirected~~](#neighborsdirected)
  - [predecessors](#predecessors)
  - [successors](#successors)
- [transforming](#transforming)
  - [filterEdges](#filteredges)
  - [filterMapEdges](#filtermapedges)
  - [filterMapNodes](#filtermapnodes)
  - [filterNodes](#filternodes)
  - [mapEdges](#mapedges)
  - [mapNodes](#mapnodes)
  - [reverse](#reverse)
  - [updateNode](#updatenode)

---

# algorithms

## astar

Finds the shortest path from the configured source node to the target node
using the A\* pathfinding algorithm.

**Details**

The edge-cost function must return non-negative weights, and the heuristic
should be consistent to preserve shortest-path guarantees. Returns
`Option.none()` when the target is not reachable, and throws a `GraphError`
when either endpoint is missing or a negative edge cost is encountered.

**Example** (Finding shortest paths with A-star)

```ts
import { Graph } from "effect"

const graph = Graph.directed<{ x: number; y: number }, number>((mutable) => {
  const a = Graph.addNode(mutable, { x: 0, y: 0 })
  const b = Graph.addNode(mutable, { x: 1, y: 0 })
  const c = Graph.addNode(mutable, { x: 2, y: 0 })
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, c, 1)
})

// Manhattan distance heuristic
const heuristic = (nodeData: { x: number; y: number }, targetData: { x: number; y: number }) =>
  Math.abs(nodeData.x - targetData.x) + Math.abs(nodeData.y - targetData.y)

const result = Graph.astar(graph, {
  source: 0,
  target: 2,
  cost: (edgeData) => edgeData,
  heuristic
})

if (result._tag === "Some") {
  console.log(result.value.path) // [0, 1, 2] - shortest path
  console.log(result.value.distance) // 2 - total distance
}
```

**Signature**

```ts
declare const astar: {
  <E, N>(
    config: AstarConfig<E, N>
  ): <T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<PathResult<E>>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config: AstarConfig<E, N>
  ): Option.Option<PathResult<E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3597)

Since v3.18.0

## bellmanFord

Finds the shortest path from the configured source node to the target node
using the Bellman-Ford algorithm.

**Details**

Negative edge weights are allowed. Returns `Option.none()` when the target is
unreachable or when a negative cycle affects the path to the target. Throws a
`GraphError` when either endpoint is missing.

**Example** (Finding shortest paths with Bellman-Ford)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, -1) // Negative weight allowed
  Graph.addEdge(mutable, b, c, 3)
  Graph.addEdge(mutable, a, c, 5)
})

const result = Graph.bellmanFord(graph, {
  source: 0,
  target: 2,
  cost: (edgeData) => edgeData
})

if (result._tag === "Some") {
  console.log(result.value.path) // [0, 1, 2] - shortest path A->B->C
  console.log(result.value.distance) // 2 - total distance
}
```

**Signature**

```ts
declare const bellmanFord: {
  <E>(
    config: BellmanFordConfig<E>
  ): <N, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<PathResult<E>>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config: BellmanFordConfig<E>
  ): Option.Option<PathResult<E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3817)

Since v3.18.0

## connectedComponents

Finds connected components in an undirected graph.
Each component is represented as an array of node indices.

**Example** (Finding connected components)

```ts
import { Graph } from "effect"

const graph = Graph.undirected<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  const d = Graph.addNode(mutable, "D")
  Graph.addEdge(mutable, a, b, "edge") // Component 1: A-B
  Graph.addEdge(mutable, c, d, "edge") // Component 2: C-D
})

const components = Graph.connectedComponents(graph)
console.log(components) // [[0, 1], [2, 3]]
```

**Signature**

```ts
declare const connectedComponents: <N, E>(
  graph: Graph<N, E, "undirected"> | MutableGraph<N, E, "undirected">
) => Array<Array<NodeIndex>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2924)

Since v3.18.0

## dijkstra

Finds the shortest path from the configured source node to the target node
using Dijkstra's algorithm.

**Details**

Edge costs must be non-negative. Returns `Option.none()` when the target is
not reachable, and throws a `GraphError` when either endpoint is missing or a
negative edge cost is encountered.

**Example** (Finding shortest paths with Dijkstra)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 5)
  Graph.addEdge(mutable, a, c, 10)
  Graph.addEdge(mutable, b, c, 2)
})

const result = Graph.dijkstra(graph, {
  source: 0,
  target: 2,
  cost: (edgeData) => edgeData
})

if (result._tag === "Some") {
  console.log(result.value.path) // [0, 1, 2] - shortest path A->B->C
  console.log(result.value.distance) // 7 - total distance
}
```

**Signature**

```ts
declare const dijkstra: {
  <E>(
    config: DijkstraConfig<E>
  ): <N, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<PathResult<E>>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config: DijkstraConfig<E>
  ): Option.Option<PathResult<E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3207)

Since v3.18.0

## floydWarshall

Finds shortest paths between all pairs of nodes using the Floyd-Warshall
algorithm.

**Details**

Computes distances, reconstructed node paths, and edge-data paths for every
source and target pair in O(V^3) time. Negative edge weights are allowed, but
a `GraphError` is thrown if any negative cycle is detected.

**Example** (Finding all-pairs shortest paths)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 3)
  Graph.addEdge(mutable, b, c, 2)
  Graph.addEdge(mutable, a, c, 7)
})

const result = Graph.floydWarshall(graph, (edgeData) => edgeData)
const distanceAToC = result.distances.get(0)?.get(2) // 5 (A->B->C)
const pathAToC = result.paths.get(0)?.get(2) // [0, 1, 2]
```

**Signature**

```ts
declare const floydWarshall: {
  <E>(
    cost: (edgeData: E) => number
  ): <N, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => AllPairsResult<E>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    cost: (edgeData: E) => number
  ): AllPairsResult<E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3396)

Since v3.18.0

## isAcyclic

Checks whether the graph is acyclic (contains no cycles).

**Details**

Uses depth-first search to detect back edges, which indicate cycles.
For directed graphs, any back edge creates a cycle. For undirected graphs,
a back edge that doesn't go to the immediate parent creates a cycle.

**Example** (Checking cycles)

```ts
import { Graph } from "effect"

// Acyclic directed graph (DAG)
const dag = Graph.directed<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, "A->B")
  Graph.addEdge(mutable, b, c, "B->C")
})
console.log(Graph.isAcyclic(dag)) // true

// Cyclic directed graph
const cyclic = Graph.directed<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, "A->B")
  Graph.addEdge(mutable, b, a, "B->A") // Creates cycle
})
console.log(Graph.isAcyclic(cyclic)) // false
```

**Signature**

```ts
declare const isAcyclic: <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2658)

Since v3.18.0

## isBipartite

Checks whether an undirected graph is bipartite.

**Details**

A bipartite graph is one whose vertices can be divided into two disjoint sets
such that no two vertices within the same set are adjacent. Uses BFS coloring
to determine bipartiteness.

**Example** (Checking bipartite graphs)

```ts
import { Graph } from "effect"

// Bipartite graph (alternating coloring possible)
const bipartite = Graph.undirected<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  const d = Graph.addNode(mutable, "D")
  Graph.addEdge(mutable, a, b, "edge") // Set 1: {A, C}, Set 2: {B, D}
  Graph.addEdge(mutable, b, c, "edge")
  Graph.addEdge(mutable, c, d, "edge")
})
console.log(Graph.isBipartite(bipartite)) // true

// Non-bipartite graph (odd cycle)
const triangle = Graph.undirected<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, "edge")
  Graph.addEdge(mutable, b, c, "edge")
  Graph.addEdge(mutable, c, a, "edge") // Triangle (3-cycle)
})
console.log(Graph.isBipartite(triangle)) // false
```

**Signature**

```ts
declare const isBipartite: <N, E>(graph: Graph<N, E, "undirected"> | MutableGraph<N, E, "undirected">) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2810)

Since v3.18.0

## stronglyConnectedComponents

Finds strongly connected components in a directed graph using Kosaraju's algorithm.
Each SCC is represented as an array of node indices.

**Gotchas**

Throws a `GraphError` when used with an undirected graph.

**Example** (Finding strongly connected components)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, "A->B")
  Graph.addEdge(mutable, b, c, "B->C")
  Graph.addEdge(mutable, c, a, "C->A") // Creates SCC: A-B-C
})

const sccs = Graph.stronglyConnectedComponents(graph)
console.log(sccs) // [[0, 1, 2]]
```

**Signature**

```ts
declare const stronglyConnectedComponents: <N, E>(
  graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">
) => Array<Array<NodeIndex>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2987)

Since v3.18.0

# constructors

## directed

Creates a directed graph, optionally with initial mutations.

**Example** (Creating a directed graph)

```ts
import { Graph } from "effect"

// Directed graph with initial nodes and edges
const graph = Graph.directed<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, "A->B")
  Graph.addEdge(mutable, b, c, "B->C")
})
```

**Signature**

```ts
declare const directed: <N, E>(mutate?: (mutable: MutableDirectedGraph<N, E>) => void) => DirectedGraph<N, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L396)

Since v3.18.0

## undirected

Creates an undirected graph, optionally with initial mutations.

**Example** (Creating an undirected graph)

```ts
import { Graph } from "effect"

// Undirected graph with initial nodes and edges
const graph = Graph.undirected<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, "A-B")
  Graph.addEdge(mutable, b, c, "B-C")
})
```

**Signature**

```ts
declare const undirected: <N, E>(mutate?: (mutable: MutableUndirectedGraph<N, E>) => void) => UndirectedGraph<N, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L438)

Since v3.18.0

# converting

## toGraphViz

Exports a graph to GraphViz DOT format for visualization.

**Example** (Exporting GraphViz DOT)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const nodeC = Graph.addNode(mutable, "Node C")
  Graph.addEdge(mutable, nodeA, nodeB, 1)
  Graph.addEdge(mutable, nodeB, nodeC, 2)
  Graph.addEdge(mutable, nodeC, nodeA, 3)
})

const dot = Graph.toGraphViz(graph)
console.log(dot)
// digraph G {
//   "0" [label="Node A"];
//   "1" [label="Node B"];
//   "2" [label="Node C"];
//   "0" -> "1" [label="1"];
//   "1" -> "2" [label="2"];
//   "2" -> "0" [label="3"];
// }
```

**Signature**

```ts
declare const toGraphViz: {
  <N, E>(
    options?: GraphVizOptions<N, E>
  ): <T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => string
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    options?: GraphVizOptions<N, E>
  ): string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2053)

Since v3.18.0

## toMermaid

Exports a graph to Mermaid diagram format for visualization.

**Details**

Mermaid is a popular diagram-as-code tool that generates flowcharts and other
visualizations from text-based definitions. This function converts Effect Graph
structures to valid Mermaid syntax for use in documentation, web applications,
and visualization tools.

**Example** (Exporting a directed Mermaid diagram)

```ts
import { Graph } from "effect"

// Basic directed graph export
const graph = Graph.directed<string, number>((mutable) => {
  const app = Graph.addNode(mutable, "App")
  const db = Graph.addNode(mutable, "Database")
  const cache = Graph.addNode(mutable, "Cache")
  Graph.addEdge(mutable, app, db, 1)
  Graph.addEdge(mutable, app, cache, 2)
})

const mermaid = Graph.toMermaid(graph)
console.log(mermaid)
// flowchart TD
//   0["App"]
//   1["Database"]
//   2["Cache"]
//   0 -->|"1"| 1
//   0 -->|"2"| 2
```

**Example** (Exporting an undirected Mermaid diagram)

```ts
import { Graph } from "effect"

// Undirected graph with custom labels and direction
const socialGraph = Graph.undirected<{ name: string }, string>((mutable) => {
  const alice = Graph.addNode(mutable, { name: "Alice" })
  const bob = Graph.addNode(mutable, { name: "Bob" })
  const charlie = Graph.addNode(mutable, { name: "Charlie" })
  Graph.addEdge(mutable, alice, bob, "friends")
  Graph.addEdge(mutable, bob, charlie, "colleagues")
})

const mermaid = Graph.toMermaid(socialGraph, {
  nodeLabel: (person) => person.name,
  edgeLabel: (relationship) => relationship,
  direction: "LR"
})
console.log(mermaid)
// graph LR
//   0["Alice"]
//   1["Bob"]
//   2["Charlie"]
//   0 ---|"friends"| 1
//   1 ---|"colleagues"| 2
```

**Example** (Customizing Mermaid node shapes)

```ts
import { Graph } from "effect"

// Advanced styling with node shapes for flowchart
const workflow = Graph.directed<{ type: string; name: string }, string>((mutable) => {
  const start = Graph.addNode(mutable, { type: "start", name: "Begin" })
  const process = Graph.addNode(mutable, {
    type: "process",
    name: "Process Data"
  })
  const decision = Graph.addNode(mutable, {
    type: "decision",
    name: "Valid?"
  })
  const end = Graph.addNode(mutable, { type: "end", name: "Complete" })
  Graph.addEdge(mutable, start, process, "")
  Graph.addEdge(mutable, process, decision, "")
  Graph.addEdge(mutable, decision, end, "yes")
})

const mermaid = Graph.toMermaid(workflow, {
  nodeLabel: (node) => node.name,
  nodeShape: (node) => {
    switch (node.type) {
      case "start":
        return "stadium"
      case "process":
        return "rectangle"
      case "decision":
        return "diamond"
      case "end":
        return "stadium"
      default:
        return "rectangle"
    }
  }
})
console.log(mermaid)
// flowchart TD
//   0(["Begin"])
//   1["Process Data"]
//   2{"Valid?"}
//   3(["Complete"])
//   0 --> 1
//   1 --> 2
//   2 --> 3
```

**Example** (Visualizing dependency graphs)

```ts
import { Graph } from "effect"

// Real-world example: Software dependency graph
interface Dependency {
  name: string
  version: string
  type: "library" | "framework" | "tool"
}

const dependencyGraph = Graph.directed<Dependency, string>((mutable) => {
  const app = Graph.addNode(mutable, {
    name: "MyApp",
    version: "1.0.0",
    type: "library"
  })
  const react = Graph.addNode(mutable, {
    name: "React",
    version: "18.0.0",
    type: "framework"
  })
  const lodash = Graph.addNode(mutable, {
    name: "Lodash",
    version: "4.17.0",
    type: "library"
  })
  const webpack = Graph.addNode(mutable, {
    name: "Webpack",
    version: "5.0.0",
    type: "tool"
  })

  Graph.addEdge(mutable, app, react, "depends on")
  Graph.addEdge(mutable, app, lodash, "depends on")
  Graph.addEdge(mutable, app, webpack, "builds with")
})

const dependencyDiagram = Graph.toMermaid(dependencyGraph, {
  nodeLabel: (dep) => `${dep.name}\\nv${dep.version}`,
  edgeLabel: (edge) => edge,
  nodeShape: (dep) => (dep.type === "framework" ? "hexagon" : dep.type === "tool" ? "diamond" : "rectangle"),
  direction: "TB"
})

console.log(dependencyDiagram)
// flowchart TB
//   0["MyApp\nv1.0.0"]
//   1{{"React\nv18.0.0"}}
//   2["Lodash\nv4.17.0"]
//   3{"Webpack\nv5.0.0"}
//   0 -->|"depends on"| 1
//   0 -->|"depends on"| 2
//   0 -->|"builds with"| 3
```

**Signature**

```ts
declare const toMermaid: {
  <N, E>(
    options?: MermaidOptions<N, E>
  ): <T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => string
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    options?: MermaidOptions<N, E>
  ): string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2528)

Since v3.18.0

# errors

## GraphError (class)

Error thrown by graph operations when the requested graph structure is
invalid, such as referencing a missing node or using unsupported edge
weights.

**When to use**

Use when handling failures thrown by graph operations that reject invalid
graph structure or unsupported algorithm inputs.

**Signature**

```ts
declare class GraphError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L346)

Since v3.18.0

# getters

## edgeCount

Returns the number of edges in the graph.

**Example** (Counting edges)

```ts
import { Graph } from "effect"

const emptyGraph = Graph.directed<string, number>()
console.log(Graph.edgeCount(emptyGraph)) // 0

const graphWithEdges = Graph.mutate(emptyGraph, (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const nodeC = Graph.addNode(mutable, "Node C")
  Graph.addEdge(mutable, nodeA, nodeB, 1)
  Graph.addEdge(mutable, nodeB, nodeC, 2)
  Graph.addEdge(mutable, nodeC, nodeA, 3)
})

console.log(Graph.edgeCount(graphWithEdges)) // 3
```

**Signature**

```ts
declare const edgeCount: <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1751)

Since v3.18.0

## findEdge

Finds the first edge that matches the given predicate.

**Example** (Finding the first matching edge)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const nodeC = Graph.addNode(mutable, "Node C")
  Graph.addEdge(mutable, nodeA, nodeB, 10)
  Graph.addEdge(mutable, nodeB, nodeC, 20)
})

const result = Graph.findEdge(graph, (data) => data > 15)
console.log(result) // Option.some(1)

const notFound = Graph.findEdge(graph, (data) => data > 100)
console.log(notFound) // Option.none()
```

**Signature**

```ts
declare const findEdge: {
  <E>(
    predicate: (data: E, source: NodeIndex, target: NodeIndex) => boolean
  ): <N, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<EdgeIndex>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    predicate: (data: E, source: NodeIndex, target: NodeIndex) => boolean
  ): Option.Option<EdgeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L852)

Since v3.18.0

## findEdges

Finds all edges that match the given predicate.

**Example** (Finding matching edges)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const nodeC = Graph.addNode(mutable, "Node C")
  Graph.addEdge(mutable, nodeA, nodeB, 10)
  Graph.addEdge(mutable, nodeB, nodeC, 20)
  Graph.addEdge(mutable, nodeC, nodeA, 30)
})

const result = Graph.findEdges(graph, (data) => data >= 20)
console.log(result) // [1, 2]

const empty = Graph.findEdges(graph, (data) => data > 100)
console.log(empty) // []
```

**Signature**

```ts
declare const findEdges: {
  <E>(
    predicate: (data: E, source: NodeIndex, target: NodeIndex) => boolean
  ): <N, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Array<EdgeIndex>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    predicate: (data: E, source: NodeIndex, target: NodeIndex) => boolean
  ): Array<EdgeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L899)

Since v3.18.0

## findNode

Finds the first node that matches the given predicate.

**Example** (Finding the first matching node)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  Graph.addNode(mutable, "Node A")
  Graph.addNode(mutable, "Node B")
  Graph.addNode(mutable, "Node C")
})

const result = Graph.findNode(graph, (data) => data.startsWith("Node B"))
console.log(result) // Option.some(1)

const notFound = Graph.findNode(graph, (data) => data === "Node D")
console.log(notFound) // Option.none()
```

**Signature**

```ts
declare const findNode: {
  <N>(
    predicate: (data: N) => boolean
  ): <E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<NodeIndex>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    predicate: (data: N) => boolean
  ): Option.Option<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L761)

Since v3.18.0

## findNodes

Finds all nodes that match the given predicate.

**Example** (Finding matching nodes)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  Graph.addNode(mutable, "Start A")
  Graph.addNode(mutable, "Node B")
  Graph.addNode(mutable, "Start C")
})

const result = Graph.findNodes(graph, (data) => data.startsWith("Start"))
console.log(result) // [0, 2]

const empty = Graph.findNodes(graph, (data) => data === "Not Found")
console.log(empty) // []
```

**Signature**

```ts
declare const findNodes: {
  <N>(
    predicate: (data: N) => boolean
  ): <E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Array<NodeIndex>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    predicate: (data: N) => boolean
  ): Array<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L805)

Since v3.18.0

## getEdge

Gets the edge data associated with an edge index safely, if it exists.

**Example** (Getting edge data)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  Graph.addEdge(mutable, nodeA, nodeB, 42)
})

const edgeIndex = 0
const edgeData = Graph.getEdge(graph, edgeIndex)

if (edgeData._tag === "Some") {
  console.log(edgeData.value.data) // 42
  console.log(edgeData.value.source) // 0
  console.log(edgeData.value.target) // 1
}
```

**Signature**

```ts
declare const getEdge: {
  <E>(
    edgeIndex: EdgeIndex
  ): <N, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<Edge<E>>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    edgeIndex: EdgeIndex
  ): Option.Option<Edge<E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1649)

Since v3.18.0

## getNode

Gets the data associated with a node index safely, if it exists.

**Example** (Getting node data)

```ts
import { Graph, Option } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  Graph.addNode(mutable, "Node A")
})

const nodeIndex = 0
const nodeData = Graph.getNode(graph, nodeIndex)

if (Option.isSome(nodeData)) {
  console.log(nodeData.value) // "Node A"
}
```

**Signature**

```ts
declare const getNode: {
  <N, E, T extends Kind = "directed">(
    nodeIndex: NodeIndex
  ): (graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Option.Option<N>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    nodeIndex: NodeIndex
  ): Option.Option<N>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L665)

Since v3.18.0

## hasEdge

Checks whether an edge exists between two nodes in the graph.

**Example** (Checking edge existence)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const nodeC = Graph.addNode(mutable, "Node C")
  Graph.addEdge(mutable, nodeA, nodeB, 42)
})

const nodeA = 0
const nodeB = 1
const nodeC = 2

const hasAB = Graph.hasEdge(graph, nodeA, nodeB)
console.log(hasAB) // true

const hasAC = Graph.hasEdge(graph, nodeA, nodeC)
console.log(hasAC) // false
```

**Signature**

```ts
declare const hasEdge: {
  (
    source: NodeIndex,
    target: NodeIndex
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => boolean
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    source: NodeIndex,
    target: NodeIndex
  ): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1691)

Since v3.18.0

## hasNode

Checks whether a node with the given index exists in the graph.

**Example** (Checking node existence)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  Graph.addNode(mutable, "Node A")
})

const nodeIndex = 0
const exists = Graph.hasNode(graph, nodeIndex)
console.log(exists) // true

const nonExistentIndex = 999
const notExists = Graph.hasNode(graph, nonExistentIndex)
console.log(notExists) // false
```

**Signature**

```ts
declare const hasNode: {
  (nodeIndex: NodeIndex): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => boolean
  <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>, nodeIndex: NodeIndex): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L702)

Since v3.18.0

## neighbors

Returns the neighboring node indices for a node.

**Details**

For directed graphs, neighbors are the targets of outgoing edges. For
undirected graphs, neighbors are the other endpoints of incident edges.

**Example** (Getting outgoing neighbors)

```ts
import { Graph } from "effect"

const graph = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const nodeC = Graph.addNode(mutable, "Node C")
  Graph.addEdge(mutable, nodeA, nodeB, 1)
  Graph.addEdge(mutable, nodeA, nodeC, 2)
})

const nodeA = 0
const nodeB = 1
const nodeC = 2

const neighborsA = Graph.neighbors(graph, nodeA)
console.log(neighborsA) // [1, 2]

const neighborsB = Graph.neighbors(graph, nodeB)
console.log(neighborsB) // []
```

**Signature**

```ts
declare const neighbors: {
  (
    nodeIndex: NodeIndex
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => Array<NodeIndex>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    nodeIndex: NodeIndex
  ): Array<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1815)

Since v3.18.0

## nodeCount

Returns the number of nodes in the graph.

**Example** (Counting nodes)

```ts
import { Graph } from "effect"

const emptyGraph = Graph.directed<string, number>()
console.log(Graph.nodeCount(emptyGraph)) // 0

const graphWithNodes = Graph.mutate(emptyGraph, (mutable) => {
  Graph.addNode(mutable, "Node A")
  Graph.addNode(mutable, "Node B")
  Graph.addNode(mutable, "Node C")
})

console.log(Graph.nodeCount(graphWithNodes)) // 3
```

**Signature**

```ts
declare const nodeCount: <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L733)

Since v3.18.0

# guards

## isGraph

Returns `true` if a value has the graph runtime type identifier, narrowing
it to a `Graph`.

**When to use**

Use to narrow an unknown value before treating it as a graph value.

**Gotchas**

This guard checks the shared graph runtime type identifier and does not
distinguish immutable graphs from mutable graphs.

**Signature**

```ts
declare const isGraph: (u: unknown) => u is Graph<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L373)

Since v4.0.0

# iterators

## bfs

Creates a lazy breadth-first traversal iterator from the configured start
nodes.

**Details**

If no start nodes are supplied, the iterator is empty. The `direction` option
chooses whether to follow outgoing or incoming edges. Throws a `GraphError`
if any configured start node does not exist.

**Example** (Traversing breadth-first)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, c, 1)
})

// Start from a specific node
const bfs1 = Graph.bfs(graph, { start: [0] })
for (const nodeIndex of Graph.indices(bfs1)) {
  console.log(nodeIndex) // Traverses in BFS order: 0, 1, 2
}

// Empty iterator (no starting nodes)
const bfs2 = Graph.bfs(graph)
// Can be used programmatically
```

**Signature**

```ts
declare const bfs: {
  (
    config?: SearchConfig
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => NodeWalker<N>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config?: SearchConfig
  ): NodeWalker<N>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4351)

Since v3.18.0

## dfs

Creates a lazy depth-first traversal iterator from the configured start
nodes.

**Details**

If no start nodes are supplied, the iterator is empty. The `direction` option
chooses whether to follow outgoing or incoming edges. Throws a `GraphError`
if any configured start node does not exist.

**Example** (Traversing depth-first)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, c, 1)
})

// Start from a specific node
const dfs1 = Graph.dfs(graph, { start: [0] })
for (const nodeIndex of Graph.indices(dfs1)) {
  console.log(nodeIndex) // Traverses in DFS order: 0, 1, 2
}

// Empty iterator (no starting nodes)
const dfs2 = Graph.dfs(graph)
// Can be used programmatically
```

**Signature**

```ts
declare const dfs: {
  (
    config?: SearchConfig
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => NodeWalker<N>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config?: SearchConfig
  ): NodeWalker<N>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4253)

Since v3.18.0

## dfsPostOrder

Creates a lazy depth-first postorder traversal iterator from the configured
start nodes.

**Details**

Nodes are emitted after their reachable descendants have been processed. If
no start nodes are supplied, the iterator is empty. The `direction` option
chooses whether to follow outgoing or incoming edges.

**Example** (Traversing in postorder)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const root = Graph.addNode(mutable, "root")
  const child1 = Graph.addNode(mutable, "child1")
  const child2 = Graph.addNode(mutable, "child2")
  Graph.addEdge(mutable, root, child1, 1)
  Graph.addEdge(mutable, root, child2, 1)
})

// Postorder: children before parents
const postOrder = Graph.dfsPostOrder(graph, { start: [0] })
for (const node of postOrder) {
  console.log(node) // 1, 2, 0
}
```

**Signature**

```ts
declare const dfsPostOrder: {
  (
    config?: SearchConfig
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => NodeWalker<N>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config?: SearchConfig
  ): NodeWalker<N>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4614)

Since v3.18.0

## edges

Creates an iterator over all edge indices in the graph.

**Details**

The iterator produces edge indices in the order they were added to the graph.
This provides access to all edges regardless of connectivity.

**Example** (Iterating all edges)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, c, 2)
})

const indices = Array.from(Graph.indices(Graph.edges(graph)))
console.log(indices) // [0, 1]
```

**Signature**

```ts
declare const edges: <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => EdgeWalker<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4765)

Since v3.18.0

## entries

Returns an iterator over [index, data] entries in the walker.

**Example** (Iterating walker entries)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, 1)
})

const dfs = Graph.dfs(graph, { start: [0] })
const entries = Array.from(Graph.entries(dfs))
console.log(entries) // [[0, "A"], [1, "B"]]
```

**Signature**

```ts
declare const entries: <T, N>(walker: Walker<T, N>) => Iterable<[T, N]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4182)

Since v3.18.0

## externals

Creates an iterator over external nodes (nodes without edges in the specified direction).

**Details**

External nodes have no outgoing edges (`direction: "outgoing"`) or no
incoming edges (`direction: "incoming"`). These are useful for finding
sources, sinks, or isolated nodes.

**Example** (Iterating external nodes)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const source = Graph.addNode(mutable, "source") // 0 - no incoming
  const middle = Graph.addNode(mutable, "middle") // 1 - has both
  const sink = Graph.addNode(mutable, "sink") // 2 - no outgoing
  const isolated = Graph.addNode(mutable, "isolated") // 3 - no edges

  Graph.addEdge(mutable, source, middle, 1)
  Graph.addEdge(mutable, middle, sink, 2)
})

// Nodes with no outgoing edges (sinks + isolated)
const sinks = Array.from(Graph.indices(Graph.externals(graph, { direction: "outgoing" })))
console.log(sinks) // [2, 3]

// Nodes with no incoming edges (sources + isolated)
const sources = Array.from(Graph.indices(Graph.externals(graph, { direction: "incoming" })))
console.log(sources) // [0, 3]
```

**Signature**

```ts
declare const externals: {
  (
    config?: ExternalsConfig
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => NodeWalker<N>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T> | MutableGraph<N, E, T>,
    config?: ExternalsConfig
  ): NodeWalker<N>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4850)

Since v3.18.0

## indices

Returns an iterator over the indices in the walker.

**Example** (Iterating walker indices)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, 1)
})

const dfs = Graph.dfs(graph, { start: [0] })
const indices = Array.from(Graph.indices(dfs))
console.log(indices) // [0, 1]
```

**Signature**

```ts
declare const indices: <T, N>(walker: Walker<T, N>) => Iterable<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4134)

Since v3.18.0

## nodes

Creates an iterator over all node indices in the graph.

**Details**

The iterator produces node indices in the order they were added to the graph.
This provides access to all nodes regardless of connectivity.

**Example** (Iterating all nodes)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 1)
})

const indices = Array.from(Graph.indices(Graph.nodes(graph)))
console.log(indices) // [0, 1, 2]
```

**Signature**

```ts
declare const nodes: <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => NodeWalker<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4716)

Since v3.18.0

## topo

Creates a new topological sort iterator with optional configuration.

**Details**

The iterator uses Kahn's algorithm to lazily produce nodes in topological order.
Throws an error if the graph contains cycles.

**Example** (Sorting topologically)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, c, 1)
})

// Standard topological sort
const topo1 = Graph.topo(graph)
for (const nodeIndex of Graph.indices(topo1)) {
  console.log(nodeIndex) // 0, 1, 2 (topological order)
}

// With initial nodes
const topo2 = Graph.topo(graph, { initials: [0] })

// Check before sorting a cyclic graph
const cyclicGraph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, a, 2) // Creates cycle
})

if (!Graph.isAcyclic(cyclicGraph)) {
  console.log("cyclic graph") // cyclic graph
}
```

**Signature**

```ts
declare const topo: {
  (
    config?: TopoConfig
  ): <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>) => NodeWalker<N>
  <N, E, T extends Kind = "directed">(graph: Graph<N, E, T> | MutableGraph<N, E, T>, config?: TopoConfig): NodeWalker<N>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4480)

Since v3.18.0

## values

Returns an iterator over the values (data) in the walker.

**Example** (Iterating walker values)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, 1)
})

const dfs = Graph.dfs(graph, { start: [0] })
const values = Array.from(Graph.values(dfs))
console.log(values) // ["A", "B"]
```

**Signature**

```ts
declare const values: <T, N>(walker: Walker<T, N>) => Iterable<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4158)

Since v3.18.0

# models

## AllPairsResult (interface)

Result of an all-pairs shortest path computation.

**When to use**

Use when storing or passing around the complete output of `floydWarshall` so
callers can look up shortest distances, node paths, and edge data for any
source and target node pair.

**Details**

Contains distance, node-path, and edge-data maps keyed by source and target
node indices.

**See**

- `floydWarshall` for computing an all-pairs shortest path result
- `PathResult` for the single source-to-target result shape used by path-finding algorithms

**Signature**

```ts
export interface AllPairsResult<E> {
  readonly distances: Map<NodeIndex, Map<NodeIndex, number>>
  readonly paths: Map<NodeIndex, Map<NodeIndex, Array<NodeIndex> | null>>
  readonly costs: Map<NodeIndex, Map<NodeIndex, Array<E>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3358)

Since v3.18.0

## AstarConfig (interface)

Configuration for finding a shortest path with the A\* algorithm.

**When to use**

Use when configuring `astar` for point-to-point shortest-path searches where
node data can provide a heuristic estimate toward the target.

**Details**

Specifies the source and target node indices, an edge-cost function, and a
heuristic that estimates the remaining cost from a node to the target.

**See**

- `astar` for the algorithm that consumes this configuration
- `DijkstraConfig` for shortest paths without a heuristic
- `BellmanFordConfig` for shortest paths that may include negative edge weights

**Signature**

```ts
export interface AstarConfig<E, N> {
  source: NodeIndex
  target: NodeIndex
  cost: (edgeData: E) => number
  heuristic: (sourceNodeData: N, targetNodeData: N) => number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3544)

Since v3.18.0

## BellmanFordConfig (interface)

Configuration for finding a shortest path with the Bellman-Ford algorithm.

**When to use**

Use when configuring `bellmanFord` to find a shortest path where edge
weights may be negative.

**Details**

Specifies the source and target node indices, plus a cost function that maps
each edge's data to a numeric weight.

**See**

- `bellmanFord` for the algorithm that consumes this configuration
- `DijkstraConfig` for non-negative edge costs
- `AstarConfig` for heuristic shortest-path search

**Signature**

```ts
export interface BellmanFordConfig<E> {
  source: NodeIndex
  target: NodeIndex
  cost: (edgeData: E) => number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3772)

Since v3.18.0

## DijkstraConfig (interface)

Configuration for finding a shortest path with Dijkstra's algorithm.

**When to use**

Use when configuring `dijkstra` to find a shortest path between two existing
node indices with non-negative edge costs.

**Details**

Specifies the source and target node indices, plus a cost function that maps
each edge's data to a non-negative numeric weight.

**Gotchas**

`dijkstra` throws a `GraphError` when either endpoint does not exist or when
the cost function returns a negative weight.

**See**

- `dijkstra` for the algorithm that consumes this configuration
- `AstarConfig` for heuristic shortest-path search
- `BellmanFordConfig` for shortest paths that may include negative edge weights

**Signature**

```ts
export interface DijkstraConfig<E> {
  source: NodeIndex
  target: NodeIndex
  cost: (edgeData: E) => number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3146)

Since v3.18.0

## DirectedGraph (type alias)

Immutable graph type for source-to-target relationships.

**When to use**

Use as the immutable graph type when edge direction is part of the model and
traversal or neighbor queries should follow source-to-target edges.

**Details**

`DirectedGraph<N, E>` is a `Graph<N, E, "directed">` with node data of type
`N` and edge data of type `E`.

**See**

- `directed` for constructing directed graphs
- `Graph` for the generic immutable graph type
- `UndirectedGraph` for graphs whose edges connect both endpoints
- `MutableDirectedGraph` for the mutable directed graph type

**Signature**

```ts
type DirectedGraph<N, E> = Graph<N, E, "directed">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L195)

Since v3.18.0

## Direction (type alias)

Direction for graph traversal, indicating which edges to follow.

**Example** (Traversing by direction)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, "A->B")
})

// Follow outgoing edges (normal direction)
const outgoingNodes = Array.from(Graph.indices(Graph.dfs(graph, { start: [0], direction: "outgoing" })))

// Follow incoming edges (reverse direction)
const incomingNodes = Array.from(Graph.indices(Graph.dfs(graph, { start: [1], direction: "incoming" })))
```

**Signature**

```ts
type Direction = "outgoing" | "incoming"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2615)

Since v3.18.0

## Edge (class)

Represents edge data containing source, target, and user data.

**When to use**

Use as the graph edge value that carries source node, target node, and stored
edge data together.

**See**

- `getEdge` for reading a single edge by identifier
- `addEdge` for adding edges to a graph
- `edges` for iterating graph edges

**Signature**

```ts
declare class Edge<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L89)

Since v3.18.0

## EdgeIndex (type alias)

Edge index for edge identification using plain numbers.

**When to use**

Use when you need to keep the identifier for a graph edge so you can later
read, update, remove, or compare that edge.

**Gotchas**

An `EdgeIndex` is an identifier, not an array offset. Removed edge
identifiers are not reused.

**See**

- `NodeIndex` for node identifiers instead of edge identifiers
- `Edge` for the edge value addressed by this identifier
- `addEdge` for creating edge identifiers
- `getEdge` for reading edges by identifier

**Signature**

```ts
type EdgeIndex = number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L72)

Since v3.18.0

## EdgeWalker (type alias)

Type alias for edge iteration using Walker.
EdgeWalker is represented as Walker<EdgeIndex, Edge<E>>.

**When to use**

Use to type helpers or parameters that consume edge iterators returned by
`Graph` APIs, where each item is keyed by an `EdgeIndex` and carries the
full `Edge`.

**See**

- `Walker` for the generic lazy iterator wrapper
- `NodeWalker` for node iterators
- `edges` for creating edge walkers

**Signature**

```ts
type EdgeWalker<E> = Walker<EdgeIndex, Edge<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4110)

Since v3.18.0

## ExternalsConfig (interface)

Configuration for selecting external nodes.

**When to use**

Use to configure how `externals` identifies graph boundary nodes when you
need sinks with no outgoing edges or sources with no incoming edges.

**Details**

`direction` chooses which missing edge direction makes a node external:
`"outgoing"` selects nodes with no outgoing edges, and `"incoming"` selects
nodes with no incoming edges. If omitted, `direction` defaults to
`"outgoing"`.

**See**

- `externals` for the iterator that consumes this configuration

**Signature**

```ts
export interface ExternalsConfig {
  readonly direction?: Direction
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4806)

Since v3.18.0

## Graph (interface)

Immutable graph interface.

**When to use**

Use as the immutable graph model for code that queries, traverses,
transforms, or analyzes graph structure without mutating it.

**See**

- `MutableGraph` for the mutable counterpart used inside mutation scopes
- `DirectedGraph` for a `Graph` fixed to directed edges
- `UndirectedGraph` for a `Graph` fixed to undirected edges

**Signature**

```ts
export interface Graph<out N, out E, T extends Kind = "directed"> extends Proto<N, E> {
  readonly type: T
  readonly mutable: false
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L148)

Since v3.18.0

## Kind (type alias)

Graph type for distinguishing directed and undirected graphs.

**When to use**

Use when writing graph-polymorphic types or helpers that need to preserve
whether a graph is directed or undirected.

**See**

- `Graph` for immutable graphs parameterized by kind
- `MutableGraph` for mutable graphs parameterized by kind

**Signature**

```ts
type Kind = "directed" | "undirected"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L109)

Since v3.18.0

## MermaidDiagramType (type alias)

Mermaid diagram types for different visualization formats.

**Details**

Specifies the Mermaid diagram syntax to use:

- `flowchart`: For directed graphs with arrows (`A --> B`)
- `graph`: For undirected graphs with lines (`A --- B`)

When not specified, automatically selects based on graph type:
directed graphs use "flowchart", undirected graphs use "graph".

**Example** (Selecting Mermaid diagram types)

```ts
import type { Graph } from "effect"

// Force flowchart format (even for undirected graphs)
const flowchartOptions: Graph.MermaidOptions<string, string> = {
  diagramType: "flowchart"
}

// Force graph format (shows undirected connections)
const graphOptions: Graph.MermaidOptions<string, string> = {
  diagramType: "graph"
}

// Auto-detection (recommended, default behavior)
const autoOptions: Graph.MermaidOptions<string, string> = {}
```

**Signature**

```ts
type MermaidDiagramType =
  | "flowchart" // For directed graphs
  | "graph"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2221)

Since v3.18.0

## MermaidDirection (type alias)

Mermaid diagram direction types for controlling layout orientation.

**Details**

Determines the flow direction of nodes and edges in the diagram:

- `TB`/`TD`: Top to Bottom (vertical layout, default)
- `BT`: Bottom to Top (reverse vertical)
- `LR`: Left to Right (horizontal layout)
- `RL`: Right to Left (reverse horizontal)

**Example** (Configuring Mermaid directions)

```ts
import type { Graph } from "effect"

// Horizontal workflow diagram
const horizontalOptions: Graph.MermaidOptions<string, string> = {
  direction: "LR"
}

// Vertical hierarchy (default)
const verticalOptions: Graph.MermaidOptions<string, string> = {
  direction: "TB"
}

// Bottom-up flow
const bottomUpOptions: Graph.MermaidOptions<string, string> = {
  direction: "BT"
}
```

**Signature**

```ts
type MermaidDirection =
  | "TB" // Top to Bottom (default)
  | "TD" // Top Down (same as TB)
  | "BT" // Bottom to Top
  | "RL" // Right to Left
  | "LR"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2180)

Since v3.18.0

## MermaidNodeShape (type alias)

Mermaid node shape types for diagram visualization.

**Details**

Each shape produces different visual representations in Mermaid diagrams:

- `rectangle`: Standard rectangular nodes `A["label"]`
- `rounded`: Rounded rectangular nodes `A("label")`
- `circle`: Circular nodes `A(("label"))`
- `diamond`: Diamond-shaped nodes `A{"label"}`
- `hexagon`: Hexagonal nodes `A{{"label"}}`
- `stadium`: Stadium-shaped nodes `A(["label"])`
- `subroutine`: Subroutine-style nodes `A[["label"]]`
- `cylindrical`: Cylindrical database-style nodes `A[("label")]`

**Example** (Selecting Mermaid node shapes)

```ts
import type { Graph } from "effect"

// Shape selector function for different node types
const shapeSelector = (nodeData: string): Graph.MermaidNodeShape => {
  if (nodeData.includes("start") || nodeData.includes("end")) return "circle"
  if (nodeData.includes("decision")) return "diamond"
  if (nodeData.includes("process")) return "rectangle"
  if (nodeData.includes("data")) return "cylindrical"
  return "rounded"
}

const options: Graph.MermaidOptions<string, string> = {
  nodeShape: shapeSelector
}
```

**Signature**

```ts
type MermaidNodeShape =
  | "rectangle" // A["label"]
  | "rounded" // A("label")
  | "circle" // A(("label"))
  | "diamond" // A{"label"}
  | "hexagon" // A{{"label"}}
  | "stadium" // A(["label"])
  | "subroutine" // A[["label"]]
  | "cylindrical"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2135)

Since v3.18.0

## MutableDirectedGraph (type alias)

Mutable directed graph type alias.

**When to use**

Use when annotating a temporary graph value that can be changed in place and
whose edges have source-to-target direction.

**See**

- `MutableGraph` for the generic mutable graph type
- `DirectedGraph` for the immutable directed graph type
- `MutableUndirectedGraph` for mutable graphs without edge direction

**Signature**

```ts
type MutableDirectedGraph<N, E> = MutableGraph<N, E, "directed">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L233)

Since v3.18.0

## MutableGraph (interface)

Mutable graph interface.

**When to use**

Use when adding, removing, or updating nodes and edges inside a graph
mutation scope.

**See**

- `Graph` for the immutable graph interface
- `mutate` for scoped mutation of an immutable graph
- `beginMutation` for opening a mutable graph manually
- `endMutation` for returning to an immutable graph

**Signature**

```ts
export interface MutableGraph<out N, out E, T extends Kind = "directed"> extends Proto<N, E> {
  readonly type: T
  readonly mutable: true
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L169)

Since v3.18.0

## MutableUndirectedGraph (type alias)

Mutable undirected graph type alias.

**When to use**

Use when annotating a temporary graph value that can be changed in place and
whose edges connect both endpoints without direction.

**See**

- `MutableDirectedGraph` for mutable graphs with directed edges
- `UndirectedGraph` for the immutable undirected graph type
- `MutableGraph` for the generic mutable graph type

**Signature**

```ts
type MutableUndirectedGraph<N, E> = MutableGraph<N, E, "undirected">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L250)

Since v3.18.0

## NodeIndex (type alias)

Node index for node identification using plain numbers.

**When to use**

Use when storing or passing the stable identifier of a graph node between
`Graph` operations.

**Details**

`addNode` allocates node identifiers from the graph's next node index.

**Gotchas**

A `NodeIndex` is an identifier, not an array offset. Removed node identifiers
are not reused.

**See**

- `EdgeIndex` for edge identifiers instead of node identifiers
- `addNode` for creating node identifiers

**Signature**

```ts
type NodeIndex = number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L49)

Since v3.18.0

## NodeWalker (type alias)

Type alias for node iteration using Walker.
NodeWalker is represented as Walker<NodeIndex, N>.

**When to use**

Use as the shared node walker type returned by graph traversal and node
listing APIs.

**See**

- `Walker` for the generic lazy iterator wrapper
- `EdgeWalker` for edge iterators

**Signature**

```ts
type NodeWalker<N> = Walker<NodeIndex, N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4091)

Since v3.18.0

## PathResult (interface)

Result of a shortest path computation.

**When to use**

Use to read the successful source-to-target shortest path returned by
path-finding algorithms, including the ordered node indices, total distance,
and traversed edge data.

**Details**

Contains the node-index path, the total numeric distance, and the edge data
encountered along the path.

**Gotchas**

`costs` contains original edge data, not the numeric output of the cost
function unless the edge data is numeric.

**See**

- `dijkstra` for shortest paths with non-negative edge costs
- `astar` for heuristic shortest-path search
- `bellmanFord` for shortest paths that may include negative edge weights
- `AllPairsResult` for the all-pairs shortest-path result shape

**Signature**

```ts
export interface PathResult<E> {
  readonly path: Array<NodeIndex>
  readonly distance: number
  readonly costs: Array<E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3115)

Since v3.18.0

## Proto (interface)

Common structural interface shared by immutable and mutable graphs.

**Details**

Contains the node and edge maps, adjacency indexes, allocation counters, and
shared protocols used by both `Graph` and `MutableGraph`.

**Signature**

```ts
export interface Proto<out N, out E> extends Iterable<readonly [NodeIndex, N]>, Equal.Equal, Pipeable, Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly nodes: Map<NodeIndex, N>
  readonly edges: Map<EdgeIndex, Edge<E>>
  readonly adjacency: Map<NodeIndex, Array<EdgeIndex>>
  readonly reverseAdjacency: Map<NodeIndex, Array<EdgeIndex>>
  nextNodeIndex: NodeIndex
  nextEdgeIndex: EdgeIndex
  acyclic: Option.Option<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L122)

Since v3.18.0

## SearchConfig (interface)

Configuration for DFS, BFS, and postorder graph traversals.

**When to use**

Use to configure the starting node indices and edge-following direction for
lazy graph traversals.

**Details**

`start` supplies the node indices where traversal begins. If it is omitted,
the iterator is empty. `direction` chooses whether traversal follows
outgoing or incoming edges.

**Gotchas**

Traversal creation throws a `GraphError` when any configured `start` node
does not exist.

**See**

- `dfs` for depth-first traversal
- `bfs` for breadth-first traversal
- `dfsPostOrder` for depth-first postorder traversal

**Signature**

```ts
export interface SearchConfig {
  readonly start?: Array<NodeIndex>
  readonly direction?: Direction
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4211)

Since v3.18.0

## TopoConfig (interface)

Configuration for the topological sort iterator.

**When to use**

Use to prioritize specific zero in-degree nodes in a topological sort.

**Details**

`initials` optionally supplies zero in-degree node indices used as
prioritized initial queue entries. Topological sorting still includes the
other zero in-degree nodes and produces a complete topological order.

**Gotchas**

Throws a `GraphError` when any initial node has incoming edges.

**See**

- `topo` for the iterator that consumes this configuration

**Signature**

```ts
export interface TopoConfig {
  readonly initials?: Array<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4430)

Since v3.18.0

## UndirectedGraph (type alias)

Immutable graph type for relationships without source-to-target direction.

**When to use**

Use when modeling relationships where each edge connects both endpoints
without a source-to-target direction.

**Details**

`UndirectedGraph<N, E>` is a `Graph<N, E, "undirected">`.

**See**

- `undirected` for constructing undirected graphs
- `DirectedGraph` for graphs whose edges have source-to-target direction
- `MutableUndirectedGraph` for the mutable undirected graph type

**Signature**

```ts
type UndirectedGraph<N, E> = Graph<N, E, "undirected">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L216)

Since v3.18.0

## Walker (class)

Represents an iterable wrapper used by graph traversal and listing APIs.

**Details**

A `Walker` yields `[index, data]` pairs lazily and can be viewed as just the
indices, just the values, or mapped entries with `indices`, `values`,
`entries`, and `visit`.

**Example** (Working with node walkers)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, 1)
})

// Both traversal and element iterators return NodeWalker
const dfsNodes: Graph.NodeWalker<string> = Graph.dfs(graph, { start: [0] })
const allNodes: Graph.NodeWalker<string> = Graph.nodes(graph)

// Common interface for working with node iterables
function processNodes<N>(nodeIterable: Graph.NodeWalker<N>): Array<number> {
  return Array.from(Graph.indices(nodeIterable))
}

// Access node data using values() or entries()
const nodeData = Array.from(Graph.values(dfsNodes)) // ["A", "B"]
const nodeEntries = Array.from(Graph.entries(allNodes)) // [[0, "A"], [1, "B"]]
```

**Signature**

````ts
declare class Walker<T, N> {
  constructor(
    /**
     * Visits each element and maps it to a value using the provided function.
     *
     * Takes a function that receives the index and data,
     * and returns an iterable of the mapped values. Skips elements that
     * no longer exist in the graph.
     *
     * **Example** (Visiting walker elements)
     *
     * ```ts
     * import { Graph } from "effect"
     *
     * const graph = Graph.directed<string, number>((mutable) => {
     *   const a = Graph.addNode(mutable, "A")
     *   const b = Graph.addNode(mutable, "B")
     *   Graph.addEdge(mutable, a, b, 1)
     * })
     *
     * const dfs = Graph.dfs(graph, { start: [0] })
     *
     * // Map to just the node data
     * const values = Array.from(dfs.visit((index, data) => data))
     * console.log(values) // ["A", "B"]
     *
     * // Map to custom objects
     * const custom = Array.from(
     *   dfs.visit((index, data) => ({ id: index, name: data }))
     * )
     * console.log(custom) // [{ id: 0, name: "A" }, { id: 1, name: "B" }]
     * ```
     *
     * @category iterators
     * @since 4.0.0
     */
    visit: <U>(f: (index: T, data: N) => U) => Iterable<U>
  )
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3993)

Since v3.18.0

### [Symbol.iterator] (property)

**Signature**

```ts
readonly [Symbol.iterator]: () => Iterator<[T, N]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L3995)

### visit (property)

Visits each element and maps it to a value using the provided function.

**Details**

Takes a function that receives the index and data,
and returns an iterable of the mapped values. Skips elements that
no longer exist in the graph.

**Example** (Visiting walker elements)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, 1)
})

const dfs = Graph.dfs(graph, { start: [0] })

// Map to just the node data
const values = Array.from(dfs.visit((index, data) => data))
console.log(values) // ["A", "B"]

// Map to custom objects
const custom = Array.from(dfs.visit((index, data) => ({ id: index, name: data })))
console.log(custom) // [{ id: 0, name: "A" }, { id: 1, name: "B" }]
```

**Signature**

```ts
readonly visit: <U>(f: (index: T, data: N) => U) => Iterable<U>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L4032)

Since v4.0.0

# mutations

## addEdge

Adds a new edge to a mutable graph and returns its index.

**When to use**

Use to connect two existing nodes in a mutable graph while storing edge data
and receiving the new edge identifier.

**Details**

Creates an `Edge` with the source, target, and data at the next edge index,
updates adjacency indexes, and increments the graph's next edge index.
Undirected graphs register the same edge for both endpoints.

**Gotchas**

The source and target nodes must already exist in the mutable graph; missing
endpoints throw a `GraphError`.

**Example** (Adding edges)

```ts
import { Graph } from "effect"

const result = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const edge = Graph.addEdge(mutable, nodeA, nodeB, 42)
  console.log(edge) // EdgeIndex with value 0
})
```

**See**

- `mutate` for obtaining a mutable graph from an immutable graph
- `addNode` for creating node indexes before connecting them
- `getEdge` for reading the returned edge
- `removeEdge` for removing an edge from a mutable graph

**Signature**

```ts
declare const addEdge: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  source: NodeIndex,
  target: NodeIndex,
  data: E
) => EdgeIndex
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1411)

Since v3.18.0

## addNode

Adds a new node to a mutable graph and returns its index.

**When to use**

Use to allocate a new node in a mutable graph before storing edges or
querying it by index.

**Details**

The returned index is allocated from the graph's next node index. The mutable
graph stores the node data and initializes empty incoming and outgoing edge
indexes for the new node.

**Gotchas**

`NodeIndex` values are identifiers and are not reused after removals.

**Example** (Adding nodes)

```ts
import { Graph } from "effect"

const result = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  console.log(nodeA) // NodeIndex with value 0
  console.log(nodeB) // NodeIndex with value 1
})
```

**See**

- `mutate` for obtaining a mutable graph from an immutable graph
- `addEdge` for connecting existing nodes
- `removeNode` for removing nodes from a mutable graph

**Signature**

```ts
declare const addNode: <N, E, T extends Kind = "directed">(mutable: MutableGraph<N, E, T>, data: N) => NodeIndex
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L623)

Since v3.18.0

## beginMutation

Creates a mutable scope for safe graph mutations by copying the data structure.

**Example** (Beginning a mutation scope)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>()
const mutable = Graph.beginMutation(graph)
// Now mutable can be safely modified without affecting original graph
```

**Signature**

```ts
declare const beginMutation: <N, E, T extends Kind = "directed">(graph: Graph<N, E, T>) => MutableGraph<N, E, T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L479)

Since v3.18.0

## endMutation

Converts a mutable graph back to an immutable graph, ending the mutation scope.

**Example** (Ending a mutation scope)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>()
const mutable = Graph.beginMutation(graph)
// ... perform mutations on mutable ...
const newGraph = Graph.endMutation(mutable)
```

**Signature**

```ts
declare const endMutation: <N, E, T extends Kind = "directed">(mutable: MutableGraph<N, E, T>) => Graph<N, E, T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L525)

Since v3.18.0

## mutate

Performs scoped mutations on a graph, automatically managing the mutation lifecycle.

**Example** (Applying scoped mutations)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>()
const newGraph = Graph.mutate(graph, (mutable) => {
  const nodeA = Graph.addNode(mutable, "A")
  const nodeB = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, nodeA, nodeB, 1)
})

console.log(Graph.nodeCount(newGraph)) // 2
console.log(Graph.edgeCount(newGraph)) // 1
```

**Signature**

```ts
declare const mutate: {
  <N, E, T extends Kind = "directed">(
    f: (mutable: MutableGraph<N, E, T>) => void
  ): (graph: Graph<N, E, T>) => Graph<N, E, T>
  <N, E, T extends Kind = "directed">(
    graph: Graph<N, E, T>,
    f: (mutable: MutableGraph<N, E, T>) => void
  ): Graph<N, E, T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L564)

Since v3.18.0

## removeEdge

Removes an edge from a mutable graph.

**Example** (Removing an edge)

```ts
import { Graph } from "effect"

const result = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const edge = Graph.addEdge(mutable, nodeA, nodeB, 42)

  // Remove the edge
  Graph.removeEdge(mutable, edge)
})
```

**Signature**

```ts
declare const removeEdge: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  edgeIndex: EdgeIndex
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1550)

Since v3.18.0

## removeNode

Removes a node and all its incident edges from a mutable graph.

**Example** (Removing a node)

```ts
import { Graph } from "effect"

const result = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  Graph.addEdge(mutable, nodeA, nodeB, 42)

  // Remove nodeA and all edges connected to it
  Graph.removeNode(mutable, nodeA)
})
```

**Signature**

```ts
declare const removeNode: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  nodeIndex: NodeIndex
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1486)

Since v3.18.0

## updateEdge

Updates a single edge's data by applying a transformation function.

**Example** (Updating edge data)

```ts
import { Graph } from "effect"

const result = Graph.mutate(Graph.directed<string, number>(), (mutable) => {
  const nodeA = Graph.addNode(mutable, "Node A")
  const nodeB = Graph.addNode(mutable, "Node B")
  const edgeIndex = Graph.addEdge(mutable, nodeA, nodeB, 10)
  Graph.updateEdge(mutable, edgeIndex, (data) => data * 2)
})

const edgeData = Graph.getEdge(result, 0)
console.log(edgeData) // Option.some(new Graph.Edge({ source: 0, target: 1, data: 20 }))
```

**Signature**

```ts
declare const updateEdge: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  edgeIndex: EdgeIndex,
  f: (data: E) => E
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L977)

Since v3.18.0

# options

## GraphVizOptions (interface)

Configuration options for GraphViz DOT format generation from graphs.

**Details**

These options customize node labels, edge labels, and graph naming in DOT
format compatible with GraphViz tools.

**Example** (Configuring GraphViz labels)

```ts
import type { Graph } from "effect"

// Basic options with custom labels
const basicOptions: Graph.GraphVizOptions<string, number> = {
  nodeLabel: (data) => `Node: ${data}`,
  edgeLabel: (data) => `Weight: ${data}`
}

// Complete options with graph naming
const namedOptions: Graph.GraphVizOptions<string, string> = {
  nodeLabel: (data) => data.toUpperCase(),
  edgeLabel: (data) => data,
  graphName: "MyDependencyGraph"
}
```

**Signature**

```ts
export interface GraphVizOptions<N, E> {
  /**
   * Function to generate custom labels for nodes.
   * Defaults to String(data) if not provided.
   */
  readonly nodeLabel?: (data: N) => string

  /**
   * Function to generate custom labels for edges.
   * Defaults to String(data) if not provided.
   */
  readonly edgeLabel?: (data: E) => string

  /**
   * Name for the DOT graph.
   * Defaults to "G" if not provided.
   */
  readonly graphName?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2001)

Since v3.18.0

## MermaidOptions (interface)

Configuration options for Mermaid diagram generation from graphs.

**Details**

These options customize node labels, edge labels, diagram type, layout
direction, node shapes, and graph naming in Mermaid format.

**Example** (Configuring Mermaid output)

```ts
import type { Graph } from "effect"

// Basic options with custom labels
const basicOptions: Graph.MermaidOptions<string, number> = {
  nodeLabel: (data) => `Node: ${data}`,
  edgeLabel: (data) => `Weight: ${data}`
}

// Advanced options with all features
const advancedOptions: Graph.MermaidOptions<string, string> = {
  nodeLabel: (data) => data.toUpperCase(),
  edgeLabel: (data) => data,
  diagramType: "flowchart",
  direction: "LR",
  nodeShape: (data) => (data.includes("start") ? "circle" : "rectangle")
}
```

**Signature**

```ts
export interface MermaidOptions<N, E> {
  /**
   * Function to generate custom labels for nodes.
   * Defaults to String(data) if not provided.
   */
  readonly nodeLabel?: (data: N) => string

  /**
   * Function to generate custom labels for edges.
   * Defaults to String(data) if not provided.
   */
  readonly edgeLabel?: (data: E) => string

  /**
   * Diagram type override. If not specified, automatically detects:
   * - "flowchart" for directed graphs
   * - "graph" for undirected graphs
   */
  readonly diagramType?: MermaidDiagramType

  /**
   * Direction for diagram layout.
   * Defaults to "TD" (Top Down) if not provided.
   */
  readonly direction?: MermaidDirection

  /**
   * Function to determine node shape for each node.
   * Defaults to "rectangle" for all nodes if not provided.
   */
  readonly nodeShape?: (data: N) => MermaidNodeShape
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L2263)

Since v3.18.0

# queries

## ~~neighborsDirected~~

Gets directed neighbors of a node in a specific direction.

**When to use**

Use when maintaining existing code that already passes an explicit traversal
direction. New code should prefer `successors` or `predecessors`.

**Gotchas**

Throws a `GraphError` when used with an undirected graph.

**Example** (Traversing directed neighbors)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, string>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  Graph.addEdge(mutable, a, b, "A->B")
})

const nodeA = 0
const nodeB = 1

// Get outgoing neighbors (nodes that nodeA points to)
const outgoing = Graph.neighborsDirected(graph, nodeA, "outgoing")

// Get incoming neighbors (nodes that point to nodeB)
const incoming = Graph.neighborsDirected(graph, nodeB, "incoming")
```

**See**

- `successors` for outgoing neighbors in a directed graph
- `predecessors` for incoming neighbors in a directed graph

**Signature**

```ts
declare const neighborsDirected: {
  (
    nodeIndex: NodeIndex,
    direction: Direction
  ): <N, E>(graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">) => Array<NodeIndex>
  <N, E>(
    graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">,
    nodeIndex: NodeIndex,
    direction: Direction
  ): Array<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1946)

Since v3.18.0

## predecessors

Returns the incoming neighbor node indices for a node in a directed graph.

**When to use**

Use when you need the nodes that reach a node by following incoming edges in a
directed graph.

**Gotchas**

Throws a `GraphError` when used with an undirected graph.

**See**

- `successors` for outgoing neighbors in a directed graph
- `neighbors` for generic neighbor lookup across graph kinds

**Signature**

```ts
declare const predecessors: {
  (nodeIndex: NodeIndex): <N, E>(graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">) => Array<NodeIndex>
  <N, E>(graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">, nodeIndex: NodeIndex): Array<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1889)

Since v4.0.0

## successors

Returns the outgoing neighbor node indices for a node in a directed graph.

**When to use**

Use when you need the nodes reached by following outgoing edges from a node in
a directed graph.

**Gotchas**

Throws a `GraphError` when used with an undirected graph.

**See**

- `predecessors` for incoming neighbors in a directed graph
- `neighbors` for generic neighbor lookup across graph kinds

**Signature**

```ts
declare const successors: {
  (nodeIndex: NodeIndex): <N, E>(graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">) => Array<NodeIndex>
  <N, E>(graph: Graph<N, E, "directed"> | MutableGraph<N, E, "directed">, nodeIndex: NodeIndex): Array<NodeIndex>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1853)

Since v4.0.0

# transforming

## filterEdges

Filters edges by removing those that don't match the predicate.
This function modifies the mutable graph in place.

**Example** (Filtering edges)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")

  Graph.addEdge(mutable, a, b, 5)
  Graph.addEdge(mutable, b, c, 15)
  Graph.addEdge(mutable, c, a, 25)

  // Keep only edges with weight >= 10
  Graph.filterEdges(mutable, (data) => data >= 10)
})

console.log(Graph.edgeCount(graph)) // 2 (edge with weight 5 removed)
```

**Signature**

```ts
declare const filterEdges: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  predicate: (data: E) => boolean
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1324)

Since v3.18.0

## filterMapEdges

Filters and optionally transforms edges in a mutable graph using a predicate function.
Edges that return Option.none are removed from the graph.

**Example** (Filtering and mapping edges)

```ts
import { Graph, Option } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 5)
  Graph.addEdge(mutable, b, c, 15)
  Graph.addEdge(mutable, c, a, 25)

  // Keep only edges with weight >= 10 and double their weight
  Graph.filterMapEdges(mutable, (data) => (data >= 10 ? Option.some(data * 2) : Option.none()))
})

console.log(Graph.edgeCount(graph)) // 2 (edges with weight 5 removed)
```

**Signature**

```ts
declare const filterMapEdges: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  f: (data: E) => Option.Option<E>
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1225)

Since v3.18.0

## filterMapNodes

Filters and optionally transforms nodes in a mutable graph using a predicate function.
Nodes that return Option.none are removed along with all their connected edges.

**Example** (Filtering and mapping nodes)

```ts
import { Graph, Option } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "active")
  const b = Graph.addNode(mutable, "inactive")
  const c = Graph.addNode(mutable, "active")
  Graph.addEdge(mutable, a, b, 1)
  Graph.addEdge(mutable, b, c, 2)

  // Keep only "active" nodes and transform to uppercase
  Graph.filterMapNodes(mutable, (data) => (data === "active" ? Option.some(data.toUpperCase()) : Option.none()))
})

console.log(Graph.nodeCount(graph)) // 2 (only "active" nodes remain)
```

**Signature**

```ts
declare const filterMapNodes: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  f: (data: N) => Option.Option<N>
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1171)

Since v3.18.0

## filterNodes

Filters nodes by removing those that don't match the predicate.
This function modifies the mutable graph in place.

**Example** (Filtering nodes)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  Graph.addNode(mutable, "active")
  Graph.addNode(mutable, "inactive")
  Graph.addNode(mutable, "pending")
  Graph.addNode(mutable, "active")

  // Keep only "active" nodes
  Graph.filterNodes(mutable, (data) => data === "active")
})

console.log(Graph.nodeCount(graph)) // 2 (only "active" nodes remain)
```

**Signature**

```ts
declare const filterNodes: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  predicate: (data: N) => boolean
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1277)

Since v3.18.0

## mapEdges

Transforms all edge data in a mutable graph using the provided mapping function.

**Example** (Mapping edge data)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 10)
  Graph.addEdge(mutable, b, c, 20)
  Graph.mapEdges(mutable, (data) => data * 2)
})

const edgeData = Graph.getEdge(graph, 0)
console.log(edgeData) // Option.some(new Graph.Edge({ source: 0, target: 1, data: 20 }))
```

**Signature**

```ts
declare const mapEdges: <N, E, T extends Kind = "directed">(mutable: MutableGraph<N, E, T>, f: (data: E) => E) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1053)

Since v3.18.0

## mapNodes

Transforms every node's data in a mutable graph in place using the provided
mapping function.

**Details**

Node indices and edges are preserved; only the stored node data is replaced.

**Example** (Mapping node data)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  Graph.addNode(mutable, "node a")
  Graph.addNode(mutable, "node b")
  Graph.addNode(mutable, "node c")
  Graph.mapNodes(mutable, (data) => data.toUpperCase())
})

const nodeData = Graph.getNode(graph, 0)
console.log(nodeData) // Option.some("NODE A")
```

**Signature**

```ts
declare const mapNodes: <N, E, T extends Kind = "directed">(mutable: MutableGraph<N, E, T>, f: (data: N) => N) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1018)

Since v3.18.0

## reverse

Swaps source and target nodes for every edge in a mutable graph.

**Example** (Reversing edge directions)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  const a = Graph.addNode(mutable, "A")
  const b = Graph.addNode(mutable, "B")
  const c = Graph.addNode(mutable, "C")
  Graph.addEdge(mutable, a, b, 1) // A -> B
  Graph.addEdge(mutable, b, c, 2) // B -> C
  Graph.reverse(mutable) // Now B -> A, C -> B
})

const edge0 = Graph.getEdge(graph, 0)
console.log(edge0) // Option.some(new Graph.Edge({ source: 1, target: 0, data: 1 }))
```

**Signature**

```ts
declare const reverse: <N, E, T extends Kind = "directed">(mutable: MutableGraph<N, E, T>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L1116)

Since v3.18.0

## updateNode

Updates a single node's data by applying a transformation function.

**Example** (Updating node data)

```ts
import { Graph } from "effect"

const graph = Graph.directed<string, number>((mutable) => {
  Graph.addNode(mutable, "Node A")
  Graph.addNode(mutable, "Node B")
  Graph.updateNode(mutable, 0, (data) => data.toUpperCase())
})

const nodeData = Graph.getNode(graph, 0)
console.log(nodeData) // Option.some("NODE A")
```

**Signature**

```ts
declare const updateNode: <N, E, T extends Kind = "directed">(
  mutable: MutableGraph<N, E, T>,
  index: NodeIndex,
  f: (data: N) => N
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Graph.ts#L941)

Since v3.18.0
