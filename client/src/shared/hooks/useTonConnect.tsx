import { Address, SenderArguments } from "@ton/core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"
import { useMemo } from "react";

export const useTonConnect = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const data = useMemo(() => {
        return {
            sender: {
                send: async (args: SenderArguments) => {
                    tonConnectUI.sendTransaction({
                        messages: [{
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc().toString('base64')
                        }],
                        validUntil: Date.now() + 5 * 60 * 1000
                    })
                },
                address: wallet?.account.address ? Address.parse(wallet.account.address as string) : undefined
            },
            connected: !!wallet?.account.address,
            wallet: wallet,
            network: wallet?.account.chain ?? null
        }
    }, [wallet, tonConnectUI])

    return data;
}