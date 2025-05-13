import AnalyticsDashboard from "@/components/modules/dashboard/overview";
import { getAllDataForDb } from "@/service/Events";

const UserOverivewPage =async () => {
  const {data}=await getAllDataForDb()

  const totalEvents =data?.totalEvents;
  const totalAttendance = data?.totalParticipants;
  const totalRevenu = data?.totalRevenue;
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
