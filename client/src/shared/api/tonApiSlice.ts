import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tonApiSlice = createApi({
    reducerPath: 'tonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_TON_NETWORK === 'testnet' 
            ? 'https://testnet.toncenter.com/api/v2/'
            : 'https://toncenter.com/api/v2/' 
    }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getTransactions: builder.query<any, string>({
            query: (address: string) => `/getTransactions?address=${address}`
        }),
        getAddressInformation: builder.query<any, string>({
            query: (address: string) => `/getAddressInformation?address=${address}`
        })
    }),

});


export const {
    useLazyGetTransactionsQuery,
    useGetTransactionsQuery,
    useLazyGetAddressInformationQuery
} = tonApiSlice;