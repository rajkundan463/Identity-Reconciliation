interface Props
extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {

  return (

    <input

      {...props}

      className="
      w-full
      border
      rounded-lg
      px-3
      py-2
      focus:outline-none
      focus:ring
      focus:ring-blue-200
      "

    />

  )
}