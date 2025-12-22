import { openDB } from "./db"
import { consumeItem } from "./inventory"

export async function addTreatment(t) {
  const db = await openDB()
  const tx = db.transaction("treatments", "readwrite")
  tx.objectStore("treatments").put(t)

  // خصم من المخزون
  await consumeItem(t.inventoryId, t.usedQty)
}
