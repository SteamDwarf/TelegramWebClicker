import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTelegramApp } from "shared/hooks";
import "./Profile.scss";
import { Achievements } from "widgets/Achievements/Achievements";
import { useTonContext } from "shared/context/TonContext/TonContext";
import { Address } from "@ton/core";

export const Profile = () => {
    const { BackButton } = useTelegramApp();
    const navigate = useNavigate();
    const { tonApiClient, wallet } = useTonContext();

    const onClickBackButton = () => {
        //TODO Не возвращает на предыдущую страницу
        navigate(-1);
        BackButton.hide();
    }

    const getAccountData = async() => {
        if(wallet && tonApiClient) {
            const traces = await tonApiClient.accounts.getAccountTraces(Address.parse(wallet.account.address));
            console.log(await tonApiClient.traces.getTrace(traces.traces[0].id));
            console.log(await tonApiClient.wallet.getAccountSeqno(Address.parse(wallet.account.address)));
        }
    }

    useEffect(() => {
        getAccountData();
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