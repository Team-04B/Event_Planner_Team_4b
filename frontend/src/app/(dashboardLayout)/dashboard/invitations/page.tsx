import InvitationsPage from "@/pages/InvitationPage/InvitationsPage"
import { getAllUser } from "@/service/user"


const page =async () => {
 const allusers = await getAllUser()
//  console.log(allusers)
  return (
    <div>
    <InvitationsPage allusers={allusers} />
    </div>
  )
}

export default page