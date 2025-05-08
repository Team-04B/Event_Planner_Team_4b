import { TReactChildrenType } from "@/commonTypes/commonTypes";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import HomePage from "@/pages/HomePage/HomePage";

const Home = () => {
  return (
    <>
      <main className="min-h-[calc(100vh-200px)]">
        <HomePage />
      </main>
    </>
  );
};

export default Home;
