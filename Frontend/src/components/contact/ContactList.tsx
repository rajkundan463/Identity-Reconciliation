import { useQuery } from "@tanstack/react-query"
import { getAllContacts, getContact } from "../../api/contactApi"
import { useContactStore } from "../../store/contactStore"

export default function ContactList() {

  const setContact =
    useContactStore(state => state.setContact)

  const setGraph =
    useContactStore(state => state.setGraph)

  const { data, isLoading } =
    useQuery({
      queryKey: ["contacts"],
      queryFn: getAllContacts
    })

  const loadContact = async (id: number) => {

    const data =
      await getContact(id)

    setContact(data.contact)
    setGraph(data.graph)
  }

  if (isLoading)
    return <div>Loading contacts...</div>

  return (

    <div className="bg-white rounded-xl shadow border">

      <div className="px-6 py-4 border-b font-semibold">
        Contact History
      </div>

      <div className="divide-y">

        {data?.map((contact: any) => (

          <div
            key={contact.id}
            onClick={() => loadContact(contact.id)}
            className="
              px-6
              py-4
              hover:bg-gray-50
              cursor-pointer
              transition
            "
          >

            <div className="font-medium">
              ID: {contact.id}
            </div>

            <div className="text-sm text-gray-500">
              {contact.email || "No email"}
            </div>

            <div className="text-sm text-gray-500">
              {contact.phoneNumber || "No phone"}
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}