import { Link } from "react-router-dom"
import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export default function Sidebar() {
  const { t } = useContext(LanguageContext)

  return (
    <aside className="sidebar">
      <h2>{t.appName}</h2>
      <nav>
        <Link to="/">{t.dashboard}</Link>
        <Link to="/cycles">{t.cycles}</Link>
        <Link to="/settings">{t.settings}</Link>
      </nav>
    </aside>
  )
        }
