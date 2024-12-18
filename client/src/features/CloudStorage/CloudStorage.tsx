import { useEffect, useState } from "react";
import { useCloudeStorage } from "shared/hooks";
import { useStats, useStatsActions } from "shared/state";
import { useAchievements, useAchievementsActions } from "shared/state/AchievementsState/hooks";

export const  CloudStorage = () => {
    const { savedData, saveData, isLoading } = useCloudeStorage();
    const { updateStat } = useStatsActions();
    const stats = useStats();
    const {achievementsString} = useAchievements();
    const {setAchievementsString} = useAchievementsActions();
    const [needSave, setNeedSave] = useState(false);

    useEffect(() => {
        const saveTimer = setInterval(() => setNeedSave(true), 5000);

        return () => {clearInterval(saveTimer)}
    }, [])

    useEffect(() => {
        if(!isLoading) {
            updateStat({stat: 'food', value: savedData.food});
            updateStat({stat: 'villagers', value: savedData.villagers});
            updateStat({stat: 'wood', value: savedData.wood});
            updateStat({stat: 'farmLevel', value: savedData.farmLevel});
            updateStat({stat: 'sawmillLevel', value: savedData.sawmillLevel});
            setAchievementsString(savedData.achievements);
        }
    }, [isLoading])

    useEffect(() => {
        if(needSave) {
            saveData(stats, achievementsString);
            setNeedSave(false);
        }
    }, [needSave])
    return <></>
}