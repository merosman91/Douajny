import { openDB } from "./db"

const STORES = ["cycles", "inventory", "expenses", "sales", "mortality"]

export async function exportBackup() {
  const db = await openDB()
  const backup = {}

  for (const storeName of STORES) {
    const tx = db.transaction(storeName, "readonly")
    const store = tx.objectStore(storeName)
    backup[storeName] = await new Promise(res => {
      store.getAll().onsuccess = e => res(e.target.result)
    })
  }

  return JSON.stringify({
    app: "douajny",
    version: 1,
    date: new Date().toISOString(),
    data: backup
  })
}

export async function importBackup(json) {
  const parsed = JSON.parse(json)
  if (parsed.app !== "douajny") throw "Invalid backup"

  const db = await openDB()
  for (const storeName of STORES) {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    parsed.data[storeName].forEach(item => store.put(item))
  }
}
