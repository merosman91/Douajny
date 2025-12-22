import { formatCurrency } from "../utils/reportHelpers"

export default function ReportSummary({ analytics }) {
  return (
    <div>
      <p>عدد الطيور الحية: {analytics.liveBirds}</p>
      <p>FCR: {analytics.fcr}</p>
      <p>تكلفة الطائر: {formatCurrency(analytics.costPerBird)}</p>
      <p>تكلفة الكيلو: {formatCurrency(analytics.costPerKg)}</p>
      <p>صافي الربح: {formatCurrency(analytics.profit)}</p>
    </div>
  )
}
