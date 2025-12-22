import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { getInventoryByCycle } from "../db/inventory"
import { getExpensesByCycle } from "../db/expenses"
import { getSalesByCycle } from "../db/sales"
import { getMortalityByCycle } from "../db/mortality"
import { calculateAnalytics } from "../utils/analytics"
import KPICard from "../components/KPICard"
import Alerts from "../components/Alerts"

export default function Dashboard() {
  const { activeCycle } = useActiveCycle()
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    if (!activeCycle) return

    Promise.all([
      getInventoryByCycle(activeCycle.id),
      getExpensesByCycle(activeCycle.id),
      getSalesByCycle(activeCycle.id),
      getMortalityByCycle(activeCycle.id)
    ]).then(([inventory, expenses, sales, mortality]) => {
      setAnalytics(
        calculateAnalytics({
          inventory,
          expenses,
          sales,
          mortality,
          initialBirds: activeCycle.initialBirds
        })
      )
    })
  }, [activeCycle])

  if (!activeCycle) return <p>فعّل دورة</p>
  if (!analytics) return <p>تحميل...</p>

  return (
    <div className="p-4">
      <h2>التحليل الذكي</h2>

      <div className="kpi-grid">
        <KPICard title="FCR" value={analytics.fcr} />
        <KPICard title="تكلفة الطائر" value={analytics.costPerBird} />
        <KPICard title="تكلفة الكيلو" value={analytics.costPerKg} />
        <KPICard title="صافي الربح" value={analytics.profit} />
      </div>

      <Alerts analytics={analytics} />
    </div>
  )
}
