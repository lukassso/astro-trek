import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Chart from "chart.js/auto";

const mockData = [
  { sessionId: 1, device: "mobile", converted: true },
  { sessionId: 2, device: "desktop", converted: false },
  { sessionId: 3, device: "mobile", converted: true },
  { sessionId: 4, device: "mobile", converted: false },
  { sessionId: 5, device: "desktop", converted: true },
  { sessionId: 6, device: "desktop", converted: false },
];

export default function ConversionDashboard() {
  const [deviceFilter, setDeviceFilter] = useState("all");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const filteredData =
    deviceFilter === "all"
      ? mockData
      : mockData.filter((s) => s.device === deviceFilter);

  const conversions = filteredData.filter((s) => s.converted).length;
  const total = filteredData.length;
  const conversionRate = total > 0 ? (conversions / total) * 100 : 0;

  const exportCSV = () => {
    const csv = filteredData
      .map((row) => `${row.sessionId},${row.device},${row.converted}`)
      .join("\n");
    const blob = new Blob([`sessionId,device,converted\n${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "conversion-data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: ["Conversions", "Non-conversions"],
        datasets: [
          {
            label: "Sessions",
            data: [conversions, total - conversions],
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [deviceFilter]);

  return (
    <div className="p-6 grid gap-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4 grid gap-2">
          <h2 className="text-xl font-semibold">Conversion Dashboard</h2>
          <div className="flex gap-2 items-center">
            <label htmlFor="device">Filter by device:</label>
            <select
              id="device"
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="all">All</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
            </select>
          </div>
          <div className="text-sm">Conversion Rate: {conversionRate.toFixed(2)}%</div>
          <Button onClick={exportCSV} className="w-fit mt-2 gap-2">
            <Download size={16} /> Export CSV
          </Button>
          <div className="w-full h-64 mt-4">
            <canvas ref={chartRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
