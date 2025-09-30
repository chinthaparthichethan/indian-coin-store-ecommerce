import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, Package, Truck, Heart, Star, ArrowRight, Home, MessageCircle } from 'lucide-react';

const Confirmation = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const storedOrderData = sessionStorage.getItem('orderData');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    } else {
      navigate('/');
    }

    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!orderData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Thank You for Shopping! 🎉
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Order Successfully Placed!
            </p>
            <p className="text-lg text-gray-600">
              Dear <span className="font-semibold text-primary">{orderData.customerData.name}</span>, 
              your order is confirmed and being processed.
            </p>
          </motion.div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Package className="h-6 w-6 text-primary mr-3" />
            Order Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(orderData.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-primary text-lg">
                    ₹{orderData.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Delivery Address</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{orderData.customerData.name}</p>
                <p className="text-gray-600">{orderData.customerData.email}</p>
                <p className="text-gray-600">{orderData.customerData.phone}</p>
                <p className="text-gray-600">{orderData.customerData.address}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Items Ordered ({orderData.items.length})</h3>
            <div className="grid gap-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.period}</p>
                    <p className="text-sm text-primary font-semibold">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Truck className="h-6 w-6 text-primary mr-3" />
            What happens next?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Email Sent</h4>
              <p className="text-sm text-gray-600">
                Confirmation email sent to your inbox with order details.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">We'll Contact You</h4>
              <p className="text-sm text-gray-600">
                Our team will call within 24 hours for payment and delivery.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Safe Delivery</h4>
              <p className="text-sm text-gray-600">
                Coins carefully packaged and shipped with tracking.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-2xl text-white p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Help? We're Here!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <Phone className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Call Us</h3>
              <p>+91 98765 43210</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <MessageCircle className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Email Us</h3>
              <p>support@indiancoinstore.com</p>
            </div>
          </div>

          <Link
            to="/"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 p-8 bg-white/60 backdrop-blur-sm rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🙏 Thank You for Choosing Indian Coin Store!
          </h3>
          <p className="text-gray-600 text-lg">
            Your trust means everything to us. We're excited to share these beautiful historical coins with you!
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <span className="text-2xl">🪙</span>
            <span className="text-gray-600 font-medium">Preserving History, One Coin at a Time</span>
            <span className="text-2xl">🪙</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
