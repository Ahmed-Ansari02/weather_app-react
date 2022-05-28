import React from "react";
import "./component_styles.css";
import Country_names_json from "../assets/country_code.json";

export default function Description_country(props) {
  let country_name=Country_names_json[`${props.country.toLowerCase()}`];
  return (
    <div className="Description_country">
      <div>Country: </div>
      <p className="CountryName"> {country_name}</p>
      <div>State: </div>
      <p className="CountryName"> {props.state}</p>
      <div>Local Time </div>
      <p className="CountryName"> {props.time}</p>
    </div>
  );
}
