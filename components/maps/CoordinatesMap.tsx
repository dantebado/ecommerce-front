import L, { LatLng } from "leaflet";
import Head from "next/head";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {
  AddressGeoCodingResult,
  addressToReadableString,
} from "../../interface/misc.model";

var myIcon = L.icon({
  iconUrl: "/assets/marker.png",
  shadowUrl: "/assets/shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  shadowAnchor: [8, 41],
  popupAnchor: [-3, -76],
});

export default function CoordinatesMap(props: {
  geocode: AddressGeoCodingResult;
  popupText?: string;
}) {
  const position: LatLng = new LatLng(
    props.geocode.latitude,
    props.geocode.longitude
  );

  if (!position.lat || !position.alt) {
    return <div></div>;
  }

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false}>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        ></link>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      </Head>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={myIcon}>
        <Popup>{props.popupText || "Aquí"}</Popup>
      </Marker>
    </MapContainer>
  );
}
