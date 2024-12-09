import { combineReducers } from "@reduxjs/toolkit";
import { statsSlice } from "./StatsState/statsSlice";
import { tonApiSlice } from "shared/api";

export const reducer = combineReducers({
    [statsSlice.name]: statsSlice.reducer,
    [tonApiSlice.reducerPath]: tonApiSlice.reducer
});