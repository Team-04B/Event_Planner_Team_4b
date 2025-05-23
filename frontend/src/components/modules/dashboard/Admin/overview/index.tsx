import React from "react";

const AdminOverview = ({
  totalUser,
  totalEvents,
}: {
  totalEvents: number;
  totalUser: number;
  totalRevenue?: number;
  totalPayments?: number;
}) => {
  return (
    <div>
      <div className={`min-h-screen bg-gray-100 p-8`}>
        <header className={`bg-white shadow-lg rounded-lg p-6 mb-8`}>
          <h1 className={`text-3xl font-bold text-gray-800`}>
            Admin Dashboard
          </h1>
          <p className={`text-gray-600`}>Welcome back, Admin!</p>
        </header>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
          <div className={`bg-white shadow-lg rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold text-gray-700`}>
              Total Users
            </h2>
            <p className={`text-2xl font-bold text-blue-600 mt-2`}>
              {totalUser || 0}
            </p>
            <p className={`text-gray-500`}>Last 30 days</p>
          </div>

          <div className={`bg-white shadow-lg rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold text-gray-700`}>
              Total Events
            </h2>
            <p className={`text-2xl font-bold text-green-600 mt-2`}>
              {totalEvents || 0}
            </p>
            <p className={`text-gray-500`}>Last 30 days</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold text-gray-700`}>
              Total Revenue
            </h2>
            <p className={`text-2xl font-bold text-green-600 mt-2`}>
              {totalEvents || 0}
            </p>
            <p className={`text-gray-500`}>Last 30 days</p>
          </div>
        </div>

        <div className={`mt-8 bg-white shadow-lg rounded-lg p-6`}>
          <h2 className={`text-xl font-semibold text-gray-700`}>Overview</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
