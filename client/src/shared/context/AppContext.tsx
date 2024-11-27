import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCloudeStorage } from "shared/hooks/useCloudeStorage";
import { IAppData } from "shared/types";

interface ContextValue {
    data: IAppData,
    changeData: (fieldName: keyof IAppData, value: string | number) => void;
    isPageLoading: boolean;
    setIsPageLoding: (state: boolean) => void;
}

const initData: ContextValue = {
    data: {
        wood: 0,
        food: 0,
        villagers: 6,
    },
    changeData: () => null,
    isPageLoading: true,
    setIsPageLoding: () => null
}

const AppContext = createContext(initData);


export const AppContextProvider:FC<PropsWithChildren> = ({children}) => {
    const { savedData, saveData, isLoading } = useCloudeStorage();
    const [ data, setData ] = useState<IAppData>(savedData);
    const [needSave, setNeedSave] = useState(false);
    const [isPageLoading, setIsPageLoding] = useState(true);

    const changeData = (fieldName: keyof IAppData, value: string | number) => {
        setData({...data, [fieldName]: value});
    }
    
    const value:ContextValue = {
        data,
        changeData,
        isPageLoading,
        setIsPageLoding
    }


    useEffect(() => {
        const saveTimer = setInterval(() => setNeedSave(true), 5000);

        return () => clearInterval(saveTimer);
    }, [])

    useEffect(() => {
        if(!isLoading) setData(savedData);
    }, [isLoading])

    useEffect(() => {
        if(needSave) {
            saveData(data);
            setNeedSave(false);
        }
    }, [needSave])


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export const useAppContext = () => useContext(AppContext)