import { useJettons, useTelegramApp } from 'shared/hooks';
import './ShopPage.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { IShopItem, ShopItem } from 'widgets/ShopItem';
import { CoinIcon, FoodIcon, LogIcon } from 'shared/icons';
import { useShopContext } from 'shared/context/ShopContext/ShopContext';
import { useAppContext } from 'shared/context/AppContext';
import { IAppData } from 'shared/types';
import { useStats, useStatsActions } from 'shared/state/StatsState/hooks';
import { useTonWallet } from '@tonconnect/ui-react';
import { useLazyGetTransactionsQuery } from 'shared/api';
import { Address } from '@ton/core';
import { useLazyGetAddressInformationQuery } from 'shared/api/tonApiSlice';
import { Loader } from 'shared/UI/Loader/Loader';



export const ShopPage = () => {
    const { 
        BackButton, 
        MainButton, 
        showPopup, 
        onEvent, 
        offEvent, 
        openInvoice,
        sendData
    } = useTelegramApp();
    const { data: shopData, clearCart } = useShopContext();
    const stats = useStats();
    const {increaseStat, updateStat} = useStatsActions();
    const navigate = useNavigate();
    const wallet = useTonWallet();
    //const { transferJettons, getBalance, buyTokkens } = useJettons();
    const { buyTokkens } = useJettons();
    const [isLoading, setIsLoading] = useState(false);
    
    const onClickBackButton = () => {
        navigate('/');
        BackButton.hide();
        MainButton.hide();
    }

    const onBuyCoin = useCallback(() => {
        if(!wallet) return;
        buyTokkens();
        //getBalance();
        //transferJettons(wallet.account.address, 2);
        //sendData('buy_coin_100');
    }, [buyTokkens])


    const shopItems:IShopItem[] = useMemo(() => [
        {
            icon: <LogIcon />,
            name: 'wood',
            price: 1,
            count: 10,
            currency: 'COIN',
            isLoading: false
        },
        {
            icon: <FoodIcon />,
            name: 'food',
            price: 1,
            count: 1,
            currency: 'COIN',
            isLoading: false
        },
        {
            icon: <CoinIcon />,
            name: 'coin',
            price: 100,
            count: 100,
            currency: 'MONEY',
            callback: onBuyCoin,
            isLoading: false
        }
    ], [onBuyCoin])

    const onMakingPurchase = useCallback((buttonID: string) => {
        if(shopData.totalPrice > stats.coins || buttonID !== 'Buy') return;

        //increaseStat({stat: 'coins', value: -shopData.totalPrice})
        /* const newData:Record<keyof IAppData, number> = {
            coins: stats.coins - shopData.totalPrice
        } */

        Object.values(shopData.cartData).forEach((product) => {
            increaseStat({stat: product.name, value: product.count})
            //newData[product.name as keyof IAppData] = data[product.name as keyof IAppData] + product.count;
        });

        //changeData(newData);
        clearCart();
    }, [shopData.cartData, stats])

    const onClickMainButton = useCallback(() => {
        showPopup(
            {
                title: 'Making purchases',
                message: `Are you sure, what you want spend ${shopData.totalPrice} coins?`,
                buttons: [
                    {
                        id: 'Buy',
                        text: 'Buy',
                        type: 'destructive'
                    },
                    {
                        id:'Cancel',
                        type: 'cancel'
                    }
                ]
            },
            onMakingPurchase
        )
    }, [shopData, onMakingPurchase])

    useEffect(() => {
        BackButton.show();
        BackButton.onClick(onClickBackButton);

        MainButton.text = 'Buy';


    }, [])

    /* useEffect(() => {
        const getAddressInfoTimer = setInterval(() => {
            if(!wallet?.account.address) return;
            getAddressInformation(Address.parse(wallet?.account.address).toString());
        }, 5000)

        const getTransactionsTimer = setInterval(() => {
            if(!wallet?.account.address) return;
            getTransactions(Address.parse(wallet?.account.address).toString());
        }, 5000)

        return () => {
            clearInterval(getAddressInfoTimer)
            clearInterval(getTransactionsTimer)
        }


    }, [wallet]) */

/*     useEffect(() => {
        if(addressInformation.data) {
            console.log('last', addressInformation.data);
        }
    }, [addressInformation])
    useEffect(() => {
        if(transactions.data) {
            if(transactions.data?.result[0]?.out_msgs?.length > 0 &&
                !transactions.data?.result[0]?.in_msg?.source
            ) setIsLoading(true);
            else setIsLoading(false);
            console.log('transaction', transactions.data?.result[0]);
            //console.log('in', transactions.data?.result[0]?.in_msg);
            //console.log('out', transactions.data?.result[0]?.out_msgs[0]);
        }
    }, [transactions]) */


    useEffect(() => {
        onEvent('mainButtonClicked', onClickMainButton);

        return () => {
            offEvent('mainButtonClicked', onClickMainButton);
        }
    }, [onClickMainButton])

    useEffect(() => {
        if(shopData.totalPrice > 0) {
            MainButton.show();
            MainButton.text = `Buy (${shopData.totalPrice} coin)`
        } else {
            MainButton.hide();
        }

        if(shopData.totalPrice > stats.coins) MainButton.disable();
        else MainButton.enable();

    }, [shopData.totalPrice, stats.coins])


    return (
        <div className='shop__page'>
            {shopItems.map((item) => <ShopItem data={item}/>)}
        </div>
    )
}
