

function fetchWeather() {
  let url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ded887f09c87ed8a14484e02ddb5d99e';

  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
}

fetchWeather();