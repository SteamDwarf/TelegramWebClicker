import { TonApiClient } from "@ton-api/client"

export const useTonApiClient = () => {
    const client = new TonApiClient({
        baseUrl: 'https://testnet.tonapi.io',
        apiKey: import.meta.env.VITE_TON_API_KEY
    });

    return client;
}