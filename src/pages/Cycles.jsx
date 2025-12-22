import { useEffect, useState } from "react"
import { getCycles, addCycle, setActiveCycle } from "../db/cycles"
import { useActiveCycle } from "../hooks/useActiveCycle"

export default function Cycles() {
  const [cycles, setCycles] = useState([])
  const [name, setName] = useState("")
  const { reloadCycle } = useActiveCycle()

  const load = async () => {
    setCycles(await getCycles())
  }

  useEffect(() => {
    load()
  }, [])

  const create = async () => {
    if (!name) return
    await addCycle({
      name,
      startDate: new Date().toISOString().slice(0, 10),
      active: false
    })
    setName("")
    load()
  }

  const activate = async id => {
    await setActiveCycle(id)
    await reloadCycle()
    load()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">الدورات</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="اسم الدورة"
          className="border p-2 rounded"
        />
        <button onClick={create} className="bg-green-600 text-white px-4 rounded">
          إضافة
        </button>
      </div>

      {cycles.map(c => (
        <div
          key={c.id}
          className={`p-3 border rounded mb-2 ${
            c.active ? "bg-green-100" : ""
          }`}
        >
          <strong>{c.name}</strong>
          <button
            onClick={() => activate(c.id)}
            className="ml-4 text-sm text-blue-600"
          >
            تفعيل
          </button>
        </div>
      ))}
    </div>
  )
        }
