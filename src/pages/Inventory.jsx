import { useEffect, useState } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import {
  getInventoryByCycle,
  addInventoryItem
} from "../db/inventory"

export default function Inventory() {
  const { activeCycle } = useActiveCycle()
  const [items, setItems] = useState([])
  const [form, setForm] = useState({
    name: "",
    type: "feed",
    quantity: ""
  })

  const load = async () => {
    if (!activeCycle) return
    setItems(await getInventoryByCycle(activeCycle.id))
  }

  useEffect(() => {
    load()
  }, [activeCycle])

  const submit = async () => {
    if (!activeCycle) {
      alert("يرجى تفعيل دورة أولاً")
      return
    }

    if (!form.name || !form.quantity) return

    await addInventoryItem({
      ...form,
      quantity: Number(form.quantity),
      cycleId: activeCycle.id,
      createdAt: new Date().toISOString()
    })

    setForm({ name: "", type: "feed", quantity: "" })
    load()
  }

  if (!activeCycle)
    return <p className="p-6 text-red-600">لا توجد دورة نشطة</p>

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">المخزون</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          placeholder="اسم الصنف"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="feed">علف</option>
          <option value="medicine">دواء</option>
          <option value="vaccine">لقاح</option>
          <option value="tools">أدوات</option>
        </select>

        <input
          placeholder="الكمية"
          type="number"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        إضافة للمخزون
      </button>

      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className="p-3 border rounded flex justify-between"
          >
            <span>
              {item.name} ({item.type})
            </span>
            <strong>{item.quantity}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
