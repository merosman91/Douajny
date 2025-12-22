import { openDB } from "./db"

export const addMortality = async record => {
  const db = await openDB()
  const tx = db.transaction("mortality", "readwrite")
  tx.objectStore("mortality").add(record)
}

export const getMortalityByCycle = async cycleId => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("mortality", "readonly")
    const store = tx.objectStore("mortality")
    const index = store.index("cycleId")
    index.getAll(cycleId).onsuccess = e => resolve(e.target.result)
  })
}
