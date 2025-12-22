import { openDB } from "./db"

export async function addSale(s) {
  const db = await openDB()
  db.transaction("sales", "readwrite")
    .objectStore("sales")
    .put(s)
}
