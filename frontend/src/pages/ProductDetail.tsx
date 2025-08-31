import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
// import Button from '../components/Common/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'Usage' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700"
              >
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-2xl">Out of Stock</span>
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-green-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-[#1c1108] mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {product.rating} out of 5
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#1c1108] mb-4">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {product.description}
                </p>
              </motion.div>

              {/* Quantity and Add to Cart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center space-x-2 outline rounded-lg bg-[#1c1108] text-[#efdfc5]"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                  <button
                    className="flex items-center justify-center p-3"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {product.inStock && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.stockQuantity} items left in stock
                  </p>
                )}
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-[#1c1108]" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Free shipping over $50
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-[#1c1108]" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Quality guaranteed
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-[#1c1108]" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    30-day returns
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#1c1108]-500 text-[#1c1108]'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {product.description}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#1c1108]">•</span>
                        <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#1c1108]">•</span>
                        <span className="text-gray-600 dark:text-gray-400">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    How to Use
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {product.usage}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Customer Reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;