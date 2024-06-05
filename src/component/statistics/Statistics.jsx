import React, { useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import { useGetPpfdsQuery } from "../../redux/ppfd/ppfdApiSlice";
import { useGetConfigQuery } from "../../redux/config/configApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ PPFD",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: labels.map((i) => Math.random() * 100),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Statistics = () => {
  // const { data: ppfds } = useGetPpfdsQuery();
  const { data: config, isLoading, isFetching, isError } = useGetConfigQuery();
  console.log(config, isLoading, isFetching, isError);
  return <Line options={options} data={data} />;
};

export default Statistics;
