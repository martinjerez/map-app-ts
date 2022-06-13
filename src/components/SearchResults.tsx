import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { LoadingPlaces } from ".";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
    const { isLoadingPlaces, places,  userLocation} = useContext(PlacesContext);
    const { map, getRoutesBetweenPoints } = useContext(MapContext)
    const [activePlaceId, setActivePlaceId] = useState('');

    const onPlaceClicked = ( place: Feature ) => {
        const [ lng, lat ] = place.center;
        setActivePlaceId(place.id);
        map?.flyTo({
            zoom: 14,
            center: [ lng, lat ]
        })
    }


    if(isLoadingPlaces) {
        return <LoadingPlaces />
    }

    if(places.length === 0) {
        return <></>
    }

    const getRoutes = ( place: Feature ) => {

        if(!userLocation) return;
        const [ lng, lat ] = place.center;

        getRoutesBetweenPoints(userLocation, [ lng, lat ] )
    }

    return (
        <ul className="list-group mt-3">
            {
                places.map(place => (
                    <li
                        key={place.id}
                        className={`list-group-item list-group-item-action pointer ${(activePlaceId === place.id) && "active"}`}
                        onClick={() => onPlaceClicked(place)}
                    >
                        <h6>{ place.text_es }</h6>
                        <p className="text-muted" style={{ fontSize: '12px' }}>
                        { place.place_name }
                        </p>
                        <button
                            onClick={() => getRoutes( place )}
                            className={`btn  btn-sm ${(activePlaceId === place.id) ? "btn-outline-light" : "btn-outline-primary"}`}
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}
