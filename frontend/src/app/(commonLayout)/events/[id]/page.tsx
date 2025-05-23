/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleEvent from "@/components/EventsModules/SingleEvent/SingleEvent";
import { getEventById } from "@/service/Events";


const page = async ({ params}: {params:any}) => {
const {id} = await params

//    if(!id && !currentUser){
//       <div className="min-h-screen flex justify-center items-center">
//        <p className=" text-center">Loading.....</p>
//       </div>
//        }
  const eventData = await getEventById(id);
  const event = eventData?.data;

  

  return (
    <div>
      <SingleEvent event={event} />
    </div>
  );
}

export default page
