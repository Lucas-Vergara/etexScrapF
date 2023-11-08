// chartUtils.ts
import Chart, { ChartConfiguration } from "chart.js/auto";

interface ChartData {
  labels: string[];
  data: number[];
  title: string;
}

export const createLineChart = (
  canvasId: string,
  chartData: ChartData
): Chart => {
  const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
  const config: ChartConfiguration = {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: chartData.title,
          data: chartData.data,
          borderColor: "rgb(119,221,119)",
          backgroundColor: "rgba(119,221,119,0.5)",
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            // callback: (value: number) => `$${value.toFixed(2)}`, // Agrega el símbolo "$" y mantiene los decimales
          },
        },
      },
    },
  };

  // Get the existing chart instance associated with the canvas
  const existingChart = Chart.getChart(ctx);

  // If there is an existing chart, destroy it
  if (existingChart) {
    existingChart.destroy();
  }

  // Create and return the new chart
  return new Chart(ctx, config);
};
