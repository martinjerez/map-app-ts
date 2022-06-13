import {ChangeEvent, useContext, useRef} from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from '.';

export const SearchBar = () => {

    const { searchPlacesByQuery } = useContext(PlacesContext)

    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChange = (e:ChangeEvent<HTMLInputElement>) => {

        if( debounceRef.current ){
            clearTimeout( debounceRef.current );
        }
        debounceRef.current = setTimeout(() => {
            //algo aqui
            searchPlacesByQuery(e.target.value)
        }, 350);

    }






  return (
    <div className="search-container">
        <input
            type="text"
            className="form-control"
            placeholder="Buscar Lugar..."
            onChange={onQueryChange}
        />
        <SearchResults />
    </div>
  )
}
