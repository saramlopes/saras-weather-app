// Feature 1
let now = new Date();

function formatTime(time) {
	let hour = time.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}

	let minutes = time.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${hour}:${minutes}`;
}

let currentHour = document.querySelector("#current-hour");

currentHour.innerHTML = formatTime(now);

// Date

function formatDate(date) {
	let day = date.getDay();
	let currentMonth = now.getMonth();
	let today = date.getDate();
	let year = date.getFullYear();

	let weekDay = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return `${weekDay[day]}, ${today} ${month[currentMonth]}, ${year}`;
}

let currentDate = document.querySelector("#current-day");

currentDate.innerHTML = formatDate(now);

// Temperature & location

let apiKey = "6c23ea7598ca350d235620d71c7cec0a";
let unit = "metric";
let city = "Ardrossan";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}units=${unit}`;
let celsiusActive = true;

function showTemperature(response) {
	let temperature = Math.round(response.data.main.temp);
	let temperatureElement = document.querySelector("#degreesValue");
	let description = document.querySelector("#current-weather-conditions");
	let temperatureType = document.querySelector("#degreesType");

	if (celsiusActive == true) {
		temperatureType.innerHTML = "ºC";
		temperatureElement.innerHTML = `${temperature}`;
	} else {
		let convertedTemperature = Math.round((temperature * 9) / 5 + 32);
		temperatureElement.innerHTML = `${convertedTemperature}`;
		temperatureType.innerHTML = "ºF";
	}
	description.innerHTML = response.data.weather[0].description;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function retrievePosition(position) {
	let h1 = document.querySelector("#exact-location");
	h1.innerHTML = city;
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
	navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

// FAHRENHEIT/CELSUIS FUNCTION

let celsius = document.querySelector("#celsuis-link");
let fahrenheit = document.querySelector("#fahrenheit-link");

function convertToFahrenheit(event) {
	event.preventDefault();
	if (celsiusActive == true) {
		let CurrentTemperature = document.querySelector("#degreesValue");
		let convertedTemperature = Math.round(
			(CurrentTemperature.innerHTML * 9) / 5 + 32
		);
		CurrentTemperature.innerHTML = `${convertedTemperature}`;

		let temperatureType = document.querySelector("#degreesType");
		let temperatureTypeChange = "ºF";
		temperatureType.innerHTML = `${temperatureTypeChange}`;

		celsiusActive = false;
	}
}
function convertToCelsius(event) {
	event.preventDefault();
	if (celsiusActive == false) {
		let CurrentTemperature = document.querySelector("#degreesValue");
		let convertedTemperature = Math.round(
			((CurrentTemperature.innerHTML - 32) * 5) / 9
		);
		CurrentTemperature.innerHTML = `${convertedTemperature}`;

		let temperatureType = document.querySelector("#degreesType");
		let temperatureTypeChange = "ºC";
		temperatureType.innerHTML = `${temperatureTypeChange}`;
		celsiusActive = true;
	}
}
celsius.addEventListener("click", convertToCelsius);
fahrenheit.addEventListener("click", convertToFahrenheit);

//F2

function cityDisplay(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#search-input").value;
	let location = document.querySelector("#exact-location");
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${unit}`;
	location.innerHTML = `${cityInput}`;
	axios.get(apiUrl).then(showTemperature);
}

let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", cityDisplay);
