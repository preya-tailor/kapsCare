import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, Leaf, Sparkles, Heart, Users, Award } from 'lucide-react';
import ProductCard from '../components/Common/ProductCard';
import { mockProducts } from '../data/mockData';
import { getCategories } from '../services/categoryService';
import { Category } from '../types';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const featuredProducts = mockProducts.slice(0, 4);
  const benefits = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'All our products are made from pure, organic ingredients'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Rigorous testing ensures the highest quality standards'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery to your doorstep'
    },
    {
      icon: Star,
      title: 'Expert Approved',
      description: 'Recommended by Ayurvedic practitioners'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Years of Wisdom' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Natural Products' },
    { number: '4.9', label: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Wellness Enthusiast',
      content: 'The Ashwagandha powder has completely transformed my stress levels and energy. I feel more balanced and centered.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Michael Chen',
      role: 'Health Coach',
      content: 'As a health professional, I recommend these products to my clients. The quality is exceptional and results are remarkable.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Emma Davis',
      role: 'Yoga Instructor',
      content: 'The herbal tea blend has become an essential part of my evening routine. It helps me unwind and sleep better.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-[#efdfc5] to-[#efdfc5]/90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#efdfc5]/70 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-[#1c1108]/10 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-[#1c1108]/15 rounded-full blur-sm animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-[#1c1108]/10 rounded-full blur-sm animate-pulse delay-700"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center bg-[#1c1108]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 text-[#1c1108] text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2 text-[#1c1108]" />
                Ancient Wisdom, Modern Wellness
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-light text-[#1c1108] mb-6 leading-tight">
                Discover Your
                <span className="block font-semibold text-[#1c1108]">
                  Inner Balance
                </span>
              </h1>
              
              <p className="text-xl text-[#1c1108]/80 mb-8 max-w-xl leading-relaxed">
                Experience the transformative power of authentic Ayurvedic healing. 
                Our premium collection of natural remedies brings ancient wisdom to your modern life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(28,17,8,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1c1108] text-[#efdfc5] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1c1108]/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
                  >
                    <span>Begin Your Journey</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-[#1c1108]/30 text-[#1c1108] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1c1108]/10 backdrop-blur-sm transition-all duration-300"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Ayurvedic wellness and spa"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1108]/20 to-transparent rounded-3xl"></div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-[#efdfc5]/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-[#1c1108]/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1c1108] p-3 rounded-full">
                    <Heart className="w-6 h-6 text-[#efdfc5]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1c1108]">5000+</p>
                    <p className="text-sm text-[#1c1108]/70">Years of Ancient Wisdom</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-6 -right-6 bg-[#efdfc5]/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-[#1c1108]/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1c1108] p-3 rounded-full">
                    <Star className="w-6 h-6 text-[#efdfc5]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1c1108]">4.9</p>
                    <p className="text-sm text-[#1c1108]/70">Customer Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1c1108] dark:bg-[#efdfc5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1108]/90 to-[#1c1108] dark:from-[#efdfc5]/90 dark:to-[#efdfc5]"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#efdfc5] dark:text-[#1c1108] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#efdfc5]/80 dark:text-[#1c1108]/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#efdfc5] dark:bg-[#1c1108]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 text-[#1c1108] dark:text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Award className="w-4 h-4 mr-2" />
              Premium Quality
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-light text-[#1c1108] dark:text-[#efdfc5] mb-6"
            >
              Why Choose Our 
              <span className="font-semibold text-[#1c1108] dark:text-[#efdfc5] block">
                Ayurvedic Solutions?
              </span>
            </motion.h2>
            <p className="text-xl text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect harmony of ancient wisdom and modern science through our carefully curated collection of premium Ayurvedic products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group text-center"
              >
                <div className="bg-[#efdfc5] dark:bg-[#1c1108] p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-[#1c1108]/10 dark:border-[#efdfc5]/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c1108]/5 to-[#1c1108]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="bg-[#1c1108] dark:bg-[#efdfc5] p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-8 h-8 text-[#efdfc5] dark:text-[#1c1108]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1c1108] dark:text-[#efdfc5] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-[#1c1108] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#efdfc5]/5 to-[#efdfc5]/10 opacity-50"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-[#efdfc5]/10 text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Users className="w-4 h-4 mr-2" />
              Wellness Categories
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-light text-[#efdfc5] mb-6"
            >
              Explore Our 
              <span className="font-semibold text-[#efdfc5] block">
                Wellness Collection
              </span>
            </motion.h2>
            <p className="text-xl text-[#efdfc5]/80 max-w-3xl mx-auto leading-relaxed">
              Discover our thoughtfully organized categories, each designed to support different aspects of your wellness journey.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-[#efdfc5]">Loading categories...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-[#efdfc5] rounded-3xl shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-500 border border-[#1c1108]/10">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={`http://localhost:5000${category.image}`}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#efdfc5]/60 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#efdfc5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1c1108] mb-2 group-hover:text-[#1c1108]/80 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-[#1c1108]/80 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="mt-4 flex items-center text-[#1c1108] group-hover:text-[#1c1108]/80 transition-colors duration-300">
                        <span className="text-sm font-medium">Explore Collection</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-br from-[#efdfc5] via-[#efdfc5]/90 to-[#efdfc5]/80 dark:from-[#1c1108] dark:via-[#1c1108]/90 dark:to-[#1c1108]/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 text-[#1c1108] dark:text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4 mr-2" />
              Bestsellers
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-light text-[#1c1108] dark:text-[#efdfc5] mb-6"
            >
              Featured 
              <span className="font-semibold text-[#1c1108] dark:text-[#efdfc5] block">
                Wellness Products
              </span>
            </motion.h2>
            <p className="text-xl text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-3xl mx-auto leading-relaxed">
              Discover our most loved Ayurvedic products, carefully selected for their exceptional quality and transformative benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(28,17,8,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1c1108] text-[#efdfc5] px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#1c1108]/90 transition-all duration-300 inline-flex items-center space-x-3 shadow-lg"
              >
                <span>View All Products</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#1c1108] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#efdfc5]/5 to-[#efdfc5]/10 opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-[#efdfc5]/10 text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Heart className="w-4 h-4 mr-2" />
              Customer Stories
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-light text-[#efdfc5] mb-6"
            >
              What Our 
              <span className="font-semibold text-[#efdfc5] block">
                Customers Say
              </span>
            </motion.h2>
            <p className="text-xl text-[#efdfc5]/80 max-w-3xl mx-auto leading-relaxed">
              Real experiences from our wellness community who have transformed their lives with our Ayurvedic products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#efdfc5] p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#1c11085]/10"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#1c1108] fill-current" />
                  ))}
                </div>
                <p className="text-[#1c1108]/80 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[#1c1108]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#1c1108]/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-[#efdfc5] via-[#efdfc5]/90 to-[#efdfc5]/80 dark:from-[#1c1108] dark:via-[#1c1108]/90 dark:to-[#1c1108]/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#efdfc5]/80 to-[#efdfc5]/90 dark:from-[#1c1108]/80 dark:to-[#1c1108]/90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#1c1108]/5 dark:bg-[#efdfc5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#1c1108]/5 dark:bg-[#efdfc5]/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 backdrop-blur-sm text-[#1c1108] dark:text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#1c1108] dark:text-[#efdfc5]" />
              Join Our Wellness Community
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-light text-[#1c1108] dark:text-[#efdfc5] mb-6"
            >
              Stay Connected with 
              <span className="block font-semibold">
                Your Wellness Journey
              </span>
            </motion.h2>
            
            <p className="text-xl text-[#1c1108]/90 dark:text-[#efdfc5]/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of wellness enthusiasts and receive exclusive offers, ancient wisdom, 
              and the latest insights from our Ayurvedic experts delivered straight to your inbox.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-none outline-none text-[#efdfc5] placeholder-[#1c1108]/50 shadow-lg backdrop-blur-sm bg-[#efdfc5]/95 focus:bg-[#efdfc5] transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1c1108] text-[#efdfc5] px-8 py-4 rounded-full font-semibold hover:bg-[#1c1108]/90 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            
            <p className="text-sm text-[#1c1108]/70 dark:text-[#efdfc5]/70 mt-4">
              ✨ No spam, only wellness wisdom and exclusive offers
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;