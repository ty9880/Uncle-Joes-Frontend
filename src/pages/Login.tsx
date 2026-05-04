import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { coffeeClubApi } from '../lib/coffeeClubApi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Coffee, ArrowRight, Loader2 } from 'lucide-react';

export function Login() {
  const [view, setView] = useState<'choice' | 'login' | 'register'>('choice');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Coffee123!');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await coffeeClubApi.login(email, password);
      login(data.id, data.email, data.name);
      navigate('/profile');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await coffeeClubApi.register(email, name, password);
      login(data.id, data.email, data.name);
      navigate('/profile');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (view === 'choice') {
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
            <p className="text-brand-brown/60 text-center font-sans italic">Unlock exclusive perks & rewards</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setView('login')}
              className="w-full bg-brand-brown text-brand-cream h-14 rounded-full font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-brand-brown/90 transition-all shadow-sm"
            >
              Login <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setView('register')}
              className="w-full bg-white text-brand-brown border border-brand-brown/20 h-14 rounded-full font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-brand-cream/50 transition-all"
            >
              Create Account
            </button>
          </div>

          <p className="mt-10 text-[10px] text-center text-brand-brown/40 uppercase tracking-widest font-sans leading-relaxed">
            Members earn 5 points per $1 <br />
            Free birthday brew • Exclusive early access
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-xl border border-brand-brown/5"
      >
        <button 
          onClick={() => { setView('choice'); setError(''); }}
          className="text-brand-brown/40 hover:text-brand-brown transition-colors text-[10px] font-bold uppercase tracking-widest mb-8 flex items-center gap-2"
        >
          <span className="text-lg">←</span> Back to choices
        </button>

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-serif text-brand-brown text-center mb-2">
            {view === 'login' ? 'Welcome Back' : 'Join the Club'}
          </h1>
          <p className="text-brand-brown/60 text-center font-sans tracking-tight">
            {view === 'login' 
              ? 'Sign in to access your rewards' 
              : 'Create an account to start earning points'}
          </p>
        </div>

        <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-6">
          {view === 'register' && (
            <div>
              <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-2 ml-4">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-8 rounded-full bg-brand-cream/30 border border-brand-brown/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all font-sans"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-2 ml-4">
              Email Address
            </label>
            <input
              id="email"
              type="text"
              required
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-8 rounded-full bg-brand-cream/30 border border-brand-brown/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all font-sans"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-2 ml-4">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 px-8 rounded-full bg-brand-cream/30 border border-brand-brown/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all font-sans"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center font-sans bg-red-50 py-3 px-4 rounded-2xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-brown text-brand-cream h-14 rounded-full font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-brand-brown/90 transition-all disabled:opacity-50 mt-2 shadow-lg shadow-brand-brown/10"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                {view === 'login' ? 'Login' : 'Create Account'} <ArrowRight size={16} />
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
