$(function() {
  let currentDay = dayjs().format('YYYY-MM-DD');
  let showCurrentDay = $('<h1>');
  showCurrentDay.text(currentDay)
  let forecastSection = $('.forecast-section');

  forecastSection.append(showCurrentDay)
})


function fetchWeather(geocode) {
  let lat = geocode[0].lat
  let lon = geocode[0].lon


  let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=ded887f09c87ed8a14484e02ddb5d99e";

  fetch(url)
  .then(response => response.json())
  .then(data => handleFiveDayWeather(data))
}

function handleFiveDayWeather(date) {
  let currentDay = dayjs()
  let listOfDates = date.list
  let weatherForecast = $('.weather')
  console.log(listOfDates)
  
  
  for (let i = 0; i < 5; ++i) {
    let weatherCard = $(`.card-${i}`)
    weatherCard.text('')

    let dayPlusOne = currentDay.add(i + 1, 'day').format('YYYY-MM-DD')
    let currentDayTime = `${dayPlusOne} 00:00:00`
    weatherCard.append(dayPlusOne)

    for (let j = 0; j<listOfDates.length; ++j) {
      if (currentDayTime == listOfDates[j].dt_txt) {
        let dailyWeather = $('<p>');
        let dailyWeatherText = listOfDates[j].weather[0].description.toUpperCase();
        dailyWeather.text(dailyWeatherText)
        weatherCard.append(dailyWeather)

        let dailyTemp = $('<p>');
        dailyTemp.text(`Temp: ${listOfDates[j].main.temp}`)
        weatherCard.append(dailyTemp)

      }
    }
  } 
}




function geocodeCity(city) {
  let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=ded887f09c87ed8a14484e02ddb5d99e"

  fetch(url)
  .then(response => response.json())
  .then(data => {
    fetchWeather(data)
  })
  
}

let cityHistoryArray = [];

function renderCityHistory(cityLocation) {
  let cityHistory = $('.search-history-content');
  
  cityHistoryArray.push(cityLocation)
  
  let cityHistoryText = $('<h3>')
  localStorage.setItem('cityHistoryStorage', JSON.stringify(cityHistoryArray))
  cityHistoryText.text(cityLocation)

  let savedArray = localStorage.getItem('cityHistoryStorage')
  console.log(savedArray)

  for (let i = 0; i < 10; ++i){
    savedArray.forEach((city)) => {

    }
  }
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

