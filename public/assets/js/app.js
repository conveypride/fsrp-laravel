import { fetchData, url,  } from "./api.js";

import * as module from "./module.js";

/**
 * Add event listener on multiple elements
 * @param {NodeList} elements Eelements node array
 * @param {string} eventType Event Type e.g.: "click", "mouseover"
 * @param {Function} callback Callback function
 */
// Get the CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
 

// function googleTranslateElementInit() {
//   new google.translate.TranslateElement(
// {pageLanguage: 'en', includedLanguages: 'en,fr,ak,ha,ee,nzi,gaa'},
// 'language',

//   )

// }

// googleTranslateElementInit();


const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
}

var svgContent;
/**
 * Toggle search in mobile devices
 */
const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);

/**
 * SEARCH INTEGRATION
 */
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const serachTimeoutDuration = 500;

searchField.addEventListener("input", function () {

  searchTimeout ?? clearTimeout(searchTimeout);

  if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
  } else {
    searchField.classList.add("searching");
  }

  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      fetchData(url.geo(searchField.value), function (locations) {
        searchField.classList.remove("searching");
        searchResult.classList.add("active");
        searchResult.innerHTML = `
          <ul class="view-list" data-search-list></ul>
        `;

        const /** {NodeList} | [] */ items = [];

        for (const { name, lat, lon, country, state } of locations) {
          const searchItem = document.createElement("li");
          searchItem.classList.add("view-item");

          searchItem.innerHTML = `
            <span class="m-icon">location_on</span>

            <div>
              <p class="item-title">${name}</p>

              <p class="label-2 item-subtitle">${state || ""} ${country}</p>
            </div>

            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
          `;

          searchResult.querySelector("[data-search-list]").appendChild(searchItem);
          items.push(searchItem.querySelector("[data-search-toggler]"));
        }

        addEventOnElements(items, "click", function () {
          toggleSearch();
          searchResult.classList.remove("active");
        })
      });
    }, serachTimeoutDuration);
  }

});


const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
const errorContent = document.querySelector("[data-error-content]");

