import { createSlice } from "@reduxjs/toolkit"

let userData = {
    id:'',
    email:'',
    role:'',
}

const userSlice = createSlice({
    initialState:userData,
    name:'userInfo',
    reducers: { 
        addUserInfo: (action,payload) => {
            userData = {...payload}
        }
    }
})

export default userSlice.reducer

export const {addUserInfo} = userSlice.actions