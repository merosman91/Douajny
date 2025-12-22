import Cycles from "../pages/Cycles"
import Inventory from "../pages/Inventory"

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Cycles />
        <Inventory />
      </div>
    </div>
  )
}
