import { createSelector } from "@reduxjs/toolkit";
import { selectAppState } from "../selectors";
import { AppState } from "../types";

export const selectAchievements = createSelector(
    selectAppState,
    (state:AppState) => state.achievements
)