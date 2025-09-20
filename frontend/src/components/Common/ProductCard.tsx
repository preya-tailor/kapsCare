import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold text-[#1c1108] mb-2 group-hover:text-[#1c1108]/80 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[#1c1108]/70 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1c1108]">
            ₹{Number(product.price).toFixed(2)}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product, 1)}
            className="p-2 rounded-full bg-[#1c1108] text-[#efdfc5] hover:bg-[#1c1108]/90 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;