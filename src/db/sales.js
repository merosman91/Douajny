import { openDB } from "./db"

export async function addExpense(sales) {
  const db = await openDB()
  const tx = db.transaction("sales", "readwrite")
  tx.objectStore("sales").put(sales)
}

export async function getExpensesByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("sales", "readonly")
    const req = tx.objectStore("sales").getAll()
    req.onsuccess = () =>
      res(req.result.filter(e => e.cycleId === cycleId))
  })
}
