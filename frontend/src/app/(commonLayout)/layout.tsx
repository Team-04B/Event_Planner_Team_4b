import { TReactChildrenType } from "@/commonTypes/commonTypes";
import { SiteFooter } from "@/components/sections/site-footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({children}:TReactChildrenType) => {
    return (
        <>
       <header>
       <Navbar/>
       </header>
            {children}
            <footer>
            {/* <Footer/> */}
      <SiteFooter />
            
        </footer>   
        </>
    )
}

export default CommonLayout;