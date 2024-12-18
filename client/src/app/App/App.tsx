import './App.scss'
import { TonContextProvider } from 'shared/context/TonContext/TonContext';
import Layout from 'pages/Layout';
//import { CloudStorage } from 'features/CloudStorage';
import { useAchievementsActions } from 'shared/state/AchievementsState/hooks';
import { useLoadingAchievementsData } from 'shared/hooks/useAchievementsData';
import { useEffect } from 'react';

export function App() {
    const { setAchievementsMetadata } = useAchievementsActions();
    const {
        data,
        isSuccess
    } = useLoadingAchievementsData();

    useEffect(() => {
        if(isSuccess && data) setAchievementsMetadata(data);
    }, [isSuccess, data])

    return (
        <TonContextProvider>
            {/* <CloudStorage /> */}
            <Layout />
        </TonContextProvider>
    )
}

