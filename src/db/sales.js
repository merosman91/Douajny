import { openDB } from "./db"

export const addSale = async sale => {
  const db = await openDB()
  const tx = db.transaction("sales", "readwrite")
  tx.objectStore("sales").add(sale)
}

export const getSalesByCycle = async cycleId => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("sales", "readonly")
    const store = tx.objectStore("sales")
    const index = store.index("cycleId")
    index.getAll(cycleId).onsuccess = e => resolve(e.target.result)
  })
}
