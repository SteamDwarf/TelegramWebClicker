import { useTonConnect } from "./useTonConnect"
import { TonClient } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { useAsyncState } from "./useAsyncState";

export const useTonClient = () => {
    const { network } = useTonConnect();
    const endpoint = useAsyncState(async () => {
        return getHttpEndpoint({
            network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet'
        });
    }, [network]);

    console.log(endpoint);
    return {
        client: endpoint ? new TonClient({endpoint}) : null
    }
    
    /* const [endpoint, setEndpoint] = useState<string>('');
    const [client, setClient] = useState<TonClient | null>(null);

    const getEndpoint = async () => {
        const end = await getHttpEndpoint({
            network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet'
        });

        setEndpoint(end);
    }

    useEffect(() => {
        getEndpoint();
    }, [network])
    
    useEffect(() => {
        if(!network || !endpoint) return;

        setClient(new TonClient({endpoint}))
    }, [endpoint]);

    return {client} */
}