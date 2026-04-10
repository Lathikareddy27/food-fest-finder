import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import type { Meetup } from '@/data/mockData';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapViewProps {
  meetups: Meetup[];
}

const MapView = ({ meetups }: MapViewProps) => {
  // Default center (Bangalore)
  const center: [number, number] = [12.9716, 77.5946];

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-border">
      <MapContainer
        center={center}
        zoom={12}
        className="w-full h-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Meetups don't have lat/lng in mock data, so show placeholder pins */}
        {meetups.slice(0, 6).map((meetup, i) => {
          const offsets = [
            [0.01, 0.01], [-0.01, 0.02], [0.02, -0.01],
            [-0.02, -0.02], [0.005, -0.015], [-0.015, 0.005],
          ];
          const pos: [number, number] = [
            center[0] + (offsets[i]?.[0] || 0),
            center[1] + (offsets[i]?.[1] || 0),
          ];
          return (
            <Marker key={meetup.id} position={pos} icon={defaultIcon}>
              <Popup>
                <div className="min-w-[160px]">
                  <p className="font-semibold text-sm">{meetup.title}</p>
                  <p className="text-xs text-gray-500">{meetup.restaurant}</p>
                  <p className="text-xs text-gray-500">{meetup.date} · {meetup.time}</p>
                  <Link
                    to={`/meetup/${meetup.id}`}
                    className="mt-2 inline-block text-xs text-blue-600 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
