import { useState } from "react";

interface IUseFetchInfo<T> {
    isLoading: boolean;
    data: T | null,
    isError: boolean;
    error: any | null;
    isSuccess: boolean;
}

interface IUseMassiveFetchInfo<T> extends Omit<IUseFetchInfo<T>, 'data'> {
    data: T[] | null;
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

export const useMassiveFetch = <T, >() => {
    const [info, setInfo] = useState<IUseMassiveFetchInfo<T>>({
        isLoading: false,
        data: null,
        isError: false,
        error: null,
        isSuccess: false
    });

    const sendRequest = async (links: string[]) => {
        setInfo({
            isLoading: true,
            data: null,
            isError: false,
            error: null,
            isSuccess: false
        });

        const responses = await Promise.all(links.map((link) => fetch(link)));
        const data = await Promise.all(responses.map((response) => response.json()));

        if(responses.every((response) => response.ok)) {
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