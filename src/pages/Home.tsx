import { Hero } from '../components/Hero';
import { MenuItemCard } from '../components/MenuItemCard';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../lib/api';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const { data: menu = [], isLoading } = useQuery({
    queryKey: ['menu', 'featured'],
    queryFn: fetchMenu,
  });

  const featuredItems = menu.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />

      {/* Featured Section */}
      <section className="mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-olive uppercase tracking-[0.2em] text-[10px] font-bold font-sans">
              <Star size={12} fill="currentColor" />
              Community Favorites
            </div>
            <h2 className="text-4xl md:text-6xl font-light leading-none tracking-tight">
              Uncle Joe's <span className="italic">Classics</span>
            </h2>
          </div>
          <Link to="/menu" className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-brown/60 hover:text-brand-brown font-sans">
            View Full Menu
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-[2rem] bg-brand-brown/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <MenuItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Story Section */}
      <section className="bg-brand-brown text-brand-cream py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                  alt="Coffee Roasting"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute top-1/2 -right-12 lg:-right-24 hidden md:block">
                <div className="bg-brand-olive p-10 rounded-[2rem] text-brand-cream">
                  <p className="text-4xl font-serif leading-tight">
                    "It's not just a cup,<br />it's a <span className="italic">ritual.</span>"
                  </p>
                  <p className="mt-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold text-brand-cream/60">
                    — Uncle Joe Himself
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 text-brand-accent uppercase tracking-[0.2em] text-[10px] font-bold font-sans">
                Our Heritage
              </div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
                Three Decades of <span className="italic">Perfecting</span> the Pour
              </h2>
              <p className="text-lg text-brand-cream/60 font-sans font-light leading-relaxed">
                Uncle Joe started in a small garage in 1994, armed with nothing but a second-hand roaster and a dream 
                to bring high-quality beans to the neighborhood. Today, we still source every bean ethically and roast 
                in small batches, ensuring every cup meets Joe's standard of excellence.
              </p>
              <ul className="flex flex-col gap-6 mt-4">
                {[
                  { title: 'Ethical Sourcing', desc: 'Direct trade with farmers we know by name.' },
                  { title: 'Small Batch Roast', desc: 'Roasted daily in our local facility.' },
                  { title: 'Precision Brew', desc: 'Every puck weighed and timed to perfection.' }
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-2xl bg-brand-cream/5 border border-brand-cream/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-olive text-brand-cream font-sans font-bold text-xs">
                      0{i+1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-cream">{feature.title}</h4>
                      <p className="text-sm text-brand-cream/40 font-sans">{feature.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* App CTA Section */}
      <section className="mx-auto max-w-7xl px-6 w-full">
         <div className="bg-brand-olive/5 rounded-[4rem] px-8 py-20 md:p-20 flex flex-col items-center text-center gap-8 border border-brand-olive/10">
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter">Join the <span className="italic">Club</span></h2>
            <p className="max-w-xl text-lg text-brand-brown/60 font-sans font-light leading-relaxed">
              Unlock secret menu items, earn double rewards on Tuesdays, and skip the line with pre-ordering.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-brand-brown text-brand-cream px-10 py-5 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:scale-105 transition-transform active:scale-95 shadow-xl">
                Get the Joe App
              </button>
              <button className="bg-brand-cream text-brand-brown border border-brand-brown/10 px-10 py-5 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-brand-brown hover:text-brand-cream transition-all">
                Learn More
              </button>
            </div>
         </div>
      </section>
    </div>
  );
}
