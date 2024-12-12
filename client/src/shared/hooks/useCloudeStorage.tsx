import { IAppData } from "shared/types";
import { useTelegramApp } from "./useTelegramApp"
import { useEffect, useState } from "react";


export const useCloudeStorage = () => {
    const { CloudStorage } = useTelegramApp();
    const [savedData, setSavedData] = useState<Omit<IAppData, 'coins'>>({
        wood: 0,
        food: 0,
        villagers: 2,
        farmLevel: 0,
        sawmillLevel: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const saveData = (data: IAppData) => {
        CloudStorage.setItem('wood', data.wood.toString());
        CloudStorage.setItem('food', data.food.toString());
        CloudStorage.setItem('villagers', data.villagers.toString());
        CloudStorage.setItem('farmLevel', data.farmLevel.toString());
        CloudStorage.setItem('sawmillLevel', data.sawmillLevel.toString());
    }

    useEffect(() => {
        CloudStorage.getItems(['wood', 'food', 'villagers', 'farmLevel', 'sawmillLevel'], (error, values) => {
            if(!error && values) {
                setSavedData({
                    wood: Number(values['wood']),
                    food: Number(values['food']),
                    villagers: Number(values['villagers']),
                    farmLevel: Number(values['farmLevel']),
                    sawmillLevel: Number(values['sawmillLevel'])
                });
                setIsLoading(false);
            }
        })
    }, [])

    return {savedData, saveData, isLoading};
}