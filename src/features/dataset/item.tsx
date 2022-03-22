import { useCallback } from "react"
import { IDataset } from "."
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from './item.module.scss'
import { setSelected } from "./slice"

type TProps = {
    item: IDataset
}

const onclickHandler = (disabled: boolean, cb: () => void) => {
    if (!disabled) {
        cb()
    }
}

export const DatasetItem = ({ item }: TProps) => {
    const disabled = useAppSelector(({ dataset }) => dataset.disabled)
    const selectedDataset = useAppSelector(({ dataset }) => dataset.selectedDataset)
    const dispatch = useAppDispatch()
    const setId = useCallback(() => {
        dispatch(setSelected(item))
    }, [dispatch])

    return (
        <div className={styles.datasetItem + (selectedDataset.Id === item.Id ? ` ${styles.selectedDataset}` : '')} onClick={() => onclickHandler(disabled, setId)}>
            {item.Caption}
        </div>
    )
}