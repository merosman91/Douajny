import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { Bar } from "react-chartjs-2"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import { getExpensesByCycle } from "../db/expenses"
import { getSalesByCycle } from "../db/sales"
import { getMortalityByCycle } from "../db/mortality"
import { getInventoryByCycle } from "../db/inventory"

import { calculateAnalytics } from "../utils/analytics"
import ReportSummary from "../components/ReportSummary"

export default function Reports() {
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

  if (!analytics) return <p>تحميل التقرير...</p>

  const chartData = {
    labels: ["المصروفات", "المبيعات"],
    datasets: [
      {
        label: "القيم",
        data: [analytics.costPerBird * analytics.liveBirds, analytics.profit],
        backgroundColor: ["#f87171", "#4ade80"]
      }
    ]
  }

  const exportPDF = async () => {
    const el = document.getElementById("report")
    const canvas = await html2canvas(el)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF()
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0)
    pdf.save("douajny-report.pdf")
  }

  const shareWhatsApp = () => {
    const msg = `
تقرير دورة: ${activeCycle.name}
عدد الطيور: ${analytics.liveBirds}
FCR: ${analytics.fcr}
صافي الربح: ${analytics.profit}
`
    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`,
      "_blank"
    )
  }

  return (
    <div className="p-4">
      <h2>التقارير</h2>

      <div id="report">
        <ReportSummary analytics={analytics} />
        <Bar data={chartData} />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={exportPDF}>تحميل PDF</button>
        <button onClick={shareWhatsApp}>مشاركة واتساب</button>
      </div>
    </div>
  )
    }
