import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { IShopCartItem, IShopData } from "shared/types";

interface ContextValue {
    data: IShopData;
    updateCart: (item:IShopCartItem) => void;
    clearCart: () => void;
}

const defaultShopData: IShopData = {
    totalPrice: 0,
    cartData: {}
}

const initialData:ContextValue = {
    data: defaultShopData,
    updateCart: () => null,
    clearCart: () => null
}

const ShopContext = createContext(initialData);

export const ShopContextProvider:FC<PropsWithChildren> = ({children}) => {
    const [ shopData, setShopData ] = useState<IShopData>(defaultShopData);

    const updateCart = (itemData:IShopCartItem) => {
        let totalPrice = Object.values(shopData.cartData).reduce((price, item) => {
            if(item.name === itemData.name) return price;

            return price += item.totalPrice
        }, 0);

        totalPrice += itemData.totalPrice;

        setShopData({
            ...shopData,
            cartData: {
                ...shopData.cartData,
                [itemData.name]: itemData,
            },
            totalPrice: totalPrice
        })
    }

    const clearCart = () => {
        setShopData(defaultShopData);
    }

    const value:ContextValue = {
        data: shopData,
        updateCart,
        clearCart
    }

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShopContext = () => useContext(ShopContext)