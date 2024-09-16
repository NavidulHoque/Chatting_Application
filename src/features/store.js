import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import friendsSlice from "./slices/friendsSlice";
import singleActiveFriendSlice from "./slices/singleActiveFriendSlice";
import blockersSlice from "./slices/blockersSlice";
import blockeesSlice from "./slices/blockeesSlice";

export const store = configureStore({
    reducer: {
        UserLogin: userLoginSlice,
        friends: friendsSlice,
        activeFriend: singleActiveFriendSlice,
        blockers: blockersSlice,
        blockees: blockeesSlice
    }
})