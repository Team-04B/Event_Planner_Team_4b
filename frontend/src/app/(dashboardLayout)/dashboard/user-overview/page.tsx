import AnalyticsDashboard from "@/components/modules/dashboard/overview";

const UserOverivewPage = () => {
  const totalEvents = 100;
  const totalAttendance = 1000;
  const totalRevenu = 10000;
  return (
    <div>
      <AnalyticsDashboard
        totalAttendance={totalAttendance}
        totalEvnets={totalEvents}
        totalRevenu={totalRevenu}
      />{" "}
    </div>
  );
};

export default UserOverivewPage;
