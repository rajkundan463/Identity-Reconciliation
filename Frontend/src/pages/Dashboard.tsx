import IdentifyForm from "../components/identify/IdentifyForm"
import ContactSummary from "../components/contact/ContactSummary"

export default function Dashboard() {

  return (

    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>
      
      <div className="bg-white p-6 rounded shadow">
        Welcome. Use the identify form to reconcile contacts.
      </div>

      <div className="space-y-6">
        <IdentifyForm />
        <ContactSummary/>
      </div>

    </div>

  )
}