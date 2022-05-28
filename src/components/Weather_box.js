import React from "react";
import "./component_styles.css";

export default function Weather_box(props) {
  return (
    <div className="Weather_box">
      <span className="weather_data_box">
        <p className="weather_description">Max Temperature</p>
        <p className="weather_box">{props.weather[0]}</p>
      </span>
      <span className="weather_data_box">
        <p className="weather_description">Min Temperature</p>
        <p className="weather_box">{props.weather[1]}</p>
      </span>
      <span className="weather_data_box">
        <p className="weather_description">Humidity </p>
        <p className="weather_box">{props.weather[2]}</p>
      </span>
      <span className="weather_data_box">
        <p className="weather_description">Wind speed</p>
        <p className="weather_box">{props.weather[3]}</p>
      </span>
    </div>
  );
}
