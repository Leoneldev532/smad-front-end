import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Email, EmailsPerProjectChartProps } from "@/lib/type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const emailsPerProjectChart: React.FC<EmailsPerProjectChartProps> = ({
  projectsWithEmails,
}) => {
  const data = {
    labels: projectsWithEmails.map((project) => project.projectId),
    datasets: [
      {
        label: "Number of Emails",
        data: projectsWithEmails.map((project) => project.emails.length),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Emails per Project",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default emailsPerProjectChart;
