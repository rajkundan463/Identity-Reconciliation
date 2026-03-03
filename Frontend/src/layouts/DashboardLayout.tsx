import { Users, LayoutDashboard} from "lucide-react"
import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

interface Props {
  children: ReactNode
}

export default function DashboardLayout({
  children
}: Props) {

  return (

    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className="
          w-64
          bg-white
          border-r
          shadow-sm
          flex
          flex-col
        "
      >

        {/* LOGO */}
        <div className="p-6 font-bold text-xl border-b">
          TraceIdentity
        </div>


        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2">

          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            to="/"
          />

          <SidebarItem
            icon={<Users size={18} />}
            label="Contacts"
            to="/contacts"
          />


        </nav>

      </aside>


      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header
          className="
            bg-white
            border-b
            px-6
            py-4
            font-semibold
          "
        >
          Identity Reconciliation Dashboard
        </header>


        {/* CONTENT */}
        <main
          className="
            flex-1
            overflow-auto
            p-6
          "
        >
          {children}
        </main>

      </div>

    </div>
  )
}

interface SidebarItemProps {
  icon: ReactNode
  label: string
  to: string
}

function SidebarItem({
  icon,
  label,
  to
}: SidebarItemProps) {

  const location = useLocation()

  const active =
    location.pathname === to

  return (

    <Link
      to={to}
      className={clsx(
        "flex items-center gap-3 p-3 rounded transition-colors",

        active
          ? "bg-blue-50 text-blue-600"
          : "hover:bg-gray-100 text-gray-700"
      )}
    >

      {icon}

      <span>{label}</span>

    </Link>

  )
}