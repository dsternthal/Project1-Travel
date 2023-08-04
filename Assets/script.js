let map;
var cityName = document.querySelector(".uk-search-input")
var searchButton = document.querySelector(".searchButton")
var stateEl = document.querySelector("#states")
var restaurantSectionEl = document.querySelector("#restaurantSection")
var recentSearch = document.querySelector(".recentSearch")
var topSearchEl = document.getElementById("topSearch")
var recentCity
var recentState



// function display(){
//   localStorage.setItem('recent', recentSearch.value)
//   console.log(localStorage.getItem('recent'))
//   topSearchEl.innerHTML = localStorage.getItem("recent", display)
// }

function getOpenWeather(cityName, state) {
  var apiKey = "43307f36c133c1b4d80feb3644b2ab3e"
  var URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + state + "&appid=" + apiKey
  console.log(URL)
  fetch(URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      var lat = data[0].lat
      var long = data[0].lon
      initMap(lat, long)
    })
}
async function initMap(lat, long) {
  console.log(lat, long)
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 8,
  });
}




//Restaurants Near Me API 
async function searchRestaurantStateCity(city, state) {
  const url = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/' + state + '/city/' + city + '/0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '03b3452f5amsh2d4fc3a4a3f1e7fp1d9c33jsna13422f96a90',
      'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
async function restaurantName() {
  var searchRestaurants = await searchRestaurantStateCity(cityName.value, stateEl.value.split(",")[0])
  console.log(searchRestaurants)
  for (let i = 0; i < 6; i++) {
    var resName = searchRestaurants.restaurants[i].restaurantName
    var cuisineType = searchRestaurants.restaurants[i].cuisineType
    var resSite = searchRestaurants.restaurants[i].website
    var cardEl = document.getElementById("R" + i)
    cardEl.textContent = resName
    var resDesc = document.getElementById("d" + i)
    resDesc.textContent = cuisineType
    resDesc.link = searchRestaurants.restaurants[i].website
    document.getElementById("L" + i).href = searchRestaurants.restaurants[i].website
  }
  var searchedCity = cityName.value
  var searchedState = stateEl.value.split(",")[0]
  recentCity.push(searchedCity)
  recentState.push(searchedState)

  localStorage.setItem("pastSearchCity", JSON.stringify(recentCity))
  localStorage.setItem("pastSearchState", JSON.stringify(recentState))
}

async function getLocal() {
  var localStorageCity = JSON.parse(localStorage.getItem("pastSearchCity"))
  var localStorageState = JSON.parse(localStorage.getItem("pastSearchState"))
  console.log(localStorageCity)
  console.log(localStorageState)
  if (!localStorageCity) {
    recentCity = []
    recentState = []
    return
  }
  else {
    recentState=localStorageState
    recentCity=localStorageCity
    for (let i = 0; i < recentCity.length; i++) {
      var recentLiEl = document.createElement("li")
      var recentButtonEl = document.createElement("button")
      recentButtonEl.textContent=recentCity[i]
      recentLiEl.appendChild(recentButtonEl)
      recentSearch.appendChild(recentLiEl)
    }
  }
    console.log(recentCity)
  }

  getLocal()

  searchButton.addEventListener("click", function (event) {
    event.preventDefault()
    getOpenWeather(cityName.value, stateEl.value.split(",")[1])
    restaurantName()
    //searchRestaurantStateCity(cityName.value, stateEl.value.split(",")[0])
    restaurantSectionEl.setAttribute("class", "")
  })
