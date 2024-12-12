import { Address, Cell } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";

export const useTonTransaction = () => {
    const [tonConnectUI] = useTonConnectUI();

    const sendTransaction = async (to: Address, tonValue: bigint, payload: Cell) => {
        try {
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

            return true;

        } catch(error: unknown) {
            console.error('Error', error);
            return false
        }
    }

    return {sendTransaction}
}