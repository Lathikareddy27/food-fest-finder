import { MapPin, Star, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantMapViewProps {
  restaurants: Restaurant[];
  center?: { lat: number; lng: number };
}

const RestaurantMapView = ({ restaurants, center }: RestaurantMapViewProps) => {
  // Position restaurants on the map using their relative lat/lng from center
  const getPosition = (restaurant: Restaurant, index: number) => {
    if (!center || restaurants.length === 0) {
      // Fallback positions
      const positions = [
        { top: '20%', left: '25%' }, { top: '35%', left: '60%' },
        { top: '55%', left: '15%' }, { top: '45%', left: '75%' },
        { top: '70%', left: '40%' }, { top: '25%', left: '45%' },
        { top: '60%', left: '70%' }, { top: '15%', left: '55%' },
      ];
      return positions[index % positions.length];
    }

    // Normalize lat/lng relative to center and map to percentage positions
    const latRange = 0.03; // ~3km
    const lngRange = 0.03;
    const relLat = (restaurant.lat - center.lat) / latRange;
    const relLng = (restaurant.lng - center.lng) / lngRange;

    const top = Math.max(8, Math.min(85, 50 - relLat * 40));
    const left = Math.max(8, Math.min(88, 50 + relLng * 40));

    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-muted border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-muted flex items-center justify-center">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Center marker */}
        {center && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-10"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="bg-primary rounded-full p-2 shadow-lg">
              <Navigation className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping" />
          </motion.div>
        )}

        {/* Restaurant pins */}
        {restaurants.map((restaurant, i) => {
          const pos = getPosition(restaurant, i);
          return (
            <motion.div
              key={restaurant.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
              className="absolute group z-20"
              style={pos}
            >
              <div className="relative">
                <div className="gradient-warm rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                  <div className="bg-card rounded-xl p-3 border border-border min-w-[200px]"
                    style={{ boxShadow: 'var(--shadow-card)' }}>
                    <p className="text-sm font-serif font-semibold">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      {restaurant.rating && (
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          {restaurant.rating.toFixed(1)}
                        </span>
                      )}
                      <span>{restaurant.distance_km} km</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Info bar */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-xl px-4 py-2 border border-border">
          <p className="text-xs text-muted-foreground">{restaurants.length} restaurants found</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMapView;
