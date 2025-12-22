import { db } from "../db/db"

export async function autoBackup() {
  const data = {
    users: await db.users.toArray(),
    cycles: await db.cycles.toArray(),
    inventory: await db.inventory.toArray(),
    expenses: await db.expenses.toArray(),
    sales: await db.sales.toArray(),
    mortality: await db.mortality.toArray(),
    date: new Date()
  }

  localStorage.setItem("douajny_backup", JSON.stringify(data))
}
