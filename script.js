Weather:{
  const getWeatherButton = document.getElementById("get-weather-button");
  var count = 0
  getWeatherButton.onclick = function(){
    if(count == 0){
      document.getElementById("location-div").style.display = "block";
      count = 1;
    }
    else{
      document.getElementById("location-div").style.display = "none";
      count = 0;
    }
  }
  const weatherCity = document.getElementById("weather-city");
  const cityNameInput = localStorage.getItem('citynameinput');
  document.getElementById('change-location-but').onclick = async function(){
    const cityNameInput = document.getElementById('change-location-inp').value
    // console.log(cityNameInput)
    const city = cityNameInput;
    localStorage.setItem('citynameinput', cityNameInput);
      if (!city) return alert("Please enter a city name");
      const response = await getCurrentWeather(city);
      const response5 = await getCurrentWeather5(city);
      const weatherData = extractWeatherData(response);
      const weatherData5 = extractWeatherData5(response5);
      displayWeather(weatherData);
      displayWeather5(weatherData5);
      cityNameInput.value = "";
      document.getElementById('change-location-inp').value = "";
      document.getElementById("location-div").style.display = "none";
      count = 0;
      // weatherCity.innerHTML = "© " + qcity;
  }
  const weatherDescriptionContainer = document.getElementById("weather-status");
  const weatherIconContainer = document.getElementById("weather-status-img");
  const temperatureContainer = document.getElementById("weather-temperature");
  const windSpeedContainer = document.getElementById("weather-wind")
  const weatherHumidityContainer = document.getElementById("weather-humidity")
  const weatherCloudsContainer = document.getElementById("weather-clouds")
  const weatherTemperature25 = document.getElementById("tempday2")
  const weatherIconContainer25 = document.getElementById("weather-icon2")
  const weatherTemperature35 = document.getElementById("tempday3")
  const weatherIconContainer35 = document.getElementById("weather-icon3")
  const weatherTemperature45 = document.getElementById("tempday4")
  const weatherIconContainer45 = document.getElementById("weather-icon4")
  const weatherTemperature55 = document.getElementById("tempday5")
  const weatherIconContainer55 = document.getElementById("weather-icon5")


  const apiKey = "b52252e1bd3476b3e33f8ed2df16dcb7";


  async function getCurrentWeather5(city) {
    try {
        const url5 = new URL("https://api.openweathermap.org/data/2.5/forecast");
        url5.search = new URLSearchParams(
            {
                q: city,
                appid: apiKey,
                units: "metric",
            }
        ).toString();
        const response5 = await fetch(url5);
        if (response5.ok) {
            return await response5.json();
        }
        throw new Error(`Request failed with status ${response5.status}: ${response5.statusText}`);
    } catch (error5) {
        console.error(error5);
    }
  }

  function extractWeatherData5(response5) {
    // console.log(response5)
    const temperature25 = response5.list[5].main.temp;
    const weatherIcon25 = response5.list[5].weather[0].icon;
    const weatherIconUrl25 = `http://openweathermap.org/img/wn/${weatherIcon25}.png`;
    const temperature35 = response5.list[17].main.temp;
    const weatherIcon35 = response5.list[17].weather[0].icon;
    const weatherIconUrl35 = `http://openweathermap.org/img/wn/${weatherIcon35}.png`;
    const temperature45 = response5.list[25].main.temp;
    const weatherIcon45 = response5.list[25].weather[0].icon;
    const weatherIconUrl45 = `http://openweathermap.org/img/wn/${weatherIcon45}.png`;
    const temperature55 = response5.list[33].main.temp;
    const weatherIcon55 = response5.list[33].weather[0].icon;
    const weatherIconUrl55 = `http://openweathermap.org/img/wn/${weatherIcon55}.png`;
    return {
        temperature25,
        weatherIconUrl25,
        temperature35,
        weatherIconUrl35,
        temperature45,
        weatherIconUrl45,
        temperature55,
        weatherIconUrl55,
    }
  }
  function displayWeather5(weatherData5) {
    const {temperature25, weatherIconUrl25, temperature35, weatherIconUrl35, temperature45, weatherIconUrl45, temperature55, weatherIconUrl55,} = weatherData5;
    weatherIconContainer25.src = weatherIconUrl25;
    weatherTemperature25.textContent = Math.round(temperature25) + "°C";
    weatherIconContainer35.src = weatherIconUrl35;
    weatherTemperature35.textContent = Math.round(temperature35) + "°C";
    weatherIconContainer45.src = weatherIconUrl45;
    weatherTemperature45.textContent = Math.round(temperature45) + "°C";
    weatherIconContainer55.src = weatherIconUrl55;
    weatherTemperature55.textContent = Math.round(temperature55) + "°C";
  }


  async function getCurrentWeather(city) {
    try {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.search = new URLSearchParams(
            {
                q: city,
                appid: apiKey,
                units: "metric",
            }
        ).toString();
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    } catch (error) {
        console.error(error);
    }
  }
  function extractWeatherData(response) {
      const temperature = response.main.temp;
      const weatherDescription = response.weather[0].description;
      const weatherIcon = response.weather[0].icon;
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      const windSpeed = response.wind.speed + ' km/h';
      const weatherHumidty = response.main.humidity;
      const weatherClouds = response.clouds.all + "%";
      const qcity = response.name;
      const qcountry = response.sys.country;
      return {
          temperature,
          weatherDescription,
          weatherIconUrl,
          windSpeed,
          weatherHumidty,
          weatherClouds,
          qcity,
          qcountry,
      }
  }
  function displayWeather(weatherData) {
      const { temperature, weatherDescription, weatherIconUrl, windSpeed, weatherHumidty, weatherClouds, qcity, qcountry} = weatherData;
      weatherDescriptionContainer.textContent = weatherDescription[0].toUpperCase() + weatherDescription.substr(1);
      weatherIconContainer.src = weatherIconUrl;
      temperatureContainer.textContent = Math.round(temperature) + "°C";
      windSpeedContainer.textContent = windSpeed;
      weatherHumidityContainer.textContent = weatherHumidty + "%";
      weatherCloudsContainer.textContent = weatherClouds;
      weatherCity.innerHTML = "© " + qcity + ", " + qcountry;
  }

  // getWeatherButton.addEventListener("click", async (ev) => {
      // ev.preventDefault();
  window.onload = async function(){
      const city = localStorage.getItem('citynameinput');
      if (!city) return alert("Please enter a city name");
      const response = await getCurrentWeather(city);
      const response5 = await getCurrentWeather5(city);
      const weatherData = extractWeatherData(response);
      const weatherData5 = extractWeatherData5(response5);
      displayWeather(weatherData);
      displayWeather5(weatherData5);
      // cityNameInput.value = "";
  };
}


