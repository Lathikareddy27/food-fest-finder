import { useState } from 'react';
import MeetupCard from '@/components/MeetupCard';
import MapView from '@/components/MapView';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantMapView from '@/components/RestaurantMapView';
import { meetups, cuisineTypes } from '@/data/mockData';
import { useRestaurants } from '@/hooks/useRestaurants';
import { Search, SlidersHorizontal, Plus, List, Map, X, Loader2, UtensilsCrossed } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

type ViewMode = 'list' | 'map';
type ContentTab = 'restaurants' | 'meetups';
type TimeFilter = 'any' | 'today' | 'tonight' | 'weekend';
type DistanceFilter = 'any' | '1' | '2' | '5' | '10';
type SizeFilter = 'any' | 'small' | 'medium' | 'large';

const Meetups = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationFilter = searchParams.get('location') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [contentTab, setContentTab] = useState<ContentTab>('restaurants');
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('any');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('any');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('any');

  // Fetch real restaurants when location is set
  const { data: restaurantData, isLoading: loadingRestaurants, error: restaurantError } = useRestaurants(locationFilter);

  const filtered = meetups.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = activeCuisine === 'All' || m.cuisine === activeCuisine;
    const matchesDistance = distanceFilter === 'any' || m.distanceKm <= Number(distanceFilter);
    const matchesSize = sizeFilter === 'any' ||
      (sizeFilter === 'small' && m.maxPeople <= 4) ||
      (sizeFilter === 'medium' && m.maxPeople > 4 && m.maxPeople <= 8) ||
      (sizeFilter === 'large' && m.maxPeople > 8);
    const matchesLocation = !locationFilter || locationFilter === 'Near Me' ||
      m.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesCuisine && matchesDistance && matchesSize && matchesLocation;
  });

  // Filter restaurants by search query and cuisine
  const filteredRestaurants = (restaurantData?.restaurants || []).filter(r => {
    const matchesSearch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = activeCuisine === 'All' || r.cuisine.toLowerCase().includes(activeCuisine.toLowerCase());
    const matchesDistance = distanceFilter === 'any' || r.distance_km <= Number(distanceFilter);
    return matchesSearch && matchesCuisine && matchesDistance;
  });

  const activeFilterCount = [timeFilter !== 'any', distanceFilter !== 'any', sizeFilter !== 'any'].filter(Boolean).length;
  const hasLocation = !!locationFilter && locationFilter !== 'Near Me';

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Explore <span className="text-gradient-warm">Meetups</span>
          </h1>
          {locationFilter ? (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-muted-foreground">Showing results in</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                {locationFilter}
                <button onClick={() => setSearchParams({})} className="ml-1 hover:text-primary">
                  <X className="h-3 w-3" />
                </button>
              </span>
            </div>
          ) : (
            <p className="text-muted-foreground mb-6">Find food companions near you</p>
          )}

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

      {/* Content tabs when location is active */}
      {hasLocation && (
        <div className="px-6 py-3 border-b border-border bg-card">
          <div className="max-w-7xl mx-auto flex gap-2">
            <button
              onClick={() => setContentTab('restaurants')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                contentTab === 'restaurants'
                  ? 'gradient-warm text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <UtensilsCrossed className="h-4 w-4" />
              Restaurants {loadingRestaurants ? '' : `(${filteredRestaurants.length})`}
            </button>
            <button
              onClick={() => setContentTab('meetups')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                contentTab === 'meetups'
                  ? 'gradient-warm text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Meetups ({filtered.length})
            </button>
          </div>
        </div>
      )}

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
          {/* Restaurant results */}
          {hasLocation && contentTab === 'restaurants' && (
            <>
              {loadingRestaurants ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching real restaurants near {locationFilter}...
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                        <Skeleton className="h-40 w-full" />
                        <div className="p-4 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : restaurantError ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">⚠️</p>
                  <p className="text-lg font-serif font-semibold mb-1">Could not load restaurants</p>
                  <p className="text-sm text-muted-foreground">Try searching a different location</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {filteredRestaurants.length} real restaurants near {locationFilter}
                  </p>

                  {viewMode === 'list' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredRestaurants.map((restaurant, i) => (
                        <motion.div
                          key={restaurant.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <RestaurantCard restaurant={restaurant} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <RestaurantMapView
                      restaurants={filteredRestaurants}
                      center={restaurantData?.center}
                    />
                  )}

                  {filteredRestaurants.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-4xl mb-3">🍽️</p>
                      <p className="text-lg font-serif font-semibold mb-1">No restaurants found</p>
                      <p className="text-sm text-muted-foreground">Try a different search or location</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Meetup results (default or tab) */}
          {(!hasLocation || contentTab === 'meetups') && (
            <>
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
            </>
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
