import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
