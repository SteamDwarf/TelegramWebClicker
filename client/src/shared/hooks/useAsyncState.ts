import { useEffect, useState } from "react"

export const useAsyncState = <T, K>(func: () => Promise<T>, deps: K[]) => {
    const [state, setState] = useState<T>();

    const changeState = async () => {
        const data = await func();
        setState(data);
    }

    useEffect(() => {
        changeState();
    }, [...deps])

    return state;
}