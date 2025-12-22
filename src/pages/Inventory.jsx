import { useState, useEffect } from "react"
import { useActiveCycle } from "../hooks/useActiveCycle"
import { addItem, getInventoryByCycle } from "../db/inventory"

export default function Inventory() {
  const { activeCycle } = useActiveCycle()
  const [items, setItems] = useState([])
  const [name, setName] = useState("")
  const [qty, setQty] = useState(0)

  useEffect(() => {
    if (activeCycle)
      getInventoryByCycle(activeCycle.id).then(setItems)
  }, [activeCycle])

  if (!activeCycle) return <p>فعّل دورة أولًا</p>

  const save = async () => {
    await addItem({
      id: Date.now(),
      cycleId: activeCycle.id,
      name,
      quantity: Number(qty)
    })
    setName("")
    setQty(0)
    getInventoryByCycle(activeCycle.id).then(setItems)
  }

  return (
    <div className="p-4">
      <h2>المخزون</h2>

      <input placeholder="اسم الصنف" value={name}
        onChange={e => setName(e.target.value)} />
      <input type="number" value={qty}
        onChange={e => setQty(e.target.value)} />
      <button onClick={save}>إضافة</button>

      <ul>
        {items.map(i => (
          <li key={i.id}>{i.name} – {i.quantity}</li>
        ))}
      </ul>
    </div>
  )
}
