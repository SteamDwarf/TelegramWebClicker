export interface IAppData {
    wood: number;
    food: number;
    villagers: number;
    coins: number;
}

export interface IShopCartItem {
    name: string;
    count: number;
    totalPrice: number;
}

export interface IShopData {
    totalPrice: number;
    cartData: Record<string, IShopCartItem>;
}