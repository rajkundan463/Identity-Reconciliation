import type { ReactNode } from "react"

interface Props {

  title?: string

  children: ReactNode
}

export default function Card({

  title,

  children

}: Props) {

  return (

    <div className="bg-white rounded-xl shadow-sm border">

      {title && (

        <div className="px-6 py-4 border-b font-semibold">

          {title}

        </div>

      )}

      <div className="p-6">

        {children}

      </div>

    </div>

  )
}