import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { tonApiSlice } from "shared/api";

export const store = configureStore({
    reducer: reducer,
    middleware: (getDfaultMiddleware) => getDfaultMiddleware().concat(tonApiSlice.middleware)
})