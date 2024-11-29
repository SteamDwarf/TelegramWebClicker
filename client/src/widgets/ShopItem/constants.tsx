import { ReactNode } from "react";
import { ShopItemCurrency } from "./types";
import { CoinIcon, LogIcon } from "shared/icons";
import { MoneyIcon } from "shared/icons/MoneyIcon";

export const CurrencyIconMapper:Record<ShopItemCurrency, ReactNode> = {
    'COIN': <CoinIcon />,
    'MONEY': <MoneyIcon />,
    'WOOD': <LogIcon />
}