/**
 * Render all weather data in html page
 * 
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export const updateWeather = async function (lat, lon) {

  var responsee = await fetch('/getparameters');
  if (!responsee.ok) {
    alert('Failed to fetch data from Laravel');
  }
  
  const data = await responsee.json(); 
  console.log(data);



  loading.style.display = "grid";
  container.style.overflowY = "hidden";
  container.classList.remove("fade-in");
  errorContent.style.display = "none";

  const currentWeatherSection = document.querySelector("[data-current-weather]");
  const highlightSection = document.querySelector("[data-highlights]");
  const hourlySection = document.querySelector("[data-hourly-forecast]");
  const days14Section = document.querySelector("[data-days14-forecast]");
  const forecastSection = document.querySelector("[ data-7-day-forecast]");
  const forecast7daysSmall = document.querySelector("[ data-day7s-forecast]");
  const forecast14days = document.querySelector("[  data-days14-forecast ]");
  const daysummary = document.querySelector("#daysummary");
 const nightsummary = document.querySelector("#nightsummary");
 const water = document.querySelector("#water");
const pestdisease = document.querySelector("#pestdisease");
const weedrate = document.querySelector("#weedrate");
const farmact = document.querySelector("#farmact");

  farmact.innerHTML = "";
  weedrate.innerHTML = "";
  pestdisease.innerHTML = "";
  currentWeatherSection.innerHTML = "";
  highlightSection.innerHTML = "";
  hourlySection.innerHTML = "";
  days14Section.innerHTML = "";
  forecastSection.innerHTML = "";
  forecast7daysSmall.innerHTML = "";
  nightsummary.innerHTML = "";
  daysummary.innerHTML = "";
   water.innerHTML = "";
  forecast14days.innerHTML = "";

  if (window.location.hash === "#/current-location") {
    currentLocationBtn.setAttribute("disabled", "");
  } else {
    currentLocationBtn.removeAttribute("disabled");
  }

// day or night function
function getDayOrNight() {
  // Get the current date and time
  var currentTime = new Date();
  
  // Extract the current hour from the time
  var currentHour = currentTime.getHours();

  // Define the threshold values for day and night (you can adjust these as needed)
  var dayStart = 6;   // 6:00 AM
  var dayEnd = 18;    // 6:00 PM

  // Check if the current hour is within the day or night range
  if (currentHour >= dayStart && currentHour < dayEnd) {
    return "day";
  } else {
    return "night";
  }
}


const timeOfDay = getDayOrNight();

 


  /**
   * CURRENT WEATHER SECTION
   */
  fetchData(url.currentWeather(lat, lon), function (currentWeather) {
   
    const {
      current: { weather, dt, sunrise, sunset, temp, feels_like, pressure, visibility, humidity },
      timezone
    } = currentWeather
    const [{ description, icon }] = weather;

// console.log(timezone);
// console.log(dt);
    const card = document.createElement("div");
    card.classList.add("card", "card-lg", "current-weather-card");
// Set the background image using inline style
if (timeOfDay == "day") {
  card.style.backgroundImage = 'url("./assets/images/sky-day.jpg")';
} else {
  card.style.backgroundImage = 'url("./assets/images/night-sky.jpg")';
}



console.log(currentWeather);
if (humidity > 60) {
  water.innerHTML = 'Low <sub class="greenn">ooo</sub>';
  pestdisease.innerHTML = 'High <sub class="redd">ooo</sub>';
  weedrate.innerHTML = 'High <sub class="redd">ooo</sub>';
  farmact.innerHTML = 'Normal <sub class="yelloww"> ooo</sub>';

} else if (humidity < 60) {
  water.innerHTML = 'High <sub class="redd">ooo</sub>';
  weedrate.innerHTML = 'Low <sub class="redd">ooo</sub>';
  farmact.innerHTML = 'Normal <sub class="yelloww"> ooo</sub>';
}


card.style.backgroundSize = 'cover'; 


  daysummary.textContent = `The weather is expected to be ${description}, with temperature  reaching an average of ${temp} °C. However, humidity is expected to be ${humidity} % with pressure reaching ${pressure} hPa`;
  nightsummary.textContent =  `During the night period, visibility is expected to hit ${visibility / 1000} km, with the sunsetting at ${module.getTime(sunset, timezone)} `;




    card.innerHTML = `
      <h2 class="title-2 card-title">${data.now}</h2>

      <div class="weapper">
        <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>

        <img src="./assets/images/weather_icons/${icon}.svg"  alt="${description}" class=" larger-svg">
       
      </div>

      <p class="body-3">${description}</p>

      <ul class="meta-list">

        <li class="meta-item">
          <span class="m-icon">calendar_today</span>

          <p class="title-3 meta-text">${module.getDate(dt, timezone)}</p>
        </li>

        <li class="meta-item">
          <span class="m-icon">location_on</span>

          <p class="title-3 meta-text" data-location></p>
        </li>

      </ul>
    `;

    fetchData(url.reverseGeo(lat, lon), function ([{ name, country }]) {
      card.querySelector("[data-location]").innerHTML = `${name}, ${country}`
    });

    currentWeatherSection.appendChild(card);

    /**
     * TODAY'S HIGHLIGHTS
     */
    fetchData(url.airPollution(lat, lon), function (airPollution) {
      // console.log(airPollution);
      const [{
        main: { aqi },
        components: { no2, o3, so2, pm2_5 }
      }] = airPollution.list;

      const card = document.createElement("div");
      card.classList.add("card", "card-lg");
      if (timeOfDay == "day") {
        card.style.backgroundImage = 'url("./assets/images/sky-day1.jpg")';
      } else {
        card.style.backgroundImage = 'url("./assets/images/night-sky.jpg")';
      }

      // card.style.backgroundImage = 'url("/assets/images/sky-day.jpg")';
      card.style.backgroundSize = 'cover';
      card.innerHTML = `
        <h2 class="title-2" id="highlights-label">${data.highlight}</h2>

        <div class="highlight-list">

          <div class="card card-sm highlight-card one">

            <h3 class="title-3">${data.airquality}</h3>

            <div class="wrapper">

              <span class="m-icon">air</span>

              <ul class="card-list">

                <li class="card-item">
                  <p class="title-1">${pm2_5.toPrecision(3)}</p>

                  <p class="label-1">PM<sub>2.5</sub></p>
                </li>

                <li class="card-item">
                  <p class="title-1">${so2.toPrecision(3)}</p>

                  <p class="label-1">SO<sub>2</sub></p>
                </li>

                <li class="card-item">
                  <p class="title-1">${no2.toPrecision(3)}</p>

                  <p class="label-1">NO<sub>2</sub></p>
                </li>

                <li class="card-item">
                  <p class="title-1">${o3.toPrecision(3)}</p>

                  <p class="label-1">O<sub>3</sub></p>
                </li>

              </ul>

            </div>

            <span class="badge aqi-${aqi} label-${aqi}" title="${module.aqiText[aqi].message}">
              ${module.aqiText[aqi].level}
            </span>

          </div>

          <div class="card card-sm highlight-card two">

            <h3 class="title-3">${data.sun}</h3>

            <div class="card-list">

              <div class="card-item">
                <span class="m-icon">clear_day</span>

                <div>
                  <p class="label-1">${data.sunrise}</p>

                  <p class="title-1">${module.getTime(sunrise, timezone)}</p>
                </div>
              </div>

              <div class="card-item">
                <span class="m-icon">clear_night</span>

                <div>
                  <p class="label-1">${data.sunset}</p>

                  <p class="title-1">${module.getTime(sunset, timezone)}</p>
                </div>
              </div>

            </div>

          </div>

          <div class="card card-sm highlight-card three">

            <h3 class="title-3">${data.meaning} </h3>

            <p class="title-3">${module.aqiText[aqi].message}</p>

              </div>

         

          

          <div class="card card-sm highlight-card">

            <h3 class="title-3">${data.humidity}</h3>

            <div class="wrapper">
              <span class="m-icon">humidity_percentage</span>

              <p class="title-1">${humidity}<sub>%</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">${data.pressure}</h3>

            <div class="wrapper">
              <span class="m-icon">airwave</span>

              <p class="title-1">${pressure}<sub>hPa</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">${data.visibility}</h3>

            <div class="wrapper">
              <span class="m-icon">visibility</span>

              <p class="title-1">${visibility / 1000}<sub>km</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">${data.feelslike}</h3>

            <div class="wrapper">
              <span class="m-icon">thermostat</span>

              <p class="title-1">${parseInt(feels_like)}&deg;<sup>c</sup></p>
            </div>

          </div>

        </div>
      `;

      highlightSection.appendChild(card);

    });

  }); 

    /**
     * 24H FORECAST SECTION
     */
    fetchData(url.forecast(lat, lon), function (forecast) {

      const {
        hourly,
        timezone,
        daily
      } = forecast;

      // console.log(forecast);

      hourlySection.innerHTML = `
          <h2 class="title-2">${data.todatAt}</h2>
          <div class="slider-container">
              <ul class="slider-list" data-temp></ul>
              <ul class="slider-list" data-wind></ul>
          </div>
      `;


      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      for (let i = 0; i < hourly.length; i += 1) {
        const data = hourly[i];

        const {
          dt,
          temp,
          weather,
          wind_deg,
          wind_speed
        } = data;

        const hourlyDate = new Date(dt * 1000);
        const hourlyDay = hourlyDate.getDate();

        if (hourlyDay === currentDay) {
          const [{
            icon,
            description
          }] = weather;

          const tempLi = document.createElement("li");
          tempLi.classList.add("slider-item");
          
          tempLi.innerHTML = `
                  <div class="card card-sm slider-card">
                      <p class="body-3">${module.getHours(dt, timezone)}</p>
                      <img src="./assets/images/weather_icons/${icon}.svg" width="48" height="48" loading="lazy" alt="${description}" class="weather-icon small-svg" title="${description}">
                      <p class="body-3">${parseInt(temp)}&deg;</p>
                  </div>
              `;
          hourlySection.querySelector("[data-temp]").appendChild(tempLi);

          const windLi = document.createElement("li");
          windLi.classList.add("slider-item");

          windLi.innerHTML = `
                  <div class="card card-sm slider-card">
                      <p class="body-3">${module.getHours(dt, timezone)}</p>
                      <img src="./assets/images/weather_icons/weather_sagittarius.svg" width="28" height="28" loading="lazy" alt="direction" class="xsmall-svg" style="transform: rotate(${wind_deg - 180}deg)">
                      <p class="body-3">${parseInt(module.mps_to_kmh(wind_speed))} km/h</p>
                  </div>
              `;
          hourlySection.querySelector("[data-wind]").appendChild(windLi);
        }
      }

      /**
       * 7 DAY FORECAST SECTION
       */
      //  <div class="card card-lg forecast-card">
      //   <ul data-forecast-listsm>  </ul>
      // </div>

      // 7 days small devices
       forecast7daysSmall.innerHTML = `
      <h2 class="title-2 smdays" id="forecast-labelsm">${data.sevendaysForecast}</h2>
      <div class="slider-container">
      <ul class="slider-list" data-temp data-forecast-listsm></ul>
      <ul class="slider-list" data-wind></ul>
  </div>

    `;

//7 days big devices 
      forecastSection.innerHTML = `
        <h2 class="title-2 big7days" id="forecast-label">${data.sevendaysForecast}</h2>

        <div class="card card-lg forecast-card" >
          <ul data-forecast-list>  </ul>
        </div>
      `;
      forecast14days.innerHTML = `
      <h2 class="title-2 days14" id="forecast-label14">${data.currentprecipMap}</h2>
      `;


//  7 days forecast
      for (let i = 0; i < 7 && i < daily.length; i++) {

        const data = daily[i];

        const {
          temp: { max: temp_max },
          weather,
          dt
        } = data;
        const [{ icon, description }] = weather;
        const date = new Date(dt * 1000);

        const li = document.createElement("li");
        const lism = document.createElement("li");
        li.classList.add("card-item");
        lism.classList.add("card-item");

        li.innerHTML = `
          <div class="icon-wrapper">
            <img src="./assets/images/weather_icons/${icon}.svg" width="36" height="36" alt="${description}"
              class="weather-icon small-svg" title="${description}">

            <span class="span">
              <p class="title-2">${parseInt(temp_max)}&deg;</p>
            </span>
          </div>

          <p class="label-1">${date.getDate()} ${module.monthNames[date.getUTCMonth()]}</p>

          <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
        `;
        lism.innerHTML = `
        <div class="card card-sm slider-card">
        <p class="body-3">${date.getDate()} ${module.monthNames[date.getUTCMonth()]}</p>
        <img src="./assets/images/weather_icons/${icon}.svg" width="48" height="48" loading="lazy" alt="${description}" class="weather-icon small-svg" title="${description}">
        <p class="body-3">${parseInt(temp_max)}&deg;</p>      
        <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
    </div>
        `;

        
        forecastSection.querySelector("[data-forecast-list]").appendChild(li);
         forecast7daysSmall.querySelector("[data-forecast-listsm]").appendChild(lism);
        
      } 

 

        //   toggling the visibility based on device type
        const smallDiv = document.querySelector('.smalldevices');
        const largeDiv = document.querySelector('.largedevices');

        // Hide the largeDiv on small devices
        if (window.matchMedia('(max-width: 767px)').matches) {
          largeDiv.style.display = 'none';
          smallDiv.style.display = 'block';

        }else if (window.matchMedia('(min-width :768px)').matches) {
            largeDiv.style.display = 'block';
            smallDiv.style.display = 'none';
        }
      loading.style.display = "none";
      container.style.overflowY = "overlay";
      container.classList.add("fade-in");
    });

    var modal = document.getElementById("myModal");

   // Get the button that opens the modal
   var btn = document.querySelector("#feedbackBtn");

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks the button, open the modal 
   btn.onclick = function() {
     modal.style.display = "block";
   }

   // When the user clicks on <span> (x), close the modal
   span.onclick = function() {
     modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
     if (event.target == modal) {
       modal.style.display = "none";
     }
   }

  //  ==========================================================feedback section========================