weatherbutton: {
  var count = 0;

  if (count == 0) {
    document.getElementById("Panel").style.width = "15vw";
    document.getElementById("Panel").style.backgroundColor =
      "rgba(18, 7, 44, 0)";
    document.getElementById("WeatherNews").style.display = "none";
    count = 1;
  }
  document.getElementById("TodayPanel").onclick = function () {
    if (count == 0) {
      document.getElementById("Panel").style.width = "15vw";
      document.getElementById("Panel").style.backgroundColor =
        "rgba(18, 7, 44, 0)";
      document.getElementById("WeatherNews").style.display = "none";
      count = 1;
    } else {
      count = 0;
      document.getElementById("Panel").style.width = "32vw";
      document.getElementById("Panel").style.backgroundColor =
        "rgb(44, 44, 44)";
      setTimeout(function () {
        document.getElementById("WeatherNews").style.display = "block";
      }, 150);
    }
  };

  var date = new Date();

  var day;
  switch (date.getDay()) {
    case 0:
      day = "Sunday";
      var day2 = "Mon"
      var day3 = "Tue"
      var day4 = "Wed"
      var day5 = "Thu"
      break;
    case 1:
      day = "Monday";
      var day2 = "Tue"
      var day3 = "Wed"
      var day4 = "Thu"
      var day5 = "Fri"
      break;
    case 2:
      day = "Tuesday";
      var day2 = "Wed"
      var day3 = "Thu"
      var day4 = "Fri"
      var day5 = "Sat"
      break;
    case 3:
      day = "Wednesday";
      var day2 = "Thu"
      var day3 = "Fri"
      var day4 = "Sat"
      var day5 = "Sun"
      break;
    case 4:
      day = "Thursday";
      var day2 = "Fri"
      var day3 = "Sat"
      var day4 = "Sun"
      var day5 = "Mon"
      break;
    case 5:
      day = "Friday";
      var day2 = "Sat"
      var day3 = "Sun"
      var day4 = "Mon"
      var day5 = "Tue"
      break;
    case 6:
      day = "Saturday";
      var day2 = "Sun"
      var day3 = "Mon"
      var day4 = "Tue"
      var day5 = "Wed"
      break;
  }

  const month = date.getMonth();
  let monthtext = 0;
  switch (month) {
    case 0:
      monthtext = "Jan";
      break;
    case 1:
      monthtext = "Feb";
      break;
    case 2:
      monthtext = "Mar";
      break;
    case 3:
      monthtext = "Apr";
      break;
    case 4:
      monthtext = "May";
      break;
    case 5:
      monthtext = "Jun";
      break;
    case 6:
      monthtext = "Jul";
      break;
    case 7:
      monthtext = "Aug";
      break;
    case 8:
      monthtext = "Sep";
      break;
    case 9:
      monthtext = "Oct";
      break;
    case 10:
      monthtext = "Now";
      break;
    case 11:
      monthtext = "Dec";
      break;
  }

  document.getElementById("day").innerHTML = day;
  document.getElementById("day2").innerHTML = day2;
  document.getElementById("day3").innerHTML = day3;
  document.getElementById("day4").innerHTML = day4;
  document.getElementById("day5").innerHTML = day5;
  document.getElementById("date").innerHTML =
    date.getDate() + " " + monthtext + " " + date.getFullYear();
  console.log(day)
}
