import { useState } from "react"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const [theme, setTheme] = useState("light")
  const [lang, setLang] = useState("ar")

  return (
    <div className={theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-black min-h-screen"}>
      <header className="p-4 flex justify-between bg-gray-100 dark:bg-gray-800">
        <h1 className="font-bold text-lg">{lang === "ar" ? "دواجني" : "Douajny"}</h1>
        <div className="flex gap-2">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded">
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded">
            {lang === "ar" ? "EN" : "AR"}
          </button>
        </div>
      </header>

      <main>
        <Dashboard />
      </main>
    </div>
  )
          }
