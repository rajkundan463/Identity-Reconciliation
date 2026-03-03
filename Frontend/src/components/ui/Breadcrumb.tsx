
import { useLocation, Link } from "react-router-dom"

export default function Breadcrumb() {
  const location = useLocation()
  const path = location.pathname === "/" ? "Dashboard" : "Contacts"

  return (
    <div className="text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:underline">Home</Link> / {path}
    </div>
  )
}
