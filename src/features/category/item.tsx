import { useState } from "react"
import { categoryApi, categorySelectors } from "."
import { useAppSelector } from "../../app/hooks"
import { DatasetList } from "../dataset"
import styles from "./item.module.scss"

type TProps = {
    id: number
}


export const CategoryItem = ({ id }: TProps) => {
    const [isDatasetVisible, setDatasetVisibility] = useState(false)

    const { item } = categoryApi.useGetAllCategoriesQuery(undefined, {
        selectFromResult: (result) => ({
            item: result.data?.find(elem => elem.Id === id)
        })
    })
    const categoryLength = useAppSelector(state => categorySelectors.selectById(state.category, id))

    if (!categoryLength) return null

    return (
        item ? <div className={styles.categoryItem}>
            <div className={styles.categoryHeader} onClick={() => setDatasetVisibility(!isDatasetVisible)} data-open={isDatasetVisible}>
                <h4 className={styles.categoryTitle}>{item?.Name}</h4>
                <span className={styles.categorySize}>{categoryLength.length}</span>
            </div>
            {isDatasetVisible ? <DatasetList categoryId={item.Id} /> : null}
        </div> : null
    )
}