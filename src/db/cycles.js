import { openDB } from "./db"

export async function getCycles() {
  const db = await openDB()
  return new Promise(res => {
    const tx = db.transaction("cycles", "readonly")
    const req = tx.objectStore("cycles").getAll()
    req.onsuccess = () => res(req.result)
  })
}

export async function addCycle(cycle) {
  const db = await openDB()
  const tx = db.transaction("cycles", "readwrite")
  tx.objectStore("cycles").put({ ...cycle, active: false })
}

export async function setActiveCycle(id) {
  const cycles = await getCycles()
  const db = await openDB()
  const tx = db.transaction("cycles", "readwrite")
  const store = tx.objectStore("cycles")

  cycles.forEach(c =>
    store.put({ ...c, active: c.id === id })
  )
}

export async function getActiveCycle() {
  const cycles = await getCycles()
  return cycles.find(c => c.active)
}

export async function resetCycle(cycleId) {
  const db = await openDB()
  const stores = ["inventory", "expenses", "sales", "mortality"]

  stores.forEach(name => {
    const tx = db.transaction(name, "readwrite")
    const store = tx.objectStore(name)
    store.getAll().onsuccess = e => {
      e.target.result
        .filter(i => i.cycleId === cycleId)
        .forEach(i => store.delete(i.id))
    }
  })
}
