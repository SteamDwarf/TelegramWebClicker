import { useCallback, useEffect } from "react";
import { useStats, useStatsActions } from "shared/state";

interface GameLifeCycleSettings {
    eatFoodInterval: number;
}

export const useGameLifeCycle = (settings: GameLifeCycleSettings) => {
    const {villagers} = useStats();
    const { increaseStat } = useStatsActions();

    const eatFood = useCallback(() => {
        const eatenFood = -villagers;

        increaseStat({stat: 'food', value: eatenFood})
    }, [villagers])

    useEffect(() => {
        const eatFoodInterval = setInterval(eatFood, settings.eatFoodInterval);

        return () => {
            clearInterval(eatFoodInterval);
        }
    }, [eatFood])
}