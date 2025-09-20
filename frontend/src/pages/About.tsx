import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Heart, Sparkles, Users, Award, Globe2, Star } from 'lucide-react';
import { Review } from '../types';
import { getReviews } from '../services/reviewService';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-[#efdfc5] dark:bg-[#1c1108] border border-[#1c1108]/10 dark:border-[#efdfc5]/10 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover border border-[#1c1108]/10 dark:border-[#efdfc5]/10"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 flex items-center justify-center text-[#1c1108] dark:text-[#efdfc5] font-semibold">
            {review.name?.charAt(0) || 'U'}
          </div>
        )}
        <div>
          <p className="text-[#1c1108] dark:text-[#efdfc5] font-semibold leading-tight">
            {review.name || review.userName || 'Anonymous'}
          </p>
          <p className="text-sm text-[#1c1108]/60 dark:text-[#efdfc5]/60">
            {review.role || 'Customer'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < (review.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-[#1c1108]/30 dark:text-[#efdfc5]/30'}`}
          />
        ))}
      </div>

      <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 leading-relaxed">
        {review.content || review.comment}
      </p>
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

  // Show up to 8 reviews (prefer latest by createdAt if present)
  const topReviews = useMemo(() => {
    const sorted = [...reviews].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
    return sorted.slice(0, 8);
  }, [reviews]);

  const pillars = [
    {
      icon: Leaf,
      title: 'Rooted In Nature',
      desc: 'We harness the purity of botanicals to craft remedies that honor traditional Ayurvedic wisdom.'
    },
    {
      icon: Shield,
      title: 'Quality You Trust',
      desc: 'Every batch goes through rigorous checks, so you get safe, consistent, and effective products.'
    },
    {
      icon: Heart,
      title: 'Wellness First',
      desc: 'Your well-being is our compass—each formula is designed to restore balance, gently and holistically.'
    },
    {
      icon: Globe2,
      title: 'Sustainable Ethos',
      desc: 'Responsible sourcing and eco-conscious packaging guide how we operate—today and tomorrow.'
    }
  ];

  const metrics = [
    { number: '10+', label: 'Years of Research and Developemt' },
    { number: '20K+', label: 'Happy Customers' },
    { number: '9+', label: 'Countries We Serve' },
    { number: '4.9', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-[#efdfc5] dark:bg-[#1c1108]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#efdfc5] to-[#efdfc5]/90 dark:from-[#1c1108] dark:to-[#1c1108]/90 overflow-hidden">
        <div className="absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 text-[#1c1108] dark:text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              About KapsCare
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-[#1c1108] dark:text-[#efdfc5] leading-tight mb-6">
              Ancient Wisdom, Thoughtfully Crafted For Modern Life
            </h1>
            <p className="text-lg md:text-xl text-[#1c1108]/80 dark:text-[#efdfc5]/80 leading-relaxed">
              We blend time-honored Ayurvedic practices with contemporary research to deliver natural products that help you rediscover balance, clarity, and everyday vitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission + Image */}
      <section>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#efdfc5] dark:bg-[#1c1108] p-8 rounded-3xl border border-[#1c1108]/10 dark:border-[#efdfc5]/10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1c1108] dark:text-[#efdfc5] mb-4">Our Mission</h2>
              <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 text-lg leading-relaxed">
                To make holistic wellness accessible to everyone by offering trustworthy Ayurvedic products that are transparent, ethically sourced, and crafted with care. We aim to build a community that values nourishment—from the inside out.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="bg-[#1c1108] dark:bg-[#efdfc5] text-[#efdfc5] dark:text-[#1c1108] rounded-full w-10 h-10 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80">
                  Certified, tested, and crafted under stringent quality standards.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Ayurvedic care"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#efdfc5] dark:bg-[#1c1108] border border-[#1c1108]/10 dark:border-[#efdfc5]/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-[#1c1108] dark:bg-[#efdfc5] p-3 rounded-full">
                  <Users className="w-5 h-5 text-[#efdfc5] dark:text-[#1c1108]" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#1c1108] dark:text-[#efdfc5]">Community First</p>
                  <p className="text-sm text-[#1c1108]/70 dark:text-[#efdfc5]/70">Guided by empathy and care</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-[#1c1108] dark:text-[#efdfc5]"
            >
              What We Stand For
            </motion.h2>
            <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-2xl mx-auto mt-3">
              Four guiding principles shape every decision and every product we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-[#efdfc5] dark:bg-[#1c1108] border border-[#1c1108]/10 dark:border-[#efdfc5]/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#1c1108] dark:bg-[#efdfc5] flex items-center justify-center">
                  <p.icon className="w-7 h-7 text-[#efdfc5] dark:text-[#1c1108]" />
                </div>
                <h3 className="text-xl font-semibold text-center text-[#1c1108] dark:text-[#efdfc5] mb-2">{p.title}</h3>
                <p className="text-center text-[#1c1108]/80 dark:text-[#efdfc5]/80">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-[#1c1108] dark:bg-[#efdfc5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1108]/90 to-[#1c1108] dark:from-[#efdfc5]/90 dark:to-[#efdfc5]" />
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m, index) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#efdfc5] dark:text-[#1c1108] mb-2">{m.number}</div>
                <div className="text-[#efdfc5]/80 dark:text-[#1c1108]/80 font-medium">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 text-[#1c1108] dark:text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Heart className="w-4 h-4 mr-2" />
              What Our Community Says
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-[#1c1108] dark:text-[#efdfc5]"
            >
              Real Stories. Real Results.
            </motion.h2>
            <p className="text-[#1c1108]/80 dark:text-[#efdfc5]/80 max-w-2xl mx-auto mt-3">
              We’ve highlighted up to 8 recent reviews so you can hear directly from our customers.
            </p>
          </div>

          {reviewsError && (
            <p className="text-center text-red-600 dark:text-red-400 mb-8">{reviewsError}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loadingReviews
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-44 rounded-2xl bg-[#1c1108]/10 dark:bg-[#efdfc5]/10 animate-pulse"
                  />
                ))
              : topReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#1c1108] dark:bg-[#efdfc5] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#efdfc5] dark:text-[#1c1108] mb-3">
                  Ready to Begin Your Wellness Journey?
                </h3>
                <p className="text-[#efdfc5]/80 dark:text-[#1c1108]/80">
                  Explore our curated collection and find the right support for your everyday balance.
                </p>
              </div>
              <div className="md:text-right">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#efdfc5] text-[#1c1108] font-semibold hover:opacity-90 transition"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;