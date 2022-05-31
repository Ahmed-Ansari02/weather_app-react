import React from "react";
import "./component_styles.css";

export default function weather_graphic(props) {
  return (props.data.length != 0 ) ? (
    <div className="weather_graphic">
      <img
        className="icon"
        src={`https://openweathermap.org/img/wn/${props.data[0]}@2x.png`}
      />
      <p className="description_graphic"> {props.data[1]}</p>
    </div>
  ) : null;
}
