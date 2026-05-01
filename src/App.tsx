/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Locations } from './pages/Locations';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-grow">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

