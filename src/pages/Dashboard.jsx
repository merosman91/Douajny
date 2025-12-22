import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { getExpensesByCycle } from "../db/expenses"
import { getSalesByCycle } from "../db/sales"
import { getMortalityByCycle } from "../db/mortality"

export default function Dashboard() {
  const { activeCycle } = useActiveCycle()
  const [expenses, setExpenses] = useState([])
  const [sales, setSales] = useState([])
  const [mortality, setMortality] = useState([])

  useEffect(() => {
    if (!activeCycle) return
    getExpensesByCycle(activeCycle.id).then(setExpenses)
    getSalesByCycle(activeCycle.id).then(setSales)
    getMortalityByCycle(activeCycle.id).then(setMortality)
  }, [activeCycle])

  if (!activeCycle)
    return <p className="p-6 text-red-600">لا توجد دورة نشطة</p>

  const totalCost = expenses.reduce((s, i) => s + i.amount, 0)
  const totalIncome = sales.reduce((s, i) => s + i.total, 0)
  const profit = totalIncome - totalCost
  const dead = mortality.reduce((s, i) => s + i.count, 0)

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      <Card title="الدورة">{activeCycle.name}</Card>
      <Card title="إجمالي المصروفات">{totalCost}</Card>
      <Card title="إجمالي الإيرادات">{totalIncome}</Card>
      <Card title="صافي الربح">{profit}</Card>
      <Card title="إجمالي النفوق">{dead}</Card>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="text-xl">{children}</div>
    </div>
  )
}