// Send the audio data to the server
document.getElementById("submitbttn").addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("submitbttn").textContent = 'Sending...';
 // Create FormData object to send the audio blob to the server
 const formData = new FormData(); 
 const textMessage = document.getElementById("w-input-text").innerText.trim();
   formData.append("textMessage", textMessage);
 
 // Example: Send the audio data to a server using fetch
 fetch('/upload-recording', {
   method: 'POST',
   headers: {
       'X-CSRF-TOKEN': csrfToken,
   },
   body: formData,

 })
   .then((response) => response.json())
   .then((data) => {
    document.getElementById("w-input-text").innerText = ' ';
     document.getElementById("submitbttn").textContent = 'Sent Successfully';
     console.log('Server response:', data);
   })
   .catch((error) => {
    document.getElementById("submitbttn").textContent = 'Error';
     console.error('Error sending text to server:', error);
   });

 
});

  const recordAudio = () =>
  new Promise(async (resolve) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise((resolve) => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });
        mediaRecorder.stop();
      });
    resolve({ start, stop });
  });

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

var record = true;

const startRecording = async () => {
  const recording = await recordAudio();
  const recorder = document.getElementById("recorder");
  recorder.disabled = true;
  recording.start();
  while (record == true) {
    await sleep(1);
  }
  const audio = await recording.stop();
  await sleep(2000);
  audio.play();

  // Send the audio data to the server
  document.getElementById("submitbttn").addEventListener("click", async (e) => {
    e.preventDefault();
    document.getElementById("submitbttn").textContent = 'Sending...';


  sendAudioToServer(audio);
  });
  recorder.disabled = false;
};





