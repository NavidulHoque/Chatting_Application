import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blockers: []
}

const blockersSlice = createSlice({
    name: "blockers",
    initialState,
    reducers: {

        storeBlockers: (state, action) => {
            state.blockers = action.payload
        },

    }
})

export const { storeBlockers } = blockersSlice.actions
export default blockersSlice.reducer