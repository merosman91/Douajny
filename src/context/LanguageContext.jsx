import { createContext, useState } from "react"
import ar from "../i18n/ar"
import en from "../i18n/en"

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const stored = localStorage.getItem("lang") || "ar"
  const [lang, setLang] = useState(stored)

  const t = lang === "ar" ? ar : en

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar"
    setLang(newLang)
    localStorage.setItem("lang", newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
