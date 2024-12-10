import { Header } from 'widgets/Header';
import './App.scss'
import { useCloudeStorage, useTelegramApp } from 'shared/hooks';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useStats, useStatsActions } from 'shared/state';
import { TonContextProvider } from 'shared/context/TonContext/TonContext';
import Layout from 'pages/Layout';

export function App() {
    const { ready, colorScheme } = useTelegramApp()
    const { savedData, saveData, isLoading } = useCloudeStorage();
    const { updateStat } = useStatsActions();
    const stats = useStats();
/*     const [needSave, setNeedSave] = useState(false);

    useEffect(() => {
        ready();

        const saveTimer = setInterval(() => setNeedSave(true), 5000);

        return () => {clearInterval(saveTimer)}
    }, []) */

    useEffect(() => {
        if(!isLoading) {
            updateStat({stat: 'food', value: savedData.food});
            updateStat({stat: 'villagers', value: savedData.villagers});
            updateStat({stat: 'wood', value: savedData.wood});
        }
    }, [isLoading])

/*     useEffect(() => {
        if(needSave) {
            saveData(stats);
            setNeedSave(false);
        }
    }, [needSave])
 */

    return (
        <TonContextProvider>
            <Layout />
        </TonContextProvider>
    )
}

