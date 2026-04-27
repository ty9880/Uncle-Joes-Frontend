import { LocationCard } from '../components/LocationCard';
import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '../lib/api';
import { MapPin, Navigation, Search, X, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useMemo } from 'react';

export function Locations() {
  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set(locations.map((loc) => loc.state)));
    return uniqueStates.sort();
  }, [locations]);

  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const query = searchQuery.toLowerCase();
      // Safely handle zip_code (could be number or string from API)
      const zipCodeStr = loc.zip_code?.toString() || '';
      
      const matchesSearch = searchQuery === '' || (
        loc.city.toLowerCase().includes(query) ||
        zipCodeStr.toLowerCase().includes(query) ||
        loc.name.toLowerCase().includes(query)
      );

      const matchesState = selectedState === '' || loc.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [locations, searchQuery, selectedState]);

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <section className="bg-brand-brown/5 border-b border-brand-brown/5 pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-brand-olive uppercase tracking-[0.2em] text-[10px] font-bold font-sans">
                <MapPin size={12} fill="currentColor" />
                Find Your Haven
              </div>
              <h1 className="text-6xl md:text-8xl font-light leading-none tracking-tighter">
                Our <span className="italic">Locations</span>
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg text-brand-brown/60 font-sans font-light leading-relaxed">
                Find a piece of the rituals in your neighborhood. We have {locations.length} cozy spots 
                designed for focus, community, and comfort.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                <div className="relative group flex-grow">
                  <input
                    type="text"
                    placeholder="Search by city or zip..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white border border-brand-brown/10 font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all text-brand-brown"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/30 group-focus-within:text-brand-olive transition-colors" size={20} />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown/30 hover:text-brand-brown transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="relative group min-w-[160px]">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full h-14 pl-12 pr-10 rounded-2xl bg-white border border-brand-brown/10 font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all text-brand-brown appearance-none cursor-pointer"
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/30 group-focus-within:text-brand-olive transition-colors pointer-events-none" size={18} />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown/30 group-focus-within:text-brand-olive transition-colors pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-brand-brown/5 rounded-[2rem] animate-pulse" />
              ))
            ) : filteredLocations.length > 0 ? (
              filteredLocations.map((loc, index) => (
                <LocationCard key={loc.id} location={loc} index={index} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-brand-brown/5 rounded-[2rem] text-center px-6">
                <div className="w-16 h-16 bg-brand-brown/5 rounded-full flex items-center justify-center text-brand-brown/20 mb-4">
                  <MapPin size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-brand-brown mb-2">No locations found</h3>
                <p className="text-brand-brown/60 font-sans font-light">
                  We couldn't find any shops matching your criteria.<br />
                  Try searching for a different city or clearing your filters.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedState('');
                  }}
                  className="mt-6 text-sm font-bold uppercase tracking-widest text-brand-olive hover:text-brand-brown transition-colors font-sans underline underline-offset-8"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Map Placeholder Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-8">
              <div className="aspect-[3/4] rounded-[3rem] bg-brand-brown/10 relative overflow-hidden shadow-inner group">
                {/* Mock Map Background */}
                <div className="absolute inset-0 grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src="https://picsum.photos/seed/map-grid/800/1000?blur=2" 
                    alt="Map Grid" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Mock Map Markers */}
                <div className="absolute inset-0">
                   <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-[20%] left-[30%] text-brand-olive"
                   >
                     <MapPin size={32} fill="white" />
                   </motion.div>
                   <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="absolute top-[50%] left-[60%] text-brand-olive"
                   >
                     <MapPin size={32} fill="white" />
                   </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-10">
                  <button className="w-full bg-brand-brown text-brand-cream py-4 rounded-full font-sans uppercase tracking-[0.2em] text-[10px] font-bold shadow-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-transform">
                    <Navigation size={14} />
                    Find Nearest Shop
                  </button>
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-brand-olive p-8 text-brand-cream flex flex-col gap-6">
                <h3 className="text-2xl font-semibold leading-tight">Opening a shop near you?</h3>
                <p className="text-sm font-sans font-light text-brand-cream/80">
                  We're always looking for new neighborhoods to join. Interested in bringing 
                  Uncle Joe's to your town?
                </p>
                <button className="w-full border border-brand-cream/30 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans hover:bg-brand-cream hover:text-brand-olive transition-colors">
                  Partnership Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
