import "./App.css";
import Search_box from "./components/search_box";
import Weather_box from "./components/Weather_box";
import Flag_box from "./components/Flag_box";
import MapChange from "./components/Markerlocation";
import Description_country from "./components/Description_country";
import { useState } from "react";
import Country_names_json from "./assets/country_code.json";
import { MapContainer, TileLayer } from "react-leaflet";

const API_key = "b07ad7e0917b77d6b0be848334760d20";

function App(props) {
  const [Coordinates, setCoordinates] = useState(null);
  const [Weatherdata, setWeatherdata] = useState([]);
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Time, setTime] = useState(null);

  async function getCity() {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=${API_key}`
    );
    let json = await response.json();
    console.log(json);
    let weather_data = await getWeatherData([json[0].lat, json[0].lon]);
    setWeatherdata([
      weather_data.main.temp_max,
      weather_data.main.temp_min,
      weather_data.main.humidity,
      weather_data.wind.speed,
    ]);
    let time = new Date();
    setCoordinates([json[0].lat, json[0].lon]);
    setCountry(json[0].country);
    setState(json[0].state);
    getTime(weather_data.timezone);
  }
  async function getWeatherData(cord) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cord[0]}&lon=${cord[1]}&appid=${API_key}&units=metric`
    );
    let data = await res.json();
   // console.log(data);

    return data;
  }
  function getTime(arg) {
    let time = new Date();
    let UTC_HR=time.getUTCHours()
    let UTC_MIN=time.getUTCMinutes()
    let UTC_SEC=time.getUTCSeconds()
    let City_HR=UTC_HR+arg/3600
    console.log(City_HR)
    console.log("Time is:" + City_HR + " " + UTC_MIN)
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
      <Flag_box
        source={`https://flagcdn.com/w2560/${Country.replaceAll(
          '"',
          ""
        ).toLowerCase()}.webp`}
      />
      <Description_country country={Country} state={State} />
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
