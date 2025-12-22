import { openDB } from "./db"

export const addExpense = async expense => {
  const db = await openDB()
  const tx = db.transaction("expenses", "readwrite")
  tx.objectStore("expenses").add(expense)
}

export const getExpensesByCycle = async cycleId => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("expenses", "readonly")
    const store = tx.objectStore("expenses")
    const index = store.index("cycleId")
    index.getAll(cycleId).onsuccess = e => resolve(e.target.result)
  })
}
