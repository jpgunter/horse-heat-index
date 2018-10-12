(function(){
  var OPEN_MAP_KEY = "b43097d766ab89da4af1e8fdd79dcb7b";
  var WEATHER_API = "https://api.openweathermap.org/data/2.5/weather"
  
  function handleWeather(response){
    $("#output").html(response.main.humidity);
    //show the workout time
  }

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      $.ajax({
        "url": WEATHER_API,
        "data": {"lat": lat, "lon": lon, "appid": OPEN_MAP_KEY},
        "success": handleWeather
      });
    });
  } else {
    //show and prompty for zip
    var zip = "98407,us";
    $.ajax({
      "url": WEATHER_API,
      "data": {"zip": zip, "appid": OPEN_MAP_KEY},
      "success": handleWeather
    });
  }
})();
