import { createSelector } from "@reduxjs/toolkit";
import { selectAppState } from "../selectors";
import { AppState } from "../types";

export const selectNotifications = createSelector(
    selectAppState,
    (state:AppState) => state.notification
)