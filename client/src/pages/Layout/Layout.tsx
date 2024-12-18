import { Outlet } from "react-router";
import { useTelegramApp } from "shared/hooks";
import { Header } from "widgets/Header";
import "./Layout.scss";
import { useEffect } from "react";
import { UserNotification } from "widgets/UserNotification/UserNotification";

export const Layout = () => {
    const { ready, colorScheme } = useTelegramApp()

    useEffect(() => {
        ready();
    }, [])

    return (
        <div className={`${colorScheme} layout`}>
            <Header />
            <div className='layout__container'>
                <Outlet />
            </div>
            <UserNotification />
        </div>
    );
}