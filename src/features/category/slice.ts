import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TCategoryIdLength = {
    id: number,
    length: number
}

const categoryAdapter = createEntityAdapter({
    selectId: (item: TCategoryIdLength) => item.id
})

export const categorySlice = createSlice({
    name: 'category',
    initialState: categoryAdapter.getInitialState(),
    reducers: {
        setIdLength: (state, action: PayloadAction<TCategoryIdLength[]>) => {
            categoryAdapter.setAll(state, action.payload)
        }
    }
})

export const categorySelectors = categoryAdapter.getSelectors()