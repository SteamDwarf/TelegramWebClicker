import { createSelector } from "@reduxjs/toolkit";
import { selectAppState } from "../selectors";
import { AppState } from "../types";

export const selectStats = createSelector(
    selectAppState,
    (state:AppState) => state.stats
)