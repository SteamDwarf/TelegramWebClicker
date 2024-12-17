import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AchievementsMetadata } from "./types";

interface AchievementsState {
    achievementsString: string;
    achievementsMetadata: AchievementsMetadata[];
}

const initialState: AchievementsState = {
    achievementsString: '',
    achievementsMetadata: []
}

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        setAchievementsMetadata: (state: AchievementsState, action: PayloadAction<AchievementsMetadata[]>) => {
            state.achievementsMetadata = action.payload;
        },

        addAchievement: (state: AchievementsState, action: PayloadAction<string>) => {
            state.achievementsString += `__${action.payload}__`;
        }
    }
});

export const {
    setAchievementsMetadata,
    addAchievement
} = achievementsSlice.actions;