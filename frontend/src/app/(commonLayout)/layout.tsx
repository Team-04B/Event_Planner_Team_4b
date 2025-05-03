import { TReactChildrenType } from "@/commonTypes/commonTypes";

const CommonLayout = ({children}:TReactChildrenType) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default CommonLayout;