import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { coffeeClubApi } from '../lib/coffeeClubApi';
import { motion } from 'motion/react';
import { LogOut, Award, Package, Calendar, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: pointsData, isLoading: pointsLoading } = useQuery({
    queryKey: ['points', user?.id],
    queryFn: () => coffeeClubApi.getPoints(user!.id),
    enabled: !!user?.id,
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => coffeeClubApi.getOrders(user!.id),
    enabled: !!user?.id,
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-brand-brown/5 pb-12">
          <div>
            <h1 className="text-6xl font-light tracking-tighter mb-2">
              Hello, <span className="italic">Member</span>
            </h1>
            <p className="text-brand-brown/40 font-sans tracking-wide uppercase text-xs">{user?.email}</p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Stats Column */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="bg-brand-brown text-brand-cream p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <Award className="mb-6 opacity-40" size={32} />
              <h3 className="text-sm font-sans font-medium uppercase tracking-[0.2em] opacity-60 mb-2">Current Points</h3>
              <div className="text-6xl font-sans font-bold">
                {pointsLoading ? '...' : pointsData?.points || 0}
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-widest opacity-40 font-sans">
                Redeem for free brew • VIP Status
              </p>
            </div>

            <div className="bg-brand-olive text-white p-10 rounded-[3rem] shadow-xl">
              <Tag className="mb-6 opacity-40" size={32} />
              <h3 className="text-sm font-sans font-medium uppercase tracking-[0.2em] opacity-60 mb-2">Member Since</h3>
              <div className="text-3xl font-serif italic">Spring 2024</div>
            </div>
          </div>

          {/* History Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <Package className="text-brand-brown/20" size={24} />
              <h2 className="text-2xl font-serif text-brand-brown">Recent Orders</h2>
            </div>

            {ordersLoading ? (
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-brand-brown/5 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-brand-brown/5 rounded-[3rem] border border-dashed border-brand-brown/10">
                <p className="text-brand-brown/40 font-sans italic">No orders yet. Head to the menu!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((order, orderIndex) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: orderIndex * 0.1 }}
                    key={`${order.id}-${orderIndex}`} 
                    className="bg-white border border-brand-brown/5 rounded-3xl p-8 hover:border-brand-brown/10 transition-colors shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-1">
                          <Calendar size={12} /> {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h4 className="text-lg font-serif text-brand-brown">
                          {order.city}, {order.state}
                        </h4>
                      </div>
                      <div className="text-xl font-sans font-bold text-brand-olive">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={`${item.order_id}-${itemIndex}`} className="flex justify-between items-center text-sm font-sans">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-brand-cream rounded-full text-[10px] font-bold text-brand-brown">
                              {item.quantity}
                            </span>
                            <span className="text-brand-brown/80">
                              {item.item_name}
                            </span>
                          </div>
                          <span className="text-brand-brown/40">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
