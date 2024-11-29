import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppData } from "shared/types";
import { StatUpdateAction } from "./types";
import { INITIAL_STATS } from "./constants";

type StatsState = IAppData;

export const initialState:StatsState = INITIAL_STATS;

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        updateStat: (state:StatsState, action: PayloadAction<StatUpdateAction>) => {
            state[action.payload.stat] = action.payload.value;
        },
        increaseStat: (state: StatsState, action: PayloadAction<StatUpdateAction>) => {
            state[action.payload.stat] = state[action.payload.stat] + action.payload.value;
        },
        resetStat: (state: StatsState) => {
            state.coins = initialState.coins;
            state.food = initialState.food;
            state.wood = initialState.wood;
            state.villagers = initialState.villagers;
        },
        eatFood: (state: StatsState) => {
            state.food = state.food - state.villagers;
        },
        bornVillager: (state: StatsState) => {
            const chance = Math.random();

            if(chance <= 1) state.villagers += Math.floor(state.villagers / 2)
        }
    }
});

export const {
    updateStat,
    increaseStat,
    resetStat,
    eatFood,
    bornVillager
} = statsSlice.actions;
