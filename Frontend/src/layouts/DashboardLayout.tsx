import {
  Users,
  LayoutDashboard,
  Settings
} from "lucide-react"

import clsx from "clsx"
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

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

        <div className="p-6 font-bold text-xl border-b">

          IdentityGraph

        </div>


        <nav className="flex-1 p-4 space-y-2">

          <SidebarItem
            icon={<LayoutDashboard size={18}/>}
            label="Dashboard"
            active
          />

          <SidebarItem
            icon={<Users size={18}/>}
            label="Contacts"
          />

          <SidebarItem
            icon={<Settings size={18}/>}
            label="Settings"
          />

        </nav>

      </aside>


      {/* MAIN */}
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



function SidebarItem({
  icon,
  label,
  active
}: any) {

  return (

    <div
      className={clsx(
        "flex items-center gap-3 p-3 rounded cursor-pointer",

        active
          ? "bg-blue-50 text-blue-600"
          : "hover:bg-gray-100"
      )}
    >
      {icon}

      {label}

    </div>

  )
}