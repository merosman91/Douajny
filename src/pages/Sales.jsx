import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { addSale, getSalesByCycle } from "../db/sales"

export default function Sales() {
  const { activeCycle } = useActiveCycle()
  const [sales, setSales] = useState([])
  const [form, setForm] = useState({
    birds: "",
    weight: "",
    price: ""
  })

  const load = async () => {
    if (!activeCycle) return
    setSales(await getSalesByCycle(activeCycle.id))
  }

  useEffect(() => {
    load()
  }, [activeCycle])

  const submit = async () => {
    if (!activeCycle) return

    const total = Number(form.weight) * Number(form.price)

    await addSale({
      ...form,
      total,
      cycleId: activeCycle.id,
      date: new Date().toISOString().slice(0, 10)
    })

    setForm({ birds: "", weight: "", price: "" })
    load()
  }

  const income = sales.reduce((s, i) => s + i.total, 0)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">المبيعات</h2>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <input
          placeholder="عدد الطيور"
          value={form.birds}
          onChange={e => setForm({ ...form, birds: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="الوزن الكلي"
          value={form.weight}
          onChange={e => setForm({ ...form, weight: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="سعر الكيلو"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="border p-2"
        />
        <button
          onClick={submit}
          className="bg-green-600 text-white rounded"
        >
          بيع
        </button>
      </div>

      <p className="font-bold mb-2">إجمالي الإيرادات: {income}</p>

      <ul className="space-y-2">
        {sales.map(s => (
          <li key={s.id} className="border p-2 rounded">
            {s.date} – {s.weight} كجم × {s.price} = {s.total}
          </li>
        ))}
      </ul>
    </div>
  )
}
