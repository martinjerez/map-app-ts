import axios from "axios";

const directionsApi = axios.create({
    baseURL:"https://api.mapbox.com/directions/v5/mapbox/driving",
    params:{
        alternatives: true,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibWFydGluY2hvMTExOTg2IiwiYSI6ImNsNGN2Zjh5djAyZGczY3Q2dHlxY3k2dDkifQ.kSe5GUQyeKkxUc4vmiUvlA'
    }
})

export default directionsApi;