import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCloudeStorage } from "shared/hooks/useCloudeStorage";
import { useStats, useStatsActions } from "shared/state/StatsState/hooks";

const AppContext = createContext({});


export const AppContextProvider:FC<PropsWithChildren> = ({children}) => {
    const { savedData, saveData, isLoading } = useCloudeStorage();
    const { updateStat } = useStatsActions();
    const stats = useStats();
    const [needSave, setNeedSave] = useState(false);
    //const [isPageLoading, setIsPageLoding] = useState(true);


    useEffect(() => {
        const saveTimer = setInterval(() => setNeedSave(true), 5000);

        return () => {clearInterval(saveTimer)}
    }, [])

    useEffect(() => {
        if(!isLoading) {
            updateStat({stat: 'coins', value: savedData.coins});
            updateStat({stat: 'food', value: savedData.food});
            updateStat({stat: 'villagers', value: savedData.villagers});
            updateStat({stat: 'wood', value: savedData.wood});
        }
    }, [isLoading])

    useEffect(() => {
        if(needSave) {
            saveData(stats);
            setNeedSave(false);
        }
    }, [needSave])


    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
};

export const useAppContext = () => useContext(AppContext)