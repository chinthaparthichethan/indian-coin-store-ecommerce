import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, User, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { showOrderSuccess } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  // Generate HTML for items list (for email)
  const generateItemsHTML = (items) => {
    return items.map(item => `
      <div style="border-bottom: 1px solid #e5e7eb; padding: 15px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="margin: 0 0 5px 0; color: #1f2937; font-weight: 600;">${item.name}</h4>
            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px;">${item.period}</p>
            <p style="margin: 0; color: #8B4513; font-weight: 600;">
              ₹${item.price.toLocaleString('en-IN')} × ${item.quantity}
            </p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">
              ₹${(item.price * item.quantity).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    `).join('');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      console.log('🚀 Processing order...');

      const orderNumber = `ICS${Date.now()}`;
      const orderData = {
        orderNumber,
        items,
        totalAmount: getTotalPrice(),
        date: new Date().toISOString()
      };

      // Customer email data
      const customerEmailData = {
        email: data.email,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        customer_address: data.address,
        order_number: orderNumber,
        order_date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        total_amount: getTotalPrice().toLocaleString('en-IN'),
        items_list: generateItemsHTML(items)
      };

      console.log('📧 Sending customer email...');

      try {
        // Send customer email
        const customerResult = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
          customerEmailData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        console.log('✅ Customer email sent successfully:', customerResult.status);

        // Try to send owner email (optional)
        try {
          if (import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID) {
            const ownerEmailData = {
              email: 'indiancoinstore1@gmail.com', // Use your actual email
              customer_name: data.name,
              customer_email: data.email,
              customer_phone: data.phone,
              customer_address: data.address,
              order_number: orderNumber,
              order_date: new Date().toLocaleDateString('en-IN'),
              total_amount: getTotalPrice().toLocaleString('en-IN'),
              items_list: generateItemsHTML(items)
            };

            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
              ownerEmailData,
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            console.log('✅ Owner email sent');
          }
        } catch (ownerEmailError) {
          console.warn('⚠️ Owner email failed (but customer email worked):', ownerEmailError.text);
        }

        // Clear cart
        clearCart();

        // Show success notification and redirect to home
        showOrderSuccess(orderNumber, data.name);
        
        // Navigate to home after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);

      } catch (customerEmailError) {
        console.error('❌ Customer email failed:', customerEmailError);
        alert(`Email sending failed: ${customerEmailError.text || customerEmailError.message}`);
      }
      
    } catch (error) {
      console.error('❌ Order processing error:', error);
      alert(`Order processing failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Complete Your Order</h1>
        <p className="text-gray-600">Fill in your details to receive order confirmation via email</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Details Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-primary mr-3" />
            <h2 className="font-serif text-xl font-semibold">Customer Details</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { 
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone number must be 10 digits'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter 10-digit phone"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city', { required: 'City is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="address"
                  {...register('address', { 
                    required: 'Address is required',
                    minLength: { value: 10, message: 'Address must be at least 10 characters' }
                  })}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors resize-none"
                  placeholder="Enter your complete address with PIN code"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-primary text-white py-4 text-lg rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Complete Order</span>
                </>
              )}
            </motion.button>

            <div className="text-center text-sm text-gray-500">
              <p>
                📧 Order confirmation will be sent to your email
                <br />
                📞 We'll contact you within 24 hours for payment details
                <br />
                🔒 No payment required now - secure & hassle-free
              </p>
            </div>
          </form>
        </motion.div>

        {/* Order Summary - Same as before */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24"
        >
          <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.period}</p>
                  <p className="text-sm text-primary font-semibold">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-800">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span className="text-primary">₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">📧 What happens next?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Order confirmation sent to your email</li>
              <li>• We'll contact you for payment & delivery</li>
              <li>• Coins carefully packaged & shipped</li>
              <li>• Return to home after order completion</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
