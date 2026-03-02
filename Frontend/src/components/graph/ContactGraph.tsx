import ReactFlow, {
  Background,
  Controls,
  MiniMap
} from "reactflow"

import type { Node, Edge } from "reactflow"

import "reactflow/dist/style.css"

import { useMemo } from "react"
import { useContactStore } from "../../store/contactStore"
import GraphNode from "./GraphNode"

const nodeTypes = {
  custom: GraphNode
}

export default function ContactGraph() {

  const graph =
    useContactStore(state => state.graph)

  const nodes: Node[] =
    useMemo(() => {

      if (!graph) return []

      return graph.nodes.map(
        (node, index) => ({

          id: node.id,

          type: "custom",

          position: {
            x: 250,
            y: index * 120
          },

          data: {
            label:
              `${node.type.toUpperCase()} (${node.id})`,
            type: node.type
          }
        })
      )

    }, [graph])


  const edges: Edge[] =
    useMemo(() => {

      if (!graph) return []

      return graph.edges.map(
        (edge, index) => ({

          id: String(index),

          source: edge.source,

          target: edge.target,

          animated: true
        }))
    }, [graph])


  if (!graph) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No graph data
      </div>
    )
  }


  return (

    <div className="h-full w-full">

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

    </div>

  )
}