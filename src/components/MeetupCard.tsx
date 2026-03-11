import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Meetup } from '@/data/mockData';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface MeetupCardProps {
  meetup: Meetup;
  featured?: boolean;
}

const MeetupCard = ({ meetup, featured = false }: MeetupCardProps) => {
  const spotsLeft = meetup.maxPeople - meetup.joinedPeople;
  const { toast } = useToast();

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (spotsLeft > 0) {
      toast({ title: '🎉 You joined!', description: `You're now part of "${meetup.title}"` });
    } else {
      toast({ title: '📋 Waitlist', description: `You've been added to the waitlist for "${meetup.title}"` });
    }
  };

  const displayParticipants = meetup.participants?.slice(0, 3) ?? [];
  const extraCount = (meetup.participants?.length ?? 0) - 3;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/meetup/${meetup.id}`} className="block group">
        <div className={`bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300`}
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
            </div>

            {/* Joined avatars */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex -space-x-1.5">
                {displayParticipants.map((p, i) => (
                  <div key={i} className="h-6 w-6 rounded-full gradient-warm flex items-center justify-center border-2 border-card">
                    <span className="text-[9px] font-bold text-primary-foreground">{p.name.charAt(0)}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {extraCount > 0 ? `+${extraCount} joined` : `${meetup.joinedPeople} joined`}
              </span>
            </div>

            {/* Creator trust info */}
            <div className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-muted/50">
              <div className="h-7 w-7 rounded-full gradient-warm flex items-center justify-center shrink-0">
                <span className="text-[10px] text-primary-foreground font-bold">
                  {meetup.creator.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold truncate">{meetup.creator.name}</span>
                  {meetup.creator.verified && (
                    <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5 fill-primary text-primary" /> {meetup.creator.rating}
                  </span>
                  <span>{meetup.creator.meetupsCreated} hosted</span>
                </div>
              </div>
            </div>

            {/* Join button */}
            <Button
              onClick={handleJoin}
              className={`w-full rounded-xl h-9 text-sm font-semibold ${
                spotsLeft > 0
                  ? 'gradient-warm text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              variant={spotsLeft > 0 ? 'default' : 'outline'}
            >
              {spotsLeft > 0 ? (
                <>Join Meetup · {spotsLeft} spots left</>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MeetupCard;