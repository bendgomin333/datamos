import { rootApi } from "../../app/store";

export interface ICategory {
    // Datasets: number[],
    // Description: string,
    // EnglishDescription: string,
    // EnglishName: string,
    Id: number,
    Name: string,
    // Services: number[]
}

export const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: 'categories',
                params: {
                    'api_key': process.env.REACT_APP_MOS_API_KEY,
                    // '$filter': '(IsArchive eq false) and (ContainsGeodata eq true)'
                    '$orderby': 'Name'
                },
                method: 'POST',
                body: ['Id', 'Name']
            })
        }),
    })
})