import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

export default function Waterusageoverview({ usageData }) {
  const todayIndex = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  const defaultData = [120, 135, 110, 160, 140, 90, 100];

  // Normalize usageData: support array or object, fallback to defaultData
  let normalizedUsage = defaultData.slice();

  if (Array.isArray(usageData)) {
    normalizedUsage = usageData.map((val, i) => (val != null ? val : defaultData[i]));
  } else if (usageData && typeof usageData === 'object') {
    normalizedUsage = defaultData.map((_, i) => (usageData[i] != null ? usageData[i] : defaultData[i]));
  }

  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Water Usage (Liters)',
        data: normalizedUsage,
        borderColor: '#6366F1', // indigo-500
        backgroundColor: 'rgba(99, 102, 241, 0.3)', // indigo-500 semi-transparent
        fill: true,
        tension: 0.3,
        pointBackgroundColor: normalizedUsage.map((_, i) =>
          i === todayIndex ? '#10B981' : '#6366F1' // emerald for today, indigo others
        ),
        pointRadius: normalizedUsage.map((_, i) => (i === todayIndex ? 7 : 4)),
        pointHoverRadius: 8,
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#4B5563', // gray-600
          font: { size: 14, weight: '600' },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: ctx => `${ctx.parsed.y} Liters`,
        },
        backgroundColor: '#4F46E5', // indigo-700
        titleColor: '#FFFFFF',
        bodyColor: '#F9FAFB', // gray-50
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          color: '#374151', // gray-700
          font: { size: 14, weight: '500' },
        },
        grid: {
          color: '#E5E7EB', // gray-200
          borderColor: '#D1D5DB', // gray-300
        },
      },
      x: {
        ticks: {
          color: '#374151', // gray-700
          font: { size: 14, weight: '500' },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 700,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <section
      aria-label="Weekly Water Usage Line Chart"
      className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 tracking-wide">
        📈 Weekly Water Usage
      </h2>
      <Line data={chartData} options={chartOptions} />
    </section>
  );
}
