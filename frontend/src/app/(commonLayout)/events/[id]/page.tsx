import SingleEvent from "@/components/EventsModules/SingleEvent/SingleEvent"
import { getCurrentUser } from "@/service/AuthService"
import { getEventById } from "@/service/Events"
import { notFound } from "next/navigation"

const page = async({ params }: { params: { id: string } }) => {
  let event =await getEventById(params.id)
  event = event?.data
  if (!event) {
    notFound()
  }
  const currentUser =await getCurrentUser()

  return (
    <div>
    <SingleEvent event={event} currentUser={currentUser}/>
    </div>
  )
}

export default page