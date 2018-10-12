(function(){
  var OPEN_MAP_KEY = "b43097d766ab89da4af1e8fdd79dcb7b";
  var WEATHER_API = "https://api.openweathermap.org/data/2.5/weather"
  
  function tempKtoF(tempK){
    var tempC = tempK - 273.15;
    var tempF = (1.8 * tempC) + 32;
    return tempF;
  }
  
  function handleWeather(response){
    var tempInF = tempKtoF(response.main.temp);
    var index = Math.round(response.main.humidity + tempInF);
    $("#output").html(index);
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
