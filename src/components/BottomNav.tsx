import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, User, MessageCircle } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/meetups', label: 'Explore', icon: Search },
  { path: '/create', label: 'Create', icon: PlusCircle },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
  { path: '/profile', label: 'Profile', icon: User },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          const isCreate = path === '/create';
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 ${
                isCreate
                  ? 'relative -top-3'
                  : ''
              } ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {isCreate ? (
                <div className="gradient-warm rounded-full p-3 shadow-lg">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
              ) : (
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              )}
              <span className={`text-[10px] font-medium ${isCreate ? 'mt-1' : ''}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
