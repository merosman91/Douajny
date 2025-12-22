import { openDB } from "./db"

export async function addMortality(m) {
  const db = await openDB()
  const tx = db.transaction("mortality", "readwrite")
  tx.objectStore("mortality").put(m)
}

export async function getMortalityByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    db.transaction("mortality")
      .objectStore("mortality")
      .getAll().onsuccess = e =>
        res(e.target.result.filter(m => m.cycleId === cycleId))
  })
}
