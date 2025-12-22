import { openDB } from "./db"

export async function addExpense(e) {
  const db = await openDB()
  db.transaction("expenses", "readwrite")
    .objectStore("expenses")
    .put(e)
}
