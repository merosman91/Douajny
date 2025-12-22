import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { getExpensesByCycle } from "../db/expenses"
import { getSalesByCycle } from "../db/sales"
import { getMortalityByCycle } from "../db/mortality"
import { Bar } from "react-chartjs-2"
import { exportPDF } from "../utils/exportPDF"

export default function Reports() {
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

  if (!activeCycle) return <p className="p-6 text-red-600">لا توجد دورة نشطة</p>

  const chartData = {
    labels: ["المصروفات", "الإيرادات", "النفوق"],
    datasets: [
      {
        label: "الدورة الحالية",
        data: [
          expenses.reduce((s, i) => s + i.amount, 0),
          sales.reduce((s, i) => s + i.total, 0),
          mortality.reduce((s, i) => s + i.count, 0)
        ],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa"]
      }
    ]
  }

  const shareWhatsApp = () => {
    const profit = sales.reduce((s, i) => s + i.total, 0) -
                   expenses.reduce((s, i) => s + i.amount, 0)
    const msg = `تقرير دورة ${activeCycle.name}\n` +
                `إجمالي الإيرادات: ${sales.reduce((s, i) => s + i.total, 0)}\n` +
                `إجمالي المصروفات: ${expenses.reduce((s, i) => s + i.amount, 0)}\n` +
                `صافي الربح: ${profit}\n` +
                `إجمالي النفوق: ${mortality.reduce((s, i) => s + i.count, 0)}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">التقارير</h2>

      <div id="report-content" className="mb-4 p-4 border rounded">
        <Bar data={chartData} />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => exportPDF("report-content")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          تحميل PDF
        </button>

        <button
          onClick={shareWhatsApp}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          مشاركة واتساب
        </button>
      </div>
    </div>
  )
}
