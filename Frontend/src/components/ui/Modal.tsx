import type { ReactNode } from "react"

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({
  open,
  onClose,
  children
}: Props) {

  if (!open) return null

  return (

    <div className="
      fixed inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-white
        w-[800px]
        max-w-full
        rounded-xl
        shadow-xl
        relative
      ">

        <button
          onClick={onClose}
          className="
          absolute top-3 right-4
          text-gray-500 hover:text-black
          text-xl
          "
        >
          ✕
        </button>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  )
}