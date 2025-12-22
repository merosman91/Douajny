import Cycles from "../pages/Cycles"

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Cycles />
      </div>
    </div>
  )
}
