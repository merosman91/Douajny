import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { addMortality, getMortalityByCycle } from "../db/mortality"

export default function Mortality() {
  const { activeCycle } = useActiveCycle()
  const [records, setRecords] = useState([])
  const [count, setCount] = useState("")

  const load = async () => {
    if (!activeCycle) return
    setRecords(await getMortalityByCycle(activeCycle.id))
  }

  useEffect(() => {
    load()
  }, [activeCycle])

  const submit = async () => {
    if (!activeCycle) return

    await addMortality({
      count: Number(count),
      cycleId: activeCycle.id,
      date: new Date().toISOString().slice(0, 10)
    })

    setCount("")
    load()
  }

  const total = records.reduce((s, r) => s + r.count, 0)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">النفوق</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="عدد النافق"
          value={count}
          onChange={e => setCount(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={submit}
          className="bg-red-600 text-white px-4 rounded"
        >
          تسجيل
        </button>
      </div>

      <p className="mb-2 font-bold">إجمالي النفوق: {total}</p>

      <ul className="space-y-2">
        {records.map(r => (
          <li key={r.id} className="border p-2 rounded">
            {r.date} – {r.count}
          </li>
        ))}
      </ul>
    </div>
  )
}
