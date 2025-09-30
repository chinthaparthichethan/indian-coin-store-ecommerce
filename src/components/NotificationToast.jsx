import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const NotificationToast = ({ isVisible, onClose, message, orderNumber }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Simple Success Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white text-center relative">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>

                <h2 className="text-xl font-bold">Order Confirmed! 🎉</h2>
                <p className="text-white/90 mt-1">#{orderNumber}</p>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Thank you for your order! We'll contact you soon for payment and delivery details.
                </p>

                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <p className="text-sm text-primary font-medium">
                    🪙 Preserving History, One Coin at a Time
                  </p>
                </div>

                {/* Auto close progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-1 bg-primary rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Redirecting to home...</p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
