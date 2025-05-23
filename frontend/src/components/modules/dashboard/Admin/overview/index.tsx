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
import { Activity } from "@/types/activity";
import { EventDistributionItem } from "@/service/RecentActivity";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const borderColors = {
  blue: "border-blue-500",
  green: "border-green-500",
  purple: "border-purple-500",
  yellow: "border-yellow-500",
};

const textColors = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  yellow: "text-yellow-600",
};

const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number | string;
  color: keyof typeof borderColors;
}) => (
  <div
    className={`bg-white shadow-lg rounded-xl p-6 ${borderColors[color]} border-l-4`}
  >
    <h2 className="text-md font-semibold text-gray-600">{title}</h2>
    <p className={`${textColors[color]} text-2xl font-bold mt-2`}>{value}</p>
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
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
    {children}
  </div>
);

type MonthlyStat = {
  month: string;
  users?: number;
  revenue?: number;
  events?: number;
};

type Props = {
  totalEvents: number;
  totalUser: number;
  totalRevenue: number;
  totalPayments: number;
  monthlyNewUsers: MonthlyStat[];
  monthlyRevenue: MonthlyStat[];
  monthlyEvents: MonthlyStat[];
  recentActivities?: Activity[];
  eventDistribution: EventDistributionItem[];
};

const AdminOverview = ({
  totalUser,
  totalEvents,
  totalRevenue,
  totalPayments,
  monthlyNewUsers,
  monthlyRevenue,
  monthlyEvents,
  recentActivities = [],
  eventDistribution = [],
}: Props) => {
  const combinedMonthlyStats = monthlyEvents.map((event) => {
    const match = monthlyRevenue.find((r) => r.month === event.month);
    return {
      month: event.month,
      events: event.events ?? 0, // ✅ correct field
      revenue: match?.revenue ?? 0, // ✅ fallback to 0 if not matched
    };
  });

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
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly Events & Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedMonthlyStats}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="events" fill="#8884d8" />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <ChartCard title="New User Growth">
          <ResponsiveContainer
            style={{ borderRadius: "16px" }}
            width="100%"
            height={250}
          >
            <LineChart data={monthlyNewUsers}>
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

      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
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
            {recentActivities.length === 0 ? (
              <tr>
                <td className="p-2" colSpan={4}>
                  No recent activity found.
                </td>
              </tr>
            ) : (
              recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="p-2">{activity.type}</td>
                  <td className="p-2">{activity.user?.name ?? "Unknown"}</td>
                  <td className="p-2">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">{activity.action}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
