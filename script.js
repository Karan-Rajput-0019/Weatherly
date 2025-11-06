// Welcome overlay and quotes
const quotes = [
  "Weather is a great metaphor for life – sometimes it's good, sometimes it's bad, and there's nothing much you can do about it but carry an umbrella.",
  "No weather is bad if you're properly dressed for it.",
  "Every cloud has a silver lining.",
  "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.",
  "Wherever you go, no matter what the weather, always bring your own sunshine."
];

function showWelcome() {
  const overlay = document.getElementById("welcome-overlay");
  const quoteEl = document.getElementById("welcome-quote");
  const enterBtn = document.getElementById("enter-app");
  if (overlay && quoteEl && enterBtn) {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    enterBtn.onclick = () => {
      overlay.style.display = "none";
      document.body.style.overflow = "";
      if (document.querySelector('.input-box')) {
        document.querySelector('.input-box').focus();
      }
    };
  }
}

// Place this at the top
window.onload = function() {
  showWelcome();
  // ...your other initialization for weather app below
};

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

// Loader
function showLoader(show) {
  let loader = document.querySelector('.wa-loader');
  if (!loader && show) {
    loader = document.createElement('div');
    loader.className = 'wa-loader';
    loader.innerHTML = `<div class="wa-spinner"></div>`;
    weatherBody.parentElement.appendChild(loader);
  }
  if (loader) loader.style.display = show ? 'flex' : 'none';
}

// Visibility Helper
function setVisibility(el, visible) {
  el.classList.toggle('active', visible);
  el.style.display = visible ? 'flex' : 'none';
}

// Reset error/results
function resetDisplay() {
  setVisibility(locationNotFound, false);
  setVisibility(weatherBody, false);
}

// Weather Data Fetch
async function checkWeather(city) {
  city = city.trim();
  if (!city) {
    resetDisplay();
    setVisibility(locationNotFound, true);
    locationNotFound.querySelector('h1').textContent = "Please enter a location!";
    return;
  }

  const apiKey = "YOUR_API_KEY"; // Always replace with your real API key, never commit publicly!
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

  try {
    showLoader(true);
    const response = await fetch(url);
    const weatherData = await response.json();
    showLoader(false);

    if (!response.ok || weatherData.cod === "404" || !weatherData.main) {
      resetDisplay();
      setVisibility(locationNotFound, true);
      locationNotFound.querySelector('h1').textContent = "Location not found. Try again!";
      return;
    }

    // Success!
    resetDisplay();
    setVisibility(weatherBody, true);

    // Data Render
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}<sup>°C</sup>`;
    description.textContent = weatherData.weather?.[0]?.description || "No description";
    humidity.textContent = `${weatherData.main.humidity}%`;
    windSpeed.textContent = `${weatherData.wind.speed} Km/H`;

    // Weather Icon Assignment
    const iconMap = {
      Clouds: "cloud.png",
      Clear: "clear.png",
      Rain: "rain.png",
      Mist: "mist.png",
      Snow: "snow.png"
    };
    const icon = iconMap[weatherData.weather?.[0]?.main] || "cloud.png";
    weatherImg.src = `assets/${icon}`;
    weatherImg.alt = weatherData.weather?.[0]?.main ?? "Weather";
  } catch (err) {
    showLoader(false);
    resetDisplay();
    setVisibility(locationNotFound, true);
    locationNotFound.querySelector('h1').textContent = "Network/API error – Please try again!";
    console.error(err);
  }
}

// Button & Enter Key
searchBtn.addEventListener('click', () => checkWeather(inputBox.value));
inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkWeather(inputBox.value);
});

// Accessibility: Focus input on page load
window.onload = () => {
  inputBox.focus();
};
