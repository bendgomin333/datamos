import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import styles from './info.module.scss'
import { setSelectedFeatures } from './slice'

export const DatasetInfo = () => {
    const features = useAppSelector(({ dataset }) => dataset.selectedFeatures)
    const dispatch = useAppDispatch()

    return (
        features.length > 0 ? <div className={styles.datasetInfo}>
            <div className={styles.closeBtn} onClick={() => dispatch(setSelectedFeatures([]))} />
            <h3 className={styles.infoHeader}>Здесь находится:</h3>
            {features.map((feature: any) => <InfoItem
                feature={feature}
                expanded={features.length > 1 ? false : true}
                key={feature.global_id}
            />)}
        </div> : <></>
    )
}

const unobject = (object: any): any => {
    const keys = Object.keys(object)
    return keys.map(key => {
        if (object[key] === undefined || object[key] === null) {
            return 'нет данных'
        } else if (typeof (object[key]) === 'object') {
            return `<b>${key}</b>: <ul>${unobject(object[key]).join('')}</ul>`
        } else {
            return `<li><b>${key}</b>: ${object[key]}</li>`
        }
    })
}

const InfoItem = ({ feature, expanded }: { feature: any, expanded: boolean }) => {
    const [expandedState, setExpand] = useState(expanded)
    const keys = Object.keys(feature)
    const html = unobject(feature).join('')

    return (
        <div className={styles.infoItem}>
            <div className={styles.infoTitle} onClick={() => setExpand(!expandedState)} data-expanded={expandedState}>
                {feature[keys[0]]}
            </div>
            {expandedState ? <div className={styles.infoDescription} dangerouslySetInnerHTML={{ __html: `<ul>${html}</ul>` }} /> : null}
        </div>
    )
}