import ContactList from "../components/contact/ContactList"
import Breadcrumb from "../components/ui/Breadcrumb"

export default function Contacts() {
  return (
    <div>
      <Breadcrumb />
      <h1 className="text-3xl font-bold mb-8">
        “Every Connection Tells a Story.”
      </h1>
      <ContactList />
    </div>
  )
}
