import { useTelegramApp } from 'shared/hooks';
import './ShopPage.scss';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { IShopItem, ShopItem } from 'widgets/ShopItem';
import { CoinIcon, FoodIcon, LogIcon } from 'shared/icons';
import { useShopContext } from 'shared/context/ShopContext/ShopContext';
import { useAppContext } from 'shared/context/AppContext';
import { IAppData } from 'shared/types';
import { useStats, useStatsActions } from 'shared/state/StatsState/hooks';



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

    const onClickBackButton = () => {
        navigate('/');
        BackButton.hide();
        MainButton.hide();
    }

    const onBuyCoin = () => {
        sendData('buy_coin_100');
    }

    const shopItems:IShopItem[] = useMemo(() => [
        {
            icon: <LogIcon />,
            name: 'wood',
            price: 1,
            count: 10,
            currency: 'COIN'
        },
        {
            icon: <FoodIcon />,
            name: 'food',
            price: 1,
            count: 1,
            currency: 'COIN'
        },
        {
            icon: <CoinIcon />,
            name: 'coin',
            price: 100,
            count: 100,
            currency: 'MONEY',
            callback: onBuyCoin
        }
    ], [openInvoice])

    const onMakingPurchase = useCallback((buttonID: string) => {
        if(shopData.totalPrice > stats.coins || buttonID !== 'Buy') return;

        increaseStat({stat: 'coins', value: -shopData.totalPrice})
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
