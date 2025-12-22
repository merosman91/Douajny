import { createContext, useEffect, useState } from "react"
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
