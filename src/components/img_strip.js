import React from "react";

export default function img_strip(props) {
  return props.img ? (
    <div className="img_strip">
      <img src={props.img[0].src.tiny} className="img"></img>
      <img src={props.img[1].src.tiny} className="img"></img>
      <img src={props.img[2].src.tiny} className="img"></img>
      <img src={props.img[3].src.tiny} className="img"></img>
      <img src={props.img[4].src.tiny} className="img"></img>
      <img src={props.img[5].src.tiny} className="img"></img>
      
    </div>
  ) : null;
}
