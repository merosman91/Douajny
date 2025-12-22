import { useActiveCycle } from "../hooks/useActiveCycle"

export default function Dashboard() {
  const { activeCycle, loading } = useActiveCycle()

  if (loading) return <p className="p-6">جاري التحميل...</p>

  if (!activeCycle)
    return (
      <div className="p-6 text-red-600">
        ⚠️ لا توجد دورة نشطة، يرجى تفعيل دورة
      </div>
    )

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">لوحة التحكم</h2>

      <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
        <p>
          <strong>الدورة النشطة:</strong> {activeCycle.name}
        </p>
        <p>
          <strong>تاريخ البدء:</strong> {activeCycle.startDate}
        </p>
      </div>

      {/* هنا ستأتي الإحصائيات لاحقًا */}
    </div>
  )
}
