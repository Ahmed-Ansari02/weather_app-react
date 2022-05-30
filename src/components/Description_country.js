import React from "react";
import "./component_styles.css";
import Country_names_json from "../assets/country_code.json";

export default function Description_country(props) {
  let country_name = Country_names_json[`${props.country.toLowerCase()}`];

  return props.local_time != null ? (
    <div className="Description_country">
      <div className="description">Country: </div>
      <p className="details"> {country_name}</p>
      <div className="description">State: </div>
      <p className="details"> {props.state}</p>
      <div className="description">Local Time: </div>
      <p className="details"> {props.local_time.toLocaleTimeString()}</p>
      <div className="description">Date: </div>
      <p className="details"> {props.local_time.toLocaleDateString()}</p>
      <div className="description">Time Zone: </div>
      <p className="details">
        GMT{" "}
        {props.time_zone > 0
          ? "+" + (props.time_zone) / 3600
          : (props.time_zone) / 3600}
      </p>
    </div>
  ) : null;
}
