import { useEffect, useState } from "react"
import useActiveCycle from "../hooks/useActiveCycle" // بدون أقواس {}
import { getExpensesByCycle } from "../db/expenses"
import { getSalesByCycle } from "../db/sales"
import { getMortalityByCycle } from "../db/mortality"

export default function Dashboard() {
  const { activeCycle, loading, error, reloadCycle } = useActiveCycle() // تأكد أنك تستقبل reloadCycle
  const [expenses, setExpenses] = useState([])
  const [sales, setSales] = useState([])
  const [mortality, setMortality] = useState([])

  useEffect(() => {
    if (!activeCycle) return
    
    const fetchData = async () => {
      try {
        const [expData, salesData, mortData] = await Promise.all([
          getExpensesByCycle(activeCycle.id),
          getSalesByCycle(activeCycle.id),
          getMortalityByCycle(activeCycle.id)
        ])
        
        setExpenses(expData)
        setSales(salesData)
        setMortality(mortData)
      } catch (err) {
        console.error('خطأ في تحميل البيانات:', err)
      }
    }
    
    fetchData()
  }, [activeCycle])

  if (loading) {
    return <p className="p-6 text-gray-600">جاري التحميل...</p>
  }

  if (error) {
    return <p className="p-6 text-red-600">خطأ: {error}</p>
  }

  if (!activeCycle) {
    return <p className="p-6 text-red-600">لا توجد دورة نشطة</p>
  }

  const totalCost = expenses.reduce((s, i) => s + (i.amount || 0), 0)
  const totalIncome = sales.reduce((s, i) => s + (i.total || 0), 0)
  const profit = totalIncome - totalCost
  const dead = mortality.reduce((s, i) => s + (i.count || 0), 0)

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-gray-600">الدورة النشطة: {activeCycle.name}</p>
        <button 
          onClick={reloadCycle}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          تحديث البيانات
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="إجمالي المصروفات">{totalCost.toLocaleString()} د.ج</Card>
        <Card title="إجمالي الإيرادات">{totalIncome.toLocaleString()} د.ج</Card>
        <Card title="صافي الربح" className={profit >= 0 ? "text-green-600" : "text-red-600"}>
          {profit.toLocaleString()} د.ج
        </Card>
        <Card title="إجمالي النفوق">{dead} رأس</Card>
      </div>
    </div>
  )
}

function Card({ title, children, className = "" }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="font-bold text-lg mb-3 text-gray-700 dark:text-gray-300">{title}</h3>
      <div className={`text-2xl font-semibold ${className}`}>{children}</div>
    </div>
  )
          }
