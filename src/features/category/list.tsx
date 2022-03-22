import { categoryApi, CategoryItem } from "."
import { datasetApi } from "../dataset"
import styles from "./list.module.scss"

export const CategoryList = () => {
    const datasets = datasetApi.useGetFilteredDatasetsQuery()
    const categories = categoryApi.useGetAllCategoriesQuery(undefined, {
        skip: datasets.isLoading || datasets.isFetching
    })

    if (categories.isLoading) {
        return <div>Loading</div>
    }

    return (
        <div className={styles.categoryList}>
            {categories.data?.map(({ Id }) => <CategoryItem id={Id} key={Id} />)}
        </div>
    )
}