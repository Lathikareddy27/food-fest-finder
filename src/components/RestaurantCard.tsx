import { MapPin, Star, Phone, Globe, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-card/90 backdrop-blur text-foreground border-0 text-xs font-medium">
              {restaurant.cuisine}
            </Badge>
          </div>
          {restaurant.rating && (
            <div className="absolute top-3 right-3">
              <div className="bg-card/90 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-semibold">{restaurant.rating.toFixed(1)}</span>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif font-semibold text-lg leading-tight mb-1">
            {restaurant.name}
          </h3>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {restaurant.distance_km} km away
            </span>
            {restaurant.opening_hours && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {restaurant.opening_hours.length > 20
                  ? restaurant.opening_hours.slice(0, 20) + '…'
                  : restaurant.opening_hours}
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
            {restaurant.address}
          </p>

          {/* Action links */}
          <div className="flex gap-2">
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="h-3 w-3" /> Call
              </a>
            )}
            {restaurant.website && (
              <a
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-3 w-3" /> Website
              </a>
            )}
            <div className="flex-1" />
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-warm text-xs font-semibold text-primary-foreground">
              <MapPin className="h-3 w-3" /> {restaurant.distance_km} km
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
