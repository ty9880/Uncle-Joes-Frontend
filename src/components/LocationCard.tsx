import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { Location } from '../lib/api';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export interface LocationCardProps {
  location: Location;
  index: number;
  key?: any;
}

export function LocationCard({ location, index }: LocationCardProps) {
  const formatTime = (time: number | null) => {
    if (time === null || time === 0) return 'Closed';
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const getDayRange = (open: number | null, close: number | null) => {
    if (open === null || close === null || (open === 0 && close === 0)) return 'Closed';
    return `${formatTime(open)} - ${formatTime(close)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] bg-white border border-brand-brown/5 transition-all hover:shadow-2xl hover:border-brand-olive/20"
    >
      <div className="w-full md:w-48 aspect-square shrink-0 overflow-hidden rounded-2xl bg-brand-cream">
        <img
          src={`https://picsum.photos/seed/location-${location.id}/400/400`}
          alt={location.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-grow flex-col justify-between py-2">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-semibold text-brand-brown">{location.name}</h3>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-olive/10 text-brand-olive transition-colors group-hover:bg-brand-olive group-hover:text-white cursor-pointer">
              <ExternalLink size={14} />
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-olive shrink-0 mt-0.5" />
              <div className="text-sm text-brand-brown/80 font-sans leading-tight">
                <p className="font-medium text-brand-brown">{location.address_one}</p>
                {location.address_two && <p>{location.address_two}</p>}
                <p>{location.city}, {location.state} {location.zip_code}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {location.phone_number && (
                <div className="flex items-center gap-3 text-sm text-brand-brown/80 font-sans">
                  <Phone size={16} className="text-brand-olive shrink-0" />
                  <span>{location.phone_number}</span>
                </div>
              )}
              <div className="flex items-start gap-3 text-sm text-brand-brown/80 font-sans">
                <Clock size={16} className="text-brand-olive shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-brand-brown">Hours</p>
                  <p className="text-[11px] leading-tight">
                    Mon-Thu: {getDayRange(location.hours_monday_open, location.hours_monday_close)}<br />
                    Fri: {getDayRange(location.hours_friday_open, location.hours_friday_close)}<br />
                    Sat: {getDayRange(location.hours_saturday_open, location.hours_saturday_close)}<br />
                    Sun: {getDayRange(location.hours_sunday_open, location.hours_sunday_close)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0 pt-4 flex items-center justify-between border-t border-brand-brown/5">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest font-sans",
            location.hours_monday_open ? "text-brand-olive" : "text-red-500"
          )}>
            {location.hours_monday_open ? "Open Now" : "Hours Vary"}
          </span>
          <button className="text-xs font-semibold underline underline-offset-4 text-brand-brown hover:text-brand-olive font-sans uppercase">
            Get Directions
          </button>
        </div>
      </div>
    </motion.div>
  );
}
