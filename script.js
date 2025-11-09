const apiKey = "45e4b0442b56daccd25c3bf19aa9b688"; // replace with your actual key

const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const details = document.getElementById("details");
const weatherBox = document.getElementById("weatherBox");
const errorText = document.getElementById("error");

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod != 200) {
      throw new Error(data.message);
    }

    showWeather(data);
  } catch (err) {
    errorText.textContent = "❌ " + err.message;
    weatherBox.classList.add("hidden");
  }
}

function showWeather(data) {
  errorText.textContent = "";
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `🌡️ ${data.main.temp.toFixed(1)}°C`;
  description.textContent = data.weather[0].description;
  details.textContent = `💧 Humidity: ${data.main.humidity}% | 💨 Wind: ${data.wind.speed} m/s`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherBox.classList.remove("hidden");

  // change background color based on weather
  const weatherType = data.weather[0].main.toLowerCase();
  if (weatherType.includes("cloud")) {
    document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } else if (weatherType.includes("rain")) {
    document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
  } else if (weatherType.includes("clear")) {
    document.body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
  } else {
    document.body.style.background = "linear-gradient(to right, #6dd5fa, #2980b9)";
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

locBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        showWeather(data);
      } catch {
        errorText.textContent = "Failed to get location weather.";
      }
    }, () => {
      errorText.textContent = "Location access denied.";
    });
  } else {
    errorText.textContent = "Geolocation not supported by browser.";
  }
});