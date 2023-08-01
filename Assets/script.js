let map;
var cityName = document.querySelector(".uk-search-input")
var searchButton = document.querySelector(".searchButton")
var stateEl = document.querySelector("#states")

function getOpenWeather(cityName, state) {
  var apiKey = "43307f36c133c1b4d80feb3644b2ab3e"
  var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ","+ state +"&appid=" + apiKey
  console.log(URL)
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

//Dani's API
// const url = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/MI/city/West%20Bloomfield/0';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ff27872189msh4ec125b3b4946c2p10f900jsnd9403e0ba202',
// 		'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


//Lina's API version
async function searchRestaurantStateCity(city, state) {
  const url = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/' + state + '/city/' + city + '/0';
  const options = {
    method: 'GET',
    headers: {
     'X-RapidAPI-Key': 'ff27872189msh4ec125b3b4946c2p10f900jsnd9403e0ba202',
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



searchButton.addEventListener("click", function(event){
  event.preventDefault()
getOpenWeather(cityName.value,stateEl.value.split(",")[1]) 
searchRestaurantStateCity(cityName.value, stateEl.value.split(",")[0])
})
