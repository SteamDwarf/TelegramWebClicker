import { beginCell, toNano } from '@ton/core';
import { useCallback } from "react";
import { Burn, Buy } from "../../contracts";
import { useTonContext } from 'shared/context/TonContext/TonContext';
import { useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';
import { getJettonBurnMessage, getJettonBuyMesssage } from 'shared/utils/tonMessages';


export const useJettons = () => {
    const {sender, jettonMarket, jettonWallet} = useTonContext();
    const [tonConnectUI] = useTonConnectUI();


    const getBalance = useCallback(async () => {
        if(!jettonWallet) return;

        const data = await jettonWallet.getGetWalletData();
        return data.balance;
    }, [jettonWallet])

    const buyTokkens = useCallback( async () => {
        if(!jettonMarket || !sender) return;

        const message = getJettonBuyMesssage();

        try {
            const resp = await tonConnectUI.sendTransaction({
                validUntil: Date.now() + 1000 * 60,
                messages: [
                    {
                        address: jettonMarket.address.toString(),
                        amount: (100n * toNano('0.001') + toNano('0.15')).toString(),
                        payload: message.toBoc().toString("base64")
                    }
                ]
            });

            console.log(resp);
        } catch(error: unknown) {
            console.log('Error', error);
        }
        

        /* jettonMarket.send(
            sender, 
            {
                value: 100n * toNano('0.001') + toNano('0.15')
            },
            message
        ) */
    }, [jettonMarket, sender])

    const burnJettons = useCallback(async (amount: number) => {
        if(!jettonWallet || !sender?.address) return;

        /* const message: Burn = {
            $$type: 'Burn',
            query_id: 0n,
            amount: BigInt(amount),
            response_destination: sender.address,
            custom_payload: beginCell().endCell()
        } */

        const message = getJettonBurnMessage(amount, sender.address);

        const resp = await tonConnectUI.sendTransaction({
            validUntil: Date.now() + 1000 * 60,
            messages: [
                {
                    address: jettonWallet.address.toString(),
                    amount: toNano('0.05').toString(),
                    payload: message.toBoc().toString("base64")
                }
            ]
        });

        console.log(resp);

    }, [jettonWallet, sender])

    return {
        buyTokkens,
        getBalance,
        burnJettons
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