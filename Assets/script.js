let map;
var cityName = document.querySelector(".uk-search-input")

function search(event){
  event.preventDefault()
searchRestaurantStateCity(cityName.value)
cityName=cityName.value
}

console.log(cityName.value)
function getOpenWeather(cityName) {
  var apiKey = "43307f36c133c1b4d80feb3644b2ab3e"
  var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey

  fetch(URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      var lat = data.coord.lat
      var long = data.coord.lon
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
async function searchRestaurantStateCity(city, state) {
  const url = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/' + state + '/city/' + city + '/0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a3c09dadd3msh4ef8722c154f5fep1987a4jsn4db64d562c6f',
      'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

searchRestaurantStateCity(cityName, "FL")
getOpenWeather(cityName)

addEventListener("click",search)

