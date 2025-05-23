"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import React from "react";

const eventDistribution = [
  { name: "Public Free", value: 10 },
  { name: "Public Paid", value: 20 },
  { name: "Private Free", value: 5 },
  { name: "Private Paid", value: 15 },
];

const newUsers = [
  { month: "Jan", users: 20 },
  { month: "Feb", users: 35 },
  { month: "Mar", users: 50 },
  { month: "Apr", users: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color: string;
}) => (
  <div
    className={`bg-white shadow-lg rounded-lg p-6 border-l-4 border-${color}-500`}
  >
    <h2 className="text-md font-semibold text-gray-600">{title}</h2>
    <p className={`text-2xl font-bold text-${color}-600 mt-2`}>{value}</p>
    <p className="text-gray-400 text-sm">Last 30 days</p>
  </div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
    {children}
  </div>
);

const AdminOverview = ({
  totalUser,
  totalEvents,
  totalRevenue,
  totalPayments,
  monthlyRevenue,
}: {
  totalUser: number;
  totalEvents: number;
  totalRevenue?: number;
  totalPayments?: number;
  monthlyRevenue: { month: string; revenue: number }[];
}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin!</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Users" value={totalUser} color="blue" />
        <SummaryCard title="Total Events" value={totalEvents} color="green" />
        <SummaryCard
          title="Total Revenue"
          value={`$${totalRevenue?.toFixed(2) || 0}`}
          color="purple"
        />
        <SummaryCard
          title="Total Payments"
          value={totalPayments || 0}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="New User Growth">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={newUsers}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Event Type Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={eventDistribution}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {eventDistribution.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Activities
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="border-b p-2">Type</th>
              <th className="border-b p-2">User</th>
              <th className="border-b p-2">Date</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-2">New Event</td>
              <td className="p-2">Rifat Sarker</td>
              <td className="p-2">May 20, 2025</td>
              <td className="p-2">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
