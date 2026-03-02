import { Handle, Position } from "reactflow"

interface Props {
  data: {
    label: string
    type: "primary" | "secondary"
  }
}

export default function GraphNode({ data }: Props) {

  const isPrimary =
    data.type === "primary"

  return (

    <div
      className={`
        px-4
        py-2
        rounded-lg
        text-white
        shadow
        ${isPrimary
          ? "bg-green-500"
          : "bg-blue-500"}
      `}
    >

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
      />

      <Handle
        type="target"
        position={Position.Top}
      />

    </div>

  )
}