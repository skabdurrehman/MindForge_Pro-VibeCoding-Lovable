
import { Home, Calendar, Trophy, TrendingUp, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Trophy, label: 'Badges', path: '/badges' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200",
              location.pathname === path
                ? "text-primary bg-primary/10 scale-110"
                : "text-muted-foreground hover:text-primary hover:scale-105"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
