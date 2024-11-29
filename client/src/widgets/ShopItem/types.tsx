import { ReactNode } from "react";

export type ShopItemCurrency = 'MONEY' | 'COIN' | 'WOOD';

export interface IShopItem {
    icon: ReactNode;
    name: string;
    price: number;
    count: number;
    currency: ShopItemCurrency;
    callback?: () => void;
}