import { rootApi } from "../../app/store"
import { categorySlice } from "../category"
import { setDisabled, setSelected } from "./slice"

export interface IDataset {
    Id: number,
    CategoryId: number,
    Caption: string,
    IsArchive: boolean,
    ContainsGeodata: boolean
}

type TGetById = {
    datasetId: number,
    bbox?: string
}

const queryParams = {
    params: {
        'api_key': process.env.REACT_APP_MOS_API_KEY,
        '$orderby': 'Caption',
        '$filter': '(ContainsGeodata eq true) and (IsArchive eq false)'
    },
    method: 'POST',
    body: ['Id', 'CategoryId', 'Caption', 'IsArchive', 'ContainsGeodata'],
}

export const datasetApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getFilteredDatasets: builder.query<IDataset[], void>({
            query: () => ({
                url: 'datasets',
                ...queryParams
            }),
            onQueryStarted: async (undefined, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    const ids = data.reduce((acc: any, value) => {
                        acc[value.CategoryId] = acc[value.CategoryId] + 1 || 1
                        return acc
                    }, {})
                    dispatch(categorySlice.actions.setIdLength(Object.keys(ids).map(key => ({ id: +key, length: ids[key] }))))
                } catch (err) {
                    console.error('No categories')
                }
            }
        }),
        getDatasetByCategoryId: builder.query<IDataset[], number>({
            query: (categoryId) => ({
                url: `datasets`,
                ...queryParams,
                params: {
                    ...queryParams.params,
                    '$filter': `${queryParams.params['$filter']} and (CategoryId eq ${categoryId})`
                }
            })
        }),
        getDatasetGeoById: builder.query<any, TGetById>({
            query: ({ datasetId, bbox }) => ({
                url: `datasets/${datasetId}/features`,
                params: {
                    'api_key': process.env.REACT_APP_MOS_API_KEY,
                    'bbox': bbox ? bbox : ''
                }
            }),
            onQueryStarted: async ({ datasetId }, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(setDisabled(true))
                    const { data } = await queryFulfilled
                    return data
                } catch (err) {
                    dispatch(setSelected({ Id: 0, Caption: '' }))
                } finally {
                    dispatch(setDisabled(false))
                }
            }
        })
    })
})