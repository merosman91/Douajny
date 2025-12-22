import { openDB } from "./db"

export async function addMortality(mortality) {
  const db = await openDB()
  const tx = db.transaction("mortality", "readwrite")
  tx.objectStore("mortality").put(mortality)
}

export async function getMortalityByCycle(cycleId) {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("mortality", "readonly")
    const req = tx.objectStore("mortality").getAll()
    req.onsuccess = () =>
      res(req.result.filter(e => e.cycleId === cycleId))
  })
}
