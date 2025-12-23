import { createContext, useEffect, useState, useContext } from "react" // ← أضف useContext
import { getActiveCycle } from "../db/cycles"

export const CycleContext = createContext()

export function CycleProvider({ children }) {
  const [activeCycle, setActiveCycle] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadActiveCycle = async () => {
    const cycle = await getActiveCycle()
    setActiveCycle(cycle)
    setLoading(false)
  }

  useEffect(() => {
    loadActiveCycle()
  }, [])

  return (
    <CycleContext.Provider
      value={{ activeCycle, reloadCycle: loadActiveCycle, loading }}
    >
      {children}
    </CycleContext.Provider>
  )
}

// ✅ أضف هذا الـ Hook الجديد - هذا ما يطلبه Dashboard.jsx
export function useActiveCycle() {
  const context = useContext(CycleContext)
  if (context === undefined) {
    throw new Error("useActiveCycle must be used within a CycleProvider")
  }
  return context
}
