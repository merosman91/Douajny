import { openDB } from "./db"

export async function addExpense(e) {
  const db = await openDB()
  db.transaction("expenses", "readwrite")
    .objectStore("expenses")
    .put(e)
}

// ✅ أضف هذا
export async function getExpensesByCycle(cycleId) {
  const db = await openDB()
  const transaction = db.transaction("expenses", "readonly")
  const store = transaction.objectStore("expenses")
  const allExpenses = await store.getAll()
  return allExpenses.filter(expense => expense.cycleId === cycleId)
                                        }
