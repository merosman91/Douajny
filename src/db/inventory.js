import { openDB } from "./db"

export const getInventoryByCycle = async cycleId => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("inventory", "readonly")
    const store = tx.objectStore("inventory")
    const index = store.index("cycleId")
    const req = index.getAll(cycleId)
    req.onsuccess = () => resolve(req.result)
  })
}

export const addInventoryItem = async item => {
  const db = await openDB()
  const tx = db.transaction("inventory", "readwrite")
  tx.objectStore("inventory").add(item)
}

export const updateInventoryItem = async item => {
  const db = await openDB()
  const tx = db.transaction("inventory", "readwrite")
  tx.objectStore("inventory").put(item)
  }

export const deductInventory = async (itemId, amount) => {
  const db = await openDB()
  const tx = db.transaction("inventory", "readwrite")
  const store = tx.objectStore("inventory")

  store.get(itemId).onsuccess = e => {
    const item = e.target.result
    if (!item) return
    item.quantity -= amount
    if (item.quantity < 0) item.quantity = 0
    store.put(item)
  }
                 }
