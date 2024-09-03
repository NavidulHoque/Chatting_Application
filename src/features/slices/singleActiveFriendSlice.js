import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeFriend: JSON.parse(localStorage.getItem("activeFriendOfChatApp")) || null
}

const singleActiveFriendSlice = createSlice({
    name: "activeFriend",
    initialState,
    reducers: {

        makeFriendActive: (state, action) => {
            state.activeFriend = action.payload
            localStorage.setItem("activeFriendOfChatApp", JSON.stringify(state.activeFriend))
        },

        removeActiveFriend: (state) => {
            state.activeFriend = null
            localStorage.setItem("activeFriendOfChatApp", JSON.stringify(state.activeFriend))
        }

    }
})

export const { makeFriendActive, removeActiveFriend } = singleActiveFriendSlice.actions
export default singleActiveFriendSlice.reducer