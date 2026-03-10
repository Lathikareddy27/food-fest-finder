import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Meetup } from '@/data/mockData';
import { motion } from 'framer-motion';

interface MeetupCardProps {
  meetup: Meetup;
  featured?: boolean;
}

const MeetupCard = ({ meetup, featured = false }: MeetupCardProps) => {
  const spotsLeft = meetup.maxPeople - meetup.joinedPeople;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/meetup/${meetup.id}`} className="block group">
        <div className={`bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 ${featured ? '' : ''}`}
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="relative overflow-hidden">
            <img
              src={meetup.image}
              alt={meetup.restaurant}
              className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${featured ? 'h-48' : 'h-40'}`}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-card/90 backdrop-blur text-foreground border-0 text-xs font-medium">
                {meetup.cuisine}
              </Badge>
              {meetup.status === 'full' && (
                <Badge className="bg-accent text-accent-foreground border-0 text-xs">Full</Badge>
              )}
            </div>
            <div className="absolute top-3 right-3">
              <div className="bg-card/90 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-semibold">{meetup.rating}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="p-4">
            <h3 className="font-serif font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {meetup.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{meetup.restaurant}</p>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {meetup.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {meetup.time}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {meetup.joinedPeople}/{meetup.maxPeople}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full gradient-warm flex items-center justify-center">
                  <span className="text-[10px] text-primary-foreground font-bold">
                    {meetup.creator.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{meetup.creator.name}</span>
              </div>
              {spotsLeft > 0 ? (
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
                  {spotsLeft} spots left <ArrowRight className="h-3 w-3" />
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">Waitlist</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MeetupCard;
