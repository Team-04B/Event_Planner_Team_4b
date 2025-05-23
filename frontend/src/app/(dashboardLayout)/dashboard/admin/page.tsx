// app/(admin)/dashboard/page.tsx

import AdminOverview from "@/components/modules/dashboard/Admin/overview";
import { getAllEvents } from "@/service/Events";
import { getDashboardOverview } from "@/service/payment";
import { getEventDistribution, getRecentActivities } from "@/service/RecentActivity";
import { getAllUser } from "@/service/user";

const AdminOverviewPage = async () => {
  const { meta: userMeta } = await getAllUser({});
  const { meta: eventMeta } = await getAllEvents();
  const paymentOverview = await getDashboardOverview();
  const recentActivities = await getRecentActivities(5); // fetch last 5 activities
  const eventDistribution = await getEventDistribution();

  if (!paymentOverview || !paymentOverview.data) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        ⚠ Failed to load dashboard data
      </div>
    );
  }

  const totalUser = userMeta?.total || 0;
  const totalEvents = eventMeta?.total || 0;
  const {
    totalRevenue = 0,
    totalPayments = 0,
    monthlyRevenue = [],
    monthlyNewUsers = [],
  } = paymentOverview.data;

  console.log(monthlyNewUsers);
  return (
    <div>
      <AdminOverview
        totalUser={totalUser}
        totalEvents={totalEvents}
        totalRevenue={totalRevenue}
        totalPayments={totalPayments}
        monthlyRevenue={monthlyRevenue}
        monthlyNewUsers={monthlyNewUsers}
        recentActivities={recentActivities} 
        eventDistribution={eventDistribution}
      />
    </div>
  );
};

export default AdminOverviewPage;
