import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Coins, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Collections', path: '/collections', icon: Coins },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Cart', path: '/cart', icon: ShoppingCart, badge: totalItems }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🪙</span>
            </div>
            <span className="font-serif text-xl font-bold text-gray-800">
              Indian Coin Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{link.name}</span>
                  {link.badge > 0 && (
                    <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-3 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{link.name}</span>
                    </div>
                    {link.badge > 0 && (
                      <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
