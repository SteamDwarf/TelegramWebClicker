import { combineReducers } from "@reduxjs/toolkit";
import { statsSlice } from "./StatsState/statsSlice";

export const reducer = combineReducers({
    [statsSlice.name]: statsSlice.reducer
});