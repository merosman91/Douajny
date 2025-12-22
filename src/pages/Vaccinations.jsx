import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { getInventoryByCycle, deductInventory } from "../db/inventory"
import { addTreatment, getTreatmentsByCycle } from "../db/treatments"

export default function Vaccinations() {
  const { activeCycle } = useActiveCycle()
  const [inventory, setInventory] = useState([])
  const [records, setRecords] = useState([])
  const [form, setForm] = useState({
    itemId: "",
    dose: ""
  })

  const load = async () => {
    if (!activeCycle) return
    setInventory(await getInventoryByCycle(activeCycle.id))
    setRecords(await getTreatmentsByCycle(activeCycle.id))
  }

  useEffect(() => {
    load()
  }, [activeCycle])

  const submit = async () => {
    if (!activeCycle) return

    await addTreatment({
      ...form,
      type: "vaccine",
      cycleId: activeCycle.id,
      date: new Date().toISOString().slice(0, 10)
    })

    await deductInventory(Number(form.itemId), Number(form.dose))
    setForm({ itemId: "", dose: "" })
    load()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">التحصينات</h2>

      <div className="flex gap-2 mb-4">
        <select
          value={form.itemId}
          onChange={e => setForm({ ...form, itemId: e.target.value })}
          className="border p-2"
        >
          <option value="">اختر اللقاح</option>
          {inventory
            .filter(i => i.type === "vaccine")
            .map(i => (
              <option key={i.id} value={i.id}>
                {i.name} (متوفر: {i.quantity})
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder="الجرعة"
          value={form.dose}
          onChange={e => setForm({ ...form, dose: e.target.value })}
          className="border p-2"
        />

        <button
          onClick={submit}
          className="bg-green-600 text-white px-4 rounded"
        >
          تسجيل
        </button>
      </div>

      <ul className="space-y-2">
        {records.map(r => (
          <li key={r.id} className="border p-2 rounded">
            💉 لقاح – جرعة {r.dose} – {r.date}
          </li>
        ))}
      </ul>
    </div>
  )
}
