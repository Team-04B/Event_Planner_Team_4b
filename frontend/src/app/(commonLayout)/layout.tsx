import { TReactChildrenType } from "@/commonTypes/commonTypes";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({children}:TReactChildrenType) => {
    return (
        <>
       <header>
       <Navbar/>
       </header>
            {children}
            <footer>
            <Footer/>
        </footer>   
        </>
    )
}

export default CommonLayout;