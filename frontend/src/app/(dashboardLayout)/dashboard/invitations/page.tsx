import InvitationsPage from "@/pages/InvitationPage/InvitationsPage"
import { getAllInvitaions } from "@/service/Invitations"



const page =async () => {
 const Invitations = await getAllInvitaions()
         const InvitationsData = Invitations?.data
         console.log(Invitations)
  return (
    <div>
    <InvitationsPage InvitationsData={InvitationsData} />
    </div>
  )
}

export default page