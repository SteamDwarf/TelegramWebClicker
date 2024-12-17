import { useAppDispatch, useAppSelector } from "../hooks"
import { addAchievement, setAchievementsMetadata } from "./achievementsSlice";
import { selectAchievements } from "./selectors"
import { AchievementsMetadata } from "./types";

export const useAchievements = () => {
    const data = useAppSelector(selectAchievements);
    const hasAchievement = (id: number) => data.achievementsString.includes(`__${id}__`);

    return {
        ...data,
        hasAchievement
    };
}

export const useAchievementsActions = () => {
    const dispatch = useAppDispatch();

    return {
        setAchievementsMetadata: (data: AchievementsMetadata[]) => dispatch(setAchievementsMetadata(data)),
        addAchievement: (achievement: string) => dispatch(addAchievement(achievement))
    }
}