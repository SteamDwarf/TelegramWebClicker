import { Header } from 'widgets/Header';
import './App.scss'
import { useTelegramApp } from 'shared/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

export function App() {
    const { ready, colorScheme } = useTelegramApp()
    
    useEffect(() => {
        ready();
    }, [])

    return (
        <div className={`${colorScheme} app`}>
            <Header />
            <div className='app__buttons-container'>
                <Outlet />
            </div>
        </div>
    )
}

