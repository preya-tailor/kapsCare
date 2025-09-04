import React, { useState, useEffect } from 'react';
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
import { getProducts } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
// import Button from '../components/Common/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'Usage' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const allImages = product ? [product.mainImage, ...product.additionalImages] : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1c1108]"></div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-[#efdfc5]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
              >
                <img
                  src={`http://localhost:5000${allImages[selectedImage]}`}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="flex space-x-2">
                  {allImages.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-[#1c1108]'
                          : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={`http://localhost:5000${image}`}
                        alt={`${product?.name} ${index + 1}`}
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
                  {product?.name}
                </h1>
                <div className="text-3xl font-bold text-[#1c1108] mb-4">
                  ₹{product?.price}
                </div>
                <p className="text-gray-600 text-lg">
                  {product?.description}
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
                  <span className="text-lg font-medium text-[#1c1108]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#1c1108] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-[#1c1108]/10 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-[#1c1108]/10 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg bg-[#1c1108] text-[#efdfc5] hover:bg-[#1c1108]/90 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>

              {/* Details Tabs */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex space-x-4 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#1c1108] text-[#efdfc5]'
                          : 'text-[#1c1108] hover:bg-[#1c1108]/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-4">
                  {activeTab === 'description' && (
                    <div className="prose max-w-none">
                      <p className="text-gray-600 text-lg">
                        {product?.description}
                      </p>
                      <h3 className="text-xl font-semibold text-[#1c1108] mt-6 mb-4">
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {product?.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-[#1c1108]">•</span>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'usage' && (
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold text-[#1c1108] mb-4">
                        Directions to Use
                      </h3>
                      <ul className="space-y-2">
                        {product?.directions.map((direction, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-[#1c1108]">{index + 1}.</span>
                            <span className="text-gray-600">{direction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;