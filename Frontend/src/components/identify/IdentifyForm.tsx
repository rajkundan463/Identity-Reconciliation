import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import Card from "../ui/Card"
import Button from "../ui/Button"
import Input from "../ui/Input"

import { identifyContact } from "../../api/contactApi"
import { useContactStore } from "../../store/contactStore"

export default function IdentifyForm() {

  const setContact =
    useContactStore(state => state.setContact)

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const mutation =
    useMutation({

      mutationFn: () =>
        identifyContact(
          email || undefined,
          phone || undefined
        ),

      onSuccess: (data) => {

        setContact(data.contact)
      }
    })

  const submit = () => {

    if (!email && !phone) return

    mutation.mutate()
  }

  return (

    <Card title="Identify Contact">

      <div className="space-y-4">

        <Input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <Button
          onClick={submit}
          loading={mutation.isPending}
        >
          Identify
        </Button>

        {mutation.isError && (
          <div className="text-red-500">
            Failed. Try again.
          </div>
        )}

      </div>

    </Card>
  )
}