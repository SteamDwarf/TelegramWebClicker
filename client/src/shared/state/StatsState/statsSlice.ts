import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppData } from "shared/types";
import { StatUpdateAction } from "./types";

type StatsState = IAppData;

export const initialState:StatsState = {
    wood: 0,
    food: 0,
    villagers: 6,
    coins: 50
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        updateStat: (state:StatsState, action: PayloadAction<StatUpdateAction>) => {
            state[action.payload.stat] = action.payload.value;
        },
        increaseStat: (state: StatsState, action: PayloadAction<StatUpdateAction>) => {
            state[action.payload.stat] = state[action.payload.stat] + action.payload.value;
        }
    }
});

export const {
    updateStat,
    increaseStat
} = statsSlice.actions;
