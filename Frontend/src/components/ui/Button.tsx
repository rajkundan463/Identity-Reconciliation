interface Props
extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  loading?: boolean
}

export default function Button({

  loading,

  children,

  ...props

}: Props) {

  return (

    <button

      {...props}

      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-4
      py-2
      rounded-lg
      disabled:opacity-50
      "

      disabled={loading}
    >

      {loading
        ? "Processing..."
        : children}

    </button>

  )
}