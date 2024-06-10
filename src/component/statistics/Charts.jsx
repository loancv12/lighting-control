import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ labels, naturals, afterSLs, type }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Biểu đồ ${type}`,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: `${type} tự nhiên`,
        data: naturals,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: `${type} sau khi bổ sung`,
        data: afterSLs,
        borderColor: "rgb(53, 162, 5)",
        backgroundColor: "rgba(53, 162, 5, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default Charts;
