import AdminOverview from "@/components/modules/dashboard/Admin/overview";
import { getAllUser } from "@/service/user";

const AdminOverviewPage = async () => {
  const { data, meta } = await getAllUser({ undefined });
  console.log(meta);
  const totalEvents = 100;
  const totalUser = meta?.total;
  return (
    <div>
      <AdminOverview totalEvents={totalEvents} totalUser={totalUser} />
    </div>
  );
};

export default AdminOverviewPage;
