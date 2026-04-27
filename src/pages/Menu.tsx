import { MenuItemCard } from '../components/MenuItemCard';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../lib/api';
import { useState } from 'react';
import { Search, SlidersHorizontal, Filter, ChevronDown, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useMemo } from 'react';

export function Menu() {
  const { data: menu = [], isLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const categories = ['All', ...new Set(menu.map(item => item.category).filter(Boolean))];

  const sizes = useMemo(() => {
    const uniqueSizes = Array.from(new Set(menu.map(item => item.size).filter(Boolean)));
    return uniqueSizes.sort();
  }, [menu]);

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesSize = selectedSize === '' || item.size === selectedSize;
    return matchesCategory && matchesSearch && matchesSize;
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

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative group flex-grow">
              <input
                type="text"
                placeholder="Search for your favorite brew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-12 rounded-full bg-white border border-brand-brown/10 font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all text-brand-brown"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-brown/40 group-focus-within:text-brand-olive transition-colors" size={20} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-brown/30 hover:text-brand-brown transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="relative group sm:min-w-[180px]">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full h-14 pl-12 pr-10 rounded-full bg-white border border-brand-brown/10 font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all text-brand-brown appearance-none cursor-pointer text-sm"
              >
                <option value="">All Sizes</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/30 group-focus-within:text-brand-olive transition-colors pointer-events-none" size={16} />
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-brown/30 group-focus-within:text-brand-olive transition-colors pointer-events-none" size={16} />
            </div>
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
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setSelectedSize(''); }}
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
