import type { Meetup } from '@/data/mockData';
import { MapPin, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MapViewProps {
  meetups: Meetup[];
}

const MapView = ({ meetups }: MapViewProps) => {
  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-muted border border-border">
      {/* Map background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-muted flex items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          {/* Grid pattern */}
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Meetup pins */}
        {meetups.map((meetup, i) => {
          // Pseudo-random positions based on index
          const positions = [
            { top: '20%', left: '25%' },
            { top: '35%', left: '60%' },
            { top: '55%', left: '15%' },
            { top: '45%', left: '75%' },
            { top: '70%', left: '40%' },
            { top: '25%', left: '45%' },
          ];
          const pos = positions[i % positions.length];

          return (
            <motion.div
              key={meetup.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              className="absolute group"
              style={pos}
            >
              <Link to={`/meetup/${meetup.id}`}>
                <div className="relative">
                  <div className="gradient-warm rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-card rounded-xl p-3 border border-border min-w-[180px]"
                      style={{ boxShadow: 'var(--shadow-card)' }}>
                      <p className="text-sm font-serif font-semibold">{meetup.title}</p>
                      <p className="text-xs text-muted-foreground">{meetup.restaurant}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-primary text-primary" />{meetup.rating}</span>
                        <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{meetup.joinedPeople}/{meetup.maxPeople}</span>
                      </div>
                      <p className="text-xs text-primary font-medium mt-1">{meetup.distance}</p>
                    </div>
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full gradient-warm opacity-30 animate-ping" />
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Center text */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-xl px-4 py-2 border border-border">
          <p className="text-xs text-muted-foreground">{meetups.length} meetups in this area</p>
        </div>
      </div>
    </div>
  );
};

export default MapView;