import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { addExpense, getExpensesByCycle } from "../db/expenses"

export default function Expenses() {
  const { activeCycle } = useActiveCycle()
  const [items, setItems] = useState([])
  const [form, setForm] = useState({
    title: "",
    amount: ""
  })

  const load = async () => {
    if (!activeCycle) return
    setItems(await getExpensesByCycle(activeCycle.id))
  }

  useEffect(() => {
    load()
  }, [activeCycle])

  const submit = async () => {
    if (!activeCycle) return

    await addExpense({
      ...form,
      amount: Number(form.amount),
      cycleId: activeCycle.id,
      date: new Date().toISOString().slice(0, 10)
    })

    setForm({ title: "", amount: "" })
    load()
  }

  const total = items.reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">المصروفات</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="الوصف"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="المبلغ"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className="border p-2"
        />
        <button
          onClick={submit}
          className="bg-green-600 text-white px-4 rounded"
        >
          إضافة
        </button>
      </div>

      <p className="mb-2 font-bold">إجمالي المصروفات: {total}</p>

      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.id} className="border p-2 rounded">
            {i.title} – {i.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}
