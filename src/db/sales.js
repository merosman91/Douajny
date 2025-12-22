import { openDB } from "./db"

export async function addSales(sales) {
  const db = await openDB()
  const tx = db.transaction("sales", "readwrite")
  tx.objectStore("sales").put(sales)
}

export async function getSalesByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("sales", "readonly")
    const req = tx.objectStore("sales").getAll()
    req.onsuccess = () =>
      res(req.result.filter(e => e.cycleId === cycleId))
  })
}
