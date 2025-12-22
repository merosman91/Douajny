export function sum(arr, field) {
  return arr.reduce((s, i) => s + (i[field] || 0), 0)
}

export function formatCurrency(val) {
  return `${Number(val).toLocaleString()} SDG`
}
