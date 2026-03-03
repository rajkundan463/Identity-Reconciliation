
import { useQuery } from "@tanstack/react-query"
import { getAllContacts, getContact } from "../../api/contactApi"
import { useContactStore } from "../../store/contactStore"
import { useState } from "react"
import Modal from "../ui/Modal"
import ContactSummary from "./ContactSummary"

export default function ContactList() {

  const setContact = useContactStore(state => state.setContact)
  const setGraph = useContactStore(state => state.setGraph)
  const clearGraph = useContactStore(state => state.clearGraph)

  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContacts
  })

  const loadContact = async (id: number) => {
    clearGraph()
    const data = await getContact(id)
    setContact(data.contact)
    setGraph(data.graph)
    setOpen(true)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {data?.map((contact: any) => (
          <div
            key={contact.id}
            onClick={() => loadContact(contact.id)}
            className="p-6 border-b hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
          >
            <div className="font-semibold">ID: {contact.id}</div>
            <div className="text-sm text-gray-500">{contact.email || "No email"}</div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[800px] max-w-full">
          <ContactSummary />
        </div>
      </Modal>
    </>
  )
}
