import { 
    AssetsSDK, 
    createApi, 
    createSender, 
    importKey, 
    JettonMinter, 
    PinataStorageParams, 
    TonClientApi 
} from "@ton-community/assets-sdk"
import { Address, OpenedContract, Sender, toNano } from '@ton/core';
import { useCallback, useEffect, useState } from "react";
import { useTonConnectUI, Wallet } from "@tonconnect/ui-react";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncState } from "./useAsyncState";
import { Buy, JettonMarket } from "../../contracts";

interface Settings {
    api: null | TonClientApi;
    keyPair: null | Awaited<ReturnType<typeof importKey>>,
    admin: null | Sender,
    sdk: null | AssetsSDK,
    jetton: null | OpenedContract<JettonMinter>
}

export const useJettons = () => {
    const {client}  = useTonClient();
    const {wallet, sender} = useTonConnect();

    const jettonMarket = useAsyncState( async () => {
        if(!client || !wallet) return;

        const contract = JettonMarket.fromAddress(Address.parse(import.meta.env.VITE_JETTON_MARKET_ADDRESS));
        return client.open(contract) as OpenedContract<JettonMarket>;
    }, [client, wallet])

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

    const [settings, setSettings] = useState<Settings>({
        api: null,
        keyPair: null,
        admin: null,
        sdk: null,
        jetton: null
    });
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const getBalance = async () => {
        if(!settings.jetton) return;
        const jettonWallet = await settings.jetton.getWallet(Address.parse(wallet.account.address));
        console.log(await jettonWallet.getData());
    }

    const init = async () => {
        const storage: PinataStorageParams = {
            pinataApiKey: import.meta.env.VITE_STORAGE_API_KEY,
            pinataSecretKey: import.meta.env.VITE_STORAGE_SECRET_KEY
        }

        const api = await createApi(import.meta.env.VITE_TON_NETWORK);
        const keyPair = await importKey(import.meta.env.VITE_JETTON_ADMIN_MNEMONIC);
        const admin = await createSender(
            import.meta.env.VITE_JETTON_WALLET_TYPE,
            keyPair,
            api
        );

        const sdk = AssetsSDK.create({
            api,
            storage,
            sender: admin
        });

        const jettonAddress = Address.parse(import.meta.env.VITE_JETTON_ADDRESS);
        const jetton = sdk.openJetton(jettonAddress);

        setSettings({
            api,
            keyPair,
            admin,
            sdk,
            jetton
        })
    }

    /* const buyJettons = () => {
        tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: import.meta.env.VITE_JETTON_MARKET_ADDRESS,

                }
            ]
        })
    } */

    const transferJettons = useCallback(async (to:string, amount: number) => {
        if(
            !settings.sdk ||
            !settings.admin ||
            !settings.jetton ||
            !settings.sdk.sender?.address
        ) return;
       
        const recieverAddress = Address.parse(to);
        const adminWallet = await settings.jetton.getWallet(settings.sdk.sender?.address);

        /* const response = await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 10,
            messages: [
                {
                    address: adminWallet.address.toString(),
                    amount: (BigInt(amount) * toNano('0.001')).toString()
                }
            ]
        }); */
        await adminWallet.send(settings.admin, recieverAddress, BigInt(amount), {value: BigInt(amount) * toNano('0.001')});
        /* settings.jetton.
        getTransactions(adminWallet.address.toString()); */
    }, [settings, tonConnectUI])

    useEffect(() => {
        init();
    }, [])
    
    /* useEffect(() => {
        console.log(info);
    }, [info]) */

    return {
        transferJettons,
        getBalance,
        buyTokkens
    }

}