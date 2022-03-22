import mapboxgl from "mapbox-gl"
import { useEffect, useRef } from "react"
import { AddLayerFromSource, ClearMap } from "."
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { datasetApi } from "../dataset"
import { Loader } from "../loader/ui"
import { InitMapEvents } from "./model"
import styles from './styles.module.scss'



export const Map = () => {
    const dataset = useAppSelector(({ dataset }) => dataset.selectedDataset)
    const { style: mapStyle, zoom: mapZoom, center: mapCenter } = useAppSelector(({ mapbox }) => mapbox)
    const mapboxInstance = useRef<mapboxgl.Map>()
    const mapboxContainer = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()


    const { data, isFetching } = datasetApi.useGetDatasetGeoByIdQuery({ datasetId: dataset.Id! }, {
        skip: !dataset.Id
    })

    mapboxInstance.current?.resize()

    useEffect(() => {
        if (!data || !mapboxInstance.current) return
        AddLayerFromSource(mapboxInstance.current, data)
    }, [data])

    useEffect(() => {
        if (dataset.Id === 0 && mapboxInstance.current) ClearMap(mapboxInstance.current)
    }, [dataset.Id])

    useEffect(() => {
        if (!mapboxContainer.current) return
        mapboxInstance.current = new mapboxgl.Map({
            accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
            container: mapboxContainer.current,
            zoom: mapZoom,
            style: mapStyle,
            center: mapCenter
        })
        mapboxInstance.current.on('load', (e) => InitMapEvents(mapboxInstance.current!, dispatch))
    }, [])

    return (
        <div className={styles.map}>
            {isFetching ? <Loader /> : null}
            <div ref={mapboxContainer} className={styles.mapboxContainer}>

            </div>
        </div>
    )
}