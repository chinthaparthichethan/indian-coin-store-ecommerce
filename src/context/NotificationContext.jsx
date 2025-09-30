import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message, data = {}) => {
    setNotification({
      type,
      message,
      data,
      id: Date.now()
    });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const showOrderSuccess = (orderNumber, customerName) => {
    showNotification('orderSuccess', 
      `Order confirmed! We'll contact you soon.`,
      { orderNumber }
    );
  };

  return (
    <NotificationContext.Provider value={{
      notification,
      showNotification,
      hideNotification,
      showOrderSuccess
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
