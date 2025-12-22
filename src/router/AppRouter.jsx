import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Cycles from "../pages/Cycles"
import Settings from "../pages/Settings"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cycles" element={<Cycles />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
