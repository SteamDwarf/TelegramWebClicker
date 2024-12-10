import { toNano } from '@ton/core';
import { useCallback } from "react";
import { Buy } from "../../contracts";
import { useTonContext } from 'shared/context/TonContext/TonContext';


export const useJettons = () => {
    const {sender, jettonMarket, jettonWallet} = useTonContext();


    const getBalance = useCallback(async () => {
        if(!jettonWallet) return;

        const data = await jettonWallet.getGetWalletData();
        return data.balance;
    }, [jettonWallet])

    const buyTokkens = useCallback(() => {
        if(!jettonMarket || !sender) return;

        const message: Buy = {
            $$type: 'Buy',
            query_id: 0n,
            amount: 100n
        }

        jettonMarket.send(
            sender, 
            {
                value: 100n * toNano('0.001') + toNano('0.15')
            },
            message
        )
    }, [jettonMarket, sender])

    return {
        buyTokkens,
        getBalance
    }


    /* const {wallet, sender} = useTonConnect();


    const jettonMarket = useAsyncState( async () => {
        if(!client || !wallet) return;

        const contract = JettonMarket.fromAddress(Address.parse(import.meta.env.VITE_JETTON_MARKET_ADDRESS));
        return client.open(contract) as OpenedContract<JettonMarket>;
        
    }, [client, wallet]);


    const jetonWallet = useAsyncState(async () => {
        if(!client || !wallet || !jettonMarket) return;

        const walletAddress = await jettonMarket.getGetJettonWalletAddress(Address.parse(wallet.account.address));
        const contract = JettonWallet.fromAddress(walletAddress);
        return client.open(contract) as OpenedContract<JettonWallet>;
    }, [client, wallet, jettonMarket])


    const getBalance = useCallback(async () => {
        if(!jetonWallet) return;

        const data = await jetonWallet.getGetWalletData();
        return data.balance;
    }, [jetonWallet])

    const buyTokkens = () => {
        if(!jettonMarket) return;

        const message: Buy = {
            $$type: 'Buy',
            query_id: 0n,
            amount: 100n
        }

        jettonMarket.send(
            sender, 
            {
                value: 100n * toNano('0.001') + toNano('0.15')
            },
            message
        )
    }

    return {
        buyTokkens,
        getBalance
    } */

}