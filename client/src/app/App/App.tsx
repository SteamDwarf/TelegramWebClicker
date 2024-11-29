import { Header } from 'widgets/Header';
import './App.scss'
import { useCloudeStorage, useTelegramApp } from 'shared/hooks';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useStats, useStatsActions } from 'shared/state';

export function App() {
    const { ready, colorScheme } = useTelegramApp()
    const { savedData, saveData, isLoading } = useCloudeStorage();
    const { updateStat } = useStatsActions();
    const stats = useStats();
    const [needSave, setNeedSave] = useState(false);

    useEffect(() => {
        ready();

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

    return (
        <div className={`${colorScheme} app`}>
            <Header />
            <div className='app__buttons-container'>
                <Outlet />
            </div>
        </div>
    )
}

