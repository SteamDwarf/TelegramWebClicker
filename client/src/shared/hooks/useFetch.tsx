import { useState } from "react";

interface IUseFetchInfo<T> {
    isLoading: boolean;
    data: T | null,
    isError: boolean;
    error: any | null;
    isSuccess: boolean;
}

export const useFetch = <T,>() => {
    const [info, setInfo] = useState<IUseFetchInfo<T>>({
        isLoading: false,
        data: null,
        isError: false,
        error: null,
        isSuccess: false
    });

    const sendRequest = async (link: string) => {
        setInfo({
            isLoading: true,
            data: null,
            isError: false,
            error: null,
            isSuccess: false
        });

        const response = await fetch(link);
        const data = await response.json();

        if(response.ok) {
            setInfo({
                isLoading: false,
                data: data,
                isError: false,
                error: null,
                isSuccess: true
            })
        } else {
            setInfo({
                isLoading: false,
                data: null,
                isError: true,
                error: data,
                isSuccess: false
            })
        }
    }

    return {sendRequest, info};
}