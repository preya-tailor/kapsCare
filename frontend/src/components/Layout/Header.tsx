import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart, 
  LogOut, 
  Search 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import logoImage from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setSearchTerm(search);
    setInputValue(search);
  }, [location.search]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(location.search);
    if (inputValue.trim() === '') {
      params.delete('search');
    } else {
      params.set('search', inputValue.trim());
    }
    navigate({ pathname: '/shop', search: params.toString() });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleCancelSearch = () => {
    setInputValue('');
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate({ pathname: '/shop', search: params.toString() });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-amber-100 dark:border-amber-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-3">
              <div className="relative">
                <img src={logoImage} alt="Ayurvedic KapsCare Logo" className="w-42 h-12 object-contain" />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1c1108] dark:text-[#efdfc5]/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-10 py-2 border border-[#1c1108]/20 dark:border-[#1c1108]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1c1108]/30 dark:focus:ring-[#1c1108]/30 bg-white/50 dark:bg-[#1c1108]/50 text-[#1c1108] dark:text-[#1c1108] placeholder:text-[#1c1108]/60 dark:placeholder:text-[#1c1108]/60"
            />
            {inputValue && (
              <button
                onClick={handleCancelSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="text-[#1c1108] dark:text-[#efdfc5] hover:text-[#1c1108]/70 dark:hover:text-[#1c1108]/70 transition-colors duration-200 font-medium">{item.name}</Link>
              ))}
            </nav>

            {/* Cart */}
            <Link to="/cart">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative p-2 rounded-full hoverg-[#1c1108]/10 dark:hover:bg-[#ffdeb8]/10 transition-colors duration-200">
                <ShoppingCart className="w-5 h-5 text-[#1c1108] dark:text-[#efdfc5]" />
                {totalItems > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-[#1c1108] dark:bg-[#ffdeb8] text-[#ffdeb8] dark:text-[#1c1108] text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</motion.span>}
              </motion.button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 p-2 rounded-full hoverg-[#1c1108]/10 dark:hover:bg-[#ffdeb8]/10 transition-colors duration-200">
                  <User className="w-5 h-5 text-[#1c1108] dark:text-[#efdfc5]" />
                  <span className="hidden md:block text-sm font-medium text-[#1c1108] dark:text-[#efdfc5]">{user.firstName}</span>
                </motion.button>

                {isUserMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-48 bg-[#ffdeb8] darkg-[#1c1108] rounded-md shadow-lg border border-[#1c1108]/20 dark:border-[#ffdeb8]/20 z-50">
                    <div className="py-2">
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-[#1c1108] dark:text-[#efdfc5] hoverg-[#1c1108]/10 dark:hover:bg-[#ffdeb8]/10">Admin Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-[#1c1108] dark:text-[#efdfc5] hoverg-[#1c1108]/10 dark:hover:bg-[#ffdeb8]/10">
                        <LogOut className="w-4 h-4 inline mr-2" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#1c1108] text-[#efdfc5] px-4 py-2 rounded-full hover:bg-[#efdfc5]/80 hover:text-[#1c1108]/80 transition-colors duration-200 font-medium">
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full hoverg-[#1c1108]/10 dark:hover:bg-[#ffdeb8]/10 transition-colors duration-200">
              {isMenuOpen ? <X className="w-5 h-5 text-[#1c1108] dark:text-[#efdfc5]" /> : <Menu className="w-5 h-5 text-[#1c1108] dark:text-[#efdfc5]" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 pb-4 border-t border-[#1c1108]/20 dark:border-[#ffdeb8]/20">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="text-[#1c1108] dark:text-[#efdfc5] hover:text-[#1c1108]/70 dark:hover:text-[#1c1108]/70 transition-colors duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1c1108] dark:text-[#efdfc5]/60 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-10 py-2 border border-[#1c1108]/20 dark:border-[#1c1108]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1c1108]/30 dark:focus:ring-[#1c1108]/30 bg-white/50 dark:bg-[#1c1108]/50 text-[#1c1108] dark:text-[#1c1108] placeholder:text-[#1c1108]/60 dark:placeholder:text-[#1c1108]/60"
                />
                {inputValue && (
                  <button onClick={handleCancelSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;