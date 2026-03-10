import { users, meetups } from '@/data/mockData';
import { MapPin, Star, Calendar, Users, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MeetupCard from '@/components/MeetupCard';
import { motion } from 'framer-motion';

const Profile = () => {
  const user = users[2]; // mock current user
  const userMeetups = meetups.filter(m => m.creator.id === user.id);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Profile header */}
      <div className="gradient-warm px-6 pt-12 pb-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 text-sm mb-1">Welcome back</p>
            <h1 className="text-2xl font-serif font-bold text-primary-foreground">{user.name}</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 rounded-xl">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile card overlapping */}
      <div className="max-w-3xl mx-auto px-6 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-6 border border-border"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-20 w-20 rounded-full gradient-warm flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary-foreground">{user.name.charAt(0)}</span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-serif font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {user.location}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
              <div className="flex items-center gap-1 justify-center sm:justify-start mt-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-semibold">{user.rating}</span>
                <span className="text-xs text-muted-foreground">rating</span>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.meetupsCreated}</p>
              <p className="text-xs text-muted-foreground">Created</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.meetupsJoined}</p>
              <p className="text-xs text-muted-foreground">Joined</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">4.9</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </motion.div>

        {/* My meetups */}
        <div className="mt-8">
          <h2 className="text-xl font-serif font-bold mb-4">My Meetups</h2>
          {userMeetups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userMeetups.map(m => <MeetupCard key={m.id} meetup={m} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <p className="text-3xl mb-2">🍽️</p>
              <p className="text-muted-foreground">No meetups yet. Create your first one!</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <Button variant="ghost" className="mt-8 text-muted-foreground hover:text-accent w-full justify-center">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
