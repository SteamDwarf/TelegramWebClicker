import { useJettons } from "shared/hooks";
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectStats } from "./selectors"
import { bornVillager, eatFood, increaseStat, resetStat, updateStat } from "./statsSlice";
import { StatUpdateAction } from "./types";

export const useStats = () => {
    return useAppSelector(selectStats);
}

export const useStatsActions = () => {
    const dispatch = useAppDispatch();

    return {
        updateStat: (data: StatUpdateAction) => dispatch(updateStat(data)),
        increaseStat: (data: StatUpdateAction) => dispatch(increaseStat(data)),
        resetStat: () => dispatch(resetStat()),
        eatFood: () => dispatch(eatFood()),
        bornVillager: () => dispatch(bornVillager()),
    }
}