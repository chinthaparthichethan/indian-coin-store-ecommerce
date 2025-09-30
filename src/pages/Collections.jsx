import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { coinsData, categories } from '../data/coins';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort coins
  const filteredCoins = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? coinsData 
      : coinsData.filter(coin => coin.category === selectedCategory);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.metal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort coins
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            🪙 Coin Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-primary-100"
          >
            Explore our complete collection of authentic Indian historical coins
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? 'auto' : 0, 
              opacity: showFilters ? 1 : 0 
            }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t mt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCoins.length}</span> coins
            {selectedCategory !== 'All' && (
              <span> in <span className="font-semibold">{selectedCategory}</span></span>
            )}
          </p>
          
          {searchTerm && (
            <p className="text-gray-600">
              Search results for "<span className="font-semibold">{searchTerm}</span>"
            </p>
          )}
        </div>
      </div>

      {/* Products Grid - 5 Items Per Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredCoins.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filteredCoins.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <ProductCard coin={coin} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No coins found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Collections;
