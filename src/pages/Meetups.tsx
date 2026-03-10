import { useState } from 'react';
import MeetupCard from '@/components/MeetupCard';
import CategoryChip from '@/components/CategoryChip';
import { meetups, categories, cuisineTypes } from '@/data/mockData';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Meetups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');

  const filtered = meetups.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = activeCuisine === 'All' || m.cuisine === activeCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Explore <span className="text-gradient-warm">Meetups</span>
          </h1>
          <p className="text-muted-foreground mb-6">Find food companions near you</p>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants, cuisines..."
                className="pl-10 h-11 rounded-xl bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cuisine filters */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {cuisineTypes.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => setActiveCuisine(cuisine)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCuisine === cuisine
                  ? 'gradient-warm text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Meetup grid */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} meetups found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((meetup, i) => (
              <motion.div
                key={meetup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <MeetupCard meetup={meetup} />
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🍽️</p>
              <p className="text-lg font-serif font-semibold mb-1">No meetups found</p>
              <p className="text-sm text-muted-foreground">Try a different search or create your own!</p>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <Link to="/create" className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40">
        <Button className="gradient-warm h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-shadow">
          <Plus className="h-6 w-6 text-primary-foreground" />
        </Button>
      </Link>
    </div>
  );
};

export default Meetups;
