import { useState } from 'react';
import MeetupCard from '@/components/MeetupCard';
import MapView from '@/components/MapView';
import { meetups, cuisineTypes } from '@/data/mockData';
import { Search, SlidersHorizontal, Plus, List, Map, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'list' | 'map';
type TimeFilter = 'any' | 'today' | 'tonight' | 'weekend';
type DistanceFilter = 'any' | '1' | '2' | '5' | '10';
type SizeFilter = 'any' | 'small' | 'medium' | 'large';

const Meetups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('any');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('any');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('any');

  const filtered = meetups.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = activeCuisine === 'All' || m.cuisine === activeCuisine;
    const matchesDistance = distanceFilter === 'any' || m.distanceKm <= Number(distanceFilter);
    const matchesSize = sizeFilter === 'any' ||
      (sizeFilter === 'small' && m.maxPeople <= 4) ||
      (sizeFilter === 'medium' && m.maxPeople > 4 && m.maxPeople <= 8) ||
      (sizeFilter === 'large' && m.maxPeople > 8);
    return matchesSearch && matchesCuisine && matchesDistance && matchesSize;
  });

  const activeFilterCount = [timeFilter !== 'any', distanceFilter !== 'any', sizeFilter !== 'any'].filter(Boolean).length;

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
            <Button
              variant="outline"
              size="icon"
              className={`h-11 w-11 rounded-xl shrink-0 relative ${showFilters ? 'border-primary text-primary' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-warm text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {/* View toggle */}
            <div className="flex rounded-xl border border-border overflow-hidden shrink-0">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 h-11 flex items-center gap-1 text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'gradient-warm text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="h-4 w-4" /> List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 h-11 flex items-center gap-1 text-sm font-medium transition-colors ${
                  viewMode === 'map' ? 'gradient-warm text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <Map className="h-4 w-4" /> Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-card"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Filters</h3>
                <button onClick={() => { setTimeFilter('any'); setDistanceFilter('any'); setSizeFilter('any'); }}
                  className="text-xs text-primary font-medium">Clear all</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Time */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Time</p>
                  <div className="flex flex-wrap gap-1.5">
                    {([['any', 'Any'], ['today', 'Today'], ['tonight', 'Tonight'], ['weekend', 'Weekend']] as const).map(([val, label]) => (
                      <button key={val} onClick={() => setTimeFilter(val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          timeFilter === val ? 'gradient-warm text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}>{label}</button>
                    ))}
                  </div>
                </div>
                {/* Distance */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Distance</p>
                  <div className="flex flex-wrap gap-1.5">
                    {([['any', 'Any'], ['1', '≤ 1 km'], ['2', '≤ 2 km'], ['5', '≤ 5 km'], ['10', '≤ 10 km']] as const).map(([val, label]) => (
                      <button key={val} onClick={() => setDistanceFilter(val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          distanceFilter === val ? 'gradient-warm text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}>{label}</button>
                    ))}
                  </div>
                </div>
                {/* Group Size */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Group Size</p>
                  <div className="flex flex-wrap gap-1.5">
                    {([['any', 'Any'], ['small', '2–4'], ['medium', '5–8'], ['large', '8+']] as const).map(([val, label]) => (
                      <button key={val} onClick={() => setSizeFilter(val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          sizeFilter === val ? 'gradient-warm text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}>{label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Content */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} meetups found</p>

          {viewMode === 'list' ? (
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
          ) : (
            <MapView meetups={filtered} />
          )}

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