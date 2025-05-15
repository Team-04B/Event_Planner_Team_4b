import NewInvitationPage from "@/pages/NewInvitaion/NewInvitationPage";
import { getAllEventsByUserId } from "@/service/Events";
import { getAllUser } from "@/service/user";

const page = async () => {
  const allusers = await getAllUser({ undefined });
  const allEvents = await getAllEventsByUserId();
  const userDatas = allusers?.data;
  console.log(userDatas, "user data");
  const allEventData = allEvents?.data.all;
  console.log(allEventData);
  return (
    <>
      <NewInvitationPage userDatas={userDatas} allEventData={allEventData} />
    </>
  );
};

export default page;
