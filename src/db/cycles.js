import { openDB } from "./db"

export const getCycles = async () => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("cycles", "readonly")
    const store = tx.objectStore("cycles")
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
  })
}

export const addCycle = async cycle => {
  const db = await openDB()
  const tx = db.transaction("cycles", "readwrite")
  tx.objectStore("cycles").add(cycle)
}

export const setActiveCycle = async id => {
  const db = await openDB()
  const tx = db.transaction("cycles", "readwrite")
  const store = tx.objectStore("cycles")

  store.getAll().onsuccess = e => {
    e.target.result.forEach(cycle => {
      cycle.active = cycle.id === id
      store.put(cycle)
    })
  }
}

export const getActiveCycle = async () => {
  const db = await openDB()
  return new Promise(resolve => {
    const tx = db.transaction("cycles", "readonly")
    const store = tx.objectStore("cycles")
    const index = store.index("active")
    index.get(true).onsuccess = e => resolve(e.target.result)
  })
}
