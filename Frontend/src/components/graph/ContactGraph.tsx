import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from "reactflow"

import type { Node, Edge } from "reactflow"

import "reactflow/dist/style.css"

import { useContactStore } from "../../store/contactStore"
import { useEffect, useRef } from "react"

export default function ContactGraph() {

  const graph =
    useContactStore(state => state.graph)

  const containerRef = useRef<HTMLDivElement>(null)

  const [nodes, setNodes, onNodesChange] =
    useNodesState([])

  const [edges, setEdges, onEdgesChange] =
    useEdgesState([])

  useEffect(() => {

    if (!graph || !containerRef.current) return

    const width =
      containerRef.current.offsetWidth

    const height =
      containerRef.current.offsetHeight

    const centerX = width / 2
    const centerY = height / 2

    const primary =
      graph.nodes.find(n => n.type === "primary")

    const secondaries =
      graph.nodes.filter(n => n.type === "secondary")

    const newNodes: Node[] = []

    // PRIMARY CENTER
    if (primary) {
      newNodes.push({
        id: primary.id,
        position: { x: centerX, y: centerY },
        data: { label: `ID: ${primary.id}` },
        style: {
          background: "#16a34a",
          color: "white",
          padding: 14,
          borderRadius: 12,
          fontWeight: 600
        }
      })
    }

    // Dynamic radius based on container
    const radius =
      Math.min(width, height) / 3

    const angleStep =
      (2 * Math.PI) /
      (secondaries.length || 1)

    secondaries.forEach((node, index) => {

      const angle = index * angleStep

      const x =
        centerX + radius * Math.cos(angle)

      const y =
        centerY + radius * Math.sin(angle)

      newNodes.push({
        id: node.id,
        position: { x, y },
        data: { label: `ID: ${node.id}` },
        style: {
          background: "#2563eb",
          color: "white",
          padding: 12,
          borderRadius: 12
        }
      })
    })

    const newEdges: Edge[] =
      secondaries.map((node, index) => ({
        id: `e${index}`,
        source: primary?.id || "",
        target: node.id,
        animated: true,
        style: {
          strokeWidth: 2
        }
      }))

    setNodes(newNodes)
    setEdges(newEdges)

  }, [graph])

  if (!graph) return null

  return (

    <div
      ref={containerRef}
      className="
        w-full
        h-[70vh]
        max-h-[600px]
        relative
        overflow-hidden
        rounded-xl
      "
    >

      {/* LEGEND */}
      <div className="
        absolute top-4 right-4
        bg-white shadow px-4 py-2
        rounded-lg text-sm z-10
      ">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-600 rounded-full" />
          Primary
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full" />
          Secondary
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        panOnDrag
        zoomOnScroll
      >
        <MiniMap />
        <Controls />
        <Background gap={18} size={1} />
      </ReactFlow>

    </div>
  )
}