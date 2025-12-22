export function calculateAnalytics({
  inventory,
  expenses,
  sales,
  mortality,
  initialBirds
}) {
  const feedUsed = inventory
    .filter(i => i.type === "feed")
    .reduce((s, i) => s + (i.initialQty - i.quantity), 0)

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
  const totalSales = sales.reduce((s, s2) => s + s2.total, 0)

  const totalWeight = sales.reduce((s, s2) => s + s2.weightKg, 0)

  const deadBirds = mortality.reduce((s, m) => s + m.count, 0)
  const liveBirds = initialBirds - deadBirds

  const fcr = totalWeight > 0 ? feedUsed / totalWeight : 0
  const costPerBird = liveBirds > 0 ? totalExpenses / liveBirds : 0
  const costPerKg = totalWeight > 0 ? totalExpenses / totalWeight : 0
  const profit = totalSales - totalExpenses

  return {
    feedUsed,
    fcr: fcr.toFixed(2),
    costPerBird: costPerBird.toFixed(2),
    costPerKg: costPerKg.toFixed(2),
    profit: profit.toFixed(2),
    liveBirds
  }
}
