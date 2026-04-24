import { Coffee, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SVGProps } from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-brand-brown text-brand-cream pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-olive text-brand-cream">
                <Coffee size={20} />
              </div>
              <span className="text-2xl font-semibold tracking-tight">
                Uncle <span className="font-light italic text-brand-olive">Joe's</span>
              </span>
            </Link>
            <p className="text-brand-cream/60 font-sans font-light leading-relaxed">
              Roasting locally, brewing globally. Your neighborhood sanctuary for the perfect cup.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-cream/10 transition-colors hover:bg-brand-cream hover:text-brand-brown">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-cream/10 transition-colors hover:bg-brand-cream hover:text-brand-brown">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-cream/10 transition-colors hover:bg-brand-cream hover:text-brand-brown">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-6 font-sans">Quick Links</h4>
            <ul className="flex flex-col gap-4 font-sans font-light text-brand-cream/80">
              <li><Link to="/" className="hover:text-brand-cream">Home</Link></li>
              <li><Link to="/menu" className="hover:text-brand-cream">Our Menu</Link></li>
              <li><Link to="/locations" className="hover:text-brand-cream">Find a Shop</Link></li>
              <li><a href="#" className="hover:text-brand-cream">About Uncle Joe</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-6 font-sans">Coffee Culture</h4>
            <ul className="flex flex-col gap-4 font-sans font-light text-brand-cream/80">
              <li><a href="#" className="hover:text-brand-cream">Brewing Guides</a></li>
              <li><a href="#" className="hover:text-brand-cream">Our Roastery</a></li>
              <li><a href="#" className="hover:text-brand-cream">The Bean Journal</a></li>
              <li><a href="#" className="hover:text-brand-cream">Wholesale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-6 font-sans">Subscribe</h4>
            <p className="text-sm text-brand-cream/60 mb-4 font-sans font-light leading-relaxed">
              Join our list for special roasts and secret menu releases.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="email address" 
                className="flex-grow rounded-full bg-brand-cream/5 border border-brand-cream/10 px-4 py-2 text-sm font-sans focus:outline-none focus:border-brand-olive transition-colors"
              />
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-olive text-brand-cream transition-transform hover:scale-105 active:scale-95 shrink-0">
                <Plus size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-brand-cream/40 font-sans tracking-wider uppercase">
            © {new Date().getFullYear()} Uncle Joe's Coffee. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-brand-cream/40 font-sans">
            <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Plus({ size, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
