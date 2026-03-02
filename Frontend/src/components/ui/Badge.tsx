interface Props {

  children: React.ReactNode
}

export default function Badge({

  children

}: Props) {

  return (

    <span
      className="
      inline-block
      bg-blue-50
      text-blue-700
      px-2
      py-1
      rounded-md
      text-sm
      mr-2
      mb-2
      "
    >

      {children}

    </span>

  )
}