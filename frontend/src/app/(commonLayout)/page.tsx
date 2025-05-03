import { TReactChildrenType } from "@/commonTypes/commonTypes";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const Home = ({children}:TReactChildrenType) => {
  return (
    <>
        <header>
           <Navbar/>
           <main className="min-h-[calc(100vh-200px)]">
            {children}
           </main>
        </header>
        <footer>
            <Footer/>
        </footer>   
    </>
  )
}

export default Home;
