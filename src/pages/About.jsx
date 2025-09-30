import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              About Indian Coin Store
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Preserving India's rich numismatic heritage through authentic historical coins and expert curation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a passion for preserving India's rich monetary history, Indian Coin Store 
                  has been at the forefront of numismatic excellence for over a decade. We specialize in 
                  authentic historical Indian coins spanning from ancient punch-marked coins to colonial 
                  and modern currency.
                </p>
                <p>
                  Our journey began with a simple mission: to make India's numismatic treasures accessible 
                  to collectors, historians, and enthusiasts worldwide. Each coin in our collection tells 
                  a unique story of India's diverse rulers, cultures, and economic evolution.
                </p>
                <p>
                  Today, we are proud to be one of India's most trusted sources for authentic historical 
                  coins, serving thousands of satisfied collectors globally with our commitment to 
                  authenticity, quality, and exceptional service.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🪙</div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                    Over 2000 Years of History
                  </h3>
                  <p className="text-gray-600">
                    From ancient Mauryan punch-marked coins to British India currency, 
                    we preserve the complete timeline of Indian monetary evolution.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine expertise, authenticity, and exceptional service to deliver the finest numismatic experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Authentication</h3>
              <p className="text-gray-600 text-sm">
                Every coin is verified by certified numismatists with decades of experience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Trusted Community</h3>
              <p className="text-gray-600 text-sm">
                Join thousands of satisfied collectors who trust our expertise and service
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">10+ Years Experience</h3>
              <p className="text-gray-600 text-sm">
                Over a decade of expertise in Indian numismatics and coin collecting
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Authenticity Guarantee</h3>
              <p className="text-gray-600 text-sm">
                100% authentic coins with certificate of authenticity for valuable pieces
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To preserve, promote, and share India's rich numismatic heritage by providing 
                  authentic historical coins to collectors, researchers, and enthusiasts worldwide. 
                  We strive to make India's monetary history accessible and appreciated by future generations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">👁️</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted platform for Indian historical coins, 
                  fostering a global community of collectors and historians who share our passion 
                  for preserving India's numismatic treasures for posterity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-primary-100 text-lg">
              Celebrating our journey in preserving Indian numismatic heritage
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">Coins Authenticated</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <div className="text-primary-100">Happy Collectors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">2000+</div>
              <div className="text-primary-100">Years of History</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Dynasties Covered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions about our coins or need expert advice? We're here to help!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-2">For inquiries and support</p>
              <a href="mailto:info@indiancoinstore.com" className="text-primary hover:text-primary/80 font-medium">
            indiancoinstore1@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-2">Monday to Saturday, 10 AM - 6 PM</p>
              <a href="tel:+919876543210" className="text-secondary hover:text-secondary/80 font-medium">
                +91 6303390415
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
              
              <p className="text-accent font-medium">
                Madanapalle<br />India
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
