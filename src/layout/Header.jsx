import { toggleTheme } from "../theme/theme"

export default function Header() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 flex justify-end">
      <button
        onClick={toggleTheme}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        🌗
      </button>
    </div>
  )
}
