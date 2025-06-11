const apiKey = "bb1177aa2f6274431cfbf6c4ef2013dd";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const openMenu = document.querySelector(".openMenu");
const menu = document.querySelector(".menu");
const closeAll = document.querySelector(".close");
const mail = document.querySelector(".mail");
const copy = document.querySelector(".copy");
const card = document.querySelector(".card");
const theCity = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const invalid = document.querySelector(".invalid");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const weatherImages = {
  Clear: "images/clear.png",
  Snow: "images/snow.png",
  Rain: "images/rain.png",
  Clouds: "images/clouds.png",
  Mist: "images/clouds.png",
  Drizzle: "images/rain.png",
};
const weatherBackGround = {
  Clear:
    "linear-gradient(rgba(214, 125, 17, 0.875), rgba(187, 124, 23, 0.688))",
  Clouds: "linear-gradient(rgb(50, 50, 50), rgb(100, 100, 100))",
  Rain: "linear-gradient(rgb(50, 50, 50), rgb(100, 100, 100))",
  Drizzle: "linear-gradient(rgb(50, 50, 50), rgb(100, 100, 100))",
  Mist: "linear-gradient(rgb(50, 50, 50), rgb(100, 100, 100))",
  Snow: " linear-gradient(rgb(0, 145, 255), rgba(15, 212, 110, 0.561)) ",
};
async function checkWeather(city) {
  try {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found or network issue");
    }
    let data = await response.json();
    console.log(data);

    theCity.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    weatherIcon.src =
      weatherImages[data.weather[0].main] || "images/clear.png";
    card.style.background =
      weatherBackGround[data.weather[0].main] ||
      "linear-gradient(rgb(0, 145, 255), rgba(15, 212, 110, 0.561))";

    weather.style.display = "flex";
    details.style.display = "flex";
    invalid.style.display = "none";
    document.querySelector(".welcome").style.display = "none";
  } catch (error) {
    console.error(error);
    invalid.style.display = "block";
    weather.style.display = "none";
    details.style.display = "none";
    document.querySelector(".welcome").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  const cityName = searchInput.value.trim();
  if (cityName === "") {
    console.log("Invalid input: Please enter a city name.");
    invalid.style.display = "block";
    weather.style.display = "none";
    details.style.display = "none";
    document.querySelector(".welcome").style.display = "block";

    return;
  }
  checkWeather(cityName);
  searchInput.blur();
  searchInput.value = "";
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cityName = searchInput.value.trim();
    if (cityName === "") {
      console.log("Invalid input: Please enter a city name.");
      invalid.style.display = "block";
      weather.style.display = "none";
      details.style.display = "none";
      document.querySelector(".welcome").style.display = "block";
      return;
    }
    checkWeather(cityName);
    searchInput.blur();
    searchInput.value = "";
  }
});
// menu
openMenu.addEventListener("click", () => {
  menuApply();
});
function menuApply() {
  const menuHeight = window.getComputedStyle(menu).height;
  if (menuHeight === "0px" || menuHeight === "") {
    menu.style.height = "100%";
    closeAll.style.cssText =
      "opacity: 1; visibility: visible; transition: opacity 1s ease-in-out;";
    copy.style.cssText =
      "opacity: 1; visibility: visible; transition: opacity 1s ease-in-out;";
    mail.style.cssText =
      "opacity: 1; visibility: visible; transition: opacity 1s ease-in-out;";
  }
}
closeAll.addEventListener("click", () => {
  closeAll.style.cssText =
    "opacity: 0; visibility: hidden; transition: opacity 1s ease-in-out;";
  copy.style.cssText =
    "opacity: 0; visibility: hidden; transition: opacity 1s ease-in-out;";
  mail.style.cssText =
    "opacity: 0; visibility: hidden; transition: opacity 1s ease-in-out;";
  menuClose();
});
function menuClose() {
  menu.style.height = "0px";
}
