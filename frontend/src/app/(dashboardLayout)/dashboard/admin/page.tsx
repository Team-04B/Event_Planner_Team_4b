import AdminOverview from "@/components/modules/dashboard/Admin/overview";
import { getAllEvents } from "@/service/Events";
import { getAllUser } from "@/service/user";

const AdminOverviewPage = async () => {
  const { meta } = await getAllUser({ undefined });
  const { meta: metaData } = await getAllEvents();
  console.log(meta);
  const totalEvents = metaData?.total;
  const totalUser = meta?.total;
  return (
    <div>
      <AdminOverview totalEvents={totalEvents} totalUser={totalUser} />
    </div>
  );
};

export default AdminOverviewPage;
