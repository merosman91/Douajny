import Sidebar from "./Sidebar"
import Header from "./Header"
import Dashboard from "../pages/Dashboard"

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}
