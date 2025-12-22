const DB_NAME = "douajnyDB"
const DB_VERSION = 1

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = e => {
      const db = e.target.result

      if (!db.objectStoreNames.contains("cycles"))
        db.createObjectStore("cycles", { keyPath: "id" })

      const stores = ["inventory", "expenses", "sales", "mortality"]
      stores.forEach(name => {
        if (!db.objectStoreNames.contains(name))
          db.createObjectStore(name, { keyPath: "id" })
      })
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject("DB error")
  })
}
