const DB_NAME = "douajny-db"
const DB_VERSION = 2

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = e => {
      const db = e.target.result

      if (!db.objectStoreNames.contains("cycles")) {
        const store = db.createObjectStore("cycles", {
          keyPath: "id",
          autoIncrement: true
        })
        store.createIndex("active", "active", { unique: false })
      }

      if (!db.objectStoreNames.contains("inventory")) {
        const store = db.createObjectStore("inventory", {
          keyPath: "id",
          autoIncrement: true
        })
        store.createIndex("cycleId", "cycleId", { unique: false })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject("DB Error")
  })
          }
