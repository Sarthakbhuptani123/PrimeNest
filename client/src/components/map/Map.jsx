import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  // Defensive coding to handle potential string/invalid inputs
  const latitude = items.length === 1 ? Number(items[0].latitude) : 52.4797;
  const longitude = items.length === 1 ? Number(items[0].longitude) : -1.90269;

  // Check if coordinates are valid numbers, otherwise fallback
  const center =
    !isNaN(latitude) && !isNaN(longitude)
      ? [latitude, longitude]
      : [52.4797, -1.90269];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        const lat = Number(item.latitude);
        const lng = Number(item.longitude);
        // Only render pins with valid coordinates
        if (isNaN(lat) || isNaN(lng)) return null;

        return <Pin item={item} key={item.id} />;
      })}
    </MapContainer>
  );
}

export default Map;
