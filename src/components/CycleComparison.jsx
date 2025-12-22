import { Bar } from "react-chartjs-2"

export default function CycleComparison({ cycles }) {
  const data = {
    labels: cycles.map(c => c.name),
    datasets: [
      {
        label: "صافي الربح",
        data: cycles.map(c => c.profit),
        backgroundColor: "#4ade80"
      }
    ]
  }

  return <Bar data={data} />
}
