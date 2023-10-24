function fetchWeather(geocode) {
  let lat = geocode[0].lat
  let lon = geocode[0].lon


  let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=ded887f09c87ed8a14484e02ddb5d99e";

  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
}

function handleFiveDayWeather() {
  
}




function geocodeCity(city) {
  let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=ded887f09c87ed8a14484e02ddb5d99e"

  fetch(url)
  .then(response => response.json())
  .then(data => {
    fetchWeather(data)
  })
  
}


function renderCityHistory(cityLocation) {
  let cityHistory = $('.search-history');

  let cityHistoryText = $('<h3>')
  cityHistoryText.text(cityLocation)

  let cityHistoryCard = $('<div>')
  cityHistoryCard.addClass('cityCard flex justify-center items-center bg-slate-200/[0.3] rounded-lg w-3/4 h-10')
  cityHistory.append(cityHistoryCard)
  cityHistoryCard.append(cityHistoryText)
}


$('#search-button').on('click', (event) => {
  event.preventDefault();
  let cityLocation = $('#default-search').val();
  
  geocodeCity(cityLocation)

  renderCityHistory(cityLocation)
  

  
  
})

