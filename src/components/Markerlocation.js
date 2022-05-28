import React, { useState } from "react";

import { Marker, Popup, useMap, Circle } from "react-leaflet";

export default function Markerlocation(props) {
  const map = useMap();
  if (props.location !== null) {
    map.flyTo(props.location, 10);
    return (
      <div>
       
        <Marker position={props.location}>
          <Popup>You are here</Popup>
        </Marker> 
        <Circle center={props.location} radius={2000} fillColor="red" />
      </div>
    );
  }
}
