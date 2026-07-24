import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Keep the video as the main focus for a few seconds before fading the UI in
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500); 
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          {/* Background Video */}
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            autoPlay
            loop
            muted
            playsInline
            src={isMobile ? "/images/mobile_bg_video.mp4" : "/images/bg_video.mp4"}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              zIndex: -2,
              filter: isLoaded ? 'brightness(0.3)' : 'brightness(1)',
              transition: 'filter 1.5s ease',
            }}
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            <Navigation />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:departmentId" element={<Category />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
            
            <CartDrawer />
          </motion.div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