const sendAudioToServer = (audioData) => {
  // Create FormData object to send the audio blob to the server
  const formData = new FormData();
  formData.append('audioFile', audioData.audioBlob, 'recorded_audio.wav'); // Change the filename accordingly
  const textMessage = document.getElementById("w-input-text").innerText.trim();
    formData.append("textMessage", textMessage);
  
  // Example: Send the audio data to a server using fetch
  fetch('/upload-recording', {
    method: 'POST',
    headers: {
        'X-CSRF-TOKEN': csrfToken,
    },
    body: formData,

  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("submitbttn").textContent = 'Sent Successfully';
      console.log('Server response:', data);
    })
    .catch((error) => {
      console.error('Error sending audio to server:', error);
      document.getElementById("submitbttn").textContent = 'Error';
    });
};





document.getElementById("recorder").addEventListener("click", (e) => {
  if (document.getElementById("recorder").classList.contains("recording")) {
    document.getElementById("recorder").classList.remove("recording");
    document.getElementById("recorder").classList.add("download");
    record = false;




    setTimeout(function () {
      document.getElementById("recorder").classList.remove("download");
      document.getElementById("recorder").classList.add("out");
    }, 1000);
  } else if (
    !document.getElementById("recorder").classList.contains("recording") &&
    !document.getElementById("recorder").classList.contains("download")
  ) {
    document.getElementById("recorder").classList.remove("out");
    document.getElementById("recorder").classList.add("recording");
    record = true;
    startRecording();
  }
});

