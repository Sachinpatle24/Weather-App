const apiKey = "45e4b0442b56daccd25c3bf19aa9b688"; // Your OpenWeatherMap key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  fetchWeatherData(city);
}

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById("weatherResult");
      if (data.cod === 200) {
        const weather = data.weather[0].main.toLowerCase();
        changeBackground(weather);

        resultDiv.innerHTML = `
          <h2>${data.name}</h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="icon">
          <p><strong>${data.main.temp}°C</strong></p>
          <p>${data.weather[0].description}</p>
          <div class="details">
            <p>🌡️ Feels Like: ${data.main.feels_like}°C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind: ${data.wind.speed} m/s</p>
            <p>🔽 Pressure: ${data.main.pressure} hPa</p>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<p class="error">City not found!</p>`;
      }
    })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = `<p class="error">Error fetching data!</p>`;
    });
}

// Dynamic background
function changeBackground(weather) {
  const body = document.body;
  if (weather.includes("cloud")) {
    body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
  } else if (weather.includes("rain")) {
    body.style.background = "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)";
  } else if (weather.includes("clear")) {
    body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
  } else if (weather.includes("snow")) {
    body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
  } else if (weather.includes("thunder")) {
    body.style.background = "linear-gradient(to right, #20002c, #cbb4d4)";
  } else {
    body.style.background = "linear-gradient(to right, #74ebd5, #ACB6E5)";
  }
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            const weather = data.weather[0].main.toLowerCase();
            changeBackground(weather);

            document.getElementById("weatherResult").innerHTML = `
              <h2>${data.name}</h2>
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="icon">
              <p><strong>${data.main.temp}°C</strong></p>
              <p>${data.weather[0].description}</p>
              <div class="details">
                <p>🌡️ Feels Like: ${data.main.feels_like}°C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind: ${data.wind.speed} m/s</p>
                <p>🔽 Pressure: ${data.main.pressure} hPa</p>
              </div>
            `;
          });
      },
      () => alert("Please allow location access.")
    );
  } else {
    alert("Geolocation not supported.");
  }
}
