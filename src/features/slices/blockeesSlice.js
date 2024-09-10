import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blockees: []
}

const blockeesSlice = createSlice({
    name: "blockees",
    initialState,
    reducers: {

        storeBlockees: (state, action) => {
            state.blockees = action.payload
        },

    }
})

export const { storeBlockees } = blockeesSlice.actions
export default blockeesSlice.reducer