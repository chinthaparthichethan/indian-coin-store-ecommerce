import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, increase quantity by the amount specified (default 1)
        const quantityToAdd = action.payload.quantity || 1;
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + quantityToAdd, 10) } // Max 10
              : item
          )
        };
      }
      // If new item, add with specified quantity (default 1)
      const initialQuantity = action.payload.quantity || 1;
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: initialQuantity }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(action.payload.quantity, 10) } // Max 10
            : item
        )
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) } // Max 10
            : item
        )
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) } // Min 0
            : item
        ).filter(item => item.quantity > 0) // Remove items with 0 quantity
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };

    case 'SET_CART_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    isLoading: true 
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      dispatch({ type: 'SET_CART_LOADING', payload: true });
      const savedCart = localStorage.getItem('indianCoinCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart data
        if (Array.isArray(parsedCart)) {
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('indianCoinCart');
    } finally {
      dispatch({ type: 'SET_CART_LOADING', payload: false });
    }
  }, []);

  // Save cart to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (!state.isLoading) {
      try {
        localStorage.setItem('indianCoinCart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, state.isLoading]);

  // Add item to cart (supports custom quantity)
  const addToCart = (item, quantity = 1) => {
    if (!item || !item.id) {
      console.error('Invalid item provided to addToCart');
      return;
    }
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...item, quantity } 
    });
  };

  // Remove item completely from cart
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  // Update item quantity (removes if quantity <= 0)
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id, quantity: Math.min(quantity, 10) } 
      });
    }
  };

  // Increase item quantity by 1
  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  // Decrease item quantity by 1
  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  // Clear all items from cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Get total price of all items in cart
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Get total number of items in cart
  const getTotalItems = () => {
    return state.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  // Get quantity of specific item in cart
  const getItemQuantity = (id) => {
    const item = state.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (id) => {
    return state.items.some(item => item.id === id);
  };

  // Get cart summary for display
  const getCartSummary = () => {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    const itemCount = state.items.length;
    
    return {
      totalItems,
      totalPrice,
      itemCount,
      isEmpty: itemCount === 0,
      formattedTotal: `₹${totalPrice.toLocaleString('en-IN')}`
    };
  };

  // Export cart data (for orders, etc.)
  const exportCartData = () => {
    return {
      items: state.items,
      summary: getCartSummary(),
      timestamp: new Date().toISOString()
    };
  };

  const value = {
    // State
    items: state.items,
    isLoading: state.isLoading,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    
    // Getters
    getTotalPrice,
    getTotalItems,
    getItemQuantity,
    isInCart,
    getCartSummary,
    exportCartData
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Custom hook for cart summary
export const useCartSummary = () => {
  const { getCartSummary } = useCart();
  return getCartSummary();
};

// Custom hook for specific item
export const useCartItem = (id) => {
  const { getItemQuantity, isInCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  
  return {
    quantity: getItemQuantity(id),
    isInCart: isInCart(id),
    increase: () => increaseQuantity(id),
    decrease: () => decreaseQuantity(id),
    remove: () => removeFromCart(id)
  };
};
