
// temp map
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbzYiLCJhIjoiY2xmazRpa2VzMDdiZDN0czR5Z2tiMGxheCJ9.GMZxHYFG0rGU8R6133k1kg';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12',
center: [-1.0, 8.7], // starting position [lng, lat]
zoom: 5.5 // starting zoom
}); 


const openWeatherMapLayer = {
  id: 'openweathermap-layer',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=fd47e14dc779c51029291bd5188d9262',
    ],
    tileSize: 256,
  },
  minzoom: 0,
  maxzoom: 18,
};


 
  const majorCities = [
    { name: 'Ahafo Region', coordinates: [-2.5350966,6.916885199407648] },
    { name: 'Ashanti Region', coordinates: [-1.6230404,6.698081] },
    { name: 'Bono East Region', coordinates: [-1.0876492,7.803523599391317] },
    { name: 'Bono Region', coordinates: [-2.4735401,7.67617909939243] },
    { name: 'Central Region', coordinates: [-1.2430793,5.107467] },
    { name: 'Eastern Region', coordinates: [-0.3770964,6.44687699942423] },
    { name: 'Greater Accra Region', coordinates: [-0.2012376,5.5571096] },
    { name: 'North East Region', coordinates: [-0.5410794,10.395977299459267] },
    { name: 'Northern Region', coordinates: [-0.39437989999999995,9.66000049942276] },
    { name: 'Oti Region', coordinates: [0.318598,7.86338719939094] },
    { name: 'Savannah Region', coordinates: [-1.7111234,9.140065399405014] },
    { name: 'Upper West Region', coordinates: [-2.0921426,10.366952499457586] },
    { name: 'Volta Region', coordinates: [0.4556055,6.534862399420721] },
    { name: 'Western North Region', coordinates: [-2.8234891,6.227936699433756] },
    { name: 'Western Region', coordinates: [-1.7519316,4.887401] },
    { name: 'WA', coordinates: [-2.5054273,10.0623261] },
    { name: 'Sunyani', coordinates: [-2.3309226,7.3384389] },
    { name: 'Yendi', coordinates: [-0.0035068,9.446647] }
  // Add more cities as needed
  ];
 
// temp map

map.on('load', async() => {
  map.addLayer(openWeatherMapLayer);


  for (const city of majorCities) {
    // Make API request to OpenWeatherMap 
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coordinates[0]}&lon=${city.coordinates[1]}&appid=fd47e14dc779c51029291bd5188d9262&units=metric`);
    const data = await response.json();
    const {
      current: { weather, dt, sunrise, sunset, temp, feels_like, pressure, visibility, humidity },
      timezone
    } = data;
    const [{ description, icon }] = weather;

    // Add marker with popup for each city
 
const el = document.createElement('div');
const width = 50;
const height = 50;
el.className = 'marker';
el.style.backgroundImage = `url(./assets/images/weather_icons/${icon}.svg)`;
el.style.width = `${width}px`;
el.style.height = `${height}px`;
// el.setAttribute("viewBox", `0 0 ${width} ${height}`);
 
    new mapboxgl.Marker(el)
      .setLngLat(city.coordinates)
      .setPopup(new mapboxgl.Popup().setHTML(`  
      <div class="card" style="background-color: black; color: white;">
    <ul>
    <li>Location: ${city.name}</li>
    <li>Weather: ${description}</li>
      <li>Feels Like: ${feels_like}°C</li>
      <li>Humidity: ${humidity}<sub>%</sub></li>
      <li>Pressure: ${pressure} <sub>HPa</sub></li>
       <li>Visibility: ${(visibility /1000)}<sub>KM</sub></li>
    </ul>
  </div>`))
      .addTo(map);
  }


});



// prep maap
// prepmap
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbzYiLCJhIjoiY2xmazRpa2VzMDdiZDN0czR5Z2tiMGxheCJ9.GMZxHYFG0rGU8R6133k1kg';
const prepmap = new mapboxgl.Map({
container: 'prepmap', // container ID
style: 'mapbox://styles/mapbox/light-v11',
center: [-1.0, 8.7], // starting position [lng, lat]
zoom: 5.5 // starting zoom
}); 

const openWeatherMapLayerPrep = {
  id: 'prepmap-layer',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=fd47e14dc779c51029291bd5188d9262',
    ],
    tileSize: 256,
  },
  minzoom: 0,
  maxzoom: 18,
};

 
prepmap.on('load', async() => {
  prepmap.addLayer(openWeatherMapLayerPrep);


});
