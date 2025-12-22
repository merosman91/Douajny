export default function Alerts({ analytics }) {
  const alerts = []

  if (analytics.fcr > 2)
    alerts.push("⚠️ معامل التحويل الغذائي مرتفع")

  if (analytics.profit < 0)
    alerts.push("❌ الدورة خاسرة")

  if (analytics.liveBirds < 100)
    alerts.push("⚠️ عدد الطيور المتبقية منخفض")

  return (
    <div>
      {alerts.map((a, i) => (
        <div key={i} style={{ color: "red" }}>{a}</div>
      ))}
    </div>
  )
}
