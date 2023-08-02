let map;
var cityName = document.querySelector(".uk-search-input")
var searchButton = document.querySelector(".searchButton")
var stateEl = document.querySelector("#states")
var restaurantSectionEl = document.querySelector("#restaurantSection")

function getOpenWeather(cityName, state) {
  var apiKey = "43307f36c133c1b4d80feb3644b2ab3e"
  var URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ","+ state +"&appid=" + apiKey
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
    return result;
  } catch (error) {
    console.error(error);
  }
}
async function restaurantName(){
  var searchRestaurants = await searchRestaurantStateCity(cityName.value, stateEl.value.split(",")[0])
  for (let i = 0; i < 6; i++) {
    var resName = searchRestaurants.restaurants[i].restaurantName
    var cuisineType = searchRestaurants.restaurants[i].cuisineType
    console.log(searchRestaurants.restaurants[i].restaurantName)
    var cardEl = document.getElementById("R" + i)
    cardEl.textContent = resName
    var resDesc = document.getElementById("d"+i)
    resDesc.textContent = cuisineType
  }
}


searchButton.addEventListener("click", function(event){
  event.preventDefault()
getOpenWeather(cityName.value,stateEl.value.split(",")[1]) 
restaurantName()
// searchRestaurantStateCity(cityName.value, stateEl.value.split(",")[0])
restaurantSectionEl.setAttribute("class","")
})
