const translations = {
  en: {
    welcome: 'Welcome to Weatherly!',
    search: 'Search weather',
    notFound: "Oops! Couldn't find that place.",
    tagline: 'Discover the weather in style'
  },
  hi: {
    welcome: 'Weatherly में आपका स्वागत है!',
    search: 'मौसम खोजें',
    notFound: "माफ़ कीजिए! जगह नहीं मिली।",
    tagline: 'स्टाइल में मौसम देखें'
  }
};
const quotes = [
  "Weather is a great metaphor for life – sometimes it's good, sometimes it's bad, and there's nothing much you can do about it but carry an umbrella.",
  "No weather is bad if you're properly dressed for it.",
  "Every cloud has a silver lining.",
  "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.",
  "Wherever you go, no matter what the weather, always bring your own sunshine."
];
const lottieMap = {
  Clear: "https://assets8.lottiefiles.com/private_files/lf30_obidsi0t.json",
  Clouds: "https://assets6.lottiefiles.com/private_files/lf30_t7scw7la.json",
  Rain: "https://assets2.lottiefiles.com/packages/lf20_Stdaec.json",
  Snow: "https://assets2.lottiefiles.com/private_files/lf30_hhl8opnw.json",
  Mist: "https://assets5.lottiefiles.com/packages/lf20_jmBauI.json"
};
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelector('.welcome-title').textContent = translations[lang]['welcome'];
  document.getElementById('searchBtn').setAttribute('aria-label', translations[lang]['search']);
  document.getElementById('notFoundTxt').textContent = translations[lang]['notFound'];
  document.getElementById('brandTagline').textContent = translations[lang]['tagline'];
}
function setWeatherAnimation(main) {
  const player = document.getElementById("weatherLottie");
  player.load(lottieMap[main] || lottieMap["Clouds"]);
}
document.addEventListener("DOMContentLoaded", function() {
  // Welcome overlay
  const overlay = document.getElementById("welcome-overlay");
  const quoteEl = document.getElementById("welcome-quote");
  const enterBtn = document.getElementById("enter-app");
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  enterBtn.onclick = () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
    document.querySelector('.input-box').focus();
  };

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.onclick = function() {
    document.body.classList.toggle('dark-mode');
    themeBtn.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  };
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.classList.add('dark');
  }

  // Multi-language support
  const langSwitcher = document.getElementById('lang-switcher');
  langSwitcher.onchange = function(e) {
    setLanguage(e.target.value);
    localStorage.setItem('lang', e.target.value);
  };
  setLanguage(localStorage.getItem('lang') || 'en');
  langSwitcher.value = localStorage.getItem('lang') || 'en';

  // Custom theme color/font
  document.getElementById('themeColor').oninput = function(e) {
    document.body.style.setProperty('--theme-primary', e.target.value);
    localStorage.setItem('themeColor', e.target.value);
  };
  if (localStorage.getItem('themeColor')) {
    document.body.style.setProperty('--theme-primary', localStorage.getItem('themeColor'));
    document.getElementById('themeColor').value = localStorage.getItem('themeColor');
  }
  document.getElementById('fontSelect').onchange = function(e) {
    document.body.style.fontFamily = e.target.value;
    localStorage.setItem('font', e.target.value);
  };
  if (localStorage.getItem('font')) {
    document.body.style.fontFamily = localStorage.getItem('font');
    document.getElementById('fontSelect').value = localStorage.getItem('font');
  }

  // Weather search, animated icon, and forecast (add your actual API calls here!)
  document.getElementById('searchBtn').onclick = function() {
    // Example:
    // setWeatherAnimation('Clear');
    // fetchWeather(city); fetchForecast(city);
  };

  // Keyboard navigation (Tabindex already applied above)
  // Optionally, add handlers for arrow keys, etc.
});
