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
import { useTonContext } from 'shared/context/TonContext/TonContext';



export const ShopPage = () => {
    const { 
        BackButton, 
        MainButton, 
        showPopup, 
        onEvent, 
        offEvent, 
    } = useTelegramApp();
    const { data: shopData, clearCart } = useShopContext();
    const stats = useStats();
    const {increaseStat, updateStat} = useStatsActions();
    const navigate = useNavigate();
    const { buyTokkens, burnJettons } = useJettons();
    const {connected} = useTonContext();
    
    const onClickBackButton = () => {
        navigate(-1);
        BackButton.hide();
        MainButton.hide();
    }

    const onBuyCoin = useCallback(() => {
        if(!connected) return;

        buyTokkens();
    }, [buyTokkens, connected])


    const shopItems:IShopItem[] = useMemo(() => [
        {
            icon: <LogIcon />,
            name: 'wood',
            price: 1,
            count: 10,
            currency: 'COIN',
            isLoading: false,
            disabled: !connected
        },
        {
            icon: <FoodIcon />,
            name: 'food',
            price: 1,
            count: 1,
            currency: 'COIN',
            isLoading: false,
            disabled: !connected
        },
        {
            icon: <CoinIcon />,
            name: 'coin',
            price: 0.001,
            count: 100,
            currency: 'TON',
            callback: onBuyCoin,
            isLoading: false,
            disabled: !connected
        }
    ], [onBuyCoin, connected])

    const onMakingPurchase = useCallback(async (buttonID: string) => {
        if(shopData.totalPrice > stats.coins || buttonID !== 'Buy') return;

        try {
            await burnJettons(shopData.totalPrice);

            Object.values(shopData.cartData).forEach((product) => {
                increaseStat({stat: product.name, value: product.count})
            });


            clearCart();
        } catch(error: unknown) {
            console.log('Error', error);
        }
        
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
