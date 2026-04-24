import { MenuItemCard } from '../components/MenuItemCard';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../lib/api';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

export function Menu() {
  const { data: menu = [], isLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(menu.map(item => item.category).filter(Boolean))];

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <section className="bg-brand-brown/5 border-b border-brand-brown/5 pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8">
            The <span className="italic">Menu</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-brand-brown/60 font-sans font-light leading-relaxed mb-12">
            Explore our curated selection of roasts, seasonal specials, and local treats. 
            Every order is made fresh for your order.
          </p>

          <div className="max-w-md mx-auto relative group">
            <input
              type="text"
              placeholder="Search for your favorite brew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-full bg-white border border-brand-brown/10 font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all text-brand-brown"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-brown/40 group-focus-within:text-brand-olive transition-colors" size={20} />
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-brand-brown/5 pb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-sans transition-all shrink-0",
                  activeCategory === cat 
                    ? "bg-brand-brown text-brand-cream border-transparent" 
                    : "bg-transparent text-brand-brown/50 border border-brand-brown/10 hover:border-brand-brown/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-brown/40 font-sans shrink-0">
            <SlidersHorizontal size={14} />
            {filteredMenu.length} items found
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-3xl bg-brand-brown/5 animate-pulse" />
            ))}
          </div>
        ) : filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMenu.map((item, index) => (
              <MenuItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-brand-brown/5 rounded-[3rem] border border-dashed border-brand-brown/10">
            <p className="text-2xl font-serif text-brand-brown/40">No items found matching your search.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 text-sm font-bold uppercase tracking-widest text-brand-brown underline underline-offset-4 hover:text-brand-olive font-sans"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
