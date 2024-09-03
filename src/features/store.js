import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import setTimeOutSlice from "./slices/setTimeOutSlice";
import friendsSlice from "./slices/friendsSlice";
import singleActiveFriendSlice from "./slices/singleActiveFriendSlice";

export const store = configureStore({
    reducer: {
        UserLogin: userLoginSlice,
        TimeOutID: setTimeOutSlice,
        friends: friendsSlice,
        activeFriend: singleActiveFriendSlice
    }
})