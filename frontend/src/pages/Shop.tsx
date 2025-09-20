import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SlidersHorizontal, Search, X } from 'lucide-react';
import ProductCard from '../components/Common/ProductCard';
import { getProducts, getProductsByCategory } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { Product, Category } from '../types';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products function
  const fetchProductsData = async (category: string = 'all') => {
    try {
      setLoading(true);
      const data =
        category === 'all'
          ? await getProducts()
          : await getProductsByCategory(category);
      setProducts(data);
      setOriginalProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle URL parameters - only for category
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'all';
    
    // Update category
    setSelectedCategory(categoryFromUrl);    
    fetchProductsData('all');
  }, [searchParams]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...originalProducts];

    // Filter by search first
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch)
      );
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [originalProducts, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newSearchParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', categoryId);
    }
    navigate(`/shop?${newSearchParams.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleCancelSearch = () => {
    setSearchTerm('');
  };

  const categoryOptions = [
    { id: 'all', name: 'All Products' },
    ...categories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efdfc5]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1c1108]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Shop Ayurvedic Products
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Discover our complete collection of authentic Ayurvedic products
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer"
                onClick={handleCancelSearch}
              />
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white shadow-sm"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categoryOptions.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="text-green-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                  setSortBy('name');
                  setSearchTerm(''); // Clear search without navigation
                  navigate('/shop');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
                {selectedCategory !== 'all' && (
                  <span className="ml-2 text-sm text-gray-500">
                    in {categoryOptions.find(cat => cat.id === selectedCategory)?.name}
                  </span>
                )}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;