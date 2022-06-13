import axios from "axios";

const searchApi = axios.create({
    baseURL:"https://api.mapbox.com/geocoding/v5/mapbox.places",
    params:{
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoibWFydGluY2hvMTExOTg2IiwiYSI6ImNsNGN2Zjh5djAyZGczY3Q2dHlxY3k2dDkifQ.kSe5GUQyeKkxUc4vmiUvlA'
    }
})

export default searchApi;