let currentDayTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDayTime.getDay()];
let hours = currentDayTime.getHours();
let minutes = ("0" + currentDayTime.getMinutes()).slice(-2);

let newDate = document.querySelector("#day-date");
newDate.innerHTML = `${day}, ${hours}:${minutes}`;
if (hours >= 12) {
  newDate.innerHTML = `${day}, ${hours}:${minutes} pm`;
} else {
  newDate.innerHTML = `${day}, ${hours}:${minutes} am`;
}

function citySearched(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-feedback");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "1e19bc6d029afb56c38b6d325a7b6f3e";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#location-question");
cityForm.addEventListener("submit", citySearched);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#celsius-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("h1").innerHTML = response.data.name;
  if (temperatureElement.innerHTML <= 5) {
    document.getElementById("sloth").src = "image/sloth2.jpg";
  }
  if (temperatureElement.innerHTML > 5) {
    document.getElementById("sloth").src = "image/sloth6.jpg";
  }
  if (temperatureElement.innerHTML > 10) {
    document.getElementById("sloth").src = "image/sloth3.jpg";
  }
  if (temperatureElement.innerHTML > 15) {
    document.getElementById("sloth").src = "image/sloth5.jpg";
  }
  if (temperatureElement.innerHTML > 20) {
    document.getElementById("sloth").src = "image/sloth4.jpg";
  }
  if (temperatureElement.innerHTML > 30) {
    document.getElementById("sloth").src = "image/sloth.jpg";
  }
}

function searchLocation(position) {
  let key = "1e19bc6d029afb56c38b6d325a7b6f3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let img = document.querySelector("#sloth");
img.addEventListener("click", getCurrentPosition);

let celsiusTemperature = "26";

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#celsius-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celsius-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
