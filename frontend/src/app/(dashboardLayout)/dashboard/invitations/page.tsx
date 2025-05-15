import InvitationsPage from "@/pages/InvitationPage/InvitationsPage";
import { getAllSentInvitaions } from "@/service/Invitations";



const page =async () => {
 const Invitations = await getAllSentInvitaions()
         const InvitationsData = Invitations?.data
  return (
    <div>
      <InvitationsPage InvitationsData={InvitationsData} />
    </div>
  );
};

export default page;
