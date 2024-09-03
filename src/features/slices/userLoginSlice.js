import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("userOfChatApp")) || null
}

const userLoginSlice = createSlice({
    name: "UserLogin",
    initialState,
    reducers:{
        LogIn: (state, action) => {
            state.user = action.payload
            localStorage.setItem("userOfChatApp", JSON.stringify(state.user))
        },

        LogOut: (state) => {
            state.user = null
            localStorage.setItem("userOfChatApp", JSON.stringify(state.user))
        }
    }
})

export const { LogIn, LogOut } = userLoginSlice.actions
export default userLoginSlice.reducer