"use client";

export default function AnalyticsDashboard({
  totalEvnets,
  totalAttendance,
  totalRevenu,
}: {
  totalEvnets: number;
  totalAttendance: number;
  totalRevenu: number;
}) {
  return (
    <div>
      <div className={`min-h-screen bg-gray-100 p-8`}>
        <header className={`bg-white shadow-lg rounded-lg p-6 mb-8`}>
          <h1 className={`text-3xl font-bold text-gray-800`}>User Dashboard</h1>
          <p className={`text-gray-600`}>Welcome back, User!</p>
        </header>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
          <div className={`bg-white shadow-lg rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold text-gray-700`}>
              Total Sales Revenue
            </h2>
            <p className={`text-2xl font-bold text-blue-600 mt-2`}>
              ${totalRevenu || 0}
            </p>
            <p className={`text-gray-500`}>Last 30 days</p>
          </div>

          <div className={`bg-white shadow-lg rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold text-gray-700`}>
              Total Events
            </h2>
            <p className={`text-2xl font-bold text-green-600 mt-2`}>
              {totalEvnets || 0}
            </p>
            <p className={`text-gray-500`}>Last 30 days</p>
          </div>

          <div className={`bg-white shadow-lg rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold text-gray-700`}>
              Total Attendance
            </h2>
            <p className={`text-2xl font-bold text-green-600 mt-2`}>
              {totalAttendance || 0}
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
}
