import { Plus } from 'lucide-react';
import { MenuItem } from '../lib/api';
import { motion } from 'motion/react';

export interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  key?: any;
}

export function MenuItemCard({ item, index }: MenuItemCardProps) {
  const getItemImage = (name: string, category: string) => {
    const n = name.toLowerCase();
    
    if (n.includes('latte')) return 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=600&q=80';
    if (n.includes('cappuccino')) return 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80';
    if (n.includes('mocha')) return 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80';
    if (n.includes('iced coffee')) return 'https://www.eatingbirdfood.com/wp-content/uploads/2025/06/iced-coffee-hero-new.jpg';
    if (n.includes('green tea') || n.includes('matcha')) return 'https://roguecommunityhealth.org/wp-content/uploads/2024/09/benefits-green-tea-scaled.webp';
    if (n.includes('chai')) return 'https://images.unsplash.com/photo-1546421845-6471bdcf3edf?auto=format&fit=crop&w=600&q=80';
    if (n.includes('black tea')) return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80';
    if (n.includes('herbal tea') || n.includes('tea')) return 'https://www.botanicalinterests.com/community/blog/wp-content/uploads/2024/08/herbs-for-tea.jpg';
    if (n.includes('hot chocolate') || n.includes('cocoa')) return 'https://www.allrecipes.com/thmb/lnb_004MI6wGuJXQ-uDxMUNZmQk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20211-creamy-hot-cocoa-DDMFS-4x3-ed6183b2bbb74bbba4a06a78e4d72350.jpg';
    if (n.includes('espresso')) return 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80';
    
    if (category.toLowerCase().includes('coffee')) return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80';
    if (category.toLowerCase().includes('tea')) return 'https://images.unsplash.com/photo-1594631252845-29fc4586c562?auto=format&fit=crop&w=600&q=80';
    
    return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80';
  };

  const imageUrl = item.image_url || getItemImage(item.name, item.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col gap-4 p-4 rounded-3xl bg-white transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-cream">
        <img
          src={imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-3 right-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-brown text-white shadow-lg transition-transform hover:scale-110">
            <Plus size={20} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-brown font-sans shadow-sm">
            {item.category || 'Coffee'}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-2 pb-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-medium text-brand-brown leading-tight flex-1">{item.name}</h3>
          <span className="text-lg font-semibold text-brand-olive font-sans shrink-0">${item.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-3 mt-1 mb-2">
          {item.size && (
            <span className="text-[10px] bg-brand-cream text-brand-brown px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans">
              {item.size}
            </span>
          )}
          {item.calories !== undefined && (
            <span className="text-[10px] text-brand-brown/50 font-sans font-medium uppercase tracking-widest">
              {item.calories} Cal
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-brand-brown/60 line-clamp-2 font-sans font-light leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
