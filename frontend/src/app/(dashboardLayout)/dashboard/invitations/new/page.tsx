import NewInvitationPage from "@/pages/NewInvitaion/NewInvitationPage"
import { getAllEvents } from "@/service/Events"
import { getAllUser } from "@/service/user"

const page = async() => {
 const allusers = await getAllUser()
 const allEvents = await getAllEvents()
   const userDatas = allusers?.data
    const allEventData = allEvents?.data
    console.log(allEventData)
  return (
   <>
   <NewInvitationPage userDatas={userDatas} allEventData={allEventData}/>
   </>
  )
}

export default page