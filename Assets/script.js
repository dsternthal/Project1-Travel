let map;

function getOpenWeather (cityName){
    var apiKey="43307f36c133c1b4d80feb3644b2ab3e"
    var URL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apiKey
    
    fetch(URL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        var lat = data.coord.lat
        var long = data.coord.lon
        initMap(lat,long)
    })
}
async function initMap(lat,long) {
    console.log(lat,long)
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 8,
  });
}

getOpenWeather("Chicago")