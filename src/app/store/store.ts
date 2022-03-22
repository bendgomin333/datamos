import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../../features/category/slice";
import { datasetSlice } from "../../features/dataset/slice";
import { mapboxSlice } from "../../features/map/model";
import { rootApi } from "./api";

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        dataset: datasetSlice.reducer,
        mapbox: mapboxSlice.reducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (gDM) => gDM().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

