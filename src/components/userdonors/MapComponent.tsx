"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapController = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

export default function MapComponent({ donors, activeLocation }: any) {
  const defaultCenter: [number, number] = [22.9868, 87.855];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={activeLocation} />

        {donors?.map((donor: any, idx: number) => {
          if (!donor.lat || !donor.lng) return null;
          
          return (
            <Marker
              key={idx}
              position={[donor.lat, donor.lng]}
              icon={customIcon}
            >
              <Popup className="rounded-lg">
                <div className="font-semibold text-gray-800">{donor.full_name || "Donor"}</div>
                <div className="text-red-600 font-bold text-sm">Blood: {donor.blood_group}</div>
                <div className="text-xs text-gray-500 mt-1">{donor.phone}</div>
                <div className="text-xs text-gray-400 mt-1">{donor.address}</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}