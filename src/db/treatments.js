import { openDB } from "./db"

export const initTreatmentsStore = db => {
  if (!db.objectStoreNames.contains("treatments")) {
    const store = db.createObjectStore("treatments", {
      keyPath: "id",
      autoIncrement: true
    })
    store.createIndex("cycleId", "cycleId", { unique: false })
  }
}

export const addTreatment = async record => {
  const db = await openDB()
  const tx = db.transaction("treatments", "readwrite")
  tx.objectStore("treatments").add(record)
}

export const getTreatmentsByCycle = async cycleId => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("treatments", "readonly")
    const store = tx.objectStore("treatments")
    const index = store.index("cycleId")
    index.getAll(cycleId).onsuccess = e => resolve(e.target.result)
  })
      }
