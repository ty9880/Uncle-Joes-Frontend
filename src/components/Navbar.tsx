import { Link, useLocation } from 'react-router-dom';
import { Coffee, MapPin, Menu as MenuIcon, ShoppingBag } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const navItems = [
  { name: 'Home', href: '/', icon: Coffee },
  { name: 'Menu', href: '/menu', icon: MenuIcon },
  { name: 'Locations', href: '/locations', icon: MapPin },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-brown/10 bg-brand-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-olive text-brand-cream transition-transform group-hover:rotate-12">
            <Coffee size={20} />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-brand-brown">
            Uncle <span className="font-light italic text-brand-olive">Joe's</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors hover:text-brand-olive font-sans uppercase",
                  isActive ? "text-brand-brown" : "text-brand-brown/60"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-brand-olive"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-brown/10 hover:bg-brand-brown/5 transition-colors">
            <ShoppingBag size={20} className="text-brand-brown" />
          </button>
        </div>
      </div>
    </nav>
  );
}
