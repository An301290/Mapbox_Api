import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState, useEffect } from "react";
import img from "../src/images/map-42871_1280@3x.png";
import "../src/App.css";
require("dotenv").config();
// import * as deutschland from "../Data/deutchland.json"

const garden = [
  { city: "Berlin", lat: 52.5167, lng: 13.3833 },
  { city: "Hamburg", lat: 53.55, lng: 10.0 },
  { city: "Munich", lat: 48.1372, lng: 11.5755 },
  { city: "Cologne", lat: 50.9422, lng: 6.9578 },
  { city: "Frankfurt", lat: 50.1136, lng: 8.6797 },
  { city: "Bremen", lat: 53.1153, lng: 8.7975 },
  { city: "Stuttgart", lat: 48.7761, lng: 9.1775 },
  { city: "Dortmund", lat: 51.5139, lng: 7.4653 },
  { city: "Essen", lat: 51.4508, lng: 7.0131 },
  { city: "Dresden", lat: 51.0493, lng: 13.7384 },
];

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 52.520008,
    longitude: 13.404954,
    width: "100vw",
    height: "100vh",
    zoom: 5,
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setLocation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const handleAddClick = (e) => {
    console.log(e);
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYW5zYWhhIiwiYSI6ImNrcHBmbnhwdDB2aGoyb251bzdseHp2cDMifQ.En1UzaBe5gFYNvJIsUkJGQ"
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onDblClick={handleAddClick}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {garden.map((deutsch, index) => (
          <Marker
            key={deutsch.city}
            latitude={deutsch.lat}
            longitude={deutsch.lng}
            offsetTop={(-viewport.zoom * 4) / 2}
          >
            <button
              className="marker_button"
              onClick={(e) => {
                e.preventDefault();
                setLocation(index);
              }}
            >
              <img
                src={img}
                alt="Pin"
                width={viewport.zoom * 3}
                height={viewport.zoom * 4}
              />
            </button>
          </Marker>
        ))}
        {garden.map((deutsch, index) =>
          location === index ? (
            <Popup
              latitude={deutsch.lat}
              longitude={deutsch.lng}
              onClose={() => {
                setLocation(null);
              }}
            >
              <div>
                <h3>{deutsch.city}</h3>
                <p>This is my favorite city</p>
              </div>
            </Popup>
          ) : null
        )}
      </ReactMapGL>
    </div>
  );
}
