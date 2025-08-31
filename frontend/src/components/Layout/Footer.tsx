import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Shop', path: '/shop' },
        { name: 'Categories', path: '/categories' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Support', path: '/support' },
      ],
    },
    {
      title: 'Account',
      links: [
        { name: 'My Account', path: '/profile' },
        { name: 'Order History', path: '/orders' },
        { name: 'Wishlist', path: '/wishlist' },
        { name: 'Track Order', path: '/track' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
  ];

  return (
    <footer className="bg-[#efdfc5] border-t border-[#1c1108]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-[#1c1108]/10 rounded-full">
                <Leaf className="w-6 h-6 text-[#1c1108]" />
              </div>
              <span className="text-2xl font-bold text-[#1c1108]">
                AyurVeda
              </span>
            </Link>
            <p className="text-[#1c1108]/80 mb-6 max-w-md">
              Discover the ancient wisdom of Ayurveda through our premium collection of natural herbs,
              supplements, and wellness products. Your journey to holistic health starts here.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#1c1108]" />
                <span className="text-[#1c1108]/80">info@ayurveda.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1c1108]" />
                <span className="text-[#1c1108]/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#1c1108]" />
                <span className="text-[#1c1108]/80">Ahmedabad, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-[#1c1108] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-[#1c1108]/80 hover:text-[#1c1108] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-[#1c1108]/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-[#1c1108] mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-[#1c1108]/80">
                Get the latest updates on new products and exclusive offers
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 border border-[#1c1108]/30 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#1c1108] bg-[#efdfc5] text-[#1c1108] placeholder-[#1c1108]/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1c1108] text-[#efdfc5] px-6 py-2 rounded-r-full hover:bg-[#3b2b1b] transition-colors duration-200 font-medium"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-[#1c1108]/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-[#1c1108]/80 mb-4 md:mb-0">
              © {new Date().getFullYear()} AyurVeda. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-[#1c1108]/10 hover:bg-[#1c1108]/20 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5 text-[#1c1108] hover:text-[#efdfc5]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;