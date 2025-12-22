import { useState } from "react"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const [theme, setTheme] = useState("light")
  const [lang, setLang] = useState("ar")

  return (
    <div className={theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
      <header className="p-4 flex justify-between">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          تبديل الوضع
        </button>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
          {lang === "ar" ? "EN" : "AR"}
        </button>
      </header>

      <Dashboard />
    </div>
  )
}
