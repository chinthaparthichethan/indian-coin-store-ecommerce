import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import NotificationToast from './components/NotificationToast';
import './App.css';

// Scroll Position Manager Component
const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Save current scroll position before route change
    const saveScrollPosition = () => {
      const scrollData = {
        x: window.scrollX,
        y: window.scrollY,
        path: location.pathname
      };
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollData));
    };

    // Restore scroll position after route change
    const restoreScrollPosition = () => {
      const savedScrollData = sessionStorage.getItem('scrollPosition');
      if (savedScrollData) {
        const { x, y, path } = JSON.parse(savedScrollData);
        // Only restore if coming back to the same page or maintaining position
        setTimeout(() => {
          window.scrollTo({
            left: x,
            top: y,
            behavior: 'instant' // Use 'smooth' if you want smooth scrolling
          });
        }, 100); // Small delay to ensure page is rendered
      }
    };

    // Save position when leaving page
    window.addEventListener('beforeunload', saveScrollPosition);
    
    // Restore position when entering page
    restoreScrollPosition();

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location]);

  return null;
};

const AppContent = () => {
  const { notification, hideNotification } = useNotification();

  return (
    <Router>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        
        <NotificationToast
          isVisible={notification?.type === 'orderSuccess'}
          onClose={hideNotification}
          message={notification?.message}
          orderNumber={notification?.data?.orderNumber}
        />
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;
