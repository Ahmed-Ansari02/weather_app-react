import "./App.css";
import Search_box from "./components/search_box";
import Weather_box from "./components/Weather_box";
import Flag_box from "./components/Flag_box";
import MapChange from "./components/Markerlocation";
import Weather_graphic from "./components/weather_graphic";
import Description_country from "./components/Description_country";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const API_key = "b07ad7e0917b77d6b0be848334760d20";

function App(props) {
  const [Coordinates, setCoordinates] = useState(null);
  const [Weatherdata, setWeatherdata] = useState([]);
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [LocalTime, setLocalTime] = useState(null);
  const [Time_zone, setTime_zone] = useState(null);
  const [Weather_graphics, setWeather_graphics] = useState([]);

  async function getCity() {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=${API_key}`
    );
    let json = await response.json();
    let weather_data = await getWeatherData([json[0].lat, json[0].lon]);
    setWeatherdata([
      weather_data.main.temp_max,
      weather_data.main.temp_min,
      weather_data.main.humidity,
      weather_data.main.pressure * 100,
      weather_data.wind.speed,
      weather_data.wind.deg,
      weather_data.wind.visibility,
      weather_data.weather[0].description,
    ]);
    setWeather_graphics([
      weather_data.weather[0].icon,
      weather_data.weather[0].main,
    ]);
    console.log(weather_data);

    setCoordinates([json[0].lat, json[0].lon]);
    setCountry(json[0].country);
    setState(json[0].state);
    let local_time = getTime(weather_data.timezone);
    setLocalTime(local_time);
    setTime_zone(weather_data.timezone);
  }
  async function getWeatherData(cord) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cord[0]}&lon=${cord[1]}&appid=${API_key}&units=metric`
    );
    let data = await res.json();

    return data;
  }
  function getTime(arg) {
    let time = new Date();
    let time_current = time.getTime();
    let native_timezone = -time.getTimezoneOffset() * 60 * 1000;

    let delta_offset = arg * 1000 - native_timezone;
    return new Date(time_current + delta_offset);
  }

  function handleTextChange(e) {
    setCity(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Hello! {props.name}</p>
      </header>

      <Search_box handleTextChange={handleTextChange} func={getCity} />
      <Weather_box txt={City} weather={Weatherdata} />
      <Flag_box country_code={Country} />
      <Description_country
        country={Country}
        state={State}
        local_time={LocalTime}
        time_zone={Time_zone}
      />
      <Weather_graphic data={Weather_graphics}/>
      <div className="map">
        <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapChange location={Coordinates} />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
