import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friends: []
}

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {

        storeFriends: (state, action) => {
            state.friends = action.payload
        },

    }
})

export const { storeFriends } = friendsSlice.actions
export default friendsSlice.reducer