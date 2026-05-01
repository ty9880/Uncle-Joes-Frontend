import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { coffeeClubApi } from '../lib/coffeeClubApi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Coffee, ArrowRight, Loader2 } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await coffeeClubApi.login(email);
      login(data.id, data.email);
      navigate('/profile');
    } catch (err) {
      setError('Join failed. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-xl border border-brand-brown/5"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-brand-brown/5 rounded-full flex items-center justify-center mb-6">
            <Coffee size={32} className="text-brand-brown" />
          </div>
          <h1 className="text-4xl font-serif text-brand-brown text-center mb-2">Coffee Club</h1>
          <p className="text-brand-brown/60 text-center font-sans">Enter your email to access your rewards.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-2 ml-4">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-8 rounded-full bg-brand-cream/30 border border-brand-brown/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all font-sans"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center font-sans bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-brown text-brand-cream h-14 rounded-full font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-brand-brown/90 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Continue <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-center text-brand-brown/40 uppercase tracking-widest font-sans">
          All members use password: <span className="text-brand-brown/60">Coffee123!</span>
        </p>
      </motion.div>
    </div>
  );
}
