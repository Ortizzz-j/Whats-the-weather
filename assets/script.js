//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

var userSearch = document.querySelector('input');
var btnClick = document.getElementById('cit-search');
var apiKey = '7ab439372a6b7834b1058543aced3bee';

let searchHistory = []

if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
}

function handleSearchSubmit(){
    var city = userSearch.value;
    fetchWeather(city)
    searchHistory.push(city)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    renderSearchHistory()
}

const searchHistoryEl = document.querySelector('#cities-searched')
function renderSearchHistory() {
    searchHistoryEl.innerHTML = ''

    if (localStorage.getItem('searchHistory')) {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    }

    
    searchHistory.forEach(search => {
        const item = document.createElement('p')
        item.textContent = search
        searchHistoryEl.appendChild(item)
    })
}


function fetchWeather(city){
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`

    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeth(data)

        console.log(data)
        var lat = data.coord.lat
        var lon = data.coord.lon
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayForecastWeth(data)
            console.log(data)
        })
    })
}

function displayCurrentWeth(data){
    var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    document.getElementById('icon').setAttribute('src', iconUrl)

    var temp = data.main.temp
    var hum = data.main.humidity
    var windSpd = data.wind.speed
    document.getElementById('weather').textContent = temp

}
const forecastEl = document.getElementById('city-forecast')
function displayForecastWeth(data){
    // const forecastList = data.list

    const forecast = data.list.filter(item => item.dt_txt)
    console.log(forecast)

    

    forecast.forEach(item => {
        var card = document.querySelector('#cards');
        var cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body')
        var dateEl = document.createElement('p')
        dateEl.textContent = item.dt_txt
        dateEl.classList.add('card-body', )
        var humidtyEl = document.createElement('p')
        humidtyEl.textContent = item.main.humidity
        humidtyEl.classList.add('card-body')



        card.appendChild(humidtyEl)
        card.appendChild(dateEl)
        forecastEl.appendChild(card)
    })
}

btnClick.addEventListener('click', handleSearchSubmit)
