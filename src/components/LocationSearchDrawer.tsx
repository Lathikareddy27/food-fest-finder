import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, Clock, Home, Briefcase, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { locations } from '@/data/locations';

interface SavedAddress {
  id: string;
  label: string;
  location: string;
  icon: 'home' | 'work' | 'other';
}

const RECENT_KEY = 'foodbuddy_recent_locations';
const SAVED_KEY = 'foodbuddy_saved_addresses';

const defaultSaved: SavedAddress[] = [
  { id: '1', label: 'Home', location: 'Koramangala, Bangalore', icon: 'home' },
  { id: '2', label: 'Work', location: 'Indiranagar, Bangalore', icon: 'work' },
];

const iconMap = {
  home: Home,
  work: Briefcase,
  other: MapPin,
};

interface LocationSearchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LocationSearchDrawer = ({ open, onOpenChange }: LocationSearchDrawerProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    setRecentSearches(stored ? JSON.parse(stored) : []);
    const savedStored = localStorage.getItem(SAVED_KEY);
    setSavedAddresses(savedStored ? JSON.parse(savedStored) : defaultSaved);
  }, [open]);

  const filteredLocations = query.trim()
    ? locations.filter(
        (l) =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.city.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const selectLocation = (locationName: string) => {
    const updated = [locationName, ...recentSearches.filter((r) => r !== locationName)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    onOpenChange(false);
    setQuery('');
    navigate(`/meetups?location=${encodeURIComponent(locationName)}`);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      selectLocation(query.trim());
    }
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_KEY);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="font-serif text-lg">Search Location</DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSearchSubmit} className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search any area, city, or place..."
              className="pl-10 h-11 rounded-xl bg-muted/50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>

        <div className="overflow-y-auto px-4 pb-6 space-y-5">
          {/* Search this location button - always visible when typing */}
          {query.trim() && (
            <Button
              onClick={handleSearchSubmit}
              className="w-full gradient-warm text-primary-foreground rounded-xl h-11 font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Search "{query.trim()}"
            </Button>
          )}

          {/* Use current location */}
          <button
            onClick={() => selectLocation('Near Me')}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Navigation className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Use Current Location</p>
              <p className="text-xs text-muted-foreground">Using GPS</p>
            </div>
          </button>

          {/* Matching predefined locations */}
          {query.trim() && filteredLocations.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Suggestions</p>
              <div className="space-y-1">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => selectLocation(loc.name)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">{loc.city}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Saved addresses */}
          {!query.trim() && (
            <>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Saved Addresses</p>
                <div className="space-y-1">
                  {savedAddresses.map((addr) => {
                    const Icon = iconMap[addr.icon];
                    return (
                      <button
                        key={addr.id}
                        onClick={() => selectLocation(addr.location.split(',')[0].trim())}
                        className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">{addr.label}</p>
                          <p className="text-xs text-muted-foreground">{addr.location}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent</p>
                    <button onClick={clearRecent} className="text-xs text-primary font-medium">Clear</button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((loc, i) => (
                      <button
                        key={i}
                        onClick={() => selectLocation(loc)}
                        className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                        <p className="text-sm">{loc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LocationSearchDrawer;
