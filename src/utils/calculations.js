export const sum = arr =>
  arr.reduce((s, i) => s + (i.amount || i.total || 0), 0)

export const calcProfit = (sales, expenses) => {
  const income = sales.reduce((s, i) => s + i.total, 0)
  const cost = expenses.reduce((s, i) => s + i.amount, 0)
  return {
    income,
    cost,
    profit: income - cost
  }
}
