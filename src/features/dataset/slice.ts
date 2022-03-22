import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IDataset } from ".";

export type TDatasetState = {
    selectedDataset: Partial<IDataset>,
    disabled: boolean,
    selectedFeatures: any
}

const initialState: TDatasetState = {
    selectedDataset: {
        Id: 0,
        Caption: ''
    },
    disabled: false,
    selectedFeatures: []
}

export const datasetSlice = createSlice({
    name: 'dataset',
    initialState,
    reducers: {
        setSelected: (state, action: PayloadAction<Partial<IDataset>>) => {
            state.selectedDataset = action.payload;
        },
        setDisabled: (state, action: PayloadAction<boolean>) => {
            state.disabled = action.payload
        },
        setSelectedFeatures: (state, action) => {
            state.selectedFeatures = action.payload
        }
    }
})

export const { setSelected, setDisabled, setSelectedFeatures } = datasetSlice.actions