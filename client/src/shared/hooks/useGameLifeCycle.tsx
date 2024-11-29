import { useCallback, useEffect, useState } from "react";
import { INITIAL_STATS, useStats, useStatsActions } from "shared/state";
import { useTelegramApp } from "./useTelegramApp";
import { useCloudeStorage } from "./useCloudeStorage";

interface GameLifeCycleSettings {
    eatFoodInterval: number;
    bornVillagerInterval: number;
}

export const useGameLifeCycle = (settings: GameLifeCycleSettings) => {
    const { showAlert } = useTelegramApp();
    const {saveData} = useCloudeStorage();
    const {villagers, food} = useStats();
    const { updateStat, eatFood, resetStat, bornVillager } = useStatsActions();
    const [gameIsActive, setGameIsActive] = useState(true);

    useEffect(() => {
        if(!gameIsActive) return;

        if(food < 0) {
            const restVillagers = villagers + food;

            if(restVillagers > 0) {
                updateStat({stat: 'villagers', value: restVillagers})
                updateStat({stat: 'food', value: 0});
            } else {
                setGameIsActive(false);
                showAlert('You have no food and your villagers have died', () => {
                    resetStat();
                    saveData(INITIAL_STATS);
                    setGameIsActive(true);
                });
            }
        }
    }, [food])


    useEffect(() => {
        const eatFoodInterval = setInterval(eatFood, settings.eatFoodInterval);
        const bornVillagerInterval = setInterval(bornVillager, settings.bornVillagerInterval)

        return () => {
            clearInterval(eatFoodInterval);
            clearInterval(bornVillagerInterval);
        }
    }, [gameIsActive])
}