// function setFocus () {
//   document.getElementById('w-input-text').focus();
// }


  const forecastcontainer = document.querySelector(".forecastcontainer");
  forecastcontainer.innerHTML = "";

  document
  .getElementById('lightPreset')
  .addEventListener('change', async function() {
    forecastcontainer.innerHTML = "";
 // Make API request to OpenWeatherMap 
 const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall/day_summary?${lat}&${lon}&date=${this.value}&appid=fd47e14dc779c51029291bd5188d9262&units=metric`);
 const data = await response.json();

 const {
  temperature,
  wind,
   date, 
   humidity,
   pressure,
} = data;

console.log(data);
//  document.getElementById("datee").value = date;

var modal = document.getElementById("dateforecastModal");

 

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      const card = document.createElement("div");
      card.classList.add("card", "card-lg");
      // if (timeOfDay == "day") {
      //   card.style.backgroundImage = 'url("/assets/images/sky-day1.jpg")';
      // } else {
      //  'url("/assets/images/night-sky.jpg")';
      // }
      card.style.backgroundColor = '#2d70c1';

      // card.style.backgroundImage = 'url("/assets/images/sky-day.jpg")';
      card.style.backgroundSize = 'cover';
      card.innerHTML = `
        <h2 class="title-2" id="highlights-label">Forecast For ${date}</h2>

        <div class="highlight-list">
          <div class="card card-sm highlight-card">

            <h3 class="title-3">Humidity</h3>

            <div class="wrapper">
              <span class="m-icon">humidity_percentage</span>

              <p class="title-1">${humidity['afternoon']}<sub>%</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Pressure</h3>

            <div class="wrapper">
              <span class="m-icon">airwave</span>

              <p class="title-1">${pressure['afternoon']}<sub>hPa</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Wind Speed</h3>

            <div class="wrapper">
              <span class="m-icon">speed</span>

              <p class="title-1">${parseInt(module.mps_to_kmh(wind['max'].speed))}<sub>km</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Feels Like</h3>

            <div class="wrapper">
              <span class="m-icon">thermostat</span>

              <p class="title-1">${parseInt(temperature.max)}&deg;<sup>c</sup></p>
            </div>

          </div>

        </div>
      `;

      forecastcontainer.appendChild(card);
 


  });


  // JavaScript to populate options with dates
 
    var select = document.getElementById('lightPreset');
    var today = new Date();

    // Populate options for the next 1 year
    for (var i = 0; i < 365; i++) {
      var date = new Date(today);
      date.setDate(today.getDate() + i);

      var option = document.createElement('option');
      option.value = formatDate(date);
      option.textContent = formatOptionText(date);
      select.appendChild(option);
    }

    // Function to format date as "YYYY-MM-DD"
    function formatDate(date) {
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      return year + '-' + month + '-' + day;
    }

    // Function to format option text as "3rd Sep 2023"
    function formatOptionText(date) {
      var day = date.getDate();
      var month = date.toLocaleString('en-us', { month: 'short' });
      var year = date.getFullYear();
      return day + getOrdinalSuffix(day) + ' ' + month + ' ' + year;
    }

    // Function to get ordinal suffix for day (st, nd, rd, th)
    function getOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }

      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

// submit weather warning details
// document.getElementById('weatherForm').addEventListener('submit', function (event) {
//   event.preventDefault();
//   alert("Submited Successfully")
//   console.log('Form submitted with data:', {
//       contact: document.getElementById('contact').value,
//       email: document.getElementById('email').value,
//       options: document.getElementById('options').checked
//   });
// });





}





export const error404 = () => errorContent.style.display = "flex";