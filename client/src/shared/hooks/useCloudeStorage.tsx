import { IAppData } from "shared/types";
import { useTelegramApp } from "./useTelegramApp"
import { useEffect, useState } from "react";

/* const updateData = (cloudeStorage: CloudStorage, setData: (data: IAppData) => void) => {
    cloudeStorage.getItem('wood', (error, va))
} */



export const useCloudeStorage = () => {
    const { CloudStorage } = useTelegramApp();
    const [savedData, setSavedData] = useState<IAppData>({
        wood: 0,
        food: 0,
        villagers: 6,
    });
    const [isLoading, setIsLoading] = useState(true);

    const saveData = (data: IAppData) => {
        CloudStorage.setItem('wood', data.wood.toString());
        CloudStorage.setItem('food', data.food.toString());
        CloudStorage.setItem('villagers', data.villagers.toString());
    }

    useEffect(() => {
        CloudStorage.getItems(['wood', 'food', 'villagers'], (error, values) => {
            if(!error && values) {
                setSavedData({
                    wood: Number(values['wood']),
                    food: Number(values['food']),
                    villagers: Number(values['villagers'])
                });
                setIsLoading(false);
            }
        })
    }, [])

    return {savedData, saveData, isLoading};
}