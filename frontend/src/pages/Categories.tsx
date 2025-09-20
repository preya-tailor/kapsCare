import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/categoryService';
import { Category } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efdfc5]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1c1108]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efdfc5]">
        <div className="text-[#1c1108] text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efdfc5]">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] bg-[#1c1108] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-[url('/pattern.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1108] via-[#1c1108]/95 to-[#1c1108]/90"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-40 h-40"
        >
          <img
            src="https://9skin.in/cdn/shop/files/Skintallate-1.jpg?v=1695917436&width=823"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32"
        >
          <img
            src="https://9skin.in/cdn/shop/files/9SkinValentines-963-Edit.jpg?v=1707738348&width=823"
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
        </motion.div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#efdfc5]/5 backdrop-blur-lg rounded-3xl p-1 mb-6 border border-[#efdfc5]/10"
          >
            <div className="bg-[#1c1108] rounded-2xl px-6 py-2 flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-[#efdfc5]" />
              <span className="text-[#efdfc5] font-medium">Ancient Wisdom, Modern Wellness</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-light text-[#efdfc5] mb-4 text-center"
          >
            Discover Our
            <span className="block font-bold bg-gradient-to-r from-[#efdfc5] to-[#efdfc5]/80 bg-clip-text text-transparent">
              Ayurvedic Categories
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-[#efdfc5]/70 max-w-2xl text-center leading-relaxed"
          >
            Journey through our thoughtfully curated collection of authentic Ayurvedic remedies,
            where ancient healing meets modern wellness practices.
          </motion.p>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#efdfc5] to-transparent"></div>
      </section>


      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/shop?category=${category.id}`}>
                  <div className="relative h-[400px] rounded-3xl overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src={`http://localhost:5000${category.image}`}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1108]/90 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-semibold text-[#efdfc5] mb-2">
                        {category.name}
                      </h3>
                      <p className="text-[#efdfc5]/80 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-[#efdfc5]/90 text-sm font-medium">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;