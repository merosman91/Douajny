import { exportBackup, importBackup } from "../db/backup"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { resetCycle } from "../db/cycles"

export default function Settings() {
  const { activeCycle } = useActiveCycle()

  const backup = async () => {
    const data = await exportBackup()
    const blob = new Blob([data], { type: "application/json" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "douajny-backup.json"
    a.click()
  }

  const restore = e => {
    const reader = new FileReader()
    reader.onload = async () => {
      await importBackup(reader.result)
      alert("تم الاسترجاع بنجاح")
    }
    reader.readAsText(e.target.files[0])
  }

  const reset = async () => {
    if (!activeCycle) return
    if (confirm("هل أنت متأكد من إعادة ضبط الدورة؟")) {
      await resetCycle(activeCycle.id)
      alert("تمت إعادة الضبط")
    }
  }

  return (
    <div className="p-4">
      <h2>الإعدادات</h2>

      <button onClick={backup}>نسخ احتياطي</button>
      <input type="file" onChange={restore} />

      <hr />

      <button onClick={reset} style={{ color: "red" }}>
        إعادة ضبط الدورة الحالية
      </button>
    </div>
  )
}
