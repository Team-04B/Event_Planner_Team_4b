import AdminOverview from "@/components/modules/dashboard/Admin/overview";
import { getAllEvents } from "@/service/Events";
import { getDashboardOverview } from "@/service/payment";
import { getAllUser } from "@/service/user";

const AdminOverviewPage = async () => {
  const { meta } = await getAllUser({ undefined });
  const { meta: metaData } = await getAllEvents();
  const overview = await getDashboardOverview();

  if (!overview) {
    return <div>Failed to load dashboard data</div>;
  }

  console.log(overview);

  // console.log(meta);
  const totalEvents = metaData?.total;
  const totalUser = meta?.total;
  const { totalRevenue, totalPayments } = overview.data || {};

  return (
    <div>
      <AdminOverview
        totalEvents={totalEvents}
        totalUser={totalUser}
        totalRevenue={totalRevenue}
        totalPayments={totalPayments}
      />
    </div>
  );
};

export default AdminOverviewPage;
