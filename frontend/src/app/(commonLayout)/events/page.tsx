import AllEvents from "@/components/EventsModules/AllEvents/AllEvents"
import { getAllEventsByUserId } from "@/service/Events"

const page =async () => {
const {data:Allevents} =await getAllEventsByUserId()
const events = Allevents?.all
console.log(events)
  return (
    <div>
    <AllEvents events={events} />
    </div>
  )
}

export default page