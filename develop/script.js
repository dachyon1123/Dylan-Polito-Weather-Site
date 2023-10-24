function renderWeather(weather) {
  console.log(weather)
  let cardOne = $('.card-1');
  let cardOneText = $('.card-1-text')
  cardOneText.text(weather.main.temp)
  
}






function fetchWeather(city) {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ded887f09c87ed8a14484e02ddb5d99e";

  fetch(url)
  .then(response => response.json())
  .then(data => renderWeather(data))
}





$('#search-button').on('click', (event) => {
  event.preventDefault();
  let cityLocation = $('#default-search').val();
  

  fetchWeather(cityLocation);

  let cityHistory = $('.search-history');

  let cityHistoryText = $('<h3>')
  cityHistoryText.text(cityLocation)

  let cityHistoryCard = $('<div>')
  cityHistoryCard.addClass('cityCard flex justify-center items-center bg-slate-200/[0.3] rounded-lg w-3/4 h-10')
  cityHistory.append(cityHistoryCard)
  cityHistoryCard.append(cityHistoryText)

  
  
})

