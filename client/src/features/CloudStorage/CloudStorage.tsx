import { useEffect, useState } from "react";
import { useCloudeStorage } from "shared/hooks";
import { useStats, useStatsActions } from "shared/state";

export const  CloudStorage = () => {
    const { savedData, saveData, isLoading } = useCloudeStorage();
    const { updateStat } = useStatsActions();
    const stats = useStats();
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
        }
    }, [isLoading])

    useEffect(() => {
        if(needSave) {
            saveData(stats);
            setNeedSave(false);
        }
    }, [needSave])
    return <></>
}