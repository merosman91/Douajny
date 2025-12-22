const DB_NAME = "douajny-db"
const DB_VERSION = 6  // زد الرقم عند التعديل

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (e) => {
      const db = e.target.result
      const transaction = e.target.transaction

      // جدول الدورات
      if (!db.objectStoreNames.contains("cycles")) {
        const store = db.createObjectStore("cycles", {
          keyPath: "id",
          autoIncrement: true
        })
        store.createIndex("active", "active", { unique: false })
        store.createIndex("startDate", "startDate", { unique: false })
      }

      // جميع الجداول المرتبطة بالدورات
      const cycleTables = [
        "inventory",
        "expenses", 
        "sales",
        "mortality",
        "treatments",
        "vaccinations"  // يمكن إضافة المزيد
      ]

      cycleTables.forEach(tableName => {
        if (!db.objectStoreNames.contains(tableName)) {
          const store = db.createObjectStore(tableName, {
            keyPath: "id",
            autoIncrement: true
          })
          // فهرس للربط مع الدورة
          store.createIndex("cycleId", "cycleId", { unique: false })
          // فهرس للتاريخ للاستعلامات الزمنية
          store.createIndex("date", "date", { unique: false })
        }
      })
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = (e) => {
      console.error("IndexedDB error:", e.target.error)
      reject("فشل فتح قاعدة البيانات")
    }
  })
          }
