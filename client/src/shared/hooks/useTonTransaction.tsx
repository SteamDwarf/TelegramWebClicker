import { Address, Cell } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useTonContext } from "shared/context/TonContext/TonContext";


export const useTonTransaction = () => {
    const [tonConnectUI] = useTonConnectUI();
    const {tonApiClient, wallet} = useTonContext();
    const [isLoading, setIsLoading] = useState(false)
    const [timerId, setTimerId] = useState(-1);


    const seqnoTimer = async(startSeqno: number) => {
        if(!tonApiClient || !wallet) return;

        const seqno = await tonApiClient.wallet.getAccountSeqno(Address.parse(wallet.account.address));
        console.log(startSeqno, seqno);
        if(seqno.seqno > startSeqno) {
            setIsLoading(false);
        }
    }

    const sendTransaction = async (to: Address, tonValue: bigint, payload: Cell) => {
        try {

            const seqno =  wallet && tonApiClient 
                ? (await tonApiClient.wallet.getAccountSeqno(Address.parse(wallet.account.address))).seqno
                : 0

            await tonConnectUI.sendTransaction({
                validUntil: Date.now() + 1000 * 60 * 5,
                messages: [
                    {
                        address: to.toString(),
                        amount: tonValue.toString(),
                        payload: payload.toBoc().toString("base64")
                    }
                ]
            });
            

            const timer = setInterval(() => seqnoTimer(seqno), 1000);
            console.log(timer);

            setIsLoading(true);
            setTimerId(Number(timer));

            return true;

        } catch(error: unknown) {
            console.error('Error', error);
            return false
        }
    }

    useEffect(() => {
        if(!isLoading && timerId !== -1) clearInterval(timerId);
    }, [isLoading, timerId])

    return {sendTransaction, isLoading}
}