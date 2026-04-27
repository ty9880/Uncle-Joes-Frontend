import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function Cart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const taxRate = 0.07;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + taxAmount;

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-brand-brown/5 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <Coffee size={40} className="text-brand-brown/20" />
        </div>
        <h2 className="text-4xl font-serif text-brand-brown mb-4">Your bag is empty</h2>
        <p className="text-brand-brown/60 font-sans font-light mb-8 max-w-md text-center">
          Looks like you haven't added anything yet. 
          Grab a fresh roast or a local treat to get started.
        </p>
        <Link 
          to="/menu" 
          className="bg-brand-brown text-brand-cream px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-brown/90 transition-all shadow-lg hover:scale-105"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 border-b border-brand-brown/5 pb-8">
              <h1 className="text-6xl font-light tracking-tighter">
                Your <span className="italic">Bag</span>
              </h1>
              <div className="text-right">
                <span className="block text-2xl font-serif text-brand-brown">{totalItems} Items</span>
                <button 
                  onClick={clearCart}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {cart.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-white rounded-3xl border border-brand-brown/5 hover:border-brand-brown/10 transition-colors"
                >
                  <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-brand-cream">
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-medium text-brand-brown">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-brown/20 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.size && (
                        <span className="text-[10px] bg-brand-cream text-brand-brown px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {item.size}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-brand-olive font-sans">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-brand-brown/5 rounded-full p-1 border border-brand-brown/5">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-brown hover:bg-brand-brown hover:text-white transition-all shadow-sm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm font-sans">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-brown hover:bg-brand-brown hover:text-white transition-all shadow-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="w-full md:w-96">
            <div className="sticky top-32 p-8 bg-brand-brown text-brand-cream rounded-[3rem] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              
              <h2 className="text-3xl font-serif mb-8 relative">Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8 border-b border-white/10 pb-8 relative">
                <div className="flex justify-between items-center text-white/60 font-sans text-sm tracking-wide">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-white/60 font-sans text-sm tracking-wide">
                  <span>Tax (7%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-white/60 font-sans text-sm tracking-wide">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-12 relative">
                <span className="text-lg font-sans font-light opacity-80 uppercase tracking-widest">Total</span>
                <span className="text-4xl font-sans font-bold">${finalTotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-brand-cream text-brand-brown py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-cream/90 hover:scale-[1.02] flex items-center justify-center gap-3 relative overflow-hidden group/btn">
                <span className="relative z-10">Checkout</span>
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
                <div className="absolute inset-0 bg-brand-olive opacity-0 group-hover/btn:opacity-10 transition-opacity" />
              </button>

              <div className="mt-8 flex flex-col gap-3 text-center opacity-40 font-sans text-[10px] uppercase tracking-widest relative">
                Secure checkout • Free delivery • Handcrafted with love
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
