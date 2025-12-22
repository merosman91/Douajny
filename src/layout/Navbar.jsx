import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { LanguageContext } from "../context/LanguageContext"

export default function Navbar() {
  const { toggleTheme } = useContext(ThemeContext)
  const { toggleLang } = useContext(LanguageContext)

  return (
    <header className="navbar">
      <button onClick={toggleTheme}>🌓</button>
      <button onClick={toggleLang}>🌐</button>
    </header>
  )
}
