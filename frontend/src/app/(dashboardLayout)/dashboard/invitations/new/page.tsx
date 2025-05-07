import NewInvitationPage from "@/pages/NewInvitaion/NewInvitationPage"
import { getAllUser } from "@/service/user"

const page = async() => {
 const allusers = await getAllUser()
   const userDatas = allusers?.data
  return (
   <>
   <NewInvitationPage userDatas={userDatas}/>
   </>
  )
}

export default page