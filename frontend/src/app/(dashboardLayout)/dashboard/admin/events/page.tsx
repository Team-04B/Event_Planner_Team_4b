import { EventManagementTable } from "@/components/modules/dashboard/Admin/event";
import { getAllEvents } from "@/service/Events";

const EventManagementPage = async () => {
  const { data } = await getAllEvents();
  return (
    <div>
      <EventManagementTable eventData={data} />
    </div>
  );
};

export default EventManagementPage;
