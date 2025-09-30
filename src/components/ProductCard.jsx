import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ coin }) => {
  const { addToCart, increaseQuantity, decreaseQuantity, items } = useCart();

  const cartItem = items.find(item => item.id === coin.id);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => addToCart(coin, 1);
  const handleIncrease = () => increaseQuantity(coin.id);
  const handleDecrease = () => decreaseQuantity(coin.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
    >
      {/* Image with overlay controls */}
      <div className="relative aspect-square overflow-hidden group">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-full h-full object-cover"
        />
        
        {/* Rare badge */}
        {coin.rarity === 'Very Rare' && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
            Rare
          </span>
        )}

        {/* Quantity controls overlay - Always visible when in cart */}
        {isInCart && (
          <div className="absolute bottom-2 right-2 flex items-center bg-primary rounded-full shadow-lg">
            <button
              onClick={handleDecrease}
              className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center m-1"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-white font-semibold text-sm px-1 min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center m-1"
              disabled={quantity >= 10}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Add button - Shows when not in cart */}
        {!isInCart && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm line-clamp-2 leading-tight mb-1">
          {coin.name}
        </h3>
        <p className="text-xs text-gray-500 mb-1">{coin.period}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">
            ₹{coin.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-gray-400">{coin.metal}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
