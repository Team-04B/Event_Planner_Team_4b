import { getAllEventsByUserId } from "@/service/Events";

const MyEvents =async () => {



    const events = await getAllEventsByUserId()
    console.log(events)
    return (
        <div>
            <h1>My Events</h1>
        </div>
    );
};

export default MyEvents;