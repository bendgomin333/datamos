import styles from './styles.module.scss'

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div >
    )
}