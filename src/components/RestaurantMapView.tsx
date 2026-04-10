import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Star, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '@/types/restaurant';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const centerIcon = L.divIcon({
  html: '<div style="background:hsl(var(--primary));width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface Props {
  restaurants: Restaurant[];
  center?: { lat: number; lng: number };
  locationName?: string;
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);
  return null;
}

const RestaurantMapView = ({ restaurants, center, locationName }: Props) => {
  const navigate = useNavigate();
  const mapCenter = center || { lat: 12.9716, lng: 77.5946 };

  const handleCreateMeetup = (r: Restaurant) => {
    const params = new URLSearchParams({
      restaurant: r.name,
      cuisine: r.cuisine,
      location: locationName || r.address,
      lat: String(r.lat),
      lng: String(r.lng),
    });
    navigate(`/create?${params.toString()}`);
  };

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-border">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={14}
        className="w-full h-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap lat={mapCenter.lat} lng={mapCenter.lng} />
        
        {/* Center marker */}
        <Marker position={[mapCenter.lat, mapCenter.lng]} icon={centerIcon}>
          <Popup>📍 Search center</Popup>
        </Marker>

        {/* Restaurant markers */}
        {restaurants.map((r) => (
          <Marker key={r.id} position={[r.lat, r.lng]} icon={defaultIcon}>
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-gray-500">{r.cuisine}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  {r.rating && (
                    <span className="flex items-center gap-0.5">
                      ⭐ {r.rating.toFixed(1)}
                    </span>
                  )}
                  <span>{r.distance_km} km</span>
                </div>
                <button
                  onClick={() => handleCreateMeetup(r)}
                  className="mt-2 w-full bg-orange-500 text-white text-xs py-1.5 px-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  + Create Meetup
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RestaurantMapView;
