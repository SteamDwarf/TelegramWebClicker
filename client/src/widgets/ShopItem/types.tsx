import { ReactNode } from "react";

export type ShopItemCurrency = 'MONEY' | 'COIN' | 'WOOD' | 'TON';

export interface IShopItem {
    icon: ReactNode;
    name: string;
    price: number;
    count: number;
    currency: ShopItemCurrency;
    isLoading?: boolean;
    disabled?: boolean;
    callback?: () => void;
}

export interface IShopCategory {
    name: string;
    items: IShopItem[];
}