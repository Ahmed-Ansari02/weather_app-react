import React from "react";

export default function Flag_box(props) {
  return (props.source!=="") ? (
    
    <img className="Flag_box" alt="flag" src={props.source} />
  ) : null;
}
