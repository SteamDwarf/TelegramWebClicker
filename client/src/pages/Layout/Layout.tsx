import { Outlet } from "react-router";
import { useTelegramApp } from "shared/hooks";
import { Header } from "widgets/Header";
import "./Layout.scss";
import { useEffect } from "react";
import { useTonConnectModal } from "@tonconnect/ui-react";

export const Layout = () => {
    const { ready, colorScheme } = useTelegramApp()

    useEffect(() => {
        ready();
    }, [])

    return (
        <div className={`${colorScheme} layout`}>
            <Header />
            <div className='layout__buttons-container'>
                <Outlet />
            </div>
        </div>
    );
}