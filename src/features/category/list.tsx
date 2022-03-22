import { categoryApi, CategoryItem, categorySelectors } from "."
import { useAppSelector } from "../../app/hooks"
import { datasetApi } from "../dataset"
import styles from "./list.module.scss"

export const CategoryList = () => {
    const datasets = datasetApi.useGetFilteredDatasetsQuery()
    const categories = categoryApi.useGetAllCategoriesQuery(undefined, {
        skip: datasets.isLoading || datasets.isFetching
    })

    // const categoriesLength = useAppSelector(state => categorySelectors.selectAll(state.category))
    // console.log(categoriesLength)

    if (categories.isLoading) {
        return <div>Loading</div>
    }

    return (
        <div className={styles.categoryList}>
            {categories.data?.map(({ Id }) => <CategoryItem id={Id} key={Id} />)}
        </div>
    )
}