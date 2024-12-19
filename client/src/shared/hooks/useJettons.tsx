import { Address, toNano } from '@ton/core';
import { useCallback, useEffect } from "react";
import { useTonContext } from 'shared/context/TonContext/TonContext';
import { getJettonBurnMessage, getJettonBuyMesssage } from 'shared/utils/tonMessages';
import { useTonTransaction } from './useTonTransaction';


export const useJettons = () => {
    const {sender, jettonMarket, jettonWallet, setJettonBalanceIsLoading, updateJettonBalance} = useTonContext();
    const { sendTransaction, isLoading } = useTonTransaction();

    const buyTokkens = useCallback( async () => {
        if(!jettonMarket || !sender) return false;

        const message = getJettonBuyMesssage();

        return sendTransaction(
            jettonMarket.address,
            100n * toNano('0.001') + toNano('0.15'),
            message
        )
    }, [jettonMarket, sender, sendTransaction])

    const burnJettons = useCallback(async (amount: number) => {
        if(!jettonWallet || !sender?.address) return false;

        const message = getJettonBurnMessage(amount, sender.address);

        return sendTransaction(
            jettonWallet.address,
            toNano('0.05'),
            message
        )

    }, [jettonWallet, sender, sendTransaction])

    useEffect(() => {
        setJettonBalanceIsLoading(isLoading);

        if(!isLoading) updateJettonBalance();
    }, [isLoading])

    return {
        buyTokkens,
        burnJettons,
        isLoading
    }

}