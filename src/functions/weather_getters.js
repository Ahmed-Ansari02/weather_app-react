/*
const API_key = "b07ad7e0917b77d6b0be848334760d20"
let coordinates;
let lat, lon, country_names_list;

const text_box = document.querySelector("#text_box")
const search_logo = document.querySelector('#search_logo')
const max_temp = document.querySelector("#max_temp")
const min_temp = document.querySelector("#min_temp")
const humidity = document.querySelector("#humidity")
const windspeed = document.querySelector("#windspeed")
const weather_icon_min_temp = document.querySelector(".weather_icon_min_temp")
const weather_icon_max_temp = document.querySelector(".weather_icon_max_temp")
const weather_icon_humidity = document.querySelector(".weather_icon_humidity")
const weather_icon_windspeed = document.querySelector(".weather_icon_windspeed")
const flag = document.querySelector("#flag_parent")
async function getCity(city_name) {
  let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${API_key}`)
  let json = await response.json()
  
  country_names_list = await fetch("./assets/country_code.json").then(res=>res.json()).then(json)
  console.log(typeof(json))
  
  return ([json[0].lat, json[0].lon, json[0].country])
}


async function getWeather(city) {
  [lat, lon, country] = await getCity(city)
  coordinates = [lat, lon]
  map.setZoom(9)
  map.flyTo(coordinates)
  marker.setLatLng(coordinates)
  circle.setLatLng(coordinates)
  
  flag.setAttribute("src", `https://flagcdn.com/w2560/${country.replaceAll('"', '').toLowerCase()}.webp`)
  
  country_code=country.replaceAll('"', '').toLowerCase()
  console.log(country_code)
  weather_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`).then(res => res.json())


  return ([weather_data.main.temp_max, weather_data.main.temp_min, weather_data.main.humidity, weather_data.wind.speed])
}


function icons(data) {
  data[0] < 18 ? weather_icon_max_temp.textContent = '🥶' : data[0] > 25 ? weather_icon_max_temp.textContent = '🌡️' : weather_icon_max_temp.textContent = '😎'
  data[1] < 18 ? weather_icon_min_temp.textContent = '🥶' : data[0] > 25 ? weather_icon_min_temp.textContent = '🌡️' : weather_icon_min_temp.textContent = '😎'
  data[2] < 50 ? weather_icon_humidity.textContent = '🌵' : weather_icon_humidity.textContent = '🌧️'
  data[0] < 20 ? weather_icon_windspeed.textContent = '🍃' : weather_icon_windspeed.textContent = '🌪️'

}

async function show_weather() {
  city = (text_box.value)
  if (!city) {

    console.log("empty")
    return
  }
  data = await getWeather(city)
  console.log(data)
  icons(data)
  map.setZoom(9)
  map.flyTo(coordinates)
  marker.setLatLng(coordinates)
  circle.setLatLng(coordinates)

  max_temp.textContent = `🌡️ ${data[0]}°C`
  min_temp.textContent = `🌡 ${data[1]}°C`
  humidity.textContent = `💧 ${data[2]}%`
  windspeed.textContent = `💨 ${data[3]} Kmph`



}
*/