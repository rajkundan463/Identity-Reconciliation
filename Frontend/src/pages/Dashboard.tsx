import { useQuery } from "@tanstack/react-query"
import { getAllContacts } from "../api/contactApi"
import IdentifyForm from "../components/identify/IdentifyForm"
import ContactSummary from "../components/contact/ContactSummary"
import Breadcrumb from "../components/ui/Breadcrumb"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ["contacts-count"],
    queryFn: getAllContacts
  })

  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          “Unify Identities. Visualize Relationships.”
        </h1>
        <button
          onClick={() => navigate("/contacts")}
          className="relative bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Contact History
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {data?.length || 0}
          </span>
        </button>
      </div>
      <IdentifyForm />
      <ContactSummary />
    </div>
  )
}
