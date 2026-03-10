import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/meetups', label: 'Explore' },
    { path: '/create', label: 'Create Meetup' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-warm rounded-xl p-2">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-serif">FoodBuddy</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </Button>
          <Link to="/profile">
            <div className="h-9 w-9 rounded-full gradient-warm flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
