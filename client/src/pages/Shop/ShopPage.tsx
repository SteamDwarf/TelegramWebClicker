import { useJettons, useTelegramApp } from 'shared/hooks';
import './ShopPage.scss';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ShopItem } from 'widgets/ShopItem';
import { CoinIcon, FoodIcon, LogIcon } from 'shared/icons';
import { useShopContext } from 'shared/context/ShopContext/ShopContext';
import { useStats, useStatsActions } from 'shared/state/StatsState/hooks';
import { useTonContext } from 'shared/context/TonContext/TonContext';
import FarmHouse from 'assets/FarmHouse.png';
import SawmillImg from 'assets/SawmillHouse.png';
import { IShopCategory } from 'widgets/ShopItem/types';
import { useAchievements } from 'shared/state/AchievementsState/hooks';
import { useAchievementModal } from 'features/AchievementModalContent/hook';
import { IAppData } from 'shared/types';



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
    const {increaseStat } = useStatsActions();
    const navigate = useNavigate();
    const { buyTokkens, burnJettons } = useJettons();
    const { connected } = useTonContext();
    const showAchievement = useAchievementModal();
    const {hasAchievement} = useAchievements();

    const onClickBackButton = () => {
        navigate(-1);
        BackButton.hide();
        MainButton.hide();
    }

    const onBuyCoin = useCallback(async() => {
        if(!connected) return;

        await buyTokkens();
    }, [buyTokkens, connected])

    const onBuyFarm = useCallback(() => {
        if(!hasAchievement(1)) showAchievement(1);

        increaseStat({stat: 'farmLevel', value: 1})
        increaseStat({stat: 'wood', value: -1})
    }, [increaseStat])

    const onBuySawmill = useCallback(() => {
        if(!hasAchievement(2)) showAchievement(2);
        increaseStat({stat: 'sawmillLevel', value: 1})
        increaseStat({stat: 'wood', value: -1})
    }, [increaseStat])


    const shopItems:IShopCategory[] = useMemo(() => [
        {
            name: 'Donation currency',
            items: [
                {
                    icon: <CoinIcon />,
                    name: 'coin',
                    price: 0.14,
                    count: 100,
                    currency: 'TON',
                    callback: onBuyCoin,
                    isLoading: false,
                    disabled: !connected
                }
            ]
        },
        {
            name: 'Resources',
            items: [
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
                }
            ]
        },
        {
            name: 'Upgrades',
            items: [
                {
                    icon: <img src={FarmHouse}/>,
                    name: 'Farm House',
                    price: 1,
                    count: 1,
                    currency: 'WOOD',
                    callback: onBuyFarm,
                    disabled: stats.farmLevel === 1 || stats.wood < 1
                },
                {
                    icon: <img src={SawmillImg}/>,
                    name: 'Sawmill',
                    price: 1,
                    count: 1,
                    currency: 'WOOD',
                    callback: onBuySawmill,
                    disabled: stats.sawmillLevel === 1 || stats.wood < 1
                }
            ]
        }
    ], [onBuyCoin, connected, onBuyFarm, onBuySawmill])

    const onMakingPurchase = useCallback(async (buttonID: string) => {
        if(shopData.totalPrice > stats.coins || buttonID !== 'Buy') return;

            const isSuccess = await burnJettons(shopData.totalPrice);

            if(isSuccess) {
                Object.values(shopData.cartData).forEach((product) => {
                    increaseStat({stat: product.name as keyof IAppData, value: product.count})
                });
    
                clearCart();
            }

            console.log('jetton updated');
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
            {shopItems.map((category) => (
                <div className='shop__category'>
                    <header className='shop__category-header'>
                        <h3>{category.name}</h3>
                        <hr />
                    </header>
                    <main className='shop__category-container'>
                        {category.items.map((item) => <ShopItem data={item}/>)}
                    </main>
                </div>
            ))}
        </div>
    )
}
