import { openDB } from "./db"

export async function addItem(item) {
  const db = await openDB()
  const tx = db.transaction("inventory", "readwrite")
  tx.objectStore("inventory").put(item)
}

export async function getInventoryByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("inventory", "readonly")
    tx.objectStore("inventory").getAll().onsuccess = e =>
      res(e.target.result.filter(i => i.cycleId === cycleId))
  })
}

export async function consumeItem(id, qty) {
  const db = await openDB()
  const tx = db.transaction("inventory", "readwrite")
  const store = tx.objectStore("inventory")
  store.get(id).onsuccess = e => {
    const item = e.target.result
    item.quantity -= qty
    store.put(item)
  }
}
