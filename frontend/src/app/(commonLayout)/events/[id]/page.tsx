/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleEvent from "@/components/EventsModules/SingleEvent/SingleEvent";
import { getCurrentUser } from "@/service/AuthService";
import { getEventById } from "@/service/Events";
import { notFound } from "next/navigation";


const page = async ({ params}: {params:any}) => {
  const eventData = await getEventById(params?.id);
  const event = eventData?.data;

  if (!event) {
    notFound();
  }

  const currentUser = await getCurrentUser();

  return (
    <div>
      <SingleEvent event={event} currentUser={currentUser} />
    </div>
  );
}

export default page
