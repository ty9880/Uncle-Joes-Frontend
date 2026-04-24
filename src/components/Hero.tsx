import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full bg-brand-olive/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-olive font-sans">
              Since 1994 • Small Batch Roasted
            </div>
            <h1 className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter text-brand-brown">
              Coffee that feels like <span className="italic font-normal italic-small">home.</span>
            </h1>
            <p className="max-w-md text-lg text-brand-brown/70 leading-relaxed font-sans font-light">
              We believe the best conversations happen over a perfectly brewed cup. 
              Join us for a slow morning or a quick local pick-me-up.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-brand-olive px-8 py-4 text-sm font-medium uppercase tracking-widest text-brand-cream transition-transform hover:scale-105 active:scale-95 font-sans"
              >
                Browse Menu <ArrowRight size={18} />
              </Link>
              <Link
                to="/locations"
                className="inline-flex items-center gap-2 rounded-full border border-brand-brown/20 px-8 py-4 text-sm font-medium uppercase tracking-widest text-brand-brown transition-colors hover:bg-brand-brown/5 font-sans"
              >
                Find Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
                alt="Cozy Coffee Shop"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 aspect-square w-48 overflow-hidden rounded-full border-8 border-brand-cream shadow-xl hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
                alt="Latte Art"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
