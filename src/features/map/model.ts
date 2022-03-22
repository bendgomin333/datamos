import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import mapboxgl from "mapbox-gl"
import React from "react"
import { AppDispatch } from "../../app/store"
import { setSelectedFeatures } from "../dataset/slice"

type TMapboxState = {
    mapInstance: mapboxgl.Map | undefined,
    zoom: number,
    style: string,
    center: mapboxgl.LngLatLike,
}

const initialState: TMapboxState = {
    mapInstance: undefined,
    zoom: 10,
    style: 'mapbox://styles/mapbox/light-v10',
    center: { lng: 37.6227, lat: 55.7464 },
}

const layers = ['dataset-points', 'dataset-polygons', 'dataset-lines']

let hoveredIdState = ''

export const InitMapEvents = (map: mapboxgl.Map, dispatch: AppDispatch) => {
    for (let layer of layers) {
        map.on('mousemove', layer, (e) => {
            if (e.features!.length <= 0) return
            map.getCanvas().style.cursor = 'pointer'
            if (e.features![0].id !== hoveredIdState) {
                map.setFeatureState({ source: 'dataset-source', id: hoveredIdState }, { hover: false })
                hoveredIdState = `${e.features![0].id}`
            }
            map.setFeatureState({ source: 'dataset-source', id: hoveredIdState }, { hover: true })
        })
        map.on('mouseleave', layer, (e) => {
            map.getCanvas().style.cursor = 'inherit'
            map.setFeatureState({ source: 'dataset-source', id: hoveredIdState }, { hover: false })
            hoveredIdState = ''
        })
        map.on('click', layer, (e) => {
            const bbox: any = [
                [e.point.x - 1, e.point.y - 1],
                [e.point.x + 1, e.point.y + 1]
            ];

            const selectedFeatures = map.queryRenderedFeatures(bbox, {
                layers: [layer]
            });

            dispatch(setSelectedFeatures(selectedFeatures.map(feature => JSON.parse(feature.properties?.Attributes))))
        })
    }
}

export const ClearMap = (map: mapboxgl.Map) => {
    try {
        if (map.getLayer('dataset-points')) map.removeLayer('dataset-points')
        if (map.getLayer('dataset-polygons')) map.removeLayer('dataset-polygons')
        if (map.getLayer('dataset-lines')) map.removeLayer('dataset-lines')
        if (map.getSource('dataset-source')) map.removeSource('dataset-source')
    } catch (err) {
        console.error(err)
    }
}

const hoverCase = ["case", ["boolean", ["feature-state", "hover"], false]]

export const AddLayerFromSource = (map: mapboxgl.Map, data: any) => {
    ClearMap(map)
    map.addSource('dataset-source', {
        type: 'geojson',
        data,
        generateId: true,
    })

    map.addLayer({
        id: 'dataset-points',
        type: 'circle',
        paint: {
            "circle-color": "#473db1",
            "circle-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1, 0.85
            ],
            "circle-radius": {
                "base": 5,
                "stops": [
                    [10, 4],
                    [12, 6],
                    [14, 8],
                    [16, 11]
                ]
            },
            "circle-stroke-color": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                "#473db1", "white"
            ],
            "circle-stroke-width": 1
        },
        source: 'dataset-source',
        filter: ['all', ['match', ["geometry-type"], ['Point', 'MultiPoint'], true, false]]
    })

    map.addLayer({
        id: 'dataset-lines',
        type: 'line',
        paint: {
            "line-color": "#473db1",
            "line-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1, 0.85
            ],
            'line-width': [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                5, 3.5
            ]
        },
        source: 'dataset-source',
        filter: ['all', ['match', ["geometry-type"], ['MultiLineString', 'LineString'], true, false]],

    })

    map.addLayer({
        id: 'dataset-polygons',
        type: 'fill',
        paint: {
            "fill-color": "#473db1",
            "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.88, 0.6
            ]
        },
        source: 'dataset-source',
        filter: ['all', ['match', ["geometry-type"], ['Polygon', 'MultiPolygon'], true, false]],

    })
}


export const mapboxSlice = createSlice({
    name: 'mapbox',
    initialState,
    reducers: {

    }
})


export { }