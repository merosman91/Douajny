import { openDB } from "./db"

export async function addSale(s) {
  const db = await openDB()
  db.transaction("sales", "readwrite")
    .objectStore("sales")
    .put(s)
}

// ✅ أضف هذه الدالة المطلوبة من Dashboard.jsx
export async function getSalesByCycle(cycleId) {
  const db = await openDB()
  const transaction = db.transaction("sales", "readonly")
  const store = transaction.objectStore("sales")
  const allSales = await store.getAll()
  
  // تصفية المبيعات حسب cycleId
  return allSales.filter(sale => sale.cycleId === cycleId)
    }
