import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluY2hvMTExOTg2IiwiYSI6ImNsNGN2Zjh5djAyZGczY3Q2dHlxY3k2dDkifQ.kSe5GUQyeKkxUc4vmiUvlA';


if(!navigator.geolocation) {
  alert("tu navegador no tiene opcion de geolocation");
  throw new Error("tu navegador no tiene opcion de geolocation");
}



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
