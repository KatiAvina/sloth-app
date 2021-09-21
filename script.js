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
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let p = document.querySelector("p");
  p.innerHTML = description;
  let temperatureElement = document.querySelector("#celsius-temperature");
  temperatureElement.innerHTML = `${temperature}°`;
  document.querySelector("h1").innerHTML = response.data.name;
  if (temperature <= 5) {
    document.getElementById("sloth").src = "image/sloth2.jpg";
  }
  if (temperature > 5) {
    document.getElementById("sloth").src = "image/sloth6.jpg";
  }
  if (temperature > 10) {
    document.getElementById("sloth").src = "image/sloth3.jpg";
  }
  if (temperature > 15) {
    document.getElementById("sloth").src = "image/sloth5.jpg";
  }
  if (temperature > 20) {
    document.getElementById("sloth").src = "image/sloth4.jpg";
  }
  if (temperature > 30) {
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

let img = document.querySelector("img");
img.addEventListener("click", getCurrentPosition);
