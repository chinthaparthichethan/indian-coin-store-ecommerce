import React from 'react';
import { Coins, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Coins className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">Indian Coin Store</span>
            </div>
            <p className="text-gray-300">
              Your trusted destination for authentic Indian historical coins and currency.
              Preserving history, one coin at a time.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">indiancoinstore1@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">+91 6303390415</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">Madanapalle, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Indian Coin Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
