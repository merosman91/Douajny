import { openDB } from "./db"

export async function addExpense(expense) {
  const db = await openDB()
  const tx = db.transaction("expenses", "readwrite")
  tx.objectStore("expenses").put(expense)
}

export async function getExpensesByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("expenses", "readonly")
    const req = tx.objectStore("expenses").getAll()
    req.onsuccess = () =>
      res(req.result.filter(e => e.cycleId === cycleId))
  })
      }
