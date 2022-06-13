import { useContext, useEffect, useReducer } from 'react';


import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { PlacesContext } from '../';
import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';

import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach(marker => marker.remove())
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(`
                                <h6>${place.text_es}</h6>
                                <p>${place.place_name_es}</p>
                            `);
            const newMarker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!);
            newMarkers.push(newMarker)
        };

        // todo: limpiar polyline
        dispatch({type:'setMarkers', payload: newMarkers})

    }, [places])


    const setMap = (map: Map) => {

        const myLocationPopup = new Popup().setHTML(`
            <h4>Aqui estoy</h4>
            <p>En algun lugar del mundo</p>
        `);

        new Marker({
            color: '#61DAFB'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map)

        dispatch({ type: 'setMap', payload: map })
    }

    const getRoutesBetweenPoints = async ( start: [number, number], end:[number, number] ) => {

        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms /= 100;
        const minutes = Math.floor( duration / 60 );

        const bounds = new LngLatBounds(
            start,
            start
        );
        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend( newCoord );
        }
        state.map?.fitBounds( bounds, {
            padding: 100
        } );
        // polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [ 
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }
        // remover polyline si no existe}
        if( state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }
        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id:'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })

    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRoutesBetweenPoints
        }}>
            {children}
        </MapContext.Provider>
    )
}










