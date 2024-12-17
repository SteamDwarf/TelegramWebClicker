import { combineReducers } from "@reduxjs/toolkit";
import { statsSlice } from "./StatsState/statsSlice";
import { tonApiSlice } from "shared/api";
import { achievementsSlice } from "./AchievementsState/achievementsSlice";
import { notificationSlice } from "./NotificationState/notificationSlice";

export const reducer = combineReducers({
    [statsSlice.name]: statsSlice.reducer,
    [tonApiSlice.reducerPath]: tonApiSlice.reducer,
    [achievementsSlice.name]: achievementsSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer
});