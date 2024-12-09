import { FC, useMemo } from 'react';
import './ShopItem.scss';
import { IShopItem } from './types';
import { CoinIcon } from 'shared/icons';
import { useShopContext } from 'shared/context/ShopContext/ShopContext';
import { CurrencyIconMapper } from './constants';
import { Loader } from 'shared/UI/Loader/Loader';

interface ShopItemProps {
    data: IShopItem;
}

export const ShopItem:FC<ShopItemProps> = ({data}) => {
    const { updateCart, data: shopData } = useShopContext();

    const itemCount = useMemo(() => {
        return shopData.cartData[data.name]?.count ?? 0
    }, [shopData.cartData])

    const addItem = () => {
        updateCart({
            name: data.name,
            count: itemCount + data.count,
            totalPrice: (itemCount + data.count) / data.count * data.price
        })
    }

    const reduceItem = () => {
        updateCart({
            name: data.name,
            count: itemCount - data.count,
            totalPrice: (itemCount -  data.count) / data.count * data.price
        })
    }

    return (
        <div className='shop__item'>
            <section className='shop__item-info'>
                <div className='shop__item-icon'>
                    {data.icon}
                </div>
                <div className='shop__item-name'>
                    {data.name}
                </div>
                <div className='shop__item-price'>
                    {data.price}
                    {CurrencyIconMapper[data.currency]}
                    &nbsp;
                    per
                    &nbsp;
                    {data.count}
                    {data.icon}
                </div>
            </section>
            <section className='shop__item-buttons-container'>
                {
                    data.callback ? (
                        <button 
                            className='shop__item-button' 
                            onClick={data.callback}
                        >
                            Buy
                        </button>
                    ) : (
                        <>
                            <button 
                                disabled={itemCount <= 0} 
                                className='shop__item-button' 
                                onClick={reduceItem}
                            >
                                -
                            </button>
                            <span className='shop__item-count'>{itemCount}</span>
                            <button className='shop__item-button' onClick={addItem}>+</button>
                        </>
                    )
                }
                
            </section>
            {
                data.isLoading && (
                    <Loader text='Loading...'/>
                )
            }
        </div>
    );
}
