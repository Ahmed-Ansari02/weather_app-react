import React from "react";

export default function Flag_box(props) {
  return (props.country_code!=="") ? (
    
    <img className="Flag_box" alt="flag" src={`https://flagcdn.com/w2560/${props.country_code.replaceAll(
          '"',
          ""
        ).toLowerCase()}.webp`} />
  ) : null;
}
