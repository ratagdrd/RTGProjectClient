import React, { useState } from "react";
import Map, { NavigationControl } from "react-map-gl";
// import ".././css/MapGame";
// let [currentPlace, setCurrentPlace] = useState();

export default function MapGame() {
  return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiY2xhaXJlZnJvZnJvZnJvIiwiYSI6ImNrZTlhZXFhajAxd3IzMW1qdWxmNmJsbXIifQ.lbPzivrmR4KpokhRw3_10A"
        initialViewState={{
          longitude: 32.343516073671935,
          latitude: 32.343516073671935,
          zoom: 4,
        }}
        style={{ width: 428, height: 926 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />

      <Map />
      <button>מקם אותי</button>
    </>
  );
}
