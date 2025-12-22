import { openDB } from "./db"

export async function addInventory(inventory) {
  const db = await openDB()
  const tx = db.transaction("inventory", "readwrite")
  tx.objectStore("inventory").put(inventory)
}

export async function getInventoryByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("inventory", "readonly")
    const req = tx.objectStore("inventory").getAll()
    req.onsuccess = () =>
      res(req.result.filter(e => e.cycleId === cycleId))
  })
}
