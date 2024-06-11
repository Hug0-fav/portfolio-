const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const search = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcons = document.querySelector(".weather-icons");
const weather = document.querySelector(".weather");

const APIKey = "a5c92d8a2d76063ba7576ebca745ad71";
const apiUrl = "";
const key = async function (city) {
  const res = await fetch(
    `
      https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}&units=metric
      `
  );

  if (res.status == 404) {
    cityName.innerHTML = "invalid city name";
    weather.style.display = "none";
  } else {
    const data = await res.json();

    cityName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = Math.round(data.main.humidity) + "%";
    wind.innerHTML = Math.round(data.wind.speed) + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcons.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcons.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcons.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcons.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcons.src = "images/snow.png";
    }

    weather.style.display = "block";

    console.log(res, data);
  }
};

searchBtn.addEventListener("click", () => {
  key(searchBox.value);
});
