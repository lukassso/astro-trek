import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import type { ChartComponentProps } from "@/features/nbp-currency-explorer/types";

const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    // Create a new chart instance
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.effectiveDate),
        datasets: [
          {
            label: "Exchange Rate",
            data: data.map((entry) => entry.mid),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to resize properly
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [data]);

  return (
    <div className="relative h-64 w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
