import { TReactChildrenType } from "@/commonTypes/commonTypes";
import Navbar from "@/components/shared/Navbar";
import { Footer } from "react-day-picker";

const CommonLayout = ({children}:TReactChildrenType) => {
    return (
        <>
       <header>
       <Navbar/>
       </header>
            {children}
            <footer>
            {/* <Footer/> */}
        </footer>   
        </>
    )
}

export default CommonLayout;