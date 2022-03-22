import { createSelector } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { datasetApi, DatasetItem, IDataset } from "."
import styles from './list.module.scss'

type TProps = {
    categoryId: number
}

export const DatasetList = ({ categoryId }: TProps) => {
    const selectDatasetByCatalogId = useMemo(() => {
        return createSelector(
            (result: any) => result.data as IDataset[],
            (data) => ({ list: data.filter((dataset) => dataset.CategoryId === categoryId) })
        )
    }, [])

    const { list } = datasetApi.useGetFilteredDatasetsQuery(undefined, {
        selectFromResult: selectDatasetByCatalogId
    })



    return (
        <div className={styles.datasetList}>
            {list.map((item: any) => <DatasetItem item={item} key={item.Id} />)}
        </div>
    )
}