import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
    reducerPath: 'rootApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://apidata.mos.ru/v1/'
    }),
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => ({
                url: 'datasets',
                params: { 'api_key': 'd57f05b26ea6d3e45e0a4e5868be89d1' }
            })
        })
    })
})