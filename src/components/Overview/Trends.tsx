import React, { useEffect, useState } from "react";
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
//   import faker from 'faker';
// import faker from "faker";
import Section from "../Layout/Section";
import { useChainMarketInfo } from "../../hooks/useChainMarketInfo";

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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: ["10", "20", "15", "30", "20", "25", "5"],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: ["100", "200", "150", "300", "200", "250", "50"],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Trends = () => {
  const { getHistoricalPrice } = useChainMarketInfo();
  const [finalData, setFinalData] = useState(data);
  // const [finalLabels, setFinalLabels] = useState(labels);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const cosmosTrend = await getHistoricalPrice("Cosmos");
    const strideTrend = await getHistoricalPrice("Stride");
    const neutronTrend = await getHistoricalPrice("Neutron");

    console.log(cosmosTrend, strideTrend, neutronTrend);
    const graphData = {
      labels: neutronTrend.labels,
      datasets: [cosmosTrend.data, strideTrend.data, neutronTrend.data],
    };
    setFinalData(graphData);
  };
  return (
    <Section>
      <Line data={finalData} options={options} />
    </Section>
  );
};

export default Trends;
