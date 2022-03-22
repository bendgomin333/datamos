
import { useState } from "react"
import { CategoryList } from "../../features/category"
import { DatasetInfo } from "../../features/dataset"
import { Map } from "../../features/map"
import styles from './styles.module.scss'
import MenuIcon from './menu.svg'

const menuBtnHandler = (translate: number, setter: (value: React.SetStateAction<number>) => void) => {
    translate < 0 ? setter(0) : setter(-500)
}

const MainPage = () => {
    const [translate, setTranslate] = useState(0)

    return (
        <div className="page">
            <div className={styles.pageView}>
                <div className={styles.menuBtn} onClick={() => menuBtnHandler(translate, setTranslate)}>
                    <img className={styles.menuIcon} src="/menu.svg" alt="menu"/>
                </div>
                <div className={styles.categories} style={{ transform: `translateX(${translate}px)` }}>
                    <CategoryList />
                </div>
                <div className={styles.map}>
                    <Map />
                    <DatasetInfo />
                </div>
            </div>
        </div>
    )
}

export default MainPage