"use client";
import { useGetUserProjectsWithEmailsGroupedByDate } from '@/hook/query';
import { userInfoState } from '@/lib/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '@/components/Loader';

const Page = () => {
  const user = useRecoilValue(userInfoState);

  const {
    data: projectsWithEmailsGroupedByDate,
    isLoading,
    isError,
  } = useGetUserProjectsWithEmailsGroupedByDate(user?.id);

  console.log(projectsWithEmailsGroupedByDate, user);

  if (isLoading) {
    return <div className="w-full flex justify-center h-36  items-center"><Loader /></div>;
  }

  if (isError || !projectsWithEmailsGroupedByDate) {
    return <div>Error loading data</div>;
  }

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
  const currentYear = currentDate.getFullYear();

  // Filter dates to include only the current month
  const filteredDatesSet = new Set<string>();
  projectsWithEmailsGroupedByDate.forEach((project: any) => {
    Object.keys(project.emailCountsByDate).forEach((date) => {
      const [year, month] = date.split('-').map(Number);
      if (year === currentYear && month === currentMonth) {
        filteredDatesSet.add(date);
      }
    });
  });

  const sortedDates = Array.from(filteredDatesSet).sort();

  // Define a list of colors
  const colors = ['#32CD32', '#1E90FF', '#FFD700', '#FF69B4', '#8A2BE2'];

  return (
    <div className="w-full md:px-0 px-4">
      <h1 className="py-4 text-2xl wb-gradient text-balance  md:text-4xl md:px-0 px-8">Emails Per Project for Current Month</h1>
      {projectsWithEmailsGroupedByDate.map((project: any, index: number) => {
        const data = sortedDates.map((date) => ({
          date,
          emails: project.emailCountsByDate[date] || 0,
        }));

        // Assign a color based on the project index
        const color = colors[index % colors.length];

        return (
          <div key={index} className="px-8 md:px-0">
            <h2 className='py-4'>{project.projectName}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" label={{ value: 'Dates', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Number of Emails', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emails"
                  stroke={color} // Assign the color here
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
