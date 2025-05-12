import HomePage from "@/pages/HomePage/HomePage";
import { getAllEvents } from "@/service/Events";
import { use } from "react";

const Home = () => {

const {data} = use(getAllEvents())
const events = data?.all

  return (
    <>
      <main className="min-h-[calc(100vh-200px)]">
        <HomePage events={events} />
      </main>
    </>
  );
};

export default Home;
