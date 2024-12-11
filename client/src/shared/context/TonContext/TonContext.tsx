import { Address, OpenedContract, SenderArguments } from "@ton/core";
import { CHAIN, Wallet, WalletInfoWithOpenMethod } from "@tonconnect/ui-react";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useTonClient } from "shared/hooks/useTonClient";
import { useTonConnect } from "shared/hooks/useTonConnect";
import { TonClient } from "@ton/ton";
import { useAsyncState } from "shared/hooks/useAsyncState";
import { JettonMarket, JettonWallet } from "../../../contracts";

interface ContextValue {
    sender: {
        send: (args: SenderArguments) => Promise<void>;
        address: Address | undefined;
    } | null;
    connected: boolean;
    wallet: Wallet | (Wallet & WalletInfoWithOpenMethod) | null;
    network: CHAIN | null;
    client: TonClient | null;
    jettonMarket: OpenedContract<JettonMarket> | undefined;
    jettonWallet: OpenedContract<JettonWallet> | undefined;
}

const initialData: ContextValue = {
    sender: null,
    connected: false,
    wallet: null,
    network: null,
    client: null,
    jettonMarket: undefined,
    jettonWallet: undefined
}

const TonContext = createContext(initialData);

export const TonContextProvider:FC<PropsWithChildren> = ({children}) => {
    const {sender, connected, wallet, network} = useTonConnect();
    const {client} = useTonClient(network);
    const [jettonWalletAddress, setJettonWalletAddress] = useState<string>();
    
    const jettonMarket = useMemo(() => {
        if(!client || !wallet) return;

        const market = JettonMarket.fromAddress(Address.parse(import.meta.env.VITE_JETTON_MARKET_ADDRESS));
        console.log('send');
        return client.open(market) as OpenedContract<JettonMarket>;
    }, [client, wallet]);

    const getJettonWalletAddress = useCallback(async () => {
        if(!jettonMarket || !wallet) return;
        const address = await jettonMarket.getGetJettonWalletAddress(Address.parse(wallet.account.address));

        setJettonWalletAddress(address.toString());
    }, [jettonMarket, wallet])

    const jettonWallet = useMemo(() => {
        console.log('send wallet');
        if(!jettonMarket || !wallet || !client || !jettonWalletAddress) return

        const jWallet = JettonWallet.fromAddress(Address.parse(jettonWalletAddress));
        return client.open(jWallet) as OpenedContract<JettonWallet>;
    }, [jettonWalletAddress])

    useEffect( () => {
        getJettonWalletAddress();
    }, [getJettonWalletAddress])

    const value: ContextValue = {
        sender,
        connected,
        wallet,
        network,
        client,
        jettonMarket: jettonMarket,
        jettonWallet: jettonWallet
    }

    return <TonContext.Provider value={value}>{children}</TonContext.Provider>
}

export const useTonContext = () => useContext(TonContext)