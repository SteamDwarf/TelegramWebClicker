import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTelegramApp } from "shared/hooks";
import "./Profile.scss";
import { Achievements } from "widgets/Achievements/Achievements";

export const Profile = () => {
    const { BackButton } = useTelegramApp();
    const navigate = useNavigate();

    const onClickBackButton = () => {
        //TODO Не возвращает на предыдущую страницу
        navigate(-1);
        BackButton.hide();
    }

    useEffect(() => {
        alert('ok');
        BackButton.show();
        BackButton.onClick(onClickBackButton);
    }, []);



    return (
        <div className="profile">
            <TonConnectButton />
            <Achievements />
        </div>
    );
}