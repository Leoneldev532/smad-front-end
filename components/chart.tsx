import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Email } from "@/lib/type";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EmailsTodayChart = ({ emailsList }: { emailsList: Email[] | [] | undefined }) => {
  const today = new Date();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Count emails created at each hour of the day
  const emailCountsByHour = hours.map((hour) => {
    return emailsList?.filter((email) => {
      const emailDate = new Date(email.createdAt);
      return (
        emailDate.getFullYear() === today.getFullYear() &&
        emailDate.getMonth() === today.getMonth() &&
        emailDate.getDate() === today.getDate() &&
        emailDate.getHours() === hour
      );
    }).length || 0;
  });

  const data = {
    labels: hours.map((hour) => `${hour}:00`), // Labels for each hour
    datasets: [
      {
        label: "Emails Created Today",
        data: emailCountsByHour,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
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
        text: "Emails Created Today by Hour",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Emails",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EmailsTodayChart;
