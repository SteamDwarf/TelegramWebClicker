import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTelegramApp } from "shared/hooks";

export const Profile = () => {
    const { BackButton } = useTelegramApp();
    const navigate = useNavigate();

    const onClickBackButton = () => {
        navigate('/');
        BackButton.hide();
    }

    useEffect(() => {
        BackButton.show();
        BackButton.onClick(onClickBackButton);
    }, [])

    return (
        <div>
            <TonConnectButton />
        </div>
    );
}