import "./App.css";
import Search_box from "./components/search_box";
import Weather_box from "./components/Weather_box";
import Flag_box from "./components/Flag_box";
import MapChange from "./components/Markerlocation";
import Weather_graphic from "./components/weather_graphic";
import Description_country from "./components/Description_country";
import Brief_description from "./components/brief_description";
import Img_strip from "./components/img_strip";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
const API_key = process.env.REACT_APP_API_key;
const Authorization = process.env.REACT_APP_Authorization;

function App(props) {
  const [Coordinates, setCoordinates] = useState(null);
  const [Weatherdata, setWeatherdata] = useState([]);
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [LocalTime, setLocalTime] = useState(null);
  const [Time_zone, setTime_zone] = useState(null);
  const [Weather_graphics, setWeather_graphics] = useState([]);
  const [Wiki, setWiki] = useState();
  const [Img, setImg] = useState();

  async function getCity() {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=${API_key}`
    );
    let wiki_text = await get_city_wiki(City);

    setWiki(wiki_text);
    setImg(await get_city_img(City));
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
  async function get_city_wiki(city_name) {
    let res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=${city_name}&formatversion=2&exsentences=10&exlimit=1&explaintext=1`
    );

    let data = await res.json();
    return data.query.pages[0].extract;
  }
  async function get_city_img(city_name) {
    let res = await fetch(
      `https://api.pexels.com/v1/search?query=${city_name}&per_page=6`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: Authorization,
        }),
      }
    );
    let data = await res.json();
    console.log(data.photos);
    return data.photos;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Weather App </p>
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
      <Weather_graphic data={Weather_graphics} />
      <Brief_description wiki={Wiki} />
      <Img_strip img={Img} />
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
