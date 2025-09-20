import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Heart, Sparkles, Users, Award, Globe2, Star, Play, Instagram, ExternalLink, Quote, CheckCircle, ArrowRight } from 'lucide-react';
import { Review } from '../types';
import { getReviews } from '../services/reviewService';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 dark:bg-[#1c1108]/80 backdrop-blur-sm border border-[#1c1108]/10 dark:border-[#efdfc5]/10 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group hover:scale-105"
    >
      {/* Quote Icon */}
      <div className="flex justify-between items-start mb-4">
        <Quote className="w-8 h-8 text-[#1c1108]/20 dark:text-[#efdfc5]/20" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-colors ${i < (review.rating || 0)
                ? 'text-amber-400 fill-amber-400'
                : 'text-[#1c1108]/20 dark:text-[#efdfc5]/20'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <p className="text-[#1c1108] dark:text-[#efdfc5] leading-relaxed mb-6 text-sm md:text-base flex-grow">
        "{review.content}"
      </p>

      {/* Customer Info */}
      <div className="flex items-center mt-auto gap-3 pt-4 border-t border-[#1c1108]/10 dark:border-[#efdfc5]/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c1108] to-[#1c1108]/70 dark:from-[#efdfc5] dark:to-[#efdfc5]/70 flex items-center justify-center">
          <span className="text-[#efdfc5] dark:text-[#1c1108] font-semibold text-sm">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-[#1c1108] dark:text-[#efdfc5]">{review.name}</p>
          <p className="text-xs text-[#1c1108]/70 dark:text-[#efdfc5]/70">{review.role}</p>
        </div>
        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
      </div>
    </motion.div>
  );
};

const InstagramVideo: React.FC<{
  embedUrl: string;
  title: string;
  description: string;
  index: number;
}> = ({ embedUrl, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <div className="bg-white/90 dark:bg-[#1c1108]/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#1c1108]/10 dark:border-[#efdfc5]/10">
        {/* Video Container */}
        <div className="relative w-full aspect-[9/16] overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            allow="encrypted-media"
            title={title}
          />
        </div>


        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#1c1108] dark:text-[#efdfc5] mb-2 group-hover:text-[#1c1108]/80 dark:group-hover:text-[#efdfc5]/80 transition-colors">
            {title}
          </h3>
          <p className="text-[#1c1108]/70 dark:text-[#efdfc5]/70 text-sm leading-relaxed">
            {description}
          </p>

          {/* View on Instagram Link */}
          <div className="mt-4 pt-4 border-t border-[#1c1108]/10 dark:border-[#efdfc5]/10">
            <a
              href="https://www.instagram.com/kapscareofficial"
              className="inline-flex items-center text-sm font-medium text-[#1c1108] dark:text-[#efdfc5] hover:opacity-70 transition-opacity group/link"
            >
              <Instagram className="w-4 h-4 mr-2" />
              View on Instagram
              <ExternalLink className="w-3 h-3 ml-1 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        setReviewsError('Failed to fetch reviews');
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  const topReviews = useMemo(() => {
    const sorted = [...reviews].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
    return sorted.slice(0, 12);
  }, [reviews]);

  const pillars = [
    {
      icon: Leaf,
      title: 'Rooted In Nature',
      desc: 'We harness the purity of botanicals to craft remedies that honor traditional Ayurvedic wisdom.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Shield,
      title: 'Quality You Trust',
      desc: 'Every batch goes through rigorous checks, so you get safe, consistent, and effective products.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Heart,
      title: 'Wellness First',
      desc: 'Your well-being is our compass—each formula is designed to restore balance, gently and holistically.',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      icon: Globe2,
      title: 'Sustainable Ethos',
      desc: 'Responsible sourcing and eco-conscious packaging guide how we operate—today and tomorrow.',
      gradient: 'from-teal-500 to-cyan-600'
    }
  ];

  const metrics = [
    { number: '10+', label: 'Years of Research and Development', icon: Award },
    { number: '20K+', label: 'Happy Customers', icon: Users },
    { number: '9+', label: 'Countries We Serve', icon: Globe2 },
    { number: '4.9', label: 'Average Rating', icon: Star }
  ];

  // Instagram video data - Replace with your actual Instagram embed URLs
  const instagramVideos = [
    {
      embedUrl: "https://www.instagram.com/reel/C2wGt3koZ3t/embed",
      title: "Daily Wellness Routine",
      description: "Discover how our customers incorporate KapsCare products into their daily wellness routines for optimal health and balance."
    },
    {
      embedUrl: "https://www.instagram.com/reel/DG7R0DQPIVv/embed",
      title: "Behind the Scenes",
      description: "Take a peek into our sustainable manufacturing process and see how we craft each product with care and precision."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#efdfc5] via-[#efdfc5]/95 to-[#efdfc5]/90 dark:from-[#1c1108] dark:via-[#1c1108]/95 dark:to-[#1c1108]/90">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#1c1108]/5 dark:bg-[#efdfc5]/5 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#1c1108]/5 dark:bg-[#efdfc5]/5 animate-pulse delay-1000" />
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1108]/10 via-transparent to-[#1c1108]/5 dark:from-[#efdfc5]/10 dark:via-transparent dark:to-[#efdfc5]/5" />

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-[#1c1108]/10 to-[#1c1108]/5 dark:from-[#efdfc5]/10 dark:to-[#efdfc5]/5 backdrop-blur-sm text-[#1c1108] dark:text-[#efdfc5] px-6 py-3 rounded-full text-sm font-medium mb-8 border border-[#1c1108]/10 dark:border-[#efdfc5]/10"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              About KapsCare
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1c1108] dark:text-[#efdfc5] leading-tight mb-8">
              Ancient Wisdom,{" "}
              <span className="bg-gradient-to-r from-[#1c1108] to-[#1c1108]/70 dark:from-[#efdfc5] dark:to-[#efdfc5]/70 bg-clip-text text-transparent">
                Modern Life
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#1c1108]/80 dark:text-[#efdfc5]/80 leading-relaxed max-w-3xl mx-auto">
              We blend time-honored Ayurvedic practices with contemporary research to deliver natural products that help you rediscover balance, clarity, and everyday vitality.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1c1108] dark:bg-[#efdfc5] text-[#efdfc5] dark:text-[#1c1108] rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a
                href="#mission"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#1c1108] dark:border-[#efdfc5] text-[#1c1108] dark:text-[#efdfc5] rounded-full font-semibold hover:bg-[#1c1108] hover:text-[#efdfc5] dark:hover:bg-[#efdfc5] dark:hover:text-[#1c1108] transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Enhanced */}
      <section id="mission" className="py-20 relative">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white/50 dark:bg-[#1c1108]/50 backdrop-blur-sm p-10 rounded-3xl border border-[#1c1108]/10 dark:border-[#efdfc5]/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1c1108] to-[#1c1108]/70 dark:from-[#efdfc5] dark:to-[#efdfc5]/70 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#efdfc5] dark:text-[#1c1108]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1c1108] dark:text-[#efdfc5]">Our Mission</h2>
              </div>

              <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 text-lg leading-relaxed mb-8">
                To make holistic wellness accessible to everyone by offering trustworthy Ayurvedic products that are transparent, ethically sourced, and crafted with care. We aim to build a community that values nourishment—from the inside out.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#1c1108] dark:text-[#efdfc5] font-medium">
                    Certified, tested, and crafted under stringent quality standards.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#1c1108] dark:text-[#efdfc5] font-medium">
                    100% natural ingredients sourced responsibly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Ayurvedic care"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-white/90 dark:bg-[#1c1108]/90 backdrop-blur-sm border border-[#1c1108]/10 dark:border-[#efdfc5]/10 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1c1108] dark:text-[#efdfc5]">Community First</p>
                  <p className="text-sm text-[#1c1108]/70 dark:text-[#efdfc5]/70">Guided by empathy and care</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Videos Section - New */}
      <section className="py-20 bg-white/30 dark:bg-[#1c1108]/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm text-[#1c1108] dark:text-[#efdfc5] px-6 py-3 rounded-full text-sm font-medium mb-6 border border-purple-500/20"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Follow Our Journey
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#1c1108] dark:text-[#efdfc5] mb-4"
            >
              See Us In Action
            </motion.h2>

            <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-2xl mx-auto text-lg">
              Get an inside look at our processes, customer stories, and wellness tips through our Instagram content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instagramVideos.map((video, index) => (
              <InstagramVideo
                key={index}
                {...video}
                index={index}
              />
            ))}
          </div>

          {/* Follow Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="https://www.instagram.com/kapscareofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow @KapsCare
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-[#1c1108] dark:text-[#efdfc5] mb-4"
            >
              What We Stand For
            </motion.h2>
            <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-2xl mx-auto text-lg">
              Four guiding principles shape every decision and every product we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white/80 dark:bg-[#1c1108]/80 backdrop-blur-sm border border-[#1c1108]/10 dark:border-[#efdfc5]/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-center text-[#1c1108] dark:text-[#efdfc5] mb-4">
                    {pillar.title}
                  </h3>

                  <p className="text-center text-[#1c1108]/80 dark:text-[#efdfc5]/80 leading-relaxed">
                    {pillar.desc}
                  </p>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section - Enhanced */}
      <section className="py-20 bg-[#1c1108] dark:bg-[#efdfc5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1108] via-[#1c1108]/95 to-[#1c1108]/90 dark:from-[#efdfc5] dark:via-[#efdfc5]/95 dark:to-[#efdfc5]/90" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#efdfc5] dark:bg-[#1c1108] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#efdfc5] dark:bg-[#1c1108] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[#efdfc5] dark:bg-[#1c1108] animate-pulse delay-500" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-4">
                  <metric.icon className="w-8 h-8 mx-auto text-[#efdfc5] dark:text-[#1c1108] mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl md:text-6xl font-bold text-[#efdfc5] dark:text-[#1c1108] mb-2 group-hover:scale-105 transition-transform">
                    {metric.number}
                  </div>
                  <div className="text-[#efdfc5]/80 dark:text-[#1c1108]/80 font-medium text-sm md:text-base">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Enhanced */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm text-[#1c1108] dark:text-[#efdfc5] px-6 py-3 rounded-full text-sm font-medium mb-6 border border-red-500/20"
            >
              <Heart className="w-4 h-4 mr-2" />
              What Our Community Says
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#1c1108] dark:text-[#efdfc5] mb-4"
            >
              Real Stories. Real Results.
            </motion.h2>

            <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-2xl mx-auto text-lg">
              Hear directly from our customers about their wellness journey with KapsCare.
            </p>
          </div>

          {reviewsError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8 p-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-2xl"
            >
              <p className="text-red-600 dark:text-red-400 font-medium">{reviewsError}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingReviews ? (
              Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-3xl bg-gradient-to-br from-[#1c1108]/5 to-[#1c1108]/10 dark:from-[#efdfc5]/5 dark:to-[#efdfc5]/10 animate-pulse border border-[#1c1108]/10 dark:border-[#efdfc5]/10"
                />
              ))
            ) : topReviews.length > 0 ? (
              topReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 flex items-center justify-center">
                  <Star className="w-8 h-8 text-[#1c1108]/30 dark:text-[#efdfc5]/30" />
                </div>
                <p className="text-[#1c1108]/60 dark:text-[#efdfc5]/60 text-lg">
                  No reviews available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-[#1c1108] via-[#1c1108]/95 to-[#1c1108]/90 dark:from-[#efdfc5] dark:via-[#efdfc5]/95 dark:to-[#efdfc5]/90 rounded-3xl p-12 md:p-16 overflow-hidden shadow-2xl"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-[#efdfc5]/5 dark:bg-[#1c1108]/5 animate-pulse delay-500" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 backdrop-blur-sm text-[#efdfc5] dark:text-[#1c1108] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Your Journey
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#efdfc5] dark:text-[#1c1108] mb-4 leading-tight">
                  Ready to Begin Your Wellness Journey?
                </h3>

                <p className="text-[#efdfc5]/80 dark:text-[#1c1108]/80 text-lg leading-relaxed mb-8">
                  Explore our curated collection and find the right support for your everyday balance. Join thousands of satisfied customers on their path to natural wellness.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="/shop"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#efdfc5] dark:bg-[#1c1108] text-[#1c1108] dark:text-[#efdfc5] rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#efdfc5] dark:border-[#1c1108] text-[#efdfc5] dark:text-[#1c1108] rounded-full font-semibold hover:bg-[#efdfc5] hover:text-[#1c1108] dark:hover:bg-[#1c1108] dark:hover:text-[#efdfc5] transition-all duration-300"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#efdfc5]/20 dark:border-[#1c1108]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-3">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[#efdfc5] dark:text-[#1c1108] font-semibold">100% Natural</p>
                      <p className="text-[#efdfc5]/70 dark:text-[#1c1108]/70 text-sm">Pure ingredients</p>
                    </div>

                    <div className="bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#efdfc5]/20 dark:border-[#1c1108]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[#efdfc5] dark:text-[#1c1108] font-semibold">Lab Tested</p>
                      <p className="text-[#efdfc5]/70 dark:text-[#1c1108]/70 text-sm">Quality assured</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-8">
                    <div className="bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#efdfc5]/20 dark:border-[#1c1108]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[#efdfc5] dark:text-[#1c1108] font-semibold">Trusted</p>
                      <p className="text-[#efdfc5]/70 dark:text-[#1c1108]/70 text-sm">20K+ customers</p>
                    </div>

                    <div className="bg-[#efdfc5]/10 dark:bg-[#1c1108]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#efdfc5]/20 dark:border-[#1c1108]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
                        <Globe2 className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[#efdfc5] dark:text-[#1c1108] font-semibold">Global</p>
                      <p className="text-[#efdfc5]/70 dark:text-[#1c1108]/70 text-sm">9+ countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;