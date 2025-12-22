import { openDB } from "./db"
import { consumeItem } from "./inventory"

export async function addVaccination(v) {
  const db = await openDB()
  const tx = db.transaction("vaccinations", "readwrite")
  tx.objectStore("vaccinations").put(v)
  await consumeItem(v.inventoryId, v.usedQty)
}
