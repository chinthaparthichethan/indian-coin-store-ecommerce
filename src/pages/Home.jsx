import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { coinsData, categories } from '../data/coins';
import { Search, ArrowRight, Shuffle } from 'lucide-react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [coins] = useState(coinsData);
  const [featuredCoins, setFeaturedCoins] = useState([]);

  // Generate random featured products
  const generateFeaturedCoins = () => {
    const shuffled = [...coins].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  // Set initial featured coins and refresh on component mount
  useEffect(() => {
    setFeaturedCoins(generateFeaturedCoins());
  }, [coins]);

  // Filter coins based on category and search term
  const filteredCoins = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? coins 
      : coins.filter(coin => coin.category === selectedCategory);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.metal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm, coins]);

  // Function to refresh featured products
  const refreshFeatured = () => {
    setFeaturedCoins(generateFeaturedCoins());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-6xl font-bold mb-6"
            >
              Discover India's Numismatic Heritage
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              Explore our curated collection of authentic Indian historical coins, 
              from ancient punch-marked coins to colonial currency. Each piece tells 
              a story of India's rich monetary history.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Collection
            </motion.button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {/* <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Search Bar Section */}
      {/* <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coins by name, period, or metal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </section> */}

      {/* Featured Products Section - Dynamic 4 Products */}
      <section id="featured" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">
                Featured Collections
              </h2>
              <button
                onClick={refreshFeatured}
                className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                title="Refresh Featured Products"
              >
                <Shuffle className="h-5 w-5 text-primary" />
              </button>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Discover our handpicked selection of the finest Indian historical coins
              <span className="text-sm block mt-1 text-gray-500">
                ✨ Featured products change each visit
              </span>
            </p>
          </div>

          {/* 4 Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredCoins.map((coin, index) => (
              <motion.div
                key={`featured-${coin.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard coin={coin} />
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collections"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                <span>View All Collections</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button
                onClick={refreshFeatured}
                className="inline-flex items-center space-x-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Shuffle className="h-5 w-5" />
                <span>Show Different Coins</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section - Show filtered results if searching */}
      {(searchTerm || selectedCategory !== 'All') && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {selectedCategory === 'All' ? 'Search Results' : `${selectedCategory} Coins`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {searchTerm ? (
                  <>
                    Found <span className="font-semibold">{filteredCoins.length}</span> coin{filteredCoins.length !== 1 ? 's' : ''} 
                    {searchTerm && <span> for "<span className="font-semibold">{searchTerm}</span>"</span>}
                  </>
                ) : (
                  <>
                    <span className="font-semibold">{filteredCoins.length}</span> coin{filteredCoins.length !== 1 ? 's' : ''} available in this collection
                  </>
                )}
              </p>
            </div>

            {filteredCoins.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No coins found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? (
                    <>Try searching for something else or browse all categories</>
                  ) : (
                    <>No coins available in this category</>
                  )}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium"
                >
                  Show All Coins
                </button>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Indian Coin Store?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the best in historical coin collecting with our expert curation and authentic pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 group"
            >
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600">Every coin is verified and authenticated by expert numismatists.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 group"
            >
              <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🏛️</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Rich History</h3>
              <p className="text-gray-600">Coins spanning over 2000 years of Indian monetary history.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 group"
            >
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Secure Delivery</h3>
              <p className="text-gray-600">Safe and insured delivery to preserve your valuable coins.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Customer Benefits
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">🚚</div>
              <h4 className="font-semibold text-gray-800 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">On orders above ₹2000</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold text-gray-800 mb-2">Secure Payment</h4>
              <p className="text-sm text-gray-600">100% safe & secure</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">✨</div>
              <h4 className="font-semibold text-gray-800 mb-2">Authentic Coins</h4>
              <p className="text-sm text-gray-600">Verified historical pieces</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold text-gray-800 mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">Always here to help</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Start Your Collection Today
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of collectors who trust us for authentic Indian historical coins
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collections"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Browse All Collections
              </Link>
              <button 
                onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-300"
              >
                View Featured
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
