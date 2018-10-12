(function(){
  var OPEN_MAP_KEY = "b43097d766ab89da4af1e8fdd79dcb7b";
  var WEATHER_API = "https://api.openweathermap.org/data/2.5/weather"
  
  function getAdvisory(index){
    if(index <= 120){
      return {
        "status": "green",
        "advisory": "Your horse’s cooling system is functioning very effectively. You are safe to do all the riding and training you like with no real worries."
      };
    } else if(index <= 150){
      return {
        "status": "yellow",
        "advisory": "Your horse's cooling efficiency is decreasing through this range. Horses will sweat up with work, so make sure they have a chance to rest and cool off over the course of a long ride or heavy work."
      };
    } else if(index <= 180){
      return {
        "status": "orange",
        "advisory": "Your horse’s ability to regulate its temperature is greatly reduced and heat stress is more likely, so be careful. Stick with light work and keep watch for signs of overheating. Make sure to cool your horse down properly afterwards."
      };
    } else {
      return {
        "status": "red",
        "advisory": "Your horse has lost the ability to regulate its temperature. Over-working a horse in these conditions can be dangerous, even fatal. Do your horse (and yourself) a favor and take the day off!!"
      };
    }
  }

  function tempKtoF(tempK){
    var tempC = tempK - 273.15;
    var tempF = (1.8 * tempC) + 32;
    return tempF;
  }
  
  function handleWeather(response){
    var tempInF = tempKtoF(response.main.temp);
    var index = Math.round(response.main.humidity + tempInF);
    var advisory = getAdvisory(index);
    $("#container").removeClass().addClass("status-"+advisory.status);
    $("#index").html(index);
    $("#advisory").html(advisory.advisory);
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
